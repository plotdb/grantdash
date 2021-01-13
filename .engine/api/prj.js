// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, readChunk, sharp, expressFormidable, uploadr, lderror, suuid, cache, aux, throttle, grecaptcha;
  fs = require('fs');
  fsExtra = require('fs-extra');
  path = require('path');
  crypto = require('crypto');
  readChunk = require('read-chunk');
  sharp = require('sharp');
  expressFormidable = require('express-formidable');
  uploadr = require('uploadr');
  lderror = require('lderror');
  suuid = require('suuid');
  cache = require('./cache');
  aux = require('../aux');
  throttle = require('../util/throttle');
  grecaptcha = require('../util/grecaptcha');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, app, getPrj;
    api = engine.router.api;
    app = engine.app;
    getPrj = function(slug){
      return Promise.resolve().then(function(){
        if (!slug) {
          return aux.reject(400);
        }
        return io.query("select p.*,u.displayname as ownerName\nfrom prj as p, users as u\nwhere slug = $1 and p.owner = u.key and p.deleted is not true", [slug]);
      }).then(function(r){
        var prj;
        r == null && (r = {});
        if (!(prj = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        return prj;
      });
    };
    api.get("/prj/:slug/", function(req, res){
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: req.scope.brd,
        name: "prj-edit"
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: ['prj-edit-own']
        });
      }).then(function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'prj',
          slug: req.params.slug,
          action: ['owner']
        });
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: ['owner']
        });
      }).then(function(){
        return getPrj(req.params.slug);
      }).then(function(prj){
        prj == null && (prj = {});
        return res.send(prj);
      })['catch'](aux.errorHandler(res));
    });
    app.get('/prj/:slug/edit', function(req, res){
      var lc;
      lc = {};
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: req.scope.brd,
        name: "prj-edit"
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: ['prj-edit-own']
        });
      }).then(function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'prj',
          slug: req.params.slug,
          action: ['owner']
        });
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: ['owner']
        });
      })['catch'](function(){
        return Promise.reject(new lderror({
          ldcv: "not-yet-available"
        }, 1012));
      }).then(function(){
        return getPrj(req.params.slug);
      }).then(function(prj){
        lc.prj = prj;
        return io.query("select name,slug,org,detail from brd where slug = $1 and deleted is not true", [lc.prj.brd]);
      }).then(function(r){
        var brd, view, ref$, ref1$;
        r == null && (r = {});
        if (!(lc.brd = brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(400);
        }
        if (!(brd.detail.custom && brd.detail.custom.view)) {
          view = 'view/default/prj-edit.pug';
        } else {
          view = "view/" + brd.detail.custom.view + "/prj-edit.pug";
        }
        delete brd.detail;
        return res.render(view, (ref$ = (ref1$ = {
          prj: lc.prj,
          brd: lc.brd
        }, ref1$.exports = {
          prj: lc.prj,
          brd: lc.brd
        }, ref1$), ref$.domain = req.scope.domain, ref$));
      })['catch'](aux.errorHandler(res));
    });
    app.get('/prj/:slug', function(req, res){
      var lc;
      lc = {};
      return getPrj(req.params.slug).then(function(prj){
        lc.prj = prj;
        if (!(req.user && req.user.key && prj.owner === req.user.key)) {
          return cache.stage.check({
            io: io,
            type: 'brd',
            slug: req.scope.brd,
            name: "prj-view"
          });
        }
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: ['owner', 'judge', 'reviewer']
        });
      })['catch'](function(){
        if (!(req.user && req.user.key)) {
          return aux.reject(403);
        }
        return io.query("select key,grp from perm_judge where brd = $1 and owner = $2", [req.scope.brd, req.user.key]).then(function(r){
          r == null && (r = {});
          if (!(r.rows || (r.rows = [])).length) {
            return aux.reject(403);
          }
          return lc.judges = r.rows;
        });
      }).then(function(){
        if (!lc.prj.detail) {
          return aux.reject(404);
        }
        return io.query("select name,slug,org,detail from brd where slug = $1 and deleted is not true", [lc.prj.brd]);
      }).then(function(r){
        var brd, grp, ref$, ref1$, ref2$, view;
        r == null && (r = {});
        if (!(lc.brd = brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(400);
        }
        lc.grp = grp = (((ref$ = brd.detail || (brd.detail = {})).group || (ref$.group = {})) || []).filter(function(it){
          return it.key === lc.prj.grp;
        })[0];
        if (lc.judges && !lc.judges.filter(function(it){
          return it.grp === lc.grp.key;
        }).length) {
          return aux.reject(403);
        }
        lc.pageInfo = (ref$ = (ref1$ = (ref2$ = brd.detail || (brd.detail = {})).page || (ref2$.page = {})).info || (ref1$.info = {})).generic || (ref$.generic = {});
        if (!lc.grp) {
          return aux.reject(400);
        }
        lc.grp = grp = {
          form: grp.form,
          info: grp.info
        };
        if (!(brd.detail.custom && brd.detail.custom.view)) {
          view = (req.query || (req.query = {})).simple != null ? 'view/default/prj-view-simple.pug' : 'view/default/prj-view.pug';
        } else {
          view = (req.query || (req.query = {})).simple != null
            ? "view/" + brd.detail.custom.view + "/prj-view-simple.pug"
            : "view/" + brd.detail.custom.view + "/prj-view.pug";
        }
        delete brd.detail;
        return res.render(view, (ref$ = (ref1$ = {
          prj: lc.prj,
          grp: lc.grp,
          brd: lc.brd,
          pageInfo: lc.pageInfo
        }, ref1$.exports = {
          prj: lc.prj,
          brd: lc.brd,
          grp: lc.grp
        }, ref1$.simple = (req.query || (req.query = {})).simple != null, ref1$), ref$.domain = req.scope.domain, ref$));
      })['catch'](aux.errorHandler(res));
    });
    api.put('/prj/:slug/badge', aux.signed, function(req, res){
      var slug, body, badge;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      body = req.body || {};
      badge = {};
      ['criteria', 'shortlist', 'finalist', 'winner', 'special'].map(function(it){
        return badge[it] = !!body[it];
      });
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: req.scope.brd,
        action: 'owner'
      }).then(function(){
        return io.query("select system from prj where slug = $1 and brd = $2", [slug, req.scope.brd]);
      }).then(function(r){
        var prj, ref$;
        r == null && (r = {});
        if (!(prj = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        import$((ref$ = prj.system || (prj.system = {})).badge || (ref$.badge = {}), badge);
        return io.query("update prj set system = $2 where slug = $1", [slug, prj.system]);
      }).then(function(){
        return res.send({});
      })['catch'](aux.errorHandler(res));
    });
    api.put('/prj/:slug/state', aux.signed, function(req, res){
      var state, slug;
      state = req.body.value;
      if (!(state === 'pending' || state === 'active')) {
        return aux.r400(res);
      }
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: req.scope.brd,
        action: 'owner'
      }).then(function(){
        return io.query("update prj set state = $2 where slug = $1", [slug, state]);
      }).then(function(){
        return res.send({});
      })['catch'](aux.errorHandler(res));
    });
    api['delete']('/prj/:slug', aux.signed, function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: req.scope.brd,
        name: "prj-edit"
      }).then(function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'prj',
          slug: slug,
          action: 'owner'
        });
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: 'owner'
        });
      }).then(function(){
        return io.query("update prj set deleted = true where slug = $1", [slug]);
      }).then(function(){
        return res.send({});
      })['catch'](aux.errorHandler(res));
    });
    return api.post('/prj/', aux.signed, throttle.count.userMd, expressFormidable(), grecaptcha, function(req, res){
      var lc, ref$, name, description, brd, grp, thumb, slug;
      lc = {};
      ref$ = req.fields, name = ref$.name, description = ref$.description, brd = ref$.brd, grp = ref$.grp;
      if (!(brd && grp)) {
        return aux.r400(res);
      }
      thumb = (req.files["thumbnail[]"] || {}).path;
      slug = suuid();
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: brd,
        name: "prj-new"
      }).then(function(){
        return io.query("select org, slug, key, detail->'group' as group from brd where slug = $1", [brd]);
      }).then(function(r){
        var grpinfo, ref$;
        r == null && (r = {});
        if (!(lc.brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (!(grpinfo = ((ref$ = lc.brd).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        if (!lc.brd.org) {
          return aux.reject(404);
        }
        return io.query("insert into prj (name,description,brd,grp,slug,owner,state)\nvalues ($1,$2,$3,$4,$5,$6,'pending') returning key", [name, description, brd, grp, slug, req.user.key]);
      }).then(function(r){
        r == null && (r = {});
        lc.ret = ((r.rows || (r.rows = [])) || [])[0];
        if (!thumb) {
          return;
        }
        return new Promise(function(res, rej){
          var root;
          root = "users/org/" + lc.brd.org + "/prj/" + slug + "/upload";
          return fsExtra.ensureDir(root, function(e){
            if (e) {
              return rej(e);
            }
            return sharp(thumb).toFile(path.join(root, "thumb.png"), function(e, i){
              if (e) {
                return rej(e);
              } else {
                return res();
              }
            });
          });
        });
      }).then(function(){
        var ref$;
        return res.send((ref$ = lc.ret || {}, ref$.slug = slug, ref$));
      })['catch'](aux.errorHandler(res));
    });
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
