({ldcvmgr, auth, sdbAdapter, error, admin-panel}) <- ldc.register \adminJudgeInfo,
<[ldcvmgr auth sdbAdapter error adminPanel]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @grp = null
  @view = {}
  @prepare = {}
  @data = {}

  admin-panel.on \active, ({nav, name, panel}) ~>
    if !(nav == \grp-judge) => return
    if name == \criteria => @view.criteria.render!
    else if name == \primary =>
      @prepare.primary!
        .then ~> @view.primary.render!

  @view.criteria = new ldView do
    root: @root
    handler: do
      "criteria-user-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/user"
      "criteria-all-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/all"

  @prepare.primary = ~>
    ld$.fetch "/dash/api/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/user", {method: \GET}, {type: \json}
      .then ~>
        @data.primary = data = it
        @data.primary.users = data.users.map (u) ->
          count = {0: 0, 1: 0, 2: 0, total: 0}
          obj = (data.data.user[u.key] or {}).{}prj
          data.prjs.map (p) -> if (v = (obj[p.key] or {}).v)? => count[v]++
          u.count = count
          count.total = (count.0 + count.1 + count.2) or 1
          u

        @
      .catch error!

  @view.primary = new ldView do
    root: @root
    handler: do
      "primary-user-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/user"
      "primary-all-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/all"
      "primary-judge": do
        list: ~> @data.{}primary.[]users
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
                node.style.width = "#{100 * context.count[v] / context.count.total}%"

        handler: ({local, data}) ->
          local.view.setContext = data
          local.view.render!



  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  prepare: ->
  set-data: (grp) -> @grp = grp

Ctrl
