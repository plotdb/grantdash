require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit suuid mime-types]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
(engine,io) <- (->module.exports = it)  _

{deploy, slugs, save-snapshot} = common

api = engine.router.api
app = engine.app

landing = do
  org: ({slug, req, res}) ->
    lc = {}
    if !slug => return aux.r404 res
    io.query "select * from org where org.slug = $1 and org.deleted is not true", [slug]
      .then (r={}) ->
        if !(lc.org = r.[]rows.0) => return aux.r404 res
        io.query """
        select name,description,slug,key,detail->'stage' as stage
        from brd where brd.org = $1 and brd.deleted is not true
        order by createdtime desc
        """, [slug]
      .then (r={}) ->
        brds = r.[]rows
          .filter ->
            stage = it.{}stage.list or []
            cfgs = stage
              .filter (s) ->
                if s.start and Date.now! < (new Date(s.start).getTime!) => return false
                if s.end and Date.now! > (new Date(s.end).getTime!) => return false
                return true
            ret = (cfgs[* - 1] or {})
            if !ret.config => ret.config = {}
            ret.config["public"]
        res.render \view/default/org.pug, {org: lc.org, brds}
  brd: ({slug, req, res}) ->
    lc = {}
    if !slug => return aux.r404 res
    io.query "select * from brd where slug = $1 and deleted is not true", [slug]
      .then (r={}) ->
        if !(lc.brd = r.[]rows.0) => return aux.r404 res
        cache.stage.check {io, type: \brd, slug}
      .then (stage) ->
        res.render \view/default/brd.pug, {brd: lc.brd, stage}

# landing pages
landing-page = (type, slug, req, res) ->
  lc = {}
  p = if type == \brd =>
    io.query """
    select name, description, slug, key, org, detail->'page'->'info' as pageinfo
    from brd where deleted is not true and slug = $1
    """, [slug]
  else
    io.query """
    select name, description, slug, key, detail->'page'->'info' as pageinfo
    from org where deleted is not true and slug = $1
    """, [slug]
  p
    .then (r={}) ->
      lc[type] = ret = r.[]rows.0
      info = ret.pageinfo
      if (info and (info.opt or \default) == \default and info.{}generic.landing-url) =>
        Promise.resolve(info.{}generic.landing-url)
      else
        index-path = if type == \brd => "org/#{ret.org}/brd/#slug/static/index.html"
        else "org/#slug/static/index.html"
        fs-extra.exists path.join("users", index-path)
          .then -> return if it => path.join("/dash/private", index-path) else null
    .then (url) ->
      if url =>
        if /^https?:/.exec(url) => return res.status(302).redirect(url)
        res.set {"X-Accel-Redirect": url}
        return res.send!
      landing[type]({slug, req, res})
    .catch aux.error-handler res

app.get \/, (req, res) ->
  if !(req.scope and req.scope.org) => return aux.r404 res
  slug = req.scope.org or req.scope.brd
  type = if req.scope.brd => \brd else \org
  landing-page type, slug, req, res
app.get \/org/:slug, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  landing-page \org, slug, req, res
app.get \/brd/:slug, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  landing-page \brd, slug, req, res

