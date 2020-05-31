({sdbAdapter, loader}) <- ldc.register \adminMenu, <[sdbAdapter loader]>, _

Ctrl = (opt) ->
  @opt = opt
  @toc = toc = opt.toc
  @grps = []
  update = debounce 500, ~> @ops-out ~> @grps
  set-group = (grp) -> opt.set-group grp
  search = debounce (val) ->
    toc.brds-filtered = toc.brds.filter -> ~it.name.indexOf(val)
    view.render!
    view.get("brd-list").folder.fit!
  root = ld$.find '[ld-scope=admin-menu]', 0
  @view = view = new ldView do
    root: root
    action: do
      click: do
        "brd-bar": ({node}) ->
          ret = view.get("brd-list").folder.toggle!
          view.render \brd-list-toggle
        "grp-add": ({node}) ~>
          for i from 0 til 100 =>
            key = suuid!
            if !@grps.filter(->it.key == key).length => break
          if @grps.filter(->it.key == key).length => throw new ldError(1011)
          @grps.push {key, info: {name: "新分組"}}
          view.render 'grp-entry'
          update!now!

      input: do
        "brd-search": ({node}) -> search node.value
    text: do
      "org-name": -> toc.org.name
      "brd-name": -> toc.brd.name
      "brd-progress-text": -> "活動進行中"
    init: do
      "folder": ({node,names}) ->
        node.folder = new ldui.Folder root: node
        if !toc.brd.key and ("brd-list" in names) => node.folder.toggle true
    handler: do
      "brd-landing": ({node}) -> node.setAttribute \href, "/brd/#{toc.brd.slug}/"
      "org-menu": ({node}) -> node.classList.toggle \d-none, !toc.org.slug
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
        handler: ({node, data}) ->
          ld$.find(node, 'span',0).innerText = data.name
          ld$.find(node, '.text-sm',0).innerText = data.description.substring(0,30) + "..."
          node.setAttribute \href, "/b/#{data.slug}/admin"
      "grp-entry": do
        key: -> it.key
        list: ~> @grps or []
        init: ({node,data}) ->
          node.data = data
          root = node
          node.folder = new ldui.Folder root: node
          node.view = new ldView do
            root: node
            handler: name: ({node}) -> node.innerText = root.data.{}info.name or '新分組'
            action: click: "nav-tab": ({node}) -> set-group data

        handler: ({node, data}) ->
          node.data = data
          node.view.render 'name'
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    @grps = JSON.parse JSON.stringify(data or [])
    if !Array.isArray(data) => @grps = []
    @view.render!

return Ctrl
