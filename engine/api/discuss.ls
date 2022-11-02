require! <[fs path lderror suuid ../aux ../util/throttle ../util/grecaptcha]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api

all-thread = (req, res) ->
  limit = if isNaN(req.query.limit) => 20 else +req.query.limit <? 100
  offset = if isNaN(req.query.offset) => 0 else +req.query.offset
  io.query """
  select d.title, d.slug, d.createdtime, d.modifiedtime, json_agg(distinct c.owner) as users
  from discuss as d
  left join comment as c on d.key = c.discuss
  group by d.key
  limit $1 offset $2
  """, [limit, offset]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res

api.get \/discuss/, (req, res) ->
  lc = {}
  {slug,url} = req.query{slug, url}
  if !(slug or url) => return all-thread req, res
  limit = if isNaN(req.query.limit) => 20 else +req.query.limit <? 100
  offset = if isNaN(req.query.offset) => 0 else +req.query.offset
  promise = if slug => io.query "select key,title from discuss where slug = $1 limit 1", [slug]
  else io.query "select key,title from discuss where url = $1 limit 1", [url]
  promise
    .then (r={}) ->
      lc.discuss = discuss = r.[]rows.0
      if !discuss => return res.send({})
      io.query """
      select c.*, u.displayname
      from comment as c, users as u
      where c.discuss = $1 and c.owner = u.key
      and c.deleted is not true
      and c.state = 'active'
      order by distance limit $2 offset $3
      """, [discuss.key, limit, offset]
        .then (r= {}) ->
          res.send( {discuss: lc.discuss, comments: r.[]rows} )
    .catch aux.error-handler res

api.post \/discuss/, aux.signed, throttle.count.user, grecaptcha, (req, res) ->
  lc = {}
  Promise.resolve!
    .then ->
      lc <<< req.body{url, slug, reply, content, title}
      lc.content = lc.content{body, config}
      if lc.slug => io.query "select key, slug from discuss where slug = $1", [lc.slug]
      else if lc.url => io.query "select key, slug from discuss where url = $1", [lc.url]
      else return {}
    .then (r = {}) ->
      if r.[]rows.length => return Promise.resolve(r)
      # new discuss. Since it's new, user should not know its slug.
      lc.slug = suuid!
      io.query """
      insert into discuss (slug, url, title) values ($1,$2,$3) returning key
      """, [lc.slug, lc.url, (lc.title or '')]
    .then (r={}) ->
      lc.discuss = (r.[]rows.0 or {})
      if !lc.discuss.key => return aux.reject 400
      if !lc.discuss.slug => lc.discuss.slug = lc.slug
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
        """, [lc.discuss.key]
    .then (r={}) ->
      ret = (r.[]rows.0 or {})
      distance = (if isNaN(+ret.distance) => 0 else +ret.distance)
      lc <<< distance: (distance + 1), state: \active
      io.query """
      insert into comment
      (owner,discuss,distance,content,state,reply) values ($1,$2,$3,$4,$5,$6)
      returning key
      """, [req.user.key, lc.discuss.key, lc.distance, lc.content, lc.state, lc.reply]
    .then (r={}) ->
      lc.ret = r.[]rows.0 or {}
      lc.ret <<< {slug: lc.discuss.slug}
      io.query "update discuss set modifiedtime = now()"
    .then -> res.send lc.ret
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
*/

api.delete \/discuss/:id, aux.signed, (req, res) ->
  if !req.user => return aux.r404 res
  if isNaN(key = +req.params.id) => return aux.r404 res
  io.query "update comment set deleted = true where key = $1 and owner = $2", [key, req.user.key]
    .then -> res.send!
    .catch aux.error-handler res
