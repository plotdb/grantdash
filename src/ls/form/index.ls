(->
  ldc.register \prjForm, <[prjFormCriteria prjFormBlock]>, ({prj-form-criteria, prj-form-block}) ->
    view-mode = true

    bmgr = do
      get: (name) -> new Promise (res, rej) ->
        n = ld$.find("[data-name=#{name}]", 0)
        if !n => rej new Error("block not found")
        div = ld$.create name: "div", attr: {draggable: true}
        div.appendChild n.cloneNode(true)
        res div

    update = -> console.log \update, it.value
    blocks-view = new ldView do
      root: '#form'
      handler:
        block: do
          list: -> sample-blocks
          init: ({node, data}) ->
            bmgr.get(data.name).then (n) ->
              n = n.childNodes.0
              n.parentNode.removeChild n
              node.innerHTML = ""
              node.appendChild n
              prj-form-block.render {node, data, view-mode, update}
              if !view-mode => prj-form-criteria.render {node, data}

    if (n = ld$.find('[ld-scope=blocksrc]',0)) =>
      new ldView do
        root: n
        action: dragstart: block: ({node, evt}) ->
          evt.dataTransfer.setData('text/plain',"#{node.getAttribute(\data-name)}")


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

  ldc.app \prjForm
)!
