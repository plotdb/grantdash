// Generated by LiveScript 1.3.0
var slice$ = [].slice;
ldc.register('treemenu', ['sharetree', 'loader', 'editor'], function(arg$){
  var sharetree, loader, editor, lc, ldld, data, sdb, hubs, fetch;
  sharetree = arg$.sharetree, loader = arg$.loader, editor = arg$.editor;
  lc = {};
  ldld = new ldLoader({
    className: 'ldld full z-fixed'
  });
  ldld.on();
  data = {
    children: [
      {
        name: "page",
        children: [
          {
            name: "index.html"
          }, {
            name: "test.html"
          }
        ]
      }, {
        name: "style",
        children: [{
          name: "index.css"
        }]
      }, {
        name: "script",
        children: [{
          name: "index.js"
        }]
      }, {
        name: "widget",
        children: []
      }, {
        name: "asset",
        children: [{
          name: "thumb.png"
        }]
      }
    ]
  };
  sdb = new sharedbWrapper({
    url: {
      scheme: window.location.protocol.replace(':', ''),
      domain: window.location.host
    }
  });
  sdb.on('close', function(){
    ldld.on();
    return sdb.reconnect().then(function(){
      return init();
    }).then(function(){
      return ldld.off();
    });
  });
  hubs = {
    pages: new Hub({
      sdb: sdb
    }),
    file: new Hub({
      sdb: sdb
    })
  };
  fetch = function(name){
    ldld.on();
    return sdb.get({
      id: "brd/4/file[" + name + "]"
    }).then(function(doc){
      console.log("fetch brd/4/file[" + name + "]");
      if (hubs.file.doc) {
        hubs.file.doc.destroy();
      }
      hubs.file.doc = doc;
      if (!lc.editor.adapter) {
        lc.editor.adapt({
          hub: hubs.file,
          path: []
        });
      } else {
        lc.editor.setDoc(doc);
      }
      return ldld.off();
    })['catch'](function(){
      return ldld.off();
    });
  };
  return sdb.get({
    id: 'brd/4/pages'
  }).then(function(doc){
    var tree;
    hubs.pages.doc = doc;
    lc.tree = tree = new sharetree({
      root: '[ld-scope=folder]',
      data: data
    });
    tree.adapt({
      hub: hubs.pages,
      path: []
    });
    lc.editor = new editor({
      root: '[ld-scope=editor]'
    });
    return tree.on('click', function(it){
      return fetch(it.name);
    });
  }).then(function(){
    return ldld.off();
  });
});
ldc.register('editor', ['sdbAdapter'], function(arg$){
  var tree, sdbAdapter, Ctrl;
  tree = arg$.tree, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var root, el, cm, bbox, sandbox, render, this$ = this;
    root = opt.root;
    this.root = root = typeof root === 'string'
      ? document.querySelector(root)
      : root ? root : null;
    this.el = el = {
      editor: ld$.find(this.root, '[ld-scope=edit]', 0),
      viewer: ld$.find(this.root, '[ld-scope=view]', 0)
    };
    this.cm = cm = CodeMirror(el.editor, {
      mode: 'javascript',
      lineNumbers: true,
      theme: 'ayu-mirage',
      lineWrapping: true,
      keyMap: "default",
      showCursorWhenSelecting: true,
      viewportMargin: Infinity
    });
    bbox = el.editor.getBoundingClientRect();
    cm.setSize(bbox.width, bbox.height);
    cm.setValue('');
    sandbox = new Sandbox({
      container: el.viewer,
      className: 'w-100 h-100 border-0',
      sandbox: 'allow-scripts allow-pointer-lock allow-modals'
    });
    cm.on('change', function(){
      this$.opsOut(function(){
        this$.data.content = cm.getValue();
        return this$.data;
      });
      return render();
    });
    render = function(){
      var html;
      html = cm.getValue();
      return sandbox.load({
        html: html,
        css: "",
        js: ""
      });
    };
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    render: function(){
      return this.cm.setValue((this.data || {}).content || '');
    },
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.data = JSON.parse(JSON.stringify(data));
      return this.render();
    }
  });
  return Ctrl;
});
ldc.register('sharetree', ['tree', 'sdbAdapter'], function(arg$){
  var tree, sdbAdapter, Ctrl;
  tree = arg$.tree, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var this$ = this;
    this.tree = new tree(opt);
    this.evtHandler = {};
    this.tree.on('update', function(){
      return this$.opsOut(function(){
        return this$.data;
      });
    });
    this.tree.on('click', function(it){
      return this$.fire('click', it);
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
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
    },
    opsIn: function(arg$){
      var data, ops, source, this$ = this;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      if (!data.children) {
        this.data = data = {
          children: [
            {
              name: "page",
              children: [
                {
                  name: "index.html"
                }, {
                  name: "test.html"
                }
              ]
            }, {
              name: "style",
              children: [{
                name: "index.css"
              }]
            }, {
              name: "script",
              children: [{
                name: "index.js"
              }]
            }, {
              name: "widget",
              children: []
            }, {
              name: "asset",
              children: [{
                name: "thumb.png"
              }]
            }
          ]
        };
        this.opsOut(function(){
          return this$.data;
        });
      } else {
        this.data = JSON.parse(JSON.stringify(data));
      }
      this.tree.setData(this.data);
      return this.tree.render();
    }
  });
  return Ctrl;
});
ldc.app('treemenu');
ldc.register('tree', [], function(){
  var Tree;
  Tree = function(opt){
    var root;
    this.opt = opt;
    this.data = opt.data;
    root = opt.root;
    this.root = root = typeof root === 'string'
      ? document.querySelector(root)
      : root ? root : null;
    this.sample = {
      item: ld$.find(root, '[ld-scope=sample-item]', 0),
      folder: ld$.find(root, '[ld-scope=sample-folder]', 0)
    };
    this.view = this.init({
      node: this.root,
      data: this.data
    });
    this.evtHandler = {};
    this.reb = new reblock({
      root: this.root
    });
    return this;
  };
  Tree.prototype = import$(Object.create(Object.prototype), {
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
    },
    setData: function(data){
      this.view.setContext({
        data: data
      });
      return this.view.render();
    },
    render: function(){
      return this.view.render();
    },
    init: function(arg$){
      var node, data, parent, sync, view, this$ = this;
      node = arg$.node, data = arg$.data, parent = arg$.parent;
      sync = function(){
        this$.fire('update');
        return this$.view.render();
      };
      return view = new ldView({
        context: {
          data: data,
          parent: parent
        },
        root: node,
        action: {
          input: function(arg$){
            var node, context, evt;
            node = arg$.node, context = arg$.context, evt = arg$.evt;
            return node.innerText = node.innerText;
          },
          dblclick: {
            name: function(arg$){
              var node, context, evt;
              node = arg$.node, context = arg$.context, evt = arg$.evt;
              return node.setAttribute('contenteditable', true);
            }
          },
          click: {
            add: function(arg$){
              var node, context, evt;
              node = arg$.node, context = arg$.context, evt = arg$.evt;
              context.data.children.push({
                name: "untitled.html"
              });
              sync();
              return evt.stopPropagation();
            },
            clone: function(arg$){
              var node, context, evt, list, newObj, name, i$, i, nn;
              node = arg$.node, context = arg$.context, evt = arg$.evt;
              list = context.parent.children;
              newObj = JSON.parse(JSON.stringify(context.data));
              name = newObj.name;
              for (i$ = 0; i$ <= 100; ++i$) {
                i = i$;
                nn = name.replace(/-(\d+)\.([^.]+)$/, "-" + i + ".$2");
                if (!list.filter(fn$).length) {
                  break;
                }
              }
              if (i === 100) {
                return alert("clone failed.");
              }
              newObj.name = nn;
              list.splice(list.indexOf(context.data), 0, newObj);
              return sync();
              function fn$(it){
                return it.name === nn;
              }
            },
            'delete': function(arg$){
              var node, context, evt, list;
              node = arg$.node, context = arg$.context, evt = arg$.evt;
              list = context.parent.children;
              list.splice(list.indexOf(context.data), 1);
              return sync();
            }
          }
        },
        handler: {
          name: function(arg$){
            var node, context;
            node = arg$.node, context = arg$.context;
            return node.innerText = context.data.name;
          },
          icon: function(arg$){
            var node, context;
            node = arg$.node, context = arg$.context;
            return node.classList.toggle('d-none', !!context.children);
          },
          list: {
            list: function(arg$){
              var context;
              context = arg$.context;
              return context.data.children;
            },
            action: {
              click: function(arg$){
                var node, data, context, evt;
                node = arg$.node, data = arg$.data, context = arg$.context, evt = arg$.evt;
                if (!node.classList.contains('folder-item')) {
                  return;
                }
                if (this$.active) {
                  this$.active.classList.toggle('active', false);
                }
                this$.active = node;
                node.classList.toggle('active', true);
                return this$.fire('click', data);
              }
            },
            init: function(arg$){
              var node, data, local, context, sample;
              node = arg$.node, data = arg$.data, local = arg$.local, context = arg$.context;
              sample = this$.sample[data.children ? 'folder' : 'item'].childNodes[0];
              node.setAttribute('class', sample.getAttribute('class'));
              node.setAttribute('draggable', true);
              node.innerHTML = sample.innerHTML;
              if (data.children) {
                local.folder = new ldui.Folder({
                  root: node
                });
              }
              return local.view = this$.init({
                node: node,
                data: data,
                parent: context.data
              });
            },
            handler: function(arg$){
              var local, data, context;
              local = arg$.local, data = arg$.data, context = arg$.context;
              local.view.setContext({
                data: data,
                parent: context.data
              });
              return local.view.render();
            }
          }
        }
      });
    }
  });
  return Tree;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}