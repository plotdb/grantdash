({auth, sdbAdapter, error, ldcvmgr}) <- ldc.register \adminPage, <[auth error sdbAdapter ldcvmgr]>, _
Ctrl = (opt) ->
  @type = type = if ~(<[org brd]>.indexOf(opt.type)) => opt.type else null
  if !type => throw new ldError(1015, "admin-page: type is not defined.")
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @toc = opt.toc
  @data = {}
  @update = debounce ~> @_update!
  @view = new ldView do
    root: root
    action: do
      click: do
        deploy: ~>
          auth.recaptcha.get!
            .then (recaptcha) ~>
              payload = {slug: @toc[@type]slug, type: @type, recaptcha}
              ld$.fetch \/dash/api/deploy, {method: \POST}, {json: payload, type: \json}
            .then -> ldcvmgr.toggle \deploying
            .catch -> ldcvmgr.toggle "deploy-failed"
        opt: ({node}) ~>
          name = node.getAttribute(\data-name)
          @data.opt = name
          @update!now!
          @view.render!
        "git-secret-gen": ~>
          @data.{}git.secret = @view.get('git-secret').value = suuid!
          @update!
      input: do
        "git-url": ({node}) ~>
          @data.{}git.url = node.value or ''
          @update!
        "custom-css-url": ({node}) ~>
          @data.{}generic.css-url = node.value or ''
          @update!
        "git-branch": ({node}) ~>
          @data.{}git.branch = node.value or ''
          @update!
        "git-secret": ({node}) ~>
          @data.{}git.secret = node.value or ''
          @update!


    handler: do
      "nav-panel": ({node}) ~>
        name = node.getAttribute(\data-name)
        node.classList.toggle \d-none, !((@data.opt or \default) == name)
      "git-url": ({node}) ~> node.value = @data.{}git.url or ''
      "custom-css-url": ({node}) ~> node.value = @data.{}generic.css-url or ''
      "git-branch": ({node}) ~> node.value = @data.{}git.branch or ''
      "git-secret": ({node}) ~> node.value = @data.{}git.secret or ''
      "opt": ({node}) ~>
        name = node.getAttribute(\data-name)
        hit = ((@data.opt or \default) == name)
        node.classList.toggle \btn-outline-secondary, !hit
        node.classList.toggle \btn-primary, hit
        node.innerHTML = if hit => "目前選項<i class='i-check'></i>" else "使用這個選項"

  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  _update: -> @ops-out ~> @data
  render: -> @view.render!
  ops-in: ({data, ops, source}) ->
    if source => return
    # empty object will be truncated in data thus we clone it to prevent edited
    @data = JSON.parse JSON.stringify(data or {})
    @render!

return Ctrl
