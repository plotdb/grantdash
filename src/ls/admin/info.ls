({loader, notify, ldcvmgr, auth, sdbAdapter}) <- ldc.register(
\adminInfo, <[loader notify ldcvmgr auth sdbAdapter]>, _)
Ctrl = (opt) ->
  @opt = opt
  @type = type = if opt.type == \org => \o else \b
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  slugs = {}

  slug-check = debounce 500, (n,v,e) ->
    p = ld$.parent(form.fields[n], '.form-group')
    p.classList.add \running
    ld$.fetch "/d/slug-check/#type", {method: \POST}, {json: {slug: v}, type: \json}
      .finally -> debounce 1000 .then -> p.classList.remove \running
      .then (r = {}) -> slugs[v] = (if r.result == \free => false else true)
      .catch -> slugs[v] = true
      .then -> form.check {n: 'slug'}

  @form = form = new ldForm do
    root: root
    submit: '[ld=submit]'
    afterCheck: (s, f) ->
      if f.thumbnail and f.thumbnail.value =>
        if !( p = ld$.parent(f.thumbnail, '.bg') ) => return
        ldFile.fromFile f.thumbnail.files.0, \dataurl
          .then (r) -> p.style.backgroundImage = "url(#{r.result})"
      s.all = if <[name slug description]>.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
    verify: (n,v,e) ~>
      @ops-out (d) -> d[n] = v; d
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
        auth.ensure!
          .then ->
            loader.on!
            fd = form.getfd!
            ld$.fetch "/d/#type/", {method: \POST, body: fd}, {type: \json}
              .then (r) ->
                notify.send \success, '建立完成，將您導向主控台 ...'
                debounce 1000 .then -> window.location.href = "/#type/#{form.values!slug}/admin"
              .catch ->
                loader.off!
                ldcvmgr.toggle 'error'
          .catch -> lda.ldcvmgr.toggle 'auth-required'

  return @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    for k,v of @form.fields => @form.fields[k].value = data[k] or ''

return Ctrl
