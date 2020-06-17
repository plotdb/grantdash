({error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeFinalUser,
<[error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @loader = loader
  @ <<< opt{brd, grp, user}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prjs = []
  @data = {}
  @_update = debounce ~> @ops-out ~> @data
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  render: ->

  update: (opt={}) ->
    if !opt.debounced => @_update!now! else @_update!

  init-sheet: ->
    console.log "init sheet ... "
    @sheet = init-hot {
      afterChange: (changes = []) ~>
        # TODO make it more efficient
        changes.map ([row, prop, old, cur]) ~> @data.value{}[row - 1][prop - 3] = cur
        #console.log "after change total count: ", changes.length, "is dirty? ", dirty
        @update!
    }

  fetch: ->
    console.log "get project list ... "
    ld$.fetch '/dash/api/brd/test-brd/list', {method: \GET}, {type: \json}
      .then ~>
        @prjs = it
        data = @prjs.map (d,i) -> [i, 0, d.name, 0, 0, 0, 0, 1, '']
        data = [["編號", "評論", "名稱", "創意", "技術", "設計", "總分", "排名", "評論"]] ++ data
        @sheet.load-data data
        @sheet.render!
        @render!

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
        .then ~> @adapt {hub: @hub, path: ['user', @user.key]}
        .then -> console.log "admin initialized."
        .then ~> ldcvmgr.toggle \offline-retry, false
    sdb.ready!

  getdoc: ->
    console.log "get judge document ... "
    @hub.doc = null
    @sdb.get({
      id: "brd/#{@brd}/grp/#{@grp}/judge/final"
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> {}
    })
      .then (doc) ~>
        @hub.doc = doc
        doc.on \op, ~> @render!
        if @user => @adapt {hub: @hub, path: ['user', @user.key]}
        else @adapt {hub: @hub, path: []}
      .catch -> console.log "getdoc failed.", it

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    ret = for r of @data.{}value => for c of @data.value{}[r] => (@data.value[r][c] or 0)
    @sheet.populateFromArray 1, 3, ret
    @render!

auth.get!
  .then (g) ->
    ctrl = new Ctrl do
      user: g.user
      root: document.body
      brd: \test-brd
      grp: \4jUmMh07zZ05kl0Col03v-Bhu
    Promise.resolve!
      .then -> ctrl.init-sheet!
      .then -> ctrl.fetch!
      .then -> ctrl.sharedb!
      .then -> ctrl.getdoc!
      .then -> console.log "initied."

init-hot = (opt) ->
  dom = edit
  Handsontable.renderers.registerRenderer \myrenderer, (instance, td, row, col, prop, value, cellProperties) ->
    Handsontable.renderers.TextRenderer.apply @, arguments
  hot = new Handsontable dom, {
    rowHeaders: true
    colHeaders: true
    filters: true
    dropdownMenu: true
    rowHeights: 25
    colWidths: [40,50,180,50,50,50,50,50,250]
    minRows: 50
    minCols: 15
    stretchH: \all
    fixedRowsTop: 1
    fixedColumnsLeft: 3
    cells: (row, col) -> return {renderer: \myrenderer}
  } <<< opt
  hot
