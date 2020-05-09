(->
  lc = {active: {}, pends: {}}

  view = new ldView do
    root: document.body
    action: click: do
      "nav": ({node, evt}) ->
        if !evt.target.getAttribute(\ld) => return
        n = evt.target.getAttribute(\data-name)
        g = node.getAttribute(\data-nav)
        lc.active[g] = {name: n, node: evt.target}
        view.render!
        setTimeout (->
          if (o = lc.pends{}[g][n]) and !(o.inited) =>
            o.func!
            o.inited = true
        ), 10
    handler: do
      "nav-tab": ({node}) ->
        g = node.getAttribute \data-nav
        if !g =>
          if !(p = ld$.parent(node, '[ld=nav]', document)) => return
          if !(g = p.getAttribute \data-nav) => return
        n = node.getAttribute \data-name
        active = lc.active[g] or {}
        node.classList.toggle \active, (
          active.node == node or
          (!lc.active[g] and /default/.exec(node.getAttribute(\ld))) 
        )
      "nav-panel": ({node}) ->
        g = node.getAttribute(\data-nav)
        node.classList.toggle \d-none, (
          (lc.active[g] and lc.active[g].name != node.getAttribute(\data-name)) or
          (!lc.active[g] and !/default/.exec(node.getAttribute(\ld)))
        )

)!
