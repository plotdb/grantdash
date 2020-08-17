({sdb-adapter, prj-view-simple, admin-panel, ldcvmgr}) <- ldc.register \adminPrjDetail, <[sdbAdapter prjViewSimple adminPanel ldcvmgr]>, _
Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prj = {}
  show-prj = ~>
    ldcvmgr.getdom \prj-view
      .then (dom) ~>
        if @view-prj-content => return
        @view-prj-content = new ldView do
          init-render: false
          root: dom
          handler: do
            iframe: ({node}) ~> node.setAttribute(\src, "/dash/prj/#{@prj.slug}?simple")
            "iframe-placeholder": ({node}) -> node.classList.add \d-none
      .then ~>
        @view-prj-content.render!
        ldcvmgr.toggle 'prj-view', true

  admin-panel.on \active, ({nav, name, panel}) ~>
    if name == \prj-view => show-prj!

  @view = new ldView do
    root: root
    text: do
      name: ~> @prj.name or '(未命名的提案)'
      ownername: ~> @prj.{}info.teamname or @prj.ownername or ''
      email: ~> @prj.owneremail or ''
    handler: do
      id: ({node}) ~> node.value = @prj.slug
      username: ({node}) ~>
        node.href = "/dash/user/#{@prj.owner}"
        node.innerText = @prj.ownername or ''
      avatar: ({node}) ~> node.style.background = "url(/s/avatar/#{@prj.owner}.png)"
    action: click: do
      "show-prj": -> show-prj!
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  set-prj: ->
    @prj = it
    @view.render!
  ops-in: ({data,ops,source}) ->

Ctrl
