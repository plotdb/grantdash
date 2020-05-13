(->
  ldc.register \admin,
  <[viewLocals orgInfo orgPerm brdInfo prjInfo loader]>,
  ({viewLocals, orgInfo, orgPerm, brdInfo, prjInfo, loader}) ->
    loader.on!
    lc = {}

    sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    sdb.on \close, ->
      loader.on!
      sdb.reconnect!
        .then -> init!
        .then -> loader.off!

    watch = (ops, source) ->
      orgInfo.watch {ops, source}
      orgPerm.watch {ops, source}

    ret = /o\/([0-9]+)/.exec(window.location.pathname)
    if ret => 
      id = "org-#{if ret => ret.1 else \demo}"
      init = ->
        loader.on!
        sdb.get {id, watch}
          .then (doc) ->
            lc.doc = doc
            console.log doc.data
            orgInfo.init {doc, sdb}
            orgPerm.init {doc, sdb}
            loader.off!
      init!


    prjg-view = new ldView do
      init-render: false
      root: ".project-groups"
      action: click: do
        "project-group-add": ({node}) ->
          data = JSON.parse(JSON.stringify(lc.docbrd.data))
          data.[]group.push do
            key: data.[]group.length + 1
            name: "新分組"
          ops = sdb.json.diff lc.docbrd.data, data
          lc.docbrd.submitOp ops
          prjg-view.render!
      handler: do
        "project-group": do
          list: -> lc.docbrd.data.group or []
          handler: ({node, data}) ->
            n = ld$.find(node, '[ld=name]', 0)
            n.innerText = data.name
            new ldui.Folder root: node
            new ldui.Nav node
          

    watch-board = (ops, source) ->
      brdInfo.watch {ops, source}
      prjInfo.watch {ops, source}

    ret = /b\/([0-9]+)/.exec(window.location.pathname)
    if ret => 
      id = "board-#{if ret => ret.1 else \demo}"
      init-board = ->
        loader.on!
        sdb.get {id, watch: watch-board}
          .then (doc) ->
            lc.docbrd = doc
            brdInfo.init {doc: lc.docbrd, sdb}
            prjInfo.init {doc: lc.docbrd, sdb}
            prjg-view.render!
            loader.off!
      init-board!

    loader.off!

  ldc.app \admin
)!
