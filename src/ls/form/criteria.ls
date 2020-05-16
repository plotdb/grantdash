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
      'budget': <[count]>
      'checkpoint': <[count]>

  criteria-render = ({node, data}) ->
    #criteria-data = [{type: 'number'}] 
    console.log data
    view = new ldView do
      root: node
      action: click: do
        add: ->
          data.push {type: \number}
          view.render!
      handler: do
        criteria: do
          list: -> data
          action: click: ({node, data, evt}) ->
            if !(n = ld$.parent(evt.target, '.dropdown-item', node)) => return
            if n.type => data.type = n.type
            if n.op => data.op = n.op
            node.view.render!

          init: ({node, data}) -> 
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
                input2: ({node}) -> ld$.find(node, 'input', 0).value = data.input2 or ''
                invalid: ({node}) -> node.value = data.invalid or ''
                type: ({node}) ->
                  type = data.type or 'number'
                  node.innerText = criteria.types[type].name
                op: ({node}) ->
                  ops = criteria.ops[criteria.types[data.type or 'number'].ops]
                  v = [v for k,v of ops][0]
                  node.innerHTML = ops[data.op] and ops[data.op].name or (v and v.name) or ""
                "types": do
                  list: ->
                    criteria.support["form-short-answer"]
                  handler: ({node, data}) ->
                    node.innerText = criteria.types[data].name
                    node.type = data
                "ops": do
                  list: ->
                    [[k,v] for k,v of criteria.ops[criteria.types[data.type or 'number'].ops]]
                  handler: ({node, data}) ->
                    node.innerHTML = data.1.name
                    node.op = data.0
          handler: ({node, data}) -> if node.view => node.view.render!
    view.render!

  checkpoint-data = [{title: "第一個點", description: "第一個點的描述"}]
  view2 = new ldView do
    root: '[data-name=form-checkpoint]'
    action: click: do
      add: ->
        checkpoint-data.push {title: "某個點", description: "某個點的描述"}
        view2.render!
    handler: do
      checkpoint: do
        list: -> checkpoint-data
        init: ({node, data}) ->
          node.view = view = new ldView do
            root: node
            action: input: do
              "timeline-title": ({node}) -> data.title = node.innerText
              "timeline-description": ({node}) -> data.description = node.innerText
            handler: do
              "timeline-title": ({node}) ->
                node.innerText = data.title
              "timeline-description": ({node}) -> node.innerText = data.description
        render: ({node}) -> node.render!


  block-renderer = ({node, data}) ->
    #data = {title: "提問的標題", description: "提問的描述", config: {required: true}}
    view3 = new ldView do
      root: node
      action:
        input: do
          title: ({node, evt}) ->
            console.log \here
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
      name: "form-short-answer", title: "提問的標題1", description: "提問的描述",
      config: {required: true}, criteria: [{type: \number}]
    }
    {
      name: "form-long-answer", title: "提問的標題2", description: "提問的描述",
      config: {required: true}, criteria: [{type: \number}]
    }
    {
      name: "form-checkpoint", title: "提問的標題3", description: "提問的描述",
      config: {required: true}, criteria: [{type: \number}]
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
          criteria-render {node, data: data.{}criteria}


  bmgr = do
    get: -> 
  reb = new reblock do
    root: '#form'
    block-manager: bmgr
    action: do
      afterMoveNode: ({src, des, ib}) ->
        if src.getAttribute(\ld) == \checkpoint =>
          checkpoint-data := Array.from(src.parentNode.childNodes)
            .filter(->it.nodeType == 1 )
            .map(-> it._data)
            .filter(->it)
          view2.render!

)!
