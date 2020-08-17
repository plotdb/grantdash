({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeCriteriaAll,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null

  @ldcv = do
    detail: new ldCover root: ld$.find(@root, '[ld=detail-ldcv]', 0)
    criteria: new ldCover root: ld$.find(@root, '[ld=criteria-ldcv]', 0)

  @view.local = view = new ldView do
    init-render: false
    root: @root
    action: do
      click: do
        criteria: ({node}) ~> @ldcv.criteria.toggle!
        sort: ({node}) ~> @sort node.getAttribute(\data-name), node.getAttribute(\data-value)
        publish: ({node}) ~>
          ldcvmgr.get('confirm-publish')
            .then (v) ~>
              if v != \yes => return
              json = do
                prjs: @prjs
                  .filter -> it.state == 0
                  .map -> it.key
              ld$.fetch(
                "/dash/api/brd/#{@brd}/grp/#{@grp}/judge/#{@type}/publish",
                {method: \POST}, {json}
              )
                .then -> ldcvmgr.toggle('published', true)
                .then -> debounce 1500
                .then -> ldcvmgr.toggle('published', false)
            .catch error!

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
      detail: do
        list: ~>
          if !@prj => return []
          ret = for k,v of @data.user =>
            p = v.prj{}[@prj.key]
            obj = do
              user: k
              name: @usermap[k].displayname
              comment: p.comment or ''
              criteria: @criteria.map (c) ~> {name: c.name, value: if p.{}v[c.key]? => p.v[c.key] else 1}
          ret.sort (a,b) -> (if b.comment? => b.comment.length else 0) - (if a.comment? => a.comment.length else 0)
        init: ({node, local, data}) ->
          local.view = new ldView do
            root: node
            context: data
            text: do
              name: ({context}) -> context.name or '(未命名)'
            handler: do
              comment: ({node, context}) ->
                node.innerText = (context.comment or '( 沒有評論 )')
                node.classList.toggle \text-muted, !context.comment
              avatar: ({node, context}) -> node.style.backgroundImage = "url(/dash/s/avatar/#{context.user}.png)"
              criteria: do
                list: ({context}) -> context.criteria
                handler: ({node,data}) ->
                  ld$.find(node, '[ld=name]', 0).innerText = data.name
                  label = ld$.find(node, '[ld=value]', 0)
                  icon = ld$.find(label, 'i', 0)
                  label.classList.remove \text-success, \text-secondary, \text-danger
                  label.classList.add <[text-success text-secondary text-danger]>[data.value]
                  icon.classList.remove \i-close, \i-circle, \i-check
                  icon.classList.add <[i-check i-circle i-close]>[data.value]

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
              detail: ({node, context}) ~>
                @prj = context
                @view.local.render \comment
                @view.local.render \detail
                @ldcv.detail.toggle!

              name: ({node, context}) ->
                view.get("iframe").setAttribute \src, "/dash/prj/#{context.slug}?simple"
                view.get("iframe-placeholder").classList.add \d-none
                if @active-node => @active-node.classList.remove \active
                @active-node = root
                @active-node.classList.add \active
            handler: do
              count: ({node, context}) ~>
                n = node.getAttribute(\data-name)
                html = ""
                for user in context.count[n] =>
                  displayname = if @usermap => @usermap{}[user].displayname else ''
                  html += """<div style="width:.3em;display:inline-block">
                  <div class="rounded-circle bg-cover bg-portrait bg-dark border border-light has-tips"
                  style="width:1.5em;height:1.5em;margin-left:-.6em;background-image:url(/dash/s/avatar/#{user}.png);">
                  <div class="hover-tip bottom tip-sm">#{displayname}</div>
                  </div></div>
                  """
                node.innerHTML = html

              detail: ({node, context}) ~>
                has-comment = ([v for k,v of context.comments].filter -> it).length
                if !(icon = ld$.find(node, 'i', 0)) => return
                icon.classList.toggle \text-primary, has-comment
                icon.classList.toggle \text-secondary, !has-comment
              state: ({node, context}) ~>
                span = ld$.find(node, 'span',0)
                icon = ld$.find(node, 'i',0)
                state = if context.state? => context.state else 1
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
    userkeys = [k for k of @data.{}user]
    @get-displayname userkeys
      .then ~>
        @prjs.map (p) ~>
          p.comments = {}
          for k,v of @data.{}user =>
            p.comments[k] = (v or {}).{}prj.{}[p.key].comment or ''
        @render!

  render: ->
    @get-progress!
    @view.base.render!
    @view.local.render!

  reconnect: ->
    @getdoc!
      .then ~> @sort \name, null, false
      .then ~> console.log "initied."

  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
      .then ~> @fetch-info!
      .then ~> @fetch-prjs!
      .then ~> @sharedb!
      .then ~> @reconnect!
      .catch error!

  get-count: (context) ->
    context.count = count = {accept: [], pending: [], reject: []}
    for k,user of @data.{}user =>
      val = @criteria.reduce(
        (a, b) ~>
          v = user.prj{}[context.key].{}v[b.key]
          Math.max(a, if v? => v else 1)
        0
      )
      count[<[accept pending reject]>[val]].push k
      context.state = if count.reject.length => 2 else if count.accept.length => 0 else 1

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
