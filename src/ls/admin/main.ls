ldc.register \adminGuard,
<[ldcvmgr auth loader sdbAdapter error
adminMenu adminPanel adminInfo adminStage adminPerm adminNavbar
prjForm adminEntry]>,
({ldcvmgr, auth, loader, sdbAdapter, error,
admin-menu, admin-panel, admin-info, admin-stage, admin-perm, admin-navbar,
prj-form, admin-entry}) ->

  loader.on!

  console.log "fetch auth data ..."
  auth.fetch!
    .then (g) ->
      [path,type,slug] = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) or []
      hint = {} <<< (if type => (if type == \o => {org: slug} else {brd: slug}) else {})
      console.log "fetch sidemenu information ... "
      ld$.fetch '/d/toc/', {method: \POST}, {json: hint, type: \json}
        .then (toc) ->
          console.log "initialization ..."
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
    console.log "sidemenu information: ", toc

    hubs = {}

    grp = {}
    set-group = (v) ->
      (k) <- [k for k of grp].map _
      p = ['group', v.key, k]
      if !grp[k].adapted! => grp[k].adapt {hub: hubs.brd, path: p}
      else grp[k].set-path p

    prepare-sharedb toc
      .then ({org,brd}) ->
        hubs <<< {org, brd}
        # TODO remove this? we have fixed sdb-adapter so there is no need to manually init.
        #if !brd.doc.data.page => brd.doc.submitOp [{p: ["page"], oi: {navbar: {}}}]
        menu = new admin-menu {toc, set-group}
        menu.adapt   {hub: brd, path: <[group]>}
        info = new admin-info root: '[ld-scope=brd-info]', type: \brd
        info.adapt   {hub: brd, path: <[info]> }
        stage = new admin-stage {toc, root: '[ld-scope=brd-stage]'}
        stage.adapt  {hub: brd, path: <[stage]>}
        perm = new admin-perm {toc, root: '[data-nav=brd-config] [ld-scope=perm-panel]'}
        perm.adapt   {hub: brd, path: <[perm]>}
        navbar = new admin-navbar {toc, root: '[ld-scope=navbar-editor]'}
        navbar.adapt {hub: brd, path: <[page navbar]>}

        # group information
        grp.form = new prj-form {toc, root: '[ld-scope=prj-form]', view-mode: false}
        grp.info = new admin-info {root: '[ld-scope=grp-info-panel]', type: \grp, set-group: set-group}
        grp.perm = new admin-perm {toc, root: '[data-nav=prj-config] [ld-scope=perm-panel]'}
        grp.grade = new admin-entry {root: '[ld-scope=grade-panel]'}
        grp.criteria = new admin-entry {root: '[ld-scope=criteria-panel]'}

  prepare-sharedb = (toc) ->
    console.log "prepare sharedb ..."
    sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    sdb.on \close, ->
      loader.on!
      sdb.reconnect!
        .then -> prepare!
        .then -> loader.off!
    update-view = debounce 500, ->
      view.render!

    init-data = {}

    publish = ->
      payload = hubs.brd.doc.data
      ldcvmgr.toggle("publishing",true)
      ld$.fetch "/d/b/#{toc.brd.key}/detail", {method: \PUT}, {json: {payload}, type: \json}
        .then ->
          toc.brd.detail = payload
          init-data.brd = JSON.stringify(payload)
          update-view!
        .then ->
          ldcvmgr.toggle("publishing",false)
          ldcvmgr.toggle("published",true)
          debounce 2000
        .then -> ldcvmgr.toggle("published", false)
        .finally ->
          ldcvmgr.toggle("publishing",false)
        .catch error!

    view = new ldView do
      init-render: false
      root: '[ld-scope=admin]'
      action: click: do
        "publish-modification": -> publish!
      handler: do
        "modified-warning": ({node}) ->
          if !hubs.brd.doc => return
          modified = (JSON.stringify(hubs.brd.doc.data) != init-data.brd)
          node.classList.toggle \d-none, !modified

    hubs = org: new Hub({sdb}), brd: new Hub({sdb})
    prepare = ->
      console.log "preparing sharedb document (org) ... "
      sdb.get {id: "org-#{toc.org.key}", watch: (ops,source) -> hub.org.fire \change, {ops,source} }
        .then (doc) -> hubs.org.doc = doc
        .then -> console.log "preparing sharedb document (brd) ... "
        .then -> sdb.get {id: "brd-#{toc.brd.key}", watch: (ops,source) -> hubs.brd.fire \change, {ops,source}}
        .then (doc) -> hubs.brd.doc = doc
        .then ->
          init-data.org = JSON.stringify(hubs.org.doc.data)
          init-data.brd = JSON.stringify(toc.brd.detail or "")

          hubs.org.doc.on \op, -> update-view!
          hubs.brd.doc.on \op, -> update-view!

          view.render!
          hubs
        .catch -> lda.ldcvmgr.toggle \error

    prepare!


ldc.app \adminGuard
