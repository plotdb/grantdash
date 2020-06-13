ldc.register <[ldcvmgr error]>, ({ldcvmgr, error}) ->
  lc = {}
  form = new ldForm do
    root: '[ld-scope=post-new]'
    submit: '[ld=post]'
  view = new ldView do
    root: '[ld-scope=post-new]'
    action: click: post: ({node}) ->
      payload = {brd: \sch001, title: form.values!title}
      ld$.fetch "/dash/api/post/", {method: \POST}, {json: payload, type: \json}
        .then (ret) ->
          window.location.href = "/dash/post/#{ret.slug}/edit"
        .catch error!
  view-posts = new ldView do
    init-render: false
    root: '[ld-scope=posts]'
    action: click: do
      "new-post": -> ldcvmgr.toggle("post-new")
    handler: do
      loading: ({node}) -> node.classList.toggle \d-none, true
      empty: ({node}) -> node.classList.toggle \d-none, (lc.posts and lc.posts.length)
      post: do
        list: -> lc.posts or []
        init: ({node, local,data}) ->
          node.classList.remove \d-none
          local.view = new ldView do
            root: node
            context: data
            handler: do
              title: ({node, context}) -> node.innerText = context.title
              owner: ({node, context}) -> node.innerText = context.ownername
              date: ({node, context}) -> node.innerText = moment(context.createdtime).format("YYYY-MM-DD hh:mm:ss")
              avatar: ({node, context}) ->
                node.style.backgroundImage = "url(/s/avatar/#{context.owner}.png)"
              edit: ({node, context}) -> node.setAttribute \href, "/post/#{context.slug}/edit"
              view: ({node, context}) -> node.setAttribute \href, "/post/#{context.slug}/"
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!

  ld$.fetch \/dash/api/post/, {method: \GET}, {params: {brd: 'sch001'}, type: \json}
    .then ->
      lc.posts = it
      view-posts.render!
