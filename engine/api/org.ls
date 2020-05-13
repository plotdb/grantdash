require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

app.get \/o/:key/admin, aux.signed, (req, res) ->
  res.render \admin/index.pug, {org: {key: req.params.key}}

api.post \/o, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,slug} = req.fields
  thumb = (req.files["thumbnail[]"] or {}).path
  io.query "select key from org where slug = $1", [slug]
    .then (r={}) ->
      if r.rows and r.rows.length => return aux.reject new lderror(1011)
      io.query """
      insert into org (name,description,slug,owner)
      values ($1,$2,$3,$4) returning key
      """, [name,description,slug,req.user.key]
    .then (r = {}) ->
      lc.ret = (r.[]rows or []).0
      if !thumb => return
      new Promise (res, rej) ->
        root = "static/assets/uploads/o/#slug"
        (e) <- fs-extra.ensure-dir root, _
        if e => return rej(e)
        (e,i) <- sharp(thumb).toFile path.join(root, "thumb.png"), _
        if e => rej(e) else res!
    .then -> res.send lc.ret
    .catch aux.error-handler res
