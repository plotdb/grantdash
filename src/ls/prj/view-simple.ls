<- ldc.register \prjViewSimple, <[]>, _

Ctrl = (opt) ->
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @form = opt.form
  @answer = opt.answer
  @ <<< opt{prj, brd, org}
  @view = new ldView do
    root: root
    handler: do
      item: do
        list: ~> @form.list
        init: ({node, local, data}) ~>
          local.view = new ldView do
            context: data
            root: node
            handler: do
              title: ({node,context}) -> node.innerText = context.title
              desc: ({node,context}) -> node.innerText = context.desc
              answer: ({node,context}) ~>
                ret = Ctrl.render {block: context, answer: @answer[context.key], prj: @prj, org: @org}
                node.innerHTML = DOMPurify.sanitize(ret)
        handler: ({local, data}) ->
          local.view.setContext data
          local.view.render!
  @

Ctrl.prototype = Object.create(Object.prototype) <<< do
  update: ({form, answer, prj}) ->
    @ <<< {form, answer, prj}
    @render!
  render: -> @view.render!

Ctrl.render = ({block, answer, prj, brd, org}) ->
  result = {}
  if !(block and answer) => return
  if answer.content =>
    if answer.useMarkdown =>
      result = DOMPurify.sanitize(marked(answer.content))
    else result = htmlentities(answer.content)
  else if answer.list =>
    if block.name in <[form-file form-thumbnail]>
      ret = (answer.list or [])
        .map (f) ->
          """
          <li><a href="/dash/org/#{org}/prj/#{prj}/upload/#{f.path}">
          #{htmlentities(f.name)}
          </a></li>
          """
        .join ('')
      result = DOMPurify.sanitize(ret)
    else if block.name == \form-checkpoint
      ret = (answer.list or [])
        .map (d) ->
          """
          <p><div><b><big>#{htmlentities(d.title)}</big></b></div>
          <div>#{htmlentities(d.desc)}</div></p>
          """
        .join('')
      result = "<blockquote style='margin-left:1em'>#{DOMPurify.sanitize(ret)}</blockquote>"
    else
      list = (answer.list ++ if answer.otherValue and answer.other => [answer.otherValue] else [])
      result = DOMPurify.sanitize(list.join "<br>")
  return result

Ctrl
