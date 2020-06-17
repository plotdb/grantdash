({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgePrimaryUser,
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
          @update debounced: 300
          @view.render {name: 'project', key: @active.slug}
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
        sort: ({node}) ~> @sort node.getAttribute(\data-name), node.getAttribute(\data-value)
    text: do
      count: ({node}) ~> @progress[node.getAttribute(\data-name)] or 0
      reviewer: ({node}) ~> if @user => @user.displayname
      "grp-name": ({node}) ~> "#{@brdinfo.name} / #{@grpinfo.info.name}"
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
                @view.render <[progress]>
                @update debounced: 10
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
            handler: do
              "has-comment": ({node, context}) ~>
                node.classList.toggle \invisible, !@data.prj{}[context.slug].comment
              name: ({node, context}) -> node.innerText = context.name
              key: ({node, context}) -> node.innerText = context.key or ''
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
    @render!

  render: ->
    @get-progress!
    @view.render!

  fetch-info: ->
    console.log "fetch info ... "
    ld$.fetch "/dash/api/brd/#{@brd}/grp/#{@grp}/info", {method: \POST}, {json: {fields: <[criteria]>}, type: \json}
      .then (ret) ~>
        @brdinfo = ret.brd
        @grpinfo = ret.grp
        @criteria = ret.grp.criteria.entries

  init: ->
    Promise.resolve!
      .then ~> ctrl.auth!
      .then ~> @user = @global.user
      .then ~> ctrl.fetch-info!
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
      name: value or {name: "名稱", state: "狀態", comment: "評論長度"}[name]
      dir: if dir > 0 => "順向" else "逆向"
    if name == \count =>
      verbose.name = "#{{accept: "通過", pending: "待審", reject: "不符"}[value]}的數量"
    else if name == \primary =>
      verbose.name = "#{{accept: "通過", pending: "待審", reject: "不符"}[value]} 的結果"
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
      else if name == \primary =>
        @prjs.sort (a, b) ~>
          a = if @data.prj{}[a.slug].{}value == value => 1 else 0
          b = if @data.prj{}[b.slug].{}value == value => 1 else 0
          return dir * (a - b)


      if hint => loader.off!
      @render!

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
