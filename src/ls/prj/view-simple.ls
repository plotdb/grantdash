<- ldc.register \prjViewSimple, <[]>, _

Ctrl = (opt) ->
  @root = root = if typeof(opt.root) == \string => document.querySelector(opt.root) else opt.root
  @form = opt.form
  @answer = opt.answer
  @ <<< opt{prj, brd, org}
  get-answer = (block) ~> @answer[block.key] or block.value 
    
  @view = new ldView do
    root: root
    handler: do
      item: do
        list: ~>
          @form.list
        init: ({node, local, data}) ~>
          local.view = new ldView do
            context: data
            root: node
            handler: do
              title: ({node,context}) -> node.innerText = context.title
              desc: ({node,context}) ->
                node.classList.toggle \d-none, !context.config["show-desc"]
                node.innerText = context.desc
              content: ({node,context}) ~>
                ans = get-answer context
                ret = Ctrl.render {block: context, answer: ans, prj: @prj, org: @org}
                node.classList.toggle 'empty', !ret
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
    result = if answer.useMarkdown => DOMPurify.sanitize(marked(answer.content or ''))
    else htmlentities(answer.content or '')
  else if answer.start =>
    start = moment(answer.start).format("YYYY-MM-DD hh:mm:ss")
    end = moment(answer.end).format("YYYY-MM-DD hh:mm:ss")
    result = if block.{}config.range-enabled => "#start - #end" else start
  else if answer.list =>
    if block.name in <[form-file form-thumbnail]>
      ret = (answer.list or [])
        .map (f) ->
          """
          <li><a href="/dash/org/#{org}/prj/#{prj}/upload/#{f.fn}" target="_blank" rel="noopener noreferrer">
          #{htmlentities(f.name)}
          </a></li>
          """
        .join ('')
      result = DOMPurify.sanitize(ret,{ ADD_ATTR: <[target]> })
    else if block.name == \form-checkpoint
      ret = (answer.list or [])
        .map (d) ->
          """
          <div class="item"><div class="fields mb-4">
          <div class="d-flex align-items-end mb-2">
            <h4 class="mb-0 mr-2">#{htmlentities(d.title)}</h4>
            <p class="text-muted text-sm mb-0">#{htmlentities(d.date)}</p>
          </div>
          <p>#{htmlentities(d.desc)}</p>
          </div></div>
          """
        .join('')
      result = """<div class="form-block mt-4 p-2"><div class="timeline-list">#{DOMPurify.sanitize(ret)}</div></div>"""
    else
      list = (answer.list ++ if answer.otherValue and answer.other => [answer.otherValue] else [])
      result = DOMPurify.sanitize(list.join "<br>")
  else result = ''
  return result

Ctrl
