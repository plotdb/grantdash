({ldcvmgr, error, auth, prjFormCriteria}) <- ldc.register \prjFormBlock, <[ldcvmgr error auth prjFormCriteria]>, _

schema = prjFormCriteria.schema

settext = (n,v) -> if n.innerText != v => n.innerText = v

module = {}

module["form-budget"] = module-init: ->
  if !@viewing =>
    ld$.find(@root, '[ld="not is-view"]',0).classList.toggle \d-none, false
    return
  init-view = ~>
    @view.module = view = new ldView do
      root: @root
      context: {}
      action: click: do
        "new-row": ({node, context}) ->
          row = (if context.hot.getSelected! => that.0 else context.hot.countRows!) + 1
          context.hot.alter \insert_row, row, 1
      text: do
        value: ({node,context}) ->
          n = node.getAttribute(\data-name)
          return if isNaN(context[n]) => "???" else (context[n] or 0)
      handler: "is-view": ({node,names}) -> node.classList.toggle \d-none, (if \not in names => true else false)
      init: do
        "budget-root": ({node, context}) ~>
          head = [
            ['分類', '項目', '預估', '', '', '實際', '', '', '執行率']
            ['', '', '自籌', '補助', '總計', '自籌', '補助', '總計', '']
          ]
          get-data = ~> head ++ (@block.{}value.sheet or [["設備","( 範例 ) 電腦", 20000, 10000]])
          update = (changes) ~>
            context <<< {total: 0, subsidy: 0}
            data.slice 2 .filter(->it).map (d) ->
              d.4 = if isval(d.2) or isval(d.3) => (+d.2 + +d.3) else ''
              d.7 = if isval(d.5) or isval(d.6) => (+d.5 + +d.6) else ''
              context.total += +d.4
              context.subsidy += (if isval(d.3) => +d.3 else 0)
            context.percent = "#{Math.round(1000 * context.subsidy / (context.total or 1)) / 10}"
              .replace "(\.\d)\d*", "$1"
            if changes.length => hot.loadData data
            debounce 10 .then -> view.render \total
            @block.value.sheet = data.slice(2).filter(->it).map -> it.slice(0,4)
            @update!

          Handsontable.renderers.registerRenderer(
            \budget-renderer,
            (instance, td, row, col, prop, value, cellProperties) ->
              Handsontable.renderers.TextRenderer.apply @, arguments
              if row < 2 or col >= 4 => cellProperties.readOnly = true
              if row < 2 => return td.classList.add \head
              if col > 1 => return td.classList.add \value

          )

          isval = -> it? and "#{it}".length
          context.hot = hot = new Handsontable node, {
            data: data = get-data!
            filters: true
            dropdownMenu: true
            stretchH: \all
            rowHeights: 25
            wordWrap: false
            minRows: 10
            minCols: 9
            maxCols: 9
            fixedRowsTop: 2,
            mergeCells: [
              {row: 0, col: 0, colspan: 1, rowspan: 2}
              {row: 0, col: 1, colspan: 1, rowspan: 2}
              {row: 0, col: 2, colspan: 3, rowspan: 1}
              {row: 0, col: 5, colspan: 3, rowspan: 1}
              {row: 0, col: 8, colspan: 1, rowspan: 2}
            ]
            cells: (row, col) -> return {renderer: \budget-renderer}
            colWidths: [50,120,55,55,55,55,55,55]
            afterChange: (changes = []) ~> update changes
          }
          hot.updateSettings contextMenu: items:
            "add_row_above":
              name: "在上方新增一列"
              callback: (k,o) -> hot.alter \insert_row, (hot.getSelected!0.0), 1
            "add_row_below":
              name: "在下方新增一列"
              callback: (k,o) -> hot.alter \insert_row, (hot.getSelected!0.0 + 1), 1
            "del_row":
              name: "刪除列"
              callback: (k,o) ~>
                sel = hot.getSelected!0
                hot.alter \remove_row, (sel.0), 1
                @block.value.sheet.splice (sel.0), 1
                update [sel.0, sel.1]

  # TODO without this, handsontable calculates width incorrectly.
  wait-for-root-size = ~>
    if @root.getBoundingClientRect!width => init-view!
    else requestAnimationFrame wait-for-root-size
  requestAnimationFrame wait-for-root-size


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
          if files.filter(-> it.file and it.file.size >= 10485760).length => return ldcvmgr.toggle('error-413')
          if files.length + (@block.{}value.list or []).length > 10 => return ldcvmgr.toggle('error-413')

          fd = new FormData!

          for i from 0 til files.length => fd.append "file[]", files[i].file

          fd.append \prj, @prj.slug
          context.loading = true
          @view.module.render!
          auth.recaptcha.get!
            .then (recaptcha) ->
              fd.append \recaptcha, recaptcha
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
            .then (ret-files = []) ~>
              if !(ret-files and ret-files.length) => return
              cur-list = @block.{}value.[]list
              new-list = files
                .map (d,i) ->
                  ret-file = ret-files.filter(-> it.name == d.file.name).0
                  if !ret-file => return null
                  return {key: suuid!} <<< ret-file{name, size, type, ext, fn}
                .filter -> it
                .filter (f) -> cur-list.filter(-> it.name == f.name and it.fn == f.fn).length == 0
              if @block.name == \form-thumbnail => @block.value.list.splice 0
              @block.value.list ++= new-list
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
        init: ({node, data, local}) ~>
          node.classList.toggle \d-none, false
          local.view = new ldView do
            context: data
            root: node
            action: click: do
              delete: ({node, context}) ~>
                list = @block.value.[]list
                idx = list.indexOf(context)
                if ~idx => list.splice idx, 1
                view.render!
                @update!
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
                settext node, ((if data.other => '其它 / other' else data[node.getAttribute(\data-name)]) or '')


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
        node.value = (if \start in names => @block.{}value.start else @block.{}value.end) or ''
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
        local.tagify = new Tagify node, { delimiters: /[,.:;，。：；]/ }
        local.tagify.addTags(@block.{}value.list or [])

