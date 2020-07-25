// Generated by LiveScript 1.3.0
(function(){
  ldc.register('general', ['auth', 'navtop', 'error', 'ldcvmgr'], function(arg$){
    var auth, navtop, error, ldcvmgr;
    auth = arg$.auth, navtop = arg$.navtop, error = arg$.error, ldcvmgr = arg$.ldcvmgr;
    console.log("site general ldc");
    smoothScroll();
    auth.get().then(function(g){
      var view;
      return view = new ldView({
        global: true,
        root: document.body,
        handler: {
          "brand-org": function(arg$){
            var node;
            node = arg$.node;
            node.innerText = g.scope.orgname || '';
            if (g.scope.brd) {
              return node.setAttribute('href', "/brd/" + g.scope.brd);
            }
          },
          "brand-brd": function(arg$){
            var node;
            node = arg$.node;
            node.classList.toggle('d-none', !g.scope.brdname);
            node.innerText = "/ " + (g.scope.brdname || '');
            return node.setAttribute('href', "/brd/" + g.scope.brd);
          }
        }
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