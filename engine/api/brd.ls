require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit suuid]>
require! <[../aux ./cache ./common]>
(engine,io) <- (->module.exports = it)  _

{deploy, slugs} = common

api = engine.router.api
app = engine.app

upload = ({root, files}) -> new Promise (res, rej) ->
  (e) <- fs-extra.ensure-dir path.join(root, \upload, \draft), _
  if e => return rej(e)
  ps = files.map ({name, type, list}) ->
    if type in <[banner thumb]> =>
      f = list.0
      (res, rej) <- new Promise _
      (e,i) <- sharp(f.path).toFile path.join(root, \upload, \draft, "#type.png"), _
      return if e => rej(e) else res {name, type, files: ["#type.png"]}
    else
      id = suuid!
      ps = list.map (f,idx) ->
        fn = "#{id}.#{idx}.#{f.type}"
        fs-extra.copy(f.path, path.join(root, \upload, \draft, fn))
          .then -> fn
      Promise.all ps
        .then (files) -> {name, type, id, files}

  Promise.all(ps)
    .then -> res it
    .catch -> rej it


api.post \/upload, aux.signed, express-formidable({multiples:true}), (req, res) ->
  lc = {}
  {org,brd,prj,files} = req.fields
  try
    files = JSON.parse(files)
  catch e
    return aux.r400 res
  if !(files and Array.isArray(files) and files.length) => return aux.r400 res
  files = files
    .map ({name,type}) ->
      list = req.files["#{name}[]"]
      list = if Array.isArray(list) => list else [list]
      list = list
        .map -> {path: it.path, type: it.type.split(\/).1}
        .filter -> /([a-zA-Z0-9]{1,6}$)/.exec(it.type)
      return {name, type, list}
    .filter -> it.list.length > 0 and it.list.length < 10

  slugs {io, org, brd, prj}
    .then ({type, prj, brd, org, root}) ->
      # TODO verify prj form criteria
      upload {root, files}
    .then -> res.send it
    .catch aux.error-handler res


api.put \/detail/, aux.signed, (req, res) ->
  lc = {}
  {slug, type, payload} = (req.body or {})
  if !(slug and type and payload) => return aux.r400 res
  if !(type in <[prj brd org]>) => return aux.r400 res
  if (info = payload.info) => [name, description] = [(info.name or info.title), info.description]
  cache.perm.check {io, user: req.user, type: type, slug, action: \owner}
    .then ->
      io.query "update #type set detail = $1 where slug = $2", [JSON.stringify(payload), slug]
    .then ->
      if !name => return
      if type == \prj
        io.query """
        update prj set (name,description,category,tag) = ($1,$2,$3,$4)  where slug = $5
        """, [name,description,(info.category or ''),JSON.stringify((info.tag or [])),slug]
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
    .then -> res.send {}
    .catch aux.error-handler res

get-prj-list = (req, res) ->
  Promise.resolve!
    .then ->
      {offset,limit} = req.query{offset,limit}
      {keyword,tag,category} = req.query{keyword, category, tag}
      slug = req.params.slug
      offset = (if isNaN(+offset) => 0 else +offset ) >? 0
      limit = (if isNaN(+limit) => 24 else +limit ) <? 100 >? 1
      if !slug => return aux.reject 400
      idx1 = 4 + ([tag].filter(-> it).length)
      idx2 = 4 + ([tag,category].filter(-> it).length)
      io.query(
        [
        """
        with cte as (
        select p.*,u.displayname as ownername
        from prj as p, users as u
        where u.key = p.owner and p.brd = $3
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
    .then (r={}) -> return r.[]rows

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
      lc.page-info = lc.brd.detail.{}page.{}info.{}generic
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
      io.query "select * from prj where brd = $1", [brd.slug]
    .then (r={}) ->
      lc.projects = r.[]rows
      res.render \brd/index.pug, lc{brd, projects}
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
