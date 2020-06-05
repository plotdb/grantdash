require! <[express]>

module.exports = (engine, io) ->
  engine.router.ext.post \/deploy, (req, res) -> res.send {}