purpose = do
  map: do
    title:
      name: "標題", block: <[form-short-answer]>
      get: (v={}) -> v.content or ''
    description:
      name: "簡介", block: <[form-short-answer form-long-answer]>
      get: (v={}) -> v.content or ''
    thumb:
      name: "縮圖", block: <[form-thumbnail]>
      get: (v={}) -> (v.list or []).0 or ''
    tag:
      name: "標籤", block: <[form-radio]>
      get: (v={}) -> (v.list or [])
    category:
      name: "分類", block: <[form-tag]>
      get: (v={}) -> (v.list or []).0 or ''
    teamname:
      name: "團隊名", block: <[form-short-answer]>
      get: (v={}) -> v.content or ''
    uid:
      name: "統編", block: <[form-short-answer]>
      get: (v={}) -> v.content or ''
    email:
      name: "聯絡信箱", block: <[form-short-answer]>
      get: (v={}) -> v.content or ''
    budget:
      name: "預算", block: <[form-budget]>
      get: (v={}) ->
        b1 = (v.sheet or []).reduce(((a,b) -> a + +b.2),0)
        b2 = (v.sheet or []).reduce(((a,b) -> a + +b.3),0)
        return {self: b1, subsidy: b2}
  match: (p, b) -> b.name in (p.block or [])
purpose.list = [[k,v] for k,v of purpose.map].map -> {key: it.0} <<< it.1

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

    init: do
      "purpose-menu": ({node}) -> new Dropdown(node)
    handler: do
      purpose: do
        list: ~>
          ret = purpose.list.filter ~> purpose.match(it, @block)
          if !ret.length => ret = [{name: "無適合用途"}]
          ret
        action: click: ({node, data}) ~>
          if !purpose.match(data, @block) => return
          @form{}purpose[data.key] = v = if @form{}purpose[data.key] == @block.key => null else @block.key
          if v => for k of @form.purpose => if k != data.key and @form.purpose[k] == v => @form.purpose[k] = null
          if data.key in <[title description thumb tag category teamname]> => @block.{}config.public = true
          @update!
          @view.block.render!
          @hub.render!
        handler: ({node,data}) ~>
          ld$.find(node, '.flex-grow-1', 0).innerText = data.name
          node.classList.toggle \disabled, !purpose.match(data, @block)
          ld$.find(node, \i, 0).classList.toggle \d-none, @form{}purpose[data.key] != @block.key
      "purpose-menu": ({node}) ~>
        n = [{k,v} for k,v of @form{}purpose]
          .filter(~> it.v == @block.key)
          .map(-> purpose.map[it.k].name)
          .join(' / ')
        btn = ld$.find(node, '.btn', 0).innerText = if !n => '用途' else "#n"
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
        @block.[]criteria.push {type: prjFormCriteria.support[@block.name].0 or \number}
        @view.criteria.render!
    handler: do
      "has-criteria": ({node}) ~> node.classList.toggle \d-none, !@block.[]criteria.length
      criteria: do
        list: ~> @block.[]criteria
        action: click: ({node, data, evt, local}) ~>
          if !(n = ld$.parent(evt.target, '.dropdown-item', node)) => return
          if n.op => data.op = n.op
          if n.type and data.type != n.type =>
            data.type = n.type
            ops = (prjFormCriteria.schema.types[data.type] or {}).ops
            data.op = [k for k of (prjFormCriteria.schema.ops[ops] or {})].0 or '?'

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

Ctrl.purpose = purpose

return Ctrl
