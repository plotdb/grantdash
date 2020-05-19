require! <[fs path ../aux]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api

# 需要 pagination
api.get \/comments/:id, (req, res) ->
  #limit
  #offset

api.post \/comment/, (req, res) ->
  if !req.user => return aux.r404 res
  # TODO thread, idx, content, state
  io.query """
  insert into comment
  (owner,thread,idx,content,state) values ($1,$2,$3,$4,$5)
  returning key
  """, [req.user.key, thread, idx, content, state]
    .then (r={}) -> res.send (r.[]rows.0 or {})
    .catch aux.error-handler res

api.put \/comment/:id, (req, res) ->
  if !req.user => return aux.r404 res
  # TODO content
  io.query "update comment set (content) = ($1)", [content]
    .then -> res.send!
    .catch aux.error-handler res

api.delete \/comment/:id, (req, res) ->
  if !req.user => return aux.r404 res
  if isNaN(key = +req.params.id) => return aux.r404 res
  io.query "update comment set deleted = true where key = $1 and owner = $2", [key, req.user.key]
    .then -> res.send!
    .catch aux.error-handler res
