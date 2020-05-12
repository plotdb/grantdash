(->

  ldc.register \orgInfo, <[loader]>, ({loader}) ->
    lc = {}
    notify = new ldNotify root: '.ldNotify', classIn: <[ld-fall-ttb-in]>
    slugs = {}
    tail.DateTime("input[name=starttime]")
    tail.DateTime("input[name=endtime]")
    slug-check = debounce 500, (n,v,e) -> 
      p = ld$.parent(form.fields[n], '.form-group')
      p.classList.add \running
      ld$.fetch '/d/o/slug-check', {method: \POST}, {json: {slug: v}, type: \json}
        .finally -> debounce 1000 .then -> p.classList.remove \running
        .then (r = {}) -> slugs[v] = (if r.result == \free => false else true)
        .catch -> slugs[v] = true
        .then -> form.check {n: 'slug'}


    form = new ldForm do
      root: "[ld-scope='org-info']"
      submit: "[ld='submit']"
      afterCheck: (s, f) ->
        if f.thumbnail.value =>
          if !( p = ld$.parent(f.thumbnail, '.bg') ) => return
          ldFile.fromFile f.thumbnail.files.0, \dataurl
            .then (r) -> p.style.backgroundImage = "url(#{r.result})"
        s.all = if <[name slug description]>.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
      verify: (n,v,e) ->
        adopter.update -> it[n] = v; it
        if n in <[slug]> =>
          if slugs[v]? => return if slugs[v] => 2 else 0
          slug-check n,v,e

          return 1
        return if !!v => 0 else 2
    view = new ldView do
      root: "[ld-scope='org-info']"
      action: click: submit: ({node}) ->
        loader.on!
        fd = form.getfd!
        ld$.fetch \/d/o/, {method: \POST, body: fd}, {type: \json}
          .then (r) -> 
            notify.send \success, '建立完成，將您導向組織主控台 ...'
            debounce 1000 .then -> window.location.href = "/o/#{r.key}/admin"
          .catch ->
            debounce 1000 .then -> loader.off!

    adopter = new Adopter path: <[info]>
    adopter.on \change, ->
      for k,v of @data => form.fields[k].value = v
    return adopter


  ldc.app \orgInfo
)!
