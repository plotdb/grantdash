require! <[fs ../aux]>

(engine,io) <- (-> module.exports = it)  _

app = engine.app

app.get \/doc/create, aux.needlogin (req, res) ->
  if !req.{}user.key => return aux.r403 res
  io.query "select count(key) as count from doc where deleted is not true and owner = $1", [req.user.key]
    .then (r={}) ->
      count = (r.[]rows.0 or {}).count or 0
      if count >= 200 => return aux.reject 403
      io.query "insert into doc (owner) values ($1) returning key", [req.user.key]
    .then (r={}) ->
      if !(key = (r.[]rows.0 or {}).key) => aux.reject 403
      doc-id = "#{req.user.key}-#{key}"
      doc = engine.sharedb.connect.get \doc, doc-id
      new Promise (resolve, rej) ->
        doc.create {}, (e) ->
          if e => rej new Error(e)
          else resolve(res.redirect("/doc/#doc-id"))
    .catch -> console.log it


