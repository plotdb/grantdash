(->

  ldc.register \prjInfo, <[loader notify]>, ({loader, notify}) ->
    lc = {}

    form = new ldForm do
      root: "[ld-scope='prj-info']"
      submit: "[ld='submit']"
      afterCheck: (s, f) ->
        s.all = if <[name description]>.reduce(((a,b) -> a and s[b] == 0),true) => 0 else 2
      verify: (n,v,e) ->
        adopter.update -> it[n] = v; it
        return if !!v => 0 else 2
    view = new ldView do
      root: "[ld-scope='prj-info']"
      action: click: submit: ({node}) ->

    adopter = new Adopter path: ['group', 0]
    adopter.on \change, ->
      for k,v of @data => if form.fields[k] => form.fields[k].value = v
    return adopter


  ldc.app \prjInfo
)!
