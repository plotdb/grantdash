(->
  ldc.register \prjFormBlock, [], ->
    render-list = ({node, data, view-mode, update}) ->
      local-data = data
      node.{}view.list = view = new ldView do
        root: node
        action: click: do
          "list-add": ->
            local-data.[]data.push {title: "某個點", desc: "某個點的描述"}
            view.render!
        handler: do
          list: do
            list: -> local-data.[]data
            init: ({node, data}) ->
              editable = node.hasAttribute(\data-user-editable)
              if !editable and view-mode => node.removeAttribute \draggable
              node.view = view = new ldView do
                root: node
                action: do
                  input: do
                    "list-data": ({node}) ->
                      data[node.getAttribute(\data-name)] = node.innerText
                    "list-input": ({node}) -> console.log \ok123
                init: "list-data": ({node}) ->
                  node.setAttribute \data-name, node.getAttribute \editable
                  if !editable and view-mode => node.removeAttribute \editable
                handler: do
                  "list-input": ({node}) -> node.setAttribute \name, local-data.title
                  "list-data": ({node}) -> node.innerText = data[node.getAttribute(\data-name)] or ''
            render: ({node}) -> node.render!

    module = do
      "form-radio": render-list
      "form-checkbox": render-list
      "form-checkpoint": render-list

    fill-answer = ({node, data, view-mode, update}) ->
        node.{}view.fill = new ldView do
          root: node
          action: input: do
            "input-field": ({node}) ->
              data.value = node.value
              update data
          handler: do
            "input-field": ({node}) -> node.value = data.value or ''

    fill = do
      "form-short-answer": fill-answer
      "form-long-answer": fill-answer



    # block sample data:
    #   {title: "提問的標題", desc: "提問的描述", config: {required: true}}
    render = ({node, data, view-mode, update}) ->
      node.{}view.block = new ldView do
        root: node
        action:
          input: do
            title: ({node, evt}) ->
              data.title = node.innerText
            desc: ({node, evt}) -> data.desc = node.innerText
          click: do
            switch: ({node, evt}) ->
              node.classList.toggle \on
              data.{}config[node.getAttribute(\data-name)] = node.classList.contains(\on)
            delete: ({node, evt}) ->
            clone: ({node, evt}) -> console.log data
        handler: do
          title: ({node}) ->
            node.innerText = data.title
            node.removeAttribute \editable
          desc: ({node}) ->
            node.innerText = data.desc
            node.removeAttribute \editable
          switch: ({node}) -> node.classList.toggle \on, !!data.{}config[node.getAttribute(\data-name)]
          "edit-only": ({node}) -> node.remove!
          "list-input": ({node}) -> node.setAttribute \name, "input-#{data.key}"
      if module[data.name] => module[data.name]({node, data, view-mode, update})
      if view-mode and fill[data.name] => fill[data.name]({node, data, view-mode, update})

    return {render, module}
)!
