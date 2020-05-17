
folder-data = [
  #{name: "活動辦法", url: "/about"}
  #{name: "關於我們"}
  {name: "歷屆活動", toggle: true, children: [ {name: "2018春季"}, {name: "2018秋季"} ]}
  #{name: "成果報告"}
]

backup = JSON.parse(JSON.stringify(folder-data))
apply = (ops) ->
  console.log JSON.stringify(ops), JSON.stringify(backup)
  otJson0.type.apply backup, ops
  console.log "result: ", JSON.stringify(backup)

root = ld$.find \#root, 0
item-sample = ld$.find \#item-sample, 0
folder-sample = ld$.find \#folder-sample, 0
item-sample.removeAttribute \id
folder-sample.removeAttribute \id


render = (data, root) ->
  data.map (item) ->
    item-node = item-sample.cloneNode true
    ld$.find(item-node, '[name=name]',0).value = item.name or ''
    ld$.find(item-node, '[name=url]',0).value = item.url or ''
    item-node.data = item
    if item.children =>
      item-node.classList.add \folder-toggle
      item-node.removeAttribute \draggable
      folder-node = folder-sample.cloneNode true
      folder-node.data = item
      folder-node.insertBefore item-node, folder-node.childNodes.0
      root.appendChild folder-node
      render item.children, ld$.find(folder-node, '.folder-menu', 0)
    else root.appendChild item-node

render folder-data, root

path = (node) ->
  path = []
  while true
    pdata = host(node).data
    list = pdata.children or pdata
    idx = list.indexOf(node.data)
    path = (if pdata.children => <[children]> else []) ++ [idx] ++ path
    while node =>
      node = node.parentNode
      if node == root or node.data => break
    if !node or !node.data => break
  return path

host = (n) ->
  while n =>
    n = n.parentNode
    if n == root or !n or n.data => break
  return {node: n, data: if n and n.data => n.data else folder-data}

root.addEventListener \input, (e) -> 
  if !((n = e.target) and n.getAttribute) => return
  {node,data} = host(n)
  [k,v] = [n.getAttribute(\name), n.value]
  o = data[k]
  data[k] = v
  ops = [{p: (path(node) ++ [k]), oi: v} <<< (if o => {od: o} else {}) ]
  console.log ops
  apply ops


rebind = (node, data) ->
  node.data = data
  if node.classList.contains \folder =>
    Array.from(ld$.find(node, '.folder-menu', 0).childNodes).map (d,i) -> rebind(d, data.children[i])


reb = new reblock do
  root: \#root
  action: do
    beforeMoveNode: ({src, des, ib}) ->
      p = path(src)
      pdata = host(src).data
      pdata = pdata.children or pdata
      pdata.splice pdata.indexOf(src), 1
      ops = [{p, ld: src.data}]
      console.log ")", p, src.data
      apply(ops)
    afterMoveNode: ({src, des, ib}) ->
      {node,data} = host(src)
      console.log data
      idx = (if ib => Array.from(des.childNodes).indexOf(ib) else des.childNodes.length)
      console.log idx
      (data.children or data).splice idx, 0, src.data
      p = path(src)
      p[* - 1] = idx
      ops = [{p, li: src.data}]
      apply(ops)

    clone: ({node, src}) ->
      data = JSON.parse(JSON.stringify(src.data))
      rebind(node, data)
      p = path(src)
      p[* - 1] += 1
      pdata = host(node).data
      (pdata.children or pdata).splice p[* - 1], 0, data
      node.data = data
      ops = [{p, li: data}]
      apply ops

    delete: ({node}) ->
      pdata = host(node).data
      p = path(node)
      list = pdata.children or pdata
      idx = list.indexOf(node.data)
      list.splice idx, 1
      ops = [{p, ld: node.data}]
      apply ops

    input: ->
    beforeMove: (src, des) ->
      # for folder structure move around
      if des.classList.contains \folder => return null # dont move 
      while des =>
        if !des.parentNode.classList => return null
        if des.classList.contains \folder-toggle =>
          if src == des.parentNode => return null
          if n = ld$.find(des.parentNode, '.folder-menu', 0) =>
            n.insertBefore (des = document.createElement \div), n.childNodes.0
            des.dummy = true
            break
        if des.parentNode.classList.contains \folder-menu or des.parentNode.classList.contains \folder-root => break
        if des.parentNode == src.parentNode => break; else des = des.parentNode
      if !des or src == des or ld$.parent(des, null, src) => 
        if des.dummy => des.parentNode.removeChild des
        return null
      return des
    moving: (src, des, dir) ->
      if dir == 0 and des.dummy =>
        d = des
        des = des.parentNode.parentNode
        d.parentNode.removeChild d
      return des
    afterMove: (src, des, dir) ->
      if des.dummy => des.parentNode.removeChild des

root = (ld$.find \#root, 0)
root.addEventListener \click, (e) ->
  if !e.target.classList => return
  if !(n = ld$.parent e.target, '.folder-item', root) => return
  if e.target.classList.contains(\i-close) =>
    if n.parentNode.classList.contains \folder => n = n.parentNode
    reb.select n
    reb.delete!

  else if e.target.classList.contains(\i-clone) =>
    if n.parentNode.classList.contains \folder => n = n.parentNode
    reb.select n
    reb.clone!
    if n.classList.contains \folder => new ldui.Folder root: n

  else if e.target.classList.contains(\i-radio) =>
    if n.classList.contains(\folder-toggle) =>
      n.classList.remove \folder-toggle
      n.setAttribute \draggable, true
      f = n.parentNode

      old = JSON.parse(JSON.stringify(folder-data))
      n.data = f.data
      pdata = host(f).data
      list = (pdata.children or pdata)
      idx = list.indexOf(n.data) + 1
      list.splice.apply list, [idx, 0] ++ n.data.children
      delete n.data.children
      delete n.data.toggle
      ops = json0-ot-diff old, folder-data
      apply ops

      fp = f.parentNode
      fn = f.nextSibling
      m = ld$.find(f, '.folder-menu',0)
      ms = ld$.find(f, '.folder-menu > .folder-item')
      ms.map ->
        it.parentNode.removeChild it
        fp.insertBefore it, fn
      m.parentNode.removeChild m
      f.removeChild n
      fp.insertBefore n, f
      fp.removeChild f

    else
      n.classList.add \folder-toggle
      f = ld$.create name: \div, className: <[folder show]>, attr: {draggable: "true"}
      m = ld$.create name: \div, className: <[folder-menu]>
      n.removeAttribute \draggable
      n.parentNode.insertBefore f, n
      n.parentNode.removeChild(n)
      f.appendChild n
      f.appendChild m
      new ldui.Folder root: f


reb.init!

