(function(){
  var local;
  local = {};
  module.exports = function(key){
    var k, v, hash;
    if (typeof key === 'object') {
      return "?" + (function(){
        var ref$, results$ = [];
        for (k in ref$ = key) {
          v = ref$[k];
          results$.push([k, v]);
        }
        return results$;
      }()).map(function(it){
        return encodeURIComponent(it[0]) + "=" + encodeURIComponent(it[1]);
      }).join('&');
    }
    if (!(hash = local.querystring)) {
      local.querystring = hash = {};
      (window.location.search || "").replace(/^\?/, '').split('&').map(function(it){
        return decodeURIComponent(it).split('=');
      }).map(function(it){
        return hash[it[0]] = it[1];
      });
    }
    return key ? hash[key] : hash;
  };
}).call(this);
