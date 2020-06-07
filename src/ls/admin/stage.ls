
({sdbAdapter}) <- ldc.register \adminStage, <[sdbAdapter]>, _

Ctrl = (opt) !->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @obj = obj = {cfg: null, update: ~> @ops-out ~> @obj.cfg}
  @view = view = {}
  @view.update = ~>
    @view.all.render!
    @view.update-stage!now!
  @view.update-stage = debounce 100, ~>
    if @reb.node.dragging => @view.update-stage!
    else @view.stage.render!

  is-valid = (n) ->
    if !n => return false
    if (o = stage.get!) and o.name == n => return true
    if ~obj.cfg.list.map(->it.name).indexOf(n) => return false
    return true

  @stage = stage = do
    list: -> obj.cfg.[]list
    key: \default
    _key: (k) -> k = if k? => k else (@key or \default)
    init: ->
      if !Array.isArray(obj.cfg.list) => obj.cfg.list = [{key: \default}]
    is: (k) -> @_key! == k
    is-default: -> @_key! == \default
    insertBefore: (a,b) ->
      st = obj.cfg.list
      ia = st.map(->it.key).indexOf(a)
      o = st.splice(ia, 1).0
      ib = if b? => st.map(->it.key).indexOf(b) else st.length
      st.splice ib, 0, o
    get: (k) -> obj.cfg.list.filter(~>it.key == @_key(k)).0
    add: (o = {}) ->
      if @get(o.key) => return
      obj.cfg.list.push o
      @key = o.key
    del: (k) ->
     if (k = @_key(k)) == \default => return
     idx = obj.cfg.list.map(->it.key).indexOf(k)
     obj.cfg.list.splice idx, 1
     if k == @key => @key = (obj.cfg.list[* - 1] or {}).key or \default
    val: ({name,value,key}) ->
      key = @_key(key)
      if !(o = obj.cfg.list.filter(->it.key == key)[0]) => return
      return if value? => o[name] = value else o[name]
    use: (k) -> @key = k

  view-config = {root, init: {}, handler: {}, action: {click: {}, input: {}}, init-render: false}
  view-config.action.input <<< do
    "stage-name": ({node}) ->
      name = (node.value or '').trim!
      invalid = !(is-valid name)
      node.classList.toggle \is-invalid, invalid
      if invalid => return
      stage.val name: \name, value: node.value
      obj.update!
      view.update!
  view-config.init <<< do
    stages: ({node, evt}) ~>
      @reb = reb = new reblock name: \stage, root: node, action: do
        beforeMoveNode: ({src, des, ib}) -> 
        afterMoveNode: ({src, des, ib}) ->
          stage.insertBefore (src._data.key or \default), (if ib => ib._data.key else null)
          obj.update!
  view-config.action.click <<< do
    stages: ({node, evt}) ->
      n = evt.target
      if !(type = n.getAttribute(\data-type)) => return
      if type == \new-stage =>
        key = suuid!
        stage.add {name: "新階段", key, desc: "自訂時段", config: {} }
        obj.update!
      else stage.use n.getAttribute(\data-key)
      view.update!
    "delete-stage": ({node, evt}) ->
      stage.del!
      obj.update!
      view.update!

  view-config.handler <<< do
    "default-view": ({node}) -> node.classList.toggle \d-none, !stage.is-default!
    "custom-view": ({node}) -> node.classList.toggle \d-none, stage.is-default!
    "stage-name": ({node}) ->
      node.value = stage.val({name: \name}) or \預設
      name = (node.value or '').trim!
      node.classList.toggle \is-invalid, !(is-valid name)

  view-config.action.input <<< do
    time: ({node}) ->
      stage.val name: node.getAttribute(\data-name), value: node.value
      obj.update!
  view-config.init <<< do
    time: ({node}) -> tail.DateTime(node)
  view-config.handler <<< do
    time: ({node}) -> node.value = stage.val(name: node.getAttribute(\data-name)) or ''

  view-config.action.click <<< do
    switch: ({node}) ->
      node.classList.toggle \on
      c = stage.get!.{}config
      c[node.getAttribute(\data-name)] = node.classList.contains(\on)
      obj.update!
  view-config.handler <<< do
    switch: ({node}) ->
      c = stage.val({name: \config}) or {}
      node.classList.toggle \on, !!c[node.getAttribute(\data-name)]

  @view.all = new ldView view-config
  @view.stage = new ldView do
    root: root, init-render: false
    handler: do
      stage: do
        list: -> stage.list!
        handler: ({node, data, idx}) ->
          key = data.key or \default
          n = ld$.find(node, 'a',0)
            ..innerText = data.name or '預設'
            ..classList.toggle \active, stage.is key
            ..setAttribute \data-key, key
            ..setAttribute \data-type, \tab
  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    @obj.cfg = JSON.parse(JSON.stringify(data or {}))
    @stage.init!
    @view.update!

return Ctrl
