(->
  ldc.register \prjForm,
  <[prjFormCriteria prjFormBlock prjFormValidation]>,
  ({prj-form-criteria, prj-form-block, prj-form-validation}) ->
    view-mode = false
    lc = {view: false}
    hub = do
      update: (block) ->
        if view-mode =>
          fill-data[block.key] = block.value
          console.log "[update]", fill-data
          validate block
        else blocks-view.render!
      render: ->


    bmgr = do
      get: (name) -> new Promise (res, rej) ->
        n = ld$.find("[data-name=#{name}]", 0)
        if !n => rej new Error("block not found")
        div = ld$.create name: "div", attr: {draggable: true}
        div.appendChild n.cloneNode(true)
        res div

    fill-data = {}
    validate = debounce (block) ->
      block.valid = prj-form-validation.validate block
      blocks-view.render!
      if viewer => viewer.render!
    update = (block) -> hub.update block

    setInterval (->
      console.log sample-blocks.length, JSON.stringify(sample-blocks)
    ), 3000
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
              prj-form-block.render {node, root-data: sample-blocks, data, view-mode, update}
              if !view-mode => prj-form-criteria.render {node, data}
          handler: ({node, data}) ->
            if node.view => node.view.block.render!


    if (n = ld$.find('[ld-scope=blocksrc]',0)) =>
      new ldView do
        root: n
        action: dragstart: block: ({node, evt}) ->
          evt.dataTransfer.setData('text/plain',"#{node.getAttribute(\data-name)}")


    reb = new reblock do
      root: '#form'
      block-manager: bmgr
      action: do
        afterInject: ({node, name}) ->
          new-data = do
            key: Math.random!toString(36)substring(2)
            name: name, title: "提問的標題1", desc: "提問的描述"
            config: {required: true}, criteria: [{type: \number, op: \between, input1: 10, input2: 20, invalid: '應介於 10 ~ 20 之間'}]
          node._data = new-data
          idx = Array.from(node.parentNode).indexOf(node)
          sample-blocks.splice idx, 0, new-data
          blocks-view.bind-each-node {name: \block, container: node.parentNode, node: node}
          blocks-view.render!



        afterMoveNode: ({src, des, ib}) ->
          if src.parentNode.hasAttribute(\hostable) =>
            n = src.parentNode
            while n and !n._data => n = n.parentNode
            # no n? it's a block.
            if !n =>
              ia = sample-blocks.indexOf(src._data)
              sample-blocks.splice ia, 1
              ib = if ib => sample-blocks.indexOf(ib._data) else sample-blocks.length
              sample-blocks.splice ib, 0, src._data
              blocks-view.render!
              return
            # otherwise - n is block.
            n._data.data = Array.from(src.parentNode.childNodes)
              .filter(->it.nodeType == 1 )
              .map(-> it._data)
              .filter(->it)
            n.view.list.render!

    if view-mode =>
      progress = ->
        done = sample-blocks.filter(-> it.{}valid.result).length
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
