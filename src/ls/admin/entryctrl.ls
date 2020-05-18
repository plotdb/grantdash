(->
  ldc.register \entryctrl, <[]>, ->
    prepare = (ctrl-opt) ->
      lc = do
        active: {}
        obj: {entries: []}

      view = new ldView do
        root: ctrl-opt.root
        action:
          input: do
            "entry-data": ({node, evt}) ->
              name = node.getAttribute(\data-name)
              lc.{}active[name] = node.value
              view.render!
          click: do
            "delete-entry": ({node, evt}) ->
              if !~(idx = lc.obj.entries.indexOf(lc.active)) => return
              lc.obj.entries.splice idx, 1
              lc.active = lc.obj.entries[idx] or  lc.obj.entries[idx - 1]
              view.render!
            "new-entry": ({node, evt}) ->
              lc.obj.entries.push (new-data = {name: "新項目", description: "未準備詳細描述的項目"})
              lc.active = new-data
              view.render!
        handler: do
          "entry-data": ({node}) ->
            name = node.getAttribute(\data-name)
            node.value = (lc.active or {})[name] or ''
          "empty": ({node}) -> node.classList.toggle \d-none, lc.obj.entries.length
          entry: do
            list: -> lc.obj.entries
            action: click: ({node, data, evt}) ->
              lc.active = data
              view.render!
            handler: ({node, data}) ->
              n = ld$.find(node, '.nav-link', 0)
              n.classList.toggle \active, data == lc.active
              ret = ld$.find(n,'[ld=entry-text]').map -> it.innerText = data[it.getAttribute(\data-name)] or ''
              if ret.length == 0 => n.innerText = data.name


      adopter = new Adopter path: ctrl-opt.path
      adopter.on \change, ({ops, source}) ->
        if source => return
        lc.obj = if adopter.data => JSON.parse(JSON.stringify(adopter.data)) else {}
        if !lc.obj.entries => lc.obj.entries = []
        update-view!
      update-data-debounced = debounce 500, -> update-data!
      update-data = (deb) ->
        if deb => update-data-debounced!
        else adopter.update -> JSON.parse(JSON.stringify(lc.obj))

      return adopter
    return {prepare}
)!
