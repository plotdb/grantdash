(->
  window.Adopter = Adopter = ->
    @ <<< {doc: null, sdb: null, data: null, evt-handler: {}}
    @

  Adopter.prototype = Object.create(Object.prototype) <<< do
    on: (n, cb) -> @evt-handler.[][n].push cb
    fire: (n, ...v) -> for cb in (@evt-handler[n] or []) => cb.apply @, v
    install: ->
      @ <<< it{sdb, doc}
      @data = @doc.data
      @watch {data: @data}
    update-field: (n,v) ->
      cur = JSON.parse(JSON.stringify(@data))
      cur[n] = v
      ops = @sdb.json.diff(@data, cur)
      @update ops
      @data[n] = v
    update: (ops) -> if ops and ops.length => @doc.submitOp ops
    watch: ({ops, data}) ->
      if data => @data = data
      # force update all fields. not effecient.
      @fire \change, {ops, data}
)!
