ldc.register <[general auth loader navtop]>, ({general, auth, loader, navtop}) ->
  nexturl = (window.location.search or '')
    .replace(/^\?/,'')
    .split(\&)
    .map -> decodeURIComponent(it).trim!.split(\=)
    .filter -> it.0 == \nexturl
    .map -> it.1
    .0 or \/
  reload = ->
    loader.on!
    window.location.href = nexturl
  auth.init {root: \.authpanel}
  auth.fetch {renew: true} .then -> if it.user.key => reload!
  auth.on \auth.signin, -> reload!
