ldc.register <[blockbase viewLocals auth ldNotify error notify]>, ({blockbase, viewLocals, auth, error, notify}) ->

  blockdef = name: '@taiccadash/future-content-111', version: 'main'
  brd = "future-content-111"
  blockbase.init {blockdef, brd}
    .catch ->
      console.log 'failed: ', it
      return Promise.reject it

