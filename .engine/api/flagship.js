// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, lderror, suuid, mimeTypes, puppeteer, aux, cache, common, grecaptcha, throttle, storage, secret;
  fs = require('fs');
  fsExtra = require('fs-extra');
  path = require('path');
  crypto = require('crypto');
  lderror = require('lderror');
  suuid = require('suuid');
  mimeTypes = require('mime-types');
  suuid = require('suuid');
  puppeteer = require('puppeteer');
  aux = require('../aux');
  cache = require('./cache');
  common = require('./common');
  grecaptcha = require('../util/grecaptcha');
  throttle = require('../util/throttle');
  storage = require('@google-cloud/storage');
  secret = require('../../secret');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var gcs, api, app, Printer, printer;
    if (!secret.gcs) {
      return;
    }
    gcs = new storage.Storage(secret.gcs);
    api = engine.router.api;
    app = engine.app;
    app.get('/flagship/', function(req, res){
      return res.render('view/taicca-flagship/prj-view.pug');
    });
    app.get('/flagship/:slug', function(req, res){
      var lc, slug;
      lc = {};
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return io.query("select brd,detail,slug,key from prj where deleted is not true and slug = $1", [slug]).then(function(r){
        var prj;
        r == null && (r = {});
        if (!(lc.prj = prj = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        return cache.stage.check({
          io: io,
          type: 'brd',
          slug: prj.brd,
          name: "prj-edit"
        });
      }).then(function(){
        return res.render('view/taicca-flagship/prj-view.pug', {
          exports: {
            prj: lc.prj
          }
        });
      })['catch'](aux.errorHandler(res));
    });
    api.post('/flagship/upload', function(req, res){
      var lc, filename, id;
      lc = {};
      if (!(req.user && req.user.key)) {
        return;
      }
      filename = req.body.filename;
      id = suuid();
      return gcs.bucket(secret.gcs.bucket).file(id).getSignedUrl({
        action: 'write',
        version: 'v4',
        expires: Date.now() + 60000
      }).then(function(it){
        lc.url = it[0];
        return io.query("insert into perm_gcs (id, owner) values ($1, $2)", [id, req.user.key]);
      }).then(function(){
        return res.send({
          signedUrl: lc.url,
          id: id
        });
      })['catch'](aux.errorHandler(res));
    });
    app.get('/flagship/upload/:id', function(req, res){
      var id;
      id = req.params.id;
      return gcs.bucket(secret.gcs.bucket).file(id).getSignedUrl({
        action: 'read',
        version: 'v4',
        expires: Date.now() + 60000
      }).then(function(it){
        return res.status(302).redirect(it[0]);
      })['catch'](aux.errorHandler(res));
    });
    api.post('/flagship/prj/', throttle.count.userMd, grecaptcha, function(req, res){
      var lc, ref$, name, description, brd, detail, key, slug;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      lc = {};
      ref$ = req.body, name = ref$.name, description = ref$.description, brd = ref$.brd, detail = ref$.detail, key = ref$.key;
      detail = {
        custom: detail
      };
      if (!brd) {
        return aux.r400(res);
      }
      slug = null;
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: brd,
        name: "prj-new"
      }).then(function(){
        return io.query("select org, slug, key, detail->'group' as group from brd where slug = $1", [brd]);
      }).then(function(r){
        var ref$;
        r == null && (r = {});
        if (!(lc.brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (!(lc.grp = ((ref$ = lc.brd).group || (ref$.group = [])).filter(function(it){
          var ref$;
          return (it.info || (it.info = {})).name === ((ref$ = detail.custom).form || (ref$.form = {})).group;
        })[0])) {
          return aux.reject(404);
        }
        if (!lc.brd.org) {
          return aux.reject(404);
        }
        if (key) {
          return io.query("select owner from prj where key = $1 and owner = $2", [key, req.user.key]).then(function(r){
            r == null && (r = {});
            if (!(r.rows || (r.rows = [])).length) {
              return aux.reject(404);
            }
            return io.query("update prj set (name,description,detail,modifiedtime) = ($1,$2,$3,now()) where key = $4 returning key", [name, description, JSON.stringify(detail), key]);
          }).then(function(){
            return res.send({});
          });
        } else {
          return io.query("select count(key) as count from prj\nwhere brd = $1 and grp = $2 and deleted is not true", [brd, lc.grp.key]).then(function(r){
            var id;
            r == null && (r = {});
            id = +(r.rows || (r.rows = []))[0].count + 1;
            slug = suuid() + ("-" + id);
            return io.query("insert into prj (name,description,brd,grp,slug,detail,owner)\nvalues ($1,$2,$3,$4,$5,$6,$7) returning key", [name, description, brd, lc.grp.key, slug, JSON.stringify(detail), req.user.key]);
          }).then(function(r){
            r == null && (r = {});
            return lc.ret = ((r.rows || (r.rows = [])) || [])[0];
          }).then(function(){
            var ref$;
            return res.send((ref$ = lc.ret || {}, ref$.slug = slug, ref$));
          });
        }
      })['catch'](aux.errorHandler(res));
    });
    api.post('/flagship/download', throttle.count.user, grecaptcha, function(req, res){
      var lc;
      lc = {};
      return printer.print({
        html: req.body.html
      }).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    Printer = function(opt){
      var ref$;
      opt == null && (opt = {});
      this.opt = opt;
      this.count = (ref$ = opt.count || 4) < 20 ? ref$ : 20;
      this.queue = [];
      return this;
    };
    Printer.prototype = import$(Object.create(Object.prototype), {
      print: function(payload){
        var lc, this$ = this;
        payload == null && (payload = {});
        lc = {};
        return this.get().then(function(obj){
          lc.obj = obj;
          if (payload.html) {
            return obj.page.setContent(payload.html, {
              waitUntil: "networkidle0"
            });
          } else if (payload.url) {
            return obj.page.goto(payload.url);
          } else {
            return Promise.reject(new ldError(1015));
          }
        }).then(function(){
          return lc.obj.page.pdf({
            format: 'A4'
          });
        }).then(function(it){
          return lc.pdf = it;
        }).then(function(){
          return this$.free(lc.obj);
        }).then(function(){
          return lc.pdf;
        });
      },
      get: function(){
        var this$ = this;
        return new Promise(function(res, rej){
          var i$, to$, i;
          for (i$ = 0, to$ = this$.count; i$ < to$; ++i$) {
            i = i$;
            if (!this$.pages[i].busy) {
              this$.pages[i].busy = true;
              return res(this$.pages[i]);
            }
          }
          return this$.queue.push({
            res: res,
            rej: rej
          });
        });
      },
      free: function(obj){
        var ret;
        if (this.queue.length) {
          ret = this.queue.splice(0, 1)[0];
          return ret.res(obj);
        } else {
          return obj.busy = false;
        }
      },
      init: function(){
        var that, this$ = this;
        return ((that = Printer.browser)
          ? Promise.resolve(that)
          : puppeteer.launch()).then(function(browser){
          var i;
          Printer.browser = browser;
          return Promise.all((function(){
            var i$, to$, results$ = [];
            for (i$ = 0, to$ = this.count; i$ < to$; ++i$) {
              i = i$;
              results$.push(browser.newPage().then(fn$));
            }
            return results$;
            function fn$(it){
              return {
                busy: false,
                page: it
              };
            }
          }.call(this$)));
        }).then(function(it){
          return this$.pages = it;
        });
      }
    });
    printer = new Printer({
      count: 20
    });
    return printer.init();
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
