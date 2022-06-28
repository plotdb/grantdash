// Generated by LiveScript 1.3.0
var slice$ = [].slice;
ldc.register('adminPrjList', ['error', 'loader', 'notify', 'ldcvmgr', 'auth', 'sdbAdapter', 'adminPanel'], function(arg$){
  var error, loader, notify, ldcvmgr, auth, sdbAdapter, adminPanel, Ctrl;
  error = arg$.error, loader = arg$.loader, notify = arg$.notify, ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter, adminPanel = arg$.adminPanel;
  Ctrl = function(opt){
    var lc, renderDebounced, getFilteredPrj, view, this$ = this;
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
    getFilteredPrj = function(){
      return this$.data.filter(function(it){
        return (!this$.filter.badge || ((it.system || (it.system = {})).badge && it.system.badge[this$.filter.badge])) && it.slug && (!lc.keyword || ~[it.name, (it.info || (it.info = {})).teamname, it.username, it.ownername].filter(function(it){
          return it;
        }).join(' ').indexOf(lc.keyword));
      });
    };
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
              var customView, head, rows, keys, traverse, result, badges, i$, len$, prj, ret, ref$, wrap, res$, k, to$, i, prefix, r, body, blob, name;
              prjs == null && (prjs = {});
              console.log(prjs);
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
                customView = this$.hubs.brd.doc.data.info.view;
                return new Promise(function(res, rej){
                  var fallback, script;
                  fallback = function(){
                    var ref$, ref1$, heads, res$, k, head, rows, blob, name;
                    if (prjs[0] && ((ref$ = (ref1$ = prjs[0]).detail || (ref1$.detail = {})).custom || (ref$.custom = {})).open) {
                      heads = {};
                      prjs.map(function(p){
                        var k, ref$, ref1$, ref2$, v, results$ = [];
                        for (k in ref$ = (ref1$ = (ref2$ = p.detail || (p.detail = {})).custom || (ref2$.custom = {})).open || (ref1$.open = {})) {
                          v = ref$[k];
                          results$.push(heads[k] = 1);
                        }
                        return results$;
                      });
                      res$ = [];
                      for (k in heads) {
                        res$.push(k);
                      }
                      heads = res$;
                      head = heads.map(function(it){
                        return '"' + ('' + it).replace(/"/g, "'") + '"';
                      });
                      rows = prjs.map(function(p){
                        return heads.map(function(h){
                          var ref$, ref1$;
                          return ((ref$ = (ref1$ = p.detail || (p.detail = {})).custom || (ref1$.custom = {})).open || (ref$.open = {}))[h] || '';
                        }).map(function(v){
                          return typeof v !== 'object'
                            ? v
                            : !v
                              ? ""
                              : v.v != null
                                ? v.v
                                : v.list != null || (v.other != null && v.other.text != null)
                                  ? ((v.list || []).concat([v.other && v.other.enabled ? v.other.text || '' : ''])).filter(function(it){
                                    return it != null && it !== "";
                                  })
                                  : JSON.stringify(v);
                        }).map(function(it){
                          return '"' + ('' + it).replace(/"/g, "'") + '"';
                        });
                      });
                      blob = csv4xls.toBlob([head].concat(rows));
                      name = this$.toc.brd.name + "-" + this$.grp.info.name + ".csv";
                      return {
                        blob: blob,
                        name: name
                      };
                    }
                    blob = new Blob([JSON.stringify(prjs)], {
                      type: "application/json"
                    });
                    name = "projects.json";
                    return res({
                      blob: blob,
                      name: name
                    });
                  };
                  if (!customView) {
                    return res(fallback());
                  }
                  script = document.createElement('script');
                  script.src = ("/dash/js/view/" + customView + "/admin.js?v=") + Math.random().toString(36).substring(2);
                  script.onload = function(){
                    var func;
                    func = (adminExtension || {}).downloadProjects;
                    if (func) {
                      return res(func({
                        prjs: prjs,
                        toc: this$.toc,
                        grp: this$.grp
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
                  if (this$.grp.form) {
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
                  } else {
                    keys = {};
                    traverse = function(obj, n, ret){
                      var i$, to$, i, k, v, key, results$ = [];
                      ret == null && (ret = {});
                      if (Array.isArray(obj)) {
                        for (i$ = 0, to$ = obj.length; i$ < to$; ++i$) {
                          i = i$;
                          results$.push(traverse(obj[i], n.concat([i + 1]), ret));
                        }
                        return results$;
                      } else if (typeof obj === 'object') {
                        for (k in obj) {
                          v = obj[k];
                          results$.push(traverse(v, n.concat([k]), ret));
                        }
                        return results$;
                      } else {
                        key = n.join('-');
                        keys[key] = true;
                        return ret[key] = obj != null ? obj : '';
                      }
                    };
                    result = [];
                    badges = [];
                    for (i$ = 0, len$ = prjs.length; i$ < len$; ++i$) {
                      prj = prjs[i$];
                      result.push(ret = []);
                      badges.push([prj.system.idx != null ? prj.system.idx : ''].concat(['criteria', 'shortlist', 'winner', 'special'].map(fn$)));
                      traverse((ref$ = prj.detail || (prj.detail = {})).custom || (ref$.custom = {}), [], ret);
                    }
                    wrap = function(it){
                      if (!(it != null)) {
                        return '""';
                      }
                      return ['"', ('' + it).replace('"', '""'), '"'].join('');
                    };
                    res$ = [];
                    for (k in keys) {
                      res$.push(k);
                    }
                    keys = res$;
                    rows = [];
                    head = keys;
                    for (i$ = 0, to$ = head[0].length; i$ < to$; ++i$) {
                      i = i$;
                      prefix = head[0].substring(0, i);
                      if (keys.filter(fn1$).length) {
                        head = head.map(fn2$);
                        break;
                      }
                    }
                    for (i$ = 0, to$ = result.length; i$ < to$; ++i$) {
                      i = i$;
                      r = result[i];
                      body = badges[i].concat(keys.map(fn3$));
                      rows.push(body);
                    }
                    head = ["idx", "資格審查", "通過初選", "獲獎", "特別獎"].concat(head);
                  }
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
              function fn$(it){
                if (prj.system.badge[it]) {
                  return "O";
                } else {
                  return '';
                }
              }
              function fn1$(it){
                return !it.startsWith(prefix);
              }
              function fn2$(it){
                var ref$;
                return it.substring((ref$ = i - 1) > 0 ? ref$ : 0);
              }
              function fn3$(k){
                if (r[k] != null) {
                  return r[k];
                } else {
                  return '';
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
      text: {
        "prj-count": function(arg$){
          var node;
          node = arg$.node;
          return getFilteredPrj().length;
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
            return getFilteredPrj();
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
                  "set-badge": function(arg$){
                    var node, context, badge, ref$, name;
                    node = arg$.node, context = arg$.context;
                    badge = (ref$ = context.system || (context.system = {})).badge || (ref$.badge = {});
                    name = node.getAttribute('data-name');
                    badge[name] = !badge[name];
                    loader.on();
                    return debounce(500).then(function(){
                      return ld$.fetch("/dash/api/prj/" + context.slug + "/badge", {
                        method: 'PUT'
                      }, {
                        type: 'json',
                        json: badge
                      });
                    })['finally'](function(){
                      return loader.off();
                    }).then(function(){
                      notify.send('success', '更新成功');
                      return local.view.render('badge-state');
                    })['catch'](function(){
                      notify.send('danger', '更新失敗');
                      badge[name] = !badge[name];
                      return local.view.render('badge-state');
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
                },
                "badge-chooser": function(arg$){
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
                "badge-state": function(arg$){
                  var node, context, badge, name;
                  node = arg$.node, context = arg$.context;
                  badge = (context.system || (context.system = {})).badge || {};
                  name = node.getAttribute('data-name');
                  return node.classList.toggle('on', !!badge[name]);
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