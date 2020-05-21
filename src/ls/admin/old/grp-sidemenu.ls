(->
  ldc.register \grpSidemenu, <[]>, ->
    prepare = (ctrl-opt) ->
      lc = {data: {}}
      lc.data = ctrl-opt.data or {group: [{name: "分組#i", key: i} for i from 1 til 4]}
      lc.prj-info = ctrl-opt.prj-info
      lc.prj-permctrl = ctrl-opt.prj-permctrl

      prjg-view = new ldView do
        root: ".project-groups"
        action:
          click: do
            "project-group-add": ({node}) ->
              data = JSON.parse(JSON.stringify(lc.data))
              data.[]group.push do
                key: data.[]group.length + 1
                name: "新分組"
              ops = sdb.json.diff lc.data, data
              lc.docbrd.submitOp ops
              prjg-view.render!
        handler: do
          "nav-tab": ({node}) ->
          "project-group": do
            list: -> lc.data.group or []
            init: ({node}) ->
              view = new ldView do
                root: node
                action: click: do
                  "nav-tab": ({node}) ->
                    if !(p = ld$.parent(node, '.folder', @root)) => return
                    key = p.getAttribute \data-prj-key
                    idx = 0
                    lc.data.group.map (d,i) -> if d.key == +key => idx := i
                    lc.prj-info.set path: ['group', idx]
                    lc.prj-permctrl.set path: ['group', idx, 'perm']
            handler: ({node, data}) ->
              n = ld$.find(node, '[ld=name]', 0)
              node.setAttribute \data-prj-key, data.key
              n.innerText = data.name
              if !node.folder => node.folder = new ldui.Folder root: node
              #if !node.nav => node.nav = new ldui.Nav node
    return {prepare}
)!