# upload-vids hacks - PDF only show the very first page
# - for PDF with fast web view option on, Chrome fires several request through this API for a single PDF.
#   however, except the first request, following requests don't have the required cookie for session,
#   thus user object will be undefined, and thus access to protected files will be denied.
# - To resolve this issue, we add an "id" in frontend in query params for identifying the same request
#   and cache the permission calculation result about the specific id. then, we identify requests
#   by the same request through the id.
upload-vids = {}
# project file permission check
# X-Accel-Redirect will be intercepted by Nginx, and then use to serve corresponding location.
# once we config it as internal, it will only accessible through this route.
app.get \/org/:org/prj/:prj/upload/:file, (req, res) ->
  {org, prj, file} = req.params{org, prj, file}
  lc = {}
  #res.set {"X-Accel-Redirect": "/dash/private/org/#org/prj/#prj/upload/#file"}
  #return res.send!
  vid = req.query.id
  now = Date.now!
  fvid = if vid => "#{prj}-#{file}-#{vid}" else null
  if fvid and upload-vids[fvid] =>
    if upload-vids[fvid].time > now and !(req.user and req.user.key)  =>
      res.set {"X-Accel-Redirect": "/dash/private/org/#org/prj/#prj/upload/#file"}
      return res.send!
    upload-vids[fvid] = null
  for k,v of upload-vids => if v and v.time > now => delete upload-vids[k]

  cache.perm.check {io, user: req.user, type: \prj, slug: prj, action: \owner}
    .catch ->
      cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: <[owner judge]>}
    .catch ->
      io.query "select grp,detail from prj where slug = $1 and deleted is not true", [prj]
        .then (r={}) ->
          if !(lc.prj = r.[]rows.0) => return aux.reject 404
          io.query "select detail from brd where slug = $1 and deleted is not true", [req.scope.brd]
        .then (r={}) ->
          if !(lc.brd = r.[]rows.0) => return aux.reject 404
          grps = lc.brd.{}detail.[]group
          if !(grp = grps.filter(-> lc.prj.grp == it.key).0) => return aux.reject 404

          is-public = grp.{}form.[]list.filter(-> it.name in <[form-thumbnail form-file]>)
            .filter -> lc.prj.{}detail.{}answer{}[it.key].[]list.filter(-> it.fn == file).length
            .filter -> it.{}config.public
            .length
          if is-public => return
          if !(req.user and req.user.key) => return Promise.reject 403
          io.query """
          select owner from perm_judge where brd = $1 and grp = $2 and owner = $3
          """, [req.scope.brd, grp.key, req.user.key]
            .then (r={}) ->
              if !(r.[]rows.length) => return Promise.reject 403
    .then ->
      if fvid => upload-vids[fvid] = {time: Date.now! + 1000 * 30}
      res.set {"X-Accel-Redirect": "/dash/private/org/#org/prj/#prj/upload/#file"}
      res.send!
    .catch -> res.status 403 .send {}

# For now we don't need these
# app.get \/org/:org/brd/:brd/upload/:file, (req, res) ->
# app.get \/org/:org/upload/:file, (req, res) ->

# req.files = {name: [ file ... ]}
# file:
#   - path ( file path on server temp folder )
#   - size ( e.g., 17454 )
#   - type ( e.g., application/json )
#   - name ( e.g., my-document.docx )

upload = ({root, files}) -> new Promise (res, rej) ->
  (e) <- fs-extra.ensure-dir path.join(root, \upload), _
  if e => return rej(e)
  ps = files
    .filter -> it.name and it.type and it.path
    .map (f = {}) ->
      ext = mime-types.extension(f.type) or mime-types.extension(mime-types.lookup(f.name)) or ''
      md5 = crypto.createHash \md5 .update fs.read-file-sync f.path .digest \hex
      fn = "#{md5}.#{ext}"
      fs-extra.copy f.path, path.join(root, \upload, fn)
        .then -> f{name, type, size} <<< {fn, ext}

  Promise.all(ps)
    .then -> res it
    .catch -> rej it

api.post \/upload, aux.signed, express-formidable({multiples:true}), grecaptcha, (req, res) ->
  lc = {}
  {org,brd,prj,post,files} = req.fields
  files = []
  for name,list of req.files => files ++= list
  if files.length > 10 or files.filter(->it.size >= 104857600).length => return aux.r413 res
  slugs {io, org, brd, prj, post}
    .then (ret) -> lc <<< ret

    .then ->
      if lc.type == \prj =>
        cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-edit"}
          .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: <[prj-edit-own]>}
          .then -> cache.perm.check {io, user: req.user, type: \prj, slug: prj, action: <[owner]>}
          .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: <[owner]>}

      else cache.perm.check {io, user: req.user, type: lc.type, slug: lc.slug, action: \owner}

    # TODO verify prj form criteria
    .then -> upload {root: lc.root, files}
    .then -> res.send it
    .catch aux.error-handler res

