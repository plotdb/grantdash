// Generated by LiveScript 1.3.0
ldc.register('judgePrimaryAll', ['notify', 'judgeBase', 'error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var notify, judgeBase, error, loader, auth, ldcvmgr, sdbAdapter, clsmap, clsset, Ctrl, ctrl;
  notify = arg$.notify, judgeBase = arg$.judgeBase, error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
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
    var obj, view, this$ = this;
    import$(this, obj = new judgeBase(opt));
    this.data = {
      prj: {}
    };
    this.active = null;
    this.ldcv = {
      comment: new ldCover({
        root: ld$.find(this.root, '[ld=comment-ldcv]', 0)
      }),
      detail: new ldCover({
        root: ld$.find(this.root, '[ld=detail-ldcv]', 0)
      }),
      criteria: new ldCover({
        root: ld$.find(this.root, '[ld=criteria-ldcv]', 0)
      })
    };
    this.view.local = view = new ldView({
      initRender: false,
      root: this.root,
      action: {
        input: {
          comment: function(arg$){
            var node, ref$, key$;
            node = arg$.node;
            if (!this$.active) {
              return;
            }
            ((ref$ = this$.data.prj)[key$ = this$.active.slug] || (ref$[key$] = {})).comment = node.value;
            this$.update({
              debounced: 300
            });
            return this$.view.local.render({
              name: 'project',
              key: this$.active.slug
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
          },
          sort: function(arg$){
            var node;
            node = arg$.node;
            return this$.sort(node.getAttribute('data-name'), node.getAttribute('data-value'));
          }
        }
      },
      text: {
        count: function(arg$){
          var node;
          node = arg$.node;
          return this$.progress[node.getAttribute('data-name')] || 0;
        }
      },
      handler: {
        "comment-name": function(arg$){
          var node;
          node = arg$.node;
          if (this$.active) {
            return node.innerText = this$.active.name || '';
          }
        },
        progress: function(arg$){
          var node, names, p, n;
          node = arg$.node, names = arg$.names;
          p = this$.progress;
          if (in$('progress-bar', names)) {
            n = node.getAttribute('data-name');
            return node.style.width = 100 * p[n] / p.total + "%";
          } else if (in$('progress-percent', names)) {
            return node.innerText = Math.round(100 * p.done / p.total);
          }
        },
        "header-criteria": {
          list: function(){
            return this$.criteria;
          },
          action: {
            click: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              return this$.sort('criteria', data.key);
            }
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            return node.innerText = data.name;
          }
        },
        project: {
          key: function(it){
            return it.slug;
          },
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
                  },
                  pick: function(arg$){
                    var node, context, obj, ref$, key$, ref1$;
                    node = arg$.node, context = arg$.context;
                    obj = (ref$ = (ref1$ = this$.data).prj || (ref1$.prj = {}))[key$ = context.slug] || (ref$[key$] = {});
                    obj.picked = !obj.picked;
                    local.view.render();
                    return this$.update({
                      debounced: 10
                    });
                  }
                }
              },
              text: {
                budget: function(arg$){
                  var context, b, total;
                  context = arg$.context;
                  if (!(b = context.info.budget)) {
                    return '';
                  }
                  total = (b.self || 0) + (b.subsidy || 0);
                  return Math.round(total / 10000) + "萬";
                },
                subsidy: function(arg$){
                  var context, b, total;
                  context = arg$.context;
                  if (!(b = context.info.budget)) {
                    return '';
                  }
                  total = b.subsidy || 0;
                  return Math.round(total / 10000) + "萬";
                },
                name: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.name || '';
                },
                ownername: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.info.teamname || context.ownername || '';
                },
                key: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.key || '';
                }
              },
              handler: {
                pick: function(arg$){
                  var node, context, cls, obj, ref$, key$, ref1$, cl, icon;
                  node = arg$.node, context = arg$.context;
                  cls = [['text-white', 'bg-success'], ['text-secondary', 'bg-light']];
                  obj = (ref$ = (ref1$ = this$.data).prj || (ref1$.prj = {}))[key$ = context.slug] || (ref$[key$] = {});
                  cl = node.classList;
                  cl.add.apply(cl, obj.picked
                    ? cls[0]
                    : cls[1]);
                  cl.remove.apply(cl, obj.picked
                    ? cls[1]
                    : cls[0]);
                  cls = [['i-check'], ['i-circle']];
                  icon = ld$.find(node, 'i', 0);
                  cl = icon.classList;
                  cl.add.apply(cl, obj.picked
                    ? cls[0]
                    : cls[1]);
                  return cl.remove.apply(cl, obj.picked
                    ? cls[1]
                    : cls[0]);
                },
                "has-comment": function(arg$){
                  var node, context, ref$, key$;
                  node = arg$.node, context = arg$.context;
                  return node.classList.toggle('invisible', !((ref$ = this$.data.prj)[key$ = context.slug] || (ref$[key$] = {})).comment);
                },
                progress: function(arg$){
                  var node, context, n;
                  node = arg$.node, context = arg$.context;
                  n = node.getAttribute('data-name');
                  return node.style.width = 100 * (context.count || (context.count = {}))[n] / ((context.count || (context.count = {})).total || 1) + "%";
                },
                count: function(arg$){
                  var node, context, n;
                  node = arg$.node, context = arg$.context;
                  n = node.getAttribute('data-name');
                  return node.innerText = (context.count || (context.count = {}))[n] || 0;
                }
              }
            });
          },
          handler: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            local.view.setContext(data);
            this$.getState(data);
            return local.view.render();
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$({}, judgeBase.prototype), {
    opsIn: function(arg$){
      var data, ops, source, ref$;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.data = JSON.parse(JSON.stringify(data));
      (ref$ = this.data).prj || (ref$.prj = {});
      return this.render();
    },
    render: function(){
      this.getProgress();
      this.getCount();
      this.view.base.render();
      return this.view.local.render();
    },
    init: function(){
      var this$ = this;
      return Promise.resolve().then(function(){
        return this$.auth();
      }).then(function(){
        return this$.initView();
      }).then(function(){
        return this$.fetchInfo();
      }).then(function(){
        return this$.fetchPrjs();
      }).then(function(){
        return this$.sharedb();
      }).then(function(){
        return this$.getdoc();
      }).then(function(){
        return this$.sort('name', null, false);
      }).then(function(){
        return console.log("initied.");
      })['catch'](error());
    },
    getState: function(context){
      var this$ = this;
      return context.state = this.criteria.reduce(function(a, b){
        var v, ref$, ref1$, key$;
        v = ((ref$ = (ref1$ = this$.data.prj)[key$ = context.slug] || (ref1$[key$] = {})).value || (ref$.value = {}))[b.key];
        return Math.max(a, v != null ? v : 1);
      }, 0);
    },
    getCount: function(){
      var len, k, this$ = this;
      len = (function(){
        var results$ = [];
        for (k in this.data.user) {
          results$.push(k);
        }
        return results$;
      }.call(this)).length;
      return this.prjs.map(function(p, i){
        var count, k, ref$, u, v, ref1$, key$, results$ = [];
        p.count = count = {
          accept: 0,
          pending: 0,
          reject: 0,
          total: len
        };
        for (k in ref$ = this$.data.user) {
          u = ref$[k];
          if (v = ((ref1$ = u.prj)[key$ = p.slug] || (ref1$[key$] = {})).value) {
            results$.push(count[v]++);
          }
        }
        return results$;
      });
    },
    getProgress: function(){
      var ret, this$ = this;
      this.progress = ret = {
        done: 0,
        accept: 0,
        pending: 0,
        reject: 0,
        total: this.prjs.length || 1
      };
      this.prjs.map(function(p){
        var v, ref$, key$;
        if (v = ((ref$ = this$.data.prj)[key$ = p.slug] || (ref$[key$] = {})).value) {
          return ret[v]++;
        }
      });
      return ret.done = ret.accept + ret.pending + ret.reject || 0;
    }
  });
  ctrl = new Ctrl({
    root: document.body
  });
  return ctrl.init();
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}