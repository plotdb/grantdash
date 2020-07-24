require! <[fs path lderror ../aux ./cache]>
(engine,io) <- (->module.exports = it) _

api = engine.router.api
app = engine.app

api.get \/admin/, aux.signed, (req, res) ->
  lc = {}
  io.query """select name, slug from org where owner = $1""", [req.user.key]
    .then (r={}) ->
      lc.orgs = r.[]rows
      io.query """select name, slug from brd where owner = $1""", [req.user.key]
    .then (r={}) ->
      lc.brds = r.[]rows
      io.query """
      select p.objslug as slug, o.name as name from perm as p, org as o
      where p.objtype = 'org' and p.objslug = o.slug and (
        p.owner = $1
        or (p.type = 'user' and p.ref = $2)
        or (p.type = 'email' and p.ref = $3)
      )""", [req.user.key, "#{req.user.key}", req.user.username]
    .then (r={}) ->
      lc.orgs ++= r.[]rows
      io.query """
      select p.objslug as slug, b.name as name from perm as p, brd as b
      where p.objtype = 'brd' and p.objslug = b.slug and (
        p.owner = $1
        or (p.type = 'user' and p.ref = $2)
        or (p.type = 'email' and p.ref = $3)
      )""", [req.user.key, "#{req.user.key}", req.user.username]
    .then (r={}) ->
      lc.brds ++= r.[]rows
      res.send lc
    .catch aux.error-handler res

app.get \/admin/, aux.signed, (req, res) -> res.render \admin/index.pug

app.get \/org/:slug/admin, aux.signed, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  cache.perm.check {io, user: req.user, type: \org, slug, action: \owner}
    .then ->
      res.render \admin/index.pug, {org: {slug}}
      return null
    .catch aux.error-handler res

app.get \/brd/:slug/admin, aux.signed, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r404 res
  cache.perm.check {io, user: req.user, type: \brd, slug: slug, action: \owner}
    .then -> io.query "select * from brd where slug = $1 and deleted is not true", [slug]
    .then (r={}) ->
      if !(brd = r.[]rows.0) => return aux.reject 404
      lc.brd = brd
      return if !brd.org => Promise.resolve!
      else io.query "select * from org where slug = $1 and deleted is not true", [brd.org]
    .then (r={}) ->
      org = r.{}rows.0
      res.render \admin/index.pug, {org, brd: lc.brd}
      return null
    .catch aux.error-handler res


# fetch org and brd information.
# 1. with brd - get that brd, its org and and corresponding brds
# 2. with org - get that org and corresponding brds
# 3. none     - get latest brd, its org ( or none ) and corresponding brds.
api.post \/toc, aux.signed, (req, res) ->
  hint = req.body{org, brd}
  if !(hint.org or hint.brd) => hint <<< req.scope{brd, org}
  lc = {}
  perm-opt = {io, user: req.user, action: \owner}
  promise = (if hint.brd =>
    cache.perm.check {} <<< perm-opt <<< {type: \brd, slug: hint.brd}
      .then -> io.query "select * from brd where slug = $1", [hint.brd]
      .then (r={}) ->
        if !(lc.brd = r.[]rows.0) => return aux.reject 404
        cache.perm.check {} <<< perm-opt <<< {type: \org, slug: lc.brd.org}
          .then -> io.query "select key,name,slug,description,detail from org where slug = $1", [lc.brd.org]
          .catch -> # simply ignore
      .then (r={}) -> lc.org = r.[]rows.0 or null
  else if hint.org =>
    cache.perm.check {} <<< perm-opt <<< {type: \org, slug: hint.org}
      .then -> io.query "select * from org where slug = $1", [hint.org]
      .then (r={}) -> if !(lc.org = r.[]rows.0) => return aux.reject 404
  else


    io.query "select * from brd where owner = $1 order by createdtime desc limit 1", [req.user.key]
      .then (r={}) ->
        if !(lc.brd = r.[]rows.0) =>
          io.query "select * from org where owner = $1 order by createdtime limit 1", [req.user.key]
            .then (r={}) -> if !(lc.org = r.[]rows.0) => return aux.reject 404
        else
          cache.perm.check {} <<< perm-opt <<< {type: \org, slug: lc.brd.org}
            .then -> io.query "select * from org where slug = $1", [lc.brd.org]
            .catch -> # simply ignore
      .then (r={}) ->
        lc.org = r.[]rows.0 or null
      .then -> if !(lc.brd or lc.org) => return aux.reject 404
  )
  promise
    .then ->
      if !lc.org => io.query "select * from brd where org is null"
      else io.query "select * from brd where org = $1", [lc.org.slug]
    .then (r={}) ->
      lc.brds = r.[]rows
      res.send lc
    .catch aux.error-handler res
