({prjFormCriteria}) <- ldc.register \prjFormBlock, <[prjFormCriteria]>, _

schema = prjFormCriteria.schema

settext = (n,v) -> if n.innerText != v => n.innerText = v


module = {}

module-list = module-init: ->
  if @block.name == \form-checkpoint and @viewing =>
    if !@block.{}value.list => @block.{}value.list = @block.[]data else @block.data = @block.value.list
    ld$.find(@root, '.timeline-list', 0).addEventListener \input, ~>
      @block.{}value.list = @block.data
      @update!
  @view.module = view = new ldView do
    root: @root
    action: click: do
      "list-add": ~>
        @block.[]data.push {
          title: "新項目", desc: "關於這個項目的描述 ... ", key: Math.random!toString(36)substring(2)
        }
        @update!
        @render!

    handler: do
      list: do
        key: -> it.key
        list: ~> (@block.data or []) ++ [{other: true, key: 'other'}]
        init: ({node, data}) ~>
          editable = node.hasAttribute(\data-user-editable)
          if !editable and @viewing => node.removeAttribute \draggable
          if data.other and @block.name == \form-checkpoint => node.classList.add \d-none

        action: click: if !@viewing => (->) else ({node, data, evt}) ~>
          if @block.name == \form-checkpoint => return
          if evt.target.nodeName == \INPUT => return
          is-radio = @block.name == \form-radio
          val = @block.{}value
          if data.other =>
            ison = if is-radio => true else !val.other
            val.other = ison
            if ison and is-radio => val.list = []
          else
            list = val.list or []
            ison = if is-radio => true else !(data.title in list)
            if ison =>
              list.push data.title
              if is-radio => val.other = false
            else list.splice list.indexOf(data.title), 1
            val.list = list
          view.render!
          @update!

        handler: ({node, data}) ~>
          editable = node.hasAttribute(\data-user-editable)
          if node.view => return node.view.render!
          node.view = new ldView do
            root: node
            init: data: ({node}) ~>
              node.setAttribute(\data-name, node.getAttribute(\editable))
              if !editable and @viewing => node.removeAttribute \editable
            action: do
              input: do
                "other-value": ({node}) ~>
                  @block.{}value.other-value = node.value
                data: ({node}) ~> data[node.getAttribute(\data-name)] = node.innerText
              click: do
                delete: ({node, evt}) ~>
                  @block.data.splice @block.data.indexOf(data), 1
                  @update!
                  @render!
                  evt.stopPropagation!
            handler: do
              drag: ({node}) ~>
                node.classList.toggle \invisible, !!((@viewing and !editable) or data.other)
              state: ({node}) ~>
                val = @block.{}value
                ison = (data.other and val.other) or (!data.other and (data.title in val.[]list))
                node.classList.toggle \active, ison
              "other-value": ({node}) ~>
                node.value = @block.{}value.other-value or ''
              delete: ({node}) ~> node.classList.toggle \d-none, !!((@viewing and !editable) or data.other)
              other: ({node}) ->
                node.classList.toggle \d-none, !data.other
              data: ({node}) ->
                if data.other =>
                  node.removeAttribute \editable
                  node.classList.toggle \flex-grow-1, false
                settext node, ((if data.other => '其它' else data[node.getAttribute(\data-name)]) or '')


module = {} <<< do
  "form-radio": module-list
  "form-checkbox": module-list
  "form-checkpoint": module-list


module-textarea = module-init: ->
  @view.module = view = new ldView do
    root: @root
    action: input: do
      "use-markdown": ({node}) ~>
        @block.{}value.use-markdown = node.checked
        @update!
        view.render!
      "input-field": ({node}) ~>
        @block.{}value.content = node.value
        @update!
      "toggle-preview": ({node}) ~>
        @preview = !!node.checked
        view.render!
    handler: do
      "input-field": ({node}) ~> node.value = @block.{}value.content or ''
      "preview-panel": ({node}) ~>
        node.classList.toggle \d-none, !@preview
        if @preview => node.innerHTML = DOMPurify.sanitize(marked(@block.{}value.content or ''))
      "edit-panel": ({node}) ~> node.classList.toggle \d-none, !!@preview
      "if-markdown": ({node}) ~> node.classList.toggle \d-none, !@block.{}value.use-markdown

module <<< do
  "form-long-answer": module-textarea
  "form-short-answer": module-textarea

