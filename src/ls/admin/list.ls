({error, loader, notify, ldcvmgr, auth, sdbAdapter, admin-panel}) <- ldc.register(
\adminPrjList, <[error loader notify ldcvmgr auth sdbAdapter adminPanel]>, _)
Ctrl = (opt) ->
  @toc = opt.toc
  @data = []
  console.log @toc.brd.slug
  admin-panel.on \active, ({nav, name, panel}) ~>
    if name == \grp-list =>
      ld$.fetch "/dash/api/brd/#{@toc.brd.slug}/list", {method: \GET}, {type: \json}
        .then ~>
          @data = it
          @view.render!
        .catch error!

  @view = view = new ldView do
    root: opt.root
    handler: do
      prj: do
        list: ~> @data
        init: ({node,local,data}) ->
          local.view = new ldView do
            context: data
            root: node
            handler: do
              name: ({node,context}) ->
                node.innerText = context.name
                node.setAttribute \ld, \nav-tab
                node.setAttribute \data-nav, \main
                node.setAttribute \data-name, \grp-detail
              index: ({node,context}) -> node.innerText = context.key
              ownername: ({node,context}) -> node.innerText = context.ownername
              "budget-consume": ({node,context}) ->
              "budget-detail": ({node,context}) ->


  @

Ctrl.prototype = Object.create(Object.prototype) <<< {}

return Ctrl
