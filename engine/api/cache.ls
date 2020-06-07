require! <[permcheck ../aux]>

perm = do
  cache: {}
  perm: {}
  supported-types: <[org brd prj]>
  invalidate: ({type, slug}) ->
    @cache{}[type][slug] = {}
    @perm{}[type][slug] = null
  check: ({io, user, type, slug, action}) -> 
    Promise.resolve!
      .then ~>
        if !(user and user.key and slug and (type in @supported-types)) => return Promise.reject!
        if @cache{}[type]{}[slug][user.key]? =>
          return if @cache[type][slug][user.key] => true else Promise.reject!
        p = if @perm{}[type][slug] =>
          Promise.resolve(that)
        else
          io.query "select owner, detail->'perm' as perm from #type where slug = $1", [slug]
            .then (r={}) ~>
              if !(ret = r.[]rows.0) => return Promise.reject!
              @perm{}[type][slug] = ret
        p
          .then (ret) ~>
            if user.key == ret.owner => return
            perm = ret.{}perm.[]roles
            role = {user: [user.key]}
            permcheck {role, perm}
              .then (cfg) -> if !(cfg and cfg[action]) => return Promise.reject!
    .then ~> @cache{}[type]{}[slug][user.key] = true
    .catch (e) ~>
      permcache{}[type]{}[slug][user.key] = false
      if e and e.id != 1012 => console.log "[sharedb access error]", e
      return Promise.reject(e or (new lderror 1012))

  sharedb: ({io, user, id, data, type, action}) ->
    if !id => return Promise.resolve!
    [type,slug] = id.split('/')
    @check({io, user, type, slug, action})

stage = do
  cache: {}
  supported-types: <[brd]>
  invalidate: ({type, slug}) -> @cache{}[type][slug] = null
  check: ({io, type, slug}) -> 
    Promise.resolve!
      .then ~>
        if !type in @supported-types => return aux.reject 400
        if !slug => return aux.reject 400
        if @cache{}[type][slug] => return that
        io.query "select detail->'stage' as stage from brd where slug = $1", [slug]
          .then (r={}) ~>
            ret = r.[]rows.0
            stage = ret.stage.list or []
            cfgs = stage
              .filter (s) ->
                if s.starttime and Date.now! < Date(s.starttime) => return false
                if s.endtime and Date.now! > Date(s.endtime) => return false
                return true
            ret = (cfgs[* - 1] or {})
            if !ret.config => config.config = {}
            return (@cache[type][slug] = ret)

module.exports = {perm, stage}



