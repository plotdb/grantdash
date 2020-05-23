({prj-form-criteria, prj-form-block, prj-form-validation, sdbAdapter}) <- ldc.register \prjForm,
<[prjFormCriteria prjFormBlock prjFormValidation sdbAdapter]>, _

Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @node = do
    src: ld$.find(root, '[ld=blocksrc]', 0)
    list: ld$.find(root, '[ld=form-list]', 0)
    answer: ld$.find(root, '[ld=form-answer]', 0)
  @view-mode = view-mode = opt.view-mode
  @obj = obj = {list: []}
  lc = {view: false}
  @hub = hub = do
    update-deb: debounce 200, (b) ~>
      console.log "is-dragging: ", reb.is-dragging!
      if reb.is-dragging! => hub.update-deb(b) else hub.update b
    update: (block) ~>
      if view-mode and block =>
        fill-data[block.key] = block.value
        @ops-out ~> {list: @obj.list}
        validate block
      else
        @ops-out ~> {list: @obj.list}
        #blocks-view.render!
    render-deb: debounce 200, -> hub.render!
    render: ->
      blocks-view.render!
      if viewer => viewer.render!

  bmgr = do
    get: (name) -> new Promise (res, rej) ->
      n = ld$.find(root, "[ld=form-sample] [data-name=#{name}]", 0)
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

  blocks-view = new ldView do
    root: @node.list
    handler:
      block: do
        key: -> it.key
        list: -> obj.list
        init: ({node, data}) ->
        handler: ({node, data}) ->
          promise = if !node.block =>
            bmgr.get(data.name).then (n) ->
              n = n.childNodes.0
              n.parentNode.removeChild n
              node.innerHTML = ""
              node.appendChild n
              node.block = new prj-form-block {root: node, data, view-mode, hub}
          else Promise.resolve!
          promise.then ->
            if node.block =>
              node.block.set-data data
              node.block.render!


  if @node.src =>
    new ldView do
      root: @node.src
      action: dragstart: block: ({node, evt}) ->
        evt.dataTransfer.setData('text/plain',"#{node.getAttribute(\data-name)}")
  reb = new reblock do
    name: \form
    root: @node.list
    block-manager: bmgr
    action: do
      afterInject: ({node, name}) ->
        new-data = do
          key: Math.random!toString(36)substring(2)
          name: name, title: "提問的標題1", desc: "提問的描述"
          config: {required: true}, criteria: [{type: \number, op: \between, input1: 10, input2: 20, invalid: '應介於 10 ~ 20 之間'}]
        node._data = new-data
        idx = Array.from(node.parentNode).indexOf(node)
        obj.[]list.splice idx, 0, new-data
        blocks-view.bind-each-node {name: \block, container: node.parentNode, node: node}
        blocks-view.render!
        hub.update!



      afterMoveNode: ({src, des, ib}) ->
        if src.parentNode.hasAttribute(\hostable) =>
          n = src.parentNode
          while n and !n._data => n = n.parentNode
          # no n? it's a block.
          if !n =>
            ia = obj.list.indexOf(src._data)
            obj.list.splice ia, 1
            ib = if ib => obj.list.indexOf(ib._data) else obj.list.length
            obj.list.splice ib, 0, src._data
            hub.update-deb!
            hub.render!
            return
          # otherwise - n is block.
          n._data.data = Array.from(src.parentNode.childNodes)
            .filter(->it.nodeType == 1 )
            .map(-> it._data)
            .filter(->it)
          if n.view.module => n.view.module.render!
          hub.update-deb!
          console.log \here

  if view-mode =>
    progress = ->
      done = obj.list.filter(-> it.{}valid.result).length
      total = obj.list.length
      percent = ( done / obj.list.length )
      remain = total - done
      return {remain, done, total, percent}

    viewer = new ldView do
      root: root
      action: click: do
        viewing: ->
          lc.view = !lc.view
          viewer.render!
          view-answer.render!
        invalid: ~>
          filled = [k for k of fill-data]
          for i from 0 til obj.list.length =>
            if !("#{obj.list[i].key}" in filled) => break
          node = ld$.find(@node.list, "\#block-#{obj.list[i].key}",0)
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
      root: @node.answer
      handler: do
        answer: do
          list: -> obj.list
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

  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    @obj.list = JSON.parse(JSON.stringify(data.list or []))
    @hub.render-deb!

return Ctrl
