({auth, prjForm, loader, ldcvmgr, error}) <- ldc.register <[auth prjForm loader ldcvmgr error]>, _

Ctrl = (opt) ->
  @ldcv = new ldCover root: '[ld-scope=prj-diff]'
  @view = new ldView do
    global: true
    init-render: false
    root: '[ld-scope=prj-form-use]'
    handler: do
      "init-loader": ({node}) -> node.classList.toggle \d-none, true
      "content": ({node}) -> node.classList.toggle \d-none, false
  @slug = opt.prj
  @prj = {}
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  fetch: ->
    console.log "fetching project information ..."
    console.log "fetching board form ..."
    ld$.fetch "/dash/api/prj/#{@slug}", {method: \GET}, {type: \json}
      .then ~>
        @prj = it
        ld$.fetch "/dash/api/brd/#{@prj.brd}/form", {method: \GET}, {type: \json}
      .then ~>
        @brd = it
        @grp = @brd.detail.group.filter(~> it.key == @prj.grp).0
        if !@grp => return Promise.reject new ldError(1017)

  sharedb: ->
    console.log "initializing sharedb connection ..."
    @sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
      path: '/dash/ws'
    sdb.on \error, -> ldcvmgr.toggle \not-sync
    sdb.on \close, ~>
      ldcvmgr.toggle \offline-retry, true
      sdb.reconnect!
        .then ~> @getdoc!
        .then ~> @adapt!
        .then ~> @render!
        .then -> console.log "re-inited."
        .then -> ldcvmgr.toggle \offline-retry, false
    @hubs = prj: new Hub({sdb})
    sdb.ready!

  getdoc: ->
    console.log "get project document ..."
    @sdb.get({
      id: "prj/#{@slug}"
      watch: (ops,source) ~> @hubs.prj.fire \change, {ops,source}
      create: ~>
        ret = {answer: {}}
        form = @grp.{}form
        ret.answer{}[form.{}purpose.title or 'title'].content = @prj.name
        ret.answer{}[form.purpose.description or 'description'].content = @prj.description
        ret
    }).then (doc) ~> @hubs.prj.doc = doc

  adapt: ->
    @ctrl-form.adapt {hub: @hubs.prj, path: []}
  init-form: ->
    @ctrl-form = new prjForm {
      root: '[ld-scope=prj-form-use]'
      view-mode: true
      form: (@grp.{}form)
      grp: @grp
      brd: @brd
      prj: @prj
    }
    @ctrl-form.on \submit, (answer) ~>
      data = payload: answer, type: \prj, slug: @prj.slug
      ldcvmgr.toggle \publishing, true
      auth.recaptcha.get!
        .then (recaptcha) ->
          data.recaptcha = recaptcha
          ld$.fetch "/dash/api/detail", {method: \PUT}, {json: data, type: \json}
        .finally -> ldcvmgr.toggle \publishing, false
        .then ~> @prj.detail = JSON.parse(JSON.stringify(answer))
        .then ~> @ctrl-form.render!
        .then -> ldcvmgr.toggle \prj-published, true
        .catch error!
    @adapt!

  render: -> @view.render!


[path,slug] = /^\/(?:dash\/)?prj\/([^/]+)\/edit/.exec(window.location.pathname) or []

ctrl = new Ctrl {prj: slug}
auth.get!
  .then -> ctrl.fetch!
  .then -> ctrl.sharedb!
  .then -> ctrl.getdoc!
  .then -> ctrl.init-form!
  .then -> ctrl.render!
  .then -> console.log "inited."
  .then -> loader.off!
  .catch error!
