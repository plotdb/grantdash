({loader, notify, ldcvmgr, auth, sdbAdapter}) <- ldc.register(
\adminWelcome, <[loader notify ldcvmgr auth sdbAdapter]>, _)
Ctrl = (opt) ->
  @toc = toc = opt.toc
  @view = new ldView do
    root: opt.root
    handler: do
      "org-info": ({node}) -> node.classList.toggle \d-none, !(toc.org and toc.org.key)
      "brd-info": ({node}) -> node.classList.toggle \d-none, !(toc.brd and toc.brd.key)
