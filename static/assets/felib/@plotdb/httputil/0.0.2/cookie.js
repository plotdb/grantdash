(function(){
  module.exports = function(k, v, expire){
    var hash;
    if (v) {
      return document.cookie = (k + "=" + v) + (expire ? ";expires=" + expire : "");
    }
    hash = {};
    (document.cookie || '').split(';').map(function(it){
      return it.split('=').map(function(it){
        return it.trim();
      });
    }).map(function(it){
      return hash[decodeURIComponent(it[0])] = decodeURIComponent(it[1]);
    });
    return k ? hash[k] : hash;
  };
}).call(this);
