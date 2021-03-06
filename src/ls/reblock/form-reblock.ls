# interface
# inject block:
#  - dragstart:
#    * set data as block name, which we will use to fetch block from block manager
#    * set image ( optional )
#    * example:
#      source.addEventListener \dragstart, (e) ->
#        e.dataTransfer.setData("text/plain", e.target.getAttribute(\data-name))
#        e.dataTransfer.setDragImage(img,10,10)

(->
  # block animation when reordering or inserting
  animate = do
    running: false
    alpha: 4, dur: 250
    box: {}
    init: ({src, des, cb}) ->
      if @running => return
      @ <<< {src, des, running: true}
      @box <<< do
        s1: {} <<< src.getBoundingClientRect!{x, y, width, height}
        d1: {} <<< des.getBoundingClientRect!{x, y, width, height}
      # src somehow not visible thus no box. ( e.g., into a collapsed div )
      if @box.s1.x == @box.s1.y == @box.s1.width == @box.s1.height == 0 => @box.s1 = @box.d1
      cb!
      @box <<< do
        s2: {} <<< src.getBoundingClientRect!{x, y, width, height}
        d2: {} <<< des.getBoundingClientRect!{x, y, width, height}
      requestAnimationFrame (-> animate.handle it)
    handle: (t) ->
      if !(@start?) => @start = t
      [a,d] = [@alpha, @dur]
      {s1,s2,d1,d2} = @box
      p = t = (t - @start) / d
      # easing + reverse animation because we already swap src and des.
      t = 1 - ((t ^ a) / ( (t ^ a) + (1 - t) ^ a))
      [x1, y1] = [(s1.x - s2.x) * t, (s1.y - s2.y) * t]
      [x2, y2] = [(d1.x - d2.x) * t, (d1.y - d2.y) * t]
      @src.style.transform = "translate(#{x1}px,#{y1}px)"  
      @des.style.transform = "translate(#{x2}px,#{y2}px)"  
      if p < 1 => return requestAnimationFrame (-> animate.handle it)
      @src.style.transform = ""
      @des.style.transform = ""
      delete @start
      @running = false

  reblock = (opt = {}) ->
    @opt = opt 
    @action = opt.action or {}
    # for prevent infinitely reordering
    @reorder = {check: false}
    # injecting: ghost placeholder for hinting the location to inject new block
    # dragging: currently moved draggable element
    # editing: currently editing editable node 
    @node = {editing: null, dragging: null, injecting: null}
    @drag = {}
    @selected = []    # selected element(s)
    @evt-handler = {}
    @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
    @data = opt.data

    @blockmgr = opt.block-manager
    @init!
    @ready = proxise ->
    @

  reblock.prototype = Object.create(Object.prototype) <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
    init: ->
      # unselect - why document instead of @root? because we want unselect by clicking outside root
      document.addEventListener \click, (e) ~>
        # to select, n must be under root
        n = t = e.target
        while t and t != @root => t = t.parentNode
        if !t => return
        @select if n.hasAttribute and (n.hasAttribute(\repeat-item) or n.hasAttribute(\block)) => n else null

      # ghost for injecting content
      @root.addEventListener \dragover, (e) ~>
        if @node.dragging => return
        g = if !@node.injecting => @node.injecting = document.createElement(\div) else @node.injecting
        g.classList.add \ghost
        n = e.target
        while n and (p = n.parentNode) =>
          if p.hasAttribute and p.hasAttribute(\hostable) => t = p; break
          if n.hasAttribute and n.hasAttribute(\hostable) => t = n; break else n = p
        if !t => return
        if t == n => n = null
        if t.childNodes.length and !n => return
        if n == g => return
        if g.parentNode => g.parentNode.removeChild g
        t.insertBefore g, n

      # instead of @root, we use document so drop outside @root still works
      document.addEventListener \dragover, (e) ~>
        e.preventDefault! # we need this for injecting block ( drop event won't fire without this )

      document.addEventListener \drop, (e) ~>
        if @node.dragging => @node.dragging = null
        if @node.injecting =>
          if @node.injecting.parentNode => that.removeChild @node.injecting
          @node.injecting = null
        name = e.dataTransfer.getData(\text/plain)
        if !name => return
        # if target is not under our root - it's not our business, just skip it.
        if !(ld$.parent(e.target, null, @root)) => return
        @inject {node: e.target, name}
          .then ->
            e.preventDefault!
            e.stopPropagation!
          .catch -> console.log it

      # move elements
      @root.addEventListener \drop, ~> @reorder <<< {check: 0}; @node.dragging = null
      @root.addEventListener \dragstart, (e) ~> @node.dragging = e.target; e.dataTransfer.setDragImage(ghost,10,10)
      @root.addEventListener \dragover, (e) ~>
        e.preventDefault! # we need this for injecting block ( drop event won't fire without this )
        if !((src = @node.dragging) and (des = e.target)) => return

        if !@action.beforeMove =>
          # allow only moving in the same container 
          while des => if des.parentNode == src.parentNode => break; else des = des.parentNode
        else des = @action.beforeMove src, des
        if !des or src == des => return

        is-next = des == src.nextSibling
        [sbox, dbox] = [src.getBoundingClientRect!, des.getBoundingClientRect!]
        x = if sbox.x == dbox.x => 0 else e.clientX - dbox.x
        y = if sbox.y == dbox.y => 0 else e.clientY - dbox.y
        if !@reorder.check => @reorder <<< x: e.clientX, y: e.clientY, check: 1
        dir = (x and (e.clientX - @reorder.x) > 0) or (y and (e.clientY - @reorder.y) > 0)
        amount = Math.abs(if x => e.clientX - @reorder.x else e.clientY - @reorder.y)
        if amount < (if x => dbox.width else dbox.height) / 5 => return

        if @action.moving => des = @action.moving src, des, dir
        @move src, des, dir
        if @action.afterMove => @action.afterMove src, des, dir
        @reorder.check = 0

      # enabling nested repeat-item re-ordering
      @root.addEventListener \mousedown, (e) ->
        n = e.target
        while n => if n.hasAttribute and n.hasAttribute(\repeat-item) => break else n = n.parentNode
        if !n => return
        n.setAttribute \draggable, true
        while (n = n.parentNode) => if n.setAttribute => n.setAttribute \draggable, false

      # enter content editing mode if clicking on editable node
      @root.addEventListener \click, (e) ~> @edit e.target

      # handle tab for editable elements
      @root.addEventListener \keydown, (e) ~>
        if e.keyCode == 9 =>
          if !(e.target.hasAttribute and e.target.hasAttribute(\editable)) => return
          editables = Array.from(@root.querySelectorAll("[editable]"))
          idx = editables.indexOf(e.target) + (if e.shiftKey => -1 else 1)
          if idx < 0 or !(n = editables[idx]) => n = e.target
          @edit n
          e.preventDefault!

      @root.addEventListener \input, (e) ~>
        # Currently We only handle input event from a pure text editable element.
        if !((n = e.target) and n.hasAttribute and (name = n.getAttribute(\editable))) => return
        if @action.input => @action.input {node: n}

    is-dragging: -> !!@node.dragging
    select: (n, append = false) ->
      @selected.map -> it.removeAttribute \selected
      if !append => @selected.splice 0, @selected.length
      if !n => return
      if !Array.isArray(n) => n = [n]
      @selected ++= n
      n.map -> it.setAttribute \selected, true

    edit: (n) ->
      if !(n and n.hasAttribute and n.hasAttribute(\editable)) => return
      type = n.getAttribute(\edit-type) 
      if type and !('text' in type.split(' ')) => return
      if @node.editing => @node.editing.setAttribute \contenteditable, false
      @node.editing = n
      n.setAttribute \contenteditable, true
      n.focus!

    clone: ->
      @select @selected.map (n) ~>
        n.parentNode.insertBefore (m = n.cloneNode true), n.nextSibling
        if @action.clone => @action.clone {node: m, src: n}
        m

    delete: ->
      if !(n = @selected[* - 1]) => return
      n = n.nextSibling or n.previousSibling
      @selected.map ~>
        if @action.delete => @action.delete {node: it}
        it.parentNode.removeChild it
      @select n

    move: (src, des, after) ->
      if src == (ib = if after => des.nextSibling else des) => return
      [p,ns] = [src.parentNode, src.nextSibling]
      animate.init do
        src: src, des: des
        cb: ~>
          if @action.beforeMoveNode => @action.beforeMoveNode {src, des, ib}
          src.parentNode.removeChild src
          des.parentNode.insertBefore src, ib
          if @action.afterMoveNode => @action.afterMoveNode {src, des, ib}

    inject: ({node, name, data, force}) ->

      n = node
      # force injection to node, regardless of hostable attribute
      if force => t = n
      else # can only drop on hostable elements. t = hostable target, n = element to insert before;
        while n and (p = n.parentNode) =>
          if p.hasAttribute and p.hasAttribute(\hostable) => t = p; break
          if n.hasAttribute and n.hasAttribute(\hostable) => t = n; break else n = p
        if !t => return Promise.reject new Error("")
      if t == n => n = null

      if data and !name => name = data.name
      if @action.beforeInject and @action.beforeInject({name}) => return Promise.resolve!
      new Promise (res, rej) ~>
        @blockmgr.get(name)
          .then (new-node) ~>
            t.insertBefore new-node, n
            if @action.inject => @action.inject({parent: t, node: new-node, sibling: n, data, name})
            s = window.getComputedStyle(new-node)
            h = s.height
            new-node.style.height = "0px"
            new-node.style.transition = "height .15s ease-in-out"
            setTimeout (-> new-node.style.height = h), 0
            debounce 150 .then -> new-node.style.transition = ""; new-node.style.height = ""
            if @action.afterInject => @action.afterInject {node: new-node, name}
          .then -> res!
          .catch -> rej it

  reblock.ghost = ghost = new Image!
  ghost.src = "data:image/svg+xml," + encodeURIComponent("""
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
    <rect x="0" y="0" width="20" height="15" fill="rgba(0,0,0,.5)"/>
  </svg>
  """)

  if window? => window.reblock = reblock
  if module? => module.exports = reblock

)!
