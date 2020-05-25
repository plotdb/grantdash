require! <[sharedb sharedb-postgres ./engine/io/postgresql sharedb-pg-mdb]>
secret = require './secret'
console.log "new sharedb instance..."
backend = new sharedb do
  db: sharedb-postgres(secret.io-pg)
  milestoneDb: new sharedb-pg-mdb({io-pg: secret.io-pg, interval: 500})

console.log "make connection ... "
connect = backend.connect!
console.log "fetch snapshot ... "
connect.fetchSnapshot \doc, \brd-4, null, (e, b) -> console.log e, b

Snapshot = (id, version, type, data, meta) ->
  @id = id
  @v = version
  @type = type
  @data = data
  @m = meta
  @

/*
console.log 'init io ...'
io = new postgresql secret
id = 'brd-4'
t0 = Date.now!
console.log 'query ops ...'
io.query "select version,operation from ops where collection = $1 and doc_id = $2 order by version limit 100", ['doc', id]
  .then (r={}) ->
    #console.log 'apply ops ... '
    t1 = Date.now!
    ops = r.[]rows.map -> it.operation
    console.log r.rows.length
    snapshot = new Snapshot id, 0, null,  ,null
    sharedb.ot.applyOps snapshot, ops
    t2 = Date.now!
    console.log t1 - t0
    console.log t2 - t1
    #console.log 'done.'
*/
