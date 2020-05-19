(->
  ldc.register \discus, <[auth]>, ({auth}) ->

    renderer = new marked.Renderer!
    renderer.heading = (text, level) -> text
    marked-options = {renderer}

    auth.get!then (g) ->
      fetch = ->
      post = ->
      lc = {}
      view = new ldView do
        root: '[ld-scope=discus-edit]'
        action: do
          input: do
            "use-markdown": ({node}) ->
              lc.use-markdown = node.checked
              view.render!
            "toggle-preview": ({node}) ->
              lc.preview = !!node.checked
              view.render!
            comment: ({node}) -> lc.content = node.value
          click: do
            link: ->
            attach: ->
            post: ->
        handler: do
          avatar: ({node}) -> node.style.backgroundImage = "url(/s/avatar/#{g.user.key}.png)"
          preview: ({node}) ->
            revert = ("off" in node.getAttribute(\ld).split(" "))
            node.classList.toggle \d-none, (if revert => !!lc.preview else !lc.preview)
          panel: ({node}) ->
            if lc.preview => node.innerHTML = marked((lc.content or ''), marked-options)
          "edit-panel": ({node}) -> node.classList.toggle \d-none, !!lc.preview
          "if-markdown": ({node}) -> node.classList.toggle \d-none, !lc.use-markdown



  ldc.app \discus
)!
