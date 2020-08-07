ldc.register <[util viewLocals]>, ({util, viewLocals}) ->
  full-count = (viewLocals.0 or {}).full_count
  prj = viewLocals.0 or {}
  cur = do
    offset: util.parse-querystring("offset")
    limit: (+util.parse-querystring("limit") or 24) >? 1 <? 100
  lc = {}
  query = util.parse-querystring!
  badge = (query.badge or '').split(',').filter(->it)
  view = new ldView do
    root: '[ld-scope=project-list]'
    action: click: do
      search: ->
        name = view.get("search-input").value or ''
        if name => window.location.href = window.location.pathname + "?keyword=#name"
      "badge-btn": ({node}) ->
        n = node.getAttribute(\data-name)
        window.location.href = window.location.pathname + (if n == \all => '' else "?badge=#n")
    handler: do
      "badge-btn": ({node}) ->
        n = node.getAttribute(\data-name)
        active = if n != \all => (n in badge) else !badge.length
        node.classList.toggle \active, active
      "search-input": ({node}) ->
        node.value = (util.parse-querystring("keyword") or '')
      pagination: do
        list: -> [0 til Math.ceil(full-count/24)]
        handler: ({node, data}) ->
          node.innerText = (data + 1)
          offset = data * cur.limit
          node.setAttribute \href, "/dash/brd/#{prj.brd}/list?offset=#offset"

