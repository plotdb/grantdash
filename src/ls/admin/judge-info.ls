({ldcvmgr, auth, sdbAdapter, error, admin-panel}) <- ldc.register \adminJudgeInfo,
<[ldcvmgr auth sdbAdapter error adminPanel]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @grp = null

  admin-panel.on \active, ({nav, name, panel}) ~>
    if nav == \grp-judge and name == \criteria => @view.render!

  @view = new ldView do
    root: @root
    handler: do
      "criteria-user-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/user"
      "criteria-all-link": ({node}) ~>
        if !@grp => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/criteria/all"
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-data: (grp) ->
    @grp = grp
    @view.render!

Ctrl
