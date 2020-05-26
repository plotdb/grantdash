// Generated by LiveScript 1.3.0
ldc.register('adminGuard', ['ldcvmgr', 'auth', 'loader', 'sdbAdapter', 'error', 'adminMenu', 'adminPanel', 'adminInfo', 'adminStage', 'adminPerm', 'adminNavbar', 'prjForm', 'adminEntry'], function(arg$){
  var ldcvmgr, auth, loader, sdbAdapter, error, adminMenu, adminPanel, adminInfo, adminStage, adminPerm, adminNavbar, prjForm, adminEntry, init, prepareSharedb;
  ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, loader = arg$.loader, sdbAdapter = arg$.sdbAdapter, error = arg$.error, adminMenu = arg$.adminMenu, adminPanel = arg$.adminPanel, adminInfo = arg$.adminInfo, adminStage = arg$.adminStage, adminPerm = arg$.adminPerm, adminNavbar = arg$.adminNavbar, prjForm = arg$.prjForm, adminEntry = arg$.adminEntry;
  loader.on();
  console.log("fetch auth data ...");
  auth.fetch().then(function(g){
    var ref$, path, type, slug, hint;
    ref$ = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) || [], path = ref$[0], type = ref$[1], slug = ref$[2];
    hint = import$({}, type
      ? type === 'o'
        ? {
          org: slug
        }
        : {
          brd: slug
        }
      : {});
    console.log("fetch sidemenu information ... ");
    return ld$.fetch('/d/toc/', {
      method: 'POST'
    }, {
      json: hint,
      type: 'json'
    }).then(function(toc){
      console.log("initialization ...");
      return init(toc)['catch'](function(e){
        console.log("admin init error", e);
        return lda.ldcvmgr.toggle('error');
      });
    })['catch'](function(){
      return lda.ldcvmgr.lock('create-brd-now');
    });
  })['catch'](function(){
    return lda.ldcvmgr.toggle('auth-required');
  }).then(function(){
    return loader.off();
  });
  init = function(toc){
    var hubs, grp, setGroup;
    toc.doc = {};
    ['org', 'brd', 'brds', 'brdsFiltered', 'grps'].map(function(it){
      return toc[it] = toc[it] || [];
    });
    toc.brdsFiltered = toc.brds || [];
    console.log("sidemenu information: ", toc);
    hubs = {};
    grp = {};
    setGroup = function(v){
      var k;
      return (function(){
        var results$ = [];
        for (k in grp) {
          results$.push(k);
        }
        return results$;
      }()).map(function(k){
        var p;
        p = ['group', v.key, k];
        if (!grp[k].adapted()) {
          return grp[k].adapt({
            hub: hubs.brd,
            path: p
          });
        } else {
          return grp[k].setPath(p);
        }
      });
    };
    return prepareSharedb(toc).then(function(arg$){
      var org, brd, menu, info, stage, perm, navbar;
      org = arg$.org, brd = arg$.brd;
      hubs.org = org;
      hubs.brd = brd;
      menu = new adminMenu({
        toc: toc,
        setGroup: setGroup
      });
      menu.adapt({
        hub: brd,
        path: ['group']
      });
      info = new adminInfo({
        root: '[ld-scope=brd-info]',
        type: 'brd'
      });
      info.adapt({
        hub: brd,
        path: ['info']
      });
      stage = new adminStage({
        toc: toc,
        root: '[ld-scope=brd-stage]'
      });
      stage.adapt({
        hub: brd,
        path: ['stage']
      });
      perm = new adminPerm({
        toc: toc,
        root: '[ld-scope=brd-perm]'
      });
      perm.adapt({
        hub: brd,
        path: ['perm']
      });
      navbar = new adminNavbar({
        toc: toc,
        root: '[ld-scope=navbar-editor]'
      });
      navbar.adapt({
        hub: brd,
        path: ['page', 'navbar']
      });
      grp.form = new prjForm({
        toc: toc,
        root: '[ld-scope=prj-form]',
        viewMode: false
      });
      grp.info = new adminInfo({
        root: '[ld-scope=grp-info-panel]',
        type: 'grp',
        setGroup: setGroup
      });
      grp.grade = new adminEntry({
        root: '[ld-scope=grade-panel]'
      });
      return grp.criteria = new adminEntry({
        root: '[ld-scope=criteria-panel]'
      });
    });
  };
  return prepareSharedb = function(toc){
    var sdb, updateView, initData, publish, view, hubs, prepare;
    console.log("prepare sharedb ...");
    sdb = sdb = new sharedbWrapper({
      url: {
        scheme: window.location.protocol.replace(':', ''),
        domain: window.location.host
      }
    });
    sdb.on('close', function(){
      loader.on();
      return sdb.reconnect().then(function(){
        return prepare();
      }).then(function(){
        return loader.off();
      });
    });
    updateView = debounce(500, function(){
      return view.render();
    });
    initData = {};
    publish = function(){
      var payload;
      payload = hubs.brd.doc.data;
      ldcvmgr.toggle("publishing", true);
      return ld$.fetch("/d/b/" + toc.brd.key + "/detail", {
        method: 'PUT'
      }, {
        json: {
          payload: payload
        },
        type: 'json'
      }).then(function(){
        toc.brd.detail = payload;
        initData.brd = JSON.stringify(payload);
        return updateView();
      })['catch'](error()).then(function(){
        ldcvmgr.toggle("publishing", false);
        ldcvmgr.toggle("published", true);
        return debounce(2000);
      }).then(function(){
        return ldcvmgr.toggle("published", false);
      });
    };
    view = new ldView({
      initRender: false,
      root: '[ld-scope=admin]',
      action: {
        click: {
          "publish-modification": function(){
            return publish();
          }
        }
      },
      handler: {
        "modified-warning": function(arg$){
          var node, modified;
          node = arg$.node;
          if (!hubs.brd.doc) {
            return;
          }
          modified = JSON.stringify(hubs.brd.doc.data) !== initData.brd;
          return node.classList.toggle('d-none', !modified);
        }
      }
    });
    hubs = {
      org: new Hub({
        sdb: sdb
      }),
      brd: new Hub({
        sdb: sdb
      })
    };
    prepare = function(){
      console.log("preparing sharedb document (org) ... ");
      return sdb.get({
        id: "org-" + toc.org.key,
        watch: function(ops, source){
          return hub.org.fire('change', {
            ops: ops,
            source: source
          });
        }
      }).then(function(doc){
        return hubs.org.doc = doc;
      }).then(function(){
        return console.log("preparing sharedb document (brd) ... ");
      }).then(function(){
        return sdb.get({
          id: "brd-" + toc.brd.key,
          watch: function(ops, source){
            return hubs.brd.fire('change', {
              ops: ops,
              source: source
            });
          }
        });
      }).then(function(doc){
        return hubs.brd.doc = doc;
      }).then(function(){
        initData.org = JSON.stringify(hubs.org.doc.data);
        initData.brd = JSON.stringify(toc.brd.detail || "");
        hubs.org.doc.on('op', function(){
          return updateView();
        });
        hubs.brd.doc.on('op', function(){
          return updateView();
        });
        view.render();
        return hubs;
      })['catch'](function(){
        return lda.ldcvmgr.toggle('error');
      });
    };
    return prepare();
  };
});
ldc.app('adminGuard');
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}