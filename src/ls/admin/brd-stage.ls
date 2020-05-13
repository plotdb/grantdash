(->
  ldc.register \brdStage, <[]>, ->
    obj = do
      idx: 0
      cfg: {stage: [
        {
          name: "預設"
          config: {}
          start: ""
          end: ""
        }
      ]}

    /*
    obj = do
      idx: 0
      cfg: do
        periods: [
          {
            name: "預設"
            config: {}
            start: ""
            end: ""
          },
          {
            name: "提案期"
            config: {}
            start: ""
            end: ""
          }
        }
    */

    view-config = {root: '[ld-scope=stage-panel]', init: {}, handler: {}, action: {click: {}, input: {}}}
    view-config.action.input <<< do
      "stage-name": ({node}) ->
        name = (node.value or '').trim!
        invalid = !name or (~obj.cfg.stage.map(->it.name).indexOf(name) and obj.cfg.stage[obj.idx].name != name)
        node.classList.toggle \is-invalid, invalid
        if invalid => return
        obj.cfg.stage[obj.idx].name = node.value
        update-data!
        view.render!
    view-config.action.click <<< do
      stages: ({node, evt}) ->
        n = evt.target
        if !(type = n.getAttribute(\data-type)) => return
        names = obj.cfg.stage.map(-> it.name)
        if type == \new-stage =>
          for i from 1 til 100 => if !~names.indexOf("時段#i") => break
          name = "時段#{if i < 100 => i else Math.round(Math.random! * 100) + 100}"
          obj.cfg.stage.push { name: name, desc: "自訂時段", config: {} }
        else
          name = n.getAttribute(\data-name)
          obj.idx = names.indexOf(name)
        update-data!
        view.render!
      "delete-stage": ({node, evt}) ->
        if obj.cfg.stage.length <= 1 => alert "最少要有一個階段"
        else if ~obj.idx =>
          obj.cfg.stage.splice(obj.idx,1)
          obj.idx = 0
          update-data!
          view.render!

    view-config.handler <<< do
      "default-view": ({node}) -> node.classList.toggle \d-none, obj.idx != 0
      "custom-view": ({node}) -> node.classList.toggle \d-none, obj.idx == 0
      "stage-name": ({node}) ->
        node.value = obj.cfg.stage[obj.idx].name
        name = (node.value or '').trim!
        invalid = !name or (~obj.cfg.stage.map(->it.name).indexOf(name) and obj.cfg.stage[obj.idx].name != name)
        node.classList.toggle \is-invalid, invalid
      stage: do
        list: -> obj.cfg.stage
        handle: ({node, data, idx}) ->
          n = ld$.find(node, 'a',0)
            ..innerText = data.name
            ..classList.toggle \active, (idx == obj.idx)
            ..setAttribute \data-name, data.name
            ..setAttribute \data-type, \tab

    view-config.action.input <<< do
      time: ({node}) ->
        obj.cfg.stage[obj.idx][node.getAttribute(\data-name)] = node.value
        update-data!
    view-config.init <<< do
      time: ({node}) -> 
        tail.DateTime(node) #"input[name=starttime]")
        #flatpickr node, {enableTime: true, dateFormat: "Y-m-d H:i" }
    view-config.handler <<< do
      time: ({node}) -> node.value = obj.cfg.stage[obj.idx][node.getAttribute(\data-name)] or ''

    view-config.action.click <<< do
      switch: ({node}) ->
        node.classList.toggle \on
        c = obj.cfg.stage[obj.idx].{}config
        if !c => return
        c[node.getAttribute(\data-name)] = node.classList.contains(\on)
        update-data!
    view-config.handler <<< do
      switch: ({node}) ->
        node.classList.toggle \on, !!obj.cfg.stage[obj.idx].{}config[node.getAttribute(\data-name)]

    view = new ldView view-config

    # TODO board path to stage
    adopter = new Adopter path: ['stage']
    adopter.on \change, ({ops, source}) ->
      if source => return
      obj.cfg = if adopter.data => JSON.parse(JSON.stringify(adopter.data)) else {}
      if !obj.cfg.roles => obj.cfg.roles = []
      update-view!
    update-data-debounced = debounce 500, -> update-data!
    update-data = (deb) ->
      if deb => update-data-debounced!
      else adopter.update -> JSON.parse(JSON.stringify(obj.cfg))

    return adopter


  ldc.app \brdStage 

)!
