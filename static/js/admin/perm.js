// Generated by LiveScript 1.3.0
ldc.register('adminPerm', ['ldcvmgr', 'auth', 'sdbAdapter', 'userSearch', 'error'], function(arg$){
  var ldcvmgr, auth, sdbAdapter, userSearch, error, Ctrl;
  ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter, userSearch = arg$.userSearch, error = arg$.error;
  Ctrl = function(opt){
    var root, lc, obj, toggleRole, addUser, updateView, viewConfig, updateDataDebounced, updateData, view, this$ = this;
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.ctrl = {
      search: new userSearch({
        root: ld$.find(this.root, '[ld-scope=user-search]', 0)
      })
    };
    this.toc = opt.toc;
    this.org = opt.org;
    this.brd = opt.brd;
    this.ctrl.search.init();
    lc = {
      type: 'list'
    };
    this.obj = obj = {
      idx: -1,
      cfg: {
        roles: []
      }
    };
    toggleRole = function(){
      var role, idx, name, type;
      role = obj.cfg.roles[idx = obj.idx];
      name = role ? role.name : '';
      type = ~idx ? 'role' : 'list';
      return lc.idx = idx, lc.role = role, lc.name = name, lc.type = type, lc;
    };
    addUser = function(picked, update){
      var role, len, entry;
      update == null && (update = true);
      role = (lc.type === 'list'
        ? lc.pickedRole
        : lc.role) || obj.cfg.roles[0] || {
        name: ''
      };
      len = obj.cfg.roles.map(function(it){
        return it.list;
      }).reduce(function(a, b){
        return a.concat(b);
      }, []).filter(function(it){
        return it.type === picked.type && it.key === picked.key;
      }).length;
      if (len) {
        return false;
      }
      entry = (picked.perm = role.name, picked);
      role.list.push(entry);
      this$.ctrl.search.clear();
      if (update) {
        updateData();
        updateView();
      }
      return true;
    };
    this.updateView = updateView = function(){
      toggleRole();
      return view.render();
    };
    viewConfig = {
      root: this.root,
      action: {
        click: {},
        keyup: {}
      },
      handler: {}
    };
    import$(viewConfig.action.click, {
      roles: function(arg$){
        var node, evt;
        node = arg$.node, evt = arg$.evt;
        obj.idx = obj.cfg.roles.map(function(it){
          return it.name;
        }).indexOf(evt.target.getAttribute('data-name'));
        updateData();
        return updateView();
      },
      "new-role": function(arg$){
        var node, evt, names, i$, i, name;
        node = arg$.node, evt = arg$.evt;
        names = obj.cfg.roles.map(function(it){
          return it.name;
        });
        for (i$ = 1; i$ < 100; ++i$) {
          i = i$;
          if (!~names.indexOf("角色" + i)) {
            break;
          }
        }
        name = "角色" + (i < 100
          ? i
          : Math.round(Math.random() * 100) + 100);
        obj.cfg.roles.push({
          name: name,
          desc: "自訂角色",
          list: [],
          key: suuid()
        });
        obj.idx = obj.cfg.roles.length - 1;
        updateData();
        updateView();
        return evt.stopPropagation();
      },
      "delete-role": function(){
        if (obj.cfg.roles.length <= 1) {
          return alert("最少要有一個角色");
        } else if (~obj.idx) {
          obj.cfg.roles.splice(obj.idx, 1);
          obj.idx = -1;
          updateData();
          return updateView();
        }
      }
    });
    import$(viewConfig.action.keyup, {
      "role-name": function(arg$){
        var node, name, invalid;
        node = arg$.node;
        if (lc.role) {
          name = node.value;
          invalid = ~obj.cfg.roles.map(function(it){
            return it.name;
          }).indexOf(name) && lc.name !== name;
          node.classList.toggle('is-invalid', invalid);
          if (invalid) {
            return;
          }
          lc.role.name = node.value;
          updateData();
          return updateView();
        }
      }
    });
    import$(viewConfig.handler, {
      "list-view": function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('d-none', lc.type !== 'list');
      },
      "role-view": function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('d-none', lc.type !== 'role');
      },
      role: {
        list: function(){
          return obj.cfg.roles;
        },
        handler: function(arg$){
          var node, data, n;
          node = arg$.node, data = arg$.data;
          n = ld$.find(node, '.nav-link', 0);
          n.classList.toggle('active', data.name === lc.name);
          n.setAttribute('data-name', data.name);
          n.setAttribute('data-type', 'role');
          return n.innerText = data.name;
        }
      },
      "role-name": function(arg$){
        var node, name;
        node = arg$.node;
        node.classList.toggle('d-none', !~obj.idx);
        node.value = lc.role ? node.value = lc.name : '';
        name = node.value;
        return node.classList.toggle('is-invalid', ~obj.cfg.roles.map(function(it){
          return it.name;
        }).indexOf(name) && lc.name !== name);
      },
      "role-desc": {
        list: function(){
          return obj.cfg.roles;
        },
        action: {
          keyup: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            data.desc = editableInput(node);
            return updateData(true);
          }
        },
        handler: function(arg$){
          var node, data;
          node = arg$.node, data = arg$.data;
          node.innerText = data.desc || '';
          node.setAttribute('data-name', data.name);
          return node.classList.toggle('d-none', data.name !== lc.name);
        }
      },
      "role-all": function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('active', lc.type === 'list');
      },
      "role-desc-all": function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('d-none', lc.type !== 'list');
      }
    });
    import$(viewConfig.action.click, {
      'switch': function(arg$){
        var node, evt, c, ref$;
        node = arg$.node, evt = arg$.evt;
        node.classList.toggle('on');
        c = (ref$ = obj.cfg.roles[obj.idx]).config || (ref$.config = {});
        if (!c) {
          return;
        }
        c[node.getAttribute('data-name')] = node.classList.contains('on');
        return updateData();
      }
    });
    import$(viewConfig.handler, {
      'switch': function(arg$){
        var node, ref$;
        node = arg$.node;
        if (!lc.role) {
          return;
        }
        return node.classList.toggle('on', !!((ref$ = lc.role).config || (ref$.config = {}))[node.getAttribute('data-name')]);
      }
    });
    import$(viewConfig.handler, {
      user: {
        list: function(){
          if (!lc.role) {
            return obj.cfg.roles.map(function(r){
              return r.list.map(function(it){
                return it.perm = r.name, it;
              });
            }).reduce(function(a, b){
              return a.concat(b);
            }, []);
          } else {
            return (lc.role.list || []).map(function(it){
              return it.perm = lc.role.name, it;
            });
          }
        },
        init: function(arg$){
          var node, local, data;
          node = arg$.node, local = arg$.local, data = arg$.data;
          return local.view = new ldView({
            root: node,
            context: data,
            action: {
              click: {
                'delete': function(){
                  var idx, list;
                  idx = obj.cfg.roles.map(function(it){
                    return it.name;
                  }).indexOf(data.perm);
                  if (!~idx) {
                    return;
                  }
                  list = obj.cfg.roles[idx].list;
                  if (!~list.indexOf(data)) {
                    return;
                  }
                  list.splice(list.indexOf(data), 1);
                  updateData();
                  return updateView();
                }
              }
            },
            text: {
              name: function(arg$){
                var context;
                context = arg$.context;
                return context.displayname;
              },
              key: function(arg$){
                var context;
                context = arg$.context;
                if (context.type === 'user') {
                  return "用戶代碼: " + context.key;
                } else if (context.type === 'email') {
                  return "郵件位址: " + context.key;
                } else if (context.type === 'token') {
                  return context.key;
                } else {
                  return "";
                }
              },
              role: function(arg$){
                var context;
                context = arg$.context;
                return context.perm;
              }
            },
            handler: {
              avatar: function(arg$){
                var node, context;
                node = arg$.node, context = arg$.context;
                if (context.type === 'user') {
                  return node.style.backgroundImage = "url(/dash/s/avatar/" + context.key + ".png)";
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
    });
    import$(viewConfig.action.click, {
      "newuser-toggle": function(arg$){
        var node;
        node = arg$.node;
        return view.getAll('newuser').map(function(it){
          return it.classList.toggle('d-none');
        });
      },
      "batch-add": function(arg$){
        var node, local, close, batchAdd;
        node = arg$.node, local = arg$.local;
        close = function(){
          local.view.get('list').value = '';
          return ldcvmgr.toggle('batch-add-user', false);
        };
        batchAdd = function(){
          var ret;
          ret = (local.view.get('list').value || '').split(/\s|,/).map(function(it){
            return it.trim();
          });
          ret = (local.view.get('list').value || '').split(/\s|,/).map(function(it){
            return it.trim();
          }).filter(function(it){
            return it && isEmail(it);
          }).map(function(it){
            return addUser({
              type: 'email',
              displayname: it,
              key: it
            }, false);
          }).filter(function(it){
            return !it;
          });
          if (ret.length) {
            alert("some email already exist");
          }
          updateData();
          updateView();
          return ldcvmgr.toggle('batch-add-user', false);
        };
        return Promise.resolve().then(function(){
          var this$ = this;
          if (local.view) {
            return;
          }
          return ldcvmgr.getdom('batch-add-user').then(function(dom){
            return local.view = new ldView({
              root: dom,
              action: {
                click: {
                  cancel: function(){
                    return close();
                  },
                  add: function(){
                    return batchAdd();
                  }
                }
              }
            });
          });
        }).then(function(){
          return ldcvmgr.toggle('batch-add-user', true);
        });
      },
      "newtoken-add": function(arg$){
        var node, role, payload;
        node = arg$.node;
        role = (lc.type === 'list'
          ? lc.pickedRole
          : lc.role) || obj.cfg.roles[0];
        if (!role) {
          return;
        }
        payload = {
          role: role.key
        };
        if (this$.org) {
          payload.org = this$.org.slug;
        }
        if (this$.brd) {
          payload.brd = this$.brd.slug;
        }
        return auth.recaptcha.get().then(function(recaptcha){
          payload.recaptcha = recaptcha;
          return ld$.fetch("/dash/api/token", {
            method: 'POST'
          }, {
            json: payload,
            type: 'json'
          });
        }).then(function(r){
          var id, picked, len, entry;
          r == null && (r = {});
          if (!(r.id && r.token)) {
            return Promise.reject(new ldError(400));
          }
          id = r.id + ":1";
          picked = {
            key: id,
            displayname: "連結邀請碼",
            type: 'token'
          };
          len = obj.cfg.roles.map(function(it){
            return it.list;
          }).reduce(function(a, b){
            return a.concat(b);
          }, []).filter(function(it){
            return it.type === picked.type && it.key === picked.key;
          }).length;
          if (len) {
            return alert("user already exist");
          }
          entry = (picked.perm = role.name, picked);
          role.list.push(entry);
          updateData();
          updateView();
          return ldcvmgr.getdom('token-link').then(function(dom){
            ld$.find(dom, '[ld=token-link]', 0).innerText = "https://" + window.location.hostname + "/dash/token/" + r.token;
            return ldcvmgr.toggle('token-link');
          });
        })['catch'](error());
      },
      "newuser-add": function(arg$){
        var node, evt, picked;
        node = arg$.node, evt = arg$.evt;
        if (!(picked = this$.ctrl.search.get())) {
          return;
        }
        return addUser(picked);
      }
    });
    import$(viewConfig.handler, {
      "newuser-role-picked": function(arg$){
        var node;
        node = arg$.node;
        if (!lc.pickedRole) {
          lc.pickedRole = obj.cfg.roles[0];
        }
        if (lc.pickedRole) {
          return node.innerText = lc.pickedRole.name;
        }
      },
      "newuser-role-option": {
        list: function(){
          return obj.cfg.roles;
        },
        action: {
          click: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            lc.pickedRole = data;
            return view.render('newuser-role-picked');
          }
        },
        handler: function(arg$){
          var node, data;
          node = arg$.node, data = arg$.data;
          return node.innerText = data.name;
        }
      }
    });
    updateDataDebounced = debounce(500, function(){
      return updateData();
    });
    updateData = function(deb){
      if (deb) {
        return updateDataDebounced();
      } else {
        return this$.opsOut(function(){
          return this$.obj.cfg;
        });
      }
    };
    view = new ldView(viewConfig);
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.obj.cfg = JSON.parse(JSON.stringify(data || {}));
      if (!this.obj.cfg.roles) {
        this.obj.cfg.roles = [];
      }
      this.obj.cfg.roles.map(function(it){
        if (!it.key) {
          return it.key = suuid();
        }
      });
      return this.updateView();
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}