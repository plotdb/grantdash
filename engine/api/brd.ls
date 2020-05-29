require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

app.get \/b/:bslug/g/:gslug/list, (req, res) ->
  {offset,limit} = req.query{offset,limit}
  {bslug,gslug} = req.params{bslug,gslug}
  offset = (if isNaN(+offset) => 0 else +offset ) >? 0
  limit = (if isNaN(+limit) => 24 else +limit ) <? 100 >? 1
  if !(bslug and gslug) => return aux.r400 res
  #io.query "select p.* from prj as p where brd = $1 and grp = $2", [bslug, gslug]
  io.query """
  select p.*,u.displayname as ownername
  from prj as p, users as u
  """
    .then (r={}) ->
      res.render \prj/list.pug, {prjs: r.[]rows}
      return null
    .catch aux.error-handler res

app.get \/b/:slug, aux.signed, (req, res) ->
  lc = {}
  if !req.user => return aux.r403 res
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select * from brd where slug = $1", [slug]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 404
      if brd.owner != req.user.key => return aux.reject 403
      io.query "select * from prj where brd = $1", [brd.key]
    .then (r={}) ->
      lc.projects = r.[]rows
      res.render \b/index.pug, lc{brd, projects}
    .catch aux.error-handler res

api.get \/b/:slug/form/, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select key,name,description,slug,detail from brd where slug = $1", [slug]
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      ret.detail = ret.detail{group}
      ret.detail.group = ret.detail.group.map -> it{form, info, key}
      res.send ret{key,name,description,slug,detail}
    .catch aux.error-handler res

api.put \/detail/, aux.signed, (req, res) ->
  {slug, type, payload} = (req.body or {})
  if !(slug and type and payload) => return aux.r400 res
  tables = <[prj brd org]>
  table = tables[tables.indexOf(type)]
  if !(table = tables[tables.indexOf(type)]) => return aux.r400 res
  if (info = payload.info) => [name, description] = [(info.name or info.title), info.description]
  io.query "update #table set detail = $1 where slug = $2", [JSON.stringify(payload), slug]
    .then ->
      if !name => return
      io.query """
      update #table set (name,description) = ($1,$2)  where slug = $3
      """, [name,description,slug]
    .then ->
      if table != \prj => return
      root = "users/p/#{slug}"
      fs-extra.readdir root
        .then (files) ->
          ps = files
            .filter -> /^draft./.exec(it)
            .map -> ["#root/#it", "#root/#{it.replace(/draft\./, 'publish.')}"]
            .map -> fs-extra.rename it.0, it.1
          Promise.all ps
    .then -> res.send {}
    .catch aux.error-handler res

api.post \/b, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,slug,starttime,endtime,org} = req.fields
  if !name or !/^[a-zA-Z0-9-]+$/.exec(slug) => return aux.r400 res
  thumb = (req.files["thumbnail[]"] or {}).path
  detail = {info: {name, description, starttime, endtime}, group: []}
  io.query "select key from brd where slug = $1", [slug]
    .then (r={}) ->
      if r.rows and r.rows.length => return aux.reject new lderror(1011)
      io.query """
      insert into brd (name,description,slug,starttime,endtime,org,owner,detail)
      values ($1,$2,$3,$4,$5,$6,$7,$8) returning key
      """, [name, description, slug, (starttime or null), (endtime or null), (org or null), req.user.key, detail]
    .then (r = {}) ->
      lc.ret = (r.[]rows or []).0
      if !thumb => return
      new Promise (res, rej) ->
        root = "static/assets/uploads/b/#slug"
        (e) <- fs-extra.ensure-dir root, _
        if e => return rej(e)
        (e,i) <- sharp(thumb).toFile path.join(root, "thumb.png"), _
        if e => rej(e) else res!
    .then -> res.send lc.ret
    .catch aux.error-handler res

# following routes are for both brd and org. put it here in brd.ls temporarily.

app.get \/o/:key/admin, aux.signed, (req, res) ->
  res.render \admin/index.pug, {org: {key: req.params.key}}

app.get \/b/:key/admin, aux.signed, (req, res) ->
  lc = {}
  io.query "select * from brd where key = $1", [req.params.key]
    .then (r={}) ->
      if !(brd = r.[]rows.0) => return aux.reject 404
      if brd.owner != req.user.key => return aux.reject 403
      lc.brd = brd
      return if !brd.org => Promise.resolve! else io.query "select * from org where key = $1", [brd.org]
    .then (r={}) ->
      org = r.{}rows.0
      res.render \admin/index.pug, {org, brd: lc.brd}
      return null
    .catch aux.error-handler res

api.post \/slug-check/:type, (req, res) ->
  type = {o: \org, b: \brd}[req.params.type] 
  if !type or !/^[A-Za-z0-9-]+$/.exec(req.body.slug) => return aux.r404!
  io.query "select key from #type where slug = $1", [req.body.slug or '']
    .then (r = {}) -> res.send {result: if (r.rows or []).length => 'used' else 'free'}
    .catch aux.error-handler res
