({error, loader, notify, ldcvmgr, auth, sdbAdapter}) <- ldc.register(
\adminDev, <[error loader notify ldcvmgr auth sdbAdapter]>, _)
Ctrl = (opt) ->
  window.admin-dev = do
    get: ~> return @data
    set: ~>
      @data = JSON.parse(JSON.stringify(it))
      @ops-out ~> @data
  @

Ctrl.prototype = Object.create(Object.prototype) <<< sdbAdapter.interface <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))

return Ctrl
