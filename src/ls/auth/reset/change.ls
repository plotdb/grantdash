(->
  ldc.register <[auth ldcvmgr]>, ({auth, ldcvmgr}) ->
    if document.querySelector(\#password-reset) =>
      pw-reset = new ldForm do
        names: -> <[password confirm]>
        root: \#password-reset
        submit: 'input[type=submit]'
        after-check: (s, f) ->
          [p1,p2] = [@fields.password.value, @fields.confirm.value]
          if s.password != 1 and p1.length < 8 => s <<< password: 2, confirm: 1
          if p1 != p2 and (s.confirm != 1 or p2 and s.password == 0) => s.confirm = 2
      auth.get!
        .then (global) ->
          pw-reset.fields._csrf.value = global.csrfToken
          auth.recaptcha.get!
        .then (recaptcha) ->
          pw-reset.fields.recaptcha.value = recaptcha
          token = (/^\?token=(.+)$/.exec(window.location.search) || [])[1];
          if !token =>
            token = (document.cookie or '').split(\;).filter(->/password-reset-token/.exec(it)).0
            token = (token or '').split('=').1
            if !token => return lda.ldcvmgr.toggle('reset-password-invalid')
            document.cookie = "password-reset-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          pw-reset.root.setAttribute \action, "/dash/api/me/passwd/reset/#{token}"

)!
