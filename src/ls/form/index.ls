({ldcvmgr, prj-form-criteria, prj-form-block, prj-form-validation, sdbAdapter}) <- ldc.register \prjForm,
<[ldcvmgr prjFormCriteria prjFormBlock prjFormValidation sdbAdapter]>, _

Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @node = do
    src: ld$.find(root, '[ld=blocksrc]', 0)
    list: ld$.find(root, '[ld=form-list]', 0)
    answer: ld$.find(root, '[ld=form-answer]', 0)
  @view-mode = view-mode = opt.view-mode
  @obj = obj = {list: [], value: {}}
  if @view-mode and opt.form => @obj.list = opt.form

  lc = {view: false}
  @hub = hub = do
    update-deb: debounce 200, (b) ~> hub.update!
    update: (block) ~>
      if view-mode and block =>
        obj.value[block.key] = block.value
        @ops-out ~> obj.value
        @validate block
      else @ops-out ~> {list: @obj.list}
    render-deb: debounce 200, -> hub.render!
    render: ->
      blocks-view.render!
      if viewer => viewer.render!
    delete: ->
      obj.list.splice obj.list.indexOf(it), 1
      @update!
      @render!
    clone: ->
      new-data = JSON.parse(JSON.stringify(it))
      new-data.key = Math.random!toString(36)substring(2)
      obj.list.splice obj.list.indexOf(it), 0, new-data
      @update!
      @render!

  bmgr = do
    get: (name) -> new Promise (res, rej) ->
      n = ld$.find(root, "[ld=form-sample] [data-name=#{name}]", 0)
      if !n => rej new Error("block not found")
      div = ld$.create name: "div", attr: {draggable: true}
      div.appendChild n.cloneNode(true)
      res div

  @validate-all = debounce ->
    obj.list.map -> it.valid = prj-form-validation.validate it
    blocks-view.render!
    if viewer => viewer.render!
  @validate = debounce (block) ->
    block.valid = prj-form-validation.validate block
    blocks-view.render!
    if viewer => viewer.render!
  #update = (block) -> hub.update block

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
        schema = prjFormCriteria.schema
        new-data = do
          key: Math.random!toString(36)substring(2)
          name: name, title: "問題的標題", desc: "一些關於這個問題的簡單描述、說明或介紹"
          config: {required: true}, criteria: [{enabled: true, type: \number, op: \between }]
        type = schema.support[name].0
        if type => op = [k for k of (schema.ops[schema.types[type].ops] or {})].0 else op = ''
        new-data.criteria.0 <<< {type, op}

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
            .filter(->it and !it.other)
          # in view mode, reorder works for form-checkpoint. so we update its value.
          # TODO use _data seems to be a bad idea. can we make it better?
          if n._data.name == \form-checkpoint => n._data.{}value.list = n._data.data
          if n.view.module => n.view.module.render!
          hub.update!

  if view-mode =>
    progress = ->
      done = obj.list.filter(-> it.{}valid.result).length
      total = obj.list.length
      percent = ( done / obj.list.length )
      remain = total - done
      return {remain, done, total, percent}

    viewer = new ldView do
      root: root
      action: do
        input: do
          history: -> ldcvmgr.toggle 'prj-diff'
        click: do
          viewing: ->
            lc.view = !lc.view
            viewer.render!
            view-answer.render!
          invalid: ~>
            filled = [k for k of obj.value]
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
        "brd-name": ({node}) -> node.innerText = if opt.brd => (opt.brd.{}info.name or '') else '未定的活動'
        "grp-name": ({node}) -> node.innerText = if opt.grp => (opt.grp.{}info.name or '') else '未定的分組'
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
      "form-long-answer": ({node, data}) ->
        node.innerHTML = DOMPurify.sanitize(marked(data.content or ''))


    view-answer = new ldView do
      root: @node.answer
      handler: do
        answer: do
          list: -> obj.list
          handler: ({node, data}) ->
            if node.view => node.view.render!
            else node.view = new ldView do
              root: node
              handler: do
                title: ({node}) -> node.innerText = data.title or ''
                desc: ({node}) -> node.innerText = data.desc or ''
                content: ({node}) ->
                  if render-answer[data.name] =>
                    render-answer[data.name]({node, block: data, data: (obj.value[data.key] or {})})
                  else node.innerText = (obj.value[data.key] or {}).content or ''

    view-answer-diff = new ldView do
      root: '[ld-scope=prj-diff] .card-body'
      handler: do
        diffs: do
          list: -> obj.list.map -> {old: {}, cur: it.value, block: it}
          handler: ({node, data}) ->
            if node.view => node.view.render!
            else node.view = new ldView do
              root: node
              handler: do
                title: ({node}) -> node.innerText = data.block.title or ''
                desc: ({node}) -> node.innerText = data.block.desc or ''
                row: ({node}) ->
                  [old, cur] = [(data.old or {}), (data.cur or {})].map (v) ->
                    return Math.random!toString(36)substring(2)
                    if v.content => return (that or '')
                    ret = (v.list or []).map (item) -> [v for k,v of item].join('\n')
                    if v.other => ret = ([ret] ++ [v.other-value])
                    ret = ret.join('\n')
                    return ret

                  ret = Diff.diffChars cur, old
                  html = {old: '', cur: ''}
                  vals = ld$.find(node, '.value')

                  ret.map ->
                    c = if it.added => 'text-added' else if it.removed => 'text-removed' else ''
                    if !it.removed => html.old += "<span class='#c'>#{(it.value)}</span>"
                  ret = Diff.diffChars old, cur
                  ret.map ->
                    c = if it.added => 'text-removed' else if it.removed => 'text-added' else ''
                    if !it.removed => html.cur += "<span class='#c'>#{(it.value)}</span>"
                  vals.0.innerHTML = DOMPurify.sanitize(html.old)
                  vals.1.innerHTML = DOMPurify.sanitize(html.cur)



  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    data = JSON.parse(JSON.stringify(data or {}))
    if @view-mode =>
      @obj.value = data
      @obj.list.map ~> it.value = data[it.key]
      @validate-all!
    else @obj.list = (data.list or [])
    @hub.render-deb!

return Ctrl
