(->
  ldc.register \discus, <[auth]>, ({auth}) ->
    marked-options = {} # {render: (new marked.Renderer!) <<< {heading: (text, leve) -> text}}
    lc = do
      loading: true
      data: {slug: '/', content: {config: {}}}
    auth.get!then (g) ->
      ld$.fetch \/dash/api/discus, {method: \GET}, {params: {slug: '/'}, type: \json}
        .then (comments) ->
          lc <<< {comments, loading: false}
          view.render!
      lc.g = g
      view = new ldView do
        root: '[ld-scope=discus]'
        action: do
          input: do
            "use-markdown": ({node}) ->
              lc.data.{}content.{}config.use-markdown = lc.use-markdown = node.checked
              view.render!
            "toggle-preview": ({node}) ->
              lc.preview = !!node.checked
              view.render!
            input: ({node}) ->
              lc.data.{}content.body = node.value
              lc.ready = !!(lc.data.{}content.body or "").trim!length
              view.render \post
          click: do
            link: ->
            attach: ->
            post: ({node}) ->
              if node.classList.contains \running => return
              payload = lc.data{ slug, reply, content }
              lc.ldld.on!
              ld$.fetch \/dash/api/comment, {method: \POST}, {type: \json, json: payload}
                .finally -> lc.ldld.off!
                .then -> console.log \posted
                .catch -> console.log "failed"
        init:
          post: ({node}) -> lc.ldld = new ldLoader root: node
        handler: do
          loading: ({node}) ->
            node.classList.toggle \d-none, !(lc.loading xor ('off' in node.getAttribute(\ld).split(' ')))
          avatar: ({node}) -> node.style.backgroundImage = "url(/dash/s/avatar/#{g.user.key}.png)"
          preview: ({node}) ->
            revert = ("off" in node.getAttribute(\ld).split(" "))
            state = !(lc.preview and lc.use-markdown) xor revert
            node.classList.toggle \d-none, state
          panel: ({node}) ->
            if lc.preview => node.innerHTML = marked((lc.data.content.body or ''), marked-options)
          post: ({node}) -> node.classList.toggle \disabled, !lc.ready
          "edit-panel": ({node}) -> node.classList.toggle \d-none, !!lc.preview
          "if-markdown": ({node}) -> node.classList.toggle \d-none, !lc.use-markdown
          comment: do
            list: -> lc.comments
            init: ({node, data, idx}) ->
              node.classList.add \ld, \ld-float-ltr-in, \xp35
              node.style.animationDelay = "#{idx * 0.1}s"
              view = new ldView do
                root: node
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

  ldc.app \discus
)!
