require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[../aux ./cache ../util/grecaptcha ../util/throttle]>
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

api.post \/token, aux.signed, grecaptcha, (req, res) ->
  [token,id] = [suuid!, suuid!]
  hint = ({} <<< req.body){org, brd, role}
  if !(slug = if hint.brd => hint.brd else hint.org) => return aux.r400 res
  if !(type = if hint.brd => \brd else if hint.org => \org else null) => return aux.r400 res
  if !(role = hint.role) => return aux.r400 res
  # TODO For now, we only provide brd permission token. only owner can create token
  cache.perm.check {io, user: req.user, type, slug, action: \owner}
    .then ->
      io.query """
      insert into permtoken (objtype, objslug, role, token, id) values ($1, $2, $3, $4, $5)
      """, [type, slug, role, token, id]
    .then -> res.send {id, token}
    .catch aux.error-handler res

app.get \/token/:token, (req, res) ->
  if !(token = req.params.token) => return aux.r400 res
  res.render "auth/perm/claim.pug", {exports: {token}}

api.put \/token, aux.signed, (req, res) ->
  lc = {}
  if !(token = req.body.token) => return aux.r400 res
  io.query """
  select objtype, objslug, role, count, token, id, redeemspan, createdtime
  from permtoken where token = $1
  """, [token]
    .then (r={}) ->
      if !(lc.ret = ret = r.[]rows.0) => return aux.reject 404
      if Date.now! >= ((new Date(ret.createdtime).getTime!) + ret.redeemspan) =>
        io.query "delete from permtoken where token = $1", [token]
          .then -> return aux.reject 1013
      io.query """
      insert into perm (objtype, objslug, role, type, ref, owner)
      values ($1, $2, $3, $4, $5, $6)
      on conflict do nothing
      """, [ret.objtype, ret.objslug, ret.role, \token, "#{ret.id}:#{ret.count}", req.user.key]
    .then ->
      ret = lc.ret
      if ret.count > 1 =>
        io.query "update permtoken set count = $1 where token = $2", [ret.count - 1, token]
      else io.query "delete from permtoken where token = $1", [token]
    .then -> res.send {}
    .catch aux.error-handler res
