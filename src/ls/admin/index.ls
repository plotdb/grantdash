(->
  ldc.register \admin,
  <[permctrl navbar adminNavigation viewLocals orgInfo brdInfo prjInfo loader util]>,
  ({permctrl, navbar, admin-navigation, viewLocals, orgInfo, brdInfo, prjInfo, loader, util}) ->
    loader.on!
    lc = {}

    perm-panel = ld$.find '[ld~=nav-panel][data-nav=brd-config][data-name=perm]  [ld-scope=permission-panel]', 0
    path = ["perm"]
    permctrl-opt = {root: perm-panel, path: <[perm]>}
    permctrl-adopter = permctrl.prepare permctrl-opt
    console.log permctrl-adopter

    perm-panel = ld$.find '[ld~=nav-panel][data-nav=org-config][data-name=perm]  [ld-scope=permission-panel]', 0
    path = ["perm"]
    org-permctrl-opt = {root: perm-panel, path: <[perm]>}
    org-permctrl-adopter = permctrl.prepare org-permctrl-opt

    navbar-panel = ld$.find '[ld~=nav-panel][data-nav=main][data-name=brd-navbar]  [ld-scope=navbar-editor]', 0
    brd-navbar-opt = {root: navbar-panel, path: <[page navbar]>}
    brd-navbar-adopter = navbar.prepare brd-navbar-opt

    sdb = new sharedb-wrapper do
      url: {scheme: window.location.protocol.replace(':',''), domain: window.location.host}
    sdb.on \close, ->
      loader.on!
      sdb.reconnect!
        .then -> init!
        .then -> loader.off!

    watch = (ops, source) ->
      orgInfo.watch {ops, source}
      org-permctrl-adopter.watch {ops, source}
      #orgPerm.watch {ops, source}

    ret = /o\/([0-9]+)/.exec(window.location.pathname)
    if !ret and util.parseQuerystring(\o) => ret = ['', that]
    if ret => 
      id = "org-#{if ret => ret.1 else \demo}"
      init = ->
        loader.on!
        sdb.get {id, watch}
          .then (doc) ->
            lc.doc = doc
            orgInfo.init {doc, sdb}
            org-permctrl-adopter.init {doc, sdb}
            #orgPerm.init {doc, sdb}
            loader.off!
      init!

    prjg-view = new ldView do
      init-render: false
      root: ".project-groups"
      action:
        click: do
          "project-group-add": ({node}) ->
            data = JSON.parse(JSON.stringify(lc.docbrd.data))
            data.[]group.push do
              key: data.[]group.length + 1
              name: "新分組"
            ops = sdb.json.diff lc.docbrd.data, data
            lc.docbrd.submitOp ops
            prjg-view.render!

      handler: do
        "nav-tab": ({node}) ->
        "project-group": do
          list: -> lc.docbrd.data.group or []
          init: ({node}) ->
            view = new ldView do
              root: node
              action: click: do
                "nav-tab": ({node}) ->
                  if !(p = ld$.parent(node, '.folder', @root)) => return
                  key = p.getAttribute \data-prj-key
                  idx = 0
                  lc.docbrd.data.group.map (d,i) -> if d.key == +key => idx := i
                  prjInfo.set path: ['group', idx]

          handler: ({node, data}) ->
            n = ld$.find(node, '[ld=name]', 0)
            node.setAttribute \data-prj-key, data.key
            n.innerText = data.name
            if !node.folder => node.folder = new ldui.Folder root: node
            #if !node.nav => node.nav = new ldui.Nav node


    watch-board = (ops, source) ->
      brdInfo.watch {ops, source}
      prjInfo.watch {ops, source}
      prjg-view.render!

    ret = /b\/([0-9]+)/.exec(window.location.pathname)
    if !ret and util.parseQuerystring(\b) => ret = ['', that]
    if ret => 
      id = "board-#{if ret => ret.1 else \demo}"
      init-board = ->
        loader.on!
        sdb.get {id, watch: watch-board}
          .then (doc) ->
            lc.docbrd = doc
            brdInfo.init {doc: lc.docbrd, sdb}
            prjInfo.init {doc: lc.docbrd, sdb}
            permctrl-adopter.init {doc: lc.docbrd, sdb}
            prjg-view.render!
            loader.off!
      init-board!

    loader.off!


  ldc.app \admin
)!
