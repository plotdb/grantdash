({error, loader, notify, ldcvmgr, auth, sdbAdapter, admin-panel}) <- ldc.register(
\adminPrjList, <[error loader notify ldcvmgr auth sdbAdapter adminPanel]>, _)
Ctrl = (opt) ->
  @toc = opt.toc
  @evt-handler = {}
  @data = []
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
        init: ({node,local,data}) ~>
          local.view = new ldView do
            context: data
            root: node
            action: click: do
              name: ({node, context}) ~>
                admin-panel.toggle {nav: \main, name: \grp-detail}
                @set-prj context
            handler: do
              name: ({node,context}) ->
                node.innerText = context.name
              index: ({node,context}) -> node.innerText = context.key
              ownername: ({node,context}) -> node.innerText = context.ownername
              "budget-consume": ({node,context}) ->
              "budget-detail": ({node,context}) ->

  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-prj: (prj) -> @fire \set-prj, prj
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v


return Ctrl
