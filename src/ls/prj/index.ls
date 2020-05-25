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

console.log "fetch brd-4 snapshot ..."

lc = {}

sdb.get-snapshot {id: \brd-4}
  .then (s) ->
    lc.snapshot = s.data
    console.log s

    sdb.get {id: "prj-sample", watch: (ops,source) -> hubs.prj.fire \change, {ops,source} }
  .then (doc) ->
    hubs.prj.doc = doc
    grp = [v for k,v of lc.snapshot.group].0 or {}
    form = new prjForm {
      root: '[ld-scope=prj-form]'
      view-mode: true
      form: (grp.{}form.list or [])
      grp: grp
      brd: lc.snapshot
    }
    form.adapt {hub: hubs.prj, path: ['content']}
    console.log "adapted"
    loader.off!
  .catch ->
    console.log it
    loader.off!
    ldcvmgr.toggle \error

