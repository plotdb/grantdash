require! <[fs fs-extra path lderror puppeteer tmp easy-pdf-merge]>

tmpfn = ->
  (res, rej) <- new Promise _
  tmp.file (err, path, fd, cb) ->
    if err => return rej err
    res {fn: path, clean: cb}

Printer = (opt = {}) ->
  @opt = opt
  @count = ((opt.count or 4) <? 20)
  @queue = []
  @

Printer.get = ->
  if @_printer => return @_printer
  @_printer = new Printer {count: 15}
  @_printer.init!
  @_printer

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
  merge: (payload = {}) ->
    Promise.resolve!
      .then ~>
        if !payload.html => return null
        @print {html: payload.html} .then (buf) ->
          tmpfn!then ({fn}) ->
            (res, rej) <- new Promise _
            (e) <- fs.write-file fn, buf, _
            if e => return rej new Error(e)
            res fn
      .then (form-fn) ->
        if !payload.files or payload.files.length < 1 or (payload.files.length == 1 and !form-fn) =>
          return Promise.reject(new lderror(400))
        (res, rej) <- new Promise _
        (e) <- easy-pdf-merge ((if form-fn => [form-fn] else []) ++ payload.files), payload.outfile, _
        if e => return rej e
        res payload.outfile

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

module.exports = Printer
