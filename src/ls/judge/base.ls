({notify, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeBase,
<[notify error loader auth ldcvmgr sdbAdapter]>, _

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
  @view = {}

  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  init: ->
  render: ->
  init-view: ->
    @view.base = new ldView do
      init-render: false
      root: @root
      text: do
        reviewer: ({node}) ~> if @user => @user.displayname
        "grp-name": ({node}) ~> "#{@brdinfo.name} / #{@grpinfo.info.name}"

  update: (opt={}) ->
    if !@_update => @_update = debounce ~> @ops-out ~> @data
    if !opt.debounced => @_update!now!
    else @_update.delay(opt.debounced)!
  fetch-prjs: ->
    console.log "fetch prjs ... "
    # TODO unify prj list with general list api
    # Always fetch full list, but filter it in client
    ld$.fetch "/dash/api/brd/#{@brd}/grp/#{@grp}/judge-list", {method: \GET}, { type: \json}
      .then ~>
        @prjs = it
        @prjs.map -> if it.name.length > 25 => it.name = it.name.substring(0,25) + "..."

  fetch-info: ->
    console.log "fetch info ... "
    ld$.fetch(
      "/dash/api/brd/#{@brd}/grp/#{@grp}/info"
      {method: \POST}, {json: {fields: <[criteria grade form]>}, type: \json}
    )
      .then (ret) ~>
        @brdinfo = ret.brd
        @grpinfo = ret.grp
        if !ret.grp.criteria => ldcvmgr.get('judge-criteria-missing')
        else @criteria = ret.grp.criteria.entries

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
        .then ~> @reconnect!
        .then -> console.log "reinitialized."
        .then ~> ldcvmgr.toggle \offline-retry, false
    sdb.ready!

  getdoc: ->
    console.log "get judge document ... "
    @hub.doc = null
    #if @user => id = "brd/#{@brd}/grp/#{@grp}/judge/#{@type}/user/#{@user.key}"
    #else id = "brd/#{@brd}/grp/#{@grp}/judge/#{@type}/"
    id = "brd/#{@brd}/grp/#{@grp}/judge/#{@type}/"
    (doc) <~ @sdb.get({
      id: id
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> {}
    }).then _
    @hub.doc = doc
    @adapt {hub: @hub, path: (if @user => ['user', @user.key] else [])}

  ops-in: ->

  auth: ->
    console.log "get user auth info ..."
    auth.get!then (g) ~> @global = g

  sort: (name, value, hint = true) ->
    if hint => loader.on!
    if name == \criteria => n = "#{name}-#{value.key}"
    else n = "#name#{if value? => ('-' + value) else ''}"
    if !@sort.inversed => @sort.inversed = {}
    dir = if @sort.inversed[n] => 1 else -1
    verbose = do
      name: {name: "名稱", state: "狀態", comment: "評論長度", shortlist: "入選標記", budget: "預算"}[name] or value
      dir: if dir > 0 => "順向" else "逆向"
    if name == \count =>
      verbose.name = "#{{0: "通過", 1: "待審", 2: "不符"}[+value]}的數量"
    else if name in <[primary primary-all]> =>
      value = +value
      verbose.name = "#{{0: "推薦", 1: "待審", 2: "汰除"}[+value]} 的結果"
    else if name == \criteria =>
      verbose.name = value.name
    if hint => notify.send \success, "重新將表格依 #{verbose.name} 做 #{verbose.dir} 排序"
    debounce 100 .then ~>
      @sort.inversed[n] = !@sort.inversed[n]
      statemap = [2 0 1]
      if name == \state =>
        @prjs.sort (a, b) ~> dir * (statemap[a.state] - statemap[b.state])
      else if name == \name =>
        @prjs.sort (a, b) -> return dir * (if a.name > b.name => 1 else if a.name < b.name => -1 else 0)
      else if name == \budget =>
        @prjs.sort (a,b) ~> dir * (a.info.budget - b.info.budget)
      else if name == \comment =>
        @prjs.sort (a,b) ~>
          dir * ((@data.prj{}[a.key].comment or '').length - (@data.prj{}[b.key].comment or '').length)
      else if name == \criteria =>
        @prjs.sort (a, b) ~>
          a = @data.prj{}[a.key].{}value[value.key]
          b = @data.prj{}[b.key].{}value[value.key]
          a = if a? => a else 1
          b = if b? => b else 1
          return dir * ( statemap[a] - statemap[b] )
      else if name == \primary-all =>
        @prjs.sort (a, b) ~> return dir * (a.count[value] or 0) - (b.count[value] or 0)
      else if name == \primary =>
        @prjs.sort (a, b) ~>
          a = if @data.prj{}[a.key].v == value => 1 else 0
          b = if @data.prj{}[b.key].v == value => 1 else 0
          return dir * (a - b)
      else if name == \count =>
        @prjs.sort (a, b) ~> dir * (a.count[][value].length - b.count[][value].length)
      else if name == \shortlist =>
        @prjs.sort (a, b) ~>
          a = if @data.prj{}[a.key].picked => 1 else 0
          b = if @data.prj{}[b.key].picked => 1 else 0
          return dir * (a - b)
      if hint => loader.off!
      @render!

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
