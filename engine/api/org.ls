require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

api.post \/o/:key/board/list, (req, res) ->
  if isNaN(key = +req.params.key) => return aux.r400 res
  offset = req.query.offset or 0
  limit = req.query.limit or 30
  io.query "select key,name,description from board where org = $1 offset $2 limit $3", [key, offset, limit]
    .then (r={}) -> res.send r
    .catch aux.error-handler res

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

api.post \/o/list, aux.signed, (req, res) ->
  io.query "select key,name,slug from org where owner = $1", [req.user.key]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res
