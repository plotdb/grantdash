require! <[fs fs-extra path crypto lderror suuid mime-types suuid puppeteer]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
require! <[@google-cloud/storage]>

storage = new storage.Storage do
 projectId: \taicca
 keyFilename: \config/key/taicca.json

(engine,io) <- (->module.exports = it)  _

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
    .then -> res.render \view/taicca-flagship/prj-view.pug, {exports: lc.prj}
    .catch aux.error-handler res

# TODO keep record of ownership
api.post \/flagship/upload, (req, res) ->
  filename = req.body.filename
  id = suuid!
  storage
   .bucket \taicca-test
   .file id
   .getSignedUrl {action: \write, version: \v4, expires: (Date.now! + 60000)}
   .then -> res.send {signed-url: it.0, id}
   .catch aux.error-handler res

# TODO ownership verify
app.get \/flagship/upload/:id, (req, res) ->
  id = req.params.id
  storage
   .bucket \taicca-test
   .file id
   .getSignedUrl {action: \read, version: \v4, expires: (Date.now! + 60000)}
   .then -> return res.status(302).redirect(it.0)
   .catch aux.error-handler res

api.post \/flagship/prj/, throttle.count.user-md, grecaptcha, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {name,description,brd,detail,key} = req.body
  detail = {custom: detail}
  if !brd => return aux.r400 res
  slug = null

  cache.stage.check {io, type: \brd, slug: brd, name: "prj-new"}
    .then -> io.query """select org, slug, key, detail->'group' as group from brd where slug = $1""", [brd]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      if !(lc.grp = lc.brd.[]group.filter(->it.{}info.name == detail.custom.{}form.group).0) => return aux.reject 404
      if !(lc.brd.org) => return aux.reject 404
      if key =>
        io.query "select owner from prj where key = $1 and owner = $2", [key, req.user.key]
          .then (r={}) ->
            if !(r.[]rows.length) => return aux.reject 404
            io.query """
            update prj set (name,description,detail,modifiedtime) = ($1,$2,$3,now()) where key = $4 returning key
            """, [name, description, JSON.stringify(detail), key]
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
            insert into prj (name,description,brd,grp,slug,detail,owner)
            values ($1,$2,$3,$4,$5,$6,$7) returning key
            """, [name, description, brd, lc.grp.key, slug, JSON.stringify(detail), req.user.key]
          .then (r = {}) ->
            lc.ret = (r.[]rows or []).0
          .then -> res.send (lc.ret or {}) <<< {slug}
    .catch aux.error-handler res

printer = {}
api.post \/flagship/download, throttle.count.user-md, grecaptcha, (req, res) ->
  lc = {}
  url = "data:text/html;charset=utf-8,#{encodeURIComponent(req.body.html)}"
  p = if printer.browser => Promise.resolve printer.browser
  else puppeteer.launch(headless: true)
  p
    .then (browser) ->
      printer.browser = browser
      lc.browser = browser
      browser.newPage!
    .then (page) ->
      lc.page = page
      page.goto url, {waitUntil: \networkidle0}
    .then ->
      lc.page.pdf format: \A4
    .then (pdf) ->
      lc.browser.close!
      res.send pdf
    .catch aux.error-handler res

