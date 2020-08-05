({prjFormCriteria}) <- ldc.register \prjFormValidation, <[prjFormCriteria]>, _
validator = do
  number: do
    type: (v,i,j) -> !(isNaN(v) or (i? and isNaN(i)) or (j? and isNaN(j)))
    convert: (v,i,j) -> [+v,+(i or 0),+(j or 0)]
    gte: (v,i) -> v >= i
    lte: (v,i) -> v <= i
    ge: (v,i) -> v > i
    le: (v,i) -> v < i
    eq: (v,i) -> v == i
    ne: (v,i) -> v != i
    between: (v,i,j) -> v >= i and v <= j
  string: do
    type: (v,i) -> v? and i?
    convert: (v,i) -> ["#{v}","#{i}"]
    include: (v,i) -> ~v.indexOf(i)
    exclude: (v,i) -> !~v.indexOf(i)
    email: (v,i) -> /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(v)
    url: (v,i) -> /^\s*http(s):\/\/[a-zA-Z0-9-]+/.exec(v)
  count: do
    type: (v,i,j) -> v? and i? and j?
    convert: (v,i,j) ->
      len = if Array.isArray(v) => v.length else if v? => (v.length or "#{v}".length) else 0
      return [len, +(i or 0), +(j or 0)]
    gte: (v,i) -> v >= i
    lte: (v,i) -> v <= i
    eq: (v,i) -> v == i
    between: (v,i,j) -> v >= i and v <= j
  regex: do
    type: (v,i,j) -> [v,i,j].reduce(((a,b) -> a and (typeof(b) == \string)),true)
    convert: (v, i, j) -> return [v,i,j].map -> "#it"
    match: (v,i) -> (new RegExp(i).exec(v))
    "not-match": (v,i) -> !(new RegExp(i).exec(v))
  smaller: do
    type: (v,i,j) -> !(isNaN(v) or (i? and isNaN(i)) or (j? and isNaN(j)))
    convert: (v,i,j) -> [+v,+(i or 0),+(j or 0)]
    le: (v,i) -> v < i

get-data = do
  "form-checkpoint": ({block}) ->
    return (block.value or {}).list or []
  "form-datetime": ({block}) ->
    return (block.value or {})
  "form-checkbox": ({block}) ->
    value = (block.value or {})
    return ((value.list or []) ++ (if value.other => [value.other-value] else []))
  "form-radio": ({block}) ->
    value = (block.value or {})
    return ((value.list or []) ++ (if value.other => [value.other-value] else []))
  "form-table": ({block}) -> ((block.value or {}).sheet or []).filter -> it.filter(->it).length

is-empty = do
  "form-checkpoint": ({block, data}) ->
    return !data.length or data.filter(-> (it.title and it.desc and it.date)).length != data.length
  "form-datetime": ({block, data}) ->
    config = block.config or {}
    return !(data.start and (!config.range-enabled or data.end))
  "form-checkbox": ({block, data}) -> !(data.filter(->it).length)
  "form-radio": ({block, data}) -> !(data.filter(->it).length)
  "form-table": ({block, data}) -> !(data and data.length)

retcode = do
  empty: {result: false, criteria: {invalid: "此為必填項目"}}
  pass: {result: true}

apply-criteria = (c, data) ->
  if !c.enabled => return null
  type = prjFormCriteria.schema.types[c.type]
  if !(c.type and type) => return null
  vtr = validator[type.ops]
  if !vtr[c.op] => return null
  [v,i,j] = vtr.convert data, c.input1, c.input2
  if !(vtr.type(v, i, j) and vtr[c.op](v,i,j)) => return {result: false, criteria: c}
  return null

empty-helper = ({block, empty, force}) ->
  config = block.{}config
  if empty =>
    if !config.required => return retcode.pass
    if (config.required and (block.touched or force)) => return retcode.empty
    return {}
  block.touched = true
  return null

validate = do
  "form-file": ({block, force}) ->
    value = (block.value or {}).list or []
    if !(value and value.length) => if empty-helper({block, empty: true, force}) => return that
    for c in (block.criteria or []) =>
      if !c.enabled => continue
      if c.type == \file-size =>
        ret = /^([0-9.,]+)([mk]b)?$/.exec(("#{c.input1 or '0'}").trim!.toLowerCase!)
        if ret =>
          limit = ret.1.replace(',','') * (if !ret.2 => 1 else if ret.2 == 'mb' => 1048576 else 1024)
        else limit = 0
        if value.map(-> it.size).filter(-> it >= limit).length => return {result: false, criteria: c}
      else if c.type == \file-format =>
        exts = (c.input1 or "").toLowerCase!.split(',')
        v = value.map ->
          ext = ((if it.name => it.name.split('.')[* - 1]) or it.ext or '').toLowerCase!
        if v.filter(->!(it in exts)).length => return {result: false, criteria: c}
      else if c.type == \file-count => if apply-criteria(c, value) => return that
    return {result: true}
  "form-text": -> return {result: true}
  "form-budget": ({block, force}) ->
    sheet = (block.value or {}).sheet or []
    data = sheet.reduce(((a,b) -> a + +b.2 + +b.3), 0)
    empty = !data or isNaN(data)
    if empty-helper({block, empty, force}) => return that
    total = sheet.reduce(((a,b) -> a + +b.2 + +b.3), 0)
    subsidy = sheet.reduce(((a,b) -> a + +b.3), 0)
    percent = (subsidy / (total or 1)) * 100
    for c in (block.criteria or []) =>
      if !c.enabled => continue
      if c.type == \budget-percent => data = percent
      else if c.type == \budget-number => data = subsidy
      if apply-criteria(c, data) => return that
    return {result: true}

return do
  validate: (block, force = false) ->
    [value, config, empty] = [block.{}value, block.{}config, false]
    if validate[block.name] => return validate[block.name]({block, force})
    data = if get-data[block.name] => get-data[block.name] {block}
    else if value.content => value.content
    else if value.list => data = value.list
    else null
    empty = if is-empty[block.name] => is-empty[block.name]({block,data})
    else if value.content => !value.content
    else if value.list => !(value.list and value.list.length)
    else true
    if empty-helper({block, empty, force}) => return that
    for c in (block.criteria or []) => if apply-criteria(c, data) => return that
    return retcode.pass
