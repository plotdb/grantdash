require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[./cache]>
require! <[../aux ../util/throttle ../util/grecaptcha]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

api.get \/post, aux.signed, (req, res) ->
  if !(slug = req.query.brd) => return aux.r400 res
  cache.perm.check {io, user: req.user, type: \brd, slug: slug, action: \owner}
    .then ->
      io.query """
      select p.*, u.displayname as ownername
      from post as p
      left join users as u on u.key = p.owner
      where brd = $1 and p.deleted is not true
      order by p.createdtime desc
      """, [slug]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res

api.get \/post/:slug, aux.signed, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  io.query """
  select p.*,u.displayname as ownername
  from post as p, users as u
  where slug = $1 and p.owner = u.key
  """, [slug]
    .then (r={}) ->
      if !(lc.post = r.[]rows.0) => return aux.reject 404
      cache.perm.check {io, user: req.user, type: \brd, slug: lc.post.brd}
    .then -> res.send lc.post
    .catch aux.error-handler res

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
      cache.stage.check {io, type: \brd, slug: lc.post.brd, name: \public}
    .then -> res.render \view/default/post-view.pug, {exports: lc{post}}
    .catch aux.error-handler res

api.post \/post, aux.signed, throttle.count.user, grecaptcha, (req, res) ->
  {brd,title} = req.body{brd,title}
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: \owner}
    .then ->
      slug = suuid!
      detail = {content: "", title}
      io.query """
      insert into post (title,owner,slug,brd,detail) values ($1, $2, $3, $4, $5) returning slug
      """, [title, req.user.key, slug, brd, detail]
    .then (r={}) -> res.send(r.[]rows.0 or {})
    .catch aux.error-handler res

api.delete \/post/:slug, aux.signed, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select brd,slug,owner from post where slug = $1", [slug]
    .then (r={}) ->
      if !(post = r.[]rows.0) => return aux.reject 404
      cache.perm.check {io, user: req.user, type: \brd, slug: post.brd, action: \owner}
    .then -> io.query "update post set deleted = true where slug = $1", [slug]
    .then -> res.send!
    .catch aux.error-handler res
