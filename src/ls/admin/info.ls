({loader, notify, ldcvmgr, auth, sdbAdapter}) <- ldc.register(
\adminInfo, <[loader notify ldcvmgr auth sdbAdapter]>, _)
Ctrl = (opt) ->
  @opt = opt
  @type = type = {org: 'o', prj: 'p', brd: 'b'}[opt.type] or null
  if !type => throw new ldError(1015)
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  # committed data in table, if available
  @data = opt.data
  slugs = {}

  slug-check = debounce 500, (n,v,e) ->
    p = ld$.parent(form.fields[n], '.form-group')
    p.classList.add \running
    ld$.fetch "/d/slug-check/#type", {method: \POST}, {json: {slug: v}, type: \json}
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
      if f.thumbnail and f.thumbnail.value =>
        if !( p = ld$.parent(f.thumbnail, '.bg') ) => return
        ldFile.fromFile f.thumbnail.files.0, \dataurl
          .then (r) -> p.style.backgroundImage = "url(#{r.result})"
      fields = <[name slug description brd]>.filter -> f[it]
      if f.brd and f.brd.value => s.brd = 0
      s.all = if fields.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
    verify: (n,v,e) ~>
      if !(n in <[slug]>) => @ops-out (d) -> d[n] = v; d
      if n in <[slug]> =>
        if !/^[a-zA-Z0-9-]+$/.exec(v) => return 2
        if slugs[v]? => return if slugs[v] => 2 else 0
        slug-check n,v,e

        return 1
      return if !!v => 0 else 2

  lc = {}

  view = new ldView do
    root: root
    init: do
      "tail-datetime": ({node}) -> tail.DateTime(node)
      orgs: ->
        payload = {type: \org}
        auth.get!
          .then (g) ->
            ld$.fetch \/d/me/list/, {method: \POST}, {json: payload, type: \json}
          .then ->
            lc.list = it
            view.render!
          .catch -> console.log it
    handler: do
      org: do
        key: -> it.key
        list: -> (lc.list or []) ++ [{name: "無", key: null}]
        handler: ({node, data}) ->
          node.innerText = data.name + (if !data.slug => '' else " ( #{data.slug} )")
          node.setAttribute \value, data.key

    action: click:
      delete: ~>
        p = @adapter.path
        if p.0 != \group => return
        ks = [k for k of @adapter.doc.data.group]
        if ks.length == 1 => return
        @adapter.doc.submitOp [ {p: ['group',p.1],  od: @adapter.doc.data.group[p.1] } ]
        @set-path ['group', ks.0, 'info']
        @opt.set-group @adapter.doc.data.group[ks.0]

      submit: ({node}) ->
        if node.classList.contains \disabled => return
        auth.ensure!
          .then ->
            loader.on!
            fd = form.getfd!
            ld$.fetch "/d/#type/", {method: \POST, body: fd}, {type: \json}
              .then (r) ->
                loader.off!
                ldcvmgr.toggle \redirect
                debounce 1000 .then -> window.location.href = "/#type/#{form.values!slug}/admin"
              .catch ->
                loader.off!
                ldcvmgr.toggle 'error'
          .catch -> lda.ldcvmgr.toggle 'auth-required'

  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    for k,v of @form.fields => if !(k in <[slug]>) => @form.fields[k].value = data[k] or ''

return Ctrl
