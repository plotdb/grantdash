(->
  ldc.register \admin,
  <[viewLocals orgInfo orgPerm brdInfo loader]>,
  ({viewLocals, orgInfo, orgPerm, brdInfo, loader}) ->
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

    watch-board = (ops, source) ->
      brdInfo.watch {ops, source}

    ret = /b\/([0-9]+)/.exec(window.location.pathname)
    if ret => 
      id = "board-#{if ret => ret.1 else \demo}"
      init-board = ->
        loader.on!
        sdb.get {id, watch: watch-board}
          .then (doc) ->
            lc.doc = doc
            console.log doc.data
            brdInfo.init {doc, sdb}
            loader.off!
      init-board!

    loader.off!

  ldc.app \admin
)!
