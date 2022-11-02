({discuss-edit}) <- ldc.register \discussView, <[discussEdit]>,  _
Ctrl = (opt) ->
  loader = new ldLoader className: "full ldld"
  @opt = opt
  @marked-options = opt.marked or {}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @data = {url: window.location.pathname} <<< opt.data
  @edit = new discuss-edit root: ld$.find(root, '[ld-scope=edit]', 0)
  @comments = []
  @edit.init!
  @edit.on \new-comment, (c) ~>
    c <<< { distance: @comments.length, state: \active }
    @comments.push c
    @view.render!
  @view = view = new ldView do
    init-render: false
    root: @root
    handler: do
      loading: ({node,names}) ~> node.classList.toggle \d-none, !(@loading xor ('off' in names))
      title: ({node}) ~>
        title = if @discuss => @discuss.title else ''
        node.innerText = title or '未命名的討論串'
      comment: do
        list: ~> @comments
        init: ({node, data, idx}) ->
          node.classList.add \ld, \ld-float-ltr-in, \xp35
          node.style.animationDelay = "#{idx * 0.1}s"
          view = new ldView do
            root: node
            action: click: delete: ({node}) ->
              loader.on!
              ld$.fetch "/api/discuss/#{data.key}", {method: \DELETE}
                .finally -> loader.off!
                .catch error!

            handler: do
              avatar: ({node}) -> node.style.backgroundImage = "url(/dash/s/avatar/#{data.owner}.png)"
              author: ({node}) -> node.innerText = data.displayname
              role: ({node}) ->
                node.classList.toggle \d-none, !data.role
                ld$.find(node, 'span', 0).innerText = data.role
              date: ({node}) ->
                node.innerText = moment(data.createdtime).tz("Asia/Taipei").format("YYYY/MM/DD hh:mm:ss")
              content: ({node}) ->
                if data.content.{}config.use-markdown =>
                  node.innerHTML = marked(data.content.body)
                else
                  node.innerText = data.content.body

  @


Ctrl.prototype = Object.create(Object.prototype) <<< do
  init: ->
    @loading = true
    payload = if @data.slug => @data{slug} else @data{url}
    ld$.fetch \/dash/api/discuss, {method: \GET}, {params: payload, type: \json}
      .finally ~> @loading = false
      .then (ret) ~>
        @ <<< ret{comments, discuss}
        @comments = ret.comments or []
        @discuss = ret.discuss or {}
        @view.render!

Ctrl
