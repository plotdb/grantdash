(->
  form-data = {blocks: []}
  view = new ldView do
    root: '#menu'
    action: dragstart: blocksrc: ({node, evt}) -> 
      evt.dataTransfer.setData('text/plain',"form-#{node.getAttribute(\data-name)}")
    init: blocksrc: ->

  root = ld$.find('#root',0)
  container = ld$.find(root, '.inner',0)

  bmgr = get: (name) ->
    ret = ld$.find(root, ".sample [data-name=#{name}]", 0).cloneNode(true)
    ret.setAttribute \draggable, true
    type = ld$.find(ret, "[ld=criteria-type]", 0)
    new Dropdown(type)
    op = ld$.find(ret, "[criteria-op]", 0)
    Promise.resolve ret
  reb = new reblock do
    root: root, block-manager: bmgr, data: form-data
    action: do
      inject: ({parent, node, name, data}) ->
        idx = Array.from(parent.childNodes).indexOf(node)
        form-data.blocks.splice idx, 0, (data = (data or {name}))
        node.block-data = data
        render-criteria node
      input: ({node}) ->
        n = node
        while n =>
          if n.block-data => break
          n = n.parentNode
        if !(data = n.block-data) => return
        name = node.getAttribute(\editable)
        data.{}data[name] = (node.innerText or node.value or '')
        console.log data
      clone: ({node}) ->
        if node.previousSibling.block-data =>
          idx = Array.from(node.parentNode).indexOf(node)
          form-data.blocks.splice idx, 0, JSON.parse(JSON.stringify(node.previousSibling.block-data))
        console.log form-data
      delete: ({node}) ->
        if node.block-data =>
          form-data.blocks.splice Array.from(node.parentNode).indexOf(node), 1
        console.log form-data

      move: ({src, des, origin}) ->

  criteria-config = do
    types: 
      'form-short-answer': <[number string length regex]>
      'form-long-answer': <[string length regex]>
      'form-radio': []
      'form-checkbox': <[count]>
      'form-file': <[file-size file-formt file-count]>
      'budget': <[count]>
      'checkpoint': <[count]>

  render-criteria = (block) ->
    data = block.block-data
    type = data.{}config.{}criteria.type
    available-types = criteria-config.types[data.name]
    if !(type in available-types) => type = available-types.0
    type-node = ld$.find(block, '[ld=criteria-type]', 0)
    type-toggler = ld$.find(type-node, '.dropdown-toggle', 0)
    ld$.find(type-node, '.dropdown-item').map ->
      it.classList.toggle \d-none, !(it.getAttribute(\data-criteria-type) in available-types)
    item = ld$.find(type-node, ".dropdown-item[data-criteria-type=#{type}]",0)
    type-toggler.innerText = item.innerText
    ops-node = ld$.find(block, '[ld=criteria-op]', 0)
    ops-type = (item.getAttribute(\data-ops) or type)
    console.log ops-type
    ops-dropdown = ld$.find(ops-node, '.dropdown',0)
    if !ops-dropdown or (ops-dropdown.getAttribute("data-criteria-ops") != ops-type) => 
      ops-dropdown = ld$.find(root, "[data-criteria-ops=#ops-type]",0)
      ops-node.innerHTML = ""
      ops-node.appendChild(ops-dropdown = ops-dropdown.cloneNode(true))
      new Dropdown(ops-dropdown)
    console.log ops-dropdown
    op = data.{}config.{}criteria.op or ld$.find(ops-dropdown, '.dropdown-item', 0).getAttribute(\data-op)
    item = ld$.find(ops-node, ".dropdown-item[data-op=#{op}]",0)
    if !item =>
      op = ld$.find(ops-dropdown, '.dropdown-item', 0).getAttribute(\data-op)
      item = ld$.find(ops-node, ".dropdown-item[data-op=#{op}]",0)
    op-toggler = ld$.find(ops-dropdown, '.dropdown-toggle', 0)
    op-toggler.innerText = item.innerText
    data.config.criteria <<< {op, type}

  get-block = (node) ->
    while node =>
      if node.block-data => break
      node = node.parentNode
    if !(node and node.block-data) => return
    return node


  root.addEventListener \click, (e) ->
    if !(node = e.target) or !node.getAttribute or !node.classList => return
    if !(block = get-block node) => return
    block-data = block.block-data
    if node.classList.contains \switch =>
      node.classList.toggle \on
      name = node.getAttribute(\data-name)
      block-data.{}config[name] = node.classList.contains(\on)
    if node.getAttribute(\data-action) == \delete => reb.select block; reb.delete!
    if node.getAttribute(\data-action) == \clone =>
      reb.inject node: node, data: JSON.parse(JSON.stringify(block-data))

    if node.classList.contains(\dropdown-item) =>
      dropdown = ld$.parent(node, '[ld]') 
      toggler = ld$.find(dropdown, '.dropdown-toggle', 0)
      name = dropdown.getAttribute(\ld)
      console.log name
      if name == \criteria-type
        type = node.getAttribute(\data-criteria-type)
        block.block-data.{}config.{}criteria.type = type
        render-criteria block
      else if name == \criteria-op
        op = node.getAttribute(\data-op)
        block.block-data.{}config.{}criteria.op = op
        console.log 123, op
        render-criteria block

  /*
    if (type = node.getAttribute(\data-criteria-type)) =>
      optype = node.getAttribute(\data-ops) or type
      op = ld$.find(p, '[ld=criteria-op]',0)
      node = ld$.find(root, "[data-criteria-ops=#{optype}]", 0)
      if !node => return
      node = node.cloneNode(true)
      console.log node
      op.innerHTML = ""
      op.appendChild node
      new Dropdown(node)

  set-criteria = ({root, type, optype, op})->
    node = do
      type: ld$.find(root, '[ld=criteria-type]', 0)
      op: ld$.find(root, '[ld=criteria-op]', 0)
    node = ld$.find(root, "[data-criteria-ops=#{optype}]", 0).cloneNode(true)
    node.op.innerHTML = ""
    node.op.appendChild node
    toggle = do
      type: ld$.find(node.type, ".dropdown-toggle", 0)
      op: ld$.find(node.op, ".dropdown-toggle", 0)
    toggle.type.innerText = ld$.find(node.type, "[data-criteria-type=#{type}]", 0).innerText
    toggle.op.innerText = ld$.find(node.op, "[data-op=#{op}]", 0).innerText
  */

  get-criteria = ->

)!
