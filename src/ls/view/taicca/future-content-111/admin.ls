window.admin-extension = do
  download-projects: ({prjs, toc, grp}) ->

    get-idx = (o) ->
      if o.{}system.idx => "111-#{("" + o.system.idx).padStart(3, "0")}"
      else o.key or 'n/a'


    # hardwired open and some fields. 
    console.log \here
    if prjs.0 and prjs.0.{}detail.{}custom.open =>
      heads = {}
      prjs.map (p) -> for k,v of p.{}detail.{}custom.{}open => heads[k] = 1
      heads = [k for k of heads]
      heads = ["編號"] ++ heads
      head = heads
        .map -> '' + ('' + it).replace(/"/g,"'") + ''
      rows = prjs.map (p) ->
        heads
          .map (h) ->
            if h == \編號 => {v: get-idx(p)}
            else p.{}detail.{}custom.{}open[h] or ''
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
          #.map -> '"' + ('' + it).replace(/"/g,"'") + '"'
          .map -> '' + ('' + it).replace(/"/g,"'") + ''
      blob = csv4xls.to-blob([head] ++ rows)
      name = "#{toc.brd.name}-#{grp.info.name}.csv"
      return {blob, name}

    blob = new Blob([JSON.stringify(prjs)], {type: "application/json"})
    name = "projects.json"
    return res {blob, name}

