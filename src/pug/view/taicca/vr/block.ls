ldc.register <[blockbase viewLocals auth ldNotify error notify]>, ({blockbase, viewLocals, auth, error, notify}) ->

  blockdef = name: '@taiccadash/vr', version: 'main'
  brd = "vr"
  blockbase.init {blockdef, brd}
    .catch ->
      console.log 'failed: ', it
      return Promise.reject it

