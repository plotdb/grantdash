ldc.register <[auth]>, ({auth}) ->
  auth.get!then (global) ->
    lc = {}
    view = new ldView do
      global: true
      root: document.body
      action: click: do
        "grantdash-logout": ({node}) ->
          ld$.fetch '/dash/api/u/logout', {method: \POST}, {}
            .finally -> window.location.reload!
        "grantdash-propose": ({node}) ->

      handler: do
        "grantdash-logout": ({node}) ->
          node.style.display = (if !global.user.key => "none" else "")
        "grantdash-propose": ({node}) ->
        "grantdash-login": ({node}) ->
          node.style.display = (if global.user.key => "none" else "")
          node.setAttribute \href, "/dash/auth/?nexturl=#{window.location.pathname}"
        "grantdash-project-list-link": ({node}) -> console.log node.getAttribute(\pd)
        "grantdash-project-list": ({node}) -> console.log node.getAttribute(\pd)
        "grantdash-project-list-item": do
          list: -> lc.data
          init: ({node, data, local}) ->
            local.view = new ldView do
              context: data
              root: node
              handler: do
                title: ({node, context}) -> node.innerText = context.name
                description: ({node, context}) -> node.innerText = context.description
                thumb: ({node, context}) -> if context.thumb => node.style.backgroundImage = "url(#{context.thumb})"
          handler: ({node, local, data}) ->
            node.setAttribute \href, "/dash/prj/#{data.slug}"

            local.view.setContext data
            local.view.render!
    ld$.fetch "/dash/api/brd/g0v-unith1n/prj/list", {method: \GET}, {type: \json}
      .then ->
        lc.data = it
        view.render!
      .catch ->
