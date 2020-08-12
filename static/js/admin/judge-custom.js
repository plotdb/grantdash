// Generated by LiveScript 1.3.0
ldc.register('adminJudgeCustom', ['ldcvmgr', 'auth', 'sdbAdapter', 'error', 'adminPanel', 'adminEntry'], function(arg$){
  var ldcvmgr, auth, sdbAdapter, error, adminPanel, adminEntry, Ctrl;
  ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter, error = arg$.error, adminPanel = arg$.adminPanel, adminEntry = arg$.adminEntry;
  Ctrl = function(opt){
    var root, sample;
    opt == null && (opt = {});
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.brd = opt.brd;
    this.grp = null;
    this.data = {};
    sample = {
      name: "評選表",
      slug: suuid(),
      type: "score",
      enabled: false,
      anonymous: false,
      filter: ''
    };
    this.entry = new adminEntry({
      root: root,
      sample: sample
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    setData: function(grp){
      return this.grp = grp;
    },
    adapt: function(arg$){
      var hub, path, type;
      hub = arg$.hub, path = arg$.path, type = arg$.type;
      return this.entry.adapt({
        hub: hub,
        path: path,
        type: type
      });
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}