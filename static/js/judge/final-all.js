// Generated by LiveScript 1.3.0
ldc.register('judgeFinalAll', ['notify', 'judgeBase', 'error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var notify, judgeBase, error, loader, auth, ldcvmgr, sdbAdapter, Ctrl, ctrl;
  notify = arg$.notify, judgeBase = arg$.judgeBase, error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var obj, coloring, view, this$ = this;
    import$(this, obj = new judgeBase(opt));
    this.judgeBase = obj;
    this.data = {
      prj: {}
    };
    this.active = null;
    this.progress = {
      total: 1,
      done: 0
    };
    this.cfg = {
      heatmap: true
    };
    coloring = function(v){
      var r, g;
      r = v >= 0.5 ? 255 : 0;
      g = v < 0.5 ? 255 : 0;
      v = Math.abs(v - 0.5);
      return "rgba(" + r + "," + g + ",0," + v + ")";
    };
    this.ldcv = {
      "judge-comment": new ldCover({
        root: ld$.find(this.root, '[ld=judge-comment-ldcv]', 0)
      }),
      detail: new ldCover({
        root: ld$.find(this.root, '[ld=detail-ldcv]', 0)
      })
    };
    this.view.local = view = new ldView({
      initRender: false,
      root: this.root,
      action: {
        click: {
          sort: function(arg$){
            var node;
            node = arg$.node;
            return this$.sort(node.getAttribute('data-name'));
          },
          "toggle-heatmap": function(){
            this$.cfg.heatmap = !this$.cfg.heatmap;
            this$.view.local.render('toggle-heatmap');
            return this$.view.local.render('project');
          }
        }
      },
      handler: {
        "toggle-heatmap": function(arg$){
          var node;
          node = arg$.node;
          return ld$.find(node, '.switch', 0).classList.toggle('on', !!this$.cfg.heatmap);
        },
        "comment-name": function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = (this$.active && this$.active.name) || '';
        },
        "detail-name": function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = (this$.active && this$.active.name) || '';
        },
        "judge-comment": {
          list: function(){
            var ret;
            if (!this$.active) {
              return [];
            }
            ret = this$.judge.map(function(j){
              var ref$, ref1$, key$;
              return {
                judge: j,
                comment: ((ref$ = (ref1$ = this$.data.user)[key$ = j.key] || (ref1$[key$] = {})).prj || (ref$.prj = {}))[this$.active.key].comment
              };
            }).filter(function(it){
              return it.comment;
            });
            return ret.sort(function(a, b){
              return (b.comment != null ? b.comment.length : 0) - (a.comment != null ? a.comment.length : 0);
            });
          },
          handler: function(arg$){
            var node, data, name, comment;
            node = arg$.node, data = arg$.data;
            name = ld$.find(node, '[ld=name]', 0);
            comment = ld$.find(node, '[ld=comment]', 0);
            name.innerText = data.judge.name;
            return comment.innerText = data.comment;
          }
        },
        detail: {
          list: function(){
            var ret, res$, k, ref$, ref1$, v, p, key$, obj;
            if (!this$.active) {
              return [];
            }
            res$ = [];
            for (k in ref$ = ((ref1$ = this$.criteriaResult).data || (ref1$.data = {})).user || {}) {
              v = ref$[k];
              p = (ref1$ = v.prj)[key$ = this$.active.key] || (ref1$[key$] = {});
              res$.push(obj = {
                user: k,
                name: this$.usermap[k].displayname,
                comment: p.comment || '',
                criteria: this$.criteria.map(fn$)
              });
            }
            ret = res$;
            return ret.sort(function(a, b){
              return (b.comment != null ? b.comment.length : 0) - (a.comment != null ? a.comment.length : 0);
            });
            function fn$(c){
              return {
                name: c.name,
                value: (p.v || (p.v = {}))[c.key] != null ? p.v[c.key] : 1
              };
            }
          },
          init: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            return local.view = new ldView({
              root: node,
              context: data,
              text: {
                name: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.name;
                }
              },
              handler: {
                comment: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  node.innerText = context.comment || '( 沒有評論 )';
                  return node.classList.toggle('text-muted', !context.comment);
                },
                avatar: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.style.backgroundImage = "url(/dash/s/avatar/" + context.user + ".png)";
                },
                criteria: {
                  list: function(arg$){
                    var context;
                    context = arg$.context;
                    return context.criteria;
                  },
                  handler: function(arg$){
                    var node, data, label, icon;
                    node = arg$.node, data = arg$.data;
                    ld$.find(node, '[ld=name]', 0).innerText = data.name;
                    label = ld$.find(node, '[ld=value]', 0);
                    icon = ld$.find(label, 'i', 0);
                    label.classList.remove('text-success', 'text-secondary', 'text-danger');
                    label.classList.add(['text-success', 'text-secondary', 'text-danger'][data.value]);
                    icon.classList.remove('i-close', 'i-circle', 'i-check');
                    return icon.classList.add(['i-check', 'i-circle', 'i-close'][data.value]);
                  }
                }
              }
            });
          }
        },
        judge: {
          list: function(arg$){
            var context;
            context = arg$.context;
            return this$.judge;
          },
          handler: function(arg$){
            var node, data, idx, name, ref$, ref1$;
            node = arg$.node, data = arg$.data, idx = arg$.idx;
            console.log(this$.grpinfo);
            name = ((ref$ = (ref1$ = this$.grpinfo).judge || (ref1$.judge = {})).final || (ref$.final = {})).anonymous
              ? "評審" + (idx + 1)
              : data.name;
            return ld$.find(node, 'div', 0).innerText = name;
          },
          action: {
            click: function(arg$){
              var node, data, evt, n;
              node = arg$.node, data = arg$.data, evt = arg$.evt;
              if (!(evt.target && (n = evt.target.getAttribute('data-name')))) {
                return;
              }
              return this$.sort("judge-" + n, data);
            }
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
                    this$.active = context;
                    this$.view.local.render('detail');
                    this$.ldcv.detail.toggle();
                    return this$.view.local.render('detail-name');
                  },
                  "judge-comment": function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    this$.active = context;
                    this$.view.local.render('detail-name');
                    this$.view.local.render('judge-comment');
                    return this$.ldcv["judge-comment"].toggle();
                  }
                }
              },
              handler: {
                "judge-comment": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.classList.toggle('text-primary', context.hasComment);
                },
                name: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  node.innerText = context.name;
                  return node.setAttribute('href', "/dash/prj/" + context.slug);
                },
                key: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.key || '';
                },
                total: function(arg$){
                  var node, context, v;
                  node = arg$.node, context = arg$.context;
                  if (!(context.total != null)) {
                    return node.innerText = '-';
                  }
                  v = Math.round(10 * context.total) / 10;
                  node.innerText = v.toFixed(1);
                  return node.style.background = this$.cfg.heatmap ? '#fff' : '#eee';
                },
                rank: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  node.innerText = context.rank != null ? context.rank : '-';
                  return node.style.background = this$.cfg.heatmap ? coloring(+(context.rank || 0) / (this$.prjs.length || 1)) : '#eee';
                },
                criteria: function(arg$){
                  var node, context, n;
                  node = arg$.node, context = arg$.context;
                  n = node.getAttribute('data-name');
                  return node.innerText = ({
                    0: "+",
                    2: "-"
                  }[n] || '') + (context.criteria || (context.criteria = {}))[n];
                },
                judge: {
                  key: function(it){
                    return it.key;
                  },
                  list: function(arg$){
                    var context;
                    context = arg$.context;
                    return this$.judge;
                  },
                  init: function(arg$){
                    var local, node, context, data;
                    local = arg$.local, node = arg$.node, context = arg$.context, data = arg$.data;
                  },
                  handler: function(arg$){
                    var node, context, data, score, rank;
                    node = arg$.node, context = arg$.context, data = arg$.data;
                    score = ld$.find(node, '[ld=score]', 0);
                    rank = ld$.find(node, '[ld=rank]', 0);
                    score.innerText = data.score[context.key] || 0;
                    rank.innerText = data.rank[context.key] || 0;
                    return rank.style.background = this$.cfg.heatmap ? coloring(+(data.rank[context.key] || 0) / (this$.prjs.length || 1)) : '#fff';
                  }
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
      this.rerank();
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
        return this$.fetchInfo();
      }).then(function(){
        var ref$, ref1$;
        return this$.judge = (ref$ = (ref1$ = this$.grpinfo).judgePerm || (ref1$.judgePerm = {})).list || (ref$.list = []);
      }).then(function(){
        if (!this$.grpinfo.grade) {
          return ldcvmgr.get('judge-grade-missing');
        } else {
          return this$.grade = this$.grpinfo.grade.entries;
        }
      }).then(function(){
        return this$.fetchPrjs();
      }).then(function(){
        return this$.fetchCriteriaResult();
      }).then(function(){
        return this$.sharedb();
      }).then(function(){
        return this$.reconnect();
      })['catch'](error());
    },
    fetchCriteriaResult: function(){
      var this$ = this;
      return ld$.fetch("/dash/api/brd/" + this.brd + "/grp/" + this.grp + "/judge/criteria/result", {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(ret){
        var k, users;
        ret == null && (ret = {});
        this$.criteriaResult = ret.data;
        this$.getDisplayname((function(){
          var results$ = [];
          for (k in this.criteriaResult.data.user) {
            results$.push(k);
          }
          return results$;
        }.call(this$)));
        users = this$.criteriaResult.data.user;
        return this$.prjs.map(function(p){
          var k, ref$, v, results$ = [];
          p.criteria = {
            0: 0,
            1: 0,
            2: 0
          };
          for (k in ref$ = users) {
            v = ref$[k];
            results$.push(this$.criteria.map(fn$));
          }
          return results$;
          function fn$(c){
            var idx, ref$, key$;
            idx = ((ref$ = v.prj || (v.prj = {}))[key$ = p.key] || (ref$[key$] = {})).v[c.key];
            if (!(idx != null)) {
              idx = 1;
            }
            return p.criteria[idx]++;
          }
        });
      });
    },
    rerank: function(){
      var scores, lc, this$ = this;
      if (!this.prjs) {
        return;
      }
      this.prjs.map(function(p){
        return p.hasComment = !!this$.judge.filter(function(j){
          var ref$, key$, ref1$, ref2$, key1$;
          return ((ref$ = (ref1$ = (ref2$ = this$.data.user)[key1$ = j.key] || (ref2$[key1$] = {})).prj || (ref1$.prj = {}))[key$ = p.key] || (ref$[key$] = {})).comment;
        }).length;
      });
      this.judge.map(function(j, i){
        var u, scores, lc;
        u = this$.data.user[j.key] || {};
        j.score = {};
        j.rank = {};
        scores = this$.prjs.map(function(p, i){
          var ref$, key$, sum;
          ((ref$ = u.prj || (u.prj = {}))[key$ = p.key] || (ref$[key$] = {})).comment;
          sum = this$.grade.reduce(function(a, g){
            var ref$, ref1$, key$;
            return +(((ref$ = (ref1$ = u.prj || (u.prj = {}))[key$ = p.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[g.key] || 0) + a;
          }, 0);
          j.score[p.key] = sum;
          return [p.key, sum];
        });
        lc = {};
        scores.sort(function(a, b){
          return b[1] - a[1];
        });
        return scores.map(function(d, i){
          if (lc.value !== d[1]) {
            lc.value = d[1];
            lc.rank = i + 1;
          }
          return j.rank[d[0]] = lc.rank;
        });
      });
      scores = this.prjs.map(function(p, i){
        p.total = this$.judge.reduce(function(a, b){
          return +(b.score[p.key] || 0) + a;
        }, 0) / this$.judge.length;
        return [p, p.total];
      });
      scores.sort(function(a, b){
        return b[1] - a[1];
      });
      lc = {};
      return scores.map(function(d, i){
        if (lc.value !== d[1]) {
          lc.value = d[1];
          lc.rank = i + 1;
        }
        return d[0].rank = lc.rank;
      });
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