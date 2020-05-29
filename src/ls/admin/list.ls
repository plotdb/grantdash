({loader, notify, ldcvmgr, auth, sdbAdapter}) <- ldc.register(
\adminPrjList, <[loader notify ldcvmgr auth sdbAdapter]>, _)
Ctrl = (opt) ->
  @view = view = new ldView do
    root: opt.root
    handler: do
      prj: do
        list: -> [1 to 100].map -> {name: "asd", ownername: "asdasd", index: it}
        init: ({node,local,data}) ->
          local.view = new ldView do
            context: data
            root: node
            handler: do
              name: ({node,context}) -> node.innerText = context.name
              index: ({node,context}) -> node.innerText = context.index
              ownername: ({node,context}) -> node.innerText = context.ownername
              "budget-consume": ({node,context}) ->
              "budget-detail": ({node,context}) ->


  @

Ctrl.prototype = Object.create(Object.prototype) <<< {}

return Ctrl
