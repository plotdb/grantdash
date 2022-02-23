(o) <- ldc.register <[blockbase viewLocals auth ldNotify error notify viewmode]>, _
{blockbase, viewLocals, auth, error, notify, viewmode} = o
blockdef = name: '@taiccadash/future-content', version: 'main'
brd = "future-content"
# block view simply use document.body as root if root we provided is null,
# so it's not necessary for our html to have `#root` defined.
root = document.querySelector '#root'
data = {is-embedded: if viewmode == \view => true else false}
blockbase.init {blockdef, brd, root, data}
  .catch ->
    console.log 'failed: ', it
    return Promise.reject it

