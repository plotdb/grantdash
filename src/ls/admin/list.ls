({error, loader, notify, ldcvmgr, auth, sdbAdapter, admin-panel}) <- ldc.register(
\adminPrjList, <[error loader notify ldcvmgr auth sdbAdapter adminPanel]>, _)
Ctrl = (opt) ->
  @toc = opt.toc
  @evt-handler = {}
  @data = []
  @filter = {badge:""}
  admin-panel.on \active, ({nav, name, panel}) ~>
    if name == \grp-list =>
      ld$.fetch "/dash/api/brd/#{@toc.brd.slug}/list", {method: \GET}, {params: {grp: @grp.key}, type: \json}
        .then ~>
          @data = it
          @data.map -> it.info = it.detail.info
          @view.render!
        .catch error!

  lc = {}
  render-debounced = debounce ~> @view.render \prj

  get-filtered-prj = ~>
    @data.filter ~>
      (!@filter.badge or (it.{}system.badge and it.system.badge[@filter.badge])) and
      it.slug and ( !lc.keyword or ~(
        [it.name,it.{}info.teamname,it.username,it.ownername].filter(->it).join(' ').indexOf(lc.keyword)
      ))

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
        "search-filter": ({node}) ~>
          @filter.badge = node.getAttribute \data-name
          @view.render!

        download: ({node}) ~>
          n = node.getAttribute(\data-name)
          type = node.getAttribute(\data-type) or \active
          ld$.fetch "/dash/api/brd/#{@toc.brd.slug}/grp/#{@grp.key}/prjs", {method: \GET}, {type: \json}
            .then (prjs = {}) ~>
              console.log prjs
              if type and type != \all =>
                prjs = prjs
                  .filter -> !it.deleted
                  .filter ->
                    if type == \active => it.state == \active
                    else it.{}system.{}badge[type]
              if n == \custom =>
                window.admin-extension = null
                custom = @hubs.brd.doc.data.custom
                return new Promise (res, rej) ~>
                  fallback = ~>
                    # hardwired open and some fields. 
                    if prjs.0 and prjs.0.{}detail.{}custom.open =>
                      heads = {}
                      prjs.map (p) -> for k,v of p.{}detail.{}custom.{}open => heads[k] = 1
                      heads = [k for k of heads]
                      head = heads
                        .map -> '"' + ('' + it).replace(/"/g,"'") + '"'
                      rows = prjs.map (p) ->
                        heads
                          .map (h) -> p.{}detail.{}custom.{}open[h] or ''
                          .map (v) ->
                            # TODO we need to parse format based on @makeform widgets
                            # for now we simply return v.v, v.vlist + v.other.enabled 
                            return if typeof(v) != \object => v
                            else if !v => ""
                            else if v.v? => v.v
                            else if v.list? or (v.other? and v.other.text?)  =>
                              (
                                (v.list or []) ++
                                [(if v.other and v.other.enabled => (v.other.text or '') else '')]
                              ).filter(-> it? and it != "")
                            else JSON.stringify(v)
                          .map -> '"' + ('' + it).replace(/"/g,"'") + '"'
                      blob = csv4xls.to-blob([head] ++ rows)
                      name = "#{@toc.brd.name}-#{@grp.info.name}.csv"
                      return {blob, name}

                    blob = new Blob([JSON.stringify(prjs)], {type: "application/json"})
                    name = "projects.json"
                    return res {blob, name}
                  if !(custom and custom.view) => return res fallback!
                  script = document.createElement \script
                  script.src = "/dash/js/view/#{custom.view}/admin.js?v=" + Math.random!toString(36)substring(2)
                  script.onload = ->
                    func = (admin-extension or {}).download-projects
                    if func => return res func {prjs}
                    else return res fallback!
                  script.onerror = -> res fallback!
                  document.body.appendChild script
              else
                if n == \csv =>
                  head = @grp.form.list
                    .filter (f) -> !(f.name in <[form-file]>)
                    .map -> it.title
                  # we need a form-block toString function, instead of manually construct its content here.
                  rows = prjs.map (p) ~>
                    @grp.form.list
                      .filter (f) -> !(f.name in <[form-file]>)
                      .map (f,i) ->
                        answer = p.detail.answer[f.key]
                        if !answer => return ''
                        if answer.content => return answer.content
                        if answer.list =>
                          return ((answer.list or []) ++ (if answer.other => [answer.other-value] else [])).join(',')
                        return ''

                  blob = csv4xls.to-blob([head] ++ rows)
                  name = "#{@toc.brd.name}-#{@grp.info.name}.csv"
                  return {blob, name}
                else
                  if n == \mail => prjs = prjs.map -> it{username, name}
                  blob = new Blob([JSON.stringify(prjs)], {type: "application/json"})
                  name = "projects-#{n}.json"
                  return {blob, name}

            .then ({blob, name}) ->
              url = URL.createObjectURL(blob)
              a = ld$.create name: \a, attr: {href: url, download: name}
              document.body.appendChild a
              a.click!
              document.body.removeChild a
              a.remove!

            .catch error!
    init: do
      "download-dropdown": ({node}) -> new Dropdown(node)
    text: do
      "prj-count": ({node}) -> get-filtered-prj!length
    handler: do
      "search-filter": ({node}) ~>
        node.classList.toggle \active, (node.getAttribute(\data-name) == @filter.badge or "")
      empty: ({node}) ~> node.classList.toggle \d-none, @data.filter(->it.slug).length
      prj: do
        list: ~> get-filtered-prj!
        handler: ({node, local, data}) ->
          local.view.set-context data
          local.view.render!
          if data.state == 'active' => node.style <<< {color: 'auto'}
          else node.style <<< {color: 'rgba(0,0,0,.6)'}
        init: ({node,local,data}) ~>
          local.view = new ldView do
            context: data
            root: node
            action: click: do
              "set-state": ({node, context}) ->
                name = node.getAttribute(\data-name)
                json = {value: name}
                loader.on!
                debounce 500
                  .then ->
                    ld$.fetch "/dash/api/prj/#{context.slug}/state", {method: \PUT}, {type: \json, json: json}
                  .finally ->
                    loader.off!
                  .then ->
                    notify.send \success, '更新成功'
                    context.state = name
                    local.view.render \state
                  .catch -> notify.send \danger, '更新失敗'
              "set-badge": ({node, context}) ->
                badge = context.{}system.{}badge
                name = node.getAttribute(\data-name)
                badge[name] = !badge[name]
                loader.on!
                debounce 500
                  .then ->
                    ld$.fetch "/dash/api/prj/#{context.slug}/badge", {method: \PUT}, {type: \json, json: badge}
                  .finally ->
                    loader.off!
                  .then ->
                    notify.send \success, '更新成功'
                    local.view.render \badge-state
                  .catch ->
                    notify.send \danger, '更新失敗'
                    badge[name] = !badge[name]
                    local.view.render \badge-state
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
            init: do
              state: ({node}) -> new Dropdown(node.parentNode)
              "badge-chooser": ({node}) -> new Dropdown(node.parentNode)
            text: do
              name: ({context}) -> context.name or '(未命名的提案)'
              index: ({context}) -> context.key
              state: ({context}) -> if context.state == 'active' => "已送件" else "編輯中"
              ownername: ({context}) -> context.{}info.teamname or context.ownername or ''
              username: ({context}) -> context.ownername or ''
            handler: do
              edit: ({node, context}) ~> node.setAttribute \href, "/dash/prj/#{context.slug}/edit"
              "badge-state": ({node, context}) ->
                badge = context.{}system.badge or {}
                name = node.getAttribute(\data-name)
                node.classList.toggle \on, !!(badge[name])
              state: ({node, context}) ->
                node.classList.toggle \text-success, (context.state == 'active')
                node.classList.toggle \text-warning, (context.state != 'active')
              "budget-consume": ({node,context}) ->
              "budget-detail": ({node,context}) ->
              avatar: ({node,context}) -> node.style.background = "url(/s/avatar/#{context.owner}.png)"

  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  set-hub: -> @hubs = it
  set-data: (grp) -> @grp = grp
  set-prj: (prj) -> @fire \set-prj, prj
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v


return Ctrl
