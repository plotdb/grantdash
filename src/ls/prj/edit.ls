({auth, prjForm, loader, ldcvmgr, error}) <- ldc.register <[auth prjForm loader ldcvmgr error]>, _

Ctrl = (opt) ->
  @ldcv = new ldCover root: '[ld-scope=prj-diff]'
  @view = new ldView do
    global: true
    init-render: false
    root: '[ld-scope=prj-form-use]'
    handler: do
      "init-loader": ({node}) ->
        node.classList.toggle \d-none, true
  @slug = opt.prj
  @prj = {}
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  fetch: ->
    console.log "fetching project information ..."
    console.log "fetching board form ..."
    ld$.fetch "/d/p/#{@slug}", {method: \GET}, {type: \json}
      .then ~>
        @prj = it
        ld$.fetch "/d/b/#{@prj.brdslug}/form", {method: \GET}, {type: \json}
      .then ~>
        @brd = it
        # TODO choose grp by prj result
        @grp = @brd.detail.group.0 or {}

  sharedb: ->
    console.log "initializing sharedb connection ..."
    @sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    sdb.on \close, ->
      loader.on!
      sdb.reconnect!
        .then -> #prepare!
        .then -> loader.off!
    @hubs = prj: new Hub({sdb})

  getdoc: ->
    console.log "get project document ..."
    @sdb.get({
      id: "prj-#{@slug}"
      watch: (ops,source) ~> @hubs.prj.fire \change, {ops,source}
      create: ~>
        ret = {answer: {}}
        form = @grp.{}form
        ret.answer{}[form.{}purpose.title or 'title'].content = @prj.name
        ret.answer{}[form.purpose.description or 'description'].content = @prj.description
        ret
    }).then (doc) ~> @hubs.prj.doc = doc

  init-form: ->
    @ctrl-form = new prjForm {
      root: '[ld-scope=prj-form-use]'
      view-mode: true
      form: (@grp.{}form)
      grp: @grp
      brd: @brd
      prj: @prj
    }
    @ctrl-form.adapt {hub: @hubs.prj, path: []}
    @ctrl-form.on \submit, (answer) ~>
      data = payload: answer, type: \prj, slug: @prj.slug
      ldcvmgr.toggle \publishing, true
      ld$.fetch "/d/detail", {method: \PUT}, {json: data, type: \json}
        .finally -> ldcvmgr.toggle \publishing, false
        .then ~> @prj.detail = JSON.parse(JSON.stringify(answer))
        .then ~> @ctrl-form.render!
        .then -> ldcvmgr.toggle \published, true
        .then -> debounce 2000
        .finally -> ldcvmgr.toggle \published, false
        .catch error!

  render: -> @view.render!


[path,slug] = /^\/p\/([^/]+)\/edit/.exec(window.location.pathname) or []

ctrl = new Ctrl {prj: slug}
auth.get!
  .then -> ctrl.fetch!
  .then -> ctrl.sharedb!
  .then -> ctrl.getdoc!
  .then -> ctrl.init-form!
  .then -> ctrl.render!
  .then -> loader.off!
  .catch error!
