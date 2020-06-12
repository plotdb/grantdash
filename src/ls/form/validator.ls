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
    match: (v,i) -> (new RegExp(i).exec(v))
    "not-match": (v,i) -> !(new RegExp(i).exec(v))
  smaller: do
    type: (v,i,j) -> !(isNaN(v) or (i? and isNaN(i)) or (j? and isNaN(j)))
    convert: (v,i,j) -> [+v,+(i or 0),+(j or 0)]
    le: (v,i) -> v < i

return do
  validate: (block, force = false) ->
    [value,config, is-empty] = [block.{}value, block.{}config, false]
    if block.name == \form-checkpoint =>
      data = value.[]list
      is-empty = !data.length or data.filter(-> (it.title and it.desc and it.date)).length != data.length
    else if block.name == \form-datetime =>
      data = value
      is-empty = !(value.start and (!config.range-enabled or value.end))
    else if block.name in <[form-checkbox form-radio]> =>
      data = ((value.list or []) ++ (if value.other => [value.other-value] else []))
      is-empty = !(data.filter(->it).length)
    else if value.content =>
      data = value.content
      is-empty = !data
    else if value.list =>
      data = value.list
      is-empty = !(data and data.length)
    else
      [data,is-empty] = [null, true]

    if is-empty and ((config.required and block.touched) or force) =>
      return {result: false, criteria: {invalid: "此為必填項目"}}

    if is-empty => return {}
    else block.touched = true
    for c in (block.criteria or [])
      if !c.enabled => continue
      type = prjFormCriteria.schema.types[c.type]
      if !(c.type and type) => continue
      vtr = validator[type.ops]
      if !vtr[c.op] => continue
      [v,i,j] = vtr.convert data, c.input1, c.input2
      if !(vtr.type(v, i, j) and vtr[c.op](v,i,j)) => return {result: false, criteria: c}
    return {result: true}

