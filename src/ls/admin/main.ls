(->
  ldc.register \adminGuard,
  <[auth loader adminPanel sdbAdapter adminInfo]>,
  ({auth, loader, admin-panel, sdbAdapter, admin-info}) ->
    loader.on!
    auth.ensure!
      .then ->
        [path,type,slug] = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) or []
        hint = {} <<< (if type => (if type == \o => {org: slug} else {brd: slug}) else {})
        ld$.fetch '/d/toc/', {method: \POST}, {json: hint, type: \json}
          .catch -> lda.ldcvmgr.lock \create-brd-now
          .then (toc) -> init toc
          .catch (e) ->
            console.log e
            lda.ldcvmgr.toggle \error
      .catch -> lda.ldcvmgr.toggle \auth-required
    init = (toc) ->
      toc.doc = {}
      <[org brd brds brdsFiltered grps]>.map -> toc[it] = toc[it] or []
      toc.brdsFiltered = toc.brds or []
      console.log toc
      
      sdb toc
        .then (sdb) ->
          menu toc, sdb
          info = new admin-info root: '[ld-scope=brd-info]', type: \brd
          info.adapt {sdb, doc: toc.doc.brd}

    sdb = (toc) ->
      sdb = new sharedb-wrapper do
        url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
      sdb.on \close, ->
        loader.on!
        sdb.reconnect!
          .then -> prepare!
          .then -> loader.off!
      watch = ->
      prepare = ->
        console.log "preparing sharedb documents ... "
        sdb.get {id: "org-#{toc.org.key}", watch}
          .then (doc) -> toc.doc.org = doc
          .then -> sdb.get {id: "brd-#{toc.brd.key}", watch}
          .then (doc) -> toc.doc.brd = doc
          .then -> sdb
          .catch -> ldcvmgr.toggle \error
      prepare!

    menu = (toc, sdb) ->

      set-group = (grp) ->
      search = debounce (val) ->
        toc.brds-filtered = toc.brds.filter -> ~it.name.indexOf(val)
        view.render!
        view.get("brd-list").folder.fit!
      root = ld$.find '[ld-scope=admin-menu]', 0
      view = new ldView do
        root: root
        action: do
          click: do
            "brd-bar": ({node}) ->
              ret = view.get("brd-list").folder.toggle!
              view.render \brd-list-toggle
            "grp-add": ({node}) ->
              for i from 0 til 100 =>
                key = "grp-#{Math.random!toString(36)substring(2)}"
                if !toc.grps[key] => break
              if toc.grps[key] => throw new ldError(1011)
              toc.grps[key] = {key, name: "新分組"}
              view.render 'grp-entry'
              notify!now!

          input: do
            "brd-search": ({node}) -> search node.value
        text: do
          "org-name": -> toc.org.name
          "brd-name": -> toc.brd.name
          "brd-progress-text": -> "活動進行中"
        init: do
          "folder": ({node}) -> node.folder = new ldui.Folder root: node
        handler: do
          "org-menu": ({node}) -> node.classList.toggle \d-none, !toc.org.key
          "brd-progress": ({node}) -> node.classList.toggle \text-success, true
          "brd-list-toggle": ({node}) ->
            if view => node.classList.toggle \on, view.get("brd-list").classList.contains("show")
          # if brd picked
          "brd": ({node}) ->
            node.classList.toggle \d-none, (!toc.brd.key xor ~node.getAttribute(\ld).indexOf(\empty))
          # if any brds
          "brds": ({node}) ->
            node.classList.toggle \d-none, (!toc.brds.length xor ~node.getAttribute(\ld).indexOf(\empty))
          "brd-entry": do
            list: -> toc.brds-filtered
            action: click: ({node, data}) ->
              toc.brd = data
              view.render!
            handler: ({node, data}) ->
              ld$.find(node, 'span',0).innerText = data.name
              ld$.find(node, '.text-sm',0).innerText = data.description
          "grp-entry": do
            list: -> [v for k,v of (toc.grps or {})]
            init: ({node,data}) ->
              node.folder = new ldui.Folder root: node
              node.view = new ldView do
                root: node
                handler: name: ({node}) -> node.innerText = data.name
                action: click: "nav-tab": ({node}) -> set-group data
            handler: ({node, data}) -> node.view.render 'name'

      loader.off!

      adapter = new sdbAdapter path: <[group]>
      adapter.on \change, ({ops, source}) ->
        if source => return
        toc.grps = if adapter.data => JSON.parse(JSON.stringify(adapter.data)) else {}
        if !toc.grps => toc.grps = {}
        view.render!
      notify = debounce 500, -> adapter.update -> JSON.parse(JSON.stringify(toc.grps))
      adapter.init {doc: toc.doc.brd, sdb: sdb}


  ldc.app \adminGuard
)!
