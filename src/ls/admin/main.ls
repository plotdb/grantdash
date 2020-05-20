(->
  ldc.register \adminGuard, <[auth]>, ({auth}) ->
    auth.ensure!
      .then ->
        [path,type,slug] = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) or []
        hint = {} <<< (if type => (if type == \o => {org: slug} else {brd: slug}) else {})
        ld$.fetch '/d/toc/', {method: \POST}, {json: hint, type: \json}
          .then (toc) ->
            console.log toc
          .catch -> lda.ldcvmgr.lock \create-brd-now
      .catch -> lda.ldcvmgr.toggle \auth-required
  ldc.app \adminGuard
)!
