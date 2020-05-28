require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

api.get "/p/:key/", aux.signed, (req, res) ->
  if isNaN(key = parseInt(req.params.key)) => return aux.r400 res
  io.query """
  select * from prj where key = $1
  """, [key]
    .then -> res.send(r.[]rows.0 or {})
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
