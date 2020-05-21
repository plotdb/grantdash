
({sdbAdapter}) <- ldc.register \adminStage, <[sdbAdapter]>, _

Ctrl = (opt) !->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @obj = obj = {idx: \default, cfg: null}

  @update-view = update-view = ~>
    @view.render!
    update-view-stage!now!
  update-view-stage = debounce ~>
    if @reb.node.dragging => update-view-stage!
    else @view-stage.render!
  update-data = ~> @ops-out ~>
    console.log "send: ", JSON.stringify( @obj.cfg )
    s = {}
    for k in @obj.cfg.order => s[k] = @obj.cfg.stage[k]
    return {}
    @obj.cfg = {stage: []}
    
    @obj.cfg
  is-valid = (n) ->
    if !n => return false
    if stage.get!name == n => return true
    if ~[v.name for k,v of obj.cfg.stage].indexOf(n) => return false
    return true
  #return n and (!~[v.name for k,v of obj.cfg.stage].indexOf(n) or obj.cfg.stage[obj.idx].name == n)

  @stage = stage = do
    order: null
    list: ->
      ret = @order.map -> obj.cfg.stage[it]
      console.log "get list: ", ret
      ret
    key: \default
    init: ->
      if !@get! => @key = \default
      @order = if obj.cfg.order => that else obj.cfg.order = [k for k,v of obj.cfg.stage]
      @order = @order.filter -> obj.cfg.stage[it]
      console.log "get order: ", @order
    is: -> it == @key
    is-default: -> return @key == \default
    insertBefore: (a,b) ->
      @order.splice @order.indexOf(a), 1
      @order.splice (if b => @order.indexOf(b) else @order.length), 0, a
      obj.cfg.order = @order
      console.log "new order: ", @order
      update-data!
    get: (n) -> obj.cfg.stage[if n? => n else @key]
    add: (o) ->
      if o.key in @order => return
      obj.cfg.stage[o.key] = o
      @order.push o.key
      @key = o.key
    del: (n) ->
      n = if n? => n else @key
      if n == \default => return
      delete obj.cfg.stage[n]
      @order.splice @order.indexOf(n), 1

      if n == @key => @key = [k for k of obj.cfg.stage].0 or \default
    val: ({name,value,key}) -> 
      if !(o = obj.cfg.stage[if key? => key else @key]) => return
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
      update-data!
      update-view!
  view-config.init <<< do
    stages: ({node, evt}) ~>
      @reb = reb = new reblock root: node, action: do
        beforeMoveNode: ({src, des, ib}) -> 
        afterMoveNode: ({src, des, ib}) ->
          stage.insertBefore (src._data.key or \default), (if ib => ib._data.key else null)
  view-config.action.click <<< do
    stages: ({node, evt}) ->
      n = evt.target
      if !(type = n.getAttribute(\data-type)) => return
      if type == \new-stage =>
        key = Math.random!toString(36)substring(2)
        stage.add {name: "新階段", key, desc: "自訂時段", config: {} }
        update-data!
      else stage.use n.getAttribute(\data-key)
      update-view!
    "delete-stage": ({node, evt}) ->
      stage.del!
      update-data!
      update-view!

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
      update-data!
  view-config.init <<< do
    time: ({node}) -> tail.DateTime(node)
  view-config.handler <<< do
    time: ({node}) -> node.value = stage.val(name: node.getAttribute(\data-name)) or ''

  view-config.action.click <<< do
    switch: ({node}) ->
      node.classList.toggle \on
      c = stage.get!config or {}
      c[node.getAttribute(\data-name)] = node.classList.contains(\on)
      update-data!
  view-config.handler <<< do
    switch: ({node}) ->
      c = stage.val({name: \config}) or {}
      node.classList.toggle \on, !!c[node.getAttribute(\data-name)]

  @view = view = new ldView view-config
  @view-stage = new ldView do
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

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    @obj.cfg = JSON.parse(JSON.stringify(data or {}))
    #@obj.cfg.{}stage.{}default
    console.log "receive: ", JSON.stringify(@obj.cfg)
    @stage.init!
    @update-view!

return Ctrl
