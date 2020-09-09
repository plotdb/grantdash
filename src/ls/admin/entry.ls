({sdbAdapter}) <- ldc.register \adminEntry, <[sdbAdapter]>, _
Ctrl = (opt) ->
  @opt = opt
  @evt-handler = {}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @obj = obj = {active: null, data: {entries: []}}

  @view = view = new ldView do
    root: root
    action:
      input: do
        "entry-data": ({node, evt}) ~>
          name = node.getAttribute(\data-name)
          if obj.active => obj.active[name] = node.value
          view.render!
          @update!
      click: do
        "delete-entry": ({node, evt}) ~>
          if !~(idx = obj.data.entries.indexOf(obj.active)) => return
          obj.data.entries.splice idx, 1
          obj.active = obj.data.entries[idx] or  obj.data.entries[idx - 1]
          view.render!
          @update!
        "new-entry": ({node, evt}) ~>
          obj.data.lastkey = key = (obj.data.lastkey or 0) + 1
          if !opt.sample => new-data = {name: "新項目", description: "未準備詳細描述的項目"}
          else if typeof(opt.sample) == \function => new-data = opt.sample {key}
          else new-data = JSON.parse(JSON.stringify(opt.sample))
          new-data <<< {key}
          obj.data.entries.push new-data
          obj.active = new-data
          view.render!
          @update!
        switch: ({node}) ~>
          node.classList.toggle \on
          name = node.getAttribute(\data-name)
          if obj.active => obj.active.{}config[name] = node.classList.contains(\on)
          @update!

    handler: do
      switch: ({node}) ->
        name = node.getAttribute(\data-name)
        node.classList.toggle \on, if obj.active => !!obj.active.{}config[name] else false
      "entry-data": ({node}) ->
        name = node.getAttribute(\data-name)
        node.value = (obj.active or {})[name] or ''
      "empty": ({node}) -> node.classList.toggle \d-none, obj.data.entries.length
      entry: do
        list: -> obj.data.entries
        action: click: ({node, data, evt}) ~>
          obj.active = data
          @fire \toggle, obj.active
          view.render!
        handler: ({node, data}) ->
          n = ld$.find(node, '.nav-link', 0)
          n.classList.toggle \active, data == obj.active
          ret = ld$.find(n,'[ld=entry-text]').map -> it.innerText = data[it.getAttribute(\data-name)] or ''
          if ret.length == 0 => n.innerText = data.name

  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
  update: -> @ops-out ~> @obj.data
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    if @obj.data => idx = @obj.data.entries.indexOf(@obj.active)
    @obj.data = JSON.parse(JSON.stringify(data or {}))
    @obj.active = @obj.data.[]entries[if !~idx => 0 else idx] or {}
    @fire \toggle, @obj.active
    @view.render!

return Ctrl
