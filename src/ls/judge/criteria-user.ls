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
  /*
  view = new ldView do
    root: document.body
    action: input: do
      comment: ->
    handler: do
      comment: 
      project: do
        list: ~> @list
        init: ({node, local, data}) ->
          data.qualify = <[開源 協作 重用]>.map -> {name: it, value: 1}
          local.view = new ldView do
            root: node
            context: data
            action: click: do
              comment: ({node}) -> ldcv-comment.toggle!
            handler: do
              state: ({node, context}) ->
                val = context.qualify.reduce(((a, b) -> Math.max(a, b.value)), 0)
                clsset node, val
              name: ({node, context}) ->
                node.innerText = context.name
              key: ({node, context}) -> node.innerText = context.key
              qualify: do
                list: -> data.qualify
                init: ({node, local}) -> local.icon = ld$.find(node, 'i', 0)
                action: click: ({node, data}) ->
                  data.value = ( data.value + 2 ) % 3
                  local.view.render!
                handler: ({local, data}) -> clsset local.icon, data.value
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!
  */
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  render: -> @view.render!
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
      id: "brd/#brd/grp/#grp/judge/criteria"
      watch: (ops,source) ~> @hub.fire \change, {ops,source}
      create: ~> {}
    })
      .then((doc) ~>
        doc.on \op, ~> @render!
        @adapter {hub, path: []}
      .catch -> console.log "getdoc #n failed."

  ops-in: ({data,ops,source}) ->

ctrl = new Ctrl {}

ld$.fetch '/dash/api/brd/sch001/list', {method: \GET}, {type: \json}
  .then ->
    list = it

/*
ldcv-comment = new ldCover root: \#review-comment
ldcv-detail = new ldCover root: \#review-detail
ldcv-criteria = new ldCover root: \#review-criteria
main-view = new ldView do
  root: document.body
  action: click: do
    comment: ({node}) -> ldcv-comment.toggle!
    detail: ({node}) -> ldcv-detail.toggle!
    criteria: ({node}) -> ldcv-criteria.toggle!
*/
