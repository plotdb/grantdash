start-time = Date.now!

require! <[fs fs-extra path crypto LiveScript chokidar moment]>
require! <[express body-parser express-session connect-multiparty csurf express-rate-limit]>
require! <[passport passport-local passport-facebook passport-google-oauth20]>
require! <[nodemailer]>
require! <[sharedb-wrapper lderror]>
require! <[./io/postgresql ./api ./ext ./util/view ./api/cache]>
require! <[./aux ./util/throttle ./util/grecaptcha ./util/action ./watch ../secret ./watch/build/mod]>
require! 'uglify-js': uglify-js, LiveScript: lsc
colors = require \colors/safe
mod-builder = require "./watch/build/mod"
custom-builder = require "./watch/custom/"

backend = do
  update-user: (req) -> req.logIn req.user, ->
  init: -> new Promise (res, rej) ~>
    config = secret
    pgsql = new postgresql config
    authio = pgsql.authio

    [csp, cors, enable] = [(config.csp or []), config.cors, config.enable or {}]

    # =========== WEINRE for remote debugging
    if enable.weinre =>
      ip = aux.get-ip!0 or "127.0.0.1"
      (list) <- csp.map
      if <[connect-src script-src]>.indexOf(list.0) < 0 => return
      list.push "http://#ip:8080"
      if config.domain => list.push "https://#{config.domain}"

    # =========== Init Server
    app = express!
    console.log "[Server] Express Initialized in #{app.get \env} Mode".green
    app.disable \x-powered-by # Dont show server detail
    app.set 'trust proxy', '127.0.0.1' # So we can trust sth like ip from X-Forwarded-*

    # =========== CORS - Setup Cross Origin Request
    if config.cors =>
      cors = config.cors
      app.use (req, res, next) ->
        if cors.route and req.originalUrl.startsWith(cors.route) =>
          res.header("Access-Control-Allow-Origin", cors.domain)
          res.header( "Access-Control-Allow-Headers", cors.headers or "Origin, X-Requested-With, Content-Type, Accept")
          res.header("Access-Control-Allow-Methods", cors.methods or "PUT")
        next!

    # =========== CSP - Setup Content Security Policy
    csp = csp.map(-> it.join(" ")).join("; ")
    app.use (req, res, next) ->
      res.setHeader \Content-Security-Policy, csp
      res.setHeader \X-Content-Security-Policy, csp
      next!

    app.use body-parser.json do
      limit: config.limit
      # github webhook use `x-hub-signature` for hmac digest
      verify: (req, res, buf, encoding) ->
        if req.headers["x-hub-signature"] => req.raw-body = buf.toString!

    app.use body-parser.urlencoded extended: true, limit: config.limit

    # make pug cache compiled function so we don't have to compile pug file each time
    # should be enabled by default for production server.
    if app.get(\env) != \development => app.enable 'view cache'

    # also, we precompile all view pug into .view folder, which can be used by our custom pug view engine.
    app.engine 'pug', view
    app.set 'view engine', 'pug'
    app.set 'views', path.join(__dirname, '../src/pug/')
    app.locals.viewdir = path.join(__dirname, '../.view/')
    app.locals.basedir = app.get \views

    # =========== Users, Login and Sessions
    get-user = (u, p, usep, detail, doCreate = false, done) ->
      authio.user.get u, p, usep, detail, doCreate
        .then ->
          done null, it
          return null
        .catch ->
          msg = if usep => "incorrect email or password" else "did you login with social account?"
          done null, false, {message: msg}
          return null

    passport.use new passport-local.Strategy {
      usernameField: \email
      passwordField: \passwd
    },(u,p,done) ~> get-user u, p, true, null, false, done

    passport.use new passport-google-oauth20.Strategy(
      do
        clientID: config.google.clientID
        clientSecret: config.google.clientSecret
        callbackURL: "/dash/api/u/auth/google/callback"
        passReqToCallback: true
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        profileFields: ['id', 'displayName', 'link', 'emails']
      , (request, access-token, refresh-token, profile, done) ~>
        if !profile.emails =>
          done null, false, do
            message: "We can't get email address from your Google account. Please try signing up with email."
          return null
        get-user profile.emails.0.value, null, false, profile, true, done
    )

    passport.use new passport-facebook.Strategy(
      do
        clientID: config.facebook.clientID
        clientSecret: config.facebook.clientSecret
        callbackURL: "/dash/api/u/auth/facebook/callback"
        profileFields: ['id', 'displayName', 'link', 'emails']
      , (access-token, refresh-token, profile, done) ~>
        if !profile.emails =>
          done null, false, do
            message: "We can't get email address from your Facebook account. Please try signing up with email."
          return null
        get-user profile.emails.0.value, null, false, profile, true, done
    )

    session-store = -> @ <<< authio.session
    session-store.prototype = express-session.Store.prototype
    app.use session = express-session do
      secret: config.session.secret
      resave: true
      saveUninitialized: true
      store: new session-store!
      proxy: true
      cookie: do
        path: \/
        httpOnly: true
        maxAge: 86400000 * 30 * 12 #  1 year
    app.use passport.initialize!
    app.use passport.session!

    # =========== Sharedb
    if config.{}sharedb.enabled =>
      access = ({user, id, data, type}) -> cache.perm.sharedb {io: pgsql, user, id, data, type, action: \owner}

      @sharedb = {server, sdb, connect, wss} = sharedb-wrapper {
        app, io: config.io-pg, session, access, milestone-db: {interval: 200, enabled: true}
      }

      wss.on \connection, (ws, req) ->
        p = if session? => new Promise((res, rej) -> session(req, {}, (-> res!))) else Promise.resolve!
        p.then ->
          session = req.session
          user = req.session.passport and req.session.passport.user
          ws.on \close, ->

    passport.serializeUser (u,done) ->
      authio.user.serialize u .then (v) ->
        done null, v
        return null
      return null
    passport.deserializeUser (v,done) ->
      authio.user.deserialize v .then (u) ->
        done null, u or {}
        return null
      return null

    # ============ Routing
    @router = router = { user: express.Router!, api: express.Router!, ext: express.Router! }

    app.use \/ext, throttle.count.route.ext, router.ext # External API
    ext(@, pgsql)

    # route preparation
    app.use (req, res, next) ->
      cache.route.check {io: pgsql, req, res}
        .then (ret) ->
          # ret = {domain, org, brd} ( org, brd is optional )
          req.scope = ret
          next!
        .catch aux.error-handler res
    # ============ CSRF
    # put it here to secure login with csrf
    # TODO will this block fb / google login? it might will.
    backend.csrfProtection = csurf!
    app.use backend.csrfProtection

    router.api.use \/u, throttle.count.route.user, router.user

    router.user
      ..post \/signup, throttle.count.action.signup, grecaptcha, (req, res) ->
        {email,displayname,passwd,config} = req.body{email,displayname,passwd,config}
        if !email or !displayname or passwd.length < 8 => return aux.r400 res
        authio.user.create email, passwd, true, {displayname}, (config or {})
          .then (user) -> new Promise (res, rej) -> req.logIn(user, -> res(user))
          .then (user) -> action.verify-email {req, io: pgsql, user: user}
          .then -> res.redirect \/dash/api/u/200
          .catch -> res.redirect \/dash/api/u/403
      ..post \/login, throttle.count.action.login, grecaptcha, passport.authenticate \local, do
        successRedirect: \/dash/api/u/200
        failureRedirect: \/dash/api/u/403

    # =============== USER DATA, VIA AJAX
    # Note: We used to use jsonp, but it might lead to data exploit since jsonp is not protected by CORS.
    # * This must be protected by CORS Policy.
    # * This is passed via cookie too, but cookie won't be set if user doesn't get files served from express.
    #   so, for the first time user we still have to do ajax.
    #   cookie will be checked in frontend to see if ajax is needed.
    # * user could stil alter cookie's content, so it's necessary to force ajax call for important action
    #   there is no way to prevent user from altering client side content,
    #   so if we want to prevent user from editing our code, we have to go backend for the generation.
    app.get \/api/global, backend.csrfProtection, (req, res) ->
      res.setHeader \content-type, \application/json
      payload = JSON.stringify({
        global: true, csrfToken: req.csrfToken!, production: config.is-production
        ip: aux.ip req
        user: if req.user => req.user{key, plan, config, displayname, verified, username} else {}
        recaptcha: secret.{}grecaptcha{sitekey, enabled}
      } <<< ({scope: req.scope or {}}))
      res.cookie 'global', payload, { path: '/', secure: true }
      res.send payload

    app.use \/api, throttle.count.route.api, throttle.speed.route.api, router.api
    app.get "/api/health", (req, res) -> res.json {}

    # Must review all APIs
    router.user
      ..get \/null, (req, res) -> res.json {}
      ..get \/200, (req,res) -> res.json(req.user)
      ..get \/403, (req,res) -> res.status(403)send!
      ..get \/login, (req, res) -> res.redirect \/dash/auth/

      ..post \/logout, (req, res) ->
        req.logout!
        res.redirect \/
      ..post \/auth/google, passport.authenticate \google, {scope: ['email']}
      ..get \/auth/google/callback, passport.authenticate \google, do
        successRedirect: \/dash/auth/done/
        failureRedirect: \/dash/auth/failed/social.html
      ..post \/auth/facebook, passport.authenticate \facebook, {scope: ['email']}
      ..get \/auth/facebook/callback, passport.authenticate \facebook, do
        successRedirect: \/dash/auth/done/
        failureRedirect: \/dash/auth/failed/social.html

    multi = do
      parser: connect-multiparty limit: config.limit
      clean: (req, res, next) ->
        for k,v of req.files => if fs.exists-sync v.path => fs.unlink v.path
      cleaner: (cb) -> (req, res, next) ~>
        if cb => cb req, res, next
        @clean req, res, next

    @ <<< {config, app, express, multi, pgsql}

    api @, pgsql
    app.use \/, express.static(path.join(__dirname, '../static'))
    app.use (req, res, next) ~> aux.r404 res, "", true

    # Try to handle this:
    # [17/05/08 01:54:30] FacebookTokenError: This authorization code has been used.  /  undefined
    if !config.debug =>
      (err, req, res, next) <- @app.use
      if !err => return next!
      if err.code == \EBADCSRFTOKEN =>
        # it might be that connect.sid ( for express sessions ) that are tainted.
        # clear both connect.sid and global can help
        # so client will force re-fetch data(global), even re-login(connect.sid).
        # but, while clearCookie here might be easier, it might also be abused by malicious source.
        # so, we added an /d/me/reauth/ route for this purpose, and dont clearCookie here.
        # note: global must align with the one if /d/global/,
        #       and connect.side must align with session's cookie setting.
        res
        #  .clearCookie \connect.sid, {path:'/', domain: \localhost} # clear old one
        #  .clearCookie \connect.sid, {path:'/', domain: config.domain}
        #  .clearCookie \global, { path: '/', domain: config.domain}
          .status(403)
        # for api we send a ldError object.
        # 1005 tells frontend a csrftoken-mismatch happened, so client can trigger corresponding panel
        # to resolve this issue.
        if /^\/api\//.exec(req.originalUrl) => res.send {id: 1005, name: \ldError}
        # otherwise redirect user to login.
        else res.redirect "/auth/?nexturl=#{req.originalUrl}"
      else
        if err.name == \ldError =>
          if err.id == 1000 => return res.render "err/custom.pug", {err: err{id,message}}
          return res.status 500 .send err
        # ignore some errors that we don't need to take care.
        else if (err instanceof URIError) and "#{err.stack}".startsWith('URIError: Failed to decode param') =>
          return res.status 400 .send!
        else if err.message.startsWith \TokenError =>
          console.error(
            colors.red.underline("[#{moment!format 'YY/MM/DD HH:mm:ss'}]"),
            colors.yellow(err.message)
            "[", color.yellow(req.originalUrl.substring(0,15)), "]"
          )
        else if err.message.startsWith 'Failed to lookup view' =>
          console.error(
            colors.red.underline("[#{moment!format 'YY/MM/DD HH:mm:ss'}]"),
            colors.yellow(err.message)
          )
        else
          console.error(
            colors.red.underline("[#{moment!format 'YY/MM/DD HH:mm:ss'}]"),
            colors.yellow(err.toString!)
            "["
            colors.yellow(err.path or '')
            "]["
            colors.yellow(req.originalUrl)
            "]"
          )
          console.error colors.grey(err.stack)
        res.status 500 .send!
    if config.build and config.watch =>
      watch.init config.build
      watch.on \build, -> mod-builder.build it
      watch.on \unlink, -> mod-builder.unlink it
      watch.on \build, -> custom-builder.build it
      watch.on \unlink, -> custom-builder.unlink it

    if config.sharedb.enabled =>
      server.listen config.port, -> console.log "[SERVER] listening on port #{server.address!port}".cyan
    else
      server = app.listen config.port, -> console.log "[SERVER] listening on port #{server.address!port}".cyan
    inited-time = Date.now!
    console.log "[SERVER] Initialization: #{(inited-time - start-time) / 1000}s elapsed.".yellow
    res!

module.exports = backend
backend.init!
