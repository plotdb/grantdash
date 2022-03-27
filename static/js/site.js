// Generated by LiveScript 1.3.0
(function(){
  ldc.register('general', ['auth', 'navtop', 'error', 'ldcvmgr'], function(arg$){
    var auth, navtop, error, ldcvmgr, p;
    auth = arg$.auth, navtop = arg$.navtop, error = arg$.error, ldcvmgr = arg$.ldcvmgr;
    console.log("site general ldc");
    p = typeof i18next != 'undefined' && i18next !== null
      ? i18next.init({
        supportedLng: ['en', 'zh-TW'],
        fallbackLng: 'zh-TW',
        fallbackNS: '',
        defaultNS: ''
      }).then(function(){
        return i18next.use(i18nextBrowserLanguageDetector);
      }).then(function(){
        var res, k, ref$, v, results$ = [];
        console.log("use language: ", navigator.language) || navigator.userLanguage;
        i18next.changeLanguage(navigator.language) || navigator.userLanguage;
        res = {
          "en": {
            "註冊": "Sign Up",
            "登入": "Login",
            "個人頁面": "Project List",
            "帳號設定": "Settings",
            "主控台": "Admin",
            "登出": "Logout",
            "我的案件": "My Projects",
            "案件列表": "Projects",
            "已發布": "Published",
            "編輯中": "Draft",
            "所屬計劃": "Belongs to",
            "建立日期": "Created time",
            "註冊於": "Sign Up Date",
            "設定": "Settings",
            "檢視": "View",
            "編輯": "Edit",
            "個人設定": "Settings",
            "基本資訊": "Basic Info",
            "顯示名稱": "Display Name",
            "此為公開資訊": "will be public",
            "用戶代碼": "User ID",
            "帳號名稱": "Account Name",
            "你的電子郵件地址": "Your email address",
            "未認證": "Unverified",
            "已認證": "Verified",
            "電子郵箱認證": "Email Verification",
            "寄發認證信": "Send verification mail",
            "更新基本資訊": "Update basic info",
            "變更密碼": "Change Password",
            "舊的密碼": "Old password",
            "新密碼": "New password",
            "再輸入一次新密碼": "New password again",
            "忘記密碼嗎？": "Forget password?",
            "寄發重設連結信": "Send password reset mail",
            "更新密碼": "Update password",
            "您目前沒有任何案件": "No project available yet",
            "當您開始提案以後，您可以在這裡瀏覽您所建立過的案件。": "You will see your projects here once you make some",
            "已刪除": "deleted"
          },
          "zh-TW": {}
        };
        for (k in ref$ = res.en) {
          v = ref$[k];
          res["zh-TW"][k] = k;
        }
        for (k in res) {
          v = res[k];
          results$.push(i18next.addResourceBundle(k, '', v, true, true));
        }
        return results$;
      })
      : Promise.resolve();
    p.then(function(){
      return auth.get();
    }).then(function(g){
      var view;
      if (typeof Sentry != 'undefined' && Sentry !== null) {
        Sentry.init({
          dsn: 'https://06428ddbefb64673a2001998db111f42@o446556.ingest.sentry.io/5425251',
          integrations: [new Sentry.Integrations.BrowserTracing()],
          tracesSampleRate: 1.0
        });
        if (g.user) {
          Sentry.setUser({
            id: g.user.key || 0
          });
        }
      }
      view = new ldView({
        global: true,
        root: document.body,
        handler: {
          "brand-org": function(arg$){
            var node;
            node = arg$.node;
            node.innerText = g.scope.orgname || '';
            if (g.scope.brd) {
              node.setAttribute('href', "/brd/" + g.scope.brd);
            }
            return node.setAttribute('href', "/org/" + g.scope.org);
          },
          "brand-brd": function(arg$){
            var node;
            node = arg$.node;
            node.classList.toggle('d-none', !g.scope.brdname);
            node.innerText = "/ " + (g.scope.brdname || '');
            return node.setAttribute('href', "/brd/" + g.scope.brd);
          },
          "authed": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !(g.user || {}).key);
          },
          "not-authed": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', (g.user || {}).key);
          },
          "t": function(arg$){
            var node;
            node = arg$.node;
            return node.innerText = i18next.t(node.innerText);
          }
        }
      });
      return auth.on('auth.signin', view.render(['authed', 'not-authed']));
    });
    if (typeof moment != 'undefined' && moment !== null) {
      moment.tz.add(["Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5"]);
    }
    return ldc.action({
      profile: function(){
        return auth.ensure().then(function(){
          return window.location.href = "/dash/me/";
        })['catch'](function(it){
          if (ldError.id(it) === 1000) {} else {
            return Promise.reject(it);
          }
        })['catch'](error());
      },
      admin: function(){
        var lc;
        lc = {};
        return auth.ensure().then(function(){
          return ld$.fetch('/dash/api/admin/', {
            method: 'GET'
          }, {
            type: 'json'
          });
        }).then(function(ret){
          var ref$, brds, orgs;
          ref$ = [ret.brds || (ret.brds = []), ret.orgs || (ret.orgs = [])], brds = ref$[0], orgs = ref$[1];
          if (brds.length === 1) {
            window.location.href = "/dash/brd/" + brds[0].slug + "/admin";
          }
          lc.list = [].concat(brds.map(function(it){
            return it.type = 'brd', it;
          }), orgs.map(function(it){
            return it.type = 'org', it;
          }));
          if (lc.list.length === 1) {
            window.location.href = "/dash/" + lc.list[0].type + "/" + lc.list[0].slug + "/admin";
          }
          if (!lc.list.length) {
            return ldcvmgr.toggle("no-admin");
          }
          return ldcvmgr.getdom('choose-admin-panel').then(function(dom){
            var view;
            view = new ldView({
              root: dom,
              handler: {
                item: {
                  list: function(){
                    return lc.list;
                  },
                  handler: function(arg$){
                    var node, data;
                    node = arg$.node, data = arg$.data;
                    node.setAttribute('href', "/dash/" + data.type + "/" + data.slug + "/admin");
                    return node.innerHTML = "" + (data.type === 'brd' ? '活動' : '組織') + " / " + data.name;
                  }
                }
              }
            });
            return ldcvmgr.toggle('choose-admin-panel');
          });
        })['catch'](function(it){
          if (ldError.id(it) === 1000) {} else {
            return Promise.reject(it);
          }
        })['catch'](error());
      }
    });
  });
  return ldc.app('general');
})();