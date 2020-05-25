# adapter - for simplifying sharedb connection.
# - set({path}) - update adapter path.
# - interface
#   - adapter({hub, path}) - initialize adapter
#     - hub: a sharedb hub. contains sdb and doc object. also serve for event gateway.
#   - ops-out(f): user should call this if he want to update data to server. 
#     - f: a function return modified data object.
#   - ops-in({data,ops,source}): user should implement this. when remote data changed, ops-in will be called. 

<- ldc.register \sdbAdapter, [], _

Adapter = (opt = {}) ->
  @ <<< {doc: null, sdb: null, data: null, evt-handler: JSON.parse(JSON.stringify({}))}
  @ <<< {path: opt.path or []}
  @

Adapter.prototype = Object.create(Object.prototype) <<< do
  on: (n, cb) -> @evt-handler.[][n].push cb
  fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
  init: (hub) ->
    @hub = hub
    @ <<< hub{sdb, doc}
    o = @doc.data
    for n in @path => o = (o[n] or {})
    @watch {data: o}
    @hub.on \change, ~> @watch it
  set-doc: (doc) ->
    @doc = doc
    o = @doc.data
    for n in @path or [] => o = (o[n] or {})
    @watch {data: o}
  set: ({path}) ->
    @path = path
    o = @doc.data
    for n in @path => o = (o[n] or {})
    @watch {data: o}
  update: (ops) ->
    if !@sdb => return
    if typeof(ops) == \function => 
      cur = ops(JSON.parse(JSON.stringify(@data or {})))
      ops = if !@data => [{p: [], oi: {}}] else []
      ops ++= @sdb.json.diff((@data or {}), cur)
      @update ops
    else if Array.isArray(ops) and ops.length =>
      ops.map ~> it.p = @path ++ it.p
      o = @doc.data
      p = []
      for n in @path =>
        p.push n
        if !o[n] => ops = [{p: JSON.parse(JSON.stringify(p)), oi: {}}] ++ ops
        o = (o[n] or {})
      @doc.submitOp ops

  watch: ({ops, data, source}) ->
    if data => @data = data
    else
      o = @doc.data
      for n in @path => o = (o[n] or {})
      @data = o
    # force update all fields. not effecient.
    @fire \change, {ops, data, source}

Adapter.interface = do
  adapted: -> !!@adapter
  adapt: ({hub, path}) ->
    @adapter = adapter = new Adapter path: path
    adapter.on \change, ({ops, source}) ~> @ops-in {data: adapter.data, ops, source}
    adapter.init hub
    return adapter
  set-doc: (doc) -> if @adapter => @adapter.set-doc doc

  set-path: (p) -> @adapter.set {path: p}
  # send data to server. f is either function or ops.
  # if f is function, it takes @data clone, and should return an updated data.
  ops-out: (f) -> if @adapter => @adapter.update f
  # receive data from server. should be implemented by user.
  ops-in: null

return Adapter
