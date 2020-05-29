require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

app.get \/p/:slug, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """select * from prj where slug = $1""", [slug]
    .then (r={}) ->
      if !(lc.prj = prj = r.[]rows.0) => return aux.reject 404
      io.query """select name,slug,(detail->'group') as group from brd where brd.key = $1""", [lc.prj.brd]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 400
      lc.grp = grp = (brd.group or []).filter(-> it.key == lc.prj.grp).0
      if !lc.grp => return aux.reject 400
      lc.grp = grp = grp{form,info}
      delete brd.detail
      res.render \prj/view.pug, lc{prj,grp,brd}
    .catch aux.error-handler res

api.get "/p/:slug/", aux.signed, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """
  select p.*, b.slug as brdslug from prj as p, brd as b where p.slug = $1 and b.key = p.brd
  """, [slug]
    .then (r = {}) -> res.send(r.[]rows.0 or {})
    .catch aux.error-handler res


api.post \/p/, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,brd,grp} = req.fields
  if !(brd and grp) => return aux.r400 res
  thumb = (req.files["thumbnail[]"] or {}).path
  slug = suuid!
  io.query """
  insert into prj (name,description,brd,grp,slug,owner)
  values ($1,$2,$3,$4,$5,$6) returning key
  """, [name, description, brd, grp, slug, req.user.key]
    .then (r = {}) ->
      lc.ret = (r.[]rows or []).0
      if !thumb => return
      new Promise (res, rej) ->
        root = "static/assets/uploads/p/#slug"
        (e) <- fs-extra.ensure-dir root, _
        if e => return rej(e)
        (e,i) <- sharp(thumb).toFile path.join(root, "thumb.png"), _
        if e => rej(e) else res!
    .then -> res.send (lc.ret or {}) <<< {slug}
    .catch aux.error-handler res
