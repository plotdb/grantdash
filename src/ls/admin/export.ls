({error, loader, notify, ldcvmgr, auth, sdbAdapter, admin-panel}) <- ldc.register(
\adminBrdExport, <[error loader notify ldcvmgr auth sdbAdapter adminPanel]>, _)
Ctrl = (opt) ->
  @toc = opt.toc
  @prjs = []
  @data = {}
  admin-panel.on \active, ({nav, name, panel}) ~>
    if name == \brd-export =>
      ld$.fetch "/dash/api/brd/#{@toc.brd.slug}/list", {method: \GET}, { type: \json}
        .then ~>
          @prjs = it
          @prjs = @prjs.filter -> it.{}system.{}badge.winner
          @prjs.sort (a,b) -> a.key - b.key
          @prjs.map -> it.info = it.detail.info
          @view.render!
        .catch error!
  @update = ~> @ops-out ~> @data
  @view = view = new ldView do
    root: opt.root
    action: input:
      field: ({node}) ~>
        name = node.getAttribute \data-name
        @data[name] = node.value
        @update!
    handler:
      field: ({node}) ~>
        name = node.getAttribute \data-name
        node.value = (@data[name] or '')
      prj:
        list: ~> @prjs
        handler: ({node, local, data}) ->
          local.view.set-context data
          local.view.render!
        init: ({node,local,data}) ~>
          local.view = new ldView do
            context: data
            root: node
            action: input:
              amount: ({node, context}) ~>
                @data{}[context.key].amount = node.value or 0
                @update!
              state: ({node, context}) ~>
                @data{}[context.key].state = node.value or ''
                @update!
            text:
              name: ({context}) -> context.name
            handler:
              amount: ({node, context}) ~>
                node.value = @data{}[context.key].amount or 0
              state: ({node, context}) ~>
                node.value = @data{}[context.key].state or ''
  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  set-data: (data) ->
    @data = data
    @view.render!
  ops-in: ({data,ops,source}) ->
    if source => return
    #for k,v of @form.fields => if !(k in <[slug]>) =>
    #  if @form.fields[k].getAttribute(\type) == \file => continue
    #  @form.fields[k].value = data[k] or ''
    @data = JSON.parse(JSON.stringify(data))
    @view.render!

return Ctrl
