ldc.register <[blockbase blockuploader viewLocals auth ldNotify error notify]>, ({blockbase, blockuploader, viewLocals, auth, error, notify}) ->

  main-block = name: '@taicca/future-content', version: 'dev'
  uploadr = new blockuploader brd: \future-content, owner: 0
  host = upload: -> uploadr.upload it

  blockbase.init {main-block, host}
    .catch ->
      console.log 'failed: ', it
      return Promise.reject it

