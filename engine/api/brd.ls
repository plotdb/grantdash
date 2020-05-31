require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit]>
require! <[../aux ./permcache]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

upload = ({root, files}) -> new Promise (res, rej) ->
  (e) <- fs-extra.ensure-dir path.join(root, 'draft'), _
  if e => return rej(e)
  ps = files.map ({name, type, list}) ->
    if type in <[banner thumb]> =>
      f = list.0
      (res, rej) <- new Promise _
      (e,i) <- sharp(f.path).toFile path.join(root, "#type.#{f.type}"), _
      return if e => rej(e) else res!
    else
      id = suuid!
      ps = list.map (f,i) -> fs-extra.copy(f.path, path.join(root, 'draft', "#{id}.#{idx}.#{f.type}"))
      Promise.all ps

  Promise.all(ps)
    .then -> res it
    .catch -> rej it

api.post \/upload, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {org,brd,prj,files} = req.fields
  if !(files and Array.isArray(files) and files.length) => return aux.r400 res
  files = files
    .map ({name,type}) ->
      list = req.files["#{name}[]"]
      list = if Array.isArray(list) => list else [list]
      list
        .map -> {path: it.path, type: it.type.split(\/).1}
        .filter -> /([a-zA-Z0-9]{1,6}$)/.exec(it.type)
      reutrn {name, type, list}
    .filter -> it.list.length > 0 and it.list.length < 10

  lc.type = type = if prj => \prj else if brd => \brd else if org => \org else null
  if !type => return aux.r400 res
  # TODO use left join to speed up
  promise = if type == \prj =>
    io.query """
    select o.slug as org, b.slug as brd, p.slug as prj
    from org as o, brd as b, prj as p
    where prj.slug = $1 and prj.brd = brd.slug and brd.org = org.slug
    """, [prj]
  else if type == \brd =>
    io.query """
    select o.slug as org, b.slug as brd
    from org as o, brd as b
    where brd.slug = $1 and brd.org = org.slug
    """, [brd]
  else if type == \org =>
    io.query """
    select o.slug as org
    from org as o
    where org.slug = $1
    """, [org]
  promise
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      {org,brd,prj} = ret
      lc.root = if type == \prj => "users/org/#{org}/prj/#{prj}/upload"
      else if type == \brd => "users/org/#{org}/brd/#{brd}/upload"
      else if type == \org => "users/org/#{org}/upload"
      else null
      if !lc.root => return aux.reject 400
      # TODO verify prj form criteria
      upload {root, files}

    .catch aux.error-handler res

app.get \/brd/:bslug/grp/:gslug/list, (req, res) ->
  lc = {}
  {offset,limit} = req.query{offset,limit}
  {bslug,gslug} = req.params{bslug,gslug}
  offset = (if isNaN(+offset) => 0 else +offset ) >? 0
  limit = (if isNaN(+limit) => 24 else +limit ) <? 100 >? 1
  if !(bslug and gslug) => return aux.r400 res
  io.query "select b.name, b.description, b.slug from brd as b where b.slug = $1", [bslug]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      #io.query "select p.* from prj as p where brd = $1 and grp = $2", [bslug, gslug]
      io.query """
      select p.*,u.displayname as ownername
      from prj as p, users as u
      """
    .then (r={}) ->
      res.render \prj/list.pug, {prjs: r.[]rows, brd: lc.brd}
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
      res.render \b/index.pug, lc{brd, projects}
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

deploy = ({url, root, branch}) ->
  # open repo at certain location
  nodegit.Repository.open root
    # repo not found. create one ....
    .catch -> nodegit.Repository.init root, 0
    .then (repo) ->
      repo.getRemotes!
        .then (rs) ->
          Promise.all( rs.map (r) ->
            if r.url! == url => return true
            nodegit.Remote.delete repo, r.name! .finally -> return false
          )
        .then (rs) ->
          # url isn't found in current remotes
          if !rs.reduce(((a,b) -> a or b), false) =>
            # single-branch workaround - https://github.com/nodegit/nodegit/issues/1669
            remote = nodegit.Remote.createWithFetchspec(
              repo, \origin, url, "+refs/heads/#branch:refs/remotes/origin/#branch"
            )
        # now we got repo. fetch any new data ..
        .then -> repo.fetchAll!
        # checkout branch
        .then -> repo.getBranch "refs/remotes/origin/#{branch}"
        .then (ref) -> repo.checkoutRef ref
        .catch (e) -> console.log "[Deploy Error]", e

