// Generated by LiveScript 1.3.0
ldc.register('adminMenu', ['sdbAdapter', 'loader'], function(arg$){
  var sdbAdapter, loader, Ctrl;
  sdbAdapter = arg$.sdbAdapter, loader = arg$.loader;
  Ctrl = function(opt){
    var toc, update, setGroup, search, root, view, this$ = this;
    this.opt = opt;
    this.toc = toc = opt.toc;
    this.grps = [];
    this.update = update = debounce(500, function(){
      return this$.opsOut(function(){
        return this$.grps;
      });
    });
    this.setGroup = setGroup = function(grp){
      return opt.setGroup(grp);
    };
    search = debounce(function(val){
      toc.brdsFiltered = toc.brds.filter(function(it){
        return ~it.name.indexOf(val);
      });
      view.render();
      return view.get("brd-list").folder.fit();
    });
    root = ld$.find('[ld-scope=admin-menu]', 0);
    this.view = view = new ldView({
      root: root,
      action: {
        click: {
          "brd-bar": function(arg$){
            var node, ret;
            node = arg$.node;
            ret = view.get("brd-list").folder.toggle();
            return view.render('brd-list-toggle');
          },
          "grp-add": function(arg$){
            var node;
            node = arg$.node;
            return this$.addGroup();
          }
        },
        input: {
          "brd-search": function(arg$){
            var node;
            node = arg$.node;
            return search(node.value);
          }
        }
      },
      text: {
        "org-name": function(){
          return toc.org.name;
        },
        "brd-name": function(){
          return toc.brd.name;
        },
        "brd-progress-text": function(){
          return "活動進行中";
        }
      },
      init: {
        "folder": function(arg$){
          var node, names;
          node = arg$.node, names = arg$.names;
          node.folder = new ldui.Folder({
            root: node
          });
          if (!toc.brd.key && in$("brd-list", names)) {
            return node.folder.toggle(true);
          }
        }
      },
      handler: {
        "brd-page": function(arg$){
          var node, name;
          node = arg$.node;
          name = node.getAttribute('data-name');
          if (name === 'landing') {
            return node.setAttribute('href', "/brd/" + toc.brd.slug + "/");
          } else if (name === 'list') {
            return node.setAttribute('href', "/dash/brd/" + toc.brd.slug + "/prj/list");
          } else if (name === 'new-prj') {
            return node.setAttribute('href', "/dash/brd/" + toc.brd.slug + "/prj/create");
          }
        },
        "org-menu": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !toc.org.slug);
        },
        "brd-progress": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('text-success', true);
        },
        "brd-list-toggle": function(arg$){
          var node;
          node = arg$.node;
          if (view) {
            return node.classList.toggle('on', view.get("brd-list").classList.contains("show"));
          }
        },
        "brd": function(arg$){
          var node, ref$, ref1$;
          node = arg$.node;
          return node.classList.toggle('d-none', !(ref$ = !toc.brd.key) !== !(ref1$ = ~node.getAttribute('ld').indexOf('empty')) && (ref$ || ref1$));
        },
        "brds": function(arg$){
          var node, ref$, ref1$;
          node = arg$.node;
          return node.classList.toggle('d-none', !(ref$ = !toc.brds.length) !== !(ref1$ = ~node.getAttribute('ld').indexOf('empty')) && (ref$ || ref1$));
        },
        "brd-entry": {
          list: function(){
            return toc.brdsFiltered;
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            ld$.find(node, 'span', 0).innerText = data.name;
            ld$.find(node, '.text-sm', 0).innerText = data.description.substring(0, 30) + "...";
            return node.setAttribute('href', "/b/" + data.slug + "/admin");
          }
        },
        "grp-entry": {
          key: function(it){
            return it.key;
          },
          list: function(){
            return this$.grps || [];
          },
          init: function(arg$){
            var node, data, root;
            node = arg$.node, data = arg$.data;
            node.data = data;
            root = node;
            node.folder = new ldui.Folder({
              root: node
            });
            return node.view = new ldView({
              root: node,
              handler: {
                name: function(arg$){
                  var node, ref$;
                  node = arg$.node;
                  return node.innerText = ((ref$ = root.data).info || (ref$.info = {})).name || '新分組';
                }
              },
              action: {
                click: {
                  "nav-tab": function(arg$){
                    var node;
                    node = arg$.node;
                    return setGroup(data);
                  }
                }
              }
            });
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            node.data = data;
            return node.view.render('name');
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    deleteGroup: function(v){
      var grp;
      if (!(grp = this.grps.filter(function(it){
        return it.key === v;
      })[0])) {
        return;
      }
      if (this.grps.length === 1) {
        return;
      }
      this.grps.splice(this.grps.indexOf(grp), 1);
      this.setGroup(this.grps[0]);
      this.view.render('grp-entry');
      return this.update().now();
    },
    addGroup: function(){
      var i$, i, key;
      for (i$ = 0; i$ < 100; ++i$) {
        i = i$;
        key = suuid();
        if (!this.grps.filter(fn$).length) {
          break;
        }
      }
      if (this.grps.filter(function(it){
        return it.key === key;
      }).length) {
        throw new ldError(1011);
      }
      this.grps.push({
        key: key,
        info: {
          name: "新分組"
        }
      });
      this.view.render('grp-entry');
      return this.update().now();
      function fn$(it){
        return it.key === key;
      }
    },
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      this.grps = JSON.parse(JSON.stringify(data || []));
      if (!Array.isArray(data)) {
        this.grps = [];
      }
      return this.view.render();
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