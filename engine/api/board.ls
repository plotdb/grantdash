require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

app.get \/b/:key, aux.signed, (req, res) ->
  lc = {}
  if !req.user => return aux.r403 res
  io.query "select * from board where key = $1", [req.params.key]
    .then (r={}) ->
      if !(lc.board = board = r.[]rows.0) => return aux.reject 404
      if board.owner != req.user.key => return aux.reject 403
      io.query "select * from project where board = $1", [board.key]
    .then (r={}) ->
      lc.projects = r.[]rows
      res.render \b/index.pug, lc{board, projects}
    .catch aux.error-handler res

app.get \/b/:key/admin, aux.signed, (req, res) ->
  io.query "select * from board where key = $1", [req.params.key]
    .then (r={}) ->
      if !(board = r.[]rows.0) => return aux.reject 404
      if board.owner != req.user.key => return aux.reject 403
      res.render \admin/index.pug, {board}
      return null
    .catch aux.error-handler res

api.post \/b, aux.signed, express-formidable!, (req, res) ->
  lc = {}
  {name,description,slug,starttime,endtime,org} = req.fields
  thumb = (req.files["thumbnail[]"] or {}).path
  io.query "select key from board where slug = $1", [slug]
    .then (r={}) ->
      if r.rows and r.rows.length => return aux.reject new lderror(1011)
      io.query """
      insert into board (name,description,slug,starttime,endtime,org,owner)
      values ($1,$2,$3,$4,$5,$6,$7) returning key
      """, [name, description, slug, (starttime or null), (endtime or null), (org or null), req.user.key]
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

# for board and org. place it in board.ls temporarily
api.post \/slug-check/:type, (req, res) ->
  type = {o: \org, b: \board}[req.params.type] 
  if !type => return aux.r404!
  io.query "select key from #type where slug = $1", [req.body.slug]
    .then (r = {}) -> res.send {result: if (r.rows or []).length => 'used' else 'free'}
    .catch -> aux.error-handler(res)(it)
