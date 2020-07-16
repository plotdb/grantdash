require! <[fs sharedb sharedb-postgres suuid]>
require! <[../../secret]>

sdb = new sharedb { db: sharedb-postgres(secret.io-pg) }
connect = sdb.connect!
doc = connect.get \doc, doc_id = "brd/test-brd/grp/4jUmMh07zZ05kl0Col03v-Bhu/judge/primary"

id = suuid!

doc.subscribe (ops, source) ->
  console.log "[#id] coming in ..."
  ks = [k for k of doc.data.user["1"].prj]
  setInterval (->
    k = ks[Math.floor(Math.random! * ks.length)]
    obj = doc.data.user.1.prj[k].value
    val = <[accept reject pending]>[Math.floor(Math.random! * 3)]
    op1 = if typeof(obj) == \string => {p: ["user", "1", "prj", k, "value"], od: obj}
    else {p: ["user", "1", "prj", k, "value"], od: obj}
    op2 = {p: ["user", "1", "prj", k, "value"], oi: val}
    ops = [op1, op2]
    doc.submitOp ops
    console.log "[#id] submitted."
  ), 1000
  doc.unsubscribe!


