(->
  ldc.register <[auth ldcvmgr error loader]>, ({auth, ldcvmgr, error, loader}) ->
    lc = {}
    view = new ldView do
      root: '[ld-scope=password-reset]'
      handler: do
        "not-found": ({node}) -> lc.ldcv = new ldCover root: node
        "email": ->
      action: click: do
        submit: ({node}) ->
          loader.on!
          ld$.fetch '/dash/api/me/passwd/reset', {method: \POST}, {json: {email: view.get(\email).value}}
            .then -> window.location.href = '/dash/auth/reset/sent/'
            .catch (e) ->
              if e.code == 404 => lc.ldcv.toggle!
              else error! e
              loader.off!
    pw-reset-mail = new ldForm do
      names: -> <[email]>
      submit: '.btn[ld=submit]'
      root: view.root
      after-check: (s, f) ->
        if s.email != 1 and !/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(f.email.value) => s.email = 2

)!
