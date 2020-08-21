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
    init: do
      ldbar: ({node, local}) -> local.ldbar = new ldBar(node)
    action: click: do
      switch: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.classList.toggle \on
        @obj[n] = node.classList.contains \on
        @update!
        @get-progress!
        @view.render \final-judge

    handler: do
      ldbar: ({local}) ~> local.ldbar.set(Math.floor(100 * (@data.progress or 0)))
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
              "progress-bar": ({node, context}) -> node.style.width = "#{context.percent}%"
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
        @get-progress!
      .catch error!

  get-progress: ->
    data = @data
    filter-name = []
    if @obj["filter-criteria"] => filter-name.push \criteria
    if @obj["filter-primary"] => filter-name.push \shortlist
    prjs = data.[]prjs
    if filter-name.length =>
      prjs = (prjs or []).filter((p)~> filter-name.reduce(((a,b) -> a and p.{}system.{}badge[b]),true))
    total = (data.[]users.length or 1) * (prjs.length or 1)
    done = 0
    data.[]users.map (u) ~>
      ret = prjs.filter (p) ~>
        v = data.data.user{}[u.key].{}prj{}[p.key].{}v
        !@grp.{}grade.[]entries
          .filter (g) -> !((v[g.key])?) or v[g.key] == ''
          .length
      u.percent = ret.length * 100 / prjs.length
      done := done + ret.length
    data.progress = done / total

  set-data: (grp) ->
    @grp = grp
    @prepare!
      .then ~> @view.render!
      .catch error!

Ctrl
