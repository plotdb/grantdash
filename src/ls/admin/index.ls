(->
  ldc.register \admin,
  <[permctrl entryctrl navbar grpSidemenu adminNavigation viewLocals orgInfo brdInfo prjInfo loader util]>,
  ({permctrl, entryctrl, navbar, grp-sidemenu, admin-navigation, viewLocals, orgInfo, brdInfo, prjInfo, loader, util}) ->
    loader.on!
    lc = {}

    perm-panel = ld$.find '[ld~=nav-panel][data-nav=brd-config][data-name=perm]  [ld-scope=permission-panel]', 0
    permctrl-opt = {root: perm-panel, path: <[perm]>}
    permctrl-adopter = permctrl.prepare permctrl-opt

    perm-panel = ld$.find '[ld~=nav-panel][data-nav=org-config][data-name=perm]  [ld-scope=permission-panel]', 0
    org-permctrl-opt = {root: perm-panel, path: <[perm]>}
    org-permctrl-adopter = permctrl.prepare org-permctrl-opt

    perm-panel = ld$.find '[ld~=nav-panel][data-nav=prj-config][data-name=perm]  [ld-scope=permission-panel]', 0
    prj-permctrl-opt = {root: perm-panel, path: ['group', 0, 'perm']}
    prj-permctrl-adopter = permctrl.prepare prj-permctrl-opt

    criteria-panel = ld$.find '[ld~=nav-panel][data-nav=prj-config][data-name=criteria] [ld-scope=criteria-panel]', 0
    criteria-opt = {root: criteria-panel, path: ['group', 0, 'criteria']}
    criteria-adopter = entryctrl.prepare criteria-opt

    grade-panel = ld$.find '[ld~=nav-panel][data-nav=prj-config][data-name=grade] [ld-scope=grade-panel]', 0
    grade-opt = {root: grade-panel, path: ['group', 0, 'grade']}
    grade-adopter = entryctrl.prepare grade-opt

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

    grp-sidemenu.prepare {prj-info, prj-permctrl: prj-permctrl-adopter}

    watch-board = (ops, source) ->
      brdInfo.watch {ops, source}
      prjInfo.watch {ops, source}
      prj-permctrl-adopter.watch {ops, source}
      grade-adopter.watch {ops, source}
      criteria-adopter.watch {ops, source}
        
      grp-sidemenu.prepare {prj-info, prj-permctrl: prj-permctrl-adopter, data: lc.docbrd.data}
      #prjg-view.render!

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
            prj-permctrl-adopter.init {doc: lc.docbrd, sdb}
            permctrl-adopter.init {doc: lc.docbrd, sdb}
            grade-adopter.init {doc: lc.docbrd, sdb}
            criteria-adopter.init {doc: lc.docbrd, sdb}
            grp-sidemenu.prepare {prj-info, prj-permctrl: prj-permctrl-adopter, data: doc.data}
            #prjg-view.render!
            loader.off!
      init-board!

    loader.off!


  ldc.app \admin
)!
