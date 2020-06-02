ldc.register \prjView, <[auth error viewLocals]>, ({auth, error, viewLocals}) ->
  auth.get!
    .then (g) ->

      view = new ldView do
        root: document.body
        init:
          "btn-share": ({node, local}) ->
            local.clipboard = new ClipboardJS node, { text: (t) -> return window.location.href }
            local.clipboard.on \success, ->
              clearTimeout local.h
              node.classList.add \tip-on
              local.h = setTimeout (-> node.classList.remove \tip-on), 1000
        handler: do
          "btn-edit": ({node}) -> node.classList.toggle \d-none, (g.user.key != viewLocals.owner)
     
    .catch error!

ldc.app \prjView
