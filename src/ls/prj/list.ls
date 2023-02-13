ldc.register <[util viewLocals]>, ({util, viewLocals}) ->
  full-count = (viewLocals.0 or {}).full_count
  prj = viewLocals.0 or {}
  cur = do
    offset: util.parse-querystring("offset")
    limit: (+util.parse-querystring("limit") or 500) >? 1 <? 500
  lc = {}
  query = util.parse-querystring!
  build-querystring = (obj = {},overwrite = {}) -> "?" + ["#k=#v" for k,v of ({} <<< obj <<< overwrite)].join('&')
  badge = (query.badge or '').split(',').filter(->it)
  active-tags = (query.tag or '').split(',').filter(->it)
  tags = Array.from(new Set(ld$.find("[data-type=tag]").map(-> it.getAttribute(\data-name)).filter(->it)))
  view = new ldView do
    root: '[ld-scope=project-list]'
    action: click: do
      "all-tag": ->
        window.location.href = window.location.pathname
      search: ->
        name = view.get("search-input").value or ''
        if name => window.location.href = window.location.pathname + "?keyword=#name"
      "badge-btn": ({node}) ->
        n = node.getAttribute(\data-name)
        window.location.href = window.location.pathname + build-querystring(if n == \all => {} else {badge: n})
    handler: do
      "badge-btn": ({node}) ->
        n = node.getAttribute(\data-name)
        active = if n != \all => (n in badge) else !badge.length
        node.classList.toggle \active, active
      "search-input": ({node}) ->
        node.value = (util.parse-querystring("keyword") or '')
      pagination: do
        list: -> [0 til Math.ceil(full-count/(cur.limit))]
        handler: ({node, data}) ->
          node.innerText = (data + 1)
          offset = data * cur.limit
          node.setAttribute \href, "/dash/brd/#{prj.brd}/list" + build-querystring(query, {offset})
      tags: ({node}) -> node.classList.toggle \d-none, !tags.length
      "tag-btn":
        list: -> tags
        handler: ({node, data}) ->
          node.innerText = data
          active = (data in active-tags) and tags.length
          qs = if active => "" else build-querystring({tag: data})
          node.classList.toggle \active, active
          <- node.addEventListener \click, _
          window.location.href = window.location.pathname + qs

