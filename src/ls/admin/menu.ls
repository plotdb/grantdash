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
  ldc.app \brd

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
)!
