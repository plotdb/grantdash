(->
  ldc.register \adminInfo, <[loader notify ldcvmgr auth sdbAdopter]>, ({loader, notify, ldcvmgr, auth, sdbAdopter}) ->
    Ctrl = (opt) ->
      @opt = opt
      @type = type = if opt.type == \org => \o else \b
      root = opt.root
      @root = root = if typeof(root) == \string => document.querySelector(root) else root
      slugs = {}

      slug-check = debounce 500, (n,v,e) -> 
        p = ld$.parent(form.fields[n], '.form-group')
        p.classList.add \running
        ld$.fetch "/d/slug-check/#type", {method: \POST}, {json: {slug: v}, type: \json}
          .finally -> debounce 1000 .then -> p.classList.remove \running
          .then (r = {}) -> slugs[v] = (if r.result == \free => false else true)
          .catch -> slugs[v] = true
          .then -> form.check {n: 'slug'}

      form = new ldForm do
        root: root
        submit: '[ld=submit]'
        afterCheck: (s, f) ->
          if f.thumbnail.value =>
            if !( p = ld$.parent(f.thumbnail, '.bg') ) => return
            ldFile.fromFile f.thumbnail.files.0, \dataurl
              .then (r) -> p.style.backgroundImage = "url(#{r.result})"
          s.all = if <[name slug description]>.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
        verify: (n,v,e) ~>
          if @adopter => @adopter.update -> it[n] = v; it
          if n in <[slug]> =>
            if !/^[a-zA-Z0-9-]+$/.exec(v) => return 2
            if slugs[v]? => return if slugs[v] => 2 else 0
            slug-check n,v,e

            return 1
          return if !!v => 0 else 2
      view = new ldView do
        root: root
        init: "tail-datetime": ({node}) -> tail.DateTime(node)
        action: click: submit: ({node}) ->
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
            .catch ->

    Ctrl.prototype = Object.create(Object.prototype) <<< do
      adopt: ->
        @adopter = adopter = new sdbAdopter path: <[info]>
        adopter.on \change, -> for k,v of @data => form.fields[k].value = v
        return adopter
    return Ctrl
)!
