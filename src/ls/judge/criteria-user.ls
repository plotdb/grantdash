# {
#   user: {
#     <key>: {
#       <prj-slug>: {
#         value: {<criteria-key>: one of [0,1,2]}
#         comment: "...plain-text..."
#       }, ...
#     }, ...
#   }
# }

({error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeCriteriaUser,
<[error loader auth ldcvmgr sdbAdapter]>, _

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
  @loader = loader
  @ <<< opt{brd, grp}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @prjs = []
  @data = {}
  @progress = {}
  @user = opt.user
  @for-all = !opt.user
  @criteria = [{name: "開源", key: 1}, {name: "協作", key: 2}, {name: "參與", key: 3}]
  @_update = debounce ~> if @user => @ops-out ~> @data

  @ldcv = do
    comment: new ldCover root: ld$.find(root, '[ld=comment-ldcv]', 0)
    detail: new ldCover root: ld$.find(root, '[ld=detail-ldcv]', 0)
    criteria: new ldCover root: ld$.find(root, '[ld=criteria-ldcv]', 0)

  @view = view = new ldView do
    root: root
    action: do
      input: do
        comment: ({node}) ~>
          if !@active => return
          @data{}[@active.slug].comment = node.value
          @update debounced: true
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
    text: do
      "count-total": ({node}) ~> @prjs.length or 0
      "count-accept": ({node}) ~> @progress.0 or 0
      "count-reject": ({node}) ~> @progress.2 or 0
      "count-todo": ({node}) ~> @progress.1 or 0
      reviewer: ({node}) ~> if @user => @user.displayname
    handler: do
      "for-one": ({node}) ~> node.classList.toggle \d-none, @for-all
      "for-all": ({node}) ~> node.classList.toggle \d-none, !@for-all
      "comment-name": ({node}) ~>
        if @active => node.innerText = @active.name or ''
      "progress-accept": ({node}) ~> node.style.width = "#{100 * (@progress.0 or 0) / (@prjs.length or 1)}%"
      "progress-reject": ({node}) ~> node.style.width = "#{100 * (@progress.2 or 0) / (@prjs.length or 1)}%"
      progress: ({node}) ~>
        node.innerText = Math.round(100 * ((@progress.0 or 0) + (@progress.2 or 0)) / (@prjs.length or 1))
      "header-criteria": do
        list: ~> if @for-all => [] else @criteria
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
              detail: ({node, context}) ~>
                @ldcv.detail.toggle!
              comment: ({node, context}) ~>
                @active = context
                view.get(\comment).value = (@data{}[@active.slug].comment or '')
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
              "for-all": ({node}) ~> node.classList.toggle \d-none, !@for-all
              "for-one": ({node}) ~> node.classList.toggle \d-none, @for-all
              "has-comment": ({node, context}) ~> node.classList.toggle \invisible, !@data[context.slug].comment
              state: ({node, context}) ~>
                val = @criteria.reduce(
                  (a, b) ~>
                    v = @data{}[context.slug].{}value[b.key]
                    Math.max(a, if v? => v else 1)
                  0
                )
                clsset node, val
              name: ({node, context}) ->
                node.innerText = context.name
              key: ({node, context}) -> node.innerText = context.key
              criteria: do
                list: ({context}) ~> if @for-all => [] else @criteria
                init: ({node, local}) -> local.icon = ld$.find(node, 'i', 0)
                action: click: ({node, data, context}) ~>
                  v = @data{}[context.slug].{}value[data.key]
                  v = if v? => v else 1
                  v = ( v + 2 ) % 3
                  @data[context.slug].value[data.key] = v
                  @update!
                  local.view.render!
                handler: ({local, data, context}) ~>
                  v = @data{}[context.slug].{}value[data.key]
                  v = if v? => v else 1
                  clsset local.icon, v
        handler: ({node, local, data}) ~>
          data.review-count = @get-count data.slug
          local.view.setContext data
          local.view.render!
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  render: ->
    @get-progress!
    @view.render!
  update: (opt={}) ->
    if !opt.debounced => @_update!now! else @_update!

  fetch: ->
    ld$.fetch '/dash/api/brd/sch001/list', {method: \GET}, {type: \json}
      .then ~>
        @prjs = it
        @render!

  sharedb: ->
    console.log "prepare sharedb ..."
    @sdb = sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
      path: '/dash/ws'
    @hub = new Hub({sdb})
    sdb.on \error, -> ldcvmgr.toggle \not-sync
    sdb.on \close, ~>
      @loader.on!
      sdb.reconnect!
        .then ~> @getdoc!
        .then ~> @adapt!
        .then -> console.log "admin initialized."
        .then ~> @loader.off!
  getdoc: ->
    @hub.doc = null
    @sdb.get({
      id: "brd/#{@brd}/grp/#{@grp}/judge/criteria"
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> {}
    })
      .then (doc) ~>
        @hub.doc = doc
        doc.on \op, ~> @render!
        if @user => @adapt {hub: @hub, path: ['user', @user.key]}
        else @adapt {hub: @hub, path: []}
      .catch -> console.log "getdoc failed.", it

  /*
  get-detail: (prj-slug) ->
    review = []
    for k of @data.user =>
      val = @data.user[k][prj-slug].value
      c = @data.user[k][prj-slug].comment
      if c => {user: k, comment: c}
      for c in @criteria => count[val[c.key] or 1]++
  */

  get-count: (prj-slug) ->
    count = [0,0,0]
    for k of @data.user =>
      val = @data.user[k][prj-slug].value
      for c in @criteria => count[val[c.key] or 1]++
    return count

  get-state: ->
    val = @criteria.reduce(
      (a, b) ~>
        v = @data{}[context.slug].{}value[b.key]
        Math.max(a, if v? => v else 1)
      0
    )

  get-progress: ->
    val = {0: 0, 1: 0, 2: 0}
    @prjs.map (p) ~>
      v = @criteria.reduce(
        (a, b) ~>
          v = @data{}[p.slug].{}value[b.key]
          Math.max(a, if v? => v else 1)
        0
      )
      val[v]++
    @progress = val

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @render!


auth.get!
  .then (g) ->
    ctrl = new Ctrl do
      #user: g.user
      root: document.body
      brd: \sch001
      grp: \4rFUP+03IS05ZD09ku03KMlsh
    Promise.resolve!
      .then -> ctrl.sharedb!
      .then -> ctrl.getdoc!
      .then -> ctrl.fetch!
