({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeFinalUser,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null

  @view.local = view = new ldView do
    init-render: false
    root: @root
    action: do
      click: do
        sort: ({node}) ~> @sort node.getAttribute(\data-name), node.getAttribute(\data-value)
    text: do
      count: ({node}) ~> @progress[node.getAttribute(\data-name)] or 0
    handler: do
      "comment-name": ({node}) ~>
        if @active => node.innerText = @active.name or ''
      progress: ({node, names}) ~>
        p = @progress
        if \progress-bar in names =>
          n = node.getAttribute(\data-name)
          node.style.width = "#{100 * p[n] / p.total }%"
        else if \progress-percent in names =>
          node.innerText = Math.round(100 * p.done / p.total )
      "header-criteria": do
        list: ~> @criteria
        action: click: ({node, data}) ~> @sort \criteria, data.key
        handler: ({node, data}) ~> node.innerText = data.name
      project: do
        key: -> it.slug
        list: ~> @prjs
        init: ({node, local, data}) ~>
          root = node
          node.classList.remove \d-none
          local.view = new ldView do
            init-render: false
            root: node
            context: data
            action: click: do
              option: ({node, context}) ~>
                name = node.getAttribute(\data-name)
                @data.prj{}[context.slug].value = name
                local.view.render!
                @get-progress!
                @view.local.render <[progress]>
                @update debounced: 10

              name: ({node, context}) ->
                view.get("iframe").setAttribute \src, "/dash/prj/#{context.slug}?simple"
                view.get("iframe-placeholder").classList.add \d-none
                if @active-node => @active-node.classList.remove \active
                @active-node = root
                @active-node.classList.add \active
            text: do
              name: ({context}) -> context.name or ''
              ownername: ({context}) -> context.info.teamname or context.ownername or ''
              key: ({context}) -> context.key or ''
              budget: ({context}) ->
                if !context.info.budget => return ''
                return "#{Math.round(context.info.budget / 10000)}萬"
            handler: do
              "has-comment": ({node, context}) ~>
                node.classList.toggle \invisible, !@data.prj{}[context.slug].comment
              option: ({node, local, context}) ~>
                name = node.getAttribute(\data-name)
                cls = {accept: "bg-success", pending: "bg-warning", reject: "bg-danger"}[name]
                act = if (@data.prj{}[context.slug].value == name) => \add else \remove
                node.classList[act].apply node.classList, [cls, 'text-white']

        handler: ({node, local, data}) ~>
          local.view.setContext data
          @get-state data
          local.view.render!

  @

Ctrl.prototype = {} <<< judge-base.prototype <<< do

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @data.{}prj
    ret = for r of @data.{}value => for c of @data.value{}[r] => (@data.value[r][c] or 0)
    @sheet.populateFromArray 1, 3, ret
    @render!

  render: ->
    @get-progress!
    @view.base.render!
    @view.local.render!

  init-sheet: ->
    console.log "init sheet ... "
    @sheet = init-hot {
      root: edit
      afterChange: (changes = []) ~>
        # TODO make it more efficient
        changes.map ([row, prop, old, cur]) ~> @data.value{}[row - 1][prop - 3] = cur
        #console.log "after change total count: ", changes.length, "is dirty? ", dirty
        @update!
    }
    data = @prjs.map (d,i) -> [i, 0, d.name, 0, 0, 0, 0, 1, '']
    data = [["編號", "評論", "名稱", "創意", "技術", "設計", "總分", "排名", "評論"]] ++ data
    @sheet.load-data data
    @sheet.render!
    @render!

  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
      .then ~> @user = @global.user
      .then ~> @fetch-info!
      .then ~> @fetch-prjs!
      .then ~> @init-sheet!
      .then ~> @sharedb!
      .then ~> @getdoc!
      .then ~> @sort \name, null, false
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

init-hot = (opt) ->
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
    cells: (row, col) -> return {renderer: \myrenderer}
  } <<< opt
  hot
