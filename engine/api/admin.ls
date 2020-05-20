require! <[fs path lderror ../aux]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api

# fetch org and brd information.
# 1. with brd - get that brd, its org and and corresponding brds
# 2. with org - get that org and corresponding brds
# 3. none     - get latest brd, its org ( or none ) and corresponding brds.
api.post \/toc, aux.signed, (req, res) ->
  hint = req.body{org, brd}
  lc = {}
  promise = (if hint.brd =>
    io.query "select * from brd where slug = $1", [hint.brd]
      .then (r={}) ->
        if !(lc.brd = r.[]rows.0) => return aux.reject 404
        io.query "select key from org where key = $1", [lc.brd.org]
      .then (r={}) -> lc.org = r.[]rows.0 or null
  else if hint.org =>
    io.query "select * from org where slug = $1", [hint.org]
      .then (r={}) -> if !(lc.org = r.[]rows.0) => return aux.reject 404
  else 
    io.query "select * from brd where owner = $1 order by createdtime desc limit 1", [req.user.key]
      .then (r={}) ->
        if !(lc.brd = r.[]rows.0) =>
          io.query "select * from org where owner = $1 order by createdtime limit 1", [req.user.key]
            .then (r={}) -> if !(lc.org = r.[]rows.0) => return aux.reject 404
        else io.query "select * from org where key = $1", [lc.brd.org]
      .then (r={}) ->
        lc.org = r.[]rows.0 or null
      .then -> if !(lc.brd or lc.org) => return aux.reject 404
  )
  promise
    .then ->
      if !lc.org => io.query "select * from brd where org is null"
      else io.query "select * from brd where org = $1", [lc.org.key]
    .then (r={}) ->
      lc.brds = r.[]rows
      res.send lc
    .catch aux.error-handler res
