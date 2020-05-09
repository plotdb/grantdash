(->
  ldc.register \orgBasic, [], ->
    share = {name: "布拉國", description: "告訴你一個神秘的地方..."}
    ldld = new ldLoader className: "ldld full"
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
      root: "[ld-scope='org-basic']"
      submit: "[ld='submit']"
      afterCheck: (s, f) ->
        if f.thumbnail.value =>
          if !( p = ld$.parent(f.thumbnail, '.bg') ) => return
          ldFile.fromFile f.thumbnail.files.0, \dataurl
            .then (r) -> p.style.backgroundImage = "url(#{r.result})"
        s.all = if <[name slug description]>.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
      verify: (n,v,e) ->
        adopter.update n, v
        if n in <[slug]> =>
          if slugs[v]? => return if slugs[v] => 2 else 0
          slug-check n,v,e

          return 1
        return if !!v => 0 else 2
    view = new ldView do
      root: "[ld-scope='org-basic']"
      action: click: submit: ({node}) ->
        ldld.on!
        fd = form.getfd!
        ld$.fetch \/d/o/, {method: \POST, body: fd}, {type: \json}
          .then (r) -> 
            notify.send \success, '建立完成，將您導向組織主控台 ...'
            debounce 1000 .then -> window.location.href = "/o/#{r.key}/admin"
          .catch ->
            debounce 1000 .then -> ldld.off!
    for k,v of share =>
      form.fields[k].value = v

    return adopter = do
      install: ->
        @ <<< it{sdb, doc}
        share := JSON.parse(JSON.stringify(@doc.data))
        @watch share
      update: (n, v) ->
        cur = JSON.parse(JSON.stringify(share))
        cur[n] = v
        console.log share, cur
        op = @sdb.json.diff(share, cur)
        # TODO compare relative to subtree, restore to absolute path when submit 
        if op and op.length => @doc.submitOp op
      watch: (data) ->
        share <<< data
        for k,v of share =>
          form.fields[k].value = v


  ldc.app \orgBasic
)!
