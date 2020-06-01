require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit suuid]>
require! <[../aux ./permcache]>
(engine,io) <- (->module.exports = it)  _

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

slugs = ({io, org, brd, prj}) -> new Promise (res, rej) ->
  type = if prj => \prj else if brd => \brd else if org => \org else null
  if !type => return rej(new lderror 400)
  # TODO use left join to speed up
  promise = if type == \prj =>
    io.query """
    select o.slug as org, b.slug as brd, p.slug as prj
    from org as o, brd as b, prj as p
    where p.slug = $1 and p.brd = b.slug and b.org = o.slug
    """, [prj]
  else if type == \brd =>
    io.query """
    select o.slug as org, b.slug as brd
    from org as o, brd as b
    where b.slug = $1 and b.org = o.slug
    """, [brd]
  else if type == \org =>
    io.query """
    select o.slug as org
    from org as o
    where o.slug = $1
    """, [org]
  promise
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      {org,prj,brd} = ret
      root = if type == \prj => "users/org/#{org}/prj/#{prj}"
      else if type == \brd => "users/org/#{org}/brd/#{brd}"
      else if type == \org => "users/org/#{org}"
      else null
      if !root => return aux.reject 400
      res(ret <<< {type,root})
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
      opt = {io}
      opt[table] = slug
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


app.get \/brd/:slug/list, (req, res) ->
  lc = {}
  {offset,limit} = req.query{offset,limit}
  slug = req.params.slug
  offset = (if isNaN(+offset) => 0 else +offset ) >? 0
  limit = (if isNaN(+limit) => 24 else +limit ) <? 100 >? 1
  if !slug => return aux.r400 res
  io.query "select b.name, b.description, b.slug, b.org, b.detail from brd as b where b.slug = $1", [slug]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      lc.grps = lc.brd.detail.group.map -> it{form,key}
      delete lc.brd.detail
      #io.query "select p.* from prj as p where brd = $1 and grp = $2", [slug, gslug]
      io.query """
      select p.*,u.displayname as ownername
      from prj as p, users as u
      """
    .then (r={}) ->
      res.render \prj/list.pug, {prjs: r.[]rows, brd: lc.brd, grps: lc.grps}
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
  lc = {}
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
