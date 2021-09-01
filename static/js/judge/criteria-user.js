// Generated by LiveScript 1.3.0
ldc.register('judgeCriteriaUser', ['notify', 'judgeBase', 'error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var notify, judgeBase, error, loader, auth, ldcvmgr, sdbAdapter, useMend, clsmap, clsset, Ctrl, ctrl;
  notify = arg$.notify, judgeBase = arg$.judgeBase, error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  useMend = true;
  clsmap = [['i-check', 'text-success'], ['i-circle', 'text-secondary'], ['i-close', 'text-danger'], ['i-doc', 'text-warning']];
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
        root: ld$.find(this.root, '[ld=comment-ldcv]', 0),
        escape: false
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
            ((ref$ = this$.data.prj)[key$ = this$.active.key] || (ref$[key$] = {})).comment = node.value;
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
            return this$.sort(node.getAttribute('data-name'));
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
        "type-label": function(arg$){
          var node, name;
          node = arg$.node;
          name = node.getAttribute('data-name');
          if (name === 'mend') {
            return node.classList.toggle('d-none', !useMend);
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
              return this$.sort('criteria', data);
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
                  detail: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return this$.ldcv.detail.toggle();
                  },
                  comment: function(arg$){
                    var node, context, ref$, key$;
                    node = arg$.node, context = arg$.context;
                    this$.active = context;
                    view.get('comment').value = ((ref$ = this$.data.prj)[key$ = this$.active.key] || (ref$[key$] = {})).comment || '';
                    this$.ldcv.comment.toggle();
                    return this$.view.local.render('comment-name');
                  },
                  name: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    view.get("iframe").setAttribute('src', "/dash/prj/" + context.slug + "?simple");
                    view.get("iframe-placeholder").classList.add('d-none');
                    if (this.activeNode) {
                      this.activeNode.classList.remove('active');
                    }
                    this.activeNode = root;
                    return this.activeNode.classList.add('active');
                  }
                }
              },
              handler: {
                "has-comment": function(arg$){
                  var node, context, idx, ref$, key$;
                  node = arg$.node, context = arg$.context;
                  idx = ((ref$ = this$.data.prj)[key$ = context.key] || (ref$[key$] = {})).comment ? 1 : 0;
                  [['i-pen'], ['i-doc', 'text-primary']][1 - idx].map(function(it){
                    return node.classList.remove(it);
                  });
                  return [['i-pen'], ['i-doc', 'text-primary']][idx].map(function(it){
                    return node.classList.add(it);
                  });
                },
                state: function(arg$){
                  var node, context, span, icon, state, cls;
                  node = arg$.node, context = arg$.context;
                  span = ld$.find(node, 'span', 0);
                  icon = ld$.find(node, 'i', 0);
                  state = context.state;
                  icon.classList.remove.apply(icon.classList, icon.classList);
                  icon.classList.add(['i-check', 'i-circle', 'i-close', 'i-doc'][state]);
                  node.classList.remove.apply(node.classList, node.classList);
                  cls = [['bg-success', 'text-white'], ['bg-light', 'text-secondary'], ['bg-danger', 'text-white'], ['bg-warning', 'text-dark']];
                  node.classList.add.apply(node.classList, cls[state].concat(['rounded']));
                  return span.innerText = ['通過', '待查', '不符', '補件'][state];
                },
                name: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.name || '(未命名)';
                },
                key: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.key || '';
                },
                criteria: {
                  list: function(arg$){
                    var context;
                    context = arg$.context;
                    return this$.criteria;
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
                      v = ((ref$ = (ref1$ = this$.data.prj)[key$ = context.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[data.key];
                      v = v != null ? v : 1;
                      if (useMend) {
                        v = (v + 3) % 4;
                      } else {
                        v = (v + 2) % 3;
                      }
                      ((ref$ = this$.data.prj)[key$ = context.key] || (ref$[key$] = {})).v[data.key] = v;
                      this$.getProgress();
                      this$.view.local.render({
                        name: 'project',
                        key: context.slug
                      });
                      this$.view.local.render(['progress', 'count']);
                      return this$.update({
                        debounced: 10
                      });
                    }
                  },
                  handler: function(arg$){
                    var local, data, context, v, ref$, ref1$, key$;
                    local = arg$.local, data = arg$.data, context = arg$.context;
                    v = ((ref$ = (ref1$ = this$.data.prj)[key$ = context.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[data.key];
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
      this.view.base.render();
      return this.view.local.render();
    },
    reconnect: function(){
      var this$ = this;
      return this.getdoc().then(function(){
        return this$.sort('name', null, false);
      }).then(function(){
        return console.log("initied.");
      });
    },
    init: function(){
      var this$ = this;
      return Promise.resolve().then(function(){
        return this$.auth();
      }).then(function(){
        return this$.initView();
      }).then(function(){
        return this$.user = this$.global.user;
      }).then(function(){
        return this$.fetchInfo();
      }).then(function(){
        return this$.fetchPrjs();
      }).then(function(){
        return this$.sharedb();
      }).then(function(){
        return this$.reconnect();
      })['catch'](error());
    },
    getState: function(context){
      var this$ = this;
      return context.state = this.criteria.reduce(function(a, b){
        var v, ref$, ref1$, key$;
        v = ((ref$ = (ref1$ = this$.data.prj)[key$ = context.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[b.key];
        return Math.max(a, v != null ? v : 1);
      }, 0);
    },
    getProgress: function(){
      var val, this$ = this;
      val = {
        0: 0,
        1: 0,
        2: 0,
        3: 0
      };
      this.prjs.map(function(p){
        var v;
        v = this$.criteria.reduce(function(a, b){
          var v, ref$, ref1$, key$;
          v = ((ref$ = (ref1$ = this$.data.prj)[key$ = p.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[b.key];
          return Math.max(a, v != null ? v : 1);
        }, 0);
        return val[v]++;
      });
      return this.progress = {
        accept: val[0],
        pending: val[1],
        reject: val[2],
        mend: val[3],
        done: val[0] + val[2],
        total: this.prjs.length || 1
      };
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