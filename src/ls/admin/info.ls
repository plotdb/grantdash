({error, loader, notify, ldcvmgr, auth, sdbAdapter}) <- ldc.register(
\adminInfo, <[error loader notify ldcvmgr auth sdbAdapter]>, _)
Ctrl = (opt) ->
  @opt = opt
  @type = type = opt.type or null
  if !type in <[org brd grp prh]> => if !type => throw new ldError(1015, "admin-info: malform type.")
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  # committed data in table, if available
  @data = opt.data
  @toc = opt.toc
  slugs = {}

  slug-check = debounce 500, (n,v,e) ->
    p = ld$.parent(form.fields[n], '.form-group')
    p.classList.add \running
    ld$.fetch "/dash/api/slug-check/#type", {method: \POST}, {json: {slug: v}, type: \json}
      .finally -> debounce 1000 .then -> p.classList.remove \running
      .then (r = {}) -> slugs[v] = (if r.result == \free => false else true)
      .catch -> slugs[v] = true
      .then -> form.check {n: 'slug'}

  slug = (@data or {}).slug
  @form = form = new ldForm do
    root: root
    values: if slug => {slug} else {}
    submit: '[ld=submit]'
    afterCheck: (s, f) ->
      fields = <[name slug description brd grp]>.filter -> f[it]
      # brd and grp information is filled automatically by program so it's either 0 or 2
      <[brd grp]>.map (n) -> s[n] = if f[n] and f[n]value => 0 else 2
      s.all = if fields.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
    verify: (n,v,e) ~>
      if !(n in <[slug]>) => @ops-out (d) -> d[n] = v; d
      if n in <[slug]> =>
        if !/^[a-zA-Z0-9-]+$/.exec(v) => return 2
        if slugs[v]? => return if slugs[v] => 2 else 0
        slug-check n,v,e
        return 1
      if n in <[limit]> => return 1
      return if !!v => 0 else 2

  lc = {}

  @view = view = new ldView do
    root: root
    init: do
      "tail-datetime": ({node}) -> tail.DateTime(node)
      orgs: ->
        payload = {type: \org}
        auth.get!
          .then (g) ->
            ld$.fetch \/dash/api/me/list/, {method: \POST}, {json: payload, type: \json}
          .then ->
            lc.list = it
            view.render!
          .catch -> console.log it
    handler: do
      bg: ({node}) ~>
        name = node.getAttribute(\data-name)
        url = if type == \org => "url(/dash/org/#slug/upload/#{@form.values![name]})"
        else if type == \brd => "url(/dash/org/#{@toc.org.slug}/brd/#slug/upload/#{@form.values![name]})"
        else 'none'
        node.style.backgroundImage = url
      org: do
        key: -> it.key
        list: -> (lc.list or []) ++ [{name: "無", key: null}]
        handler: ({node, data}) ->
          node.innerText = data.name + (if !data.slug => '' else " ( #{data.slug} )")
          node.setAttribute \value, (data.slug or '')
      "delete-group": ({node}) ~>
        disabled = !(@adapter and @adapter.doc and @adapter.doc.data.group and @adapter.doc.data.group.length > 1)
        node.classList.toggle \disabled, disabled

    action: do
      change: do
        file: ({node}) ->
          name = node.getAttribute(\data-name)
          if !(name in <[thumb banner]>) => return
          if !( p = ld$.parent(node, '.bg') ) => return
          if !( btn = ld$.parent(node, '.btn') ) => return
          if !node.files.length => return
          ldFile.fromFile node.files.0, \dataurl
            .then (r) -> p.style.backgroundImage = "url(#{r.result})"
          btn.classList.toggle \running, true
          fd = new FormData!
          fd.append type, slug
          fd.append "#{name}[]", node.files.0
          ld$.fetch \/dash/api/upload, {method: \POST, body: fd}, {type: \json}
            .finally -> debounce 1000 .then -> btn.classList.toggle \running, false
            .then (ret-files) ->
              node.value = ""
              form.field(name).value = ret-files.0.fn
              form.check {n: name, now: true}
              console.log "uploaded", ret-files
            .catch (e) ->
              console.log e
              error! e

      click: do
        "delete-group": ({node}) ~>
          if node.classList.contains \disabled => return
          if !(grp = @adapter.doc.data.group[@adapter.path.1]) => return
          @opt.delete-group grp.key
        "clone-group": ({node}) ~>
          if !(grp = @adapter.doc.data.group[@adapter.path.1]) => return
          @opt.clone-group grp.key

        submit: ({node}) ->
          if node.classList.contains \disabled => return
          auth.ensure!
            .then -> if type == \prj => auth.consent {type: \tos, timing: \prj-create, force: true}
            .then ->
              loader.on!
              fd = form.getfd!
              ld$.fetch "/dash/api/#type/", {method: \POST, body: fd}, {type: \json}
                .then (r) ->
                  loader.off!
                  ldcvmgr.toggle \redirect
                  debounce 1000 .then ->
                    if type == \prj => window.location.href = "/dash/prj/#{r.slug}/edit"
                    else window.location.href = "/dash/#type/#{form.values!slug}/admin"
                .catch ->
                  loader.off!
                  ldcvmgr.toggle 'error'
            .catch -> lda.ldcvmgr.toggle 'auth-required'

  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    for k,v of @form.fields => if !(k in <[slug]>) =>
      if @form.fields[k].getAttribute(\type) == \file => continue
      @form.fields[k].value = data[k] or ''
    @view.render!

return Ctrl
