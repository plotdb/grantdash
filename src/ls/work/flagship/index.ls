ldc.register \flagship-form, <[auth]>, ({auth}) ->
  save-locally = debounce ->
    payload = do
      form: ldform.values!
      list: lists
    window.localStorage.setItem \taicca-flagship-form-snapshot, JSON.stringify(payload)
    return payload

  load-locally = ->
    Promise.resolve!
      .then ->
        payload = JSON.parse(window.localStorage.getItem(\taicca-flagship-form-snapshot))
        if !payload => return
        ldform.values payload.form
        lists <<< payload.list
        view.render!
        ldform.check-all!

  ld$.find document.body, 'input[type=file]' .map (f) ->
    f.addEventListener \change, -> upload-file f.files.0
  get-signed-url = (opt={}) ->
    ld$.fetch "/dash/api/flagship/upload", {method: \POST}, {json: opt, type: \json}
  #file{name, size}
  upload-file = (file) ->
    get-signed-url {filename: file.name, size: file.size}
      .then ({signed-url, id}) ->
        ld$.xhr(
          signed-url,
          {method: \PUT, body: file, headers: {"Content-Type": file.type}},
          {no-default-headers: true, progress: -> console.log it}
        )

      .then -> console.log \done

  lists = do
    "past-sub": [{}]
    "perform": [{}]

  view = new ldView do
    root: document.body
    action: click: do
      "add-column": ({node}) ->
        lists[][node.getAttribute(\data-name)].push {}
        view.render \column
      submit: ->
        console.log ldform.ready!
        save-locally!
          .then -> console.log it
    text: do
      fill: ({node}) ->
        n = node.getAttribute(\data-name)
        if !ldform => return
        values = ldform.values!
        if values[n] => return that
        if n == \doc-year => return (new Date!).getYear! - 11
        if n == \doc-month => return (new Date!).getMonth! + 1
        if n == \doc-day => return (new Date!).getDate!
        if n == \docid => return "109-#{{'內容開發組':1, '產業策進組':2}[values.group]}-000"
        return ""
    handler: do
      toggler: ({node}) ->
        if !ldform => return
        v = ldform.values!
        name = node.getAttribute(\data-name)
        node.classList.toggle \d-none, (v[name] != "1")
      column: do
        list: ({node}) -> return lists[][node.getAttribute(\data-name)]
        init: ({node, data}) ->
          n = node.getAttribute(\data-name)
          get = ->
            data.{}value
            ld$.find(node, "[name]").map -> data.value[it.getAttribute(\name)] = it.value
            save-locally!
          ld$.find node, "input,textarea,select" .map (n) ->
            n.addEventListener \input, -> get!
            n.addEventListener \change, -> get!
          ldform = new ldForm do
            root: node
            verify: (name, value) ->
              if n == \perform =>
                if name == \brief and value.length >= 200 => return 2
                if name == \result and value.length >= 100 => return 2
              return if value => 0 else 2

        handler: ({node, data}) ->
          ld$.find(node, "input,textarea,select").map (f) ->
            f.value = data.{}value[f.getAttribute(\name)] or ''

  ldform = new ldForm do
    root: ld$.find \form, 0
    afterCheck: ->
      save-locally!
      if view => view.render \toggler
      if view => view.render!
    verify: (name, value, element) ->
      v = value or ''
      if name == \group1-category => ldform.check n: \group1-category-other
      if name == \group2-category => ldform.check n: \group2-category-other
      if name == \brief and (v.length < 300 or v.length > 500) => return 2
      else if name == \uid => return (if /[a-zA-Z][0-9]{9}/.exec(v) => 0 else 2)
      else if name == \found-reason => return (if v.length > 100 => 2 else 0)
      else if name == \comment => return 0
      else if name == \group1-category-other =>
        enabled = ("其它" in (ldform.values!["group1-category"] or []))
        return (if enabled and !v => 2 else if enabled => 0 else 1)
      else if name in <[abs-item abs-method abs-timeline abs-outcome]> =>
        if !(v and v.length < 200) => return 2
      else if !v or (Array.isArray(v) and !v.length) => return 2
      return 0

  load-locally!

ldc.app \flagship-form
