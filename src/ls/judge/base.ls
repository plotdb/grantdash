({error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeBase,
<[error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @loader = loader
  @ <<< opt{brd, grp, user}

  ret = /brd\/([^/]+)\/grp\/([^/]+)\/judge\/([^/]+)\/([^/]+)$/.exec(window.location.href)
  if !ret => throw new ldError(1015)
  [brd,grp,type,lv] = ret.slice 1
  if !((type in <[criteria primary final]>) and (lv in <[user all]>)) => throw new ldError(1015)
  @ <<< { brd, grp, type, lv }

  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prjs = []
  @data = {}
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  init: ->
  render: ->
  _update: -> @ops-out ~> @data
  update: (opt={}) ->
    if !opt.debounced => @_update!
    else debounce opt.debounced .then ~> @_update!
  fetch-prjs: ->
    console.log "fetch prjs ... "
    # TODO unify prj list with general list api
    # Always fetch full list, but filter it in client
    ld$.fetch "/dash/api/brd/#{@brd}/grp/#{@grp}/judge-list", {method: \GET}, { type: \json}
      .then ~> @prjs = it
  sharedb: ->
    console.log "prepare sharedb ..."
    @sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
      path: '/dash/ws'
    @hub = new Hub({sdb})
    sdb.on \error, -> ldcvmgr.toggle \not-sync
    sdb.on \close, ~>
      ldcvmgr.toggle \offline-retry, true
      sdb.reconnect!
        .then ~> @getdoc!
        .then ~> @adapt {hub: @hub, path: []}
        .then -> console.log "reinitialized."
        .then ~> ldcvmgr.toggle \offline-retry, false
    sdb.ready!

  getdoc: ->
    console.log "get judge document ... "
    @hub.doc = null
    (doc) <~ @sdb.get({
      id: "brd/#{@brd}/grp/#{@grp}/judge/#{@type}"
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> {}
    }).then _
    @hub.doc = doc
    @adapt {hub: @hub, path: (if @user => ['user', @user] else [])}

  ops-in: ->

  auth: ->
    console.log "get user auth info ..."
    auth.get!then (g) ~> @global = g

return Ctrl
/*


clsmap = [
  <[i-check text-success]>
  <[i-circle text-secondary]>
  <[i-close text-danger]>
]
clsset = (node, val) ->
  newcls = clsmap[val]
  oldcls = Array.from(node.classList)
  if oldcls.length => node.classList.remove.apply node.classList, oldcls
  node.classList.add.apply node.classList, newcls

symbol = do
  accept: <[i-check text-success]>
  pending: <[i-circle text-secondary]>
  reject: <[i-close text-danger]>


  
*/
