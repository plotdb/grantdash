(->
  ldc.register \admin, <[viewLocals orgBasic]>, ({viewLocals, orgBasic}) ->
    console.log viewLocals

    lc = {}
    sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    watch = ->
    update = ->

    ret = /o\/([0-9]+)/.exec(window.location.pathname)
    id = "org-#{if ret => ret.1 else \demo}"

    sdb.get {id, watch}
      .then (doc) ->
        lc.doc = doc
        console.log doc
        orgBasic.install {doc, sdb}
  ldc.app \admin
)!
