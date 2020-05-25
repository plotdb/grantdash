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
  validate: (block) ->
    v = block.{}value.content or block.{}value.list
    if block.value.other => v = (v or []) ++ [block.value.other-value]
    if !v => return {}
    for c in (block.criteria or [])
      if !c.enabled => continue
      type = prjFormCriteria.schema.types[c.type]
      if !(c.type and type) => continue
      vtr = validator[type.ops]
      if !vtr[c.op] => continue
      [v,i,j] = vtr.convert v, c.input1, c.input2
      if !(vtr.type(v, i, j) and vtr[c.op](v,i,j)) => return {result: false, criteria: c}
    return {result: true}

