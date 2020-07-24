save-locally = debounce ->
  payload = do
    form: ldform.values!
    list: lists
  window.localStorage.setItem \taicca-flagship-form-snapshot, JSON.stringify(payload)

load-locally = ->
  Promise.resolve!
    .then ->
      payload = JSON.parse(window.localStorage.getItem(\taicca-flagship-form-snapshot))
      ldform.values payload.form
      console.log payload.form
      lists <<< payload.list
      console.log lists
      view.render!
      ldform.check-all!

lists = do
  "past-sub": [{}]
  "perform": [{}]

view = new ldView do
  root: document.body
  text: do
    id: ({node}) ->
      group = "01"
      id = "001"
      "109-#{group}-#{id}"
  action: click: do
    "add-column": ({node}) ->
      lists[][node.getAttribute(\data-name)].push {}
      view.render \column
    submit: -> val = ldform.values!
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
    else if !v or (Array.isArray(v) and !v.length) => return 2
    return 0

load-locally!
