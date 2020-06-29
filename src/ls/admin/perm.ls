({ldcvmgr, auth, sdbAdapter, userSearch, error}) <- ldc.register \adminPerm,
<[ldcvmgr auth sdbAdapter userSearch error]>, _
Ctrl = (opt) ->
  @opt = opt
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @ctrl = search: new userSearch root: ld$.find(@root, '[ld-scope=user-search]',0)
  @toc = opt.toc
  @ <<< opt{org, brd}
  @ctrl.search.init!

  lc = {type: \list}
  @obj = obj = { idx: -1, cfg: {roles: []}}

  toggle-role = ->
    role = obj.cfg.roles[idx = obj.idx]
    name = if role => role.name else ''
    type = if ~idx => \role else \list
    lc <<< {idx, role, name, type}

  add-user = (picked, update = true) ~>
    role = (if lc.type == \list => lc.picked-role else lc.role) or obj.cfg.roles.0 or {name: ''}
    len = obj.cfg.roles
      .map -> it.list
      .reduce(((a,b) -> a ++ b), [])
      .filter -> it.type == picked.type and it.key == picked.key
      .length
    if len => return false #alert("user already exist")
    entry = picked <<< {perm: role.name}
    role.list.push entry
    @ctrl.search.clear!
    if update =>
      update-data!
      update-view!
    return true


  @update-view = update-view = ->
    toggle-role!
    view.render!

  view-config = { root: @root, action: {click: {}, keyup: {}}, handler: {}}
  view-config.action.click <<< do
    roles: ({node, evt}) ->
      obj.idx = obj.cfg.roles.map(->it.name).indexOf(evt.target.getAttribute(\data-name))
      update-data!
      update-view!

    "new-role": ({node, evt}) ->
      names = obj.cfg.roles.map -> it.name
      for i from 1 til 100 => if !~names.indexOf("角色#i") => break
      name = "角色#{if i < 100 => i else Math.round(Math.random! * 100) + 100}"
      obj.cfg.roles.push { name: name, desc: "自訂角色", list: [], key: suuid! }
      obj.idx = obj.cfg.roles.length - 1
      update-data!
      update-view!
      evt.stopPropagation!

    "delete-role": ->
      if obj.cfg.roles.length <= 1 => alert "最少要有一個角色"
      else if ~obj.idx =>
        obj.cfg.roles.splice(obj.idx,1)
        obj.idx = -1
        update-data!
        update-view!
  view-config.action.keyup <<< do
    "role-name": ({node}) -> if lc.role =>
      name = node.value
      invalid = (~obj.cfg.roles.map(->it.name).indexOf(name) and lc.name != name)
      node.classList.toggle \is-invalid, invalid
      if invalid => return
      lc.role.name = node.value
      update-data!
      update-view!

  view-config.handler <<< do
    "list-view": ({node}) -> node.classList.toggle \d-none, lc.type != \list
    "role-view": ({node}) -> node.classList.toggle \d-none, lc.type != \role
    role: do
      list: -> obj.cfg.roles
      handler: ({node, data}) ->
        n = ld$.find(node, '.nav-link', 0)
        n.classList.toggle \active, (data.name == lc.name)
        n.setAttribute \data-name, data.name
        n.setAttribute \data-type, \role
        n.innerText = data.name
    "role-name": ({node}) ->
      node.classList.toggle \d-none, !~(obj.idx)
      node.value = if lc.role => node.value = lc.name else ''
      name = node.value
      node.classList.toggle \is-invalid, (~obj.cfg.roles.map(->it.name).indexOf(name) and lc.name != name)

    "role-desc": do
      list: -> obj.cfg.roles
      action: keyup: ({node, data}) ->
        data.desc = editable-input node
        update-data true
      handler: ({node, data}) ->
        node.innerText = data.desc or ''
        node.setAttribute \data-name, data.name
        node.classList.toggle \d-none, data.name != lc.name

    "role-all": ({node}) -> node.classList.toggle \active, lc.type == \list
    "role-desc-all": ({node}) -> node.classList.toggle \d-none, lc.type != \list


  view-config.action.click <<< do
    switch: ({node,evt}) ->
      node.classList.toggle \on
      c = obj.cfg.roles[obj.idx].{}config
      if !c => return
      c[node.getAttribute(\data-name)] = node.classList.contains(\on)
      update-data!

  view-config.handler <<< do
    switch: ({node}) ->
      if !lc.role => return
      node.classList.toggle \on, !!lc.role.{}config[node.getAttribute(\data-name)]

  view-config.handler <<< do
    user: do
      list: ->
        if !lc.role =>
          return obj.cfg.roles
            .map (r) -> r.list.map(-> it <<< {perm: r.name})
            .reduce(((a,b) -> a ++ b), [])
        else (lc.role.list or []).map -> it <<< {perm: lc.role.name}
      init: ({node, local, data}) ->
        local.view = new ldView do
          root: node
          context: data
          action: click: do
            delete: ->
              idx = obj.cfg.roles.map(->it.name).indexOf(data.perm)
              if !~idx => return
              list = obj.cfg.roles[idx].list
              if !~list.indexOf(data) => return
              list.splice list.indexOf(data), 1
              update-data!
              update-view!
          text: do
            name: ({context}) -> context.displayname
            key: ({context}) -> if context.type == \user => "(id #{context.key})" else "(#{context.key})"
            role: ({context}) -> context.perm
          handler: do
            avatar: ({node, context}) ->
              if context.type == \user =>
                node.style.backgroundImage = "url(/dash/s/avatar/#{context.key}.png)"
      handler: ({node, local, data}) ->
        local.view.setContext data
        local.view.render!
  view-config.action.click <<< do
    "newuser-toggle": ({node}) -> view.getAll(\newuser).map -> it.classList.toggle \d-none
    "batch-add": ({node,local}) ~>
      close = ->
        local.view.get('list').value = ''
        ldcvmgr.toggle \batch-add-user, false
      batch-add = ->
        ret = (local.view.get('list').value or '')
          .split /\s|,/
          .map -> it.trim!
        ret = (local.view.get('list').value or '')
          .split /\s|,/
          .map -> it.trim!
          .filter ->it and is-email(it)
          .map -> add-user {type: \email, displayname: it, key: it}, false
          .filter -> !it
        if ret.length => alert "some email already exist"
        update-data!
        update-view!
        ldcvmgr.toggle \batch-add-user, false

      Promise.resolve!
        .then ->
          if local.view => return
          ldcvmgr.getdom \batch-add-user .then (dom) ~>
            local.view = new ldView do
              root: dom
              action: click: do
                cancel: -> close!
                add: -> batch-add!
        .then -> ldcvmgr.toggle \batch-add-user, true
    "newtoken-add": ({node}) ~>
      role = (if lc.type == \list => lc.picked-role else lc.role) or obj.cfg.roles.0
      if !role => return
      payload = {role: role.key}
      if @org => payload.org = @org.slug
      if @brd => payload.brd = @brd.slug
      auth.recaptcha.get!
        .then (recaptcha) ->
          payload.recaptcha = recaptcha
          ld$.fetch "/dash/api/token", {method: \POST}, {json: payload, type: \json}
        .then (r = {}) ~>
          if !(r.id and r.token) => return Promise.reject new ldError(400)
          id = "#{r.id}:1"
          picked = {key: id, displayname: "連結邀請碼", type: \token}
          len = obj.cfg.roles
            .map -> it.list
            .reduce(((a,b) -> a ++ b), [])
            .filter -> it.type == picked.type and it.key == picked.key
            .length
          if len => return alert("user already exist")
          entry = picked <<< {perm: role.name}
          role.list.push entry
          update-data!
          update-view!
          ldcvmgr.getdom \token-link
            .then (dom) ->
              ld$.find(dom, '[ld=token-link]',0)
                .innerText = "https://#{window.location.hostname}/dash/token/#{r.token}"
              ldcvmgr.toggle \token-link
        .catch error!

    "newuser-add": ({node, evt}) ~>
      if !(picked = @ctrl.search.get!) => return
      add-user picked

  view-config.handler <<< do
    "newuser-role-picked": ({node}) ->
      if !lc.picked-role => lc.picked-role = obj.cfg.roles[0]
      if lc.picked-role => node.innerText = lc.picked-role.name
    "newuser-role-option": do
      list: -> obj.cfg.roles
      action: click: ({node, data}) ->
        lc.picked-role = data
        view.render \newuser-role-picked
      handler: ({node, data}) -> node.innerText = data.name

  update-data-debounced = debounce 500, -> update-data!
  update-data = (deb) ~>
    if deb => update-data-debounced!
    else @ops-out ~> @obj.cfg

  view = new ldView view-config

  @


Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    @obj.cfg = JSON.parse JSON.stringify(data or {})
    if !@obj.cfg.roles => @obj.cfg.roles = []
    @obj.cfg.roles.map -> if !it.key => it.key = suuid!
    @update-view!

return Ctrl