api.post \/deploy, aux.signed, (req, res) ->
  {slug, type} = (req.body or {})
  if !(slug and type and (type in <[org brd]>)) => return aux.r400 res
  permcache.check {io, user: req.user, type, slug, action: \owner}
    .then ->
      if type == \org => return io.query "select detail->'page'->'info' as info from org where slug = $1", [slug]
      io.query """
      select b.detail->'page'->'info' as info, b.org
      from brd as b where b.slug = $1
      """, [slug]
    .then (r={}) ->
      if !((ret = r.[]rows.0) and (git = ret.{}info.git)) => return aux.reject 404
      if !(git.url and git.branch) => return aux.reject 404
      return git
    .then (git) ->
      # deploy might take a while, so we go back to user first.
      res.send {}
      type = type.substring(0,1)
      if type == \org => 
      deploy {url: git.url, branch: git.branch, root: "users/#type/#slug/static"}
        .catch ->
    .catch aux.error-handler res

api.put \/detail/, aux.signed, (req, res) ->
  lc = {}
  {slug, type, payload} = (req.body or {})
  if !(slug and type and payload) => return aux.r400 res
  tables = <[prj brd org]>
  table = tables[tables.indexOf(type)]
  if !(table = tables[tables.indexOf(type)]) => return aux.r400 res
  if (info = payload.info) => [name, description] = [(info.name or info.title), info.description]

  permcache.check {io, user: req.user, type: table, slug, action: \owner}
    .then ->
      io.query "update #table set detail = $1 where slug = $2", [JSON.stringify(payload), slug]
    .then ->
      if !name => return
      io.query """
      update #table set (name,description) = ($1,$2)  where slug = $3
      """, [name,description,slug]
    .then ->
      permcache.invalidate {type: table, slug}
      if table != \prj => return
      lc.root = "users/prj/#{slug}"
      fs-extra.path-exists lc.root
    .then (exists) ->
      if !exists => return
      fs-extra.readdir lc.root
        .then (files) ->
          ps = files
            .filter -> /^draft./.exec(it)
            .map -> ["#{lc.root}/#it", "#{lc.root}/#{it.replace(/draft\./, 'publish.')}"]
            .map -> fs-extra.rename it.0, it.1
          Promise.all ps
    .then -> res.send {}
    .catch aux.error-handler res

api.post \/brd, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,slug,starttime,endtime,org} = req.fields
  if !name or !org or !/^[a-zA-Z0-9+_-]+$/.exec(slug) => return aux.r400 res
  thumb = (req.files["thumbnail[]"] or {}).path
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
      lc.ret = (r.[]rows or []).0
      if !thumb => return
      new Promise (res, rej) ->
        root = "users/org/#{org}/brd/#{slug}/upload"
        (e) <- fs-extra.ensure-dir root, _
        if e => return rej(e)
        (e,i) <- sharp(thumb).toFile path.join(root, "thumb.png"), _
        if e => rej(e) else res!
    .then -> res.send lc.ret
    .catch aux.error-handler res

# following routes are for both brd and org. put it here in brd.ls temporarily.

app.get \/org/:slug/admin, aux.signed, (req, res) ->
  res.render \admin/index.pug, {org: {slug: req.params.key}}

app.get \/brd/:slug/admin, aux.signed, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r404 res
  io.query "select * from brd where slug = $1", [slug]
    .then (r={}) ->
      if !(brd = r.[]rows.0) => return aux.reject 404
      if brd.owner != req.user.key => return aux.reject 403
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
