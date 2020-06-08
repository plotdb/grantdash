require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[./cache]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

app.get \/post/:slug, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """
  select p.*,u.displayname as ownername
  from post as p, users as u
  where slug = $1 and p.owner = u.key
  """, [slug]
    .then (r={}) ->
      if !(lc.post = post = r.[]rows.0) => return aux.reject 404
      cache.stage.check {io, type: \brd, slug: lc.post.brd}
    .then ({config} = {config: {}}) ->
      if !config["public"] => return aux.reject 403
      res.render \work/post-view.pug, {exports: lc{post}}
    .catch aux.error-handler res

api.post \/post, aux.signed, (req, res) ->
  {brd,title} = req.body{brd,title}
  cache.perm.check {io, user: req.user, type: \brd, slug: brd}
    .then ->
      slug = suuid!
      io.query """
      insert into post (title,owner,slug) values ($1, $2, $3) returning slug
      """, [title, req.user.key, slug]
    .then (r={}) -> res.send(r.[]rows.0 or {})
    .catch aux.error-handler res

