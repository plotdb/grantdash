require! <[permcheck lderror ../aux]>

# TODO hard coded for now but we should query from db in the future.
coded-domains = do
  "grantdash.dev": {org: "grantdash-dev", orgname: "Grant Dash Dev"}
  "dev.grantdash.dev": {org: "grantdash-dev", orgname: "Grant Dash Dev"}
  "dev.gda.sh": {org: "grantdash-dev", orgname: "Grant Dash Dev"}
  "grantdash.io": {orgname: "Grant Dash"}
  "taicca.grantdash.io": {org: "taicca-tw", brd: "grantdash-test", orgname: "Taicca Dash"}
  "sch001.g0v.tw": {org: "g0v-jothon", brd: "sch001", orgname: "零時小學校"}
  "dash.taicca.tw": {org: "taicca-tw", orgname: "文化內容策進院"}

# route.check: return
#  - domain
#  - org (optional)
#  - brd (optional)
#  - orgname ( optional )
#  - brdname ( optional )
route = do
  cache: {domain: (coded-domains or {}), brd: {}, prj: {}}
  check: ({io, req, res}) -> Promise.resolve!then ~>
    # some api dont have hint info inside path. thus we use referrer to extract org/brd info
    domain = req.get("host")
    paths = if /api/.exec(req.originalUrl) => [req.get('Referrer'), req.originalUrl] else [req.originalUrl]
    ret = paths
      .map (pathname) ->
        if (brd = /brd\/([^/?]+)/.exec(pathname)) => brd = brd.1
        if (prj = /prj\/([^/?]+)/.exec(pathname)) => prj = prj.1
        {brd,prj}
    brd = ret.0.brd or (if ret.1 => ret.1.brd else null )
    prj = ret.0.prj or (if ret.1 => ret.1.prj else null )
    promise = if brd =>
      if @cache.brd[brd] => Promise.resolve that
      else
        io.query """
        select b.org, b.name as brdname
        from brd as b
        where b.slug = $1 and b.deleted is not true
        """, [brd]
          .then (r={}) ~> @cache.brd[brd] = ((r.[]rows.0 or {}) <<< {brd})
    else if prj =>
      if @cache.prj[prj] => Promise.resolve that
      else
        io.query """
        select p.brd, b.org, b.name as brdname
        from prj as p, brd as b
        where b.slug = p.brd and p.slug = $1 and p.deleted is not true and b.deleted is not true
        """, [prj]
          .then (r={}) ~> @cache.prj[prj] = (r.[]rows.0 or {})
    else Promise.resolve(null)
    promise.then (path-cfg) ~>
      # TODO deleted prj will lead to null org here, thus global api will return 1019 error
      if path-cfg and !path-cfg.org => return Promise.reject(new lderror(1019))
      p = if @cache.domain[domain] => Promise.resolve(that)
      else Promise.reject(new lderror(1019))
      p.then (domain-cfg) ->
        if !domain-cfg => return Promise.reject(new lderror(1019))
        if !path-cfg => return domain-cfg <<< {domain}
        if (
        ((path-cfg.org != domain-cfg.org) or
        (domain-cfg.brd and domain-cfg.brd != path-cfg.brd)) and
        domain-cfg.org
        ) => return Promise.reject(new lderror(1019))
        ret = path-cfg <<< domain-cfg{orgname} <<< {domain}
        return path-cfg <<< domain-cfg{orgname} <<< {domain}

