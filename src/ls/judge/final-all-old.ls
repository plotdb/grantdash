({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeFinalAll,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

typemap = {0: "accept", 1: "pending", 2: "reject"}
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

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null

  @view.local = view = new ldView do
    init-render: false
    root: @root

  @

Ctrl.prototype = {} <<< judge-base.prototype <<< do

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @data.{}prj

    ret = @prjs.map (p,i) ~>
      ret = [i]
      @judges.map (judge) ~>
        v = @data.user{}[judge.key]
        sum = @grade
          .map (g,i) ~> v.{}prj{}[p.key].{}v[g.key] or 0
          .reduce(((a,b) -> a + +b),0)
        ret.push sum
        ret.push 0
      return ret
    @judges.map (judge,i) ->
      idx = 2 * i + 1
      ret.sort (a,b) -> b[idx] - a[idx]
      last = idx: 0, value: null
      for i from 0 til ret.length =>
        if last.value != ret[i][idx] =>
          last.idx = i
          last.value = ret[i][idx]
        ret[i][idx + 1] = (last.idx + 1)

    ret.sort (a,b) -> a.0 - b.0
    ret = ret.map -> it.splice 1



    if !ret.length => ret = [[]]
    @sheet.populateFromArray 2, 3, ret

    @render!

  render: ->
    @get-progress!
    @view.base.render!
    @view.local.render!

  reconnect: ->
    @getdoc!
      .then ~> @sort \name, null, false
      .then ~> console.log "initied."

  init-sheet: ->
    console.log "init sheet ... "
    @sheet = init-hot {
      root: edit
      afterChange: (changes = []) ~>
    }

    @judges = [
      {name: "評審A",key: 1}
      {name: "評審B",key: 2}
      {name: "評審C",key: 3}
    ]
    @prjs.sort (a,b) -> a.key - b.key
    data = [
      (['','','評審'] ++ @judges.map(-> [it.name, '']).reduce(((a,b) -> a ++ b), []) ++ ['平均','優勝']),
      (['編號', '評論', '提案'] ++ @judges.map(->["分數","排名"]).reduce(((a,b) -> a ++ b),[]) ++ ['排名', '註記'])
    ] ++ @prjs.map (d,i) ~> [d.key, '', d.name] ++ (@grade.map -> 0) ++ [0, 1, '']

    @sheet.load-data data
    @sheet.render!
    @render!


  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
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


  get-progress: ->

ctrl = new Ctrl root: document.body
ctrl.init!

init-hot = (opt) ->
  Handsontable.renderers.registerRenderer \myrenderer, (instance, td, row, col, prop, value, cellProperties) ->
    Handsontable.renderers.TextRenderer.apply @, arguments
  hot = new Handsontable opt.root, {
    rowHeaders: true
    colHeaders: true
    filters: true
    dropdownMenu: true
    rowHeights: 25
    colWidths: [40,50,220]
    minRows: 50
    minCols: 15
    stretchH: \all
    fixedRowsTop: 2
    fixedColumnsLeft: 3
    cells: (row, col) -> return {renderer: \myrenderer}

  } <<< opt
  hot
