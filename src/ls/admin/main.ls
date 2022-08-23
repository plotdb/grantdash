ldc.register \adminGuard,
<[navtop ldcvmgr auth loader sdbAdapter error
adminMenu adminPanel adminInfo adminStage adminPerm adminNavbar
adminPrjList prjForm adminEntry adminWelcome adminPage adminBrdExport
adminPrjDetail adminPostList adminJudgePerm adminJudgeCriteria adminJudgePrimary adminJudgeFinal adminDev
adminJudgeCustom]>,
({navtop, ldcvmgr, auth, loader, sdbAdapter, error,
admin-menu, admin-panel, admin-info, admin-stage, admin-perm, admin-navbar,
admin-prj-list, prj-form, admin-entry, admin-welcome, admin-page, admin-brd-export, admin-prj-detail,
admin-post-list, admin-judge-perm, admin-judge-criteria, admin-judge-primary, admin-judge-final,
adminDev, adminJudgeCustom}) ->

  Ctrl = ->
    @loader = loader
    @hubs = null
    @ctrl = {org: {}, brd: {}, grp: {}, prj: {}}

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
      [path,type,slug] = /^\/(?:dash\/)?([^/]+)\/([^/]+)\/admin/.exec(window.location.pathname) or []
      if !type in <[org brd]> => return Promise.reject new ldError 1015
      hint = {}; hint[type] = slug
      console.log "fetch auth data ..."
      auth.fetch!
        .catch (e) -> Promise.reject new ldError({id: 1007, e})
        .then (g) ~>
          if !g.user.key => return Promise.reject new ldError({id: 1000})
          console.log "fetch toc information ... "
          ld$.fetch '/dash/api/toc/', {method: \POST}, {json: hint, type: \json}
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
        path: '/dash/ws'
      @hubs = org: new Hub({sdb}), brd: new Hub({sdb})
      sdb.on \error, -> ldcvmgr.toggle \not-sync
      sdb.on \close, ~>
        ldcvmgr.toggle \offline-retry, true
        sdb.reconnect!
          .then ~> @getdoc!
          .then ~> @adapt!
          .then -> console.log "admin initialized."
          .then ~> ldcvmgr.toggle \offline-retry, false
      @sdb.ready!

    getdoc: ->
      Promise.resolve!
        .then ~>
          read = (n) ~> new Promise (res, rej) ~>
            if !@toc[n].key => return res!
            console.log "prepare #n document ( id: #{n}/#{@toc[n]slug} ) ..."
            @hubs[n]doc = null
            @sdb.get({
              id: "#{n}/#{@toc[n]slug}"
              watch: (ops,source) ~> @hubs[n]fire \change, {ops,source}
              create: ~> @toc[n]detail
            }).then((doc) ~>
              if !(@hubs[n]doc = doc) => return rej!
              doc.on \op, ~> @render!
              res!
            ).catch -> console.log "getdoc #n failed.", it
            @hubs[n]doc
          # TODO if no org but brd -> clear org and let it edit brd.
          # vice versa
          Promise.all [read(\org), read(\brd)]
        .then ~> if !(@hubs.org.doc or @hubs.brd.doc) => return Promise.reject(new ldError(1012))
        .then ~> @render!

    set-group: (v, force-adapt = false) ->
      idx = 0
      @grp = v
      @hubs.brd.doc.data.group.map (d,i) -> if d.key == v.key => idx := i
      (k) <~ [k for k of @ctrl.grp].map _
      if @ctrl.grp[k].set-data => @ctrl.grp[k].set-data @grp
      if !@ctrl.grp[k].adapt => return
      p = ['group', idx]
      p = p ++ (if @ctrl.grp[k].path => that else [k])
      if !@ctrl.grp[k].adapted! or force-adapt => @ctrl.grp[k].adapt {hub: @hubs.brd, path: p}
      else @ctrl.grp[k].set-path p

    adapt: ->
      {org,brd} = @hubs
      @ctrl.dev.adapt {hub: brd, path: <[]>}
      @ctrl.org
        ..info.adapt {hub: org, path: <[info]> }
        ..navbar.adapt {hub: org, path: <[page navbar]>}
        ..perm.adapt   {hub: org, path: <[perm]>}
        ..page.adapt {hub: org, path: <[page info]>}
      @ctrl.brd
        ..info.adapt   {hub: brd, path: <[info]> }
        ..group.adapt   {hub: brd, path: <[group]>, type: \array}
        ..stage.adapt  {hub: brd, path: <[stage]>}
        ..perm.adapt   {hub: brd, path: <[perm]>}
        ..navbar.adapt {hub: brd, path: <[page navbar]>}
        ..page.adapt {hub: brd, path: <[page info]>}
        ..export.adapt {hub: brd, path: <[export]> }
      @ctrl.grp.list.set-hub {brd}
      if @grp => @set-group that, true

    init-ctrl: ->
      {org,brd} = @hubs
      set-group = ~> @set-group it
      toc = @toc
      delete-group = ~>
        @ctrl.brd.group.delete-group it
      clone-group = ~>
        @ctrl.brd.group.clone-group it

      @ctrl.dev = new admin-dev {}
      @ctrl.welcome = new admin-welcome {root: '[ld-scope=admin-welcome]', toc}
      @ctrl.posts = new admin-post-list {root: '[ld-scope=admin-post-list]', brd: toc.brd}

      @ctrl.org
        ..info = new admin-info {root: '[ld-scope=org-info]', type: \org, data: toc.org, toc}
        ..navbar = new admin-navbar {toc, root: '[data-name=org-navbar] [ld-scope=navbar-editor]'}
        ..perm = new admin-perm {toc, root: '[data-nav=org-config] [ld-scope=perm-panel]', org: toc.org}
        ..page = new admin-page {toc, type: \org, root: '[data-name=org-page-info] [ld-scope=page-info]'}

      @ctrl.brd
        ..info = new admin-info {root: '[ld-scope=brd-info]', type: \brd, data: toc.brd, toc}
        ..group = new admin-menu {toc: @toc, set-group}
        ..stage = new admin-stage {toc, root: '[ld-scope=brd-stage]'}
        ..perm = new admin-perm {toc, root: '[data-nav=brd-config] [ld-scope=perm-panel]', brd: toc.brd}
        ..navbar = new admin-navbar {toc, root: '[data-name=brd-navbar] [ld-scope=navbar-editor]'}
        ..page = new admin-page {toc, type: \brd, root: '[data-name=brd-page-info] [ld-scope=page-info]'}
        ..export = new admin-brd-export {root: '[ld-scope=brd-export]', toc}

      @ctrl.grp
        ..form = new prj-form {toc, root: '[ld-scope=grp-form]', view-mode: false}
        ..info = new admin-info {root: '[ld-scope=grp-info-panel]', type: \grp, set-group, delete-group, clone-group}
        #..perm = new admin-perm {toc, root: '[data-nav=grp-config] [ld-scope=perm-panel]', brd: toc.brd}
        ..grade = new admin-entry {root: '[ld-scope=grade-panel]'}
        ..criteria = new admin-entry {root: '[ld-scope=criteria-panel]'}
        ..list = new admin-prj-list {root: '[ld-scope=prj-list]', toc}
        ..judgePerm = new admin-judge-perm {root: '[ld-scope=judge-perm]', toc, brd: toc.brd}
        ..judgeCriteria = new admin-judge-criteria {root: '[ld-scope=judge-criteria]', toc, brd: toc.brd, path:<[judge criteria]>}
        ..judgePrimary = new admin-judge-primary {root: '[ld-scope=judge-primary]', toc, brd: toc.brd, path: <[judge primary]>}
        ..judgeFinal = new admin-judge-final {root: '[ld-scope=judge-final]', toc, brd: toc.brd, path: <[judge final]>}
        ..judgeCustom = new admin-judge-custom {root: '[ld-scope=judge-custom]', toc, brd: toc.brd, path: <[judge custom]>}

      @ctrl.prj
        ..main = new admin-prj-detail {root: '[ld-scope=prj-detail]'}

      @ctrl.grp.list.on \set-prj, ~> @ctrl.prj.main.set-prj it

    publish: ->
      ldcvmgr.toggle \publishing, true
      Promise.resolve!
        .then ~>
          ps = <[brd org]>.map (type) ~>
            if !(@toc[type]key and @modify[type]dirty) => return Promise.resolve!
            payload = @hubs[type]doc.data
            auth.recaptcha.get!
              .then (recaptcha) ~>
                json = {payload, slug: @toc[type]slug, type, recaptcha}
                ld$.fetch \/dash/api/detail/, {method: \PUT}, {json, type: \json}
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
    .then -> ctrl.adapt!
    .then -> console.log "admin initialized."
    .finally -> loader.off!
    .catch (e) ->
      console.log "[Admin Error] Code: ", (if e => e.id else e)
      console.log "Error Object: ", ((e and e.e) or e)
      if e.id == 1000 => ldcvmgr.toggle \auth-required
      else if e.id == 1007 => ldcvmgr.toggle \server-down
      else ldcvmgr.toggle \access-denied
      if e.stack => console.log that
    .then -> ctrl.render!

ldc.app \adminGuard
