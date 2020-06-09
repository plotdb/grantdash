// Generated by LiveScript 1.3.0
(function(){
  return ldc.register(['auth', 'ldcvmgr'], function(arg$){
    var auth, ldcvmgr, pwReset;
    auth = arg$.auth, ldcvmgr = arg$.ldcvmgr;
    if (document.querySelector('#password-reset')) {
      pwReset = new ldForm({
        names: function(){
          return ['password', 'confirm'];
        },
        root: '#password-reset',
        submit: 'input[type=submit]',
        afterCheck: function(s, f){
          var ref$, p1, p2;
          ref$ = [this.fields.password.value, this.fields.confirm.value], p1 = ref$[0], p2 = ref$[1];
          if (s.password !== 1 && p1.length < 8) {
            s.password = 2;
            s.confirm = 1;
          }
          if (p1 !== p2 && (s.confirm !== 1 || p2 && s.password === 0)) {
            return s.confirm = 2;
          }
        }
      });
      return auth.get().then(function(global){
        var token;
        pwReset.fields._csrf.value = global.csrfToken;
        token = (/^\?token=(.+)$/.exec(window.location.search) || [])[1];
        if (!token) {
          token = (document.cookie || '').split(';').filter(function(it){
            return /password-reset-token/.exec(it);
          })[0];
          token = (token || '').split('=')[1];
          if (!token) {
            return lda.ldcvmgr.toggle('reset-password-invalid');
          }
          document.cookie = "password-reset-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        return pwReset.root.setAttribute('action', "/dash/api/me/passwd/reset/" + token);
      });
    }
  });
})();