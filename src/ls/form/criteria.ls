(->
  ldc.register 'prjFormCriteria', <[]>, ->
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

    # Criteria Data Sample:
    #  - [{type: 'number'}] 
    render = ({node, data}) ->
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
              get-type = -> data.type or schema.support[root-data.name][0] or \number
              get-op = ->
                ops = schema.ops[schema.types[get-type!].ops]
                v = [v for k,v of ops][0]
                return ops[data.op] or v or {name: ""}

              ld$.find(node, '.dropdown .dropdown-toggle').map -> new Dropdown(it)
              node.view = new ldView do
                root: node
                action: input: do
                  input1: ({node}) -> data.input1 = ld$.find(node, 'input', 0).value
                  input2: ({node}) -> data.input2 = ld$.find(node, 'input', 0).value
                  "input-invalid": ({node}) ->
                    data.invalid = node.value
                handler: do
                  input1: ({node}) -> ld$.find(node, 'input', 0).value = data.input1 or ''
                  input2: ({node}) ->
                    node.classList.toggle \d-none, ((get-op!field or 1) < 2)
                    ld$.find(node, 'input', 0).value = data.input2 or ''
                  "input-invalid": ({node}) -> node.value = data.invalid or ''
                  type: ({node}) ->
                    node.innerText = schema.types[get-type!].name
                  op: ({node}) -> node.innerHTML = get-op!name
                  "types": do
                    list: -> schema.support[root-data.name]
                    handler: ({node, data}) ->
                      node.innerText = schema.types[data].name
                      node.type = data
                  "ops": do
                    list: ->
                      [[k,v] for k,v of schema.ops[schema.types[get-type!].ops]]
                    handler: ({node, data}) ->
                      node.innerHTML = data.1.name
                      node.op = data.0
            handler: ({node, data}) -> if node.view => node.view.render!
    return {render, schema}
)!
