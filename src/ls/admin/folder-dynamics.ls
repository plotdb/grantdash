b = new reblock do
  root: \#root
  action: do
    beforeMove: (src, des) ->
      # for folder structure move around
      if des.classList.contains \folder => return null # dont move 
      while des =>
        if !des.parentNode.classList => return null
        if des.classList.contains \folder-toggle =>
          if src == des.parentNode => return null
          if n = ld$.find(des.parentNode, '.folder-menu', 0) =>
            n.insertBefore (des = document.createElement \div), n.childNodes.0
            des.dummy = true
            break
        if des.parentNode.classList.contains \folder-menu or des.parentNode.classList.contains \folder-root => break
        if des.parentNode == src.parentNode => break; else des = des.parentNode
      if !des or src == des or ld$.parent(des, null, src) => 
        if des.dummy => des.parentNode.removeChild des
        return null
      return des
    moving: (src, des, dir) ->
      if dir == 0 and des.dummy =>
        d = des
        des = des.parentNode.parentNode
        d.parentNode.removeChild d
      return des
    afterMove: (src, des, dir) ->
      if des.dummy => des.parentNode.removeChild des

b.init!


