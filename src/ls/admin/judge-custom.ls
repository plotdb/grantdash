({ldcvmgr, auth, sdbAdapter, error, admin-panel, adminEntry}) <- ldc.register \adminJudgeCustom,
<[ldcvmgr auth sdbAdapter error adminPanel adminEntry]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @path = opt.path
  @brd = opt.brd
  @grp = null
  @data = {}
  sample = ({key}) ->
    {
      name: "評選表", slug: suuid!, type: "score", view: \default
      enabled: false, anonymous: false, filter: '', key
    }
  @entry = new admin-entry {root, sample}
  @entry.on \toggle, ~> @view.render!
  @view = new ldView do
    root: root
    handler: do
      "user-link": ({node}) ~>
        active = @entry.obj.active
        if !(@grp and active) => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/custom/#{@entry.obj.active.slug}/user"
      "all-link": ({node}) ~>
        active = @entry.obj.active
        if !(@grp and active) => return
        node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/custom/#{@entry.obj.active.slug}/all"

  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-data: (grp) ->
    @grp = grp
    @view.render!
  set-path: ->
    @entry.set-path it
    @view.render!
  set-doc: -> @entry.set-doc it
  adapted: -> @entry.adapted!
  adapt: ({hub, path, type}) ->
    @entry.adapt {hub, path, type}
    @view.render!

Ctrl
