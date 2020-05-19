/*
val
input1
input2

[val,input1,input2] = [+val,+input1,+input2]
\number
  \gte  val >= input1
  \lte  val <= input1
  \ge  val > input1
  \le  val < input1
  \eq  val == input1
  \ne  val != input1
  \between val >= input1 and val <= input2

[val,input1] = ["#{val}","#{input1}"]
\string
  \include ~val.indexOf(input1)
  \exclude !~val.indexOf(input1)
  \email   /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(val)
  \url /^\s*http(s):\/\/[a-zA-Z0-9-]+/.exec(val)


len = if Array.isArray(val) => val.length else "#{val}".length
count
  \gte  len >= input1
  \lte  len <= input1
  \eq  len == input1
  \between len >= input1 and val <= input2

regex
   \match     (new RegExp(input1).exec(val))
   \not-match !(new RegExp(input1).exec(val))

smaller
  \lte  val <= input1

extension
*/
  
validate = (block) ->
  v = block.{}value.content
  for c in (block.criteria or [])
    vtr = validator[c.type]
    [v,i,j] = vtr.convert v, input1, input2
    if !(vtr.type(v, i, j) and vtr[c.op](v,i, j) => return false
  return true

  
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

