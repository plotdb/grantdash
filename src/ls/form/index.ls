(->
  ldc.register \prjForm, <[prjFormCriteria prjFormBlock]>, ({prj-form-criteria, prj-form-block}) ->
    view-mode = false
    lc = {view: true}

    bmgr = do
      get: (name) -> new Promise (res, rej) ->
        n = ld$.find("[data-name=#{name}]", 0)
        if !n => rej new Error("block not found")
        div = ld$.create name: "div", attr: {draggable: true}
        div.appendChild n.cloneNode(true)
        res div

    fill-data = {}
    update = (block) -> 
      if view-mode =>
        fill-data[block.key] = block.value
        console.log "[update]", fill-data
        if viewer => viewer.render!
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

    if view-mode =>
      progress = ->
        done = [k for k of fill-data].length
        total = sample-blocks.length
        percent = ( done / sample-blocks.length )
        remain = total - done
        return {remain, done, total, percent}

      viewer = new ldView do
        root: document.body
        action: click: do
          viewing: ->
            lc.view = !lc.view
            viewer.render!
            view-answer.render!
          invalid: ->
            filled = [k for k of fill-data]
            for i from 0 til sample-blocks.length =>
              if !("#{sample-blocks[i].key}" in filled) => break
            node = ld$.find("\#block-#{sample-blocks[i].key}",0)
            if node => scrollto node
        handler: do
          nview: ({node}) -> node.classList.toggle \d-none, lc.view
          view: ({node}) -> node.classList.toggle \d-none, !lc.view
          progress: ({node}) -> node.style.width = "#{progress!percent * 100}%"
          invalid: ({node}) -> node.classList.toggle \d-none, (progress!remain == 0)
          valid: ({node}) -> node.classList.toggle \d-none, (progress!remain > 0)
          remain: ({node}) -> node.innerText = progress!remain
          submit: ({node}) -> node.classList.toggle \disabled, (progress!remain > 0)

      render-answer = do
        "form-checkpoint": ({node, data, block}) ->
          items = (data.list or [])
            .map -> 
              """
              <div class="item">
              <div class="title">#{it.title}</div>
              <p>#{it.desc}</p>
              </div>
              """
            .join("")
          node.innerHTML = """<div class="timeline-list">#items</div>"""
          console.log data
        "form-radio": ({node, data}) ->
          node.innerText = ((data.list or []) ++ (if data.other => [data.otherValue or ''] else [])).join(', ')
        "form-checkbox": ({node, data}) ->
          node.innerText = ((data.list or []) ++ (if data.other => [data.otherValue or ''] else [])).join(', ')

      view-answer = new ldView do
        root: document.body
        handler: do
          answer: do
            list: -> sample-blocks
            init: ({node, data}) ->
              node.view = new ldView do
                root: node
                handler: do
                  title: ({node}) -> node.innerText = data.title or ''
                  desc: ({node}) -> node.innerText = data.desc or ''
                  content: ({node}) ->
                    if render-answer[data.name] =>
                      render-answer[data.name]({node, block: data, data: (fill-data[data.key] or {})})
                    else node.innerText = (fill-data[data.key] or {}).content or ''

            handler: ({node, data}) -> node.view.render!


  ldc.app \prjForm
)!
