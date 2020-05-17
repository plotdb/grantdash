// Generated by LiveScript 1.3.0
(function(){
  ldc.register('admin', ['viewLocals', 'orgInfo', 'orgPerm', 'brdInfo', 'prjInfo', 'loader', 'util'], function(arg$){
    var viewLocals, orgInfo, orgPerm, brdInfo, prjInfo, loader, util, lc, sdb, watch, ret, that, id, init, prjgView, watchBoard, initBoard;
    viewLocals = arg$.viewLocals, orgInfo = arg$.orgInfo, orgPerm = arg$.orgPerm, brdInfo = arg$.brdInfo, prjInfo = arg$.prjInfo, loader = arg$.loader, util = arg$.util;
    loader.on();
    lc = {};
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
    watch = function(ops, source){
      orgInfo.watch({
        ops: ops,
        source: source
      });
      return orgPerm.watch({
        ops: ops,
        source: source
      });
    };
    ret = /o\/([0-9]+)/.exec(window.location.pathname);
    if (that = !ret && util.parseQuerystring('o')) {
      ret = ['', that];
    }
    if (ret) {
      id = "org-" + (ret ? ret[1] : 'demo');
      init = function(){
        loader.on();
        return sdb.get({
          id: id,
          watch: watch
        }).then(function(doc){
          lc.doc = doc;
          orgInfo.init({
            doc: doc,
            sdb: sdb
          });
          orgPerm.init({
            doc: doc,
            sdb: sdb
          });
          return loader.off();
        });
      };
      init();
    }
    prjgView = new ldView({
      initRender: false,
      root: ".project-groups",
      action: {
        click: {
          "project-group-add": function(arg$){
            var node, data, ops;
            node = arg$.node;
            data = JSON.parse(JSON.stringify(lc.docbrd.data));
            (data.group || (data.group = [])).push({
              key: (data.group || (data.group = [])).length + 1,
              name: "新分組"
            });
            ops = sdb.json.diff(lc.docbrd.data, data);
            lc.docbrd.submitOp(ops);
            return prjgView.render();
          }
        }
      },
      handler: {
        "nav-tab": function(arg$){
          var node;
          node = arg$.node;
        },
        "project-group": {
          list: function(){
            return lc.docbrd.data.group || [];
          },
          init: function(arg$){
            var node, view;
            node = arg$.node;
            return view = new ldView({
              root: node,
              action: {
                click: {
                  "nav-tab": function(arg$){
                    var node, p, key, idx;
                    node = arg$.node;
                    if (!(p = ld$.parent(node, '.folder', this.root))) {
                      return;
                    }
                    key = p.getAttribute('data-prj-key');
                    idx = 0;
                    lc.docbrd.data.group.map(function(d, i){
                      if (d.key === +key) {
                        return idx = i;
                      }
                    });
                    return prjInfo.set({
                      path: ['group', idx]
                    });
                  }
                }
              }
            });
          },
          handler: function(arg$){
            var node, data, n;
            node = arg$.node, data = arg$.data;
            n = ld$.find(node, '[ld=name]', 0);
            node.setAttribute('data-prj-key', data.key);
            n.innerText = data.name;
            if (!node.folder) {
              return node.folder = new ldui.Folder({
                root: node
              });
            }
          }
        }
      }
    });
    watchBoard = function(ops, source){
      brdInfo.watch({
        ops: ops,
        source: source
      });
      prjInfo.watch({
        ops: ops,
        source: source
      });
      return prjgView.render();
    };
    ret = /b\/([0-9]+)/.exec(window.location.pathname);
    if (that = !ret && util.parseQuerystring('b')) {
      ret = ['', that];
    }
    if (ret) {
      id = "board-" + (ret ? ret[1] : 'demo');
      initBoard = function(){
        loader.on();
        return sdb.get({
          id: id,
          watch: watchBoard
        }).then(function(doc){
          lc.docbrd = doc;
          brdInfo.init({
            doc: lc.docbrd,
            sdb: sdb
          });
          prjInfo.init({
            doc: lc.docbrd,
            sdb: sdb
          });
          prjgView.render();
          return loader.off();
        });
      };
      initBoard();
    }
    return loader.off();
  });
  return ldc.app('admin');
})();