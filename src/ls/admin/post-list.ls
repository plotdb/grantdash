({notify, auth, loader, ldcvmgr, error, admin-panel}) <- ldc.register \adminPostList,
<[notify auth loader ldcvmgr error adminPanel]>, _

Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @brd = opt.brd
  @posts = []
  @view = {}
  @ldcv = {}
  @ldld = new ldLoader root: ld$.find(root, '[ld=loading]', 0)

  @view.list = new ldView do
    init-render: false
    root: @root
    action: click: do
      "new-post": ~> @toggle-modal!
      "sync-list": ({node}) ~>
        node.classList.add \running
        @fetch!then -> debounce 1000 .then -> node.classList.remove \running
    handler: do
      empty: ({node}) ~> node.classList.toggle \d-none, (@posts and @posts.length)
      editor: ({node}) -> node.classList.toggle \d-none, true
      post: do
        list: ~> @posts or []
        init: ({node, local, data}) ~>
          node.classList.remove \d-none
          local.view = new ldView do
            root: node
            context: data
            action: click: do
              edit: ({node, context}) ~> @edit context.slug
              delete: ({node, context}) ~>
                ldcvmgr.get \confirm-deletion
                  .then (ret) ~>
                    if ret != \yes => return
                    ld$.fetch "/dash/api/post/#{context.slug}", {method: \delete}
                      .then -> notify.send \success, \文章已刪除
                      .then ~>
                        idx = @posts.indexOf(context)
                        if !(~idx) => return
                        @posts.splice idx, 1
                        @view.list.render!
                  .catch error!

            handler: do
              title: ({node, context}) -> node.innerText = context.title
              owner: ({node, context}) -> node.innerText = context.ownername
              date: ({node, context}) -> node.innerText = moment(context.createdtime).format("YYYY-MM-DD hh:mm:ss")
              avatar: ({node, context}) ->
                node.style.backgroundImage = "url(/dash/s/avatar/#{context.owner}.png)"
              view: ({node, context}) -> node.setAttribute \href, "/dash/post/#{context.slug}/"
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!
  admin-panel.on \active, ({nav, name, panel}) ~>
    if name != \brd-post-list => return
    @edit null
    @fetch!
  @
Ctrl.prototype = Object.create(Object.prototype) <<< do
  render: -> @view.list.render!
  fetch: ->
    @ldld.on!
    ld$.fetch \/dash/api/post/, {method: \GET}, {params: {brd: @brd.slug}, type: \json}
      .then ~>
        @posts = it
        @render!
        @ldld.off!
  edit: (slug) ->
    editor = @view.list.get('editor')
    if slug => editor.src = "/dash/post/#{slug}/edit"
    editor.classList.toggle \d-none, !slug

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
            payload = {brd: @brd.slug, title: @form.values!title}
            auth.recaptcha.get!
              .then (recaptcha) ->
                payload.recaptcha = recaptcha
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