update-permission = ({type, perm, slug}) ->
  entries = []
  perm.[]roles.map (role) ->
    role.[]list.map (it) ->
      entries.push {type: it.type, ref: "#{it.key}", role: role.key}
  io.query "select key,type,ref,role from perm where objtype = $1 and objslug = $2", [type, slug]
    .then (r={}) ->
      perms = r.[]rows
        .filter (p) -> !entries.filter((e) -> e.type == p.type and e.ref == p.ref and e.role == p.role).length
        .map -> it.key
      io.query "delete from perm where objtype = $1 and objslug = $2 and key = ANY($3::int[])", [type, slug, perms]
    .then ->
      io.query """
      insert into perm (objtype, objslug, role, type, ref)
        select t.objtype, t.objslug, t.role, t.type, t.ref from (select
          unnest($1::text[]) as objtype,
          unnest($2::text[]) as objslug,
          unnest($3::text[]) as role,
          unnest($4::text[]) as type,
          unnest($5::text[]) as ref
        ) t
      on conflict do nothing
      """, [
        entries.map(->type),
        entries.map(->slug),
        entries.map(->it.role),
        entries.map(->it.type),
        entries.map(->it.ref)
      ]
    .then -> # finished.

api.put \/detail/, aux.signed, grecaptcha, (req, res) ->
  lc = {}
  {slug, type, payload} = (req.body or {})
  if !(slug and type and payload) => return aux.r400 res
  if !(type in <[prj brd org post form]>) => return aux.r400 res
  info = payload.info or {}
  [name, description] = ["#{info.name or info.title or ''}".substring(0,128), "#{info.description or ''}".substring(0,500)]
  cache.perm.check {io, user: req.user, type: type, slug, action: \owner}
    .then ->
      if type == \prj =>
        cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-edit"}
          .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: \prj-edit-own}
      else Promise.resolve!
    .catch (e) ->
      if type == \prj => cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: \owner}
      else return Promise.reject e
    .then ->
      io.query """
      update #type set detail = $1 where slug = $2 and deleted is not true
      """, [JSON.stringify(payload), slug]
    .then ->
      if !name => return
      if type == \prj
        thumb = (info.thumb or {}).fn
        io.query """
        update prj set (name,description,category,tag,thumb,state) = ($1,$2,$3,$4,$5,'active')
        where slug = $6 and deleted is not true
        """, [name,description,(info.category or ''),JSON.stringify((info.tag or [])),thumb,slug]
      else if type == \brd
        time = <[starttime endtime]>.map ->
          if !info[it] or isNaN(ret = new Date(info[it])) => null else ret.toISOString!
        io.query """
        update #type set (name,description,starttime,endtime) = ($1,$2,$3,$4)
        where slug = $5 and deleted is not true
        """, [name,description,time.0,time.1,slug]
      else
        io.query """
        update #type set (name,description) = ($1,$2) where slug = $3 and deleted is not true
        """, [name,description,slug]
    .then ->
      if payload.perm => update-permission { type, perm: (payload.perm), slug }
    .then ->
      cache.perm.invalidate {type: type, slug}
      cache.stage.invalidate {type: type, slug}
    .then ->
      doc_id = "#type/#slug"
      save-snapshot {io, sharedb: engine.sharedb, version: null, doc_id}
    .then -> res.send {}
    .catch aux.error-handler res

