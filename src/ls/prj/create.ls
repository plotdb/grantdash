({ldcvmgr, adminInfo, prjCreate, auth, error, loader}) <- ldc.register <[
ldcvmgr adminInfo prjCreate auth error loader]>, _
loader.on!
lc = {}

key = (
  /^\/b\/([^/]+)\/p\/create/.exec(window.location.pathname) or 
  /^\/b\/([^/]+)\/g\/([^/]+)\/p\/create/.exec(window.location.pathname) or []
)
key = brd: key.1, grp: key.2

auth.get!
  .then -> ld$.fetch "/d/b/#{key.brd}/form", {method: \GET}, {type: \json}
  .then (brd) ->
    lc.brd = brd
    lc.grps = brd.detail.{}group
    lc.grp = lc.grps.filter(->it.key == key.grp).0 or lc.grps.0
    if !lc.grp => return Promise.reject new Error(1015, "group is not found")
    root = ld$.find('[ld-scope=prj-create]',0)
    n = ld$.find(root, 'input[name=brd]', 0)
    n.value = lc.brd.key
    show-grp = if lc.grps.length == 1 => false else true
    info = new adminInfo {root: root, type: \prj}
    view = new ldView do
      root: root
      action: input: do
        grp: ({node}) ->
          key.grp = node.value
          lc.grp = lc.grps.filter(->it.key == key.grp).0
          view.render!
      handler: do
        "grp-option": do
          list: -> lc.grps
          handler: ({node,data}) ->
            node.value = data.key
            node.innerText = data.info.name
        "brd-name": ({node}) -> node.innerText = lc.brd.name
        "grp-name": ({node}) -> node.innerText = lc.grp.info.name
        "show-grp": ({node}) -> node.classList.toggle \d-none, !show-grp
        "inited": ({node}) -> node.classList.toggle \invisible, false
    n = ld$.find(root, 'select[name=grp]', 0)
    n.value = lc.grp.key
  .finally -> loader.off!
  .catch error!

