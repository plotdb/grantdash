// Generated by LiveScript 1.3.0
ldc.register('judgePreliminaryUser', ['error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var error, loader, auth, ldcvmgr, sdbAdapter, Ctrl;
  error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var root, view, this$ = this;
    this.loader = loader;
    this.brd = opt.brd;
    this.grp = opt.grp;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.prjs = [];
    this.data = {};
    this.progress = this.getProgress();
    this._update = debounce(function(){
      if (this$.user) {
        return this$.opsOut(function(){
          return this$.data;
        });
      }
    });
    this.view = view = new ldView({
      root: root,
      handler: {
        progress: function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = Math.round(100 * this$.progress.done / this$.progress.total);
        },
        "progress-accept": function(arg$){
          var node;
          node = arg$.node;
          return node.style.width = 100 * this$.progress.accept / this$.progress.total + "%";
        },
        "progress-pending": function(arg$){
          var node;
          node = arg$.node;
          return node.style.width = 100 * this$.progress.pending / this$.progress.total + "%";
        },
        "progress-reject": function(arg$){
          var node;
          node = arg$.node;
          return node.style.width = 100 * this$.progress.reject / this$.progress.total + "%";
        },
        prj: {
          list: function(){
            return this$.prjs;
          },
          init: function(arg$){
            var node, data, local;
            node = arg$.node, data = arg$.data, local = arg$.local;
            return local.view = new ldView({
              context: data,
              root: node,
              action: {
                click: {
                  option: function(arg$){
                    var node, context, name, ref$, key$;
                    node = arg$.node, context = arg$.context;
                    name = node.getAttribute('data-name');
                    ((ref$ = this$.data)[key$ = context.slug] || (ref$[key$] = {})).value = name;
                    this$.render();
                    return this$.update();
                  },
                  comment: function(){}
                }
              },
              text: {
                name: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return context.name;
                },
                ownername: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return context.ownername;
                }
              },
              handler: {
                option: function(arg$){
                  var node, local, context, name, cls, act, ref$, key$;
                  node = arg$.node, local = arg$.local, context = arg$.context;
                  name = node.getAttribute('data-name');
                  cls = {
                    accept: "bg-success",
                    pending: "bg-warning",
                    reject: "bg-danger"
                  }[name];
                  act = ((ref$ = this$.data)[key$ = context.slug] || (ref$[key$] = {})).value === name ? 'add' : 'remove';
                  return node.classList[act].apply(node.classList, [cls, 'text-white']);
                }
              }
            });
          },
          handler: function(arg$){
            var node, data, local;
            node = arg$.node, data = arg$.data, local = arg$.local;
            local.view.setContext(data);
            return local.view.render();
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    render: function(){
      this.progress = this.getProgress();
      return this.view.render();
    },
    update: function(opt){
      opt == null && (opt = {});
      if (!opt.debounced) {
        return this._update().now();
      } else {
        return this._update();
      }
    },
    getProgress: function(){
      var ret, k, ref$, v;
      ret = {
        done: 0,
        accept: 0,
        pending: 0,
        reject: 0,
        total: this.prjs.length || 1
      };
      for (k in ref$ = this.data) {
        v = ref$[k];
        if (v.value) {
          ret[v.value]++;
        }
      }
      ret.done = ret.accept + ret.pending + ret.reject || 0;
      console.log(JSON.stringify(ret));
      return ret;
    },
    fetch: function(){
      var this$ = this;
      console.log("get project list ... ");
      return ld$.fetch('/dash/api/brd/sch001/list', {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(it){
        this$.prjs = it;
        return this$.render();
      });
    },
    sharedb: function(){
      var sdb, this$ = this;
      console.log("prepare sharedb ...");
      this.sdb = sdb = new sharedbWrapper({
        url: {
          scheme: window.location.protocol.replace(':', ''),
          domain: window.location.host
        },
        path: '/dash/ws'
      });
      this.hub = new Hub({
        sdb: sdb
      });
      sdb.on('error', function(){
        return ldcvmgr.toggle('not-sync');
      });
      sdb.on('close', function(){
        ldcvmgr.toggle('offline-retry', true);
        return sdb.reconnect().then(function(){
          return this$.getdoc();
        }).then(function(){
          return this$.adapt();
        }).then(function(){
          return console.log("admin initialized.");
        }).then(function(){
          return ldcvmgr.toggle('offline-retry', false);
        });
      });
      return sdb.ready();
    },
    getdoc: function(){
      var this$ = this;
      console.log("get judge document ... ");
      this.hub.doc = null;
      return this.sdb.get({
        id: "brd/" + this.brd + "/grp/" + this.grp + "/judge/preliminary",
        watch: function(ops, source){
          return this$.hub.fire('change', {
            ops: ops,
            source: source
          });
        },
        create: function(){
          return {};
        }
      }).then(function(doc){
        this$.hub.doc = doc;
        doc.on('op', function(){
          return this$.render();
        });
        if (this$.user) {
          return this$.adapt({
            hub: this$.hub,
            path: ['user', this$.user.key]
          });
        } else {
          return this$.adapt({
            hub: this$.hub,
            path: []
          });
        }
      })['catch'](function(it){
        return console.log("getdoc failed.", it);
      });
    },
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.data = JSON.parse(JSON.stringify(data));
      return this.render();
    }
  });
  return auth.get().then(function(g){
    var ctrl;
    ctrl = new Ctrl({
      user: g.user,
      root: document.body,
      brd: 'sch001',
      grp: '4rFUP+03IS05ZD09ku03KMlsh'
    });
    return Promise.resolve().then(function(){
      return ctrl.fetch();
    }).then(function(){
      return ctrl.sharedb();
    }).then(function(){
      return ctrl.getdoc();
    }).then(function(){
      return console.log("initied.");
    });
  });
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}