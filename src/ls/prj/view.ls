ldc.register \prjView, <[auth error stage viewLocals discussView prjViewSimple]>, ({auth, error, stage, discussView, discussEdit, viewLocals, prj-view-simple}) ->
  lc = {}
  {prj,brd,grp} = viewLocals
  auth.get!
    .then (g) ->
      lc.global = g
      stage.get {brd: brd.slug}
    .then (ret = {}) ->
      lc.stage = ret.config or {}
      answers = prj.{}detail.{}answer
      blocks = grp.{}form.[]list
      bhash = {}
      blocks.map -> bhash[it.key] = it
      if discussView =>
        discuss = new discussView root: '[ld-scope=discuss]'
        discuss.init!
      view = new ldView do
        global: true
        root: document.body
        handler: 
          "stage-ctrl": ({node}) ->
            n = node.getAttribute \data-name
            node.classList.toggle \d-none, !lc.stage[n]

      view = new ldView do
        root: document.body
        init:
          "btn-share": ({node, local}) ->
            local.clipboard = new ClipboardJS node, { text: (t) -> return window.location.href }
            local.clipboard.on \success, ->
              clearTimeout local.h
              node.classList.add \tip-on
              local.h = setTimeout (-> node.classList.remove \tip-on), 1000
        handler: do
          "btn-edit": ({node}) -> node.classList.toggle \d-none, (lc.global.user.key != viewLocals.owner)

      prj-view = new prj-view-simple do
        root: '[ld-scope=form-answer]'
        prj: prj.slug, brd: brd.slug, org: brd.org
        form: grp.form
        answer: answers

    .catch error!

ldc.app \prjView
