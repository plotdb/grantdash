(->
  window.Adopter = Adopter = (opt = {}) ->
    @ <<< {doc: null, sdb: null, data: null, evt-handler: JSON.parse(JSON.stringify({}))}
    @ <<< {path: opt.path or []}
    @

  Adopter.prototype = Object.create(Object.prototype) <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
    install: ->
      @ <<< it{sdb, doc}
      o = @doc.data
      for n in @path => o = o[n]
      @watch {data: o}
    update: (ops) ->
      if typeof(ops) == \function => 
        cur = ops(JSON.parse(JSON.stringify(@data or {})))
        ops = if !@data => [{p: [], oi: {}}] else []
        ops ++= @sdb.json.diff((@data or {}), cur)
        @update ops
      else if Array.isArray(ops) and ops.length =>
        ops.map ~> it.p = @path ++ it.p
        @doc.submitOp ops

    watch: ({ops, data, source}) ->
      if data => @data = data
      else
        o = @doc.data
        for n in @path => o = o[n]
        @data = o

      # force update all fields. not effecient.
      @fire \change, {ops, data, source}
)!
