({ldcvmgr,sdbAdapter,loader,error}) <- ldc.register <[ldcvmgr sdbAdapter loader error]>, _

Ctrl = (opt) ->
  @opt = opt
  @slug = opt.slug or suuid!
  @data = {}
  @update = debounce -> @ops-out ~> @data
  @preview = new ldCover root: '[ld=preview-ldcv]'
  @view = new ldView do
    root: document.body
    handler: do
      url: ({node}) ~>
        url = "/dash/post/#{@slug}/"
        node.setAttribute \href, url
        node.innerText = url
      title: ({node}) ~> node.value = @data.title or ' ... '

    action: click: do
      preview: ~>
        @preview.toggle!
        @view.get('preview-panel').innerHTML = DOMPurify.sanitize(marked(@data.content))

      publish: ({node}) ~>
        data = payload: @data, type: \post, slug: @slug
        ldcvmgr.toggle \publishing, true
        ld$.fetch "/dash/api/detail", {method: \PUT}, {json: data, type: \json}
          .finally -> ldcvmgr.toggle \publishing, false
          .then ->
            ldcvmgr.toggle \published, true
            debounce 2000 .then -> ldcvmgr.toggle \published, false
          .catch error!

  @


Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @quill.root.innerHTML = @data.content or ''
    @view.render!


  init: -> Promise.resolve!then ~>
    @quill = quill = new Quill \#editor, {theme: \snow}
    quill.on \text-change, (delta, old-delta, source) ~>
      @data.content = quill.root.innerHTML
      @update!

  fetch: ->
    ld$.fetch "/dash/api/post/#{@slug}/", {method: \GET}, {type: \json}
      .then ~> @post = it
  render: -> @view.render!
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
        .then ~> @render!
        .then -> console.log "re-inited."
        .then -> ldcvmgr.toggle \offline-retry, false
    @hub = new Hub({sdb})
    sdb.ready!

  getdoc: ->
    console.log "get post document ..."
    console.log @post.detail, @slug
    @sdb.get({
      id: "post/#{@slug}"
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> @post.detail
    }).then (doc) ~> @hub.doc = doc

loader.on!
ret = /^\/dash\/post\/(.+)\/edit$/.exec(window.location.pathname)
slug = ret.1
ctrl = new Ctrl {slug}
ctrl.init!
  .then -> ctrl.fetch!
  .then -> ctrl.sharedb!
  .then -> ctrl.getdoc!
  .then -> ctrl.render!
  .then -> ctrl.adapt {hub: ctrl.hub, path: []}
  .then -> loader.off!

