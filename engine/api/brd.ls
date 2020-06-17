require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit suuid mime-types]>
require! <[../aux ./cache ./common]>
(engine,io) <- (->module.exports = it)  _

{deploy, slugs, save-snapshot} = common

api = engine.router.api
app = engine.app

# project file permission check
# X-Accel-Redirect will be intercepted by Nginx, and then use to serve corresponding location.
# once we config it as internal, it will only accessible through this route.
app.get \/org/:org/prj/:prj/upload/:file, (req, res) ->
  {org, prj, file} = req.params{org, prj, file}
  lc = {}
  cache.perm.check {io, user: req.user, type: \prj, slug: prj, action: \owner}
    .catch ->
      cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: \owner}
    .catch ->
      io.query "select grp,detail from prj where slug = $1", [prj]
        .then (r={}) ->
          if !(lc.prj = r.[]rows.0) => return aux.reject 404
          io.query "select detail from brd where slug = $1", [req.scope.brd]
        .then (r={}) ->
          if !(lc.brd = r.[]rows.0) => return aux.reject 404
          grps = lc.brd.{}detail.[]group
          if !(grp = grps.filter(-> lc.prj.grp == it.key).0) => return aux.reject 404
          is-public = grp.{}form.[]list.filter(-> it.name in <[form-thumbnail form-file]>)
            .filter -> lc.prj.detail.answer[it.key].[]list.filter(-> it.fn == file).length
            .filter -> it.{}config.public
            .length
          if !is-public => return Promise.reject 403
    .then ->
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

api.post \/upload, aux.signed, express-formidable({multiples:true}), (req, res) ->
  lc = {}
  {org,brd,prj,post,files} = req.fields

  files = []
  for name,list of req.files => files ++= list
  if files.length > 10 or files.filter(->it.size >= 10485760).length => return aux.r413 res

  slugs {io, org, brd, prj, post}
    .then ({type, prj, brd, org, root}) ->
      # TODO verify prj form criteria
      upload {root, files}
    .then -> res.send it
    .catch aux.error-handler res

