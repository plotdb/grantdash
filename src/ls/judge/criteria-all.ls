({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeCriteriaAll,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null

  @ldcv = do
    comment: new ldCover root: ld$.find(@root, '[ld=comment-ldcv]', 0)
    detail: new ldCover root: ld$.find(@root, '[ld=detail-ldcv]', 0)
    criteria: new ldCover root: ld$.find(@root, '[ld=criteria-ldcv]', 0)

  @view = view = new ldView do
    init-render: false
    root: @root

    action: do
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
        sort: ({node}) ~> @sort node.getAttribute(\data-name), node.getAttribute(\data-value)
    text: do
      count: ({node}) ~> @progress[node.getAttribute(\data-name)] or 0
      reviewer: ({node}) ~> if @user => @user.displayname
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
              detail: ({node, context}) ~> @ldcv.detail.toggle!
              comment: ({node, context}) ~>
                @active = context
                view.get(\comment).value = (@data.prj{}[@active.slug].comment or '')
                @ldcv.comment.toggle!
                @view.render \comment-name
              name: ({node, context}) ->
                view.get("iframe").setAttribute \src, "/prj/#{context.slug}?simple"
                view.get("iframe-placeholder").classList.add \d-none
                if @active-node => @active-node.classList.remove \active
                @active-node = root
                @active-node.classList.add \active
            text: do
              count: ({node, context}) ->
                n = node.getAttribute(\data-name)
                return context.count[n].length or '0'
            handler: do
              "has-comment": ({node, context}) ~>
                node.classList.toggle \invisible, !@data.prj{}[context.slug].comment
              state: ({node, context}) ~>
                span = ld$.find(node, 'span',0)
                icon = ld$.find(node, 'i',0)
                state = context.state
                icon.classList.remove.apply icon.classList, icon.classList
                icon.classList.add <[i-check i-circle i-close]>[state]
                node.classList.remove.apply node.classList, node.classList
                cls = [<[bg-success text-white]> <[bg-light text-secondary]> <[bg-danger text-white]>]
                node.classList.add.apply node.classList, (cls[state] ++ <[rounded]>)
                span.innerText = <[通過 待查 不符]>[state]
              name: ({node, context}) ->
                node.innerText = context.name
              key: ({node, context}) -> node.innerText = context.key or ''

        handler: ({node, local, data}) ~>
          local.view.setContext data
          @get-count data
          local.view.render!

  @

Ctrl.prototype = {} <<< judge-base.prototype <<< do

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @data.{}prj
    @render!

  render: ->
    @get-progress!
    @view.render!

  fetch-criteria: ->
    console.log "fetch criteria ... "
    @criteria = [{name: "開源", key: 1}, {name: "協作", key: 2}, {name: "參與", key: 3}]

  init: ->
    Promise.resolve!
      .then ~> ctrl.auth!
      .then ~> ctrl.fetch-criteria!
      .then ~> ctrl.fetch-prjs!
      .then ~> ctrl.sharedb!
      .then ~> ctrl.getdoc!
      .then ~> @sort \name, null, false
      .then ~> console.log "initied."
      .catch error

  sort: (name, value, hint = true) ->
    if hint => loader.on!
    n = "#name#{if value? => ('-' + value) else ''}"
    if !@sort.inversed => @sort.inversed = {}
    dir = if @sort.inversed[n] => 1 else -1
    verbose = do
      name: {name: "名稱", state: "狀態", comment: "評論長度"}[name] or value
      dir: if dir > 0 => "順向" else "逆向"
    if name == \count => verbose.name = "#{{accept: "通過", pending: "待審", reject: "不符"}[value]}的數量"
    if hint => notify.send \success, "重新將表格依 #{verbose.name} 做 #{verbose.dir} 排序"
    debounce 100 .then ~>
      @sort.inversed[n] = !@sort.inversed[n]
      statemap = [2 0 1]
      if name == \state =>
        @prjs.sort (a, b) ~> dir * (statemap[a.state] - statemap[b.state])
      else if name == \name =>
        @prjs.sort (a, b) -> return dir * (if a.name > b.name => 1 else if a.name < b.name => -1 else 0)
      else if name == \comment =>
        @prjs.sort (a,b) ~>
          dir * ((@data.prj{}[a.slug].comment or '').length - (@data.prj{}[b.slug].comment or '').length)
      else if name == \criteria =>
        @prjs.sort (a, b) ~>
          a = @data.prj{}[a.slug].{}value[value]
          b = @data.prj{}[b.slug].{}value[value]
          a = if a? => a else 1
          b = if b? => b else 1
          return dir * ( statemap[a] - statemap[b] )
      else if name == \count =>
        @prjs.sort (a, b) ~> dir * (a.count[][value].length - b.count[][value].length)

      if hint => loader.off!
      @render!

  get-count: (context) ->
    context.count = count = {accept: [], pending: [], reject: []}
    for k,user of @data.{}user =>
      val = @criteria.reduce(
        (a, b) ~>
          v = user.prj{}[context.slug].{}value[b.name]
          Math.max(a, if v? => v else 1)
        0
      )
      count[<[accept pending reject]>[val]].push user
      context.state = if count.reject.length => 2 else if count.pending.length => 1 else 0

  get-progress: ->

    val = {0: 0, 1: 0, 2: 0}
    @prjs.map (p) ~>
      if !(p.state?) => @get-count(p)
      val[p.state]++
    @progress = do
      accept: val.0
      pending: val.1
      reject: val.2
      done: val.0 + val.2
      total: (@prjs.length or 1)

ctrl = new Ctrl root: document.body
ctrl.init!
