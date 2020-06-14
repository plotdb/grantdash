require! <[fs fs-extra crypto read-chunk sharp express-formidable]>
require! <[../aux]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

# - clear cookie -
# sometimes for some unknown reason, users' cookie might corrupted.
# these two routes help users reset their cookie, and redirect to original page.

clear-user-cookie = (req, res) ->
  res.clearCookie \connect.sid, {path:'/', domain: ".#{engine.config.domain}" }
  # clear all possible cookies that might be used in the past.
  res.clearCookie \connect.sid, {path:'/'}
  <[localhost loading.io .loading.io]>.map ->
    res.clearCookie \connect.sid, {path:'/', domain: it}
  res.clearCookie \global, {path:'/', domain: ".#{engine.config.domain}"}

api.get "/me/reauth/", (req, res) ->
  clear-user-cookie req, res
  res.send!

app.get "/me/reauth/", (req, res) ->
  clear-user-cookie req, res
  res.redirect """/dash/auth/#{if req.query.nexturl => ("?nexturl=" + that) else ''}"""

api.delete \/me/, (req, res) ->
  if !(req.user and req.user.key) => return aux.r400 res
  key = req.user.key
  req.logout!
  io.query "delete from users where key = $1", [key]
    .catch ->
      # delete user failed. there might be some additional rows in other table owned by this user.
      # just remove the username, displayname and mark the account as deleted.
      io.query """
      update users
      set (username,displayname,deleted)
      = (('deleted-' || key),('user ' || key),true)
      where key = $1
      """, [key]
    .then -> res.send!
    .catch aux.error-handler res

api.get \/me/, (req, res) ->
  ret = {}
  if !req.user => return res.json '{}'
  id = req.user.key
  io.query "select key,displayname,description,title,tags from users where key = $1", [id]
    .then (r={}) ->
      if !r.rows or !r.rows.length => return aux.reject 404
      ret.user = r.rows.0
    .then (r={}) ->
      res.send ret
      return null
    .catch aux.error-handler res

render-profile = (req, res, id) ->
  lc = {}
  io.query "select key,displayname,description,createdtime,title,tags from users where key = $1", [id]
    .then (r={}) ->
      if !r.rows or !r.rows.length => return aux.reject 404
      lc.user = r.rows.0
      io.query """
      select p.*, b.name as brdname
      from prj as p
      left join brd as b on p.brd = b.slug
      where p.owner = $1
      order by createdtime desc
      """, [id]
    .then (r={}) ->
      lc.prjs = r.[]rows
      res.render \me/profile.pug, {exports: lc} <<< lc{user, prjs}
      return null
    .catch aux.error-handler res

app.get \/me/, aux.needlogin (req, res) ->
  render-profile req, res, req.user.key

app.get \/user/:id, aux.numid true, (req, res) ->
  io.query """
  select key,displayname,description,createdtime,plan,title,tags from users where key = $1 and deleted is not true
  """, [req.params.id]
    .then (r={}) ->
      if !r.rows or !r.rows.length => return aux.reject 404
      res.render \me/profile.pug, {user: r.rows.0}
    .catch aux.error-handler res

app.get \/me/settings/, aux.needlogin (req, res) ->
  res.render \me/settings.pug, {user: req.user}

api.put \/user/:id, aux.numid false, (req, res) ->
  if !req.user or req.user.key != +req.params.id => return aux.r403 res
  {displayname, description, title, tags} = req.body{displayname, description, title, tags}
  displayname = "#displayname".trim!
  description = "#description".trim!
  io.query "update users set (displayname,description,title,tags) = ($1,$2,$3,$4) where key = $5",
  [displayname, description, title, tags, req.user.key]
    .then ->
      req.user <<< {displayname, description, title, tags}
      req.login req.user, -> res.send!
      return null

api.post \/user/avatar, aux.signed, express-formidable({multiples:true}), (req, res) ->
  if !req.user => return aux.r403 res
  if !req.files.avatar => return aux.r400 res
  fs-extra.ensure-dir "static/s/avatar/" 
    .then ->
      sharp req.files.avatar.path
        .resize 200,200
        .toFile "static/s/avatar/#{req.user.key}.png", (err, info) ->
          if err => return aux.r500 res, "#{err}"
          res.send {}
    .catch -> aux.r500 res

api.post \/me/sync/, (req, res) ->
  if !req.user or !req.user.key => return aux.r400 res
  res.send req.user

api.put \/me/passwd/, (req, res) ->
  {n,o} = req.body{n,o}
  if !req.user or !req.user.usepasswd => return aux.r400 res
  if n.length < 4 => return aux.r400 res, ("profile.newPassword.length")
  io.query "select password from users where key = $1", [req.user.key]
    .then ({rows}) ->
      if !rows or !rows.0 => return aux.reject 403
      io.authio.user.compare o, rows.0.password
        .catch -> return aux.reject 403, ("profile.oldPassword.mismatch")
    .then -> io.authio.user.hashing n, true, true
    .then (pw-hashed) ->
      req.user <<< {password: pw-hashed}
      io.query "update users set password = $1 where key = $2", [pw-hashed, req.user.key]
    .then -> req.login(req.user, -> res.send!); return null
    .catch aux.error-handler res

# should be replaced by /me/config/
api.post \/me/legal/, (req, res) ->
  if !(req.user and req.user.key) => return aux.r400 res
  req.user.{}config.legal = new Date!getTime!
  io.query "update users set config = $2 where key = $1", [req.user.key, req.user.config]
    .then -> res.send!
    .catch aux.error-handler res

api.post \/me/config/, (req, res) ->
  if !(req.user and req.user.key) => return aux.r400 res
  if !req.body or typeof(req.body) != \object => return aux.r400 res
  req.user.{}config <<< (req.body{legal})
  io.query "update users set config = $2 where key = $1", [req.user.key, req.user.config]
    .then -> res.send!
    .catch aux.error-handler res

api.post \/me/list, aux.signed, (req, res) ->
  offset = req.body.offset or 0
  limit = req.body.limit or 100
  type = req.body.type

  tables = <[prj brd org]>
  table = tables[tables.indexOf(type)]
  if !(table = tables[tables.indexOf(type)]) => return aux.r400 res

  io.query(
  "select key,name,description,slug from #table where owner = $1 offset $2 limit $3"
  [req.user.key, offset, limit]
  )
    .then (r={}) -> res.send (r.rows or [])
    .catch aux.error-handler res