get-prj-list = (req, res) ->
  Promise.resolve!
    .then ->
      {offset,limit} = req.query{offset,limit}
      badge = (req.query.badge or '').split(',')
      {keyword,tag,category,grp} = req.query{keyword, category, tag, grp}
      if !(slug = req.params.slug) => return aux.reject 400
      offset = (if isNaN(+offset) => 0 else +offset ) >? 0
      # TODO we make limit quite large so we dont have to support pagination. at least for now
      limit = (if isNaN(+limit) => 500 else +limit ) <? 500 >? 1
      if !slug => return aux.reject 400
      idx1 = 4 + ([tag].filter(-> it).length)
      idx2 = 4 + ([tag,category].filter(-> it).length)
      idx3 = 4 + ([tag,category,keyword].filter(-> it).length)
      io.query(
        [
        """
        with cte as (
        select p.*,u.displayname as ownername, u.username as owneremail
        from prj as p, users as u
        where p.detail is not null and u.key = p.owner and p.brd = $3 and p.deleted is not true
        """,
        "and grp = $#idx3" if grp
        "and tag ? $4" if tag
        "and category = $#idx1" if category
        "and name ~ $#idx2" if keyword
        "and (system->'badge'->>'shortlist')::bool = true" if \shortlist in badge
        "and (system->'badge'->>'finalist')::bool = true" if \finalist in badge
        "and (system->'badge'->>'winner')::bool = true" if \winner in badge
        """) select * from (
          table cte limit $2 offset $1
        ) sub
        right join (select count(*) from cte) c(full_count) on true
        """
        ].filter(->it).join(' '), [offset, limit, slug] ++ ([tag, category, keyword, grp].filter(->it))
      )
    .then (r={}) -> return r.[]rows.filter(-> it.slug)

api.get \/brd/:slug/list, throttle.count.user, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  cache.stage.check {io, type: \brd, slug: slug, name: \prj-list-view}
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: slug, action: <[owner judge]>}
    .then -> get-prj-list req, res
    .then -> res.send it
    .catch aux.error-handler res

app.get \/brd/:slug/prj/create, (req, res) ->
  lc = {}
  slug = req.params.slug
  cache.stage.check {io, type: \brd, slug: slug, name: \prj-new}
    .catch -> Promise.reject new lderror({ldcv: "not-yet-available"}, 1012)
    .then -> io.query """select name,slug,org,detail from brd where slug = $1 and deleted is not true""", [slug]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 400
      if !(brd.detail.custom and brd.detail.custom.view) => view = \view/default/prj-create.pug
      else view = "view/#{brd.detail.custom.view}/prj-create.pug"
      delete brd.detail
      res.render view, lc{brd} <<< {exports: lc{brd}} <<< req.scope{domain}
    .catch aux.error-handler res

app.get \/brd/:slug/list, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  cache.stage.check {io, type: \brd, slug: slug, name: \prj-list-view}
    .then -> get-prj-list req, res
    .then (ret) ->
      lc.prjs = ret
      io.query """
      select b.name, b.description, b.slug, b.org, b.detail from brd as b
      where b.slug = $1 and b.deleted is not true
      """, [slug]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      lc.grps = lc.brd.detail.group.map -> it{form,key}
      lc.page-info = lc.brd.detail.{}page.{}info.{}generic <<< lc.brd.detail.info
      delete lc.brd.detail
      res.render \view/default/prj-list.pug, lc
      return null
    .catch aux.error-handler res

app.get \/brd/:slug, (req, res) ->
  lc = {}
  if !req.user => return aux.r403 res
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select * from brd where slug = $1 and deleted is not true", [slug]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 404
      res.render \pages/under-construction.pug, lc{brd}
      /*
      io.query "select * from prj where brd = $1 and deleted is not true", [brd.slug]
    .then (r={}) ->
      lc.projects = r.[]rows
      res.render \pages/under-construction.pug, lc{brd, projects}
      */
    .catch aux.error-handler res

api.post \/deploy, aux.signed, throttle.count.user-md, grecaptcha, (req, res) ->
  lc = {}
  {slug, type} = (req.body or {})
  if !(slug and type and (type in <[org brd]>)) => return aux.r400 res
  cache.perm.check {io, user: req.user, type, slug, action: \owner}
    .then ->
      if type == \org =>
        return io.query """
        select detail->'page'->'info' as info from org
        where slug = $1 and deleted is not true""", [slug]
      io.query """
      select b.detail->'page'->'info' as info, b.org
      from brd as b where b.slug = $1 and b.deleted is not true
      """, [slug]
    .then (r={}) ->
      if !((ret = r.[]rows.0) and (lc.git = git = ret.{}info.git)) => return aux.reject 404
      if !(git.url and git.branch) => return aux.reject 404
      # deploy might take a while, so we go back to user first.
      res.send {}
      opt = {io}
      opt[type] = slug
      slugs opt
    .then (ret) ->
      {root,prj,org,brd} = ret
      deploy {url: lc.git.url, branch: lc.git.branch, root: path.join(root, \static)}
        .catch -> console.log "deploy failed ( #root ): ", it
    .catch aux.error-handler res

