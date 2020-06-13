({ldcvmgr, error, prjFormCriteria}) <- ldc.register \prjFormBlock, <[ldcvmgr error prjFormCriteria]>, _

schema = prjFormCriteria.schema

settext = (n,v) -> if n.innerText != v => n.innerText = v

module = {}

module-file = module-init: ->
  if !@viewing => return
  @view.module = view = new ldView do
    context: {}
    root: @root
    init: do
      "input-file": ({node, local, context}) ~>
        if @block.name == \form-thumbnail => node.setAttribute \accept, 'image/*'
        context.loading = false
        local.ldf = ldf = new ldFile root: node
        ldf.on \load, (files) ~>
          if @block.name == \form-thubmnail =>
            files = files.filter(-> /^image\//.exec(it.type) and /\.(gif|png|jpg|jpeg)$/.exec(it.name))
          node.value = ''
          if !files.length => return
          if files.filter(-> it.file and it.file.size > 1048576).length => return ldcvmgr.toggle('error-413')

          fd = new FormData!
          if @block.name == \form-thumbnail =>
            fd.append "thumb[]", files.0.file
            fd.append "files", JSON.stringify([{name: "thumb", type: "thumb"}])
          else
            for i from 0 til files.length => fd.append "file[]", files[i].file
            fd.append "files", JSON.stringify([{name: "file", type: "form"}])
          fd.append \prj, @prj.slug
          context.loading = true
          @view.module.render!
          ld$.xhr(
            "/dash/api/upload"
            {method: \POST, body: fd}
            {
              type: \json
              progress: ({percent}) ~>
                context.percent = percent
                @view.module.render!
            }
          )
            .then (ret) ~>
              if !ret.0 => return
              ret-files = ret.0.files or []
              @block.{}value.list = files.map (d,i) ->
                {key: i, path: ret-files[i]} <<< d.file{name, size, type}
              @update!
            .finally ~>
              debounce 1000 .then ~>
                context.loading = false
                @view.module.render!
            .catch error!

    handler: do
      loading: ({context, node}) -> node.classList.toggle \d-none, !context.loading
      bar: ({context, node}) -> node.style.width = "#{(context.percent or 0) * 100}%"
      "bar-label": ({context, node}) -> node.innerText = "#{(context.percent or 0) * 100}%"
      file: do
        list: ~> @block.{}value.[]list
        init: ({node, data, local}) ->
          node.classList.toggle \d-none, false
          local.view = new ldView do
            context: data
            root: node
            handler: do
              name: ({node,context}) -> node.innerText = context.name
              type: ({node,context}) -> node.innerText = context.type
              size: ({node,context}) ->
                mb = Math.round(10 * data.size / 1048576) / 10
                node.innerText = "#{mb}MB"
        handler: ({node,data,local}) ->
          local.view.render!

module <<< do
  "form-file": module-file
  "form-thumbnail": module-file

module["form-checkpoint"] = module-init: ->
  if @viewing =>
    if !@block.{}value.list => @block.{}value.list = @block.[]data else @block.data = @block.value.list
    ld$.find(@root, '.timeline-list', 0).addEventListener \input, ~>
      @block.{}value.list = @block.data
      @update!
  @view.module = view = new ldView do
    root: @root
    action: click: do
      "list-add": ~>
        @block.[]data.push { title: "", desc: "", key: suuid!  }
        @update!
        @render!
    handler: do
      list: do
        key: -> it.key
        list: ~> (@block.data or [])
        handler: ({node, data}) ~>
          editable = node.hasAttribute(\data-user-editable)
          if node.view => return node.view.render!
          node.view = new ldView do
            root: node
            init: date: ({node}) ~> if @viewing => tail.DateTime node
            action: do
              input: do
                input: ({node}) ~>
                  data[node.getAttribute(\data-name)] = node.value
                  @block.{}value.list = @block.data
                  @update!
              click: do
                delete: ({node, evt}) ~>
                  @block.data.splice @block.data.indexOf(data), 1
                  @update!
                  @render!
                  evt.stopPropagation!
            handler: do
              input: ({node}) -> node.value = data[node.getAttribute(\data-name)] or ''


module-list = module-init: ->
  @view.module = view = new ldView do
    root: @root
    action: click: do
      "list-add": ~>
        @block.[]data.push { title: "新項目", desc: "關於這個項目的描述 ... ", key: suuid!  }
        @update!
        @render!
    handler: do
      list: do
        key: -> it.key
        list: ~>
          ret = (@block.data or [])
          if @block.{}config.other-enabled or !@viewing => ret ++= [{other: true, key: 'other'}]
          return ret
        init: ({node, data}) ~>
          editable = node.hasAttribute(\data-user-editable)
          if !editable and @viewing => node.removeAttribute \draggable

        action: click: if !@viewing => (->) else ({node, data, evt}) ~>
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
            if is-radio => list = []
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
            init:
              date: ({node}) ~> if @viewing => tail.DateTime node
              data: ({node}) ~>
                node.setAttribute(\data-name, node.getAttribute(\editable))
                if !editable and @viewing => node.removeAttribute \editable
            action: do
              input: do
                "other-value": ({node}) ~>
                  @block.{}value.other-value = node.value
                data: ({node}) ~>
                  data[node.getAttribute(\data-name)] = editable-input node
                  @update!
              click: do
                "other-enabled": ({node, evt}) ~>
                  @block.{}config.other-enabled = !@block.{}config.other-enabled
                  node.classList.toggle \on, @block.{}config.other-enabled
                  @update!
                  @render!
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
                if @block.{}config.other-enabled => node.removeAttribute \readonly
                else node.setAttribute \readonly, ''
              delete: ({node}) ~> node.classList.toggle \d-none, !!((@viewing and !editable) or data.other)
              "other-enabled": ({node}) ~>
                node.classList.toggle \d-none, (@viewing or !data.other)
                node.classList.toggle \on, @block.{}config.other-enabled
              other: ({node}) ->
                node.classList.toggle \d-none, !data.other
              data: ({node}) ->
                if data.other =>
                  node.removeAttribute \editable
                  node.classList.toggle \flex-grow-1, false
                settext node, ((if data.other => '其它' else data[node.getAttribute(\data-name)]) or '')


module <<< do
  "form-radio": module-list
  "form-checkbox": module-list


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


module["form-datetime"] = module-init: ->
  @view.module = view = new ldView do
    root: @root
    action: do
      change: do
        "input-field": ({node,local,names}) ~>
          n = if \start in names => \start else \end
          @block.{}value[n] = node.value
          @update!
      click: do
        "range-enabled": ({node, evt}) ~>
          @block.{}config.range-enabled = !@block.{}config.range-enabled
          node.classList.toggle \on, @block.{}config.range-enabled
          @update!
          @render!

    init:
      "input-field": ({node,local}) ~> if @viewing => tail.DateTime node
    handler:
      "input-field": ({node,names}) ~>
        node.value = if \start in names => @block.{}value.start else @block.{}value.end
      "is-range": ({node}) ~> node.classList.toggle \d-none, !@block.{}config.range-enabled
      "range-enabled": ({node}) ~>
        node.classList.toggle \on, @block.{}config.range-enabled

module["form-tag"] = module-init: ->
  @view.module = view = new ldView do
    root: @root
    action: do
      change: do
        "input-field": ({node,local}) ~>
          @block.{}value.list = local.tagify.value.map(-> it.value)
          @update!
    init:
      "input-field": ({node,local}) ~>
        local.tagify = new Tagify node, { delimiters: /[,.:;，。：； ]/ }
        local.tagify.addTags(@block.{}value.list or [])

purpose-type = do
  title: <[form-short-answer]>
  description: <[form-short-answer form-long-answer]>
  thumb: <[form-thumbnail]>
  category: <[form-radio]>
  tag: <[form-tag]>

purpose-match = (name, block-name) -> block-name in purpose-type[name]

# {root, mode, data}
Ctrl = (opt) ->
  @opt = opt
  @viewing = opt.view-mode
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @hub = opt.hub
  @prj = opt.prj
  @view = @root.view = {}
  @block = opt.data
  @form = opt.form or {}

  @view.block = new ldView do
    root: root
    action:
      input: do
        title: ({node, evt}) ~>
          @block.title = editable-input node
          @update!
        desc: ({node, evt}) ~>
          @block.desc = editable-input node
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
          if !purpose-match(n, @block.name) => return
          @form{}purpose[n] = v = if @form{}purpose[n] == @block.key => null else @block.key
          if v => for k of @form.purpose => if k != n and @form.purpose[k] == v => @form.purpose[k] = null
          @update!
          @view.block.render!
    init: do
      "purpose-menu": ({node}) -> new Dropdown(node)
    handler: do
      "purpose-menu": ({node}) ~>
        map = {title: "標題", description: "簡介", thumb: "縮圖", category: "分類", tag: "標籤"}
        n = [{k,v} for k,v of @form{}purpose]
          .filter(~> it.v == @block.key)
          .map(-> map[it.k])
          .join(' / ')
        btn = ld$.find(node, '.btn', 0)
        btn.innerText = if !n => '用途' else "#n"
      purpose: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.classList.toggle \disabled, !purpose-match(n, @block.name)
        ld$.find(node, \i, 0).classList.toggle \d-none, @form{}purpose[n] != @block.key
      invalid: ({node}) ~>
        is-valid = (!(@block.{}valid.result?) or @block.valid.result)
        if !is-valid => settext node, (@block.valid.criteria.invalid or "這個欄位格式不符")
        node.classList.toggle \d-none, is-valid
      block: ({node}) ~>
        is-valid = (!(@block.{}valid.result?) or @block.valid.result)
        node.classList.toggle \invalid, !is-valid
      title: ({node}) ~>
        settext node, (@block.title or '')
        if @viewing => node.removeAttribute \editable
      desc: ({node}) ~>
        settext node, (@block.desc or '')
        if @viewing => node.removeAttribute \editable
        if @viewing and !@block.{}config["show-desc"] => node.classList.add \d-none
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
      "has-criteria": ({node}) ~> node.classList.toggle \d-none, !@block.[]criteria.length
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
