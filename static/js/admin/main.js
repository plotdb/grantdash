// Generated by LiveScript 1.3.0
ldc.register('adminGuard', ['ldcvmgr', 'auth', 'loader', 'sdbAdapter', 'error', 'adminMenu', 'adminPanel', 'adminInfo', 'adminStage', 'adminPerm', 'adminNavbar', 'adminPrjList', 'prjForm', 'adminEntry', 'adminWelcome'], function(arg$){
  var ldcvmgr, auth, loader, sdbAdapter, error, adminMenu, adminPanel, adminInfo, adminStage, adminPerm, adminNavbar, adminPrjList, prjForm, adminEntry, adminWelcome, Ctrl, ctrl;
  ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, loader = arg$.loader, sdbAdapter = arg$.sdbAdapter, error = arg$.error, adminMenu = arg$.adminMenu, adminPanel = arg$.adminPanel, adminInfo = arg$.adminInfo, adminStage = arg$.adminStage, adminPerm = arg$.adminPerm, adminNavbar = arg$.adminNavbar, adminPrjList = arg$.adminPrjList, prjForm = arg$.prjForm, adminEntry = arg$.adminEntry, adminWelcome = arg$.adminWelcome;
  Ctrl = function(){
    var this$ = this;
    this.loader = loader;
    this.hubs = null;
    this.ctrl = {
      org: {},
      brd: {},
      grp: {}
    };
    this.modify = {
      org: {},
      brd: {}
    };
    this.view = new ldView({
      global: true,
      initRender: false,
      root: '[ld-scope=admin]',
      action: {
        click: {
          "publish-modification": function(){
            return this$.publish();
          }
        }
      },
      handler: {
        "init-loader": function(arg$){
          var node;
          node = arg$.node;
          node.classList.add('ld', 'ld-fade-out', 'xp35');
          return setTimeout(function(){
            return node.classList.add('d-none');
          }, 350);
        },
        "brd-menu": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !this$.toc.brd.key);
        },
        "modified-warning": function(arg$){
          var node, mod;
          node = arg$.node;
          mod = ['brd', 'org'].map(function(it){
            return this$.modify[it].dirty = this$.toc[it].key && this$.hubs[it].doc && this$.hubs[it].doc.data && JSON.stringify(this$.hubs[it].doc.data || {}) !== (this$.modify[it].data || "{}");
          });
          return node.classList.toggle('d-none', !(mod[0] || mod[1]));
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    render: function(){
      return this.view.render();
    },
    fetch: function(){
      var ref$, path, type, slug, hint, this$ = this;
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
      console.log("fetch auth data ...");
      return auth.fetch()['catch'](function(e){
        return Promise.reject(new ldError({
          id: 1007,
          e: e
        }));
      }).then(function(g){
        if (!g.user.key) {
          return Promise.reject(new ldError({
            id: 1000
          }));
        }
        console.log("fetch toc information ... ");
        return ld$.fetch('/d/toc/', {
          method: 'POST'
        }, {
          json: hint,
          type: 'json'
        });
      }).then(function(toc){
        ['org', 'brd', 'brds', 'brdsFiltered', 'grps'].map(function(it){
          return toc[it] = toc[it] || [];
        });
        toc.brdsFiltered = toc.brds || [];
        this$.toc = toc;
        this$.modify.org.data = JSON.stringify(this$.toc.org.detail || {});
        this$.modify.brd.data = JSON.stringify(this$.toc.brd.detail || {});
        return console.log("toc information: ", toc);
      })['catch'](function(e){
        return Promise.reject(ldError.id(e)
          ? e
          : new ldError({
            id: 1012,
            e: e
          }));
      });
    },
    sharedb: function(){
      var sdb, this$ = this;
      console.log("prepare sharedb ...");
      this.sdb = sdb = new sharedbWrapper({
        url: {
          scheme: window.location.protocol.replace(':', ''),
          domain: window.location.host
        }
      });
      this.hubs = {
        org: new Hub({
          sdb: sdb
        }),
        brd: new Hub({
          sdb: sdb
        })
      };
      return sdb.on('close', function(){
        this$.loader.on();
        return sdb.reconnect().then(function(){
          return this$.getdoc();
        }).then(function(){
          return this$.loader.off();
        });
      });
    },
    getdoc: function(){
      var this$ = this;
      return Promise.resolve().then(function(){
        var ps;
        ps = ['org', 'brd'].map(function(n){
          if (!this$.toc[n].key) {
            return;
          }
          console.log("prepare " + n + " document ...");
          return this$.sdb.get({
            id: n + "/" + this$.toc[n].slug,
            watch: function(ops, source){
              return this$.hubs[n].fire('change', {
                ops: ops,
                source: source
              });
            },
            create: function(){
              return this$.toc[n].detail;
            }
          }).then(function(doc){
            if (!(this$.hubs[n].doc = doc)) {
              return;
            }
            return doc.on('op', function(){
              return this$.render();
            });
          });
        });
        return Promise.all(ps);
      }).then(function(){
        return this$.render();
      });
    },
    setGroup: function(v){
      var idx, k, this$ = this;
      idx = 0;
      this.hubs.brd.doc.data.group.map(function(d, i){
        if (d.key === v.key) {
          return idx = i;
        }
      });
      return (function(){
        var results$ = [];
        for (k in this.ctrl.grp) {
          results$.push(k);
        }
        return results$;
      }.call(this)).map(function(k){
        var p;
        if (!this$.ctrl.grp[k].adapt) {
          return;
        }
        p = ['group', idx, k];
        if (!this$.ctrl.grp[k].adapted()) {
          return this$.ctrl.grp[k].adapt({
            hub: this$.hubs.brd,
            path: p
          });
        } else {
          return this$.ctrl.grp[k].setPath(p);
        }
      });
    },
    initCtrl: function(){
      var ref$, org, brd, setGroup, toc, x$, y$, z$, this$ = this;
      ref$ = this.hubs, org = ref$.org, brd = ref$.brd;
      setGroup = function(it){
        return this$.setGroup(it);
      };
      toc = this.toc;
      this.ctrl.welcome = new adminWelcome({
        root: '[ld-scope=admin-welcome]',
        toc: toc
      });
      x$ = this.ctrl.org;
      x$.info = new adminInfo({
        root: '[ld-scope=org-info]',
        type: 'org',
        data: toc.org
      });
      x$.info.adapt({
        hub: org,
        path: ['info']
      });
      x$.navbar = new adminNavbar({
        toc: toc,
        root: '[data-name=org-navbar] [ld-scope=navbar-editor]'
      });
      x$.navbar.adapt({
        hub: org,
        path: ['page', 'navbar']
      });
      x$.perm = new adminPerm({
        toc: toc,
        root: '[data-nav=org-config] [ld-scope=perm-panel]'
      });
      x$.perm.adapt({
        hub: org,
        path: ['perm']
      });
      y$ = this.ctrl.brd;
      y$.info = new adminInfo({
        root: '[ld-scope=brd-info]',
        type: 'brd',
        data: toc.brd
      });
      y$.info.adapt({
        hub: brd,
        path: ['info']
      });
      y$.group = new adminMenu({
        toc: this.toc,
        setGroup: setGroup
      });
      y$.group.adapt({
        hub: brd,
        path: ['group'],
        type: 'array'
      });
      y$.stage = new adminStage({
        toc: toc,
        root: '[ld-scope=brd-stage]'
      });
      y$.stage.adapt({
        hub: brd,
        path: ['stage']
      });
      y$.perm = new adminPerm({
        toc: toc,
        root: '[data-nav=brd-config] [ld-scope=perm-panel]'
      });
      y$.perm.adapt({
        hub: brd,
        path: ['perm']
      });
      y$.navbar = new adminNavbar({
        toc: toc,
        root: '[data-name=brd-navbar] [ld-scope=navbar-editor]'
      });
      y$.navbar.adapt({
        hub: brd,
        path: ['page', 'navbar']
      });
      z$ = this.ctrl.grp;
      z$.form = new prjForm({
        toc: toc,
        root: '[ld-scope=grp-form]',
        viewMode: false
      });
      z$.info = new adminInfo({
        root: '[ld-scope=grp-info-panel]',
        type: 'grp',
        setGroup: setGroup
      });
      z$.perm = new adminPerm({
        toc: toc,
        root: '[data-nav=grp-config] [ld-scope=perm-panel]'
      });
      z$.grade = new adminEntry({
        root: '[ld-scope=grade-panel]'
      });
      z$.criteria = new adminEntry({
        root: '[ld-scope=criteria-panel]'
      });
      z$.list = new adminPrjList({
        root: '[ld-scope=prj-list]'
      });
      return z$;
    },
    publish: function(){
      var this$ = this;
      ldcvmgr.toggle('publishing', true);
      return Promise.resolve().then(function(){
        var ps;
        ps = ['brd', 'org'].map(function(type){
          var payload;
          if (!(this$.toc[type].key && this$.modify[type].dirty)) {
            return Promise.resolve();
          }
          payload = this$.hubs[type].doc.data;
          return ld$.fetch('/d/detail/', {
            method: 'PUT'
          }, {
            json: {
              payload: payload,
              slug: this$.toc[type].slug,
              type: type
            },
            type: 'json'
          }).then(function(){
            var ref$;
            this$.toc[type].detail = payload;
            return ref$ = this$.modify[type], ref$.data = JSON.stringify(payload), ref$.dirty = false, ref$;
          });
        });
        return Promise.all(ps);
      }).then(function(){
        return this$.render();
      }).then(function(){
        ldcvmgr.toggle('publishing', false);
        ldcvmgr.toggle('published', true);
        return debounce(2000);
      }).then(function(){
        return ldcvmgr.toggle('published', false);
      })['finally'](function(){
        return ldcvmgr.toggle('publishing', false);
      })['catch'](error());
    }
  });
  ctrl = new Ctrl();
  return ctrl.fetch().then(function(){
    return ctrl.sharedb();
  }).then(function(){
    return ctrl.getdoc();
  }).then(function(){
    return ctrl.initCtrl();
  }).then(function(){
    return console.log("admin initialized.");
  })['finally'](function(){
    return loader.off();
  })['catch'](function(e){
    var that;
    console.log("[Admin Error] Code: ", e.id);
    console.log("Error Object: ", e.e || e);
    if (that = e.stack) {
      console.log(that);
    }
    if (e.id === 1012) {
      return ldcvmgr.toggle('error-403');
    } else if (e.id === 1000) {
      return ldcvmgr.toggle('auth-required');
    } else if (e.id === 1007) {
      return ldcvmgr.toggle('server-down');
    } else {
      return error()(e);
    }
  }).then(function(){
    return ctrl.render();
  });
});
ldc.app('adminGuard');
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}