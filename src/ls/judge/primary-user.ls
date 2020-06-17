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

  @view.local = view = new ldView do
    init-render: false
    root: @root
    action: do
      input: do
        comment: ({node}) ~>
          if !@active => return
          @data.prj{}[@active.slug].comment = node.value
          @update debounced: 300
          @view.local.render {name: 'project', key: @active.slug}
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
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
              detail: ({node, context}) ~> @ldcv.detail.toggle!
              comment: ({node, context}) ~>
                @active = context
                view.get(\comment).value = (@data.prj{}[@active.slug].comment or '')
                @ldcv.comment.toggle!
                @view.local.render \comment-name
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
    @view.base.render!
    @view.local.render!

  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
      .then ~> @user = @global.user
      .then ~> @fetch-info!
      .then ~> @fetch-prjs!
      .then ~> @sharedb!
      .then ~> @getdoc!
      .then ~> @sort \name, null, false
      .then ~> console.log "initied."
      .catch error

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
