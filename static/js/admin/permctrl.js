// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('permctrl', [], function(){
    var prepare;
    prepare = function(ctrlOpt){
      var lc, obj, toggleRole, updateView, viewConfig, view, adopter, updateDataDebounced, updateData;
      lc = {
        type: 'list'
      };
      obj = {
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
      updateView = function(){
        toggleRole();
        return view.render();
      };
      viewConfig = {
        root: ctrlOpt.root,
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
            list: []
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
              data.desc = node.innerText;
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
          handler: function(arg$){
            var node, data, that;
            node = arg$.node, data = arg$.data;
            ld$.find(node, 'b', 0).innerText = data.name;
            if (that = ld$.find(node, '.text-muted', 0)) {
              return that.innerText = data.perm;
            }
          },
          action: {
            click: function(arg$){
              var node, data, evt, idx, list;
              node = arg$.node, data = arg$.data, evt = arg$.evt;
              if (!evt.target.classList.contains('i-close')) {
                return;
              }
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
        "newuser-add": function(arg$){
          var node, evt, role, user, idx;
          node = arg$.node, evt = arg$.evt;
          role = (lc.type === 'list'
            ? lc.pickedRole
            : lc.role) || obj.cfg.roles[0] || {
            name: ''
          };
          user = view.get('newuser-name').value;
          idx = obj.cfg.roles.map(function(it){
            return it.list;
          }).reduce(function(a, b){
            return a.concat(b);
          }, []).map(function(it){
            return it.name;
          }).indexOf(user);
          if (~idx) {
            return alert("user already exist");
          }
          role.list.push({
            name: user,
            perm: role.name
          });
          view.get('newuser-name').value = '';
          updateData();
          return updateView();
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
      view = new ldView(viewConfig);
      adopter = new Adopter({
        path: ctrlOpt.path
      });
      adopter.on('change', function(arg$){
        var ops, source;
        ops = arg$.ops, source = arg$.source;
        if (source) {
          return;
        }
        obj.cfg = adopter.data
          ? JSON.parse(JSON.stringify(adopter.data))
          : {};
        if (!obj.cfg.roles) {
          obj.cfg.roles = [];
        }
        return updateView();
      });
      updateDataDebounced = debounce(500, function(){
        return updateData();
      });
      updateData = function(deb){
        if (deb) {
          return updateDataDebounced();
        } else {
          return adopter.update(function(){
            return JSON.parse(JSON.stringify(obj.cfg));
          });
        }
      };
      return adopter;
    };
    return {
      prepare: prepare
    };
  });
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}