api.post \/brd, aux.signed, throttle.count.user-md, express-formidable!, grecaptcha, (req, res) ->
  lc = {}
  {name,description,slug,starttime,endtime,org} = req.fields
  if !name or !org or !/^[a-zA-Z0-9+_-]+$/.exec(slug) => return aux.r400 res
  detail = {info: {name, description, starttime, endtime}, group: []}
  io.query "select key from brd where slug = $1", [slug]
    .then (r={}) ->
      if r.rows and r.rows.length => return aux.reject new lderror(1011)
      io.query """select slug from org where slug = $1 and deleted is not true""", [org]
    .then (r={}) ->
      if !(r.[]rows.0) => return aux.reject 404
      cache.perm.check {io, user: req.user, type: \org, slug: org, action: \owner}
    .then ->
      io.query """
      insert into brd (name,description,slug,starttime,endtime,org,owner,detail)
      values ($1,$2,$3,$4,$5,$6,$7,$8) returning key
      """, [name, description, slug, (starttime or null), (endtime or null), org, req.user.key, detail]
    .then (r = {}) -> res.send((r.[]rows or []).0)
    .catch aux.error-handler res

# following routes are for both brd and org. put it here in brd.ls temporarily.

api.post \/slug-check/:type, aux.signed, throttle.count.ip, (req, res) ->
  [type,slug] = [req.params.type, req.body.slug]
  if !((type in <[org brd]>) and /^[A-Za-z0-9+_-]+$/.exec(slug)) => return aux.r404 res
  io.query "select key from #type where slug = $1", [slug]
    .then (r = {}) -> res.send {result: if (r.rows or []).length => 'used' else 'free'}
    .catch aux.error-handler res

#TODO review
api.post \/brd/:brd/grp/:grp/info, (req, res) ->
  lc = {}
  if !((brd = req.params.brd) and (grp = req.params.grp)) => return aux.r400 res
  fields = req.body.[]fields.filter -> it in <[grade judge criteria form judgePerm]>
  io.query "select key,name,description,slug,detail from brd where slug = $1 and deleted is not true", [brd]
    .then (r={}) ->
      if !(lc.ret = ret = r.[]rows.0) => return aux.reject 404
      if !(g = ret.detail.[]group.filter(-> it.key == grp).0) => return aux.reject 404
      lc.grpinfo = grpinfo = g{info, key}
      for f in fields => grpinfo[f] = g[f]
      if \judgePerm in fields =>
        jp = grpinfo.{}judgePerm.[]list
        emails = jp.map -> it.email
        io.query "select u.key,u.username from users as u where u.username = ANY($1::text[])", [emails]
          .then (r={}) ->
            hash = {}
            r.[]rows.map -> hash[it.username] = it.key
            jp.map (j) -> j.key = hash[j.email]
      else Promise.resolve!
    .then ->
      res.send {brd: lc.ret{key,name,description,slug}, grp: lc.grpinfo}
    .catch aux.error-handler res

# TODO who use this?
api.get \/brd/:slug/form/, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select key,name,description,slug,detail from brd where slug = $1 and deleted is not true", [slug]
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      ret.detail = ret.detail{group}
      ret.detail.group = ret.detail.group.map -> it{form, info, key}
      res.send ret{key,name,description,slug,detail}
    .catch aux.error-handler res

api.get \/brd/:brd/grp/:grp/prjs, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  {brd, grp} = req.params{brd, grp}
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[owner]>}
    .then ->
      io.query """
      select p.*, u.username from prj as p
      left join users as u on u.key = p.owner
      where
        p.detail is not null
        and p.deleted is not true
        and p.brd = $1
        and p.grp = $2
      """, [brd, grp]
    .then (r={}) -> res.send(r.[]rows)
    .catch aux.error-handler res