# {root, mode, data}
Ctrl = (opt) ->
  @opt = opt
  @viewing = opt.view-mode
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @hub = opt.hub
  @view = @root.view = {}
  @block = opt.data
  @form = opt.form or {}

  @view.block = new ldView do
    root: root
    action:
      input: do
        title: ({node, evt}) ~>
          @block.title = node.innerText
          @update!
        desc: ({node, evt}) ~>
          @block.desc = node.innerText
          @update!
      click: do
        switch: ({node, evt}) ~>
          node.classList.toggle \on
          @block.{}config[node.getAttribute(\data-name)] = node.classList.contains(\on)
          @update!
        delete: ({node, evt}) ~> @delete!
        clone: ({node, evt}) ~> @clone!
        "move-up": ~> @move -1
        "move-down": ~> @move 1
        purpose: ({node}) ~>
          n = node.getAttribute(\data-name)
          if n == \thumb and @block.name != \form-file => return
          @form{}purpose[n] = v = if @form{}purpose[n] == @block.key => null else @block.key
          if v => for k of @form.purpose => if k != n and @form.purpose[k] == v => @form.purpose[k] = null
          @update!
          @view.block.render!
    init: do
      "purpose-menu": ({node}) -> new Dropdown(node)
    handler: do
      "purpose-menu": ({node}) ~>
        map = {title: "標題", description: "簡介", thumb: "縮圖"}
        n = [{k,v} for k,v of @form{}purpose]
          .filter(~> it.v == @block.key)
          .map(-> map[it.k])
          .join(' / ')
        btn = ld$.find(node, '.btn', 0)
        btn.innerText = if !n => '用途' else "#n"
      purpose: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.classList.toggle \disabled, (n == \thumb and @block.name != \form-file)
        ld$.find(node, \i, 0).classList.toggle \d-none, @form{}purpose[n] != @block.key
      invalid: ({node}) ~>
        is-valid = (!(@block.{}valid.result?) or @block.valid.result)
        if !is-valid => settext node, (@block.valid.criteria.invalid or "這個欄位格式不符")
        node.classList.toggle \d-none, is-valid
      block: ({node}) ~>
        is-valid = (!(@block.{}valid.result?) or @block.valid.result)
        node.classList.toggle \invalid, !is-valid
      title: ({node}) ~>
        settext node, @block.title
        if @viewing => node.removeAttribute \editable
      desc: ({node}) ~>
        settext node, @block.desc
        if @viewing => node.removeAttribute \editable
      switch: ({node}) ~> node.classList.toggle \on, !!@block.{}config[node.getAttribute(\data-name)]
      "edit-only": ({node}) ~> if @viewing => node.remove!
      "list-input": ({node}) ~> node.setAttribute \name, "input-#{@block.key}"

  if !@viewing => @view.criteria = new ldView do
    root: @root
    action: click: do
      add: ~>
        @block.[]criteria.push {type: \number}
        @view.criteria.render!
    handler: do
      criteria: do
        list: ~> @block.[]criteria
        action: click: ({node, data, evt, local}) ~>
          if !(n = ld$.parent(evt.target, '.dropdown-item', node)) => return
          if n.type => data.type = n.type
          if n.op => data.op = n.op
          @update!
          local.view.render!
        init: ({node, data, local}) ~> 
          get-type = ~> data.type or schema.support[@block.name][0] or \number
          get-op = ->
            ops = schema.ops[schema.types[get-type!].ops]
            v = [v for k,v of ops][0]
            return ops[data.op] or v or {name: ""}
          ld$.find(node, '.dropdown .dropdown-toggle').map -> new Dropdown(it)
          local.view = new ldView do
            context: data
            root: node
            action: do
              click: do
                enabled: ({node, context}) ~>
                  node.classList.toggle \on
                  context.enabled = node.classList.contains \on
                  @update!
                  local.view.render!
              input: do
                input1: ({node, context}) ~>
                  context.input1 = ld$.find(node, 'input', 0).value
                  @update!
                input2: ({node, context}) ~>
                  context.input2 = ld$.find(node, 'input', 0).value
                  @update!
                "input-invalid": ({node, context}) ~>
                  context.invalid = node.value
                  @update!

            handler: do
              enabled: ({node, context}) -> node.classList.toggle \on, !!context.enabled
              input1: ({node, context}) ->
                input = ld$.find(node, 'input', 0)
                input.value = context.input1 or ''
                if context.enabled => input.removeAttribute \disabled else input.setAttribute \disabled, ''
              input2: ({node, context}) ->
                node.classList.toggle \d-none, ((get-op!field or 1) < 2)
                input = ld$.find(node, 'input', 0)
                input.value = context.input2 or ''
                if context.enabled => input.removeAttribute \disabled else input.setAttribute \disabled, ''
              "input-invalid": ({node, context}) ->
                if context.enabled => node.removeAttribute \disabled else node.setAttribute \disabled, ''
                node.value = context.invalid or ''
              type: ({node, context}) ->
                node.classList.toggle \disabled, !context.enabled
                settext node, schema.types[get-type!].name
              op: ({node, context}) ->
                node.classList.toggle \disabled, !context.enabled
                node.innerHTML = get-op!name
              "types": do
                list: ~> schema.support[@block.name]
                handler: ({node, data}) ->
                  settext node, schema.types[data].name
                  node.type = data
              "ops": do
                list: ->
                  [[k,v] for k,v of schema.ops[schema.types[get-type!].ops]]
                handler: ({node, data}) ->
                  node.innerHTML = data.1.name
                  node.op = data.0
        handler: ({node, data, local}) ->
          local.view.setContext data
          local.view.render!

  if module[@block.name] =>
    @ <<< module[@block.name]{module-init}
    @module-init!


  return @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-data: -> @block = it
  render: -> 
    @view.block.render!
    if @view.module => @view.module.render!
    if @view.criteria => @view.criteria.render!
  update: -> @hub.update @block
  delete: -> @hub.delete @block
  clone: -> @hub.clone @block
  move: (dir) -> @hub.move @block, dir
  schema: schema

return Ctrl
