// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, lderror, suuid, mimeTypes, puppeteer, aux, cache, common, grecaptcha, throttle, storage;
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
  storage = new storage.Storage({
    projectId: 'taicca',
    keyFilename: 'config/key/taicca.json'
  });
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, app, printer;
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
          exports: lc.prj
        });
      })['catch'](aux.errorHandler(res));
    });
    api.post('/flagship/upload', function(req, res){
      var filename, id;
      filename = req.body.filename;
      id = suuid();
      return storage.bucket('taicca-test').file(id).getSignedUrl({
        action: 'write',
        version: 'v4',
        expires: Date.now() + 60000
      }).then(function(it){
        return res.send({
          signedUrl: it[0],
          id: id
        });
      })['catch'](aux.errorHandler(res));
    });
    app.get('/flagship/upload/:id', function(req, res){
      var id;
      id = req.params.id;
      return storage.bucket('taicca-test').file(id).getSignedUrl({
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
    printer = {};
    return api.post('/flagship/download', throttle.count.userMd, grecaptcha, function(req, res){
      var lc, url, p;
      lc = {};
      url = "data:text/html;charset=utf-8," + encodeURIComponent(req.body.html);
      p = printer.browser
        ? Promise.resolve(printer.browser)
        : puppeteer.launch({
          headless: true
        });
      return p.then(function(browser){
        printer.browser = browser;
        lc.browser = browser;
        return browser.newPage();
      }).then(function(page){
        lc.page = page;
        return page.goto(url, {
          waitUntil: 'networkidle0'
        });
      }).then(function(){
        return lc.page.pdf({
          format: 'A4'
        });
      }).then(function(pdf){
        lc.browser.close();
        return res.send(pdf);
      })['catch'](aux.errorHandler(res));
    });
  });
}).call(this);
