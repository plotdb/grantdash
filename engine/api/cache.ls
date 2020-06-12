require! <[permcheck ../aux]>

# TODO hard coded for now but we should query from db in the future.
coded-domains = do
  "grantdash.dev": {teamname: "Grant Dash Dev"}
  "grantdash.io": {teamname: "Grant Dash"}
  "sch001.g0v.tw": {org: "g0v-jothon", brd: "sch001", teamname: "零時小學校"}
  "dash.taicca.tw": {org: "taicca.tw", teamname: "文化內容策進院"}

# route.check: return
#  - domain
#  - org (optional)
#  - brd (optional)
#  - team name ( optional )
route = do
  cache: {domain: (coded-domains or {}), brd: {}, prj: {}}
  check: ({io, req, res}) -> Promise.resolve!then ~>
    pathname = req.originalUrl
    domain = req.get("host")
    if (brd = /brd\/([^/?]+)/.exec(pathname)) => brd = brd.1
    if (prj = /prj\/([^/?]+)/.exec(pathname)) => prj = prj.1
    promise = if brd =>
      if @cache.brd[brd] => Promise.resolve that
      else
        io.query "select b.org from brd as b where b.slug = $1", [brd]
          .then (r={}) ~> @cache.brd[brd] = ((r.[]rows.0 or {}) <<< {brd})
    else if prj =>
      if @cache.prj[prj] => Promise.resolve that
      else
        io.query "select p.brd, b.org from prj as p, brd as b where b.slug = p.brd and p.slug = $1", [prj]
          .then (r={}) ~> @cache.prj[prj] = (r.[]rows.0 or {})
    else Promise.resolve(null)
    promise.then (path-cfg) ~>
      if path-cfg and !path-cfg.org => return aux.reject 400
      p = if @cache.domain[domain] => Promise.resolve(that)
      else aux.reject 400
      p.then (domain-cfg) ->
        if !domain-cfg => return aux.reject 400
        if !path-cfg => return domain-cfg <<< {domain}
        if (
        ((path-cfg.org != domain-cfg.org) or
        (domain-cfg.brd and domain-cfg.brd != path.cfg-brd)) and
        domain-cfg.org
        ) => return aux.reject 400
        return path-cfg <<< domain-cfg{teamname} <<< {domain}

perm = do
  cache: {}
  perm: {}
  supported-types: <[org brd prj post]>
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
            stage = ret.{}stage.list or []
            cfgs = stage
              .filter (s) ->
                if s.start and Date.now! < (new Date(s.start).getTime!) => return false
                if s.end and Date.now! > (new Date(s.end).getTime!) => return false
                return true
            ret = (cfgs[* - 1] or {})
            if !ret.config => ret.config = {}
            return (@cache[type][slug] = ret)

module.exports = {perm, stage, route}



