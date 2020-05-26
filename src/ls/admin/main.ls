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

    ctrl = {org: {}, brd: {}, grp: {}}
    set-group = (v) ->
      (k) <- [k for k of grp].map _
      p = ['group', v.key, k]
      if !ctrl.grp[k].adapted! => ctrl.grp[k].adapt {hub: hubs.brd, path: p}
      else ctrl.grp[k].set-path p

    prepare-sharedb toc
      .then ({org,brd}) ->
        hubs <<< {org, brd}

        ctrl.org.info = new admin-info root: '[ld-scope=org-info]', type: \org
        ctrl.org.info.adapt {hub: org, path: <[info]> }

        menu = new admin-menu {toc, set-group}
        menu.adapt   {hub: brd, path: <[group]>}
        info = new admin-info root: '[ld-scope=brd-info]', type: \brd
        info.adapt   {hub: brd, path: <[info]> }
        stage = new admin-stage {toc, root: '[ld-scope=brd-stage]'}
        stage.adapt  {hub: brd, path: <[stage]>}
        perm = new admin-perm {toc, root: '[data-nav=brd-config] [ld-scope=perm-panel]'}
        perm.adapt   {hub: brd, path: <[perm]>}

        navbar = do
          brd: new admin-navbar {toc, root: '[data-name=brd-navbar] [ld-scope=navbar-editor]'}
          org: new admin-navbar {toc, root: '[data-name=org-navbar] [ld-scope=navbar-editor]'}
        navbar.brd.adapt {hub: brd, path: <[page navbar]>}
        navbar.org.adapt {hub: org, path: <[page navbar]>}

        # group information
        ctrl.grp
          ..form = new prj-form {toc, root: '[ld-scope=grp-form]', view-mode: false}
          ..info = new admin-info {root: '[ld-scope=grp-info-panel]', type: \grp, set-group: set-group}
          ..perm = new admin-perm {toc, root: '[data-nav=grp-config] [ld-scope=perm-panel]'}
          ..grade = new admin-entry {root: '[ld-scope=grade-panel]'}
          ..criteria = new admin-entry {root: '[ld-scope=criteria-panel]'}

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

    modify = {org: {}, brd: {}}

    publish = ->
      ldcvmgr.toggle("publishing",true)
      Promise.resolve!
        .then ->
          ps = <[brd org]>.map (type) ->
            Promise.resolve!then ->
              if !toc[type]key or !modify[type]dirty => return
              payload = hubs[type]doc.data
              ld$.fetch \/d/detail/, {method: \PUT}, {json: {payload, key: toc[type]key, type}, type: \json}
                .then ->
                  toc[type]detail = payload
                  modify[type] <<< data: JSON.stringify(payload), dirty: false
          Promise.all ps
        .then ->
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
          mod = <[brd org]>.map ->
            modify[it].dirty = (
              toc[it]key and
              hubs[it]doc and
              JSON.stringify(hubs[it]doc.data or {}) != (modify[it]data or "{}")
            )
          node.classList.toggle \d-none, !(mod.0 or mod.1)

    hubs = org: new Hub({sdb}), brd: new Hub({sdb})
    prepare = ->
      console.log "preparing sharedb document (org) ... "
      sdb.get {id: "org-#{toc.org.key}", watch: (ops,source) -> hubs.org.fire \change, {ops,source} }
        .then (doc) -> hubs.org.doc = doc
        .then -> console.log "preparing sharedb document (brd) ... "
        .then -> sdb.get {id: "brd-#{toc.brd.key}", watch: (ops,source) -> hubs.brd.fire \change, {ops,source}}
        .then (doc) -> hubs.brd.doc = doc
        .then ->
          modify.org.data = JSON.stringify(toc.org.detail or "")
          modify.brd.data = JSON.stringify(toc.brd.detail or "")

          hubs.org.doc.on \op, -> update-view!
          hubs.brd.doc.on \op, -> update-view!

          view.render!
          hubs
        .catch -> lda.ldcvmgr.toggle \error

    prepare!


ldc.app \adminGuard
