({prjForm, loader, ldcvmgr}) <- ldc.register <[prjForm loader ldcvmgr]>, _

Ctrl = (opt) ->
  @ldcv = new ldCover root: '[ld-scope=prj-diff]'
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  fetch: ->
    console.log "fetching board form ..."
    ld$.fetch \/d/b/4/form, {method: \GET}, {type: \json}
      .then ~> @brd = it

  sharedb: ->
    console.log "initializing sharedb connection ..."
    @sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    sdb.on \close, ->
      loader.on!
      sdb.reconnect!
        .then -> prepare!
        .then -> loader.off!
    @hubs = prj: new Hub({sdb})

  getdoc: ->
    console.log "get project document ..."
    @sdb.get({
      id: "prj-sample"
      watch: (ops,source) ~> @hubs.prj.fire \change, {ops,source}
    }).then (doc) ~> @hubs.prj.doc = doc

  init-form: ->
    grp = [v for k,v of @brd.detail.group].0 or {}
    @ctrl-form = new prjForm {
      root: '[ld-scope=prj-form]'
      view-mode: true
      form: (grp.{}form.list or [])
      grp: grp
      brd: @brd
    }
    @ctrl-form.adapt {hub: @hubs.prj, path: ['content']}

ctrl = new Ctrl!
loader.on!
ctrl.fetch!
  .then -> ctrl.sharedb!
  .then -> ctrl.getdoc!
  .then -> ctrl.init-form!
  .then -> loader.off!
