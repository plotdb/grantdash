(->
  ldc.register \admin, <[viewLocals orgInfo orgPerm loader]>, ({viewLocals, orgInfo, orgPerm, loader}) ->
    loader.on!
    lc = {}

    /*
    history = new ctrlz {obj: JSON.parse(JSON.stringify(obj))}
    document.addEventListener \keydown, (e) ->
      if e.keyCode == 90 and (e.metaKey or e.ctrlKey) =>
        if e.shiftKey => history.redo!
        else history.undo!
        payload = JSON.parse(JSON.stringify(history.get!))
        obj.idx = payload.idx
        obj.cfg = payload.cfg
    */

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

    update = ->

    ret = /o\/([0-9]+)/.exec(window.location.pathname)
    id = "org-#{if ret => ret.1 else \demo}"

    init = ->
      loader.on!
      sdb.get {id, watch}
        .then (doc) ->
          lc.doc = doc
          console.log doc.data
          orgInfo.install {doc, sdb}
          orgPerm.install {doc, sdb}
          loader.off!
    init!
    loader.off!

  ldc.app \admin
)!
