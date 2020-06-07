({auth, error}) <- ldc.register \discussEdit, <[auth error]>, _

/*
 params
   root: editor html root element
*/

Ctrl = (opt) ->
  @opt = opt
  @marked-options = opt.marked or {}
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @data = {content: {}, url: window.location.pathname, reply: null} <<< opt.data
  @ <<< {preview: false, use-markdown: false, ready: false, ldld: null, evt-handler: {}}

  @view = view = new ldView do
    init-render: false
    root: root
    action: do
      input: do
        "use-markdown": ({node}) ~>
          @data.content.{}config.use-markdown = @use-markdown = node.checked
          view.render!
        "toggle-preview": ({node}) ~>
          @preview = !!node.checked
          view.render!
        input: ({node}) ~>
          @data.content.body = node.value
          view.render \post
        title: ({node}) ~>
          @data.title = node.value
          view.render \post
      click: do
        post: ({node}) ~>
          if node.classList.contains \running => return
          if node.classList.contains \disabled => return
          if !@is-ready! => return
          payload = @data{url, reply, content, slug, key, title}
          @ldld.on!
          debounce 1000
            .then ->
              ld$.fetch(
                \/dash/api/discuss
                {method: if payload.key => \PUT else \POST}
                {type: \json, json: payload}
              )
            .finally ~> @ldld.off!
            .then (ret) ~>
              @fire \new-comment, {
                owner: @global.user.key,
                displayname: @global.user.displayname
              } <<< payload <<< ret{key, slug}
              view.get('input').value = ''
              view.get('panel').innerHTML = ''
              @preview = false
              view.render!
            .catch error!
    init: post: ({node}) ~> @ldld = new ldLoader root: node
    handler: do
      avatar: ({node}) ~> node.style.backgroundImage = "url(/dash/s/avatar/#{@global.user.key}.png)"
      preview: ({node}) ~>
        revert = ("off" in node.getAttribute(\ld).split(" "))
        state = !(@preview and @use-markdown) xor revert
        node.classList.toggle \d-none, state
      panel: ({node}) ~>
        if @preview => node.innerHTML = marked((@data.content.body or ''), @marked-options)
      post: ({node}) ~>
        node.classList.toggle \disabled, !@is-ready!
      "edit-panel": ({node}) ~> node.classList.toggle \d-none, !!@preview
      "if-markdown": ({node}) ~> node.classList.toggle \d-none, !@use-markdown

  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  init: ->
    auth.get!then (g) ~>
      @global = g
      @view.render!
  edit: (cfg = {}) ->
    @data <<< cfg
    @view.render!
  is-ready: ->
    title = @view.get('title')
    @ready = !!(@data.content.body or "").trim!length and (!title or (@data.title or "").trim!length)
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v

Ctrl
