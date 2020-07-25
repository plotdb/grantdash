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
    var deploy, slugs, saveSnapshot, api, app;
    deploy = common.deploy, slugs = common.slugs, saveSnapshot = common.saveSnapshot;
    api = engine.router.api;
    app = engine.app;
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
        action: ['judge', 'owner']
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
          return io.query("select p.key, p.slug from prj as p\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true", [brd, grp]);
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
    return api.get('/brd/:brd/grp/:grp/judge-list', function(req, res){
      var ref$, brd, grp;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp
      }, brd = ref$.brd, grp = ref$.grp;
      if (!(brd && grp)) {
        return aux.r400(res);
      }
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: brd
      }).then(function(c){
        var cfg;
        c == null && (c = {});
        cfg = c.config;
        if (!(cfg["judge-criteria"] || cfg["judge-primary"] || cfg["judge-final"])) {
          return Promise.reject(new lderror(1016));
        }
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: brd,
          action: ['judge', 'owner']
        });
      }).then(function(){
        return io.query("select p.key, p.name, p.slug, p.detail->'info' as info, u.displayname as ownername from prj as p\nleft join users as u on u.key = p.owner\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true", [brd, grp]);
      }).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    });
  });
}).call(this);
