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
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  set-prj: ->
    @prj = it
    @view.render!
    console.log @prj
  ops-in: ({data,ops,source}) ->

Ctrl
