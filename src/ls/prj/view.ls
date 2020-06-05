ldc.register \prjView, <[auth error viewLocals]>, ({auth, error, viewLocals}) ->
  auth.get!
    .then (g) ->
      {prj,brd,grp} = viewLocals
      answers = prj.{}detail.{}answer
      blocks = grp.{}form.[]list
      bhash = {}
      blocks.map -> bhash[it.key] = it

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
          "btn-edit": ({node}) -> node.classList.toggle \d-none, (g.user.key != viewLocals.owner)
          answer: ({node}) ->
            key = node.getAttribute(\data-key)
            block = bhash[key]
            if !(answer = answers[key] or {}) or !(block = bhash[key]) => return
            if answer.content =>
              if answer.useMarkdown =>
                node.innerHTML = DOMPurify.sanitize(marked(answer.content))
              else node.innerText = answer.content
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
