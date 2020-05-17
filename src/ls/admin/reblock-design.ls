

# bind & find - 資料與元素間的 mapping. 
#  - binding 應在建立元素時發生.
#  - 可以利用 node.getAttribute('rbid'), node.reblock.id, subnode 或 data.id 找到這個 binding. 
#  - binding 中儲存:
#    - data: 資料
#    - node: 元素
#    - block: boolean, true if this is a binding between block node and block reData
#    - host: owner of this data and node
reblock-design = do


  apply: (ops) ->
    ot-json0.type.apply @data, ops.0

  submit: (ops) ->
    console.log ops
    console.log @data
  watch: (ops) ->

  get-host: (v) ->
    if typeof(v) == \string => v = (@get-bind(v) or {}).node
    for i from 0 til 100 
      if !v => return null
      bind = @get-bind(v)
      if bind =>
        if bind.block => return bind
        if bind.host => return bind.host
      v = v.parentNode

  get-bind: (v) ->
    if typeof(v) == \string => return @binding[v]
    else if v.reblock => return @binding[v.reblock.id]
    return null

  bind: ({node, data, block}) ->
    # TODO use uuid?
    id = if node.reblock and node.reblock.id => id else data.id or Math.random!toString(36).substring(2)
    if !data.id => data.id = id
    host = @get-host(node.parentNode)
    @binding[data.id] = {node, data, host, block}
    if node.setAttribute => node.setAttribute \rbid, data.id # TODO naming
    node.{}reblock.id = data.id

  inject: ({host, sibling, dir, name, data, recurse, block}) ->
    if !data => data = {type: \block, name: name, data: {}}
    if !name => name = data.name
    if sibling =>
      if !host => host = ld$.parent(sibling, '[editable]')
      ns = ld$.parent(sibling, '[editable] > *', host)
    retval = {data}
    new Promise (res, rej) ~>
      if data.type != \block => return rej new Error("incorrect data type")
      promise = if !name => # no name block resolve to a single div.
        Promise.resolve("""<div editable="blocks"></div>""")
      else if /^int:/.exec(name) => # internal block
        Promise.resolve(block.subblock[name])
      else @blockmgr.get(name)

      promise
        .then (block-data) ~>
          if typeof(block-data) == \string => 
            retval.node = node = document.createElement("div")
            node.innerHTML = block-data
            # we wrap block only if it contains multiple elements.
            if node.childNodes.length == 1 =>
              node = node.childNodes.0
              node.parentNode.removeChild node
          else if (block-data instanceof Element) => retval.node = node = block-data.cloneNode(true)
          else Promise.reject new Error("unrecognized block data")
          if host => host.insertBefore node, ns

          # transition in
          if !recurse and @opt.transition
            s = window.getComputedStyle(node)
            h = s.height
            node.style
              ..height = "0px"
              ..transition = "height .15s ease-in-out"
            setTimeout (-> node.style.height = h), 0
            debounce 150 .then -> node.style.transition = ""; node.style.height = ""

          @bind({node, data, block: true})
          block = @prepare {node, data}
          @construct {node: node, data: data, block}

          hostbind = @get-host(host)
          # recurse = false if injection is from user, thus we have to inject data too.
          # recurse = true  if injection is from traversing reData tree, thus we dont have to inject data.
          # no host binding found means it's root element and data injection is by init.
          if !recurse and hostbind =>
            idx = Array.from(host.childNodes).indexOf(node)
            hostbind.data.data[][host.getAttribute(\editable)].splice idx, 0, data
        .then -> res retval
        .catch -> rej it

  prepare: ({node, data}) ->
    block = {}
    excludes = ld$.find(node, "[rbid='#{data.id}'] [block] [block]")
    blocks = ld$
      .find(node, "[block]")
      .filter -> !(it in excludes)
      .map ->
        name = it.getAttribute(\block)
        block.{}subblock["int:#name"] = it
        it.parentNode.removeChild it
    return block


  # render DOM, given a root node and corresponding data.
  construct: ({node, data, block, recurse}) -> new Promise (res, rej) ~>

    # find all direct child editable.
    nodes = ld$.find node, "[editable]"
    excludes = ld$.find node, "[rbid='#{data.id}'] [editable] [editable]"
    nodes = nodes.filter -> !(it in excludes)
    vars = data.data
    promises = nodes.map (n) ~>
      name = n.getAttribute \editable
      if !n.getAttribute(\edit-type) => n.innerHTML = "" #debug code
      if !Array.isArray( val = (vars[name] or {})) => val = [val]
      ps = val.map (v) ~>
        if v.type == \text =>
          Promise.resolve(n.appendChild(document.createTextNode(v.value)))
          @bind({node: n, data: v})
        else if v.type == \block =>
          @inject {host: n, data: v, recurse: true, block}
        #else Promise.reject(new Error("unrecognized reData"))
      Promise.all(ps)

    Promise.all(promises)
      .then -> res!
      .then -> rej!

