# userSearch: search for user.
# picked:
#  - type ( either user, email or token )
#  - displayname
#  - key
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
# sample pug:
#  +scope("users")
#    .p-4.rounded.border.shadow-sm
#      .position-relative
#        input.form-control(ld="input",style="border-radius:.25em;border:1px solid #ddd",
#        placeholder="type user name ... ")
#        .d-none(ld="picked"): .position-absolute.w-100.h-100(style="top:0;left:0")
#          .d-flex.align-items-center.p-2.bg-white.form-control.bg-light
#            .bg-dark.rounded.mr-1(ld="picked-avatar",style="width:1em;height:1em")
#            .flex-grow-1(ld="picked-name")
#            i.i-close.text-danger.clickable(ld="clear")
#        .d-none.ld.ld-fade-in(ld="loading")
#          .position-absolute.m-auto.ld.ld-spin.ld-spinner(style="top:0;bottom:0;right:.5em")
#        .p-3.rounded.border.shadow-sm.d-none.ld.ld-float-ttb-in.bg-white.xp15.position-absolute.w-100(
#        ld="users",style="border-radius: 0 0 .5em .5em")
#          .d-flex.align-items-center.clickable(ld-each="user")
#            .bg-light.rounded.mr-1(ld="avatar",style="width:1em;height:1em")
#            div(ld="name")

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
        keyup: input: ({evt}) ~> if evt.keyCode == 27 => return @clear!
        input: input: ({node, local, evt}) ~> @search node.value
        click: clear: ~> @clear!
      handler: do
        picked: ({node}) ~> node.classList.toggle \d-none, !@picked
        "picked-avatar": ({node}) ~>
          if @picked =>
            node.style.backgroundImage = if @picked.type == \email => \none
            else "url(/s/avatar/#{@picked.key}.png)"
        "picked-name": ({node}) ~> if @picked => node.innerText = @picked.displayname
        clear: ({node}) ~> node.classList.toggle \d-none, !@picked
        loading: ({node}) ~> node.classList.toggle \d-none, !@loading
        users: ({node}) ~> node.classList.toggle \d-none, !(@users.length)
        user: do
          list: ~> @users or []
          action: click: ({node, data}) ~>
            @users = []
            type = if !data.empty => \user else if data.is-email => \email else null
            if type => @picked = {type} <<< data{displayname, key}
            else @picked = null
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
                  if !context.empty => return node.innerText = context.displayname
                  node.innerText = if context.empty => '找不到相似的用戶' else context.displayname
                  input = view.get('input').value
                  if !(context.is-email = is-email(input)) => return node.innerText = '找不到相關的用戶'
                  node.innerHTML = """
                  <span class="text-primary">透過 email 邀請 #{htmlentities(input)} 使用</span>
                  """
                  context.displayname = context.key = input


          render: ({local, data}) ->
            local.view.setContext data
            local.view.render!
  get: -> return JSON.parse(JSON.stringify(@picked))
  clear: ->
    @ <<< picked: null, users: []
    @view.get('input').value = ''
    @render!
  _search: (name) ->
    if !(name and name.length >= 1) => return @ <<< users: [], loading: false
    @ <<< users: [], loading: true
    @render!
    auth.get!
      .then ->
        payload = {name}
        ld$.fetch \/dash/api/account, {method: \POST}, {json: payload, type: \json}
      .then ~>
        if !(it and it.length) => @users = [{empty: true}]
        else @users = it
        @render!
      .finally ~> debounce 1000 .then ~> @loading = false
      .then ~> @render!
      .catch error

Ctrl
