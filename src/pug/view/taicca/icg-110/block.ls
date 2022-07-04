(o) <- ldc.register <[blockbase viewLocals auth ldNotify error notify viewmode]>, _
{blockbase, viewLocals, auth, error, notify, viewmode} = o
if /judge/.exec(document.referrer or '') =>
  blockdef = name: '@taiccadash/icg-110', version: 'main'
else
  blockdef = name: '@taiccadash/icg-110', version: 'main'
brd = "icg-110"
data = {mode: viewmode, is-embedded: if viewmode == \view => true else false}
blockbase.init {blockdef, brd, data}
  .catch ->
    console.log 'failed: ', it
    return Promise.reject it
