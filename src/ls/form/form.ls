(->
  criteria = do
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
        "ge": { name: '<div class="s mr-2">&gt;</div> 大於' }

    support: 
      'form-short-answer': <[number string length regex]>
      'form-long-answer': <[string length regex]>
      'form-radio': []
      'form-checkbox': <[count]>
      'form-file': <[file-size file-formt file-count]>
      'form-budget': <[count]>
      'form-checkpoint': <[count]>

  criteria-render = ({node, data}) ->
    #criteria-data = [{type: 'number'}] 
    root-data = data
    node.{}view.criteria = view = new ldView do
      root: node
      action: click: do
        add: ->
          data.[]criteria.push {type: \number}
          view.render!
      handler: do
        criteria: do
          list: -> data.[]criteria
          action: click: ({node, data, evt}) ->
            if !(n = ld$.parent(evt.target, '.dropdown-item', node)) => return
            if n.type => data.type = n.type
            if n.op => data.op = n.op
            node.view.render!

          init: ({node, data}) -> 
            get-type = -> data.type or criteria.support[root-data.name][0] or \number
            get-op = ->
              ops = criteria.ops[criteria.types[get-type!].ops]
              v = [v for k,v of ops][0]
              return ops[data.op] or v or {name: ""}

            ld$.find(node, '.dropdown .dropdown-toggle').map -> new Dropdown(it)
            node.view = new ldView do
              root: node
              action: input: do
                input1: ({node}) -> data.input1 = ld$.find(node, 'input', 0).value
                input2: ({node}) -> data.input2 = ld$.find(node, 'input', 0).value
                invalid: ({node}) ->
                  data.invalid = node.value
              handler: do
                input1: ({node}) -> ld$.find(node, 'input', 0).value = data.input1 or ''
                input2: ({node}) ->
                  node.classList.toggle \d-none, ((get-op!field or 1) < 2)
                  ld$.find(node, 'input', 0).value = data.input2 or ''
                invalid: ({node}) -> node.value = data.invalid or ''
                type: ({node}) ->
                  node.innerText = criteria.types[get-type!].name
                op: ({node}) -> node.innerHTML = get-op!name
                "types": do
                  list: -> criteria.support[root-data.name]
                  handler: ({node, data}) ->
                    node.innerText = criteria.types[data].name
                    node.type = data
                "ops": do
                  list: ->
                    [[k,v] for k,v of criteria.ops[criteria.types[get-type!].ops]]
                  handler: ({node, data}) ->
                    node.innerHTML = data.1.name
                    node.op = data.0
          handler: ({node, data}) -> if node.view => node.view.render!

  render-list = ({node, data}) ->
    local-data = data.[]data
    node.{}view.list = view = new ldView do
      root: node
      action: click: do
        "list-add": ->
          local-data.push {title: "某個點", description: "某個點的描述"}
          view.render!
      handler: do
        list: do
          list: -> local-data
          init: ({node, data}) ->
            node.view = view = new ldView do
              root: node
              action: input: do
                "list-title": ({node}) -> data.title = node.innerText
                "list-description": ({node}) -> data.description = node.innerText
              handler: do
                "list-title": ({node}) ->
                  node.innerText = data.title
                "list-description": ({node}) -> node.innerText = data.description
          render: ({node}) -> node.render!

  form-modules = do
    "form-radio": render-list
    "form-checkbox": render-list
    "form-checkpoint": render-list


  block-renderer = ({node, data}) ->
    #data = {title: "提問的標題", description: "提問的描述", config: {required: true}}
    node.{}view.block = new ldView do
      root: node
      action:
        input: do
          title: ({node, evt}) ->
            data.title = node.innerText
          description: ({node, evt}) -> data.description = node.innerText
        click: do
          switch: ({node, evt}) ->
            node.classList.toggle \on
            data.{}config[node.getAttribute(\data-name)] = node.classList.contains(\on)
          delete: ({node, evt}) ->
          clone: ({node, evt}) -> console.log data
      handler: do
        title: ({node}) -> node.innerText = data.title
        description: ({node}) -> node.innerText = data.description
        switch: ({node}) -> node.classList.toggle \on, !!data.{}config[node.getAttribute(\data-name)]


  blocks = [
    {
      name: "form-short-answer", title: "提問的標題1", description: "提問的描述"
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-long-answer", title: "提問的標題2", description: "提問的描述"
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-checkpoint", title: "提問的標題3", description: "提問的描述"
      data: [{title: "第一個點", description: "第一個點的描述"}]
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-radio", title: "提問的標題3", description: "提問的描述"
      data: [{title: "第一個點", description: "第一個點的描述"}]
      config: {required: true}, criteria: [{}]
    }
    {
      name: "form-checkbox", title: "提問的標題3", description: "提問的描述"
      data: [{title: "第一個點", description: "第一個點的描述"}]
      config: {required: true}, criteria: [{}]
    }
  ]

  blocks-view = new ldView do
    root: '#form'
    handler:
      block: do
        list: -> blocks
        init: ({node, data}) ->
          sample = ld$.find("[data-name=#{data.name}]", 0).cloneNode(true)
          node.innerHTML = ""
          node.appendChild sample
          block-renderer {node, data}
          criteria-render {node, data: data}
          if form-modules[data.name] => that({node, data})


  bmgr = do
    get: -> 
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
