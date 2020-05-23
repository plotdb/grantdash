<- ldc.register \prjFormBlock, [], _

settext = (n,v) -> if n.innerText != v => n.innerText = v
schema = do
  types:
    "number": {name: "數值", ops: "number"}
    "string": {name: "文字", ops: "string"}
    "length": {name: "長度", ops: "count"}
    "regex": {name: "正規式", ops: "regex"}
    "count": {name: "選項數", ops: "count"}
    "file-size": {name: "檔案大小", ops: "smaller"}
    "file-format": {name: "檔案格式", ops: "extension"}
    "file-count": {name: "檔案數量", ops: "count"}
  ops:
    extension: do
      "extension": { name: "副檔名" }
    regex: do
      "match": { name: "符合" }
      "not-match": { name: "不符" }
    count: do
      "gte": { name: '<div class="s mr-2">&#x2265;</div> 大於或等於' }
      "lte": { name: '<div class="s mr-2">&#x2264;</div> 小於或等於' }
      "eq": { name: '<div class="s mr-2">=</div> 等於' }
      "between": { name: '<div class="s mr-2">&#x223c;</div> 介於', field: 2 }
    string: do
      "include": { name: "包含" }
      "exclude": { name: "不包含" }
      "email": { name: "電子郵件位置" }
      "url": { name: "網址" }
    number: do
      "gte": { name: '<div class="s mr-2">&#x2265;</div> 大於或等於' }
      "lte": { name: '<div class="s mr-2">&#x2264;</div> 小於或等於' }
      "ge": { name: '<div class="s mr-2">&gt;</div> 大於' }
      "le": { name: '<div class="s mr-2">&lt;</div> 小於' }
      "eq": { name: '<div class="s mr-2">=</div> 等於' }
      "ne": { name: '<div class="s mr-2">&#x2260;</div> 不等於' }
      "between": { name: '<div class="s mr-2">&#x223c;</div> 介於', field: 2 }
    smaller: do
      "lte": { name: '<div class="s mr-2">&lt;</div> 小於' }
  support: 
    'form-short-answer': <[number string length regex]>
    'form-long-answer': <[string length regex]>
    'form-radio': []
    'form-checkbox': <[count]>
    'form-file': <[file-size file-formt file-count]>
    'form-budget': <[count]>
    'form-checkpoint': <[count]>


module = {}

module-list = module-init: ->
  if @block.name == \form-checkpoint and @viewing =>
    if !@block.{}value.list => @block.{}value.list = @block.[]data else @block.data = @block.value.list
    ld$.find(@root, '.timeline-list', 0).addEventListener \input, ~> @update!

  #value.list = [...]
  #value.other-value
  #value.other

  @view.module = view = new ldView do
    root: @root
    action: click: do
      "list-add": ~>
        @block.[]data.push {title: "新項目", desc: "關於這個項目的描述 ... "}
        @update!
        @render!
    handler: do
      list: do
        list: ~>
          @block.[]data
        init: ({node, data}) ~>
          editable = node.hasAttribute(\data-user-editable)
          if !editable and @viewing => node.removeAttribute \draggable
          node.view = view = new ldView do
            root: node
            action: do
              input: do
                "list-data": ({node}) ~>
                  data[node.getAttribute(\data-name)] = node.innerText
                  @update!
              click: do
                "list-delete": ({node, evt}) ~>
                  @block.data.splice @block.data.indexOf(data), 1
                  @update!
                  @render!
                  evt.stopPropagation!
            init: "list-data": ({node}) ~>
              node.setAttribute \data-name, node.getAttribute \editable
              if !editable and @viewing => node.removeAttribute \editable
            handler: do
              "list-delete": ({node}) ~> node.classList.toggle \d-none, @viewing
              "list-data": ({node}) -> settext node, data[node.getAttribute(\data-name)] or ''
          view.render!
        handler: ({node, data}) -> node.view.render!

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
        if @preview => node.innerHTML = marked(@block.{}value.content or '')
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
    handler: do
      invalid: ({node}) ~>
        is-valid = (!(@block.{}valid.result?) or @block.valid.result)
        if !is-valid => settext node, @block.valid.criteria.invalid or "這個欄位格式不符"
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
        action: click: ({node, data, evt}) ~>
          if !(n = ld$.parent(evt.target, '.dropdown-item', node)) => return
          if n.type => data.type = n.type
          if n.op => data.op = n.op
          @update!
          node.view.render!
        init: ({node, data}) ~> 
          get-type = ~> data.type or schema.support[@block.name][0] or \number
          get-op = ->
            ops = schema.ops[schema.types[get-type!].ops]
            v = [v for k,v of ops][0]
            return ops[data.op] or v or {name: ""}
          ld$.find(node, '.dropdown .dropdown-toggle').map -> new Dropdown(it)
          node.view = new ldView do
            root: node
            action: input: do
              input1: ({node}) ~>
                data.input1 = ld$.find(node, 'input', 0).value
                @update!
              input2: ({node}) ~>
                data.input2 = ld$.find(node, 'input', 0).value
                @update!
              "input-invalid": ({node}) ~>
                data.invalid = node.value
                @update!
            handler: do
              input1: ({node}) -> ld$.find(node, 'input', 0).value = data.input1 or ''
              input2: ({node}) ->
                node.classList.toggle \d-none, ((get-op!field or 1) < 2)
                ld$.find(node, 'input', 0).value = data.input2 or ''
              "input-invalid": ({node}) -> node.value = data.invalid or ''
              type: ({node}) ->
                settext node, schema.types[get-type!].name
              op: ({node}) -> node.innerHTML = get-op!name
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
        handler: ({node, data}) -> if node.view => node.view.render!

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
  update: -> 
    @hub.update @block
  delete: -> @hub.delete @block
  clone: -> @hub.clone @block

return Ctrl


