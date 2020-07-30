({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeFinalUser,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null
  @progress = {total: 1, done: 0}

  @ldcv = do
    comment: new ldCover root: ld$.find(@root, '[ld=comment-ldcv]', 0), escape: false
    detail: new ldCover root: ld$.find(@root, '[ld=detail-ldcv]', 0)

  @view.local = view = new ldView do
    init-render: false
    root: @root
    action:
      input: do
        comment: ({node}) ~>
          if !@active => return
          @data.prj{}[@active.key].comment = node.value
          @update debounced: 300
          @view.local.render {name: 'project', key: @active.slug}
      click: do
        sort: ({node}) ~> @sort node.getAttribute \data-name
        "toggle-total": ~>
          @total-editable = !@total-editable
          @view.local.render \toggle-total

    handler: do
      "toggle-total": ({node}) ~>
        ld$.find(node, '.switch', 0).classList.toggle \on, @total-editable
        ld$.find(@root, 'input[ld=total]').map (n) ~>
          if @total-editable => n.removeAttribute \readonly
          else n.setAttribute \readonly, null
          n.classList.toggle \bg-light, !@total-editable

      "comment-name": ({node}) ~> node.innerText = (@active and @active.name) or ''
      "progress-percent": ({node}) ~> node.innerText = Math.floor(100 * @progress.done / @progress.total)
      "progress-bar": ({node}) ~> node.style.width = "#{(100 * @progress.done / @progress.total)}%"
      count: ({node}) ~>
        n = node.getAttribute(\data-name)
        if n == \total => node.innerText = @progress.total or 0
        else if n == \pending => node.innerText = (@progress.total - @progress.done) or 0

      detail: do
        list: ~>
          if !@active => return []
          ret = for k,v of (@criteria-result.{}data.user or {}) =>
            p = v.prj{}[@active.key]
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
              name: ({context}) -> context.name
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


      grade: do
        list: ({context}) ~> @grade
        handler: ({node, data}) ->
          ld$.find(node, 'span', 0).innerText = data.name
          ld$.find(node, 'div', 0).innerText = "#{data.percent}%"
        action: click: ({node, data}) ~> @sort \grade, data
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
                @active = context
                @view.local.render \detail
                @ldcv.detail.toggle!

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
            init: do
              total: ({node, context}) ~>
                handle = ~>
                  if context.total == (v = +node.value) => return
                  context.total = v
                  @grade.map ~> @data.prj{}[context.key].{}v[it.key] = it.percent * v / 100
                  #@view.local.render {name: \project, key: context.slug}
                  @view.local.render \project

                node.addEventListener \input, handle
                node.addEventListener \change, handle
                node.addEventListener \keyup, handle
            handler: do
              comment: ({node, context}) ~> node.classList.toggle \text-primary, !!@data.prj{}[context.key].comment
              name: ({node, context}) -> node.innerText = context.name
              key: ({node, context}) -> node.innerText = context.key or ''
              total: ({node, context}) -> node.value = if context.total? => context.total else '-'
              rank: ({node, context}) -> node.value = if context.rank? => context.rank else '-'

              criteria: ({node, context}) ->
                n = node.getAttribute(\data-name)
                node.innerText = ({0:"+",2:"-"}[n] or '') + context.{}criteria[n]
              grade: do
                key: -> it.key
                list: ({context}) ~> @grade
                init: ({local, node, context, data}) ~>
                  local.input = input = ld$.find(node, 'input', 0)
                  input.value = @data.prj{}[context.key].{}v[data.key] or ''
                  handle = (e) ~>
                    @data.prj[context.key].v[data.key] = +input.value
                    local.render data
                    #@view.local.render {name: \project, key: context.slug}
                    @view.local.render \project
                    @ops-out ~> @data
                  local.render = (data) ~>
                    local.input.value = v = @data.prj{}[context.key].{}v[data.key] or ''
                    <[bg-danger text-white]>.map -> input.classList.toggle it, (v > data.percent)
                    @view.local.render <[progress-bar progress-percent count]>
                    @rerank!
                  input.addEventListener \input, handle
                  input.addEventListener \keyup, handle
                  input.addEventListener \change, handle
                handler: ({local, context, data}) ~>
                  local.render data

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
    @rerank!
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
      .then ~> @user = @global.user
      .then ~> @fetch-info!
      .then ~>
        if !@grpinfo.grade => ldcvmgr.get('judge-grade-missing')
        else @grade = @grpinfo.grade.entries
      .then ~> @fetch-prjs!
      .then ~> @fetch-criteria-result!
      .then ~> @sharedb!
      .then ~> @reconnect!
      .catch error!

  fetch-criteria-result: ->
    ld$.fetch "/dash/api/brd/#{@brd}/grp/#{@grp}/judge/criteria/result", {method: \GET}, {type: \json}
      .then (ret = {}) ~>
        @criteria-result = ret.data
        @get-displayname [k for k of @criteria-result.data.user]
        users = @criteria-result.data.user
        @prjs.map (p) ~>
          p.criteria = {0: 0, 1: 0, 2: 0}
          for k,v of users =>
            @criteria.map (c) ~>
              idx = v.{}prj{}[p.key].v[c.key]
              if !(idx?) => idx = 1
              p.criteria[idx]++

  rerank: ->
    ranks = for k,v of @data.{}prj =>
      if !(prj = @prjkeymap[k]) => continue
      sum = 0
      for g in @grade => sum += +(v.{}v[g.key] or 0)
      prj.total = sum
      [prj,sum]
    lc = {idx: 1, value: null}
    ranks.sort (a,b) -> b.1 - a.1
    ranks.map (d,i) ->
      if lc.value != d.1 => [lc.value, lc.idx] = [d.1, i + 1]
      d.0.rank = lc.idx
    @get-progress!

  get-progress: ->
    @progress = do
      total: (@prjs.length or 1)
      #done: @prjs.filter(->it.total).length
      done: @prjs.filter((p) ~> !(@grade.filter((g) ~>!@data.prj{}[p.key].{}v[g.key]?).length)).length


ctrl = new Ctrl root: document.body
ctrl.init!
