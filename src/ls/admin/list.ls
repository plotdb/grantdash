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
          @data.map -> it.info = it.detail.info
          @view.render!
        .catch error!


  @view = view = new ldView do
    root: opt.root
    handler: do
      empty: ({node}) ~> node.classList.toggle \d-none, @data.filter(->it.slug).length
      prj: do
        list: ~> @data.filter -> it.slug
        init: ({node,local,data}) ~>
          local.view = new ldView do
            context: data
            root: node
            action: click: do
              delete: ({node, context}) ~>
                if node.classList.contains \running => return
                node.classList.toggle \running, true
                ld$.fetch "/dash/api/prj/#{context.slug}", {method: \delete}, {type: \json}
                  .finally -> node.classList.toggle \running, false
                  .then ~>
                    notify.send \success, "成功刪除了「#{context.name}」提案"
                    idx = @data.indexOf(context)
                    if ~idx => @data.splice idx, 1
                    @view.render!
                  .catch error!
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
