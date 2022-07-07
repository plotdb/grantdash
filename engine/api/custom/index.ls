require! <[fs fs-extra path crypto lderror suuid mime-types suuid puppeteer tmp easy-pdf-merge request]>
require! <[../../aux ../cache ../common ../printer ../../util/grecaptcha ../../util/throttle]>
require! <[@google-cloud/storage]>
require! <[../../../secret]>
require! <[jsdom dompurify]>

{ window } = new jsdom.JSDOM "<!DOCTYPE html>"
purify = dompurify window

printer = printer.get!

(engine,io) <- (->module.exports = it)  _

if !secret.gcs => return
gcs = new storage.Storage secret.gcs

api = engine.router.api
app = engine.app

file-url = ({id, req, res}) ->
  lc = {}
  io.query "select brd,grp,owner from perm_gcs where id = $1", [id]
    .then (r={}) ->
      if !(lc.ret = ret = r.[]rows.0) => return aux.reject 404
      if ret.owner == req.user.key => return true
      cache.perm.check {io, type: \brd, slug: ret.brd, user: req.user, action: <[judge owner reviewer viewer]>}
        .catch ->
          io.query """
          select owner from perm_judge where brd = $1 and owner = $2
          """, [lc.ret.brd, req.user.key]
            .then (r={}) ->
              if !(r.[]rows.length) => return aux.reject 403
    .then ->
      gcs
       .bucket secret.gcs.bucket
       .file id
       .getSignedUrl {action: \read, version: \v4, expires: (Date.now! + 60000)}
    .then -> it.0

# upload file to GCS
api.post \/gcs/upload, aux.signed, (req, res) ->
  lc = {}
  if !(req.user and req.user.key) => return aux.r403 res
  owner = req.body.owner or req.user.key
  if !(field = req.body.field) => return aux.r400 res
  if !(brd = req.body.brd) => return aux.r404 res
  cache.stage.check {io, type: \brd, slug: brd, name: \prj-edit}
    .then ->
      if owner != req.user.key => return aux.reject 403
    .catch ->
      cache.perm.check {io, type: \brd, slug: brd, user: req.user, action: <[owner]>}
    # always write to new file so we can keep track of old files
    .then -> lc.id = "#brd/#{suuid!}"
    .then ->
      gcs
       .bucket secret.gcs.bucket
       .file lc.id
       .getSignedUrl {action: \write, version: \v4, expires: (Date.now! + 2 * 60 * 1000)}
    .then ->
      lc.url = it.0
      if !lc.perm =>
        io.query """
        insert into perm_gcs (id, owner, brd, grp, field) values ($1, $2, $3, $4, $5)
        """, [lc.id, owner, (brd or null), null, field]
    .then ->
      res.send {signed-url: lc.url, id: lc.id}
    .catch aux.error-handler res

# get file from GCS
app.get \/gcs/upload/:brd/:id, aux.signed, (req, res) ->
  id = "#{req.params.brd}/#{req.params.id}"
  file-url({id, req, res})
    .then -> return res.status(302).redirect(it)
    .catch aux.error-handler res

# update project for customized board
#api.post \/custom/prj/, grecaptcha, (req, res) ->
api.post \/custom/prj/, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {name,description,custom,submit,slug,brd} = req.body
  if !name => name = 'untitled'
  detail = {custom}
  lc.state = if submit => "active" else "pending"
  p = if slug =>
    io.query """
    select * from prj
    where deleted is not true and brd = $1 and slug = $2
    """, [brd, slug]
  else
    io.query """
    select * from prj
    where deleted is not true and brd = $1 and owner = $2
    """, [brd, req.user.key]
  p
    .then (r={}) ->
      lc.prj = r.[]rows.0
      if lc.prj and lc.prj.state == \active => return aux.reject 403
      if lc.prj and lc.prj.owner != req.user.key =>
        cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: \owner}
      else Promise.resolve!
    .then ->
      p = if lc.state == \active =>
        cache.stage.check {io, type: \brd, slug: brd, name: (\prj-publish)}
      else
        cache.stage.check {io, type: \brd, slug: brd, name: (if !lc.prj => \prj-new else \prj-edit)}
      p
        .catch -> return Promise.reject(new lderror(1012))
        .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[prj-edit-own owner]>}
    .then -> io.query """select org, slug, key, detail->'group' as group from brd where slug = $1""", [brd]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      # only if we let users choose their group
      # if !(lc.grp = lc.brd.[]group.filter(->it.{}info.name == detail.custom.{}form.group).0) =>
      #   return aux.reject 404
      if !(lc.grp = lc.brd.[]group.0) => return aux.reject 404
    .then ->
      if lc.prj =>
        io.query """
        update prj set (name,description,detail,grp,state) = ($2,$3,$4,$5,$6)
        where key = $1
        """, [lc.prj.key, name, description, JSON.stringify(detail), lc.grp.key, lc.state]
          .then ->
            res.send {slug: lc.prj.slug, state: lc.state, system: lc.prj.system}
      else
        io.query """
        select count(key) as count from prj where
        deleted is not true and brd = $1
        """, [brd]
          .then (r={}) ->
            lc.system = {idx: +((r.[]rows.0 or {}).count or 0) + 1}
            lc.slug = suuid!
            io.query """
            insert into prj (name,description,brd,grp,slug,detail,owner,state,system)
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning key
            """, [
              name, description, brd, lc.grp.key, lc.slug,
              JSON.stringify(detail), req.user.key, lc.state, JSON.stringify(lc.system)
            ]
          .then (r={}) ->
            res.send (r.[]rows.0 or {}) <<< lc{slug, system, state}
    .catch aux.error-handler res

# download project as pdf
api.post \/custom/print, throttle.count.user, grecaptcha, (req, res) ->
  lc = {}
  html = purify.sanitize req.body.html or ""
  printer.print {html: html}
    .then -> res.send it
    .catch aux.error-handler res
