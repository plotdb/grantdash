// Generated by LiveScript 1.3.0
ldc.register('judgeCriteriaUser', ['error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var error, loader, auth, ldcvmgr, sdbAdapter, clsmap, clsset, Ctrl;
  error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  clsmap = [['i-check', 'text-success'], ['i-circle', 'text-secondary'], ['i-close', 'text-danger']];
  clsset = function(node, val){
    var newcls, oldcls;
    newcls = clsmap[val];
    oldcls = Array.from(node.classList);
    if (oldcls.length) {
      node.classList.remove.apply(node.classList, oldcls);
    }
    return node.classList.add.apply(node.classList, newcls);
  };
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
    this.progress = {};
    this.user = opt.user;
    this.forAll = !opt.user;
    this.criteria = [
      {
        name: "開源",
        key: 1
      }, {
        name: "協作",
        key: 2
      }, {
        name: "參與",
        key: 3
      }
    ];
    this._update = debounce(function(){
      if (this$.user) {
        return this$.opsOut(function(){
          return this$.data;
        });
      }
    });
    this.ldcv = {
      comment: new ldCover({
        root: ld$.find(root, '[ld=comment-ldcv]', 0)
      }),
      detail: new ldCover({
        root: ld$.find(root, '[ld=detail-ldcv]', 0)
      }),
      criteria: new ldCover({
        root: ld$.find(root, '[ld=criteria-ldcv]', 0)
      })
    };
    this.view = view = new ldView({
      root: root,
      action: {
        input: {
          comment: function(arg$){
            var node, ref$, key$;
            node = arg$.node;
            if (!this$.active) {
              return;
            }
            ((ref$ = this$.data)[key$ = this$.active.slug] || (ref$[key$] = {})).comment = node.value;
            return this$.update({
              debounced: true
            });
          }
        },
        click: {
          detail: function(arg$){
            var node;
            node = arg$.node;
            return this$.ldcv.detail.toggle();
          },
          criteria: function(arg$){
            var node;
            node = arg$.node;
            return this$.ldcv.criteria.toggle();
          }
        }
      },
      text: {
        "count-total": function(arg$){
          var node;
          node = arg$.node;
          return this$.prjs.length || 0;
        },
        "count-accept": function(arg$){
          var node;
          node = arg$.node;
          return this$.progress[0] || 0;
        },
        "count-reject": function(arg$){
          var node;
          node = arg$.node;
          return this$.progress[2] || 0;
        },
        "count-todo": function(arg$){
          var node;
          node = arg$.node;
          return this$.progress[1] || 0;
        },
        reviewer: function(arg$){
          var node;
          node = arg$.node;
          if (this$.user) {
            return this$.user.displayname;
          }
        }
      },
      handler: {
        "for-one": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', this$.forAll);
        },
        "for-all": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !this$.forAll);
        },
        "comment-name": function(arg$){
          var node;
          node = arg$.node;
          if (this$.active) {
            return node.innerText = this$.active.name || '';
          }
        },
        "progress-accept": function(arg$){
          var node;
          node = arg$.node;
          return node.style.width = 100 * (this$.progress[0] || 0) / (this$.prjs.length || 1) + "%";
        },
        "progress-reject": function(arg$){
          var node;
          node = arg$.node;
          return node.style.width = 100 * (this$.progress[2] || 0) / (this$.prjs.length || 1) + "%";
        },
        progress: function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = Math.round(100 * ((this$.progress[0] || 0) + (this$.progress[2] || 0)) / (this$.prjs.length || 1));
        },
        "header-criteria": {
          list: function(){
            if (this$.forAll) {
              return [];
            } else {
              return this$.criteria;
            }
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            return node.innerText = data.name;
          }
        },
        project: {
          list: function(){
            return this$.prjs;
          },
          init: function(arg$){
            var node, local, data, root;
            node = arg$.node, local = arg$.local, data = arg$.data;
            root = node;
            node.classList.remove('d-none');
            return local.view = new ldView({
              initRender: false,
              root: node,
              context: data,
              action: {
                click: {
                  detail: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return this$.ldcv.detail.toggle();
                  },
                  comment: function(arg$){
                    var node, context, ref$, key$;
                    node = arg$.node, context = arg$.context;
                    this$.active = context;
                    view.get('comment').value = ((ref$ = this$.data)[key$ = this$.active.slug] || (ref$[key$] = {})).comment || '';
                    this$.ldcv.comment.toggle();
                    return this$.view.render('comment-name');
                  },
                  name: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    view.get("iframe").setAttribute('src', "/prj/" + context.slug + "?simple");
                    view.get("iframe-placeholder").classList.add('d-none');
                    if (this.activeNode) {
                      this.activeNode.classList.remove('active');
                    }
                    this.activeNode = root;
                    return this.activeNode.classList.add('active');
                  }
                }
              },
              text: {
                "count-accept": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return (context.reviewCount ? context.reviewCount[0] : 0) || 0;
                },
                "count-todo": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return (context.reviewCount ? context.reviewCount[1] : 0) || 0;
                },
                "count-reject": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return (context.reviewCount ? context.reviewCount[2] : 0) || 0;
                }
              },
              handler: {
                "for-all": function(arg$){
                  var node;
                  node = arg$.node;
                  return node.classList.toggle('d-none', !this$.forAll);
                },
                "for-one": function(arg$){
                  var node;
                  node = arg$.node;
                  return node.classList.toggle('d-none', this$.forAll);
                },
                "has-comment": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.classList.toggle('invisible', !this$.data[context.slug].comment);
                },
                state: function(arg$){
                  var node, context, val;
                  node = arg$.node, context = arg$.context;
                  val = this$.criteria.reduce(function(a, b){
                    var v, ref$, ref1$, key$;
                    v = ((ref$ = (ref1$ = this$.data)[key$ = context.slug] || (ref1$[key$] = {})).value || (ref$.value = {}))[b.key];
                    return Math.max(a, v != null ? v : 1);
                  }, 0);
                  return clsset(node, val);
                },
                name: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.name;
                },
                key: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.key;
                },
                criteria: {
                  list: function(arg$){
                    var context;
                    context = arg$.context;
                    if (this$.forAll) {
                      return [];
                    } else {
                      return this$.criteria;
                    }
                  },
                  init: function(arg$){
                    var node, local;
                    node = arg$.node, local = arg$.local;
                    return local.icon = ld$.find(node, 'i', 0);
                  },
                  action: {
                    click: function(arg$){
                      var node, data, context, v, ref$, ref1$, key$;
                      node = arg$.node, data = arg$.data, context = arg$.context;
                      v = ((ref$ = (ref1$ = this$.data)[key$ = context.slug] || (ref1$[key$] = {})).value || (ref$.value = {}))[data.key];
                      v = v != null ? v : 1;
                      v = (v + 2) % 3;
                      this$.data[context.slug].value[data.key] = v;
                      this$.update();
                      return local.view.render();
                    }
                  },
                  handler: function(arg$){
                    var local, data, context, v, ref$, ref1$, key$;
                    local = arg$.local, data = arg$.data, context = arg$.context;
                    v = ((ref$ = (ref1$ = this$.data)[key$ = context.slug] || (ref1$[key$] = {})).value || (ref$.value = {}))[data.key];
                    v = v != null ? v : 1;
                    return clsset(local.icon, v);
                  }
                }
              }
            });
          },
          handler: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            data.reviewCount = this$.getCount(data.slug);
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
      this.getProgress();
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
    fetch: function(){
      var this$ = this;
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
      this.hub.doc = null;
      return this.sdb.get({
        id: "brd/" + this.brd + "/grp/" + this.grp + "/judge/criteria",
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
    }
    /*
    get-detail: (prj-slug) ->
      review = []
      for k of @data.user =>
        val = @data.user[k][prj-slug].value
        c = @data.user[k][prj-slug].comment
        if c => {user: k, comment: c}
        for c in @criteria => count[val[c.key] or 1]++
    */,
    getCount: function(prjSlug){
      var count, k, val, i$, ref$, len$, c;
      count = [0, 0, 0];
      for (k in this.data.user) {
        val = this.data.user[k][prjSlug].value;
        for (i$ = 0, len$ = (ref$ = this.criteria).length; i$ < len$; ++i$) {
          c = ref$[i$];
          count[val[c.key] || 1]++;
        }
      }
      return count;
    },
    getState: function(){
      var val, this$ = this;
      return val = this.criteria.reduce(function(a, b){
        var v, ref$, ref1$, key$;
        v = ((ref$ = (ref1$ = this$.data)[key$ = context.slug] || (ref1$[key$] = {})).value || (ref$.value = {}))[b.key];
        return Math.max(a, v != null ? v : 1);
      }, 0);
    },
    getProgress: function(){
      var val, this$ = this;
      val = {
        0: 0,
        1: 0,
        2: 0
      };
      this.prjs.map(function(p){
        var v;
        v = this$.criteria.reduce(function(a, b){
          var v, ref$, ref1$, key$;
          v = ((ref$ = (ref1$ = this$.data)[key$ = p.slug] || (ref1$[key$] = {})).value || (ref$.value = {}))[b.key];
          return Math.max(a, v != null ? v : 1);
        }, 0);
        return val[v]++;
      });
      return this.progress = val;
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
      root: document.body,
      brd: 'sch001',
      grp: '4rFUP+03IS05ZD09ku03KMlsh'
    });
    return Promise.resolve().then(function(){
      return ctrl.sharedb();
    }).then(function(){
      return ctrl.getdoc();
    }).then(function(){
      return ctrl.fetch();
    });
  });
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}