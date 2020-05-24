({prjForm, loader, ldcvmgr}) <- ldc.register <[prjForm loader ldcvmgr]>, _

#ldcv = new ldCover root: '[ld-scope=prj-diff]'
#ldcv.get!then -> console.log \hi


loader.on!
console.log "initializing ..."

#[path, slug] = /b\/([^/]+)\/admin/.exec(window.location.pathname) or []

sdb = sdb = new sharedb-wrapper do
  url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}

sdb.on \close, ->
  loader.on!
  sdb.reconnect!
    .then -> prepare!
    .then -> loader.off!

hubs = do
  brd: new Hub({sdb})
  prj: new Hub({sdb})

console.log "connect to sharedb brd-4 doc.."

sdb.get {id: "brd-4", watch: (->) }
  .then (doc) ->
    hubs.brd.doc = doc
    sdb.get {id: "prj-sample", watch: (ops,source) -> hubs.prj.fire \change, {ops,source} }
  .then (doc) ->
    hubs.prj.doc = doc
    form = new prjForm {
      root: '[ld-scope=prj-form]'
      view-mode: true
      form: ((hubs.brd.doc.data.group["grp-dcw5apu5fe9"].{}form.list) or [])
    }
    form.adapt {hub: hubs.prj, path: ['content']}
    console.log "adapted"
    loader.off!
  .catch ->
    console.log it
    loader.off!
    ldcvmgr.toggle \error

