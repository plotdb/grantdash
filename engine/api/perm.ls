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
