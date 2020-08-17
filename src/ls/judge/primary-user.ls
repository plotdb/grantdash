({notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgePrimaryUser,
<[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _


typemap = {0: "accept", 1: "pending", 2: "reject"}
bgmap = {0: "bg-success", 1: "bg-warning", 2: "bg-danger"}
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
  @type = \primary
  @data = {prj: {}}
  @active = null

  @ldcv = do
    comment: new ldCover root: ld$.find(@root, '[ld=comment-ldcv]', 0), escape: false
    detail: new ldCover root: ld$.find(@root, '[ld=detail-ldcv]', 0)
    criteria: new ldCover root: ld$.find(@root, '[ld=criteria-ldcv]', 0)

  render-debounce = debounce ~> @view.local.render {name: 'project', key: @active.slug}
  @view.local = view = new ldView do
    init-render: false
    root: @root
    action: do
      input: do
        comment: ({node}) ~>
          if !@active => return
          @data.prj{}[@active.key].comment = node.value
          @update debounced: 1000
          render-debounce!
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
        sort: ({node}) ~> @sort node.getAttribute(\data-name), node.getAttribute(\data-value)
    text: do
      count: ({node}) ~> @progress[typemap[+node.getAttribute(\data-name)]] or 0
    handler: do
      option: ({node}) ~>
        v = node.getAttribute(\data-value)
        jinfo = @grpinfo.{}judge.{}primary or {}
        node.classList.toggle \d-none, (v == \1)


      "show-budget": ({node}) ~> node.classList.toggle \d-none, !@grpinfo.form.{}purpose.budget
      "comment-name": ({node}) ~>
        if @active => node.innerText = @active.name or ''
      progress: ({node, names}) ~>
        p = @progress
        if \progress-bar in names =>
          n = typemap[+node.getAttribute(\data-name)]
          node.style.width = "#{100 * p[n] / p.total }%"
        else if \progress-percent in names =>
          node.innerText = Math.round(100 * p.done / p.total )
      "header-criteria": do
        list: ~> @criteria
        action: click: ({node, data}) ~> @sort \criteria, data.key
        handler: ({node, data}) ~> node.innerText = data.name
      project: do
        key: -> it.key
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
                name = +node.getAttribute(\data-name)
                @data.prj{}[context.key].v = name
                local.view.render!
                @get-progress!
                @view.local.render <[progress]>
                @update debounced: 10
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
            text: do
              name: ({context}) -> context.name or '(未命名)'
              ownername: ({context}) -> context.info.teamname or context.ownername or ''
              key: ({context}) -> context.key or ''
              budget: ({context}) ->
                if !(b = context.info.budget) => return ''
                total = (b.self or 0) + (b.subsidy or 0)
                return "#{Math.round(total / 10000)}萬"
              subsidy: ({context}) ->
                if !(b = context.info.budget) => return ''
                total = b.subsidy or 0
                return "#{Math.round(total / 10000)}萬"
            handler: do
              "show-budget": ({node}) ~> node.classList.toggle \d-none, !@grpinfo.form.{}purpose.budget
              "has-comment": ({node, context}) ~>
                node.classList.toggle \text-primary, !!@data.prj{}[context.key].comment
              option: ({node, local, context}) ~>
                name = +node.getAttribute(\data-name)
                cls = bgmap[name]
                if name == 1 =>
                  node.classList.toggle \d-none, (@grpinfo.{}judge.{}primary["option-type"] == \2way)
                act = if (@data.prj{}[context.key].v == name) => \add else \remove
                node.classList[act].apply node.classList, [cls, 'text-white']

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
      .then ~> @fetch-prjs!
      .then ~> @sharedb!
      .then ~> @reconnect!
      .catch error!

  get-progress: ->
    @progress = ret = {done: 0, accept: 0, pending: 0, reject: 0, total: (@prjs.length or 1)}
    @prjs.map (p) ~> if (v = @data.prj{}[p.key].v)? => ret[typemap[v]]++
    ret.done = (ret.accept + ret.pending + ret.reject) or 0

ctrl = new Ctrl root: document.body
ctrl.init!
