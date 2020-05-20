(->
  ldc.register \adminGuard, <[auth loader]>, ({auth, loader}) ->
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
      toc.org = toc.org or {}
      toc.brd = toc.brd or {}
      toc.brds = toc.brds or []
      toc.brds-filtered = toc.brds or []
      toc.grps = [{name: "分組#i", key: i} for i from 1 til 4]

      set-group = (grp) ->
      search = debounce (val) ->
        toc.brds-filtered = toc.brds.filter -> ~it.name.indexOf(val)
        view.render!
        view.get("brd-list").folder.fit!

      console.log toc
      root = ld$.find '[ld-scope=admin-menu]', 0
      view = new ldView do
        root: root
        action: do
          click: do
            brd: ({node}) ->
              ret = view.get("brd-list").folder.toggle!
              view.render \brd-list-toggle
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
            list: -> toc.grps or []
            init: ({node,data}) ->
              node.folder = new ldui.Folder root: node
              node.view = new ldView do
                root: node
                handler: name: ({node}) -> node.innerText = data.name
                action: click: "nav-tab": ({node}) -> set-group data
            handler: ({node, data}) -> node.view.render 'name'



      loader.off!


  ldc.app \adminGuard
)!
