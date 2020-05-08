require! <[fs path]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api

# 需要 pagination
api.get \/comments/:id, (req, res) ->
  #limit
  #offset

api.post \/comment/, (req, res) ->
  
api.put \/comment/:id, (req, res) ->
api.delete \/comment/:id, (req, res) ->
