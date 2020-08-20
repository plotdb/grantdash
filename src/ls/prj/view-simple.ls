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
                node.innerHTML = DOMPurify.sanitize(ret, { ADD_ATTR: <[target]>})
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
          <li><a href="/dash/org/#{org}/prj/#{prj}/upload/#{f.fn}?id=#{Math.random!toString(36)substring(2)}"
          target="_blank" rel="noopener noreferrer">
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
  else if block.name == \form-budget
    sheet = JSON.parse(JSON.stringify(answer.sheet))
    sheet.map -> it.push(+it.2 + +it.3)
    total = sheet.reduce(((a,b) -> a + +b.4),0)
    subsidy = sheet.reduce(((a,b) -> a + +b.3),0)
    percent = "#{Math.round(1000 * subsidy / (total or 1)) / 10}"
      .replace "(\.\d)\d*", "$1"

    sheet = sheet
      .map ->
        if !it.filter(-> it).length => return
        ret = it.map(-> """<td>#{it or ' '}</td>""").join('')
        """<tr>#ret</tr>"""
      .filter -> it
      .join('')
    data = """
    <table class='mb-2 form-budget-table'><tr>
    <th rowspan="2">分類</th>
    <th rowspan="2">項目</th>
    <th colspan="3">預估</th>
    </tr>
    <tr><th>自籌</th><th>補助</th><th>總計</th></tr>
    #sheet
    </table>
    <div class="d-flex justify-content-between">
    <div><span class="text-muted text-sm">總金額</span>
         <span class="font-weight-bold">#total</span>
         <span class="text-muted text-sm">元</span></div>
    <div><span class="text-muted text-sm">補助金額</span>
         <span class="font-weight-bold">#subsidy</span>
         <span class="text-muted text-sm">元</span></div>
    <div><span class="text-muted text-sm">補助比例</span>
         <span class="font-weight-bold">#percent</span>
         <span class="text-muted text-sm">%</span></div>
    </div>
    """
    result = DOMPurify.sanitize data
  else result = ''
  return result

Ctrl
