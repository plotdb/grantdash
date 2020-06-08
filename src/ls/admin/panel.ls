ldc.register \adminPanel, <[]>, ->
  panel = do
    inited: false
    nav: {}, cur: {}, tab: {}
    toggle: ({nav, name, tab}) ->
      if @nav{}[nav].tab => that.classList.toggle \active, false
      if @nav{}[nav].panel => that.classList.toggle \d-none, true
      panel = ld$.find("[ld~=nav-panel][data-nav=#nav][data-name=#name]",0)
      @nav{}[nav].panel = panel
      if tab =>
        @nav{}[nav].tab = tab
        tab.classList.toggle \active, true
      if panel => panel.classList.toggle \d-none, false
      if nav == \main =>
        @cur <<< {nav, name, func: @tab[@cur.name]}
      else @cur <<< { func: @tab[@cur.name] = name}
      api.fire \active, {nav, name, panel}

    init: ->
      if @inited => return
      @inited = true
      ld$.find('[ld~=nav-panel]').map ~>
        is-default = \default in (it.getAttribute(\ld) or '').split(' ')
        nav = it.getAttribute(\data-nav)
        it.classList.toggle \d-none, !is-default
        if is-default => @nav{}[nav].panel = it
        it.classList.add \ld, \ld-float-ltr-in, \xp15
      ld$.find('[ld~=nav-tab]').map ~>
        is-default = \default in (it.getAttribute(\ld) or '').split(' ')
        nav = it.getAttribute(\data-nav)
        it.style.transition = "all .15s ease-in-out"
        if !nav and (p = ld$.parent(it, '[data-nav]')) => nav = p.getAttribute(\data-nav)
        it.classList.toggle \active, is-default
        if is-default =>
          @nav{}[nav].tab = it
          @tab[nav] = it.getAttribute(\data-name)

      document.body.addEventListener \click, (e) ~>
        if !((n = e.target) and n.getAttribute) => return
        if !(tab = ld$.parent(n, '[ld~=nav-tab]')) => return
        nav = tab.getAttribute(\data-nav)
        if !nav and (p = ld$.parent(tab, '[data-nav]')) => nav = p.getAttribute(\data-nav)
        name = tab.getAttribute(\data-name)
        @toggle {nav, name, tab}

      ld$.find '.admin-sidemenu .folder' .map ~>
        new ldui.Folder root: it

  panel.init!

  return api = do
    evt-handler: {}
    on: (n, cb) -> @evt-handler.[][n].push cb
    toggle: ({nav, name, tab}) -> panel.toggle {nav, name, tab}
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
