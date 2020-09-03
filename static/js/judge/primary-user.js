// Generated by LiveScript 1.3.0
ldc.register('judgePrimaryUser', ['notify', 'judgeBase', 'error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var notify, judgeBase, error, loader, auth, ldcvmgr, sdbAdapter, typemap, bgmap, clsmap, clsset, Ctrl, ctrl;
  notify = arg$.notify, judgeBase = arg$.judgeBase, error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  typemap = {
    0: "accept",
    1: "pending",
    2: "reject"
  };
  bgmap = {
    0: "bg-success",
    1: "bg-warning",
    2: "bg-danger"
  };
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
    var obj, renderDebounce, view, this$ = this;
    import$(this, obj = new judgeBase(opt));
    this.type = 'primary';
    this.data = {
      prj: {}
    };
    this.active = null;
    this.ldcv = {
      comment: new ldCover({
        root: ld$.find(this.root, '[ld=comment-ldcv]', 0),
        escape: false
      }),
      detail: new ldCover({
        root: ld$.find(this.root, '[ld=detail-ldcv]', 0)
      }),
      criteria: new ldCover({
        root: ld$.find(this.root, '[ld=criteria-ldcv]', 0)
      })
    };
    renderDebounce = debounce(function(){
      return this$.view.local.render({
        name: 'project',
        key: this$.active.slug
      });
    });
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
              debounced: 1000
            });
            return renderDebounce();
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
          return this$.progress[typemap[+node.getAttribute('data-name')]] || 0;
        }
      },
      handler: {
        option: function(arg$){
          var node, v, jinfo, ref$, ref1$, type;
          node = arg$.node;
          v = node.getAttribute('data-value');
          jinfo = ((ref$ = (ref1$ = this$.grpinfo).judge || (ref1$.judge = {})).primary || (ref$.primary = {})) || {};
          type = jinfo["option-type"];
          return node.classList.toggle('d-none', v === '1' && type === '2way' ? true : false);
        },
        "show-budget": function(arg$){
          var node, ref$;
          node = arg$.node;
          return node.classList.toggle('d-none', !((ref$ = this$.grpinfo.form).purpose || (ref$.purpose = {})).budget);
        },
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
            n = typemap[+node.getAttribute('data-name')];
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
            return it.key;
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
                  option: function(arg$){
                    var node, context, name, ref$, key$;
                    node = arg$.node, context = arg$.context;
                    name = +node.getAttribute('data-name');
                    ((ref$ = this$.data.prj)[key$ = context.key] || (ref$[key$] = {})).v = name;
                    local.view.render();
                    this$.getProgress();
                    this$.view.local.render(['progress']);
                    return this$.update({
                      debounced: 10
                    });
                  },
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
              text: {
                name: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.name || '(未命名)';
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
                },
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
                }
              },
              handler: {
                "show-budget": function(arg$){
                  var node, ref$;
                  node = arg$.node;
                  return node.classList.toggle('d-none', !((ref$ = this$.grpinfo.form).purpose || (ref$.purpose = {})).budget);
                },
                "has-comment": function(arg$){
                  var node, context, ref$, key$;
                  node = arg$.node, context = arg$.context;
                  return node.classList.toggle('text-primary', !!((ref$ = this$.data.prj)[key$ = context.key] || (ref$[key$] = {})).comment);
                },
                option: function(arg$){
                  var node, local, context, name, cls, ref$, ref1$, act, key$;
                  node = arg$.node, local = arg$.local, context = arg$.context;
                  name = +node.getAttribute('data-name');
                  cls = bgmap[name];
                  if (name === 1) {
                    node.classList.toggle('d-none', ((ref$ = (ref1$ = this$.grpinfo).judge || (ref1$.judge = {})).primary || (ref$.primary = {}))["option-type"] === '2way');
                  }
                  act = ((ref$ = this$.data.prj)[key$ = context.key] || (ref$[key$] = {})).v === name ? 'add' : 'remove';
                  return node.classList[act].apply(node.classList, [cls, 'text-white']);
                }
              }
            });
          },
          handler: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            local.view.setContext(data);
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
        if ((v = ((ref$ = this$.data.prj)[key$ = p.key] || (ref$[key$] = {})).v) != null) {
          return ret[typemap[v]]++;
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