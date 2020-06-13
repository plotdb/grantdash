({error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgePreliminaryUser,
<[error loader auth ldcvmgr sdbAdapter]>, _


Ctrl = (opt) ->
  @loader = loader
  @ <<< opt{brd, grp}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prjs = []
  @data = {}
  @progress = @get-progress!
  @_update = debounce ~> if @user => @ops-out ~> @data

  @view = view = new ldView do
    root: root
    handler: do
      progress: ({node}) ~> node.innerText = Math.round(100 * @progress.done / @progress.total)
      "progress-accept": ({node}) ~> node.style.width = "#{100 * @progress.accept / @progress.total}%"
      "progress-pending": ({node}) ~> node.style.width = "#{100 * @progress.pending / @progress.total}%"
      "progress-reject": ({node}) ~> node.style.width = "#{100 * @progress.reject / @progress.total}%"
      prj: do
        list: ~> @prjs
        init: ({node, data, local}) ~>
          local.view = new ldView do
            context: data
            root: node
            action: click: do
              option: ({node, context}) ~>
                name = node.getAttribute(\data-name)
                @data{}[context.slug].value = name
                @render!
                @update!
              comment: ->
            text: do
              name: ({node, context}) -> context.name
              ownername: ({node, context}) -> context.ownername
            handler: do
              option: ({node, local, context}) ~>
                name = node.getAttribute(\data-name)
                cls = {accept: "bg-success", pending: "bg-warning", reject: "bg-danger"}[name]
                act = if (@data{}[context.slug].value == name) => \add else \remove
                node.classList[act].apply node.classList, [cls, 'text-white']

        handler: ({node, data, local}) ->
         local.view.setContext data
         local.view.render!

  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  render: ->
    @progress = @get-progress!
    @view.render!

  update: (opt={}) ->
    if !opt.debounced => @_update!now! else @_update!

  get-progress: ->
    ret = {done: 0, accept: 0, pending: 0, reject: 0, total: (@prjs.length or 1)}
    for k,v of @data =>
      if v.value => ret[v.value]++
    ret.done = (ret.accept + ret.pending + ret.reject) or 0
    console.log JSON.stringify(ret)
    return ret

  fetch: ->
    console.log "get project list ... "
    ld$.fetch '/dash/api/brd/sch001/list', {method: \GET}, {type: \json}
      .then ~>
        @prjs = it
        @render!

  sharedb: ->
    console.log "prepare sharedb ..."
    @sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
      path: '/dash/ws'
    @hub = new Hub({sdb})
    sdb.on \error, -> ldcvmgr.toggle \not-sync
    sdb.on \close, ~>
      ldcvmgr.toggle \offline-retry, true
      sdb.reconnect!
        .then ~> @getdoc!
        .then ~> @adapt!
        .then -> console.log "admin initialized."
        .then ~> ldcvmgr.toggle \offline-retry, false
    sdb.ready!

  getdoc: ->
    console.log "get judge document ... "
    @hub.doc = null
    @sdb.get({
      id: "brd/#{@brd}/grp/#{@grp}/judge/preliminary"
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> {}
    })
      .then (doc) ~>
        @hub.doc = doc
        doc.on \op, ~> @render!
        if @user => @adapt {hub: @hub, path: ['user', @user.key]}
        else @adapt {hub: @hub, path: []}
      .catch -> console.log "getdoc failed.", it

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @render!


auth.get!
  .then (g) ->
    ctrl = new Ctrl do
      user: g.user
      root: document.body
      brd: \sch001
      grp: \4rFUP+03IS05ZD09ku03KMlsh
    Promise.resolve!
      .then -> ctrl.fetch!
      .then -> ctrl.sharedb!
      .then -> ctrl.getdoc!
      .then -> console.log "initied."
