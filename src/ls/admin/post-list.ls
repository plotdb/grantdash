({loader, ldcvmgr, error, admin-panel}) <- ldc.register \adminPostList, <[loader ldcvmgr error adminPanel]>, _

Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @posts = []
  @view = {}
  @ldcv = {}

  @view.list = new ldView do
    init-render: false
    root: @root
    action: click: do
      "new-post": ~> @toggle-modal!
    handler: do
      loading: ({node}) -> node.classList.toggle \d-none, true
      empty: ({node}) ~> node.classList.toggle \d-none, (@posts and @posts.length)
      editor: ({node}) -> node.classList.toggle \d-none, true
      post: do
        list: ~> @posts or []
        init: ({node, local,data}) ->
          node.classList.remove \d-none
          local.view = new ldView do
            root: node
            context: data
            action: click: do
              edit: ({node, context}) ~> @edit context.slug
            handler: do
              title: ({node, context}) -> node.innerText = context.title
              owner: ({node, context}) -> node.innerText = context.ownername
              date: ({node, context}) -> node.innerText = moment(context.createdtime).format("YYYY-MM-DD hh:mm:ss")
              avatar: ({node, context}) ->
                node.style.backgroundImage = "url(/s/avatar/#{context.owner}.png)"
              view: ({node, context}) -> node.setAttribute \href, "/post/#{context.slug}/"
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!
  admin-panel.on \active, ({nav, name, panel}) ~>
    if name == \brd-post-list => @fetch!
  @
Ctrl.prototype = Object.create(Object.prototype) <<< do
  render: -> @view.list.render!
  fetch: ->
    ld$.fetch \/dash/api/post/, {method: \GET}, {params: {brd: @brd.slug}, type: \json}
      .then ~>
        @posts = it
        @render!
  edit: (slug) ->
    editor = @view.list.get('editor')
    console.log editor
    editor.src = "/dash/post/#{slug}/edit"
    editor.classList.toggle \d-none, false

  toggle-modal: ->
    if @ldcv.new-post => that.toggle!
    ldcvmgr.getdom("new-post")
      .then (dom) ~>
        @form = new ldForm do
          root: dom
          submit: '[ld=post]'
        @view.create = new ldView do
          root: dom
          action: click: post: ({node}) ~>
            loader.on!
            payload = {brd: \sch001, title: @form.values!title}
            ld$.fetch "/dash/api/post/", {method: \POST}, {json: payload, type: \json}
              .then (ret) ~> 
                @edit ret.slug
                loader.off!
                @ldcv.new-post.toggle false
              .catch error!
        ldcvmgr.getcover \new-post
      .then ~> @ldcv.new-post = it
      .then ~> @ldcv.new-post.toggle!

Ctrl
