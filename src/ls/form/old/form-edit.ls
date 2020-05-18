(->

  render-list = ({node, data}) ->
    local-data = data.[]data
    node.{}view.list = view = new ldView do
      root: node
      action: click: do
        "list-add": ->
          local-data.push {title: "某個點", desc: "某個點的描述"}
          view.render!
      handler: do
        list: do
          list: -> local-data
          init: ({node, data}) ->
            editable = node.hasAttribute(\data-user-editable)
            if !editable => node.removeAttribute \draggable
            node.view = view = new ldView do
              root: node
              action: input: do
                "list-data": ({node}) -> data[node.getAttribute(\data-name)] = node.innerText
              init: "list-data": ({node}) ->
                node.setAttribute \data-name, node.getAttribute \editable
                if !editable => node.removeAttribute \editable
              handler: do
                "list-data": ({node}) -> node.innerText = data[node.getAttribute(\data-name)] or ''
          render: ({node}) -> node.render!

  form-modules = do
    "form-radio": render-list
    "form-checkbox": render-list
    "form-checkpoint": render-list

  block-renderer = ({node, data}) ->
    node.{}view.block = new ldView do
      root: node
      action:
        input: do
          title: ({node, evt}) ->
            data.title = node.innerText
          desc: ({node, evt}) -> data.desc = node.innerText

      handler: do
        title: ({node}) ->
          node.innerText = data.title
          node.removeAttribute \editable
        desc: ({node}) ->
          node.innerText = data.desc
          node.removeAttribute \editable
        "edit-only": ({node}) -> node.remove!


  blocks = [
    {
      name: "form-short-answer", title: "提問的標題1", desc: "提問的描述"
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-long-answer", title: "提問的標題2", desc: "提問的描述"
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-checkpoint", title: "提問的標題3", desc: "提問的描述"
      data: [{title: "第一個點", desc: "第一個點的描述"}]
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-radio", title: "提問的標題3", desc: "提問的描述"
      data: [{title: "第一個點", desc: "第一個點的描述"}]
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-checkbox", title: "提問的標題3", desc: "提問的描述"
      data: [{title: "第一個點", desc: "第一個點的描述"}]
      config: {required: true}, criteria: [{}]
    }
  ]

  bmgr = do
    get: (name) -> new Promise (res, rej) ->
      n = ld$.find("[data-name=#{name}]", 0)
      if !n => rej new Error("block not found")
      div = ld$.create name: "div", attr: {draggable: true}
      div.appendChild n.cloneNode(true)
      res div

  blocks-view = new ldView do
    root: '#form'
    handler:
      block: do
        list: -> blocks
        init: ({node, data}) ->
          bmgr.get(data.name).then (n) ->
            n = n.childNodes.0
            n.parentNode.removeChild n
            node.innerHTML = ""
            node.appendChild n
            block-renderer {node, data}
            if form-modules[data.name] => that({node, data})

  reb = new reblock do
    root: '#form'
    block-manager: bmgr
    action: do
      afterMoveNode: ({src, des, ib}) ->
        if src.parentNode.hasAttribute(\hostable) =>
          n = src.parentNode
          while n and !n._data => n = n.parentNode
          if !n => return
          n._data.data = Array.from(src.parentNode.childNodes)
            .filter(->it.nodeType == 1 )
            .map(-> it._data)
            .filter(->it)
          n.view.list.render!

)!
