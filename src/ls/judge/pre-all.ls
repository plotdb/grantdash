({error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgePreliminaryAll,
<[error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @opt = opt
  @ <<< opt{brd, grp}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @data = {}
  @_update = debounce ~> @ops-out ~> @data

  @view = view = new ldView do
    root: root
    handler: do
      prj: do
        list: ~> @prjs
        init: ({node, data, local}) ~>
          local.view = new ldView do
            context: data
            root: node
            text: do
              name: ({node, context}) -> context.name
              ownername: ({node, context}) -> context.ownername
            action: click: do
              pick: ({node, context}) ~>
                obj = @data.{}prj{}[context.slug]
                obj.picked = !obj.picked
                local.view.render!
                @update!
            handler: do
              pick: ({node, context}) ~>
                cls = [<[i-check text-white bg-success]>, <[i-circle text-secondary bg-light]>]
                obj = @data.{}prj{}[context.slug]
                cl = node.classList
                cl.add.apply cl, if obj.picked => cls.0 else cls.1
                cl.remove.apply cl, if obj.picked => cls.1 else cls.0
              progress: ({node, context}) ~>
                n = node.getAttribute(\data-name)
                node.style.width = "#{100 * context.{}count[n] / (context.{}count.total or 1)}%"
              count: ({node, context}) ~>
                n = node.getAttribute(\data-name)
                node.innerText = context{}count[n] or 0

        handler: ({node, data, local}) ->
         local.view.setContext data
         local.view.render!
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  render: ->
    @view.render!

  update: (opt={}) ->
    if !opt.debounced => @_update!now! else @_update!

  fetch: ->
    console.log "get project list ... "
    ld$.fetch '/dash/api/brd/test-brd/list', {method: \GET}, {type: \json}
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
        .then ~> @adapt {hub: @hub, path: []}
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
        @adapt {hub: @hub, path: []}
      .catch -> console.log "getdoc failed.", it

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    console.log @data

    count = {accept: 0, pending: 0, reject: 0}
    @prjs.map (prj) ~>
      prj.count = {accept: 0, pending: 0, reject: 0, total: 0}
      for k,v of @data.user => prj.count[v[prj.slug].value]++
      prj.count.total = prj.count.accept + prj.count.pending + prj.count.reject 

    @render!

auth.get!
  .then (g) ->
    ctrl = new Ctrl do
      root: document.body
      brd: \test-brd
      grp: \4jUmMh07zZ05kl0Col03v-Bhu
    Promise.resolve!
      .then -> ctrl.fetch!
      .then -> ctrl.sharedb!
      .then -> ctrl.getdoc!
      .then -> console.log "initied."
