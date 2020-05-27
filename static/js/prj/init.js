// Generated by LiveScript 1.3.0
ldc.register(['ldcvmgr', 'adminInfo', 'prjCreate', 'auth', 'error', 'loader'], function(arg$){
  var ldcvmgr, adminInfo, prjCreate, auth, error, loader, lc, key;
  ldcvmgr = arg$.ldcvmgr, adminInfo = arg$.adminInfo, prjCreate = arg$.prjCreate, auth = arg$.auth, error = arg$.error, loader = arg$.loader;
  loader.on();
  lc = {};
  key = {
    brd: 4,
    grp: 'grp-ppg7kz3njm'
  };
  return auth.get().then(function(){
    return ld$.fetch("/d/b/" + key.brd + "/form", {
      method: 'GET'
    }, {
      type: 'json'
    });
  }).then(function(brd){
    var ref$, root, n, showGrp, k, info, view;
    lc.brd = brd;
    lc.grps = (ref$ = brd.detail).group || (ref$.group = {});
    lc.grp = lc.grps[key.grp];
    console.log(lc.brd, lc.grp);
    if (!lc.grp) {
      return Promise.reject(new Error(1015));
    }
    root = ld$.find('[ld-scope=prj-create]', 0);
    console.log(root);
    n = ld$.find(root, 'input[name=brd]', 0);
    n.value = key.brd;
    n = ld$.find(root, 'input[name=grp]', 0);
    n.value = key.grp;
    showGrp = (function(){
      var results$ = [];
      for (k in lc.grps) {
        results$.push(k);
      }
      return results$;
    }()).length === 1 ? false : true;
    info = new adminInfo({
      root: root,
      type: 'prj'
    });
    return view = new ldView({
      root: root,
      handler: {
        "brd-name": function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = lc.brd.name;
        },
        "grp-name": function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = lc.grp.info.name;
        },
        "show-grp": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !showGrp);
        },
        "inited": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('invisible', false);
        }
      }
    });
  })['finally'](function(){
    return loader.off();
  })['catch'](error());
});