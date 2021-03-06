// Generated by LiveScript 1.3.0
ldc.register('adminJudgeCriteria', ['ldcvmgr', 'auth', 'sdbAdapter', 'error', 'adminPanel'], function(arg$){
  var ldcvmgr, auth, sdbAdapter, error, adminPanel, Ctrl;
  ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter, error = arg$.error, adminPanel = arg$.adminPanel;
  Ctrl = function(opt){
    var root, this$ = this;
    opt == null && (opt = {});
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.brd = opt.brd;
    this.path = opt.path;
    this.grp = null;
    this.data = {};
    adminPanel.on('active', function(arg$){
      var nav, name, panel;
      nav = arg$.nav, name = arg$.name, panel = arg$.panel;
      if (!(nav === 'grp-judge' && name === 'criteria')) {
        return;
      }
      return this$.prepare();
    });
    this.view = new ldView({
      root: this.root,
      init: {
        ldbar: function(arg$){
          var node, local;
          node = arg$.node, local = arg$.local;
          return local.ldbar = new ldBar(node);
        }
      },
      action: {
        click: {
          sync: function(){
            return this$.prepare();
          }
        }
      },
      handler: {
        ldbar: function(arg$){
          var local;
          local = arg$.local;
          return local.ldbar.set(Math.floor(100 * (this$.data.progress || 0)));
        },
        "criteria-user-link": function(arg$){
          var node;
          node = arg$.node;
          if (!this$.grp) {
            return;
          }
          return node.setAttribute('href', "/dash/brd/" + this$.brd.slug + "/grp/" + this$.grp.key + "/judge/criteria/user");
        },
        "criteria-all-link": function(arg$){
          var node;
          node = arg$.node;
          if (!this$.grp) {
            return;
          }
          return node.setAttribute('href', "/dash/brd/" + this$.brd.slug + "/grp/" + this$.grp.key + "/judge/criteria/all");
        },
        "criteria-judge": {
          key: function(it){
            return it.key;
          },
          list: function(){
            var ref$;
            return (ref$ = this$.data).users || (ref$.users = []);
          },
          init: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            node.classList.toggle('d-none', false);
            return local.view = new ldView({
              root: node,
              context: data,
              handler: {
                name: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.displayname;
                },
                "progress-bar": function(arg$){
                  var node, context, v;
                  node = arg$.node, context = arg$.context;
                  v = +node.getAttribute('data-name');
                  return node.style.width = 100 * context.count[v] / context.count.total + "%";
                },
                percent: function(arg$){
                  var node, context, c, percent;
                  node = arg$.node, context = arg$.context;
                  c = context.count || {};
                  percent = Math.floor(100 * (c[0] + c[2]) / c.total);
                  return node.innerText = percent + "%";
                }
              }
            });
          },
          handler: function(arg$){
            var local, data;
            local = arg$.local, data = arg$.data;
            local.view.setContext(data);
            return local.view.render();
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    prepare: function(){
      var this$ = this;
      return ld$.fetch("/dash/api/brd/" + this.brd.slug + "/grp/" + this.grp.key + "/judge/criteria/all", {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(it){
        var ref$, prjs, users, data, criteria, count;
        ref$ = {
          prjs: it.prjs,
          users: it.users,
          data: it.data,
          criteria: it.criteria
        }, prjs = ref$.prjs, users = ref$.users, data = ref$.data, criteria = ref$.criteria;
        ref$ = [
          prjs || [], users || [], data || {}, criteria || {
            entries: []
          }
        ], prjs = ref$[0], users = ref$[1], data = ref$[2], criteria = ref$[3];
        this$.data.users = users;
        count = {
          0: 0,
          1: 0,
          2: 0,
          total: prjs.length
        };
        users.map(function(u){
          return u.count = {
            0: 0,
            1: 0,
            2: 0,
            total: prjs.length
          };
        });
        prjs.map(function(p){
          var maxValue;
          maxValue = -1;
          users.map(function(u){
            var v, ref$, ref1$, key$, state;
            v = (ref$ = (ref1$ = data.user[u.key].prj)[key$ = p.key] || (ref1$[key$] = {})).v || (ref$.v = {});
            state = criteria.entries.reduce(function(a, b){
              return Math.max(a, v[b.key] != null ? v[b.key] : 1);
            }, 0);
            p.state = state;
            u.count[state]++;
            if ((state === 0 || state === 2) && state > maxValue) {
              return maxValue = state;
            }
          });
          if (maxValue === -1) {
            maxValue = 1;
          }
          return count[maxValue]++;
        });
        return this$.data.progress = (count[0] + count[2]) / count.total;
      }).then(function(){
        return this$.view.render();
      })['catch'](error());
    },
    setData: function(grp){
      this.grp = grp;
      return this.prepare();
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}