perm = do
  cache: {}
  cache-prj: {}
  cache-judge: {brd: {}}
  perm: {}
  supported-types: <[org brd prj post form]>
  invalidate-judge: ({type, slug}) ->
    @cache-judge{}[type][slug] = {}
  invalidate: ({type, slug}) ->
    @cache{}[type][slug] = {}
    @perm{}[type][slug] = null
    @cache-judge{}[type][slug] = {}
  check: ({io, user, type, slug, action}) ->
    action = if Array.isArray(action) => action else [action]
    payload = {role: {}, perm: {}}
    Promise.resolve!
      .then ~>
        if !(user and user.key and slug and (type in @supported-types)) => return Promise.reject!
        if user.staff == 1 => return true
        # NOTE instead of obj.perm, we also use an external table 'perm' for providing token for users.
        #      and for now we don't have strategy to invalidate caches for perm type update.
        # TODO better way for invalidating cache based on perm table change?
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
            payload.perm = ret.{}perm.[]roles
            io.query """
            select ref from perm where owner = $1 and objtype = $2 and objslug = $3 and type = 'token'
            """, [user.key, type, slug]
              .then (r={}) ->
                token = r.[]rows.map -> it.ref
                payload.role = {user: [user.key], email: [user.username], token}
                permcheck payload
              .then (cfg) -> if !cfg or !(action.filter(->cfg[it]).length) => return Promise.reject!

    .then ~> @cache{}[type]{}[slug][user.key] = true
    .catch (e) ~>
      if user and user.key => @cache{}[type]{}[slug][user.key] = false
      if e and e.id != 1012 => console.log "[sharedb access error]", e
      return Promise.reject(e or (new lderror 1012))

  check-judge: ({io, brd, grp, user}) ->
    v = @cache-judge.brd{}[brd].{}[grp][user.key]
    if v? => return (if v => Promise.resolve(true) else Promise.reject(new lderror(1012)))
    io.query "select key from perm_judge where brd = $1 and grp = $2 and owner = $3", [brd, grp, user.key]
      .then (r={}) ~>
        if !(r.[]rows.length) =>
          @cache-judge.brd{}[brd].{}[grp][user.key] = false
          return Promise.reject(new lderror(1012))
        @cache-judge.brd{}[brd].{}[grp][user.key] = true


  sharedb: ({io, user, id, data, type, action}) ->
    if !id => return Promise.resolve!
    [type,slug] = ids = id.split('/')
    @check({io, user, type, slug, action})
      .catch ~>
        if type == \prj =>
          p = if (@cache-prj[slug])? => Promise.resolve that
          else io.query("select brd from prj where slug = $1", [slug]).then((r={}) -> r.[]rows.0)
          ret = p
            .then (prj) ~>
              if !prj => return Promise.reject new lderror(1012)
              @cache-prj[slug] = prj
              @check {io, user, type: \brd, slug: prj.brd, action: <[owner]>}
          return ret
        if !(type == \brd and ids.2 == \grp and ids.4 == \judge) => return Promise.reject it
        @check-judge {io, brd: ids.1, grp: ids.3, user}


stage = do
  cache: {}
  supported-types: <[brd]>
  invalidate: ({type, slug}) -> @cache{}[type][slug] = null
  check: ({io, type, slug, name}) ->
    Promise.resolve!
      .then ~>
        if !type in @supported-types => return aux.reject 400
        if !slug => return aux.reject 400
        if @cache{}[type][slug] => return that
        io.query "select detail->'stage' as stage from brd where slug = $1 and deleted is not true", [slug]
          .then (r={}) ~>
            if !(ret = r.[]rows.0) => return aux.reject 404
            stage = ret.{}stage.list or []
            cfgs = stage
              .filter (s) ->
                if s.start and Date.now! < (new Date(s.start).getTime!) => return false
                if s.end and Date.now! > (new Date(s.end).getTime!) => return false
                return true
            # if there are multiple matches, choose the one with closest start time
            [idx,value] = [0,0]
            for i from 0 til cfgs.length =>
              v = if cfgs[i].start => (Date.now! - new Date(that).getTime!) else 0
              if !value or (v <= value and v > 0) => [idx,value] = [i,v]
            ret = cfgs[idx] or {}
            if !ret.config => ret.config = {}
            return (@cache[type][slug] = ret)
      .then (c) ->
        if !name => return c
        if !c.config[name] => return Promise.reject(new lderror 1012)
        return true

module.exports = {perm, stage, route}
