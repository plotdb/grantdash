({ldcvmgr, auth, sdbAdapter, error, admin-panel}) <- ldc.register \adminJudgeCriteria,
<[ldcvmgr auth sdbAdapter error adminPanel]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @grp = null
  @data = {}

  admin-panel.on \active, ({nav, name, panel}) ~>
    if !(nav == \grp-judge and name == \criteria) => return
    @prepare!

  @view = new ldView do
    root: @root
    init: do
      ldbar: ({node, local}) -> local.ldbar = new ldBar(node)
    action: click: sync: ~> @prepare!
    handler: do
      ldbar: ({local}) ~> local.ldbar.set(Math.floor(100 * (@data.progress or 0)))
      "criteria-user-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/user"
      "criteria-all-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/all"
      "criteria-judge": do
        key: -> it.key
        list: ~> @data.[]users
        init: ({node, local, data}) ~>
          node.classList.toggle \d-none, false
          local.view = new ldView do
            root: node,
            context: data
            handler: do
              name: ({node, context}) ~>
                node.innerText = context.displayname
                #node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/user/#{context.key}"
              "progress-bar": ({node, context}) ->
                v = +node.getAttribute \data-name
                node.style.width = "#{100 * context.count[v] / context.count.total}%"
              percent: ({node, context}) ->
                c = context.count or {}
                percent = Math.floor(100 * (c.0 + c.2) / c.total)
                node.innerText = "#{percent}%"
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!

  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  prepare: ->
    ld$.fetch "/dash/api/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/all", {method: \GET}, {type: \json}
      .then ~>
        {prjs, users, data, criteria} = it{prjs, users, data, criteria}
        [prjs, users, data, criteria] = [prjs or [], users or [], data or {}, criteria or {entries: []}]
        @data.users = users
        count = {0: 0, 1: 0, 2: 0, total: prjs.length}
        users.map (u) -> u.count = {0: 0, 1: 0, 2: 0, total: prjs.length}
        prjs.map (p) ->
          max-value = -1
          users.map (u) ->
            v = data.user[u.key].prj{}[p.key].{}v
            state = criteria.entries.reduce(((a,b) -> Math.max(a, if v[b.key]? => v[b.key] else 1)), 0)
            p.state = state
            u.count[state]++
            if (state == 0 or state == 2) and state > max-value => max-value := state
          if max-value == -1 => max-value = 1
          count[max-value]++
        @data.progress = ( count.0 + count.2 ) / count.total
      .then ~> @view.render!
      .catch error!

  set-data: (grp) -> @grp = grp

Ctrl
