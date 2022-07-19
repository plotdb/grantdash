(function(){
  var rsp;
  rsp = function(){
    return this;
  };
  rsp.cache = function(o){
    return window.eval(o.code);
  };
  rsp.prototype = import$(Object.create(Object.prototype), {
    init: function(){},
    registry: function(){},
    load: function(libs, dctx){
      dctx == null && (dctx = {});
      import$(dctx, window);
      dctx.ctx = function(){
        return this;
      };
      return Promise.resolve(dctx);
    },
    context: function(libs, func, px){
      px.ldcover = window.ldcover;
      if (func != null) {
        func(px);
      }
      return Promise.resolve(px);
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = rsp;
  } else if (typeof window != 'undefined' && window !== null) {
    window.rescope = rsp;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
