({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeCriteriaUser,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _


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

  @ldcv = do
    comment: new ldCover root: ld$.find(@root, '[ld=comment-ldcv]', 0)
    detail: new ldCover root: ld$.find(@root, '[ld=detail-ldcv]', 0)
    criteria: new ldCover root: ld$.find(@root, '[ld=criteria-ldcv]', 0)

  @view = view = new ldView do
    init-render: false
    root: @root
    action: do
      input: do
        comment: ({node}) ~>
          if !@active => return
          @data.prj{}[@active.slug].comment = node.value
          @update debounced: true
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
        sort: ({node}) ~> @sort node.getAttribute \data-name
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
      "header-criteria": do
        list: ~> @criteria
        action: click: ({node, data}) ~> @sort \criteria, data.name
        handler: ({node, data}) ~> node.innerText = data.name
      project: do
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
              "count-accept": ({node, context}) ~> (if context.review-count => context.review-count[0] else 0) or 0
              "count-todo": ({node, context}) ~> (if context.review-count => context.review-count[1] else 0) or 0
              "count-reject": ({node, context}) ~> (if context.review-count => context.review-count[2] else 0) or 0
            handler: do
              "has-comment": ({node, context}) ~>
                node.classList.toggle \invisible, !@data.prj{}[context.slug].comment
              state: ({node, context}) ~> clsset node, @get-state(context)
              name: ({node, context}) ->
                node.innerText = context.name
              key: ({node, context}) -> node.innerText = context.key or ''
              criteria: do
                list: ({context}) ~> @criteria
                init: ({node, local}) -> local.icon = ld$.find(node, 'i', 0)
                action: click: ({node, data, context}) ~>
                  v = @data.prj{}[context.slug].{}value[data.name]
                  v = if v? => v else 1
                  v = ( v + 2 ) % 3
                  @data.prj{}[context.slug].value[data.name] = v
                  @get-progress!
                  local.view.render!
                  @view.render \progress
                  @update debounced: 10
                handler: ({local, data, context}) ~>
                  v = @data.prj{}[context.slug].{}value[data.name]
                  v = if v? => v else 1
                  clsset local.icon, v
        handler: ({node, local, data}) ~>
          local.view.setContext data
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
      name: value or {name: "名稱", state: "狀態", comment: "評論"}[name]
      dir: if dir > 0 => "順向" else "逆向"
    if hint => notify.send \success, "重新將表格依 #{verbose.name} 做 #{verbose.dir} 排序"
    debounce 100 .then ~>
      @sort.inversed[n] = !@sort.inversed[n]
      statemap = [2 0 1]
      if name == \state =>
        @prjs.sort (a, b) ~> dir * (statemap[@get-state(a)] - statemap[@get-state(b)])
      else if name == \name =>
        @prjs.sort (a, b) -> return dir * (if a.name > b.name => 1 else if a.name < b.name => -1 else 0)
      else if name == \criteria =>
        @prjs.sort (a, b) ~>
          a = @data.prj{}[a.slug].{}value[value]
          b = @data.prj{}[b.slug].{}value[value]
          a = if a? => a else 1
          b = if b? => b else 1
          return dir * ( statemap[a] - statemap[b] )
      if hint => loader.off!
      @render!

  get-state: (context) ->
    val = @criteria.reduce(
      (a, b) ~>
        v = @data.prj{}[context.slug].{}value[b.name]
        Math.max(a, if v? => v else 1)
      0
    )

  get-progress: ->
    val = {0: 0, 1: 0, 2: 0}
    @prjs.map (p) ~>
      v = @criteria.reduce(
        (a, b) ~>
          v = @data.prj{}[p.slug].{}value[b.name]
          Math.max(a, if v? => v else 1)
        0
      )
      val[v]++
    @progress = do
      accept: val.0
      pending: val.1
      reject: val.2
      done: val.0 + val.2
      total: (@prjs.length or 1)

ctrl = new Ctrl root: document.body
ctrl.init!
