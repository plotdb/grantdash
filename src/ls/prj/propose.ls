<- ldc.register \prjCreate, [], _

Propose = ->
  @

Propose.prototype = Object.create(Object.prototype) <<< do
  toggle: (v) -> @init!then -> ldcvmgr.toggle \prj-create, v
  init: ->
    Promise.resolve!
      .then ~> if !@cover => ldcvmgr.getcover \prj-create .then ~> @cover = it
      .then ~> if !@dom => ldcvmgr.getdom \prj-create .then ~> @dom = it
      .then ~>
        if @form => return
        @form = new ldForm do
          root: '[data-name=prj-create]'
          submit: '[data-name=prj-create] .btn[ld=submit]'
          verify: (n,v,e) -> if n == \description => return 1 else return if !!v => 0 else 1
          afterCheck: (s,f) -> s.all = s.name
      .then ~> @form.reset!
      .then ~>
        if @view => return
        @view = new ldView do
          root: '[data-name=prj-create]'
          action: click: submit: ({node}) ->
            if node.classList.contains(\disabled) or node.classList.contains(\running) => return
            node.classList.add \running
            payload = form.values!
            ld$.fetch '/d/p/', {method: \POST}, {json: payload, type: \json}
              .then -> ldcvmgr.toggle('redirect')
              .catch error!
              .finally -> node.classList.remove \running
          handler:
            "brd-name": ({node}) -> node.innerText = "這個活動"
            submit: (->)

# sample usage
# p = new Propose!
# p.toggle!

return Propose
