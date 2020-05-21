
({sdbAdapter}) <- ldc.register \adminStage, <[sdbAdapter]>, _

Ctrl = (opt) !->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @obj = obj = {idx: \default, cfg: null}

  update-data = ~> @ops-out ~> @obj.cfg
  is-valid = (n) ->
    return n and (!~[v.name for k,v of obj.cfg.stage].indexOf(n) or obj.cfg.stage[obj.idx].name == n)

  view-config = {root, init: {}, handler: {}, action: {click: {}, input: {}}, init-render: false}
  view-config.action.input <<< do
    "stage-name": ({node}) ->
      name = (node.value or '').trim!
      invalid = !(is-valid name)

      [v.name for k,v of obj.cfg.stage].indexOf(name)

      node.classList.toggle \is-invalid, invalid
      if invalid => return
      obj.cfg.stage[obj.idx].name = node.value
      update-data!
      view.render!
  view-config.action.click <<< do
    stages: ({node, evt}) ->
      n = evt.target
      if !(type = n.getAttribute(\data-type)) => return
      if type == \new-stage =>
        key = Math.random!toString(36)substring(2)
        obj.cfg.stage[key] = {name: "新階段", key, desc: "自訂時段", config: {} }
        update-data!
      else obj.idx = n.getAttribute(\data-key)
      view.render!
    "delete-stage": ({node, evt}) ->
      if obj.idx == \default => return
      delete obj.cfg.stage[obj.idx]
      obj.idx = [k for k of obj.cfg.stage].0 or \default
      update-data!
      view.render!

  view-config.handler <<< do
    "default-view": ({node}) -> node.classList.toggle \d-none, obj.idx != \default
    "custom-view": ({node}) -> node.classList.toggle \d-none, obj.idx == \default
    "stage-name": ({node}) ->
      node.value = obj.cfg.stage[obj.idx].name or \預設
      name = (node.value or '').trim!
      node.classList.toggle \is-invalid, !(is-valid name)
    stage: do
      list: -> [v for k,v of obj.cfg.stage]
      handler: ({node, data, idx}) ->
        key = data.key or \default
        n = ld$.find(node, 'a',0)
          ..innerText = data.name or '預設'
          ..classList.toggle \active, (key == obj.idx)
          ..setAttribute \data-key, key
          ..setAttribute \data-type, \tab

  view-config.action.input <<< do
    time: ({node}) ->
      obj.cfg.stage[obj.idx][node.getAttribute(\data-name)] = node.value
      update-data!
  view-config.init <<< do
    time: ({node}) -> tail.DateTime(node)
  view-config.handler <<< do
    time: ({node}) -> node.value = obj.cfg.stage[obj.idx][node.getAttribute(\data-name)] or ''

  view-config.action.click <<< do
    switch: ({node}) ->
      node.classList.toggle \on
      c = obj.cfg.stage[obj.idx].{}config
      if !c => return
      c[node.getAttribute(\data-name)] = node.classList.contains(\on)
      update-data!
  view-config.handler <<< do
    switch: ({node}) ->
      node.classList.toggle \on, !!obj.cfg.stage[obj.idx].{}config[node.getAttribute(\data-name)]

  @view = view = new ldView view-config

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    @obj.cfg = JSON.parse(JSON.stringify(data or {}))
    @obj.cfg.{}stage.{}default
    if !@obj.cfg.stage[@obj.idx] => @obj.idx = [k for k of @obj.cfg.stage].0 or \default
    @view.render!

return Ctrl
