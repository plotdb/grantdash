ldc.register \prjView, <[auth error stage viewLocals discussView]>, ({auth, error, stage, discussView, discussEdit, viewLocals}) ->
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
          answer: ({node}) ->
            key = node.getAttribute(\data-key)
            block = bhash[key]
            if !(answer = answers[key] or {}) or !(block = bhash[key]) => return
            if answer.content =>
              if answer.useMarkdown =>
                node.innerHTML = DOMPurify.sanitize(marked(answer.content))
              else node.innerText = answer.content
            else if answer.start =>
              start = moment(answer.start).format("YYYY-MM-DD hh:mm:ss")
              end = moment(answer.end).format("YYYY-MM-DD hh:mm:ss")
              node.innerText = if block.{}config.range-enabled => "#start - #end" else start
            else if answer.list =>
              if block.name in <[form-file form-thumbnail]>
                ret = (answer.list or [])
                  .map (f) ->
                    """
                    <li><a href="/dash/org/#{brd.org}/prj/#{prj.slug}/upload/#{f.path}">
                    #{htmlentities(f.name)}
                    </a></li>
                    """
                  .join ('')
                node.innerHTML = DOMPurify.sanitize(ret)
              else if block.name == \form-checkpoint
                ret = (answer.list or [])
                  .map (d) ->
                    """
                    <p><div><b><big>#{htmlentities(d.title)}</big></b></div>
                    <div>#{htmlentities(d.desc)}</div></p>
                    """
                  .join('')
                node.innerHTML = "<blockquote style='margin-left:1em'>#{DOMPurify.sanitize(ret)}</blockquote>"
              else
                list = (answer.list ++ if answer.otherValue and answer.other => [answer.otherValue] else [])
                node.innerHTML = DOMPurify.sanitize(list.join "<br>")

     
    .catch error!

ldc.app \prjView
