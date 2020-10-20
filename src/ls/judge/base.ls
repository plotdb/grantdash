({notify, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeBase,
<[notify error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @loader = loader
  @ <<< opt{brd, grp, slug, lv, round, type, user}
  brd = opt.brd
  grp = opt.grp
  slug = opt.slug
  lv = opt.lv
  round = opt.round
  type = opt.type
  user = opt.user

  ret = /brd\/([^/]+)\/grp\/([^/]+)\/judge\/custom\/([^/]+)\/([^/]+)(?:\/round\/([^/]+))?$/.exec(window.location.href)
  if ret =>
    [brd,grp,slug,lv,round] = ret.slice 1
    type = \custom
  else
    ret = /brd\/([^/]+)\/grp\/([^/]+)\/judge\/([^/]+)\/([^/]+)(?:\/round\/([^/]+))?$/.exec(window.location.href)
    if ret => [brd,grp,type,lv,round] = ret.slice 1
  if !((type in <[custom criteria primary final]>) and (lv in <[user all]>)) => throw new ldError(1015)
  @ <<< { brd, grp, type, lv, round, slug }

  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prjs = []
  @prjkeymap = {}
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
    if !@_update => @_update = debounce (opt) ~>
      if opt.ops => @ops-out opt.ops
      else @ops-out ~> @data
    if !opt.debounced => @_update(opt)now!
    else @_update.delay(opt.debounced)(opt)
  fetch-prjs: ->
    console.log "fetch prjs ... "
    # TODO unify prj list with general list api
    # Always fetch full list, but filter it in client
    ld$.fetch "/dash/api/brd/#{@brd}/grp/#{@grp}/judge-list/#{@type}", {method: \GET}, { type: \json }
      .then ~>
        @prjs = it
        if @type == \custom =>
          j = @grpinfo.{}judge.{}custom.[]entries.filter(~> it.slug == @slug).0 or {}
        else j = @grpinfo.{}judge{}[@type] or {}
        filter-name = []
        if j["filter-criteria"] or j.filter == 'criteria' => filter-name.push \criteria
        if j["filter-primary"] or j.filter == 'primary' => filter-name.push \shortlist
        if filter-name.length =>
          @prjs = (@prjs or []).filter((p)~> filter-name.reduce(((a,b) -> a and p.{}system.{}badge[b]),true))
        @prjs.map ~> @prjkeymap[it.key] = it
        @prjs.sort (a,b) -> a.key - b.key

  fetch-info: ->
    console.log "fetch info ... "
    ld$.fetch(
      "/dash/api/brd/#{@brd}/grp/#{@grp}/info"
      {method: \POST}, {json: {fields: <[criteria grade judge form judgePerm]>}, type: \json}
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
    if @slug => id = "#{id}slug/#{@slug}"
    if @round => id = "#{id}round/#{@round}"
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

  get-displayname: (list) ->
    if @usermap and !(list.filter(~>!@usermap[it]).length) => return Promise.resolve!
    payload = userkeys: list
    ld$.fetch "/dash/api/usermap/", {method: \PUT}, {json: payload, type: \json}
      .then (ret = []) ~>
        @usermap = {}
        ret.map ~> @usermap[it.key] = it
      .catch error!


  sort: (name, value, hint = true) ->
    if hint => loader.on!
    if name == \criteria => n = "#{name}-#{value.key}"
    else n = "#name#{if value? => ('-' + value) else ''}"
    if !@sort.inversed => @sort.inversed = {}
    dir = if @sort.inversed[n] => 1 else -1
    namemap = do
      name: "名稱", state: "狀態", comment: "評論長度", comments: "評論長度"
      shortlist: "入選標記", budget: "預算", total: "總分", rank: "排名"
      "criteria-result": "審查結果", "judge-rank": "評審排名", "judge-score": "評審分數"
      rate: "比例"
    verbose = do
      name: namemap[name] or value
      dir: if dir > 0 => "順向" else "逆向"
    if name == \count =>
      verbose.name = "#{{"accept": "通過", "pending": "待審", "reject": "不符"}[value]}的數量"
    else if name in <[primary primary-all]> =>
      value = +value
      verbose.name = "#{{0: "推薦", 1: "待審", 2: "汰除"}[+value]} 的結果"
    else if name == \criteria =>
      verbose.name = value.name
    else if name == \grade =>
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
      else if name == \comments =>
        @prjs.sort (a,b) ~>
          dir * JSON.stringify(a.comments or {}).length - JSON.stringify(b.comments or {}).length
      else if name == \comment =>
        @prjs.sort (a,b) ~>
          dir * ((@data.prj{}[a.key].comment or '').length - (@data.prj{}[b.key].comment or '').length)
      else if name == \criteria-result =>
        @prjs.sort (a, b) ~> dir * ((b.criteria.0 - b.criteria.2) - (a.criteria.0 - a.criteria.2))
      else if name == \criteria =>
        @prjs.sort (a, b) ~>
          a = @data.prj{}[a.key].{}value[value.key]
          b = @data.prj{}[b.key].{}value[value.key]
          a = if a? => a else 1
          b = if b? => b else 1
          return dir * ( statemap[a] - statemap[b] )
      else if name == \grade =>
        @prjs.sort (a, b) ~>
          a = @data.prj{}[a.key].{}v[value.key]
          b = @data.prj{}[b.key].{}v[value.key]
          a = if a? => a else 0
          b = if b? => b else 0
          return dir * ( b - a )
      else if name == \rate =>
        @prjs.sort (a,b) ~> dir * (b.rate - a.rate)
      else if name == \primary-all =>
        v = {"0": "accept", "1": "pending", "2": "reject"}[value]
        @prjs.sort (a, b) ~> return dir * (a.count[v] or 0) - (b.count[v] or 0)
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
      else if name == \total =>
        @prjs.sort (a, b) ~> dir * (a.total - b.total)
      else if name == \rank =>
        @prjs.sort (a, b) ~> dir * (a.rank - b.rank)
      else if name == \judge-score =>
        @prjs.sort (a, b) ~> dir * ((value.{}score[b.key] or 0) - (value.{}score[a.key] or 0))
      else if name == \judge-rank =>
        @prjs.sort (a, b) ~> dir * ((value.{}rank[b.key] or 0) - (value.{}rank[a.key] or 0))

      if hint => loader.off!
      @render!

return Ctrl
