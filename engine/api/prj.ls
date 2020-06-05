require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

app.get \/prj/:slug, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """
  select p.*,u.displayname as ownerName
  from prj as p, users as u
  where slug = $1 and p.owner = u.key
  """, [slug]
    .then (r={}) ->
      if !(lc.prj = prj = r.[]rows.0) => return aux.reject 404
      io.query """select name,slug,org,detail from brd where brd.slug = $1""", [lc.prj.brd]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 400
      lc.grp = grp = (brd.{}detail.{}group or []).filter(-> it.key == lc.prj.grp).0
      lc.page-info = brd.{}detail.{}page.{}info.{}generic
      if !lc.grp => return aux.reject 400
      lc.grp = grp = grp{form,info}
      delete brd.detail
      view = if (req.{}query.simple)? => \prj/view-standalone.pug
      else \prj/view.pug
      res.render view, lc{prj, grp, brd, page-info} <<< {exports: lc{prj, brd, grp}}
    .catch aux.error-handler res

api.get "/prj/:slug/", aux.signed, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """
  select p.*, u.displayname as ownername
  from prj as p, users as u
  where p.slug = $1 and u.key = p.owner
  """, [slug]
    .then (r = {}) -> res.send(r.[]rows.0 or {})
    .catch aux.error-handler res

/*
api.put \/prj/:slug/file/:key, aux.signed, express-formidable({multiples:true}), (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  if !((key = req.params.key) and /^([0-9a-zA-Z+_-]+)$/.exec(key)) => return aux.r404 res
  io.query """select slug from prj where slug = $1""", [slug]
    .then (r={}) ->
      if !(lc.prj = r.[]rows.0) => return aux.reject 404
      lc.root = "users/prj/#{lc.prj.slug}"
    .then ->
      lc.files = req.files["file[]"]
      lc.files = if Array.isArray(lc.files) => lc.files else [lc.files]
      if lc.files.length > 100 or lc.files.length < 1 => return aux.reject 400
      lc.files = lc.files
        .map -> {path: it.path, type: it.type.split(\/).1}
        .filter -> /([a-zA-Z0-9]+$)/.exec(it.type)
      fs-extra.ensure-dir lc.root
    .then ->
      Promise.all(
        lc.files.map (file, idx) ->
          fs-extra.copy file.path, path.join(lc.root, "draft.#{key}.#{idx}.#{file.type}")
      )
    .then -> res.send {}
    .catch aux.error-handler res
*/

api.post \/prj/, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,brd,grp} = req.fields
  if !(brd and grp) => return aux.r400 res
  thumb = (req.files["thumbnail[]"] or {}).path
  slug = suuid!
  io.query """select org, slug, key, detail->'group' as group from brd where slug = $1""", [brd]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      if !(lc.brd.[]group.filter(->it.key == grp).length) => return aux.reject 404
      if !(lc.brd.org) => return aux.reject 404
      io.query """
      insert into prj (name,description,brd,grp,slug,owner)
      values ($1,$2,$3,$4,$5,$6) returning key
      """, [name, description, brd, grp, slug, req.user.key]
    .then (r = {}) ->
      lc.ret = (r.[]rows or []).0
      if !thumb => return
      new Promise (res, rej) ->
        root = "users/org/#{lc.brd.org}/prj/#slug/upload"
        (e) <- fs-extra.ensure-dir root, _
        if e => return rej(e)
        (e,i) <- sharp(thumb).toFile path.join(root, "thumb.png"), _
        if e => rej(e) else res!
    .then -> res.send (lc.ret or {}) <<< {slug}
    .catch aux.error-handler res
