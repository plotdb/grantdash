// Generated by LiveScript 1.3.0
(function(){
  var sdb, hubs, firstChild;
  sdb = new sharedbWrapper({
    url: {
      scheme: window.location.protocol.replace(':', ''),
      domain: window.location.host
    }
  });
  sdb.on('close', function(){
    loader.on();
    return sdb.reconnect().then(function(){
      return init();
    }).then(function(){
      return loader.off();
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
  firstChild = function(n){
    var i$, ref$, len$, i, that;
    if (!n.children) {
      return [n];
    }
    for (i$ = 0, len$ = (ref$ = n.children).length; i$ < len$; ++i$) {
      i = ref$[i$];
      if (that = firstChild(i)) {
        return [n].concat(that);
      }
    }
  };
  sdb.get({
    id: "brd/4/pages",
    watch: function(ops, source){
      return hub.pages.fire('change', {
        ops: ops,
        source: source
      });
    }
  }).then(function(doc){
    var n;
    hub.pages.doc = doc;
    n = firstChild(doc.data.tree);
    if (!n) {
      return;
    }
    return sdb.get({
      id: "brd/4/pages[" + n.join('/') + "]",
      watch: function(ops, source){
        return hub.file.fire('change', {
          ops: ops,
          source: source
        });
      }
    });
  }).then(function(doc){
    return hub.file.doc = doc;
  });
  ldc.register('editor', [], function(){
    var files, tree, view, renderFolder, el, viewSample;
    files = {
      pages: [],
      styles: [],
      js: [],
      widgets: [],
      assets: []
    };
    tree = {
      children: [
        {
          name: "page",
          children: [{
            name: "index.html"
          }]
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
    view = renderFolder = function(arg$){
      var node, data, parent, rn, rootData, view;
      node = arg$.node, data = arg$.data, parent = arg$.parent;
      rn = node;
      rootData = data;
      return view = new ldView({
        root: node,
        action: {
          input: {
            name: function(arg$){
              var node, evt;
              node = arg$.node, evt = arg$.evt;
              return data.name = node.value;
            },
            url: function(arg$){
              var node, evt;
              node = arg$.node, evt = arg$.evt;
              return data.url = node.value;
            }
          },
          click: {
            clone: function(arg$){
              var node, evt, idx;
              node = arg$.node, evt = arg$.evt;
              idx = rn.pdata.children.indexOf(data);
              rn.pdata.children.splice(idx + 1, 0, JSON.parse(JSON.stringify(data)));
              rootView.render();
              return console.log(JSON.stringify(tree));
            },
            'delete': function(arg$){
              var node, evt, idx;
              node = arg$.node, evt = arg$.evt;
              idx = rn.pdata.children.indexOf(data);
              rn.pdata.children.splice(idx, 1);
              return rootView.render();
            },
            "toggle-fold": function(arg$){
              var node, evt, idx, children, newData;
              node = arg$.node, evt = arg$.evt;
              if (data.children) {
                idx = rn.pdata.children.indexOf(data);
                children = data.children;
                delete data.children;
                delete data.toggle;
                children = [JSON.parse(JSON.stringify(data))].concat(children);
                rn.pdata.children.splice.apply(rn.pdata.children, [idx, 1].concat(children));
                return rootView.render();
              } else {
                idx = rn.pdata.children.indexOf(data);
                newData = JSON.parse(JSON.stringify(data));
                newData.toggle = true;
                newData.children = [];
                rn.pdata.children.splice.apply(rn.pdata.children, [idx, 1].concat([newData]));
                return rootView.render();
              }
            }
          }
        },
        handler: {
          name: function(arg$){
            var node;
            node = arg$.node;
            return node.innerText = data.name;
          },
          url: function(arg$){
            var node;
            node = arg$.node;
            return node.value = data.url || '';
          },
          icon: function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !!data.children);
          },
          list: {
            list: function(){
              return data.children;
            },
            init: function(arg$){
              var node, data, des;
              node = arg$.node, data = arg$.data;
              des = viewSample.get(data.children ? 'folder' : 'item').childNodes[0];
              node.setAttribute('class', des.getAttribute('class'));
              node.setAttribute('draggable', true);
              node.innerHTML = des.innerHTML;
              if (data.children) {
                node.folder = new ldui.Folder({
                  root: node
                });
              }
              node.pdata = rootData;
              return node.view = renderFolder({
                node: node,
                data: data
              });
            },
            handler: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              if (node.view) {
                return node.view.render();
              }
            }
          }
        }
      });
    };
    el = {
      menu: ld$.find('[ld-scope=editor-menu]', 0),
      sample: ld$.find('[ld-scope=editor-menu-sample]', 0)
    };
    console.log(el);
    viewSample = new ldView({
      root: el.sample,
      handler: {
        item: function(){},
        folder: function(){}
      }
    });
    renderFolder({
      node: el.menu,
      data: tree
    });
    return ldc.action({
      get: function(){
        return console.log(editor.getContents());
      }
    });
  });
  return ldc.app('editor');
})();