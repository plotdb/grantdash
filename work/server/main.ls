require! <[fs sharedb sharedb-postgres]>
require! <[../../secret]>

sdb = new sharedb { db: sharedb-postgres(secret.io-pg) }
connect = sdb.connect!
doc = connect.get \doc, \brd/sch001

doc.subscribe (ops, source) ->
  console.log doc.data
  doc.data.perm.roles.map (r,i) ->
    r.list.map (d,j) -> 
      #if d.key == 'tkirby@gmail.com' =>
      #  doc.submitOp [{p: ['perm', 'roles', i, 'list', j, 'config'], od: d.config}]
  doc.unsubscribe!

#doc.on \error, (err) ~> @fire \error, {doc, err}
#if watch? => doc.on \op, (ops, source) -> watch ops, source
#if !doc.type => doc.create ((if create => create! else null) or {})


