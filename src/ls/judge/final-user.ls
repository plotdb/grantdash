({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeFinalUser,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null
  @sort-dir = {}

  @view.local = view = new ldView do
    init-render: false
    root: @root
    handler: do
      progress: ({node, names}) ~>
        p = @progress
        if \progress-bar in names =>
          n = node.getAttribute(\data-name)
          node.style.width = "#{100 * p[n] / p.total }%"
        else if \progress-percent in names =>
          node.innerText = Math.round(100 * p.done / p.total )

  @

Ctrl.prototype = {} <<< judge-base.prototype <<< do

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @data.{}prj
    ret = @prjs.map (p,i) ~> @grade.map (g,i) ~> @data.prj{}[p.key].{}v[g.key] or 0
    if !ret.length => ret = [[]]
    @sheet.populateFromArray 1, 3, ret
    @render!

  render: ->
    @get-progress!
    @view.base.render!
    @view.local.render!
    @sheet

  init-sheet: ->
    console.log "init sheet ... "
    @sheet = init-hot {
      root: edit
      afterChange: (changes = []) ~>
        ops = []
        sums = []
        data = if @sheet => @sheet.getSourceData! else [[]]
        changes.map ([row, prop, old, cur]) ~>
          if !(row > 0 and prop > 2 and prop < 3 + @grade.length) => return
          pk = @prjkeymap[data[row][0]].key
          gk = @grade[prop - 3].key
          old = @data.prj{}[pk].{}v[gk]
          @data.prj{}[pk].{}v[gk] = cur
          sum = @grade
            .map (g) ~> @data.prj{}[pk].{}v[g.key]
            .reduce(((a,b) -> a + +b), 0)
          sums.push [row, 3 + @grade.length, sum]
          ops.push {p: ['prj', pk, 'v', gk], od: old}
          ops.push {p: ['prj', pk, 'v', gk], oi: cur}
        if @sheet and sums.length =>
          @sheet.setDataAtCell sums
          data = @sheet.getSourceData 1, 3 + @grade.length, @prjs.length, 3 + @grade.length
          data = data.map (d, i) -> [d.0, i + 1]
          data.sort (a,b) -> b.0 - a.0
          rank = []
          data.map (v,i) ~> rank.push [v.1, 3 + @grade.length + 1, i + 1]
          @sheet.setDataAtCell rank

        @update {ops}
    }, {grade: @grade}

    @sheet.addHook \beforeOnCellMouseDown, (e, coord) ~>
      if !@sheet or coord.row >= 0 => return
      col = coord.col
      data = if @sheet => @sheet.getSourceData! else [[]]
      head = data.splice(0, 1).0
      @sort-dir[col] = dir = 1 - (@sort-dir[col] or 0)
      data.sort (a,b) -> ( dir * 2 - 1 ) * (if b[col] > a[col] => 1 else if b[col] < a[col] => -1 else 0)
      data.splice 0, 0, head
      @sheet.load-data data


    @prjs.sort (a,b) -> a.key - b.key
    data = @prjs.map (d,i) ~> [d.key, '', d.name] ++ (@grade.map -> 0) ++ [0, 1, '']
    data = [
      ["編號", "評論", "名稱"] ++ (@grade.map -> it.name) ++ ["總分", "排名", "評論"]
    ] ++ data
    @sheet.load-data data
    @sheet.render!
    @render!

  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
      .then ~> @user = @global.user
      .then ~> @fetch-info!
      .then ~>
        if !@grpinfo.grade => ldcvmgr.get('judge-grade-missing')
        else @grade = @grpinfo.grade.entries
      .then ~> @fetch-prjs!
      .then ~> @init-sheet!
      .then ~> @sharedb!
      .then ~> @getdoc!
      .then ~> console.log "initied."
      .catch error!

  get-state: (context) ->
    context.state = @criteria.reduce(
      (a, b) ~>
        v = @data.prj{}[context.slug].{}value[b.key]
        Math.max(a, if v? => v else 1)
      0
    )

  get-progress: ->
    @progress = ret = {done: 0, accept: 0, pending: 0, reject: 0, total: (@prjs.length or 1)}
    @prjs.map (p) ~> if (v = @data.prj{}[p.slug].value) => ret[v]++
    ret.done = (ret.accept + ret.pending + ret.reject) or 0

ctrl = new Ctrl root: document.body
ctrl.init!

init-hot = (opt, opt-judge) ->
  Handsontable.renderers.registerRenderer \myrenderer, (instance, td, row, col, prop, value, cellProperties) ->
    Handsontable.renderers.TextRenderer.apply @, arguments
  hot = new Handsontable opt.root, {
    rowHeaders: true
    colHeaders: true
    filters: true
    dropdownMenu: true
    rowHeights: 25
    colWidths: [40,50,220,50,50,50,50,50,250]
    minRows: 50
    minCols: 15
    stretchH: \all
    fixedRowsTop: 1
    fixedColumnsLeft: 3
    cells: (row, col, prop) ->
      readOnly = if row < 1 or col < 3 or col == opt-judge.grade.length + 4 => true else false
      return {renderer: \myrenderer, readOnly}
  } <<< opt
  hot
