// Generated by LiveScript 1.3.0
(function(){
  var permcheck, aux, perm, stage;
  permcheck = require('permcheck');
  aux = require('../aux');
  perm = {
    cache: {},
    perm: {},
    supportedTypes: ['org', 'brd', 'prj', 'post'],
    invalidate: function(arg$){
      var type, slug, ref$;
      type = arg$.type, slug = arg$.slug;
      ((ref$ = this.cache)[type] || (ref$[type] = {}))[slug] = {};
      return ((ref$ = this.perm)[type] || (ref$[type] = {}))[slug] = null;
    },
    check: function(arg$){
      var io, user, type, slug, action, this$ = this;
      io = arg$.io, user = arg$.user, type = arg$.type, slug = arg$.slug, action = arg$.action;
      return Promise.resolve().then(function(){
        var ref$, ref1$, p, that;
        if (!(user && user.key && slug && in$(type, this$.supportedTypes))) {
          return Promise.reject();
        }
        if (((ref$ = (ref1$ = this$.cache)[type] || (ref1$[type] = {}))[slug] || (ref$[slug] = {}))[user.key] != null) {
          return this$.cache[type][slug][user.key]
            ? true
            : Promise.reject();
        }
        p = (that = ((ref$ = this$.perm)[type] || (ref$[type] = {}))[slug])
          ? Promise.resolve(that)
          : io.query("select owner, detail->'perm' as perm from " + type + " where slug = $1", [slug]).then(function(r){
            var ret, ref$;
            r == null && (r = {});
            if (!(ret = (r.rows || (r.rows = []))[0])) {
              return Promise.reject();
            }
            return ((ref$ = this$.perm)[type] || (ref$[type] = {}))[slug] = ret;
          });
        return p.then(function(ret){
          var perm, ref$, role;
          if (user.key === ret.owner) {
            return;
          }
          perm = (ref$ = ret.perm || (ret.perm = {})).roles || (ref$.roles = []);
          role = {
            user: [user.key]
          };
          return permcheck({
            role: role,
            perm: perm
          }).then(function(cfg){
            if (!(cfg && cfg[action])) {
              return Promise.reject();
            }
          });
        });
      }).then(function(){
        var ref$, ref1$;
        return ((ref$ = (ref1$ = this$.cache)[type] || (ref1$[type] = {}))[slug] || (ref$[slug] = {}))[user.key] = true;
      })['catch'](function(e){
        var ref$;
        ((ref$ = permcache[type] || (permcache[type] = {}))[slug] || (ref$[slug] = {}))[user.key] = false;
        if (e && e.id !== 1012) {
          console.log("[sharedb access error]", e);
        }
        return Promise.reject(e || new lderror(1012));
      });
    },
    sharedb: function(arg$){
      var io, user, id, data, type, action, ref$, slug;
      io = arg$.io, user = arg$.user, id = arg$.id, data = arg$.data, type = arg$.type, action = arg$.action;
      if (!id) {
        return Promise.resolve();
      }
      ref$ = id.split('/'), type = ref$[0], slug = ref$[1];
      return this.check({
        io: io,
        user: user,
        type: type,
        slug: slug,
        action: action
      });
    }
  };
  stage = {
    cache: {},
    supportedTypes: ['brd'],
    invalidate: function(arg$){
      var type, slug, ref$;
      type = arg$.type, slug = arg$.slug;
      return ((ref$ = this.cache)[type] || (ref$[type] = {}))[slug] = null;
    },
    check: function(arg$){
      var io, type, slug, this$ = this;
      io = arg$.io, type = arg$.type, slug = arg$.slug;
      return Promise.resolve().then(function(){
        var that, ref$;
        if (in$(!type, this$.supportedTypes)) {
          return aux.reject(400);
        }
        if (!slug) {
          return aux.reject(400);
        }
        if (that = ((ref$ = this$.cache)[type] || (ref$[type] = {}))[slug]) {
          return that;
        }
        return io.query("select detail->'stage' as stage from brd where slug = $1", [slug]).then(function(r){
          var ret, stage, cfgs;
          r == null && (r = {});
          ret = (r.rows || (r.rows = []))[0];
          stage = (ret.stage || (ret.stage = {})).list || [];
          cfgs = stage.filter(function(s){
            if (s.start && Date.now() < new Date(s.start).getTime()) {
              return false;
            }
            if (s.end && Date.now() > new Date(s.end).getTime()) {
              return false;
            }
            return true;
          });
          ret = cfgs[cfgs.length - 1] || {};
          if (!ret.config) {
            ret.config = {};
          }
          return this$.cache[type][slug] = ret;
        });
      });
    }
  };
  module.exports = {
    perm: perm,
    stage: stage
  };
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
