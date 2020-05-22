({sdbAdapter}) <- ldc.register \adminNavbar, <[sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< {opt: opt, view: {}, node: {}}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @obj = obj = tree: {children: []}
  /*
  @obj = obj = tree: do
    children: [
      {name: "活動辦法", url: "/about"},
      {name: "關於我們"},
      {name: "歷屆活動", toggle: true, children: [ {name: "2018春季"}, {name: "2018秋季"} ]},
      {name: "成果報告"}
    ]
  */

  @node = do
    view: ld$.find(@root, '[ld=folder-root]', 0)
    sample: ld$.find(@root, '[ld-scope=folder-sample]',0)

  @view.sample = new ldView do
    root: @node.sample
    handler: {item: (->), folder: (->)}

  update-data-debounce = debounce 100, ->
    if reb.is-dragging! => update-data-debounce!
    else update-data!
  update-data = ~> @ops-out ~>
    console.log "ops-out: ", obj.tree
    obj.tree

  render-folder = ({node, data, parent}) ~>
    rn = node
    root-data = data
    view = new ldView do
      root: node
      init-render: false
      action:
        input: do
          name: ({node, evt}) ->
            data.name = node.value
            update-data!
          url: ({node, evt}) ->
            data.url = node.value
            update-data!
        click: do
          clone: ({node, evt}) ~>
            idx = rn.pdata.children.indexOf(data)
            rn.pdata.children.splice idx + 1, 0, JSON.parse(JSON.stringify(data))
            @view.root.render!
            console.log JSON.stringify(obj.tree)
          delete: ({node, evt}) ~>
            idx = rn.pdata.children.indexOf(data)
            rn.pdata.children.splice idx, 1
            update-data!
            @view.root.render!
          "toggle-fold": ({node, evt}) ~>
            if data.children => 
              idx = rn.pdata.children.indexOf(data)
              children = data.children
              delete data.children
              delete data.toggle
              children = [JSON.parse(JSON.stringify(data))] ++ children
              rn.pdata.children.splice.apply rn.pdata.children, ([idx, 1] ++ children)
              @view.root.render!
            else
              idx = rn.pdata.children.indexOf(data)
              new-data = JSON.parse(JSON.stringify(data))
              new-data.toggle = true
              new-data.children = []
              rn.pdata.children.splice.apply rn.pdata.children, ([idx, 1] ++ [new-data])
              @view.root.render!

      handler: do
        name: ({node}) -> node.value = data.name or ''
        url: ({node}) ->  node.value = data.url or ''
        list: do
          list: -> data.children
          init: ({node,data}) ~>
            des = @view.sample.get(if data.children => \folder else \item).childNodes.0
            node.setAttribute \class, des.getAttribute(\class)
            node.setAttribute \draggable, true
            node.innerHTML = des.innerHTML
            if data.children =>
              node.childNodes.0.innerHTML = @view.sample.get(\item).childNodes.0.innerHTML
              node.childNodes.0.classList.add \folder-toggle
              node.folder = new ldui.Folder root: node
            node.pdata = root-data
            node.view = render-folder {node, data}
          handler: ({node, data}) ->
            node.pdata = root-data
            node.view.data = data
            if node.view => node.view.render!
    view.on \beforeRender, ->
      root-data := data := (view.data or obj.tree)
    view

  @view.root = render-folder {node: @node.view, data: obj.tree}
  reb = new reblock do
    root: root
    action: do
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
      beforeMoveNode: ({src, des, ib}) ~>
        n = src.parentNode
        while n and !n._data => n = n.parentNode
        d = if !n => obj.tree else n._data
        d.children.splice d.children.indexOf(src._data), 1

        # ldView keeps node inside, which might cause problem if we want to reuse this node in other view.
        (if n => n.view else @view.root)
          .unbind-each-node {name: \list, container: src.parentNode, node: src}

      afterMoveNode: ({src, des, ib}) ~>
        n = src.parentNode
        while n and !n._data => n = n.parentNode
        d = if !n => obj.tree else n._data
        idx = Array.from(src.parentNode.childNodes).indexOf(src)
        d.children.splice Array.from(src.parentNode.childNodes).indexOf(src), 0, src._data
        update-data-debounce!

        (if n => n.view else @view.root)
          .bind-each-node {name: \list, container: src.parentNode, idx, node: src}
        src.pdata = d

        if n => n.view.render! else @view.root.render!

  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    if !data.children =>
      @obj.tree = do
        children: [
          {name: "活動辦法", url: "/about"},
          {name: "關於我們"},
          {name: "歷屆活動", toggle: true, children: [ {name: "2018春季"}, {name: "2018秋季"} ]},
          {name: "成果報告"}
        ]
    else @obj.tree = JSON.parse(JSON.stringify(data))
    @view.root.render!

    #for k,v of data => @form.fields[k].value = v

return Ctrl
