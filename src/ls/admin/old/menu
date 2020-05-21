(->
  ldc.register \brd, <[]>, ->
    view = new ldView do
      root: '#brd-info'
      action: click: do
        'brd-head': ({node, evt}) ->
          if !(p = ld$.parent evt.target, '.clickable', document) => return
          ison = node.classList.contains \on
          hbox = node.getBoundingClientRect!
          pbox = node.parentNode.parentNode.getBoundingClientRect!
          view.get('brd-list').style.height = "#{if ison => 0 else pbox.height - hbox.height}px"
          node.classList.toggle \on
      handler: do
        boards: do
          list: ->
            [0 to 10].map -> do
              key: it, name: "測試#{it}"
              description: "隨意的描述"
              starttime: '2020-05-10', endtime: '2020-08-10'
          action: click: ({node}) ->
            key = node.getAttribute(\data-key)
            window.location.href = "/b/#{key}/admin"

          handler: ({node,data}) ->
            ld$.find(node, \span, 0).innerText = data.name
            ld$.find(node, \.text-muted, 0).innerText = "#{data.starttime} - #{data.endtime}"
            node.setAttribute \data-key, data.key
  ldc.app \brd

  /*
  ldc.register \test, <[]>, ->
    toggle-folder = (node)->
      root = node.parentNode
      ison = root.classList.contains \show
      if !ison => root.classList.toggle \show
      menu = node.parentNode.childNodes.1
      dbox = menu.getBoundingClientRect!
      menu.style.height = "#{if ison => dbox.height else 0}px"
      setTimeout (-> menu.style.height = "#{if ison => 0 else dbox.height}px"), 0
      if ison =>
        setTimeout (->
          root.classList.toggle \show
          menu.style.height = ""
        ), 250
      if !ison => setTimeout (-> menu.style.height = ""), 250
    ld$.find(document, '.folder-toggle').map -> it.addEventListener \click, -> toggle-folder(this)
  ldc.app \test
  */
)!
