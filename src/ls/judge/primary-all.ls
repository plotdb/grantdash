({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgePrimaryAll,
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
          @data.prj{}[@active.key].comment = node.value
          @update debounced: 300
          @view.local.render {name: 'project', key: @active.slug}
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
        sort: ({node}) ~> @sort node.getAttribute(\data-name), node.getAttribute(\data-value)
        "download-csv": ~>
          head = '"名稱","提案單位","入選標記","推薦票數","面議票數","汰除票數","推薦佔例"'
          body = @prjs
            .map (p) ~>
              [
                p.name, p.info.teamname or p.ownername or ''
                (if @data.{}prj{}[p.key].picked => 'O' else '')
                p.count.accept
                p.count.pending
                p.count.reject
                p.rate
              ]
                .map -> "\"#{('' + it).replace('"','\\"')}\""
                .join(',')
            .join('\n')
          data = "#head\n#body"
          href = URL.createObjectURL(new Blob([data], {type: "text/csv"}))
          n = ld$.create name: \a, attr: {href,download: 'result.csv'}
          document.body.appendChild n
          n.click!
          document.body.removeChild n

    text: do
      count: ({node}) ~> @progress[node.getAttribute(\data-name)] or 0
    handler: do
      option: ({node}) ~>
        v = node.getAttribute(\data-value)
        jinfo = @grpinfo.{}judge.{}primary or {}
        type = jinfo["option-type"]
        node.classList.toggle \d-none, (if v == \1 and type == \2way => true else false)
      "show-budget": ({node}) ~> node.classList.toggle \d-none, !@grpinfo.{}form.{}purpose.budget
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
              name: ({node, context}) ->
                view.get("iframe").setAttribute \src, "/dash/prj/#{context.slug}?simple"
                view.get("iframe-placeholder").classList.add \d-none
                if @active-node => @active-node.classList.remove \active
                @active-node = root
                @active-node.classList.add \active
              pick: ({node, context}) ~>
                obj = @data.{}prj{}[context.key]
                obj.picked = !obj.picked
                local.view.render!
                @update debounced: 10
            text: do
              budget: ({context}) ->
                if !(b = context.{}info.budget) => return ''
                total = (b.self or 0) + (b.subsidy or 0)
                return "#{Math.round(total / 10000)}萬"
              subsidy: ({context}) ->
                if !(b = context.{}info.budget) => return ''
                total = b.subsidy or 0
                return "#{Math.round(total / 10000)}萬"
              name: ({context}) -> context.name or '(未命名)'
              ownername: ({context}) -> context.{}info.teamname or context.ownername or ''
              key: ({context}) -> context.key or ''
            handler: do
              rate: ({node,context}) ->
                node.innerText = "#{(context.rate * 100).toFixed(1)}%"

              option: ({node}) ~>
                v = node.getAttribute(\data-value)
                jinfo = @grpinfo.{}judge.{}primary or {}
                span = ld$.find node, \span, 0
                type = jinfo["option-type"]
                node.classList.toggle \d-none, (if v == \1 and type == \2way => true else false)


              "show-budget": ({node}) ~> node.classList.toggle \d-none, !@grpinfo.{}form.{}purpose.budget
              pick: ({node, context}) ~>
                cls = [<[text-white bg-success]>, <[text-secondary bg-light]>]
                obj = @data.{}prj{}[context.key]
                cl = node.classList
                cl.add.apply cl, if obj.picked => cls.0 else cls.1
                cl.remove.apply cl, if obj.picked => cls.1 else cls.0
                cls = [<[i-check]>, <[i-circle]>]
                icon = ld$.find(node, 'i', 0)
                cl = icon.classList
                cl.add.apply cl, if obj.picked => cls.0 else cls.1
                cl.remove.apply cl, if obj.picked => cls.1 else cls.0
              "has-comment": ({node, context}) ~>
                node.classList.toggle \invisible, !@data.prj{}[context.key].comment
              progress: ({node, context}) ~>
                n = node.getAttribute(\data-name)
                node.style.width = "#{100 * context.{}count[n] / (context.{}count.total or 1)}%"
              count: ({node, context}) ~>
                n = node.getAttribute(\data-name)
                node.innerText = context{}count[n] or 0

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
    @get-count!
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
      .then ~> @judge = @grpinfo.{}judgePerm.[]list
      .then ~> @fetch-prjs!
      .then ~> @sharedb!
      .then ~> @reconnect!
      .catch (e) ->
        if ldError.id(e) == 1012 or e.message == \forbidden => ldcvmgr.toggle \access-denied
        else error! e

  get-count: ->
    len = @judge.length
    @prjs.map (p,i) ~>
      p.count = count = {accept: 0, pending: 0, reject: 0, total: len}
      @judge.map (j) ~>
        if !(u = @data.{}user[j.key]) => return
        if (v = u.prj{}[p.key].v)? => count[typemap[v]]++
      #for k,u of @data.user => if (v = u.prj{}[p.key].v)? => count[typemap[v]]++
      p.rate = count.accept / (count.total or 1)

  get-progress: ->
    @progress = ret = {done: 0, accept: 0, pending: 0, reject: 0, total: (@prjs.length or 1)}
    @prjs.map (p) ~> if (v = @data.prj{}[p.key].v) => ret[v]++
    ret.done = (ret.accept + ret.pending + ret.reject) or 0

ctrl = new Ctrl root: document.body
ctrl.init!
