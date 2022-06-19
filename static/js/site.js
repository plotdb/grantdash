// Generated by LiveScript 1.3.0
(function(){
  ldc.register('general', ['auth', 'navtop', 'error', 'ldcvmgr', 'util'], function(arg$){
    var auth, navtop, error, ldcvmgr, util, p;
    auth = arg$.auth, navtop = arg$.navtop, error = arg$.error, ldcvmgr = arg$.ldcvmgr, util = arg$.util;
    console.log("site general ldc");
    p = typeof i18next != 'undefined' && i18next !== null
      ? i18next.init({
        supportedLng: ['en', 'zh-TW'],
        fallbackLng: 'en',
        fallbackNS: '',
        defaultNS: ''
      }).then(function(){
        return i18next.use(i18nextBrowserLanguageDetector);
      }).then(function(){
        var lng, res, k, ref$, v;
        lng = util.parseQuerystring("lng") || util.cookie('lng') || navigator.language || navigator.userLanguage;
        console.log("[site] use language: ", lng);
        i18next.changeLanguage(lng);
        res = {
          en: {},
          "zh-TW": {}
        };
        for (k in ref$ = res.en) {
          v = ref$[k];
          res["zh-TW"][k] = k;
        }
        for (k in res) {
          v = res[k];
          i18next.addResourceBundle(k, '', v, true, true);
        }
        if (typeof i18nData != 'undefined' && i18nData !== null) {
          for (k in ref$ = i18nData.en) {
            v = ref$[k];
            i18nData["zh-TW"][k] = k;
          }
          for (k in ref$ = i18nData) {
            v = ref$[k];
            i18next.addResourceBundle(k, '', v, true, true);
          }
        }
        if (typeof i18nEngine != 'undefined' && i18nEngine !== null) {
          return i18nEngine.transform(document.body);
        }
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
        action: {
          click: {
            "set-lng": function(arg$){
              var node, lng;
              node = arg$.node;
              lng = node.getAttribute('data-name');
              util.cookie('lng', lng);
              return window.location.reload();
            }
          }
        },
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
            return node.classList.toggle('d-none', !!(g.user || {}).key);
          },
          "t": function(arg$){
            var node;
            node = arg$.node;
            return node.innerText = i18next.t(node.innerText);
          }
        }
      });
      return auth.on('auth.signin', function(){
        return auth.get().then(function(global){
          import$(g, global);
          return view.render(['authed', 'not-authed']);
        });
      });
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
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}