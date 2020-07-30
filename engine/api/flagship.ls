require! <[fs fs-extra path crypto lderror suuid mime-types suuid puppeteer]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
require! <[@google-cloud/storage]>
require! <[../../secret]>

(engine,io) <- (->module.exports = it)  _

if !secret.gcs => return

gcs = new storage.Storage secret.gcs

api = engine.router.api
app = engine.app

app.get \/flagship/, (req, res) ->
  res.render \view/taicca-flagship/prj-view.pug

app.get \/flagship/:slug, (req, res) ->
  lc = {}
  if !(slug = req.params.slug) => return aux.r400 res
  io.query "select brd,detail,slug,key from prj where deleted is not true and slug = $1", [slug]
    .then (r={}) ->
      if !(lc.prj = prj = r.[]rows.0) => return aux.reject 404
      cache.stage.check {io, type: \brd, slug: prj.brd, name: "prj-edit"}
    .then -> res.render \view/taicca-flagship/prj-view.pug, {exports: {prj: lc.prj}}
    .catch aux.error-handler res

api.post \/flagship/upload, (req, res) ->
  lc = {}
  if !(req.user and req.user.key) => return
  filename = req.body.filename
  id = suuid!
  gcs
   .bucket secret.gcs.bucket
   .file id
   .getSignedUrl {action: \write, version: \v4, expires: (Date.now! + 60000)}
   .then ->
     lc.url = it.0
     io.query "insert into perm_gcs (id, owner) values ($1, $2)", [id, req.user.key]
   .then ->
     res.send {signed-url: lc.url, id}
   .catch aux.error-handler res

# TODO ownership verify
app.get \/flagship/upload/:id, (req, res) ->
  id = req.params.id
  gcs
   .bucket secret.gcs.bucket
   .file id
   .getSignedUrl {action: \read, version: \v4, expires: (Date.now! + 60000)}
   .then -> return res.status(302).redirect(it.0)
   .catch aux.error-handler res

api.post \/flagship/prj/, throttle.count.user-md, grecaptcha, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {name,description,brd,detail,key,submit} = req.body
  detail = {custom: detail}
  if !brd => return aux.r400 res
  slug = null
  state = if submit => "active" else "pending"
  cache.stage.check {io, type: \brd, slug: brd, name: "prj-new"}
    .then -> io.query """select org, slug, key, detail->'group' as group from brd where slug = $1""", [brd]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      if !(lc.grp = lc.brd.[]group.filter(->it.{}info.name == detail.custom.{}form.group).0) => return aux.reject 404
      if !(lc.brd.org) => return aux.reject 404
      if key =>
        io.query "select owner,state from prj where key = $1 and owner = $2", [key, req.user.key]
          .then (r={}) ->
            if !(ret = r.[]rows.length) => return aux.reject 404
            if ret.state == \active => return aux.reject 403
            io.query """
            update prj set (name,description,detail,modifiedtime,state) = ($1,$2,$3,now(),$5)
            where key = $4 returning key
            """, [name, description, JSON.stringify(detail), key, state]
          .then -> res.send {}
      else
        io.query """
        select count(key) as count from prj
        where brd = $1 and grp = $2 and deleted is not true
        """, [brd, lc.grp.key]
          .then (r={}) ->
            id = +(r.[]rows.0.count) + 1
            slug := suuid! + "-#id"
            io.query """
            insert into prj (name,description,brd,grp,slug,detail,owner,state)
            values ($1,$2,$3,$4,$5,$6,$7,$8) returning key
            """, [name, description, brd, lc.grp.key, slug, JSON.stringify(detail), req.user.key, state]
          .then (r = {}) ->
            lc.ret = (r.[]rows or []).0
          .then -> res.send (lc.ret or {}) <<< {slug}
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
  print: (payload = {}) ->
    lc = {}
    @get!
      .then (obj) ->
        lc.obj = obj
        if payload.html => obj.page.setContent payload.html, {waitUntil: "networkidle0"}
        else if payload.url => obj.page.goto payload.url
        else return Promise.reject(new ldError(1015))
      .then -> lc.obj.page.pdf format: \A4
      .then -> lc.pdf = it
      .then ~> @free lc.obj
      .then -> return lc.pdf

  get: -> new Promise (res, rej) ~>
    for i from 0 til @count =>
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

  init: ->
    (if Printer.browser => Promise.resolve(that) else puppeteer.launch!)
      .then (browser) ~>
        Printer.browser = browser
        Promise.all (for i from 0 til @count => browser.newPage!then(-> {busy: false, page: it}))
      .then ~> @pages = it

printer = new Printer {count: 20}
printer.init!
