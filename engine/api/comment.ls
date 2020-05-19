require! <[fs path lderror ../aux]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api

api.get \/discus/, (req, res) ->
  slug = req.query.slug
  limit = if isNaN(req.query.limit) => 20 else +req.query.limit <? 100
  offset = if isNaN(req.query.offset) => 0 else +req.query.offset
  if !slug => return aux.r404 res
  io.query """
  select c.*, u.displayname from comment as c, discus as d, users as u
  where d.slug = $1 and d.key = c.discus and c.owner = u.key
  and c.deleted is not true
  and c.state = 'active'
  order by distance limit $2 offset $3
  """, [slug, limit, offset]
    .then (r= {}) -> res.send(r.rows or [])
    .catch aux.error-handler res

api.post \/comment/, (req, res) ->
  if !req.user => return aux.r404 res
  lc = {}
  Promise.resolve!
    .then ->
      lc <<< req.body{slug, reply, content}
      if !lc.slug => return aux.reject 404
      lc.content = lc.content{body, config}
    .then ->
      return if lc.reply =>
        io.query """
        select c.* from comment as c
        where key = $1 and c.deleted is not true and c.state = 'active'
        """, [lc.reply]
      else
        io.query """
        select count(c.key) as distance, d.key as discus
        from comment as c, discus as d where d.slug = $1 and d.key = c.discus group by d.key
        """, [lc.slug]
    .then (r={}) ->
      ret = (r.[]rows.0 or {})
      lc <<< distance: ((ret.distance or 0) + 1), discus: ret.discus
      lc.state = \active
      if !lc.discus =>
        io.query "select key from discus where slug = $1", [lc.slug]
          .then (r = {}) ->
            if r.[]rows.length => Promise.resolve(r)
            else io.query "insert into discus (slug) values ($1) returning key", [lc.slug]
          .then (r ={}) -> (r.[]rows.0 or {}).key
          .catch -> aux.reject new lderror(400)
      else Promise.resolve(lc.discus)
    .then (ret) ->
      lc.discus = ret
      io.query """
      insert into comment
      (owner,discus,distance,content,state) values ($1,$2,$3,$4,$5)
      returning key
      """, [req.user.key, lc.discus, lc.distance, lc.content, lc.state]
    .then (r={}) -> res.send (r.[]rows.0 or {})
    .catch aux.error-handler res

api.put \/comment/:id, (req, res) ->
  if !req.user => return aux.r404 res
  lc = {}
  Promise.resolve!
    .then ->
      lc.content = req.body.content{body, config}
      io.query "update comment set (content) = ($1)", [lc.content]
    .then -> res.send!
    .catch aux.error-handler res

api.delete \/comment/:id, (req, res) ->
  if !req.user => return aux.r404 res
  if isNaN(key = +req.params.id) => return aux.r404 res
  io.query "update comment set deleted = true where key = $1 and owner = $2", [key, req.user.key]
    .then -> res.send!
    .catch aux.error-handler res
