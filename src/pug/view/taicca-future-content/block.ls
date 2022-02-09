ldc.register <[blockbase viewLocals auth ldNotify error notify]>, ({blockbase, viewLocals, auth, error, notify}) ->

  blockdef = name: '@taiccadash/future-content', version: 'main'
  brd = "future-content"
  blockbase.init {blockdef, brd}
    .catch ->
      console.log 'failed: ', it
      return Promise.reject it

