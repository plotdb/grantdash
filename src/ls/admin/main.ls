ldc.register \adminGuard,
<[ldcvmgr auth loader sdbAdapter error
adminMenu adminPanel adminInfo adminStage adminPerm adminNavbar
adminPrjList prjForm adminEntry adminWelcome]>,
({ldcvmgr, auth, loader, sdbAdapter, error,
admin-menu, admin-panel, admin-info, admin-stage, admin-perm, admin-navbar,
admin-prj-list, prj-form, admin-entry, admin-welcome}) ->

  Ctrl = ->
    @loader = loader
    @hubs = null
    @ctrl = {org: {}, brd: {}, grp: {}}

    # keep dirty bit and original data of org and brd.
    @modify = {org: {}, brd: {}}

    @view = new ldView do
      global: true
      init-render: false
      root: '[ld-scope=admin]'
      action: click: do
        "publish-modification": ~> @publish!
      handler: do
        "init-loader": ({node}) ->
          node.classList.add \ld, \ld-fade-out, \xp35
          setTimeout (-> node.classList.add \d-none ), 350
        "brd-menu": ({node}) ~>
          node.classList.toggle \d-none, !@toc.brd.key
        "modified-warning": ({node}) ~>
          mod = <[brd org]>.map ~>
            @modify[it].dirty = (
              @toc[it]key and
              @hubs[it]doc and @hubs[it]doc.data and
              JSON.stringify(@hubs[it]doc.data or {}) != (@modify[it]data or "{}")
            )
          node.classList.toggle \d-none, !(mod.0 or mod.1)

    @

  Ctrl.prototype = Object.create(Object.prototype) <<< do
    render: -> @view.render!
    fetch: ->
      [path,type,slug] = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) or []
      hint = {} <<< (if type => (if type == \o => {org: slug} else {brd: slug}) else {})
      console.log "fetch auth data ..."
      auth.fetch!
        .catch (e) -> Promise.reject new ldError({id: 1007, e})
        .then (g) ~>
          if !g.user.key => return Promise.reject new ldError({id: 1000})
          console.log "fetch toc information ... "
          ld$.fetch '/d/toc/', {method: \POST}, {json: hint, type: \json}
        .then (toc) ~>
          <[org brd brds brdsFiltered grps]>.map -> toc[it] = toc[it] or []
          toc.brdsFiltered = toc.brds or []
          @toc = toc
          @modify.org.data = JSON.stringify(@toc.org.detail or {})
          @modify.brd.data = JSON.stringify(@toc.brd.detail or {})
          console.log "toc information: ", toc
        .catch (e) -> Promise.reject(if ldError.id(e) => e else new ldError({id: 1012, e}))

    sharedb: ->
      console.log "prepare sharedb ..."
      @sdb = sdb = new sharedb-wrapper do
        url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
      @hubs = org: new Hub({sdb}), brd: new Hub({sdb})
      sdb.on \close, ~>
        @loader.on!
        sdb.reconnect!
          .then ~> @getdoc!
          .then ~> @loader.off!

    getdoc: ->
      Promise.resolve!
        .then ~>
          ps = <[org brd]>.map (n) ~>
            if !@toc[n].key => return
            console.log "prepare #n document ..."
            @sdb.get({
              id: "#{n}/#{@toc[n]slug}"
              watch: (ops,source) ~> @hubs[n]fire \change, {ops,source}
              create: ~> @toc[n]detail
            }).then (doc) ~>
              if !(@hubs[n]doc = doc) => return
              doc.on \op, ~> @render!
          Promise.all ps
        .then ~> @render!

    set-group: (v) ->
      idx = 0
      @hubs.brd.doc.data.group.map (d,i) -> if d.key == v.key => idx := i
      (k) <~ [k for k of @ctrl.grp].map _
      if !@ctrl.grp[k].adapt => return
      p = ['group', idx, k]
      if !@ctrl.grp[k].adapted! => @ctrl.grp[k].adapt {hub: @hubs.brd, path: p}
      else @ctrl.grp[k].set-path p

    init-ctrl: ->
      {org,brd} = @hubs
      set-group = ~> @set-group it
      toc = @toc

      @ctrl.welcome = new admin-welcome {root: '[ld-scope=admin-welcome]', toc}

      @ctrl.org
        ..info = new admin-info {root: '[ld-scope=org-info]', type: \org, data: toc.org}
        ..info.adapt {hub: org, path: <[info]> }
        ..navbar = new admin-navbar {toc, root: '[data-name=org-navbar] [ld-scope=navbar-editor]'}
        ..navbar.adapt {hub: org, path: <[page navbar]>}
        ..perm = new admin-perm {toc, root: '[data-nav=org-config] [ld-scope=perm-panel]'}
        ..perm.adapt   {hub: org, path: <[perm]>}

      @ctrl.brd
        ..info = new admin-info {root: '[ld-scope=brd-info]', type: \brd, data: toc.brd}
        ..info.adapt   {hub: brd, path: <[info]> }
        ..group = new admin-menu {toc: @toc, set-group}
        ..group.adapt   {hub: brd, path: <[group]>, type: \array}
        ..stage = new admin-stage {toc, root: '[ld-scope=brd-stage]'}
        ..stage.adapt  {hub: brd, path: <[stage]>}
        ..perm = new admin-perm {toc, root: '[data-nav=brd-config] [ld-scope=perm-panel]'}
        ..perm.adapt   {hub: brd, path: <[perm]>}
        ..navbar = new admin-navbar {toc, root: '[data-name=brd-navbar] [ld-scope=navbar-editor]'}
        ..navbar.adapt {hub: brd, path: <[page navbar]>}

      @ctrl.grp
        ..form = new prj-form {toc, root: '[ld-scope=grp-form]', view-mode: false}
        ..info = new admin-info {root: '[ld-scope=grp-info-panel]', type: \grp, set-group}
        ..perm = new admin-perm {toc, root: '[data-nav=grp-config] [ld-scope=perm-panel]'}
        ..grade = new admin-entry {root: '[ld-scope=grade-panel]'}
        ..criteria = new admin-entry {root: '[ld-scope=criteria-panel]'}
        ..list = new admin-prj-list {root: '[ld-scope=prj-list]'}


    publish: ->
      ldcvmgr.toggle \publishing, true
      Promise.resolve!
        .then ~>
          ps = <[brd org]>.map (type) ~>
            if !(@toc[type]key and @modify[type]dirty) => return Promise.resolve!
            payload = @hubs[type]doc.data
            ld$.fetch \/d/detail/, {method: \PUT}, {json: {payload, slug: @toc[type]slug, type}, type: \json}
              .then ~>
                @toc[type]detail = payload
                @modify[type] <<< data: JSON.stringify(payload), dirty: false
          Promise.all ps
        .then ~> @render!
        .then ->
          ldcvmgr.toggle \publishing, false
          ldcvmgr.toggle \published, true
          debounce 2000
        .then -> ldcvmgr.toggle \published, false
        .finally -> ldcvmgr.toggle \publishing, false
        .catch error!

  # loading screen does this job. we can still enable it if there is no loading screen.
  # loader.on!
  ctrl = new Ctrl!
  ctrl.fetch!
    .then -> ctrl.sharedb!
    .then -> ctrl.getdoc!
    .then -> ctrl.init-ctrl!
    .then -> console.log "admin initialized."
    .finally -> loader.off!
    .catch (e) ->
      console.log "[Admin Error] Code: ", e.id
      console.log "Error Object: ", (e.e or e)
      if e.stack => console.log that
      if e.id == 1012 => ldcvmgr.toggle \error-403
      else if e.id == 1000 => ldcvmgr.toggle \auth-required
      else if e.id == 1007 => ldcvmgr.toggle \server-down
      else error!(e)
    .then -> ctrl.render!

ldc.app \adminGuard
