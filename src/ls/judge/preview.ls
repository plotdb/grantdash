ldc.register "judge-preview", <[ldcvmgr]>, ({ldcvmgr}) ->
  node = {}
  prepare = ->
    ldcvmgr.getdom \judge-preview-attachment
    .then ->
      <[iframe obj embed]>.map -> node[it] = ld$.find(it, "[ld=#it]", 0)
  ldc.action do
    toggle: ({url,type}) ->
      node.iframe.setAttribute \src, url
      node.obj.setAttribute \data, url
      node.embed.setAttribute \src, url
      if type =>
        node.obj.setAttribute \type, type
        node.embed.setAttribute \type, type
      ldcvmgr.toggle \judge-preview-attachment
