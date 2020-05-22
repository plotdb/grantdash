(->
  ldc.register \prjFormBlock, [], ->
    render-list = ({node, data, view-mode, update}) ->
      local-data = data
      if local-data.name == \form-checkpoint and view-mode =>
        if !data.{}value.list => data.{}value.list = local-data.[]data else local-data.data = data.value.list
        ld$.find(node, '.timeline-list', 0).addEventListener \input, -> update data
      update-list = ->
        ret = ld$.find(node, '[ld=list-input]')
          .map -> if it.checked => it.getAttribute(\data-name) else null
          .filter -> it
        local-data.{}value.list = ret
        local-data.{}value.other = !!ld$.find(node, '[ld=list-other-option]',0).checked
        update local-data


      node.{}view.list = view = new ldView do
        root: node
        action: do
          input: do
            "list-other": ({node}) ->
              local-data.{}value.other-value = node.value or ''
              update data
          click: do
            "list-add": ->
              local-data.[]data.push {title: "新項目", desc: "關於這個項目的描述 ... "}
              update data
              view.render!
            "list-other-option": ({node}) ->
              local-data.{}value.other = node.checked
              update-list!
        handler: do
          "list-other": ({node}) -> node.value = (local-data.{}value.other-value or '')
          "list-other-option": ({node}) -> node.setAttribute \name, "radio-#{data.key}"
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
                    "list-input": ({node}) -> update-list!
                init: "list-data": ({node}) ->
                  node.setAttribute \data-name, node.getAttribute \editable
                  if !editable and view-mode => node.removeAttribute \editable
                handler: do
                  "list-input": ({node}) ->
                    node.setAttribute \name, "radio-#{local-data.key}"
                    node.setAttribute \data-name, data.title
                  "list-data": ({node}) -> node.innerText = data[node.getAttribute(\data-name)] or ''
            render: ({node}) -> node.render!

    render-textarea = ({node, data, view-mode, update}) ->
      lc = {}
      view = new ldView do
        root: node
        action: input: do
          "use-markdown": ({node}) ->
            data.{}value.use-markdown = node.checked
            update data
            view.render!
          "input-field": ({node}) ->
            data.{}value.content = node.value
            update data
          "toggle-preview": ({node}) ->
            lc.preview = !!node.checked
            view.render!
        handler: do
          "input-field": ({node}) -> node.value = data.{}value.content or ''
          "preview-panel": ({node}) ->
            node.classList.toggle \d-none, !lc.preview
            if lc.preview => node.innerHTML = marked(data.{}value.content or '')
          "edit-panel": ({node}) -> node.classList.toggle \d-none, !!lc.preview
          "if-markdown": ({node}) -> node.classList.toggle \d-none, !data.{}value.use-markdown

    module = do
      "form-radio": render-list
      "form-checkbox": render-list
      "form-checkpoint": render-list
      "form-long-answer": render-textarea
      "form-short-answer": render-textarea

    # block sample data:
    #   {title: "提問的標題", desc: "提問的描述", config: {required: true}}

    lc = {}
    render = ({node, data, root-data, view-mode, update}) ->
      lc <<< {data, root-data}
      node.view.block.render!
    init = ({node, data, root-data, view-mode, update}) ->
      node.setAttribute \id, "block-#{data.key}"
      lc <<< {data, root-data}
      node.{}view.block = new ldView do
        root: node
        action:
          input: do
            title: ({node, evt}) ->
              lc.data.title = node.innerText
              update!
            desc: ({node, evt}) ->
              lc.data.desc = node.innerText
              update!
          click: do
            switch: ({node, evt}) ->
              node.classList.toggle \on
              lc.data.{}config[node.getAttribute(\data-name)] = node.classList.contains(\on)
              update!
            delete: ({node, evt}) ->
              lc.root-data.splice(lc.root-data.indexOf(data), 1)
              update!
            clone: ({node, evt}) ->
              new-data = JSON.parse(JSON.stringify(lc.data))
              new-data.key = Math.random!toString(36)substring(2)
              lc.root-data.splice(lc.root-data.indexOf(lc.data), 0, new-data )
              update!
        handler: do
          invalid: ({node}) ->
            is-valid = (!(lc.data.{}valid.result?) or lc.data.valid.result)
            if !is-valid => node.innerText = lc.data.valid.criteria.invalid or "這個欄位格式不符"
            node.classList.toggle \d-none, is-valid
          block: ({node}) ->
            is-valid = (!(lc.data.{}valid.result?) or lc.data.valid.result)
            node.classList.toggle \invalid, !is-valid
          title: ({node}) ->
            if node.innerText != lc.data.title => node.innerText = lc.data.title
            if view-mode => node.removeAttribute \editable
          desc: ({node}) ->
            if node.innerText != lc.data.desc => node.innerText = lc.data.desc
            if view-mode => node.removeAttribute \editable
          switch: ({node}) -> node.classList.toggle \on, !!lc.data.{}config[node.getAttribute(\data-name)]
          "edit-only": ({node}) -> if view-mode => node.remove!
          "list-input": ({node}) -> node.setAttribute \name, "input-#{lc.data.key}"
      if module[lc.data.name] => module[lc.data.name]({node, data: lc.data, view-mode, update})

    return {init, render, module}
)!
