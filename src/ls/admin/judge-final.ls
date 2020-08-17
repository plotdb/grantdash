({ldcvmgr, auth, sdbAdapter, error, admin-panel}) <- ldc.register \adminJudgeFinal,
<[ldcvmgr auth sdbAdapter error adminPanel]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @path = opt.path
  @brd = opt.brd
  @grp = null
  @data = {}
  @obj = {}

  admin-panel.on \active, ({nav, name, panel}) ~>
    if !(nav == \grp-judge and name == \final) => return
    @prepare!
      .then ~> @view.render!
      .catch error!

  @view = new ldView do
    root: @root
    action: click: do
      switch: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.classList.toggle \on
        @obj[n] = node.classList.contains \on
        @update!

    handler: do
      switch: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.classList.toggle \on, !!@obj[n]

      "final-user-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/final/user"
      "final-all-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/final/all"
      "final-judge": do
        list: ~> @data.[]users
        init: ({node, local, data}) ~>
          node.classList.toggle \d-none, false
          local.view = new ldView do
            root: node,
            context: data
            handler: do
              name: ({node, context}) ~>
                node.innerText = context.name
                #node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/final/user/#{context.key}"
              "progress-bar": ({node}) ->

        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!

  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data, ops, source}) ->
    if source => return
    @obj = JSON.parse(JSON.stringify(data or {}))
    @view.update!

  update: -> @ops-out ~> @obj

  prepare: ->
    ld$.fetch "/dash/api/brd/#{@brd.slug}/grp/#{@grp.key}/judge/final/all", {method: \GET}, {type: \json}
      .then ~>
        @data = data = it or {}
        @data.{}data.{}user
        prjs = data.prjs
        (data.users or []).map (u) ->
          prjs.filter (p) ->
            [v for k,v of data.data.user{}[u.key].{}prj{}[p.key].v].reduce(((a,b)->a + (b or 0)),0) > 0

      .catch error!

  set-data: (grp) ->
    @grp = grp
    @prepare!
      .then ~> @view.render!
      .catch error!

Ctrl
