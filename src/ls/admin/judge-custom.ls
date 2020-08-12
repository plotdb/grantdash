({ldcvmgr, auth, sdbAdapter, error, admin-panel, adminEntry}) <- ldc.register \adminJudgeCustom,
<[ldcvmgr auth sdbAdapter error adminPanel adminEntry]>, _

Ctrl = (opt = {}) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @grp = null
  @data = {}
  sample = {name: "評選表", slug: suuid!, type: "score", enabled: false, anonymous: false, filter: ''}
  @entry = new admin-entry {root, sample}
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-data: (grp) -> @grp = grp
  adapt: ({hub, path, type}) ->
    #adbAdapter.interface.adapt.apply @, {hub, path, type}
    @entry.adapt {hub, path, type}

Ctrl
