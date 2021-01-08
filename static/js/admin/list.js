// Generated by LiveScript 1.3.0
var slice$ = [].slice;
ldc.register('adminPrjList', ['error', 'loader', 'notify', 'ldcvmgr', 'auth', 'sdbAdapter', 'adminPanel'], function(arg$){
  var error, loader, notify, ldcvmgr, auth, sdbAdapter, adminPanel, Ctrl;
  error = arg$.error, loader = arg$.loader, notify = arg$.notify, ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter, adminPanel = arg$.adminPanel;
  Ctrl = function(opt){
    var lc, renderDebounced, view, this$ = this;
    this.toc = opt.toc;
    this.evtHandler = {};
    this.data = [];
    this.filter = {
      badge: ""
    };
    adminPanel.on('active', function(arg$){
      var nav, name, panel;
      nav = arg$.nav, name = arg$.name, panel = arg$.panel;
      if (name === 'grp-list') {
        return ld$.fetch("/dash/api/brd/" + this$.toc.brd.slug + "/list", {
          method: 'GET'
        }, {
          params: {
            grp: this$.grp.key
          },
          type: 'json'
        }).then(function(it){
          this$.data = it;
          this$.data.map(function(it){
            return it.info = it.detail.info;
          });
          return this$.view.render();
        })['catch'](error());
      }
    });
    lc = {};
    renderDebounced = debounce(function(){
      return this$.view.render('prj');
    });
    this.view = view = new ldView({
      root: opt.root,
      action: {
        input: {
          "search-input": function(arg$){
            var node;
            node = arg$.node;
            return lc.keyword = node.value;
          }
        },
        keypress: {
          "search-input": function(arg$){
            var node, evt;
            node = arg$.node, evt = arg$.evt;
            if (evt.keyCode === 13) {
              return this$.view.render();
            }
          }
        },
        click: {
          search: function(){
            return this$.view.render();
          },
          "search-filter": function(arg$){
            var node;
            node = arg$.node;
            this$.filter.badge = node.getAttribute('data-name');
            return this$.view.render();
          },
          download: function(arg$){
            var node, n, type;
            node = arg$.node;
            n = node.getAttribute('data-name');
            type = node.getAttribute('data-type') || 'active';
            return ld$.fetch("/dash/api/brd/" + this$.toc.brd.slug + "/grp/" + this$.grp.key + "/prjs", {
              method: 'GET'
            }, {
              type: 'json'
            }).then(function(prjs){
              var custom, head, rows, blob, name;
              prjs == null && (prjs = {});
              if (type && type !== 'all') {
                prjs = prjs.filter(function(it){
                  return !it.deleted;
                }).filter(function(it){
                  var ref$;
                  if (type === 'active') {
                    return it.state === 'active';
                  } else {
                    return ((ref$ = it.system || (it.system = {})).badge || (ref$.badge = {}))[type];
                  }
                });
              }
              if (n === 'custom') {
                window.adminExtension = null;
                custom = this$.hubs.brd.doc.data.custom;
                return new Promise(function(res, rej){
                  var fallback, script;
                  fallback = function(){
                    var blob, name;
                    blob = new Blob([JSON.stringify(prjs)], {
                      type: "application/json"
                    });
                    name = "projects.json";
                    return res({
                      blob: blob,
                      name: name
                    });
                  };
                  if (!(custom && custom.view)) {
                    return res(fallback());
                  }
                  script = document.createElement('script');
                  script.src = ("/dash/js/view/" + custom.view + "/admin.js?v=") + Math.random().toString(36).substring(2);
                  script.onload = function(){
                    var func;
                    func = (adminExtension || {}).downloadProjects;
                    if (func) {
                      return res(func({
                        prjs: prjs
                      }));
                    } else {
                      return res(fallback());
                    }
                  };
                  script.onerror = function(){
                    return res(fallback());
                  };
                  return document.body.appendChild(script);
                });
              } else {
                if (n === 'csv') {
                  head = this$.grp.form.list.filter(function(f){
                    return !in$(f.name, ['form-file']);
                  }).map(function(it){
                    return it.title;
                  });
                  rows = prjs.map(function(p){
                    return this$.grp.form.list.filter(function(f){
                      return !in$(f.name, ['form-file']);
                    }).map(function(f, i){
                      var answer;
                      answer = p.detail.answer[f.key];
                      if (!answer) {
                        return '';
                      }
                      if (answer.content) {
                        return answer.content;
                      }
                      if (answer.list) {
                        return ((answer.list || []).concat(answer.other
                          ? [answer.otherValue]
                          : [])).join(',');
                      }
                      return '';
                    });
                  });
                  blob = csv4xls.toBlob([head].concat(rows));
                  name = this$.toc.brd.name + "-" + this$.grp.info.name + ".csv";
                  return {
                    blob: blob,
                    name: name
                  };
                } else {
                  if (n === 'mail') {
                    prjs = prjs.map(function(it){
                      return {
                        username: it.username,
                        name: it.name
                      };
                    });
                  }
                  blob = new Blob([JSON.stringify(prjs)], {
                    type: "application/json"
                  });
                  name = "projects-" + n + ".json";
                  return {
                    blob: blob,
                    name: name
                  };
                }
              }
            }).then(function(arg$){
              var blob, name, url, a;
              blob = arg$.blob, name = arg$.name;
              url = URL.createObjectURL(blob);
              a = ld$.create({
                name: 'a',
                attr: {
                  href: url,
                  download: name
                }
              });
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              return a.remove();
            })['catch'](error());
          }
        }
      },
      init: {
        "download-dropdown": function(arg$){
          var node;
          node = arg$.node;
          return new Dropdown(node);
        }
      },
      handler: {
        "search-filter": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('active', node.getAttribute('data-name') === this$.filter.badge || "");
        },
        empty: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', this$.data.filter(function(it){
            return it.slug;
          }).length);
        },
        prj: {
          list: function(){
            return this$.data.filter(function(it){
              return (!this$.filter.badge || it.system.badge[this$.filter.badge]) && it.slug && (!lc.keyword || ~[it.name, (it.info || (it.info = {})).teamname, it.username, it.ownername].filter(function(it){
                return it;
              }).join(' ').indexOf(lc.keyword));
            });
          },
          handler: function(arg$){
            var node, local, data, ref$;
            node = arg$.node, local = arg$.local, data = arg$.data;
            local.view.setContext(data);
            local.view.render();
            if (data.state === 'active') {
              return ref$ = node.style, ref$.color = 'auto', ref$;
            } else {
              return ref$ = node.style, ref$.color = 'rgba(0,0,0,.6)', ref$;
            }
          },
          init: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            return local.view = new ldView({
              context: data,
              root: node,
              action: {
                click: {
                  "set-state": function(arg$){
                    var node, context, name, json;
                    node = arg$.node, context = arg$.context;
                    name = node.getAttribute('data-name');
                    json = {
                      value: name
                    };
                    loader.on();
                    return debounce(500).then(function(){
                      return ld$.fetch("/dash/api/prj/" + context.slug + "/state", {
                        method: 'PUT'
                      }, {
                        type: 'json',
                        json: json
                      });
                    })['finally'](function(){
                      return loader.off();
                    }).then(function(){
                      notify.send('success', '更新成功');
                      context.state = name;
                      return local.view.render('state');
                    })['catch'](function(){
                      return notify.send('danger', '更新失敗');
                    });
                  },
                  'delete': function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    if (node.classList.contains('running')) {
                      return;
                    }
                    return ldcvmgr.get('confirm-deletion').then(function(it){
                      if (it !== 'yes') {
                        return;
                      }
                      node.classList.toggle('running', true);
                      return ld$.fetch("/dash/api/prj/" + context.slug, {
                        method: 'delete'
                      }, {
                        type: 'json'
                      })['finally'](function(){
                        return node.classList.toggle('running', false);
                      }).then(function(){
                        var idx;
                        notify.send('success', "成功刪除了「" + context.name + "」提案");
                        idx = this$.data.indexOf(context);
                        if (~idx) {
                          this$.data.splice(idx, 1);
                        }
                        return this$.view.render();
                      })['catch'](error());
                    });
                  },
                  name: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    adminPanel.toggle({
                      nav: 'main',
                      name: 'grp-detail'
                    });
                    return this$.setPrj(context);
                  }
                }
              },
              init: {
                state: function(arg$){
                  var node;
                  node = arg$.node;
                  return new Dropdown(node.parentNode);
                }
              },
              text: {
                name: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.name || '(未命名的提案)';
                },
                index: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.key;
                },
                state: function(arg$){
                  var context;
                  context = arg$.context;
                  if (context.state === 'active') {
                    return "已送件";
                  } else {
                    return "編輯中";
                  }
                },
                ownername: function(arg$){
                  var context;
                  context = arg$.context;
                  return (context.info || (context.info = {})).teamname || context.ownername || '';
                },
                username: function(arg$){
                  var context;
                  context = arg$.context;
                  return context.ownername || '';
                }
              },
              handler: {
                edit: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.setAttribute('href', "/dash/prj/" + context.slug + "/edit");
                },
                state: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  node.classList.toggle('text-success', context.state === 'active');
                  return node.classList.toggle('text-warning', context.state !== 'active');
                },
                "budget-consume": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                },
                "budget-detail": function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                },
                avatar: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.style.background = "url(/s/avatar/" + context.owner + ".png)";
                }
              }
            });
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    setHub: function(it){
      return this.hubs = it;
    },
    setData: function(grp){
      return this.grp = grp;
    },
    setPrj: function(prj){
      return this.fire('set-prj', prj);
    },
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, i$, ref$, len$, cb, results$ = [];
      v = slice$.call(arguments, 1);
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    }
  });
  return Ctrl;
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}