api.put \/detail/, aux.signed, (req, res) ->
  lc = {}
  {slug, type, payload} = (req.body or {})
  if !(slug and type and payload) => return aux.r400 res
  if !(type in <[prj brd org post]>) => return aux.r400 res
  info = payload.info or {}
  [name, description] = [(info.name or info.title), info.description]
  cache.perm.check {io, user: req.user, type: type, slug, action: \owner}
    .then ->
      io.query "update #type set detail = $1 where slug = $2", [JSON.stringify(payload), slug]
    .then ->
      if !name => return
      if type == \prj
        thumb = (info.thumb or {}).fn
        io.query """
        update prj set (name,description,category,tag,thumb) = ($1,$2,$3,$4,$5) where slug = $6
        """, [name,description,(info.category or ''),JSON.stringify((info.tag or [])),thumb,slug]
      else
        io.query """
        update #type set (name,description) = ($1,$2)  where slug = $3
        """, [name,description,slug]
    .then ->
      cache.perm.invalidate {type: type, slug}
      cache.stage.invalidate {type: type, slug}
      opt = {io}
      opt[type] = slug
      slugs opt
        .then (ret) ->
          {root,type,prj,brd,org} = ret
          release = path.join(root, \upload, \release)
          draft = path.join(root, \upload, \draft)
          if !(/^users\//.exec(release) and /^users\//.exec(draft)) => return aux.reject 400
          fs-extra.ensure-dir release
            .then -> fs-extra.remove release
            .then -> fs-extra.ensure-dir draft
            .then -> fs-extra.move draft, release
    .then ->
      doc_id = "#type/#slug"
      save-snapshot {io, sharedb: engine.sharedb, version: null, doc_id}
    .then -> res.send {}
    .catch ->
      console.log it
      aux.error-handler(res) it

get-prj-list = (req, res) ->
  Promise.resolve!
    .then ->
      {offset,limit} = req.query{offset,limit}
      {keyword,tag,category} = req.query{keyword, category, tag}
      slug = req.params.slug
      offset = (if isNaN(+offset) => 0 else +offset ) >? 0
      # TODO we make limit quite large so we dont have to support pagination. at least for now
      limit = (if isNaN(+limit) => 500 else +limit ) <? 500 >? 1
      if !slug => return aux.reject 400
      idx1 = 4 + ([tag].filter(-> it).length)
      idx2 = 4 + ([tag,category].filter(-> it).length)
      io.query(
        [
        """
        with cte as (
        select p.*,u.displayname as ownername
        from prj as p, users as u
        where p.detail is not null and u.key = p.owner and p.brd = $3 and p.deleted is not true
        """,
        "and tag ? $4" if tag
        "and category = $#idx1" if category
        "and name ~ $#idx2" if keyword
        """) select * from (
          table cte limit $2 offset $1
        ) sub
        right join (select count(*) from cte) c(full_count) on true
        """
        ].filter(->it).join(' '), [offset, limit, slug] ++ ([tag, category, keyword].filter(->it))
      )
    .then (r={}) -> return r.[]rows.filter(-> it.slug)

api.get \/brd/:brd/grp/:grp/judge-list, aux.signed, (req, res) ->
  {brd, grp} = req.params{brd, grp}
  if !(brd and grp) => return aux.r400 res
  # TODO check user permission
  Promise.resolve!
    .then ->
      io.query """
      select p.name, p.slug, u.displayname as ownername from prj as p
      left join users as u on u.key = p.owner
      where
        p.detail is not null and
        p.brd = $1 and
        p.grp = $2 and
        p.deleted is not true
      """, [brd, grp]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res

api.get \/brd/:slug/list, (req, res) ->
  get-prj-list req, res
    .then -> res.send it
    .catch aux.error-handler res

app.get \/brd/:slug/list, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  get-prj-list req, res
    .then (ret) ->
      lc.prjs = ret
      io.query "select b.name, b.description, b.slug, b.org, b.detail from brd as b where b.slug = $1", [slug]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      lc.grps = lc.brd.detail.group.map -> it{form,key}
      lc.page-info = lc.brd.detail.{}page.{}info.{}generic <<< lc.brd.detail.info
      delete lc.brd.detail
      res.render \prj/list.pug, lc
      return null
    .catch aux.error-handler res

app.get \/brd/:slug, aux.signed, (req, res) ->
  lc = {}
  if !req.user => return aux.r403 res
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select * from brd where slug = $1", [slug]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 404
      if brd.owner != req.user.key => return aux.reject 403
      io.query "select * from prj where brd = $1 and deleted is not true", [brd.slug]
    .then (r={}) ->
      lc.projects = r.[]rows
      res.render \pages/under-construction.pug, lc{brd, projects}
    .catch aux.error-handler res

api.post \/brd/:brd/grp/:grp/info, (req, res) ->
  if !((brd = req.params.brd) and (grp = req.params.grp)) => return aux.r400 res
  fields = req.body.[]fields.filter -> it in <[grade criteria form]>
  io.query "select key,name,description,slug,detail from brd where slug = $1", [brd]
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      if !(g = ret.detail.[]group.filter(-> it.key == grp).0) => return aux.reject 404
      grpinfo = g{info, key}
      for f in fields => grpinfo[f] = g[f]
      res.send {brd: ret{key,name,description,slug}, grp: grpinfo}
    .catch aux.error-handler res

api.get \/brd/:slug/form/, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select key,name,description,slug,detail from brd where slug = $1", [slug]
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      ret.detail = ret.detail{group}
      ret.detail.group = ret.detail.group.map -> it{form, info, key}
      res.send ret{key,name,description,slug,detail}
    .catch aux.error-handler res

api.post \/deploy, aux.signed, (req, res) ->
  lc = {}
  {slug, type} = (req.body or {})
  if !(slug and type and (type in <[org brd]>)) => return aux.r400 res
  cache.perm.check {io, user: req.user, type, slug, action: \owner}
    .then ->
      if type == \org => return io.query "select detail->'page'->'info' as info from org where slug = $1", [slug]
      io.query """
      select b.detail->'page'->'info' as info, b.org
      from brd as b where b.slug = $1
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

api.post \/brd, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,slug,starttime,endtime,org} = req.fields
  if !name or !org or !/^[a-zA-Z0-9+_-]+$/.exec(slug) => return aux.r400 res
  detail = {info: {name, description, starttime, endtime}, group: []}
  io.query "select key from brd where slug = $1", [slug]
    .then (r={}) ->
      if r.rows and r.rows.length => return aux.reject new lderror(1011)
      io.query """select slug from org where slug = $1""", [org]
    .then (r={}) ->
      if !(r.[]rows.0) => return aux.reject 404
      io.query """
      insert into brd (name,description,slug,starttime,endtime,org,owner,detail)
      values ($1,$2,$3,$4,$5,$6,$7,$8) returning key
      """, [name, description, slug, (starttime or null), (endtime or null), org, req.user.key, detail]
    .then (r = {}) ->
      res.send((r.[]rows or []).0)
    .catch aux.error-handler res

# following routes are for both brd and org. put it here in brd.ls temporarily.

app.get \/org/:slug/admin, aux.signed, (req, res) ->
  res.render \admin/index.pug, {org: {slug: req.params.key}}

app.get \/brd/:slug/admin, aux.signed, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r404 res
  cache.perm.check {io, user: req.user, type: \brd, slug: slug, action: \owner}
    .then ->
      io.query "select * from brd where slug = $1", [slug]
    .then (r={}) ->
      if !(brd = r.[]rows.0) => return aux.reject 404
      lc.brd = brd
      return if !brd.org => Promise.resolve! else io.query "select * from org where slug = $1", [brd.org]
    .then (r={}) ->
      org = r.{}rows.0
      res.render \admin/index.pug, {org, brd: lc.brd}
      return null
    .catch aux.error-handler res

api.post \/slug-check/:type, (req, res) ->
  [type,slug] = [req.params.type, req.body.slug]
  if !((type in <[org brd]>) and /^[A-Za-z0-9+_-]+$/.exec(slug)) => return aux.r404 res
  io.query "select key from #type where slug = $1", [slug]
    .then (r = {}) -> res.send {result: if (r.rows or []).length => 'used' else 'free'}
    .catch aux.error-handler res
