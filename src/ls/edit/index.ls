(->

  sdb = new sharedb-wrapper do
    url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
  sdb.on \close, ->
    loader.on!
    sdb.reconnect!
      .then -> init!
      .then -> loader.off!
  hubs = pages: new Hub({sdb}), file: new Hub({sdb})

  first-child = (n) ->
    if !n.children => return [n]
    for i in n.children =>
      if first-child(i) => return [n] ++ that
    return

  sdb.get {id: "brd[4].pages", watch: (ops,source) -> hub.pages.fire \change, {ops,source} }
    .then (doc) ->
      hub.pages.doc = doc
      n = first-child doc.data.tree
      if !n => return
      sdb.get {id: "brd[4].pages[#{n.join('/')}]", watch: (ops,source) -> hub.file.fire \change, {ops,source} }
    .then (doc) ->
      hub.file.doc = doc




  ldc.register \editor, [], ->

    
    #ld$.find('.folder').map -> new ldui.Folder root: it
    files = do
      pages: []
      styles: []
      js: []
      widgets: []
      assets: []
    tree = {children: [
      {name: "page", children: [{name: "index.html"}]}
      {name: "style", children: [{name: "index.css"}]}
      {name: "script", children: [{name: "index.js"}]}
      {name: "widget", children: []}
      {name: "asset", children: [{name: "thumb.png"}]}
    ]}

    view = render-folder = ({node, data, parent}) ->
      rn = node
      root-data = data
      view = new ldView do
        root: node
        action:
          input: do
            name: ({node, evt}) -> data.name = node.value
            url: ({node, evt}) -> data.url = node.value
          click: do
            clone: ({node, evt}) ->
              idx = rn.pdata.children.indexOf(data)
              rn.pdata.children.splice idx + 1, 0, JSON.parse(JSON.stringify(data))
              root-view.render!
              console.log JSON.stringify(tree)
            delete: ({node, evt}) ->
              idx = rn.pdata.children.indexOf(data)
              rn.pdata.children.splice idx, 1
              root-view.render!
            "toggle-fold": ({node, evt}) ->
              if data.children => 
                idx = rn.pdata.children.indexOf(data)
                children = data.children
                delete data.children
                delete data.toggle
                children = [JSON.parse(JSON.stringify(data))] ++ children
                rn.pdata.children.splice.apply rn.pdata.children, ([idx, 1] ++ children)
                root-view.render!
              else
                idx = rn.pdata.children.indexOf(data)
                new-data = JSON.parse(JSON.stringify(data))
                new-data.toggle = true
                new-data.children = []
                rn.pdata.children.splice.apply rn.pdata.children, ([idx, 1] ++ [new-data])
                root-view.render!

        handler: do
          name: ({node}) -> node.innerText = data.name
          url: ({node}) ->  node.value = data.url or ''
          icon: ({node}) -> node.classList.toggle \d-none, !!data.children
          list: do
            list: -> data.children
            init: ({node,data}) ->
              des = view-sample.get(if data.children => \folder else \item).childNodes.0
              node.setAttribute \class, des.getAttribute(\class)
              node.setAttribute \draggable, true
              node.innerHTML = des.innerHTML
              if data.children => node.folder = new ldui.Folder root: node
              node.pdata = root-data
              node.view = render-folder {node, data}
            handler: ({node, data}) ->
              if node.view => node.view.render!
    el = do
      menu: ld$.find('[ld-scope=editor-menu]', 0)
      sample: ld$.find('[ld-scope=editor-menu-sample]', 0)

    console.log el
    view-sample = new ldView {root: el.sample, handler: {item: (->), folder: (->)}}
    render-folder node: el.menu, data: tree

    ldc.action do
      get: -> console.log editor.getContents!
  ldc.app \editor
)!
