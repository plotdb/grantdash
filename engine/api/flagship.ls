require! <[fs fs-extra path crypto lderror suuid mime-types suuid puppeteer]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
require! <[@google-cloud/storage]>
require! <[../../secret]>

(engine,io) <- (->module.exports = it)  _

if !secret.gcs => return

gcs = new storage.Storage secret.gcs

api = engine.router.api
app = engine.app

render-form = (req, res) ->

app.get \/flagship/, aux.signed, (req, res) ->
  brd = \flagship-2
  io.query """
  select brd,detail,system,slug,key,state from prj
  where brd = $1 and owner = $2 and deleted is not true
  """, [brd, req.user.key]
    .then (r={}) ->
      if !(ret = r.[]rows.0) =>
        cache.stage.check {io, type: \brd, slug: brd, name: \prj-new}
          .catch -> Promise.reject new lderror({ldcv: "closed"}, 1012)
          .then -> return res.render \view/taicca-flagship/prj-view.pug
      else
        cache.stage.check {io, type: \brd, slug: brd, name: \prj-edit}
          .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: \prj-edit-own}
          .catch -> Promise.reject new lderror({ldcv: "closed"}, 1012)
          .then -> return res.render \view/taicca-flagship/prj-view.pug, {exports: {prj: ret}}
    .catch aux.error-handler res

# TODO should accept only one file for each prj, and only if prj is pending
api.post \/flagship/upload, (req, res) ->
  lc = {}
  if !(req.user and req.user.key) => return
  brd = \flagship-2
  io.query "select id from perm_gcs where owner = $1", [req.user.key]
    .then (r={}) ->
      if (lc.perm = r.[]rows.0) => lc.id = lc.perm.id
      else lc.id = suuid!
    .then ->
      gcs
       .bucket secret.gcs.bucket
       .file lc.id
       .getSignedUrl {action: \write, version: \v4, expires: (Date.now! + 2 * 60 * 1000)}
    .then ->
      lc.url = it.0
      if !lc.perm =>
        io.query """
        insert into perm_gcs (id, owner, brd, grp) values ($1, $2, $3, $4)
        """, [lc.id, req.user.key, (brd or null), null]
    .then ->
      res.send {signed-url: lc.url, id: lc.id}
    .catch aux.error-handler res

app.get \/flagship/upload/:id, aux.signed, (req, res) ->
  lc = {}
  id = req.params.id
  io.query "select brd,grp,owner from perm_gcs where id = $1", [id]
    .then (r={}) ->
      if !(lc.ret = ret = r.[]rows.0) => return aux.reject 404
      if ret.owner == req.user.key => return true
      cache.perm.check {io, type: \brd, slug: ret.brd, user: req.user, action: <[judge owner]>}
    .catch ->
      io.query """
      select owner from perm_judge where brd = $1 and owner = $2
      """, [lc.ret.brd, req.user.key]
        .then (r={}) ->
          if !(r.[]rows.length) => return Promise.reject 403
    .then ->
      gcs
       .bucket secret.gcs.bucket
       .file id
       .getSignedUrl {action: \read, version: \v4, expires: (Date.now! + 60000)}
    .then -> return res.status(302).redirect(it.0)
    .catch aux.error-handler res

api.post \/flagship/prj/, grecaptcha, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {name,description,detail,key,submit} = req.body
  detail = {custom: detail}
  brd = \flagship-2
  lc.state = if submit => "active" else "pending"

  io.query """
  select * from prj
  where deleted is not true and brd = $1 and owner = $2
  """, [brd, req.user.key]
    .then (r={}) ->
      lc.prj = r.[]rows.0
      if lc.prj and lc.prj.state == \active => return aux.reject 403
      cache.stage.check {io, type: \brd, slug: brd, name: (if !lc.prj => \prj-new else \prj-edit)}
        .catch -> return Promise.reject(new lderror(1012))
        .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: \prj-edit-own}
    .then -> io.query """select org, slug, key, detail->'group' as group from brd where slug = $1""", [brd]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      if !(lc.grp = lc.brd.[]group.filter(->it.{}info.name == detail.custom.{}form.group).0) => return aux.reject 404
    .then ->
      if lc.prj =>
        io.query """
        update prj set (name,description,detail,grp,state) = ($2,$3,$4,$5,$6)
        where key = $1
        """, [lc.prj.key, name, description, JSON.stringify(detail), lc.grp.key, lc.state]
          .then -> res.send lc{state}
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

api.post \/flagship/download, throttle.count.user, grecaptcha, (req, res) ->
  lc = {}
  printer.print {html: req.body.html}
    .then -> res.send it
    .catch aux.error-handler res

Printer = (opt = {}) ->
  @opt = opt
  @count = ((opt.count or 4) <? 20)
  @queue = []
  @

Printer.prototype = Object.create(Object.prototype) <<< do
  exec: (cb) ->
    lc = {trial: 0}
    _ = ~>
      @get!
        .then (obj) -> lc.obj = obj
        .then -> cb(lc.obj.page)
        .then -> lc.ret = it
        .catch ~>
          if (lc.trial++) > 5 => return Promise.reject new lderror(0)
          @respawn lc.obj .then -> _!
        .then ~> @free lc.obj
        .then -> return lc.ret
    _!

  print: (payload = {}) -> @exec (page) ->
    p = if payload.html => page.setContent payload.html, {waitUntil: "networkidle0"}
    else if payload.url => page.goto payload.url
    else Promise.reject(new ldError(1015))
    p.then -> page.pdf format: \A4

  get: -> new Promise (res, rej) ~>
    for i from 0 til @pages.length =>
      if !@pages[i].busy =>
        @pages[i].busy = true
        return res @pages[i]
    @queue.push {res, rej}

  free: (obj) ->
    if @queue.length =>
      ret = @queue.splice(0, 1).0
      ret.res obj
    else
      obj.busy = false

  respawn: (obj) ->
    Promise.resolve!
      .then -> if !(obj.page.isClosed!) => page.close!
      .catch -> # failed to close. anyway, just ignore it and create a new page.
      .then -> Printer.browser.newPage!
      .then (page) ~> obj.page = page

  init: ->
    (if Printer.browser => Promise.resolve(that) else puppeteer.launch({headless: true, args: <[--no-sandbox]>}))
      .then (browser) ~>
        Printer.browser = browser
        Promise.all (for i from 0 til @count => browser.newPage!then(-> {busy: false, page: it}))
      .then ~> @pages = it

printer = new Printer {count: 15}
printer.init!
