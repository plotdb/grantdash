require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror]>
require! <[../aux ../../secret  ../util/grecaptcha]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

api.post \/org, aux.signed, express-formidable!, grecaptcha, (req, res) ->
  lc = {}
  {name,description,slug} = req.fields
  if !name or !org or !/^[a-zA-Z0-9+_-]+$/.exec(slug) => return aux.r400 res
  if !secret.publicServer => return aux.r404 res
  detail = {info: {name, description}}
  io.query "select key from org where slug = $1", [slug]
    .then (r={}) ->
      if r.rows and r.rows.length => return aux.reject new lderror(1011)
      io.query """
      insert into org (name,description,slug,owner,detail)
      values ($1,$2,$3,$4,$5) returning key
      """, [name,description,slug,req.user.key,detail]
    .then (r = {}) -> res.send (r.[]rows or []).0
    .catch aux.error-handler res

# Not used yet. TBD.
/*
api.post \/org/:slug/brd/list, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  offset = req.query.offset or 0
  limit = req.query.limit or 30
  io.query """
  select key,name,description from brd
  where org = $1 and deleted is not true
  offset $2 limit $3
  """, [slug, offset, limit]
    .then (r={}) -> res.send r
    .catch aux.error-handler res

api.post \/org/list, aux.signed, (req, res) ->
  io.query "select key,name,slug from org where owner = $1 and deleted is not true", [req.user.key]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res
*/
