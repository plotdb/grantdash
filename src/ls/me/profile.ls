ldc.register <[]>, ->
  view = new ldView do
    root: '[ld-scope=profile]'
    handler: do
      prettydate: ({node}) ->
        date = moment(node.getAttribute(\data-value)).format("YYYY.MM.DD")
        node.innerText = date
