(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.httputil = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
(function(){
  var cookie, qs;
  cookie = require('./cookie');
  qs = require('./qs');
  module.exports = {
    cookie: cookie,
    qs: qs
  };
}).call(this);

},{"./cookie":1,"./qs":3}],3:[function(require,module,exports){
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

},{}]},{},[2])(2)
});
