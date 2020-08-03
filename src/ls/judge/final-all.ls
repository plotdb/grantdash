({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeFinalAll,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _

Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @data = {prj: {}}
  @active = null
  @progress = {total: 1, done: 0}
  @cfg = {heatmap: true}

  coloring = (v) ->
    r = if v >= 0.5 => 255 else 0
    g = if v < 0.5 => 255 else 0
    v = Math.abs(v - 0.5)
    return "rgba(#r,#g,0,#v)"

  @ldcv = do
    "judge-comment": new ldCover root: ld$.find(@root, '[ld=judge-comment-ldcv]', 0)
    detail: new ldCover root: ld$.find(@root, '[ld=detail-ldcv]', 0)

  @view.local = view = new ldView do
    init-render: false
    root: @root
    action:
      click: do
        sort: ({node}) ~> @sort node.getAttribute \data-name
        "toggle-heatmap": ~>
          @cfg.heatmap = !@cfg.heatmap
          @view.local.render \toggle-heatmap
          @view.local.render \project

    handler: do
      "toggle-heatmap": ({node}) ~>
        ld$.find(node, '.switch', 0).classList.toggle \on, !!@cfg.heatmap

      "comment-name": ({node}) ~> node.innerText = (@active and @active.name) or ''
      "detail-name": ({node}) ~> node.innerText = (@active and @active.name) or ''
      "judge-comment": do
        list: ~>
          if !@active => return []
          ret = @judge
            .map (j) ~> {judge: j, comment: @data.user{}[j.key].{}prj[@active.key].comment}
            .filter -> it.comment
          ret.sort (a,b) -> (if b.comment? => b.comment.length else 0) - (if a.comment? => a.comment.length else 0)
        handler: ({node,data}) ->
          name = ld$.find(node, '[ld=name]', 0)
          comment = ld$.find(node, '[ld=comment]', 0)
          name.innerText = data.judge.name
          comment.innerText = data.comment

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

      judge: do
        list: ({context}) ~> @judge
        handler: ({node, data}) -> ld$.find(node, 'div', 0).innerText = data.name
        action: click: ({node, data, evt}) ~>
          if !(evt.target and (n = evt.target.getAttribute(\data-name))) => return
          @sort "judge-#{n}", data
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
                @view.local.render \detail-name
              "judge-comment": ({node, context}) ~>
                @active = context
                @view.local.render \detail-name
                @view.local.render \judge-comment
                @ldcv["judge-comment"].toggle!
            handler: do
              "judge-comment": ({node, context}) ~>
                node.classList.toggle \text-primary, context.has-comment
              name: ({node, context}) ->
                node.innerText = context.name
                node.setAttribute \href, "/dash/prj/#{context.slug}"
              key: ({node, context}) -> node.innerText = context.key or ''
              total: ({node, context}) ~>
                if !(context.total?) => return node.innerText = '-'
                v = Math.round(10 * context.total) / 10
                node.innerText = v.toFixed(1)
                node.style.background = if @cfg.heatmap => '#fff' else '#eee'
              rank: ({node, context}) ~>
                node.innerText = if context.rank? => context.rank else '-'
                node.style.background = if @cfg.heatmap =>
                  coloring(+(context.rank or 0) / (@prjs.length or 1))
                else '#eee'

              criteria: ({node, context}) ->
                n = node.getAttribute(\data-name)
                node.innerText = ({0:"+",2:"-"}[n] or '') + context.{}criteria[n]
              judge: do
                key: -> it.key
                list: ({context}) ~> @judge
                init: ({local, node, context, data}) ~>
                handler: ({node, context, data}) ~>
                  score = ld$.find(node, '[ld=score]', 0)
                  rank = ld$.find(node, '[ld=rank]', 0)
                  score.innerText = data.score[context.key] or 0
                  rank.innerText = data.rank[context.key] or 0
                  rank.style.background = if @cfg.heatmap =>
                    coloring(+(data.rank[context.key] or 0) / (@prjs.length or 1))
                  else '#fff'


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
      .then ~> @fetch-info!
      .then ~>
        @judge = @grpinfo.{}judgePerm.[]list
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
    if !@prjs => return
    @prjs.map (p) ~>
      p.has-comment = !!@judge.filter((j) ~> @data.user{}[j.key].{}prj{}[p.key].comment).length
    @judge.map (j,i) ~>
      u = @data.user[j.key] or {}
      j.score = {}
      j.rank = {}
      scores = @prjs.map (p,i) ~>
        u.{}prj{}[p.key].comment
        sum = @grade.reduce(((a,g) ->
          +(u.{}prj{}[p.key].{}v[g.key] or 0) + a
        ), 0)
        j.score[p.key] = sum
        return [p.key, sum]
      lc = {}
      scores.sort (a,b) -> b.1 - a.1
      scores.map (d,i) ->
        if lc.value != d.1 => lc <<< {value: d.1, rank: i + 1}
        j.rank[d.0] = lc.rank
    scores = @prjs.map (p,i) ~>
      p.total = @judge.reduce(((a,b) -> +(b.score[p.key] or 0) + a), 0) / @judge.length
      return [p,p.total]
    scores.sort (a,b) -> b.1 - a.1
    lc = {}
    scores.map (d,i) ->
      if lc.value != d.1 => lc <<< {value: d.1, rank: i + 1}
      d.0.rank = lc.rank


ctrl = new Ctrl root: document.body
ctrl.init!
