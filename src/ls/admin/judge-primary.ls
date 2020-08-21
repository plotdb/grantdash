({ldcvmgr, auth, sdbAdapter, error, admin-panel}) <- ldc.register \adminJudgePrimary,
<[ldcvmgr auth sdbAdapter error adminPanel]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @path = opt.path
  @brd = opt.brd
  @grp = null
  @view = {}
  @data = {}
  @obj = {}

  admin-panel.on \active, ({nav, name, panel}) ~>
    if !(nav == \grp-judge and name == \primary) => return
    @prepare!
      .then ~> @view.render!
      .catch error!

  @view = new ldView do
    root: @root
    init: do
      ldbar: ({node, local}) -> local.ldbar = new ldBar(node)
    action: do
      change: do
        choice: ({node}) ~>
          n = node.getAttribute(\data-name)
          @obj[n] = node.value
          @update!
          @get-progress!
          @view.render \primary-judge

      click: do
        switch: ({node}) ~>
          n = node.getAttribute(\data-name)
          node.classList.toggle \on
          @obj[n] = node.classList.contains \on
          @update!
          @get-progress!
          @view.render \primary-judge

    handler: do
      ldbar: ({local}) ~> local.ldbar.set(Math.floor(100 * (@data.progress or 0)))
      choice: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.value = @obj[n] or ''

      switch: ({node}) ~>
        n = node.getAttribute(\data-name)
        node.classList.toggle \on, !!@obj[n]

      "primary-user-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/user"
      "primary-all-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/all"
      "primary-judge": do
        list: ~> @data.[]users
        init: ({node, local, data}) ~>
          node.classList.toggle \d-none, false
          local.view = new ldView do
            root: node,
            context: data
            handler: do
              name: ({node, context}) ~>
                node.innerText = context.name
                #node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/user/#{context.key}"
              "progress-bar": ({node, context}) ->
                v = +node.getAttribute \data-name
                context.{}count
                node.style.width = "#{100 * (context.count[v] or 0) / context.count.total}%"
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
    ld$.fetch "/dash/api/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/all", {method: \GET}, {type: \json}
      .then ~>
        @data = data = it or {}
        @data.{}data.{}user
        @get-progress!
      .catch error!

  get-progress: ->
    data = @data
    filter-name = []
    if @obj["filter-criteria"] => filter-name.push \criteria
    prjs = data.[]prjs
    if filter-name.length =>
      prjs = (prjs or []).filter((p)~> filter-name.reduce(((a,b) -> a and p.{}system.{}badge[b]),true))
    total = ((data.[]users.length or 1) * (prjs.length or 1))
    done = 0
    data.[]users.map (u) ~>
      count = {0: 0, 1: 0, 2: 0, total: prjs.length or 1}
      obj = (data.data.user[u.key] or {}).{}prj
      prjs.map (p) -> if (v = (obj[p.key] or {}).v)? => count[v]++
      done := done + count.0 + (if @obj["option-type"] == \2way => 0 else count.1) + count.2
      u.count = count
    data.progress = done / total



  set-data: (grp) ->
    @grp = grp
    @prepare!
      .then ~> @view.render!
      .catch error!

Ctrl
