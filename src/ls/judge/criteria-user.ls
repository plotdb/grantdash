({error, loader, auth, ldcvmgr, sdbAdapter}) <- ldc.register \judgeCriteriaUser,
<[error loader auth ldcvmgr sdbAdapter]>, _

clsmap = [
  <[i-check text-success]>
  <[i-circle text-warning]>
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
  @user = opt.user
  @criteria = [{name: "開源", key: 1}, {name: "協作", key: 2}, {name: "參與", key: 3}]
  @_update = debounce ~> @ops-out ~> @data

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
          @active.comment = node.value
          @update debounced: true
      click: do
        detail: ({node}) ~> @ldcv.detail.toggle!
        criteria: ({node}) ~> @ldcv.criteria.toggle!
    handler: do
      project: do
        list: ~>
          @prjs.map ~>
          @prjs
        init: ({node, local, data}) ~>
          local.view = new ldView do
            root: node
            context: data
            action: click: do
              comment: ({node, context}) ~>
                @active = @data{}[context.slug]
                view.get(\comment).value = (@active.comment or '')
                @ldcv.comment.toggle!
            handler: do
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
                list: ({context}) ~> @criteria
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
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  render: -> @view.render!
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
        @adapt {hub: @hub, path: ['user', @user.key]}
      .catch -> console.log "getdoc failed.", it

  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @render!

auth.get!
  .then (g) ->
    ctrl = new Ctrl do
      user: g.user
      root: document.body
      brd: \sch001
      grp: \4rFUP+03IS05ZD09ku03KMlsh
    Promise.resolve!
      .then -> ctrl.sharedb!
      .then -> ctrl.getdoc!
      .then -> ctrl.fetch!

/*
main-view = new ldView do
  root: document.body
  action: click: do
    comment: ({node}) -> ldcv-comment.toggle!
    detail: ({node}) -> ldcv-detail.toggle!
    criteria: ({node}) -> ldcv-criteria.toggle!
*/
