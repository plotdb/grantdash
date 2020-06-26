require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[./cache]>
require! <[../aux ../util/throttle ../util/grecaptcha]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

# Dev API. only for testing.
api.get \/form/:slug, aux.signed, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """
  select slug, detail from form
  where owner = $1 and slug = $2 and deleted is not true
  """, [req.user.key, slug]
    .then (r={}) -> res.send(r.[]rows.0 or {})
    .catch aux.error-handler res

api.post \/form, aux.signed, throttle.count.user-md, grecaptcha, (req, res) ->
  lc = {}
  scope-list = req.body.scope or []
  # TODO this should be customizable
  scope = ["form/basic-info"]
  if \org in scope-list =>
    if !req.scope.org => return aux.r400 res
    scope.push "org/#{req.scope.org}"
  if \brd in scope-list =>
    if !req.scope.brd => return aux.r400 res
    scope.push "brd/#{req.scope.brd}"
  scope = scope.join('/')
  io.query "select slug from form where owner = $1 and scope = $2 and deleted is not true", [req.user.key, scope]
    .then (r={}) ->
      if (ret = r.[]rows.0) => return res.send ret
      lc.slug = suuid!
      io.query "insert into form (slug,scope,owner) values ($1,$2,$3)", [lc.slug, scope, req.user.key]
        .then -> res.send lc
    .catch aux.error-handler res
