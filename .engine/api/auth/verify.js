// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, crypto, expressRateLimit, lderror, aux, mail;
  fs = require('fs');
  fsExtra = require('fs-extra');
  crypto = require('crypto');
  expressRateLimit = require('express-rate-limit');
  lderror = require('lderror');
  aux = require('../../aux');
  mail = require('../util/mail');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var throttling;
    throttling = {
      send: expressRateLimit({
        windowMs: 30 * 60 * 1000,
        max: 10,
        keyGenerator: aux.throttling.key
      })
    };
    engine.router.api.post('/me/mail/verify', throttling.send, function(req, res){
      var obj;
      obj = {};
      if (!(req.user && req.user.key && req.user.username)) {
        return aux.r400(res, "not login.");
      }
      return io.query("select key from users where key = $1", [req.user.key]).then(function(r){
        var time;
        r == null && (r = {});
        if ((r.rows || (r.rows = [])).length === 0) {
          return aux.reject(404);
        }
        time = new Date();
        obj.key = r.rows[0].key;
        obj.hex = (r.rows[0].key + "-") + crypto.randomBytes(30).toString('hex');
        obj.time = time;
        return io.query("delete from mailverifytoken where owner=$1", [obj.key]);
      }).then(function(){
        return io.query("insert into mailverifytoken (owner,token,time) values ($1,$2,$3)", [obj.key, obj.hex, obj.time]);
      }).then(function(){
        return mail.byTemplate('mail-verify', req.user.username, {
          token: obj.hex,
          domain: 'grantdash.io',
          teamname: 'Grant Dash'
        }, {
          now: true
        });
      }).then(function(){
        return res.send();
      })['catch'](aux.errorHandler(res, true));
    });
    return engine.app.get('/me/mail/verify/:token', function(req, res){
      var local, token;
      local = {};
      token = req.params.token;
      if (!token) {
        return aux.r400(res, "", true);
      }
      return io.query("select owner,time from mailverifytoken where token = $1", [token]).then(function(r){
        var obj;
        r == null && (r = {});
        if (!(r.rows || (r.rows = [])).length) {
          return aux.reject(403, "");
        }
        local.obj = obj = r.rows[0];
        return io.query("delete from mailverifytoken where owner = $1", [obj.owner]);
      }).then(function(){
        var verified;
        if (new Date().getTime() - new Date(local.obj.time).getTime() > 1000 * 600) {
          return Promise.reject(new lderror(1013));
        }
        verified = {
          date: Date.now()
        };
        io.query("update users set verified = $2 where key = $1", [local.obj.owner, JSON.stringify(verified)]);
        if (req.user) {
          req.user.verified = verified;
          return new Promise(function(res, rej){
            req.logIn(req.user, function(){
              return res();
            });
            return null;
          });
        } else {
          return null;
        }
      }).then(function(){
        res.redirect('/dash/auth/mail/verify/done/');
        return null;
      })['catch'](function(e){
        if (e instanceof lderror && e.id === 1013) {
          res.redirect('/dash/auth/mail/verify/expire/');
          return null;
        } else {
          return aux.errorHandler(res, true)(e);
        }
      });
    });
  });
}).call(this);
