(->

  lc = {nav: {}}
  ld$.find('[ld~=nav-panel]').map ->
    is-default = \default in (it.getAttribute(\ld) or '').split(' ')
    nav = it.getAttribute(\data-nav)
    it.classList.toggle \d-none, !is-default
    if is-default => lc.nav{}[nav].panel = it
  ld$.find('[ld~=nav-tab]').map ->
    is-default = \default in (it.getAttribute(\ld) or '').split(' ')
    nav = it.getAttribute(\data-nav)
    if !nav and (p = ld$.parent(it, '[data-nav]')) => nav = p.getAttribute(\data-nav)
    it.classList.toggle \active, is-default
    if is-default => lc.nav{}[nav].tab = it

  document.body.addEventListener \click, (e) ->
    if !((n = e.target) and n.getAttribute) => return
    if !(tab = ld$.parent(n, '[ld~=nav-tab]')) => return
    nav = tab.getAttribute(\data-nav)
    if !nav and (p = ld$.parent(tab, '[data-nav]')) => nav = p.getAttribute(\data-nav)
    name = tab.getAttribute(\data-name)
    if lc.nav{}[nav].tab => that.classList.toggle \active, false
    if lc.nav{}[nav].panel => that.classList.toggle \d-none, true
    panel = ld$.find("[ld~=nav-panel][data-nav=#nav][data-name=#name]",0)
    lc.nav{}[nav].tab = tab
    lc.nav{}[nav].panel = panel
    tab.classList.toggle \active, true
    if panel => panel.classList.toggle \d-none, false
)!
