require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[../aux ./cache]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

api.post \/account, aux.signed, (req, res) ->
  if !(name = req.body.name) => return aux.r404 res
  name = "#{name}".substring(0, 32)
  io.query "select key,displayname from users where lower(displayname) ~ lower($1)", [name]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res
  
api.get \/stage, (req, res) ->
  {brd} = req.query{brd}
  if !brd => return aux.r400 res
  cache.stage.check {io, type: \brd, slug: brd}
    .then -> res.send it
    .catch aux.error-handler res

api.post \/token, aux.signed, (req, res) ->
  [token,id] = [suuid!, suuid!]
  hint = ({} <<< req.scope <<< req.body){org, brd}
  type = if hint.brd => \brd else \org
  slug = if hint.brd => hint.brd else hint.org
  # TODO For now, we only provide brd permission token. only owner can create token
  cache.perm.check {io, user: req.user, type, slug, action: \owner}
    .then -> io.query "insert into permtoken (token,id) values ($1, $2)", [token, id]
    .then -> res.send {id, token}
    .catch aux.error-handler res

app.get \/token/:token, (req, res) ->
  if !(token = req.params.token) => return aux.r400 res
  res.render "auth/perm/claim.pug", {exports: {token}}

api.put \/token, aux.signed, (req, res) ->
  if !(token = req.body.token) => return aux.r400 res
  io.query "select token,id,redeemspan,createdtime from permtoken where token = $1", [token]
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      if Date.now! >= ((new Date(ret.createdtime).getTime!) + ret.redeemspan) => return aux.reject 1013
      io.query "insert into perm (id, owner) values ($1, $2)", [ret.id, req.user.key]
    .finally ->
      io.query "delete from permtoken where token = $1", [token]
    .then -> res.send {}
    .catch aux.error-handler res
