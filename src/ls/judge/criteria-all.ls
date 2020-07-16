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

  @view.local = view = new ldView do
    init-render: false
    root: @root
    action: do
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
                view.get(\comment).value = (@data.prj{}[@active.key].comment or '')
                @ldcv.comment.toggle!
                @view.local.render \comment-name
              name: ({node, context}) ->
                view.get("iframe").setAttribute \src, "/dash/prj/#{context.slug}?simple"
                view.get("iframe-placeholder").classList.add \d-none
                if @active-node => @active-node.classList.remove \active
                @active-node = root
                @active-node.classList.add \active
            handler: do
              count: ({node, context}) ->
                n = node.getAttribute(\data-name)
                node.innerHTML = ["""
                <div style="width:.3em;display:inline-block">
                <div class="rounded-circle bg-cover bg-portrait bg-dark border border-light has-tips"
                style="width:1.5em;height:1.5em;margin-left:-.6em;background-image:url(/s/avatar/#{user}.png);">
                <!--<div class="hover-tip bottom tip-sm">#{user}</div>-->
                </div></div>
                """ for user in context.count[n]].join('')
              "has-comment": ({node, context}) ~>
                node.classList.toggle \invisible, !@data.prj{}[context.key].comment
              state: ({node, context}) ~>
                span = ld$.find(node, 'span',0)
                icon = ld$.find(node, 'i',0)
                state = context.state or 1
                icon.classList.remove.apply icon.classList, icon.classList
                icon.classList.add <[i-check i-circle i-close]>[state]
                node.classList.remove.apply node.classList, node.classList
                cls = [<[bg-success text-white]> <[bg-light text-secondary]> <[bg-danger text-white]>]
                node.classList.add.apply node.classList, ((cls[state] or []) ++ <[rounded]>)
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
    @view.base.render!
    @view.local.render!

  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
      .then ~> @fetch-info!
      .then ~> @fetch-prjs!
      .then ~> @sharedb!
      .then ~> @getdoc!
      .then ~> @sort \name, null, false
      .then ~> console.log "initied."
      .catch error!

  get-count: (context) ->
    context.count = count = {accept: [], pending: [], reject: []}
    for k,user of @data.{}user =>
      val = @criteria.reduce(
        (a, b) ~>
          v = user.prj{}[context.key].{}value[b.key]
          Math.max(a, if v? => v else 1)
        0
      )
      count[<[accept pending reject]>[val]].push k
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
