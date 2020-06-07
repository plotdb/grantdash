require! <[fs path lderror suuid ../aux]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api

api.get \/discuss/, (req, res) ->
  {slug,url} = req.query{slug, url}
  if !(slug or url) => return aux.r404 res
  limit = if isNaN(req.query.limit) => 20 else +req.query.limit <? 100
  offset = if isNaN(req.query.offset) => 0 else +req.query.offset
  promise = if slug => io.query "select key from discuss where slug = $1 limit 1", [slug]
  else io.query "select key from discuss where url = $1 limit 1", [url]
  promise
    .then (r={}) ->
      key = (r.[]rows.0 or {}).key
      if !key => return res.send([])
      io.query """
      select c.*, u.displayname
      from comment as c, users as u
      where c.discuss = $1 and c.owner = u.key
      and c.deleted is not true
      and c.state = 'active'
      order by distance limit $2 offset $3
      """, [key, limit, offset]
    .then (r= {}) -> res.send(r.rows or [])
    .catch aux.error-handler res

api.post \/discuss/, aux.signed, (req, res) ->
  lc = {}
  Promise.resolve!
    .then ->
      lc <<< req.body{url, slug, reply, content}
      if !(lc.url or lc.slug) => return aux.reject 404
      lc.content = lc.content{body, config}
      if lc.slug => io.query "select key from discuss where slug = $1", [lc.slug]
      else if lc.url => io.query "select key from discuss where url = $1", [lc.url]
    .then (r = {}) ->
      if r.[]rows.length => return Promise.resolve(r)
      # new discuss. Since it's new, user should not know its slug.
      lc.slug = suuid!
      io.query "insert into discuss (slug, url) values ($1,$2) returning key", [lc.slug, lc.url]
    .then (r={}) ->
      lc.discuss-key = (r.[]rows.0 or {}).key
      if !lc.discuss-key => return aux.reject 400
      return if lc.reply =>
        io.query """
        select c.* from comment as c
        where key = $1 and c.deleted is not true and c.state = 'active'
        """, [lc.reply]
      else
        io.query """
        select count(c.key) as distance, d.key as discuss
        from comment as c, discuss as d 
        where c.reply is null and d.key = $1 and d.key = c.discuss
        group by d.key
        """, [lc.discuss-key]
    .then (r={}) ->
      ret = (r.[]rows.0 or {})
      distance = (if isNaN(+ret.distance) => 0 else +ret.distance)
      lc <<< distance: (distance + 1), discuss: ret.discuss, state: \active
      io.query """
      insert into comment
      (owner,discuss,distance,content,state,reply) values ($1,$2,$3,$4,$5,$6)
      returning key
      """, [req.user.key, lc.discuss-key, lc.distance, lc.content, lc.state, lc.reply]
    .then (r={}) -> res.send (r.[]rows.0 or {})
    .catch aux.error-handler res

/*
api.put \/discuss, (req, res) ->
  if !req.user => return aux.r404 res
  lc = {}
  Promise.resolve!
    .then ->
      lc.content = req.body.content{body, config}
      io.query "update comment set (content) = ($1)", [lc.content]
    .then -> res.send!
    .catch aux.error-handler res

api.delete \/discuss/:id, (req, res) ->
  if !req.user => return aux.r404 res
  if isNaN(key = +req.params.id) => return aux.r404 res
  io.query "update comment set deleted = true where key = $1 and owner = $2", [key, req.user.key]
    .then -> res.send!
    .catch aux.error-handler res
*/
