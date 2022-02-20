ldc.register <[blockbase viewLocals auth ldNotify error notify]>, ({blockbase, viewLocals, auth, error, notify}) ->

  blockdef = name: '@taiccadash/icg-111', version: 'main'
  brd = "icg-111"
  blockbase.init {blockdef, brd}
    .catch ->
      console.log 'failed: ', it
      return Promise.reject it

