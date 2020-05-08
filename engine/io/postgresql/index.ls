require! <[pg crypto bcrypt colors ./aux]>

pg.defaults.poolSize = 30

ret = (config) ->
  @config = config
  @authio = authio = do
    user: do
      # store whole object ( no serialization )
      serialize: (user={}) -> Promise.resolve( user or {} )
      deserialize: (v) ~> Promise.resolve( v or {})

      # store only key
      #serialize: (user={}) -> Promise.resolve( user.key or 0 )
      #deserialize: (v) ~>
      #  @query "select * from users where key = $1", [v]
      #    .then (r={}) -> r.[]rows.0

      hashing: (password, doMD5 = true, doBcrypt = true) -> new Promise (res, rej) ->
        ret = if doMD5 => crypto.createHash(\md5).update(password).digest(\hex) else password
        if doBcrypt => bcrypt.genSalt 12, (e, salt) -> bcrypt.hash ret, salt, (e, hash) -> res hash
        else res ret

      compare: (password='', hash) -> new Promise (res, rej) ->
        md5 = crypto.createHash(\md5).update(password).digest(\hex)
        bcrypt.compare md5, hash, (e, ret) -> if ret => res! else rej new Error!

      get: (username, password, usepasswd, detail, doCreate = false) ~>
        username-lower = username.toLowerCase!
        if !/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(username) =>
          return Promise.reject new Error("not email")
        user = {}

        # We query both for case sensitive and insensitive username, because
        # - if it's not a typo - some old users may already get used to it.
        # - it it's a typo - we can at least find the correct user object for new user
        @query "select * from users where username = $1 or username = $2", [username, username-lower]
          .then (users = {}) ~>
            # case sensitive user ( only for old user )
            user := users.rows.filter(-> it.username == username).0
            # case insensitive ( both for old and new user )
            if !user => user := users.rows.filter(->it.username == username-lower).0
            if !user and !doCreate => return Promise.reject new Error("failed")
            if !user and doCreate => return @authio.user.create username-lower, password, usepasswd, detail
            else if user and !(usepasswd or user.usepasswd) =>
              delete user.password
              return user
            @authio.user.compare password, user.password
          .then ~>
            if it => user := (if user => user else {}) <<< it
            if !user.{}config.legal =>
              user.{}config.legal = new Date!getTime!
              @query "update users set config = $2 where key = $1", [user.key, user.config]
          .then ->
            delete user.password
            return user

      create: (username, password, usepasswd, detail = {}, config = {}) ~>
        user = {}
        username = username.toLowerCase!
        if !/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(username) =>
          #console.log "[CREATE USER] mailformat email: #username"
          return Promise.reject new Error("not email")
        @authio.user.hashing password, usepasswd, usepasswd
          .then (pw-hashed) ~>
            displayname = if detail => detail.displayname or detail.username
            if !displayname => displayname = username.replace(/@.+$/, "")
            config.legal = new Date!getTime!
            user <<< {username, password: pw-hashed, usepasswd, displayname, detail, config, createdtime: new Date!}
            @query [
              "insert into users"
              "(username,password,usepasswd,displayname,createdtime,detail,config) values"
              "($1,$2,$3,$4,$5,$6,$7) returning key"
            ].join(" "), [
              user.username, user.password, user.usepasswd,
              user.displayname, new Date!toUTCString!, user.detail, user.config
            ]
          .then (r) ~>
            key = r.[]rows.0.key
            return user <<< {key}

    session: do
      get: (sid, cb) ~>
        @query "select * from sessions where key=$1", [sid]
          .then ->
            cb null, (it.[]rows.0 or {}).detail
            return null
          .catch -> [console.error("session.get", it), cb it]
        return null
      set: (sid, session, cb) ~>
        @query([
          "insert into sessions (key,detail) values"
          "($1, $2) on conflict (key) do update set detail=$2"].join(" "), [sid, session])
          .then ->
            cb!
            return null
          .catch -> [console.error("session.set", it), cb!]
        return null
      destroy: (sid, cb) ~>
        @query "delete from sessions where key = $1", [sid]
          .then ->
            cb!
            return null
          .catch -> [console.error("session.destroy",it),cb!]
        return null
  @

ret.prototype = do
  query: (a,b=null,c=null) ->
    debug = Math.random!toString(16).substring(2)
    if typeof(a) == \string => [client,q,params] = [null,a,b]
    else => [client,q,params] = [a,b,c]
    _query = (client, q, params=null) -> new Promise (res, rej) ->
      #console.log " - " + "[#debug][QUERY]".cyan + " #{q.substring(0, 80)}"
      (e,r) <- client.query q, params, _
      if e => return rej e
      return res r
    if client => return _query client, q, params
    (res, rej) <~ new Promise _
    #console.log " - " + "[#debug][QUERY]".cyan +  " pg.connect.."
    (err, client, done) <~ pg.connect @config.io-pg.uri, _
    if err => return rej err
    _query client, q, params
      .then (r) -> [done!, res r]
      .catch -> [done!, rej it]
  aux: aux

module.exports = ret

