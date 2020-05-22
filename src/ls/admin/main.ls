ldc.register \adminGuard,
<[auth loader sdbAdapter
adminMenu adminPanel adminInfo adminStage adminPerm adminNavbar]>,
({auth, loader, sdbAdapter,
admin-menu, admin-panel, admin-info, admin-stage, admin-perm, admin-navbar}) ->

  loader.on!

  auth.fetch!
    .then (g) ->
      [path,type,slug] = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) or []
      hint = {} <<< (if type => (if type == \o => {org: slug} else {brd: slug}) else {})
      ld$.fetch '/d/toc/', {method: \POST}, {json: hint, type: \json}
        .then (toc) ->
          init toc
            .catch (e) -> # standalone catch for capturing execution error
              console.log "admin init error", e
              lda.ldcvmgr.toggle \error
        .catch -> lda.ldcvmgr.lock \create-brd-now
    .catch -> lda.ldcvmgr.toggle \auth-required
    .then -> loader.off!

  init = (toc) ->
    toc.doc = {}
    <[org brd brds brdsFiltered grps]>.map -> toc[it] = toc[it] or []
    toc.brdsFiltered = toc.brds or []
    console.log toc
    
    prepare-sharedb toc
      .then ({org,brd}) ->
        # TODO initialization here? 
        if !brd.doc.data.page => brd.doc.submitOp [{p: ["page"], oi: {navbar: {}}}]
        menu = new admin-menu {toc}
        menu.adapt  {hub: brd, path: <[group]>}
        info = new admin-info root: '[ld-scope=brd-info]', type: \brd
        info.adapt  {hub: brd, path: <[info]> }
        stage = new admin-stage {toc, root: '[ld-scope=brd-stage]'}
        stage.adapt {hub: brd, path: <[stage]>}
        perm = new admin-perm {toc, root: '[ld-scope=brd-perm]'}
        perm.adapt {hub: brd, path: <[perm]>}
        navbar = new admin-navbar {toc, root: '[ld-scope=navbar-editor]'}
        navbar.adapt {hub: brd, path: <[page navbar]>}

  Hub = -> @ <<< {evt-handler: {}} <<< it
  Hub.prototype = Object.create(Object.prototype) <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v

  prepare-sharedb = (toc) ->
    sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    sdb.on \close, ->
      loader.on!
      sdb.reconnect!
        .then -> prepare!
        .then -> loader.off!

    hubs = org: new Hub({sdb}), brd: new Hub({sdb})

    watch = ->
    prepare = ->
      console.log "preparing sharedb documents ... "
      sdb.get {id: "org-#{toc.org.key}", watch: (ops,source) -> org.fire \change, {ops,source} }
        .then (doc) -> hubs.org.doc = doc
        .then -> sdb.get {id: "brd-#{toc.brd.key}", watch: (ops,source) -> hubs.brd.fire \change, {ops.source}}
        .then (doc) -> hubs.brd.doc = doc
        .then -> hubs
        .catch -> ldcvmgr.toggle \error

    prepare!


ldc.app \adminGuard
