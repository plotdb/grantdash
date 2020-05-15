(->
  data = do
    type: \block
    name: \form-root
    data: do
      blocks: [
        {
          type: \block
          name: \form-short-answer
          config: do
            required: true
            show-description: true
            validation: [{ type: 'obj', value: { type: 'number', condition: 'between', value: '30', value2: '50' }}]
          data: do
            title: "你需要多少錢?"
            description: "請寫出你到底需要多少錢"
        }
        {
          type: \block
          name: \form-short-answer
          config: 
            required: true
            show-description: true
            validation: [{ type: 'obj', value: { type: 'number', condition: 'between', value: '30', value2: '50' }}]
          data: do
            title: "你需要多少時間?"
            description: "請寫出你到底需要多少時間"
        }
      ]
  root = ld$.find \#root, 0
  bmgr = do
    get: (name) ->
      sample = ld$.find("[data-name=#name]",0)
      Promise.resolve(sample.outerHTML)
  reb = new reblock root: root, block-manager: bmgr

  #reb.inject {host: root, name: 'form-short-answer', force: true}
  reb.inject {host: root, data: data, force: true}
    .then ->
      console.log \ok
      console.log data
    .catch -> console.log \failed, it

  /*
  bs = []
  ld$.find(root, '[repeat-item]').map (node) ->
    name = node.getAttribute('repeat-item')
    list = data.data[name]
    console.log name, list
    ns = node.nextSibling
    p = node.parentNode
    p.removeChild node
    ps = list
      .map (data) ->
        n = node.cloneNode true
        p.insertBefore n, ns
        ns = n
        return {opt: {node: n, name: data.name, force: true}, data: data, node: n}
      .map (o) -> reb.inject o.opt .then -> bs.push {node: o.node, data: o.data}
    Promise.all ps .then -> update-all!

  update-all = -> bs.map -> update it
  update = (bd) ->
    ld$.find(bd.node, '[editable]').map ->
      name = it.getAttribute(\editable)
      it.innerText = bd.data.data[name]

  setTimeout (->
    data.data.blocks.0.data.title = "不不不"
    update bs.0
  ), 1000
  */

  /*
  update = (block-data) ->
    {root,data} = block-data
    ld$.find(root, '[repeat-item]').map (node) ->
      name = node.getAttribute('repeat-item')
      list = data.data[name]
      ns = node.nextSibling
      p = node.parentNode
      p.removeChild node
      ps = list
        .map (data) ->
          n = node.cloneNode true
          p.insertBefore n, ns
          ns = n
          return {opt: {node: n, name: data.name, force: true}, data: data, node: n}
        .map (o) -> reb.inject o.opt .then -> bs.push {node: o.node, data: o.data}
      Promise.all ps .then -> update-all!
  */

  /*
  convert-tag = ({rd}) ->
    if !rd.type => return document.createTextNode(rd)
    else if rd.type == \tag =>
      n = ld$.create rd{name, attr, style}
      if rd.text => n.innerText = that
      else (d.child or []).map -> if convert({rd:it}) => n.appendChild that
      return n
    else if rd.type == \value => return document.createTextNode(rd.value)
    else null# inconvertable


  # 在指定的位置 ( root + next-sibling ) 中, 插入以 data 所代表的 block
  inject = (root, ns, data) ->

  # 將 reData 所對應的 DOM Tree 建構出來
  init = (root, data) ->
    nodes = ld$.find(root, '[editable],[repeatable],[hostable]')
    excludes = ld$.find(root, '[repeatable] [editable], [repeatable] [hostable], [repeatable] [hostable]')
    nodes = nodes.filter -> !(it in excludes)
    nodes.map (node) -> 
      if (name = node.getAttribute('editable')) =>
        d = data[name]
        if !d.type => node.innerText = d
        else if d.type == \value => node.innerText = d.value
        else if d.type == \tag => node.appendChild(convert-tag({d}))
        else if d.type == \html => node.innerHTML = d.value
      else if (name = node.getAttribute('repeatable')) =>
        ns = node.nextSibling
        p = node.parentNode
        p.removeChild node
        node.removeAttribute \ld-each
        ds = data[name]
        ds.map (d) ->
          n = node.cloneNode true
          p.insertBefore n, ns
          init n,d
      else if (name = node.getAttribute('hostable')) =>
        ds = data[name].filter -> it.type == \block
        ds.map (d) ->
          inject node, d
  */

)!
