ldc.register <[error ldcvmgr notify loader]>, ({error, ldcvmgr, notify, loader}) ->
  view = new ldView do
    root: '[ld-scope=profile]'
    action: click: do
      delete: ({node}) ->
        if !(slug = node.getAttribute(\data-slug)) => return
        ldcvmgr.get \confirm-deletion
          .then ->
            if it != \yes => return
            loader.on!
            ld$.fetch "/dash/api/prj/#{slug}", {method: \delete}
              .finally -> loader.off!
              .then ->
                notify.send \success, "提案已刪除"
              .catch error!

    handler: do
      prettydate: ({node}) ->
        date = moment(node.getAttribute(\data-value)).format("YYYY.MM.DD")
        node.innerText = date
