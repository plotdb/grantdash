// Generated by LiveScript 1.3.0
ldc.register('judgeFinalUser', ['notify', 'judgeBase', 'error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var notify, judgeBase, error, loader, auth, ldcvmgr, sdbAdapter, Ctrl, ctrl;
  notify = arg$.notify, judgeBase = arg$.judgeBase, error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var obj, view, this$ = this;
    import$(this, obj = new judgeBase(opt));
    this.data = {
      prj: {}
    };
    this.active = null;
    this.progress = {
      total: 1,
      done: 0
    };
    this.ldcv = {
      comment: new ldCover({
        root: ld$.find(this.root, '[ld=comment-ldcv]', 0),
        escape: false
      }),
      detail: new ldCover({
        root: ld$.find(this.root, '[ld=detail-ldcv]', 0)
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
          sort: function(arg$){
            var node;
            node = arg$.node;
            return this$.sort(node.getAttribute('data-name'));
          },
          "toggle-total": function(){
            this$.totalEditable = !this$.totalEditable;
            return this$.view.local.render('toggle-total');
          }
        }
      },
      handler: {
        "toggle-total": function(arg$){
          var node;
          node = arg$.node;
          ld$.find(node, '.switch', 0).classList.toggle('on', this$.totalEditable);
          return ld$.find(this$.root, 'input[ld=total]').map(function(n){
            if (this$.totalEditable) {
              n.removeAttribute('readonly');
            } else {
              n.setAttribute('readonly', null);
            }
            return n.classList.toggle('bg-light', !this$.totalEditable);
          });
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
        "progress-percent": function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = Math.floor(100 * this$.progress.done / this$.progress.total);
        },
        "progress-bar": function(arg$){
          var node;
          node = arg$.node;
          return node.style.width = 100 * this$.progress.done / this$.progress.total + "%";
        },
        count: function(arg$){
          var node, n;
          node = arg$.node;
          n = node.getAttribute('data-name');
          if (n === 'total') {
            return node.innerText = this$.progress.total || 0;
          } else if (n === 'pending') {
            return node.innerText = this$.progress.total - this$.progress.done || 0;
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
        "total-max": function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = "0 ~ " + this$.grade.reduce(function(a, b){
            return a + +b.percent;
          }, 0);
        },
        grade: {
          list: function(arg$){
            var context;
            context = arg$.context;
            return this$.grade;
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            ld$.find(node, 'span', 0).innerText = data.name;
            return ld$.find(node, 'div', 0).innerText = "0 ~ " + data.percent;
          },
          action: {
            click: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              return this$.sort('grade', data);
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
              init: {
                total: function(arg$){
                  var node, context, handle;
                  node = arg$.node, context = arg$.context;
                  handle = function(){
                    var v, sum;
                    if (context.total === (v = +node.value)) {
                      return;
                    }
                    if (isNaN(v)) {
                      return node.value = context.total;
                    }
                    context.total = v;
                    sum = this$.grade.reduce(function(a, b){
                      return a + +b.percent;
                    }, 0);
                    this$.grade.map(function(it){
                      var ref$, ref1$, key$;
                      return ((ref$ = (ref1$ = this$.data.prj)[key$ = context.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[it.key] = it.percent * v / sum;
                    });
                    return this$.view.local.render('project');
                  };
                  node.addEventListener('input', handle);
                  node.addEventListener('change', handle);
                  return node.addEventListener('keyup', handle);
                }
              },
              handler: {
                comment: function(arg$){
                  var node, context, ref$, key$;
                  node = arg$.node, context = arg$.context;
                  return node.classList.toggle('text-primary', !!((ref$ = this$.data.prj)[key$ = context.key] || (ref$[key$] = {})).comment);
                },
                name: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.name;
                },
                key: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.key || '';
                },
                total: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.value = context.total != null ? context.total : '-';
                },
                rank: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.value = context.rank != null ? context.rank : '-';
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
                grade: {
                  key: function(it){
                    return it.key;
                  },
                  list: function(arg$){
                    var context;
                    context = arg$.context;
                    return this$.grade;
                  },
                  init: function(arg$){
                    var local, node, context, data, input, ref$, ref1$, key$, _update, handle;
                    local = arg$.local, node = arg$.node, context = arg$.context, data = arg$.data;
                    local.input = input = ld$.find(node, 'input', 0);
                    input.value = ((ref$ = (ref1$ = this$.data.prj)[key$ = context.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[data.key] || '';
                    _update = debounce(300, function(){
                      this$.rerank();
                      this$.view.local.render('project');
                      return this$.opsOut(function(){
                        return this$.data;
                      });
                    });
                    handle = function(){
                      this$.data.prj[context.key].v[data.key] = input.value;
                      local.render(data);
                      return _update();
                    };
                    local.render = function(data){
                      var v, ref$, ref1$, key$;
                      v = ((ref$ = (ref1$ = this$.data.prj)[key$ = context.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[data.key];
                      local.input.value = v != null ? v : '';
                      ['bg-danger', 'text-white'].map(function(it){
                        return input.classList.toggle(it, +v > data.percent);
                      });
                      return this$.view.local.render(['progress-bar', 'progress-percent', 'count']);
                    };
                    input.addEventListener('input', handle);
                    input.addEventListener('keyup', handle);
                    return input.addEventListener('change', handle);
                  },
                  handler: function(arg$){
                    var local, context, data;
                    local = arg$.local, context = arg$.context, data = arg$.data;
                    return local.render(data);
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
        return this$.user = this$.global.user;
      }).then(function(){
        return this$.fetchInfo();
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
      var ranks, res$, k, ref$, ref1$, v, prj, sum, i$, len$, g, lc;
      res$ = [];
      for (k in ref$ = (ref1$ = this.data).prj || (ref1$.prj = {})) {
        v = ref$[k];
        if (!(prj = this.prjkeymap[k])) {
          continue;
        }
        sum = 0;
        for (i$ = 0, len$ = (ref1$ = this.grade).length; i$ < len$; ++i$) {
          g = ref1$[i$];
          sum += +((v.v || (v.v = {}))[g.key] || 0);
        }
        prj.total = sum;
        res$.push([prj, sum]);
      }
      ranks = res$;
      lc = {
        idx: 1,
        value: null
      };
      ranks.sort(function(a, b){
        return b[1] - a[1];
      });
      ranks.map(function(d, i){
        var ref$;
        if (lc.value !== d[1]) {
          ref$ = [d[1], i + 1], lc.value = ref$[0], lc.idx = ref$[1];
        }
        return d[0].rank = lc.idx;
      });
      return this.getProgress();
    },
    getProgress: function(){
      var this$ = this;
      return this.progress = {
        total: this.prjs.length || 1,
        done: this.prjs.filter(function(p){
          return !this$.grade.filter(function(g){
            var v, ref$, ref1$, key$;
            v = ((ref$ = (ref1$ = this$.data.prj)[key$ = p.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[g.key];
            return !(v != null) || v === '';
          }).length;
        }).length
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