// Generated by LiveScript 1.3.0
(function(){
  ldc.register('admin', ['viewLocals', 'orgInfo', 'orgPerm', 'brdInfo', 'loader'], function(arg$){
    var viewLocals, orgInfo, orgPerm, brdInfo, loader, lc, sdb, watch, ret, id, init, watchBoard, initBoard;
    viewLocals = arg$.viewLocals, orgInfo = arg$.orgInfo, orgPerm = arg$.orgPerm, brdInfo = arg$.brdInfo, loader = arg$.loader;
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
    if (ret) {
      id = "org-" + (ret ? ret[1] : 'demo');
      init = function(){
        loader.on();
        return sdb.get({
          id: id,
          watch: watch
        }).then(function(doc){
          lc.doc = doc;
          console.log(doc.data);
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
    watchBoard = function(ops, source){
      return brdInfo.watch({
        ops: ops,
        source: source
      });
    };
    ret = /b\/([0-9]+)/.exec(window.location.pathname);
    if (ret) {
      id = "board-" + (ret ? ret[1] : 'demo');
      initBoard = function(){
        loader.on();
        return sdb.get({
          id: id,
          watch: watchBoard
        }).then(function(doc){
          lc.doc = doc;
          console.log(doc.data);
          brdInfo.init({
            doc: doc,
            sdb: sdb
          });
          return loader.off();
        });
      };
      initBoard();
    }
    return loader.off();
  });
  return ldc.app('admin');
})();