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

  lc = {}
  render-debounced = debounce ~> @view.render \prj

  @view = view = new ldView do
    root: opt.root
    action: do
      input: do
        "search-input": ({node}) ->
          lc.keyword = node.value
      keypress: do
        "search-input": ({node, evt}) ~> if evt.keyCode == 13 => @view.render!
      click: do
        search: ~> @view.render!
        download: ({node}) ~>
          n = node.getAttribute(\data-name)
          ld$.fetch "/dash/api/brd/#{@toc.brd.slug}/grp/#{@grp.key}/prjs", {method: \GET}, {type: \json}
            .then (ret = {}) ->
              if n == \mail => ret = ret.map -> it{username, name}
              blob = new Blob([JSON.stringify(ret)], {type: "application/json"})
              url = URL.createObjectURL(blob)
              a = ld$.create name: \a, attr: {href: url, download: "projects-#{n}.json"}
              document.body.appendChild a
              a.click!
              document.body.removeChild a
              a.remove!
              console.log url

            .catch error!
    handler: do
      empty: ({node}) ~> node.classList.toggle \d-none, @data.filter(->it.slug).length
      prj: do
        list: ~>
          @data.filter ->
            it.slug and ( !lc.keyword or ~(
              [it.name,it.{}info.teamname,it.username,it.ownername].filter(->it).join(' ').indexOf(lc.keyword)
            ))
        init: ({node,local,data}) ~>
          local.view = new ldView do
            context: data
            root: node
            action: click: do
              delete: ({node, context}) ~>
                if node.classList.contains \running => return
                ldcvmgr.get \confirm-deletion
                  .then ~>
                    if it != \yes => return
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
            text: do
              name: ({context}) -> context.name
              index: ({context}) -> context.key
              ownername: ({context}) -> context.{}info.teamname or context.ownername or ''
              username: ({context}) -> context.ownername or ''
            handler: do
              "budget-consume": ({node,context}) ->
              "budget-detail": ({node,context}) ->
              avatar: ({node,context}) -> node.style.background = "url(/s/avatar/#{context.owner}.png)"

  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-data: (grp) -> @grp = grp
  set-prj: (prj) -> @fire \set-prj, prj
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v


return Ctrl
