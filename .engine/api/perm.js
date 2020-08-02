// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, readChunk, sharp, expressFormidable, uploadr, lderror, suuid, aux, cache, grecaptcha, throttle;
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
  aux = require('../aux');
  cache = require('./cache');
  grecaptcha = require('../util/grecaptcha');
  throttle = require('../util/throttle');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, app;
    api = engine.router.api;
    app = engine.app;
    /* permission detail
    api.post \/perm, aux.signed, (req, res) ->
      {brd,org} = req.body{brd,org}
      if !(brd or org) => return aux.r403 res
      type = if brd => \brd else \org
      slug = if brd => brd else org
      io.query """
      select p.role,p.type,p.ref,p.owner,u.username,u.displayname
      from perm as p, users as u
      where p.objtype = $1 and p.objslug = $2 and (
      (p.type = 'email' and u.username = p.ref)
      or (p.type = 'user' and u.key = p.ref::int)
      or (p.type = 'token' and u.key = p.owner)
      )
      """, [type, slug]
        .then (r={}) -> res.send r.[]rows
        .catch aux.error-handler res
    */
    api.post('/account', aux.signed, function(req, res){
      var name;
      if (!(name = req.body.name)) {
        return aux.r404(res);
      }
      name = (name + "").substring(0, 32);
      return io.query("select key,displayname from users where lower(displayname) ~ lower($1)", [name]).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    });
    api.get('/stage', function(req, res){
      var brd;
      brd = {
        brd: req.query.brd
      }.brd;
      if (!brd) {
        return aux.r400(res);
      }
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: brd
      }).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    api.post('/token', aux.signed, grecaptcha, function(req, res){
      var ref$, token, id, hint, slug, type, role;
      ref$ = [suuid(), suuid()], token = ref$[0], id = ref$[1];
      hint = {
        org: (ref$ = import$({}, req.body)).org,
        brd: ref$.brd,
        role: ref$.role
      };
      if (!(slug = hint.brd
        ? hint.brd
        : hint.org)) {
        return aux.r400(res);
      }
      if (!(type = hint.brd
        ? 'brd'
        : hint.org ? 'org' : null)) {
        return aux.r400(res);
      }
      if (!(role = hint.role)) {
        return aux.r400(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: type,
        slug: slug,
        action: 'owner'
      }).then(function(){
        return io.query("insert into permtoken (objtype, objslug, role, token, id) values ($1, $2, $3, $4, $5)", [type, slug, role, token, id]);
      }).then(function(){
        return res.send({
          id: id,
          token: token
        });
      })['catch'](aux.errorHandler(res));
    });
    app.get('/token/:token', function(req, res){
      var token;
      if (!(token = req.params.token)) {
        return aux.r400(res);
      }
      return res.render("auth/perm/claim.pug", {
        exports: {
          token: token
        }
      });
    });
    api.put('/token', aux.signed, function(req, res){
      var lc, token;
      lc = {};
      if (!(token = req.body.token)) {
        return aux.r400(res);
      }
      return io.query("select objtype, objslug, role, count, token, id, redeemspan, createdtime\nfrom permtoken where token = $1", [token]).then(function(r){
        var ret;
        r == null && (r = {});
        if (!(lc.ret = ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (Date.now() >= new Date(ret.createdtime).getTime() + ret.redeemspan * 1000) {
          io.query("delete from permtoken where token = $1", [token]).then(function(){
            return aux.reject(new ldError(1013));
          });
        }
        return io.query("insert into perm (objtype, objslug, role, type, ref, owner)\nvalues ($1, $2, $3, $4, $5, $6)\non conflict do nothing", [ret.objtype, ret.objslug, ret.role, 'token', ret.id + ":" + ret.count, req.user.key]);
      }).then(function(){
        var ret;
        ret = lc.ret;
        if (ret.count > 1) {
          return io.query("update permtoken set count = $1 where token = $2", [ret.count - 1, token]);
        } else {
          return io.query("delete from permtoken where token = $1", [token]);
        }
      }).then(function(){
        return res.send({});
      })['catch'](aux.errorHandler(res));
    });
    api.post('/judgetoken', grecaptcha, function(req, res){
      var ref$, token, id, brd, grp, email;
      if (!(req.user && req.user.key)) {
        return aux.r400(res);
      }
      ref$ = [suuid(), suuid()], token = ref$[0], id = ref$[1];
      ref$ = {
        brd: (ref$ = req.body).brd,
        grp: ref$.grp,
        email: ref$.email
      }, brd = ref$.brd, grp = ref$.grp, email = ref$.email;
      if (!(brd && grp)) {
        return aux.r400(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: brd,
        action: 'owner'
      }).then(function(){
        return io.query("insert into permtoken_judge (brd, grp, email, token, id) values ($1, $2, $3, $4, $5)", [brd, grp, email, token, id]);
      }).then(function(){
        return res.send({
          id: id,
          token: token
        });
      })['catch'](aux.errorHandler(res));
    });
    app.get('/judgetoken/:token', function(req, res){
      var token;
      if (!(token = req.params.token)) {
        return aux.r400(res);
      }
      return io.query("select email from permtoken_judge where token = $1", [token]).then(function(r){
        var ret;
        r == null && (r = {});
        if (ret = (r.rows || (r.rows = []))[0]) {
          return res.render("auth/perm/judge-claim.pug", {
            exports: {
              token: token,
              email: ret.email
            }
          });
        }
        if (!(req.user && req.user.key)) {
          return res.render("auth/perm/judge-fail.pug");
        }
        return io.query("select b.name,p.brd,p.grp from perm_judge as p\nleft join brd as b on b.slug = p.brd\nwhere p.owner = $1", [req.user.key]).then(function(r){
          r == null && (r = {});
          if (!(r.rows || (r.rows = [])).length) {
            return res.render("auth/perm/judge-fail.pug");
          }
          return res.render("auth/perm/judge-list.pug", {
            exports: r.rows || (r.rows = [])
          });
        });
      })['catch'](aux.errorHandler(res));
    });
    return api.put('/judgetoken', aux.signed, grecaptcha, function(req, res){
      var lc, token;
      lc = {};
      if (!(token = req.body.token)) {
        return aux.r400(res);
      }
      return io.query("select brd, grp, email, count, token, id, redeemspan, createdtime\nfrom permtoken_judge where token = $1", [token]).then(function(r){
        var ret;
        r == null && (r = {});
        if (!(lc.ret = ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (lc.ret.email !== req.user.username) {
          return aux.reject(403);
        }
        if (Date.now() >= new Date(ret.createdtime).getTime() + ret.redeemspan * 1000) {
          io.query("delete from permtoken_judge where token = $1", [token]).then(function(){
            return aux.reject(1013);
          });
        }
        return io.query("insert into perm_judge (brd, grp, type, id, owner)\nvalues ($1, $2, $3, $4, $5)\non conflict do nothing", [ret.brd, ret.grp, 1, ret.id + ":" + ret.count, req.user.key]);
      }).then(function(){
        var ret;
        ret = lc.ret;
        if (ret.count > 1) {
          return io.query("update permtoken_judge set count = $1 where token = $2", [ret.count - 1, token]);
        } else {
          return io.query("delete from permtoken_judge where token = $1", [token]);
        }
      }).then(function(){
        cache.perm.invalidateJudge({
          type: 'brd',
          slug: lc.ret.brd
        });
        return res.send({});
      })['catch'](aux.errorHandler(res));
    });
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
