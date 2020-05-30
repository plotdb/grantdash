# userSearch: search for user.
# ld:
#   clear - clear field
#   input - search input box
#   picked - picked user node. show if anyone picked
#   picked-avatar - picked user avatar
#   picked-name - picked user name
#   loading - indicate loading state when searching via ajax
#   users - root container for candidate user list
# ld-each:
#   user - user node for search result.
#     avatar - user avatar
#     name - user name

({auth, error}) <- ldc.register \userSearch, <[auth error]>, _

# option:
#   root
#   delay - delay to search after last type
Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @users = []
  @search = debounce (@opt.delay or 500), (n) ~> @_search n
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  render: -> @view.render!
  init: ->
    @view = view = new ldView do
      root: @root
      action: do
        input: input: ({node, local}) ~> @search node.value
        click: clear: ~> @clear!
      handler: do
        picked: ({node}) ~> node.classList.toggle \d-none, !@picked
        "picked-avatar": ({node}) ~> if @picked => node.style.backgroundImage = "url(/s/avatar/#{@picked.key}.png)"
        "picked-name": ({node}) ~> if @picked => node.innerText = @picked.displayname
        clear: ({node}) ~> node.classList.toggle \d-none, !@picked
        loading: ({node}) ~> node.classList.toggle \d-none, !@loading
        users: ({node}) ~> node.classList.toggle \d-none, !(@users.length)
        user: do
          list: ~> @users or []
          action: click: ({node, data}) ~>
            @users = []
            if !data.empty => @picked = data
            @view.get("input").value = ''
            @render!
          init: ({node, data, local}) ->
            local.view = new ldView do
              context: data
              root: node
              handler: do
                avatar: ({node, context}) ->
                  node.classList.toggle \d-none, !!context.empty
                  if context.key => node.style.backgroundImage = "url(/s/avatar/#{context.key}.png)"
                name: ({node, context}) ->
                  node.innerText = if context.empty => '找不到相似的用戶' else context.displayname
          render: ({local, data}) ->
            local.view.setContext data
            local.view.render!
  clear: ->
    @ <<< picked: null, users: []
    @render!
  _search: (name) ->
    if !(name and name.length >= 3) => return @ <<< users: [], loading: false
    @ <<< users: [], loading: true
    @render!
    auth.get!
      .then ->
        payload = {name}
        ld$.fetch \/d/account, {method: \POST}, {json: payload, type: \json}
      .then ~>
        if !(it and it.length) => @users = [{empty: true}]
        else @users = it
        @render!
      .finally ~> debounce 1000 .then ~> @loading = false
      .then ~> @render!
      .catch error

Ctrl
