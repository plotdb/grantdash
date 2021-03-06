// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, readChunk, sharp, expressFormidable, uploadr, lderror, nodegit, suuid, mimeTypes, aux, cache, common, grecaptcha, throttle;
  fs = require('fs');
  fsExtra = require('fs-extra');
  path = require('path');
  crypto = require('crypto');
  readChunk = require('read-chunk');
  sharp = require('sharp');
  expressFormidable = require('express-formidable');
  uploadr = require('uploadr');
  lderror = require('lderror');
  nodegit = require('nodegit');
  suuid = require('suuid');
  mimeTypes = require('mime-types');
  aux = require('../aux');
  cache = require('./cache');
  common = require('./common');
  grecaptcha = require('../util/grecaptcha');
  throttle = require('../util/throttle');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var deploy, slugs, saveSnapshot, api, app, permissionCheck;
    deploy = common.deploy, slugs = common.slugs, saveSnapshot = common.saveSnapshot;
    api = engine.router.api;
    app = engine.app;
    permissionCheck = function(arg$){
      var req, res, brd, grp, type;
      req = arg$.req, res = arg$.res, brd = arg$.brd, grp = arg$.grp, type = arg$.type;
      return Promise.resolve().then(function(){
        if (!(req.user && req.user.key)) {
          return aux.reject(403);
        }
        if (!(brd && grp)) {
          return aux.reject(400);
        }
        return cache.stage.check({
          io: io,
          type: 'brd',
          slug: brd
        });
      }).then(function(c){
        var cfg, p;
        c == null && (c = {});
        cfg = c.config;
        if (type && type !== 'custom' && !cfg["judge-" + type]) {
          return Promise.reject(new lderror(1016));
        }
        p = type === 'criteria'
          ? cache.perm.check({
            io: io,
            user: req.user,
            type: 'brd',
            slug: brd,
            action: ['reviewer', 'owner']
          })
          : Promise.reject();
        return p['catch'](function(){
          return cache.perm.check({
            io: io,
            user: req.user,
            type: 'brd',
            slug: brd,
            action: ['judge']
          })['catch'](function(){
            return io.query("select owner from perm_judge where brd = $1 and grp = $2 and owner = $3", [brd, grp, req.user.key]).then(function(r){
              r == null && (r = {});
              if (!(r.rows || (r.rows = [])).length) {
                return Promise.reject(new lderror(1016));
              }
            });
          });
        });
      });
    };
    app.get('/brd/:brd/grp/:grp/judge/custom/:slug/:lv', function(req, res){
      var lc, ref$, brd, grp, slug, lv, round, org;
      lc = {};
      ref$ = req.params, brd = ref$.brd, grp = ref$.grp, slug = ref$.slug, lv = ref$.lv, round = ref$.round;
      org = req.scope.org;
      return permissionCheck({
        req: req,
        res: res,
        brd: brd,
        grp: grp
      }).then(function(){
        return io.query("select (detail->'group') as group from brd where slug = $1 and deleted is not true", [brd]);
      }).then(function(r){
        var ref$, ref1$, ref2$, view;
        r == null && (r = {});
        if (!(lc.g = (((r.rows || (r.rows = []))[0] || {}).group || []).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        if (!(lc.j = ((ref$ = (ref1$ = (ref2$ = lc.g).judge || (ref2$.judge = {})).custom || (ref1$.custom = {})).entries || (ref$.entries = [])).filter(function(it){
          return it.slug === slug;
        })[0])) {
          return aux.reject(404);
        }
        if (!((ref$ = lc.j).config || (ref$.config = {})).enabled) {
          return Promise.reject(new lderror({
            ldcv: "not-yet-available"
          }, 1012));
        }
        view = "users/org/" + org + "/brd/" + brd + "/view/judge/" + lc.j.view + "-" + lv + ".pug";
        if (!fs.existsSync(view)) {
          return aux.reject(404);
        }
        return res.render(path.join('../..', view));
      })['catch'](aux.errorHandler(res));
    });
    api.put('/usermap/', function(req, res){
      var keys;
      if (!((keys = req.body.userkeys) && Array.isArray(keys))) {
        return aux.r400(res);
      }
      return io.query("select key,displayname from users where key = ANY($1::int[])", [keys]).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    });
    api.post('/brd/:brd/grp/:grp/judge/:type/publish', function(req, res){
      var type, ref$, brd, grp;
      type = {
        "criteria": "criteria",
        "primary": "shortlist",
        "winner": "final"
      }[req.params.type];
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp
      }, brd = ref$.brd, grp = ref$.grp;
      if (!type) {
        return aux.r403(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: brd,
        action: ['owner']
      }).then(function(){
        return io.query("select key,system from prj where brd = $1 and grp = $2", [brd, grp]);
      }).then(function(r){
        var list;
        r == null && (r = {});
        list = r.rows || (r.rows = []);
        list.map(function(it){
          var ref$;
          return ((ref$ = it.system || (it.system = {})).badge || (ref$.badge = {}))[type] = in$(it.key, req.body.prjs);
        });
        return io.query("with data as ( select unnest($1::int[]) as key, unnest($2::jsonb[]) as system )\nupdate prj set system = data.system from data where prj.key = data.key", [
          list.map(function(it){
            return it.key;
          }), list.map(function(it){
            return it.system;
          })
        ]);
      }).then(function(r){
        r == null && (r = {});
        return res.send();
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:brd/grp/:grp/judge/:type/result', function(req, res){
      var ref$, brd, grp, type;
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp,
        type: ref$.type
      }, brd = ref$.brd, grp = ref$.grp, type = ref$.type;
      return permissionCheck({
        req: req,
        res: res,
        brd: brd,
        grp: grp,
        type: type
      }).then(function(){
        return io.query("select data from snapshots where doc_id = $1", ["brd/" + brd + "/grp/" + grp + "/judge/" + type + "/"]);
      }).then(function(r){
        var ret;
        r == null && (r = {});
        if (!(ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        return res.send({
          data: ret
        });
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:brd/grp/:grp/judge/criteria/:scope', function(req, res){
      var lc, ref$, brd, grp, scope;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      lc = {};
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp,
        scope: ref$.scope
      }, brd = ref$.brd, grp = ref$.grp, scope = ref$.scope;
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: brd,
        action: ['owner']
      }).then(function(){
        return io.query("select detail from brd where slug = $1", [brd]);
      }).then(function(r){
        var grps, ref$, ref1$;
        r == null && (r = {});
        lc.brd = (r.rows || (r.rows = []))[0];
        grps = (ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = []);
        if (!(lc.grp = ((ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        return lc.criteria = (ref$ = lc.grp).criteria || (ref$.criteria = {});
      }).then(function(){
        return io.query("select data from snapshots where doc_id = $1", ["brd/" + brd + "/grp/" + grp + "/judge/criteria/"]);
      }).then(function(r){
        var data, ref$, k;
        r == null && (r = {});
        if (!(lc.data = data = (((ref$ = r.rows)[0] || (ref$[0] = [])) || {}).data)) {
          return res.send({});
        }
        return io.query("select key,displayname from users where key = ANY($1::int[])", [(function(){
          var results$ = [];
          for (k in data.user || (data.user = {})) {
            results$.push(k);
          }
          return results$;
        }())]).then(function(r){
          r == null && (r = {});
          lc.users = r.rows || (r.rows = []);
          return io.query("select p.key, p.slug from prj as p\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true", [brd, grp]);
        }).then(function(r){
          var prjs;
          r == null && (r = {});
          prjs = r.rows || (r.rows = []);
          return res.send({
            data: lc.data,
            users: lc.users,
            prjs: prjs,
            criteria: lc.criteria
          });
        });
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:brd/grp/:grp/judge/custom/:slug', function(req, res){
      var lc, ref$, brd, grp, slug;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      lc = {};
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp,
        slug: ref$.slug
      }, brd = ref$.brd, grp = ref$.grp, slug = ref$.slug;
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: brd,
        action: ['owner']
      }).then(function(){
        return io.query("select detail from brd where slug = $1", [brd]);
      }).then(function(r){
        var grps, ref$, ref1$, ref2$;
        r == null && (r = {});
        lc.brd = (r.rows || (r.rows = []))[0];
        grps = (ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = []);
        if (!(lc.grp = ((ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        if (!(lc.custom = ((ref$ = (ref1$ = (ref2$ = lc.grp).judge || (ref2$.judge = {})).custom || (ref1$.custom = {})).entries || (ref$.entries = [])).filter(function(it){
          return it.slug === slug;
        })[0])) {
          return aux.reject(404);
        }
        return lc.judges = (ref$ = (ref1$ = lc.grp).judgePerm || (ref1$.judgePerm = {})).list || (ref$.list = []);
      }).then(function(){
        return io.query("select data from snapshots where doc_id = $1", ["brd/" + brd + "/grp/" + grp + "/judge/custom/slug/" + slug]);
      }).then(function(r){
        var data, ref$;
        r == null && (r = {});
        if (!(lc.data = data = (((ref$ = r.rows)[0] || (ref$[0] = [])) || {}).data)) {
          return res.send({});
        }
        return io.query("select p.owner as key, p.id, u.displayname\nfrom perm_judge as p\nleft join users as u on u.key = p.owner\nwhere p.id = ANY($1::text[]) and p.brd = $2 and p.grp = $3", [
          lc.judges.map(function(it){
            return it.id;
          }), brd, grp
        ]).then(function(r){
          var hash;
          r == null && (r = {});
          hash = {};
          lc.judges.map(function(it){
            return hash[it.id] = it;
          });
          lc.users = r.rows || (r.rows = []);
          return lc.users.map(function(it){
            return it.name = (hash[it.id] || {}).name;
          });
        }).then(function(){
          return io.query("select p.key, p.slug, p.system from prj as p\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true", [brd, grp]);
        }).then(function(r){
          var prjs;
          r == null && (r = {});
          prjs = r.rows || (r.rows = []);
          if (lc.custom.filter) {
            prjs = prjs.filter(function(it){
              var ref$;
              return ((ref$ = it.system || (it.system = {})).badge || (ref$.badge = {}))[lc.custom.filter];
            });
          }
          return res.send({
            data: lc.data,
            users: lc.users,
            prjs: prjs
          });
        });
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:brd/grp/:grp/judge/:type/:scope', function(req, res){
      var lc, ref$, brd, grp, type, scope;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      lc = {};
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp,
        type: ref$.type,
        scope: ref$.scope
      }, brd = ref$.brd, grp = ref$.grp, type = ref$.type, scope = ref$.scope;
      if (!(type === 'primary' || type === 'final')) {
        return aux.r400(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: brd,
        action: ['owner']
      }).then(function(){
        return io.query("select detail from brd where slug = $1", [brd]);
      }).then(function(r){
        var grps, ref$, ref1$;
        r == null && (r = {});
        lc.brd = (r.rows || (r.rows = []))[0];
        grps = (ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = []);
        if (!(lc.grp = ((ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        return lc.judges = (ref$ = (ref1$ = lc.grp).judgePerm || (ref1$.judgePerm = {})).list || (ref$.list = []);
      }).then(function(){
        return io.query("select data from snapshots where doc_id = $1", ["brd/" + brd + "/grp/" + grp + "/judge/" + type + "/"]);
      }).then(function(r){
        var data, ref$;
        r == null && (r = {});
        if (!(lc.data = data = (((ref$ = r.rows)[0] || (ref$[0] = [])) || {}).data)) {
          return res.send({});
        }
        return io.query("select p.owner as key, p.id, u.displayname\nfrom perm_judge as p\nleft join users as u on u.key = p.owner\nwhere p.id = ANY($1::text[]) and p.brd = $2 and p.grp = $3", [
          lc.judges.map(function(it){
            return it.id;
          }), brd, grp
        ]).then(function(r){
          var hash;
          r == null && (r = {});
          hash = {};
          lc.judges.map(function(it){
            return hash[it.id] = it;
          });
          lc.users = r.rows || (r.rows = []);
          return lc.users.map(function(it){
            return it.name = (hash[it.id] || {}).name;
          });
        }).then(function(){
          return io.query("select p.key, p.slug, p.system from prj as p\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true", [brd, grp]);
        }).then(function(r){
          var prjs;
          r == null && (r = {});
          prjs = r.rows || (r.rows = []);
          return res.send({
            data: lc.data,
            users: lc.users,
            prjs: prjs
          });
        });
      })['catch'](aux.errorHandler(res));
    });
    return api.get('/brd/:brd/grp/:grp/judge-list/:type', function(req, res){
      var ref$, brd, grp, type;
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp,
        type: ref$.type
      }, brd = ref$.brd, grp = ref$.grp, type = ref$.type;
      return permissionCheck({
        req: req,
        res: res,
        brd: brd,
        grp: grp,
        type: type
      }).then(function(){
        return io.query("select p.key, p.name, p.slug, p.detail, p.detail->'info' as info, p.system, u.displayname as ownername\nfrom prj as p\nleft join users as u on u.key = p.owner\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true and\n  p.state = 'active'", [brd, grp]);
      }).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    });
  });
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
