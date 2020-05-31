ldc.register \treemenu, <[sharetree loader editor]>, ({sharetree, loader, editor}) ->
  lc = {}
  ldld = new ldLoader className: 'ldld full z-fixed'
  ldld.on!
  data = {children: [
    {name: "page", children: [{name: "index.html"}, {name: "test.html"}]}
    {name: "style", children: [{name: "index.css"}]}
    {name: "script", children: [{name: "index.js"}]}
    {name: "widget", children: []}
    {name: "asset", children: [{name: "thumb.png"}]}
  ]}

  sdb = new sharedb-wrapper do
    url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    path: '/dash/ws'
  sdb.on \close, ->
    ldld.on!
    sdb.reconnect!
      .then -> init!
      .then -> ldld.off!
  hubs = pages: new Hub({sdb}), file: new Hub({sdb})
  fetch = (name) ->
    ldld.on!
    sdb.get({id: "brd/4/file[#name]"})
      .then (doc) ->
        console.log "fetch brd/4/file[#name]"
        if hubs.file.doc => hubs.file.doc.destroy!
        hubs.file.doc = doc
        if !lc.editor.adapter => lc.editor.adapt hub: hubs.file, path: []
        else lc.editor.set-doc doc
        ldld.off!
      .catch -> ldld.off!
  sdb.get({id: 'brd/4/pages'})
    .then (doc) ->
      hubs.pages.doc = doc

      lc.tree = tree = new sharetree do
        root: '[ld-scope=folder]'
        data: data
      tree.adapt hub: hubs.pages, path: []

      lc.editor = new editor do
        root: '[ld-scope=editor]'

      tree.on \click, -> fetch it.name
    .then -> ldld.off!

ldc.register \editor, <[sdbAdapter]>, ({tree, sdbAdapter}) ->
  Ctrl = (opt) ->
    root = opt.root
    @root = root = if typeof(root) == \string => document.querySelector(root) else if root => root else null
    @el = el = do
      editor: ld$.find(@root, '[ld-scope=edit]', 0)
      viewer: ld$.find(@root, '[ld-scope=view]', 0)

    @cm = cm = CodeMirror(
      el.editor, ({
        mode: \javascript
        lineNumbers: true
        theme: \ayu-mirage
        lineWrapping: true
        keyMap: "default" # or, vim
        showCursorWhenSelecting: true
        viewportMargin: Infinity
      } <<< {})
    )


    bbox = el.editor.getBoundingClientRect!
    cm.setSize bbox.width, bbox.height
    cm.setValue ''

    sandbox = new Sandbox do
      container: el.viewer
      className: 'w-100 h-100 border-0'
      sandbox: 'allow-scripts allow-pointer-lock allow-modals'

    cm.on \change, ~>
      @ops-out ~> @data.content = cm.getValue!; @data
      render!
    render = ->
      html = cm.getValue!
      sandbox.load {html, css: "", js: ""}


    @
  Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
    render: -> @cm.setValue ((@data or {}).content or '')
    ops-in: ({data,ops,source}) ->
      if source => return
      @data = JSON.parse(JSON.stringify(data))
      @render!
  Ctrl

ldc.register \sharetree, <[tree sdbAdapter]>, ({tree, sdbAdapter}) ->
  Ctrl = (opt) ->
    @tree = new tree(opt)
    @evt-handler = {}
    @tree.on \update, ~> @ops-out ~> @data
    @tree.on \click, ~> @fire \click, it
    @

  Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
    ops-in: ({data,ops,source}) ->
      if source => return

      if !data.children =>
        @data = data = {children: [
          {name: "page", children: [{name: "index.html"}, {name: "test.html"}]}
          {name: "style", children: [{name: "index.css"}]}
          {name: "script", children: [{name: "index.js"}]}
          {name: "widget", children: []}
          {name: "asset", children: [{name: "thumb.png"}]}
        ]}
        @ops-out ~> @data
      else @data = JSON.parse JSON.stringify data

      @tree.set-data @data
      @tree.render!

  Ctrl

ldc.app \treemenu

<- ldc.register \tree, <[]>, _
Tree = (opt) ->
  @opt = opt
  @data = opt.data
  root = opt.root
  @root = root = if typeof(root) == \string => document.querySelector(root) else if root => root else null
  @sample = do
    item: ld$.find(root, '[ld-scope=sample-item]', 0)
    folder: ld$.find(root, '[ld-scope=sample-folder]', 0)
  @view = @init {node: @root, data: @data}
  @evt-handler = {}
  @reb = new reblock root: @root
  @

Tree.prototype = Object.create(Object.prototype) <<< do
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
  set-data: (data) ->
    @view.setContext {data}
    @view.render!

  render: -> @view.render!
  init: ({node, data, parent}) ->
    sync = ~> @fire \update; @view.render!
    view = new ldView do
      context: {data, parent}
      root: node
      action: do
        input: ({node, context, evt}) ->
          node.innerText = node.innerText
        dblclick: do
          name: ({node, context, evt}) ->
            node.setAttribute \contenteditable, true
        click: do
          add: ({node, context, evt}) ~>
            context.data.children.push {name: "untitled.html"}
            sync!
            evt.stopPropagation!
          clone: ({node, context, evt}) ->
            list = context.parent.children
            new-obj = JSON.parse(JSON.stringify(context.data))
            name = new-obj.name
            for i from 0 to 100 =>
              nn = name.replace /-(\d+)\.([^.]+)$/, "-#i.$2"
              if !list.filter(-> it.name == nn).length => break
            if i == 100 => return alert "clone failed."
            new-obj.name = nn
            list.splice list.indexOf(context.data), 0, new-obj
            sync!
          delete: ({node, context, evt}) ->
            list = context.parent.children
            list.splice list.indexOf(context.data), 1
            sync!

      handler: do
        name: ({node,context}) -> node.innerText = context.data.name
        icon: ({node,context}) -> node.classList.toggle \d-none, !!context.children
        list: do
          list: ({context}) -> context.data.children
          action: click: ({node, data, context, evt}) ~>
            if !node.classList.contains(\folder-item) => return
            if @active => @active.classList.toggle \active, false
            @active = node
            node.classList.toggle \active, true
            @fire \click, data
          init: ({node, data, local, context}) ~>
            sample = @sample[if data.children => \folder else \item].childNodes.0
            node.setAttribute \class, sample.getAttribute(\class)
            node.setAttribute \draggable, true
            node.innerHTML = sample.innerHTML
            if data.children => local.folder = new ldui.Folder root: node
            local.view = @init {node, data, parent: context.data}
          handler: ({local, data, context}) ->
            local.view.setContext {data, parent: context.data}
            local.view.render!
return Tree
