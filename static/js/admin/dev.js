// Generated by LiveScript 1.3.0
ldc.register('adminDev', ['error', 'loader', 'notify', 'ldcvmgr', 'auth', 'sdbAdapter'], function(arg$){
  var error, loader, notify, ldcvmgr, auth, sdbAdapter, Ctrl;
  error = arg$.error, loader = arg$.loader, notify = arg$.notify, ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var this$ = this;
    window.adminDev = {
      get: function(){
        return this$.data;
      },
      set: function(it){
        this$.data = JSON.parse(JSON.stringify(it));
        return this$.opsOut(function(){
          return this$.data;
        });
      }
    };
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      return this.data = JSON.parse(JSON.stringify(data));
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}