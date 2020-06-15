// Generated by LiveScript 1.3.0
(function(){
  var permcheck, lderror, aux, codedDomains, route, perm, stage;
  permcheck = require('permcheck');
  lderror = require('lderror');
  aux = require('../aux');
  codedDomains = {
    "grantdash.dev": {
      org: "grantdash-dev",
      brd: "test-brd",
      teamname: "Grant Dash Dev"
    },
    "grantdash.io": {
      teamname: "Grant Dash"
    },
    "taicca.grantdash.io": {
      teamname: "Taicca Dash"
    },
    "sch001.g0v.tw": {
      org: "g0v-jothon",
      brd: "sch001",
      teamname: "零時小學校"
    },
    "dash.taicca.tw": {
      org: "taicca.tw",
      teamname: "文化內容策進院"
    }
  };
  route = {
    cache: {
      domain: codedDomains || {},
      brd: {},
      prj: {}
    },
    check: function(arg$){
      var io, req, res, this$ = this;
      io = arg$.io, req = arg$.req, res = arg$.res;
      return Promise.resolve().then(function(){
        var pathname, domain, brd, prj, promise, that;
        pathname = req.originalUrl;
        domain = req.get("host");
        if (brd = /brd\/([^/?]+)/.exec(pathname)) {
          brd = brd[1];
        }
        if (prj = /prj\/([^/?]+)/.exec(pathname)) {
          prj = prj[1];
        }
        promise = brd
          ? (that = this$.cache.brd[brd])
            ? Promise.resolve(that)
            : io.query("select b.org from brd as b where b.slug = $1", [brd]).then(function(r){
              var ref$;
              r == null && (r = {});
              return this$.cache.brd[brd] = (ref$ = (r.rows || (r.rows = []))[0] || {}, ref$.brd = brd, ref$);
            })
          : prj
            ? (that = this$.cache.prj[prj])
              ? Promise.resolve(that)
              : io.query("select p.brd, b.org from prj as p, brd as b where b.slug = p.brd and p.slug = $1", [prj]).then(function(r){
                r == null && (r = {});
                return this$.cache.prj[prj] = (r.rows || (r.rows = []))[0] || {};
              })
            : Promise.resolve(null);
        return promise.then(function(pathCfg){
          var p, that;
          if (pathCfg && !pathCfg.org) {
            return aux.reject(400);
          }
          p = (that = this$.cache.domain[domain])
            ? Promise.resolve(that)
            : aux.reject(400);
          return p.then(function(domainCfg){
            var ref$;
            if (!domainCfg) {
              return aux.reject(400);
            }
            if (!pathCfg) {
              return domainCfg.domain = domain, domainCfg;
            }
            if ((pathCfg.org !== domainCfg.org || (domainCfg.brd && domainCfg.brd !== pathCfg.brd)) && domainCfg.org) {
              return aux.reject(400);
            }
            return ref$ = (pathCfg.teamname = domainCfg.teamname, pathCfg), ref$.domain = domain, ref$;
          });
        });
      });
    }
  };
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
      var io, user, type, slug, action, payload, this$ = this;
      io = arg$.io, user = arg$.user, type = arg$.type, slug = arg$.slug, action = arg$.action;
      action = Array.isArray(action)
        ? action
        : [action];
      payload = {
        role: {},
        perm: {}
      };
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
          var ref$;
          if (user.key === ret.owner) {
            return;
          }
          payload.perm = (ref$ = ret.perm || (ret.perm = {})).roles || (ref$.roles = []);
          return io.query("select id from perm where owner = $1", [user.key]).then(function(r){
            var token;
            r == null && (r = {});
            token = (r.rows || (r.rows = [])).map(function(it){
              return it.id;
            });
            payload.role = {
              user: [user.key],
              email: [user.username],
              token: token
            };
            return permcheck(payload);
          }).then(function(cfg){
            if (!cfg || !action.filter(function(it){
              return cfg[it];
            }).length) {
              return Promise.reject();
            }
          });
        });
      }).then(function(){
        var ref$, ref1$;
        return ((ref$ = (ref1$ = this$.cache)[type] || (ref1$[type] = {}))[slug] || (ref$[slug] = {}))[user.key] = true;
      })['catch'](function(e){
        var ref$, ref1$;
        ((ref$ = (ref1$ = this$.cache)[type] || (ref1$[type] = {}))[slug] || (ref$[slug] = {}))[user.key] = false;
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
    stage: stage,
    route: route
  };
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
