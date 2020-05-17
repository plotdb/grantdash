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
    alpha: 4, dur: 150
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

    # BIND - Attempt: use hash + id to bind DOM and Data. lookup use @find function
    @binding = {}

    # after initialization, all repeatable template nodes will be removed and put here.
    @repeatable = {}

    @blockmgr = opt.block-manager
    @init!

    @

  reblock.prototype = Object.create(Object.prototype) <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
    init: ->
      obj = {host: @root, force: true}
      if @opt.root-block =>
        obj <<< if typeof(@opt.root-block) == \string => {name: @opt.root-block}
        else {data: @opt.root-block}
      @inject obj .then ({node, data}) ~> @data = data

      # unselect - why document instead of @root? because we want unselect by clicking outside root
      document.addEventListener \click, (e) ~>
        # to select, n must be under root
        n = t = e.target
        while t and t != root => t = t.parentNode
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
        if @node.injecting =>
          if @node.injecting.parentNode => that.removeChild @node.injecting
          @node.injecting = null
        @inject {sibling: e.target, name: e.dataTransfer.getData(\text/plain)}
          .then ->
            e.preventDefault!
            e.stopPropagation!
          .catch ->

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
        # We only have to handle input event from editable element.
        if !((n = e.target) and n.hasAttribute and (name = n.getAttribute(\editable))) => return
        # however, this editable node might not map to a reData node ( data might be scalar )
        # we search up for id in reblock object.
        c = n
        while c and !c.reblock => c = c.parentNode
        if !c or !(ret = @find(c.reblock.id)) => return
        {node,data} = ret
        # TODO we can update innerText, innerHTML or even DOM ( by converting it to reData )
        # but for now we only take care of innerText.
        @old = JSON.parse(JSON.stringify(@data))
        data[name] = n.innerText
        # then, we should submit ops.
        @submit!

    # tentative name: submit changes to remote.
    submit: ->
      console.log ">", @old, @data
      ops = json0-ot-diff @old, @data
      console.log ops

    apply: (ops) ->
      ot-json0.type.apply @data, ops.0

    # BIND - find corresponding DOM and Data via id
    find: (v) ->
      if typeof(v) == \string => return @binding[v]
      while v and !v.reblock => v = v.parentNode
      if !v => return null
      return @binding[v.reblock.id]

    bind: ({node, data}) ->
      if !data.id => data.id = Math.random!toString(36).substring(2) # TODO use uuid?
      @binding[data.id] = {node, data}
      node.{}reblock.id = data.id

    select: (n, append = false) ->
      @selected.map -> it.removeAttribute \selected
      if !append => @selected.splice 0, @selected.length
      if !n => return
      if !Array.isArray(n) => n = [n]
      @selected ++= n
      n.map -> it.setAttribute \selected, true

    edit: (n) ->
      if !(n and n.hasAttribute and n.hasAttribute(\editable)) => return
      if @node.editing => @node.editing.setAttribute \contenteditable, false
      @node.editing = n
      n.setAttribute \contenteditable, true
      n.focus!

    clone: ->
      @select @selected.map (n) ->
        n.parentNode.insertBefore (m = n.cloneNode true), n.nextSibling
        m

    delete: ->
      if !(n = @selected[* - 1]) => return
      n = n.nextSibling or n.previousSibling
      @selected.map -> it.parentNode.removeChild it
      @select n

    move: (src, des, after) ->
      if src == (ib = if after => des.nextSibling else des) => return
      animate.init do
        src: src, des: des
        cb: ->
          src.parentNode.removeChild src
          des.parentNode.insertBefore src, ib

    /*
    inject: ({node, name, force}) -> new Promise (res, rej) ~>
      n = node
      # force injection to node, regardless of hostable attribute
      if force => t = n
      else # can only drop on hostable elements. t = hostable target, n = element to insert before; 
        while n and (p = n.parentNode) =>
          if p.hasAttribute and p.hasAttribute(\hostable) => t = p; break
          if n.hasAttribute and n.hasAttribute(\hostable) => t = n; break else n = p
        if !t => return rej new Error("")

      if t == n => n = null
      # -- fetch block content
      if !name => return rej(new Error("reblock: inject block but name is not provided"))
      if !@blockmgr => return rej(new Error("reblock: inject block without providing blockManager"))
      @blockmgr.get(name)
        .then (content) ~>
          # -- insert block
          div = document.createElement("div")
          div.innerHTML = content
          ps = for i from 0 til div.childNodes.length => Promise.resolve(div.childNodes[0]).then (c) ~>
            c.parentNode.removeChild c
            t.insertBefore c, n
            if c.nodeType != 1 => return
            # TODO this is not always true if list grows horizontally.
            s = window.getComputedStyle(c)
            h = s.height
            c.style.height = "0px"
            c.style.transition = "height .15s ease-in-out"
            setTimeout (-> c.style.height = h), 0

            # - block data - TODO dom tree / data spec
            #c.block = {data: {}, dom: {list: [], node: c}}
            #p = t
            #while p => if p.block => break else p = p.parentNode
            #if p and p.block => p.block.dom.list.push c.block.dom
            #else @block.dom.list.push c.block.dom
            debounce 150 .then -> c.style.transition = ""; c.style.height = ""
          Promise.all ps
        .then -> res!
        .catch -> rej it
    */

    inject: ({host, sibling, name, data, dir, force, recurse}) ->
      if !data => data = {type: \block, name: name, data: {}}
      if !name => name = data.name
      if sibling =>
        if !host => host = ld$.parent(sibling, '[hostable]', host)
        ns = ld$.parent(sibling, '[hostable] > *', host)
      retval = {data}
      new Promise (res, rej) ~>
        if data.type != \block => return rej!
        # no name block resolve to a single div.
        (if !name => Promise.resolve("""<div hostable="block"></div>""") else @blockmgr.get(name))
          .then (block-data) ~>
            if typeof(block-data) == \string => 
              retval.node = node = document.createElement("div")
              node.innerHTML = block-data
              # we wrap block only if it contains multiple elements.
              if node.childNodes.length == 0 =>
                node = node.childNodes.0
                node.parentNode.removeChild node
            else if (block-data instanceof Element) => retval.node = node = block-data
            else Promise.reject new Error("unrecognized block data")
            if host => host.insertBefore node, ns

            # transition in
            s = window.getComputedStyle(node)
            h = s.height
            node.style
              ..height = "0px"
              ..transition = "height .15s ease-in-out"
            setTimeout (-> node.style.height = h), 0
            debounce 150 .then -> node.style.transition = ""; node.style.height = ""

            @construct {node: node, data: data}

            # here we add injected data into reData Tree if this injection is not called by traversing reData Tree.
            # if host is the outmost div ( aka root ) then this injection is actually for the root block.
            # thus we dont have to add data into reData Tree - it's the tree root added in init function.
            if !recurse and (ret = @find(host)) =>
              idx = Array.from(host.childNodes).indexOf(node)
              #d = if ret.data.type and ret.data.id => ret.data.data else ret.data
              ret.data.data[][host.getAttribute(\hostable)].splice idx, 0, data
          .then -> res retval
          .catch -> rej it

    # update DOM for partially updated data
    /*update: (ops) ->
      for each op in ops 
        find corresponding node and data by op.path
        render node, data
    */

    # render DOM, given a root node and corresponding data.
    construct: ({node, data, recurse}) -> new Promise (res, rej) ~>
      nodes = ld$.find(node, '[editable],[repeatable],[hostable]')
      # TODO escape sth
      #excludes = ld$.find(root, '[repeatable] [editable], [repeatable] [hostable], [repeatable] [hostable]')
      #nodes = nodes.filter -> !(it in excludes)
      @bind({node, data})
      # construct also accept object inside a redata when loop into repeatable,
      # so dhash might be data that passed in. in this case, recurse should be true
      dhash = if recurse => data else data.data
      Promise.all(nodes.map (node) ~>
        if (name = node.getAttribute('editable')) =>
          if !(d = dhash[name]) =>
          else if !d.type => node.innerText = d
          else if d.type == \value =>
            node.innerText = d.value
            @bind({node: node, data: d})
          else if d.type == \tag =>
            @dom({data: d})
              .then -> node.appendChild it
          else if d.type == \html =>
            node.innerHTML = d.value
            @bind({node: node, data: d})
          Promise.resolve!
        else if (name = node.getAttribute('repeatable')) =>
          ns = node.nextSibling
          p = node.parentNode
          p.removeChild node
          # TODO how do we know it's a repeatable and can be cloned if we remove this attribute?
          node.removeAttribute \repeatable
          ds = dhash[name] or []
          Promise.all ds.map (d) ~>
            n = node.cloneNode true
            p.insertBefore n, ns
            @construct {node: n, data: d, recurse: true}
          @repeatable[name] = node
        else if (name = node.getAttribute('hostable')) =>
          ds = (dhash[name] or []).filter -> it.type == \block
          Promise.all ds.map (d) ~>
            @inject {host: node, data: d, recurse: true}
      )
        .then -> res!
        .then -> rej!

    # convert tag redata to DOM. return root node.
    dom: ({data}) -> new Promise (res, rej) ~>
      if !data.type => return document.createTextNode(data)
      else if data.type == \tag =>
        n = ld$.create data{name, attr, style}
        @bind {node: n, data: data, id: data.id}
        return res(
          if data.text => n.innerText = that; n
          else
            Promise.all (d.child or []).map -> Promise.resolve(@dom({data:it}))
              .then -> it.map -> n.appendChild(it)
              .then -> n
        )
      else if data.type == \value => return document.createTextNode(data.value)
      # since tag redata is mainly used under editable, it should not contain block ... ?
      # otherwise user will be able to edit block directly and cause issue.
      # else if data.type == \block => return @inject({data})
      else null# inconvertable


  reblock.ghost = ghost = new Image!
  ghost.src = "data:image/svg+xml," + encodeURIComponent("""
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
    <rect x="0" y="0" width="20" height="15" fill="rgba(0,0,0,.5)"/>
  </svg>
  """)

  if window? => window.reblock = reblock
  if module? => module.exports = reblock

)!
