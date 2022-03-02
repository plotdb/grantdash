(o) <- ldc.register <[blockbase viewLocals auth ldNotify error notify viewmode]>, _
{blockbase, viewLocals, auth, error, notify, viewmode} = o
blockdef = name: '@taiccadash/future-content-111', version: 'main'
brd = "future-content-111"
data = {mode: viewmode, is-embedded: if viewmode == \view => true else false}
blockbase.init {blockdef, brd, data}
  .catch ->
    console.log 'failed: ', it
    return Promise.reject it
