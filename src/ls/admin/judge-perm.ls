({ldcvmgr, auth, sdbAdapter, error}) <- ldc.register \adminJudgePerm,
<[ldcvmgr auth sdbAdapter error]>, _

Ctrl = (opt = {})->
  @data = {list: []}
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @grp = null

  @view = new ldView do
    root: @root
    action:
      click: add: ~>
        name = @view.get("name").value
        email = @view.get("email").value
        if !(name and email) => return
        if @data.list.filter(-> (it.name == name or it.email == email)).length => return
        payload = {email, brd: @brd.slug, grp: @grp.key}
        @ldbtn.on!
        auth.recaptcha.get!
          .then (recaptcha) ->
            payload.recaptcha = recaptcha
            ld$.fetch "/dash/api/judgetoken", {method: \POST}, {json: payload, type: \json}
          .then (r = {}) ~>
            if !(r.id and r.token) => return Promise.reject new ldError(400)
            id = "#{r.id}:1"
            @data.list.push {name, email, token: r.token, id}
            @update!
            @view.render!
          .finally ~> @ldbtn.off!
          .catch error!
    init: do
      add: ({node}) ~> @ldbtn = new ldLoader { root: node }
    handler: do
      empty: ({node}) ~> node.classList.toggle \d-none, @data.[]list.length
      judges: do
        list: ~> @data.[]list
        init: ({node, data, local}) ~>
          node.classList.remove \d-none
          local.view = new ldView do
            root: node
            context: data
            action: click: do
              delete: ({context}) ~>
                @data.list.splice @data.list.indexOf(context), 1
                @view.render!
                @update!
            init: do
              copylink: ({node, local}) ->
                local.clipboard = new ClipboardJS(
                  node,
                  do
                    text: (trigger) ->
                      data = trigger.data
                      return "https://#{window.location.hostname}/dash/judgetoken/#{data.token}\##{data.email}"
                )
                local.clipboard.on \success, ->
                  clearTimeout local.h
                  node.classList.add \tip-on
                  local.h = setTimeout (-> node.classList.remove \tip-on), 1000
            handler:
              copylink: ({node, context}) -> node.data = context
            text:
              name: ({context}) -> context.name
              email: ({context}) -> context.email
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!

  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  update: -> @ops-out ~> @data
  set-data: (grp) ->
    @grp = grp
    @view.render!
  update-view: -> @view.render!
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    @data = JSON.parse JSON.stringify(data or {})
    @data.[]list
    @update-view!

Ctrl
