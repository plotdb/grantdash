// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, crypto, readChunk, sharp, expressFormidable, aux, throttle, grecaptcha;
  fs = require('fs');
  fsExtra = require('fs-extra');
  crypto = require('crypto');
  readChunk = require('read-chunk');
  sharp = require('sharp');
  expressFormidable = require('express-formidable');
  aux = require('../aux');
  throttle = require('../util/throttle');
  grecaptcha = require('../util/grecaptcha');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, app, clearUserCookie, renderProfile;
    api = engine.router.api;
    app = engine.app;
    clearUserCookie = function(req, res){
      res.clearCookie('connect.sid', {
        path: '/',
        domain: "." + engine.config.domain
      });
      res.clearCookie('connect.sid', {
        path: '/'
      });
      ['localhost', 'loading.io', '.loading.io'].map(function(it){
        return res.clearCookie('connect.sid', {
          path: '/',
          domain: it
        });
      });
      return res.clearCookie('global', {
        path: '/',
        domain: "." + engine.config.domain
      });
    };
    api.post('/me/sync/', aux.signed, function(req, res){
      return res.send(req.user);
    });
    api.get('/me/reauth/', function(req, res){
      clearUserCookie(req, res);
      return res.send();
    });
    app.get('/authcheck/', function(req, res){
      var that;
      if (!(req.user && req.user.key)) {
        return res.redirect("/dash/auth/" + ((that = req.query.nexturl) ? "?nexturl=" + that : ''));
      } else {
        return res.redirect(req.query.nexturl || "/");
      }
    });
    app.get('/me/reauth/', function(req, res){
      var that;
      clearUserCookie(req, res);
      return res.redirect("/dash/auth/" + ((that = req.query.nexturl) ? "?nexturl=" + that : ''));
    });
    api['delete']('/me/', aux.signed, function(req, res){
      var key;
      return aux.r404(res);
      key = req.user.key;
      req.logout();
      return io.query("delete from users where key = $1", [key])['catch'](function(){
        return io.query("update users\nset (username,displayname,deleted)\n= (('deleted-' || key),('user ' || key),true)\nwhere key = $1", [key]);
      }).then(function(){
        return res.send();
      })['catch'](aux.errorHandler(res));
    });
    api.get('/me/', function(req, res){
      var ret, id;
      ret = {};
      if (!req.user) {
        return res.json('{}');
      }
      id = req.user.key;
      return io.query("select key,displayname,description,title,tags from users where key = $1", [id]).then(function(r){
        r == null && (r = {});
        if (!r.rows || !r.rows.length) {
          return aux.reject(404);
        }
        return ret.user = r.rows[0];
      }).then(function(r){
        r == null && (r = {});
        res.send(ret);
        return null;
      })['catch'](aux.errorHandler(res));
    });
    renderProfile = function(req, res, id){
      var lc;
      lc = {};
      return io.query("select key,displayname,description,createdtime,title,tags from users where key = $1", [id]).then(function(r){
        r == null && (r = {});
        if (!r.rows || !r.rows.length) {
          return aux.reject(404);
        }
        lc.user = r.rows[0];
        return io.query("select p.*, b.name as brdname\nfrom prj as p\nleft join brd as b on p.brd = b.slug\nwhere p.owner = $1\norder by createdtime desc", [id]);
      }).then(function(r){
        var ref$;
        r == null && (r = {});
        lc.prjs = r.rows || (r.rows = []);
        res.render('me/profile.pug', (ref$ = {
          exports: lc
        }, ref$.user = lc.user, ref$.prjs = lc.prjs, ref$));
        return null;
      })['catch'](aux.errorHandler(res));
    };
    app.get('/me/', aux.needlogin(function(req, res){
      return renderProfile(req, res, req.user.key);
    }));
    app.get('/user/:id', aux.numid(true, function(req, res){
      return io.query("select key,displayname,description,createdtime,plan,title,tags from users where key = $1 and deleted is not true", [req.params.id]).then(function(r){
        r == null && (r = {});
        if (!r.rows || !r.rows.length) {
          return aux.reject(404);
        }
        return res.render('me/profile.pug', {
          user: r.rows[0]
        });
      })['catch'](aux.errorHandler(res));
    }));
    app.get('/me/settings/', aux.needlogin(function(req, res){
      return res.render('me/settings.pug', {
        user: req.user
      });
    }));
    api.put('/user/:id', throttle.count.user, grecaptcha, aux.numid(false, function(req, res){
      var ref$, displayname, description, title, tags;
      if (!req.user || req.user.key !== +req.params.id) {
        return aux.r403(res);
      }
      ref$ = {
        displayname: (ref$ = req.body).displayname,
        description: ref$.description,
        title: ref$.title,
        tags: ref$.tags
      }, displayname = ref$.displayname, description = ref$.description, title = ref$.title, tags = ref$.tags;
      displayname = (displayname + "").trim();
      description = (description + "").trim();
      return io.query("update users set (displayname,description,title,tags) = ($1,$2,$3,$4) where key = $5", [displayname, description, title, tags, req.user.key]).then(function(){
        var ref$;
        ref$ = req.user;
        ref$.displayname = displayname;
        ref$.description = description;
        ref$.title = title;
        ref$.tags = tags;
        req.login(req.user, function(){
          return res.send();
        });
        return null;
      })['catch'](aux.errorHandler(res));
    }));
    api.post('/user/avatar', aux.signed, throttle.count.user, expressFormidable(), grecaptcha, function(req, res){
      if (!req.user) {
        return aux.r403(res);
      }
      if (!req.files.avatar) {
        return aux.r400(res);
      }
      return fsExtra.ensureDir("static/s/avatar/").then(function(){
        return sharp(req.files.avatar.path).resize(200, 200).toFile("static/s/avatar/" + req.user.key + ".png", function(err, info){
          if (err) {
            return aux.r500(res, err + "");
          }
          return res.send({});
        });
      })['catch'](function(){
        return aux.r500(res);
      });
    });
    api.put('/me/passwd/', aux.signed, throttle.count.user, grecaptcha, function(req, res){
      var ref$, n, o;
      ref$ = {
        n: (ref$ = req.body).n,
        o: ref$.o
      }, n = ref$.n, o = ref$.o;
      if (!req.user || !req.user.usepasswd) {
        return aux.r400(res);
      }
      if (n.length < 8) {
        return aux.r400(res, "profile.newPassword.length");
      }
      return io.query("select password from users where key = $1", [req.user.key]).then(function(arg$){
        var rows;
        rows = arg$.rows;
        if (!rows || !rows[0]) {
          return aux.reject(403);
        }
        return io.authio.user.compare(o, rows[0].password)['catch'](function(){
          return aux.reject(403, "profile.oldPassword.mismatch");
        });
      }).then(function(){
        return io.authio.user.hashing(n, true, true);
      }).then(function(pwHashed){
        req.user.password = pwHashed;
        return io.query("update users set password = $1 where key = $2", [pwHashed, req.user.key]);
      }).then(function(){
        req.login(req.user, function(){
          return res.send();
        });
        return null;
      })['catch'](aux.errorHandler(res));
    });
    api.post('/me/config/', aux.signed, function(req, res){
      if (!req.body || typeof req.body !== 'object') {
        return aux.r400(res);
      }
      if (req.body.type !== 'consent' || !Array.isArray(req.body.name)) {
        return aux.r400(res);
      }
      (req.body.name || []).map(function(n){
        var ref$, ref1$;
        return ((ref$ = (ref1$ = req.user).config || (ref1$.config = {})).consent || (ref$.consent = {}))[n] = Date.now();
      });
      return io.query("update users set config = $2 where key = $1", [req.user.key, req.user.config]).then(function(){
        return res.send(req.user.config);
      })['catch'](aux.errorHandler(res));
    });
    api.post('/me/list', aux.signed, function(req, res){
      var offset, limit, type, tables, table, p;
      offset = req.body.offset || 0;
      limit = req.body.limit || 100;
      type = req.body.type;
      tables = ['prj', 'brd', 'org'];
      table = tables[tables.indexOf(type)];
      if (!(table = tables[tables.indexOf(type)])) {
        return aux.r400(res);
      }
      p = table === 'org'
        ? io.query("select key,name,description,slug from org where deleted is not true", [])
        : io.query("select key,name,description,slug from " + table + " where owner = $1 and deleted is not true offset $2 limit $3", [req.user.key, offset, limit]);
      return p.then(function(r){
        r == null && (r = {});
        return res.send(r.rows || []);
      })['catch'](aux.errorHandler(res));
    });
    return api.put('/me/su/:id', function(req, res){
      if (!(req.user && req.user.staff)) {
        return aux.r403(res);
      }
      return io.query("select * from users where key = $1", [+req.params.id]).then(function(r){
        r == null && (r = {});
        if (!r.rows || !r.rows[0]) {
          return aux.reject(404);
        }
        import$(req.user, r.rows[0]);
        req.logIn(r.rows[0], function(){
          return res.send();
        });
        return null;
      })['catch'](aux.errorHandler(res));
    });
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
