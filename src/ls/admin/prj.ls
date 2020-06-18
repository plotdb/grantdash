({sdb-adapter, prj-view-simple}) <- ldc.register \adminPrjDetail, <[sdbAdapter prjViewSimple]>, _
Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prj = {}
  @view = new ldView do
    root: root
    text: do
      name: ~> @prj.name or ''
      ownername: ~> @prj.{}info.teamname or @prj.ownername or ''
      email: ~> @prj.owneremail or ''
    handler: do
      id: ({node}) ~> node.value = @prj.slug
      username: ({node}) ~>
        node.href = "/dash/user/#{@prj.owner}"
        node.innerText = @prj.ownername or ''
      avatar: ({node}) ~> node.style.background = "url(/s/avatar/#{@prj.owner}.png)"
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  set-prj: ->
    @prj = it
    @view.render!
    console.log @prj
  ops-in: ({data,ops,source}) ->

Ctrl
