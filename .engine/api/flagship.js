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
    var gcs, api, app, renderForm, Printer, printer;
    if (!secret.gcs) {
      return;
    }
    gcs = new storage.Storage(secret.gcs);
    api = engine.router.api;
    app = engine.app;
    renderForm = function(req, res){};
    app.get('/flagship/', aux.signed, function(req, res){
      var brd;
      brd = 'flagship-2';
      return io.query("select brd,detail,system,slug,key,state from prj\nwhere brd = $1 and owner = $2 and deleted is not true", [brd, req.user.key]).then(function(r){
        var ret;
        r == null && (r = {});
        if (!(ret = (r.rows || (r.rows = []))[0])) {
          return cache.stage.check({
            io: io,
            type: 'brd',
            slug: brd,
            name: 'prj-new'
          })['catch'](function(){
            return Promise.reject(new lderror({
              ldcv: "closed"
            }, 1012));
          }).then(function(){
            return res.render('view/taicca-flagship/prj-view.pug');
          });
        } else {
          return cache.stage.check({
            io: io,
            type: 'brd',
            slug: brd,
            name: 'prj-edit'
          })['catch'](function(){
            return cache.perm.check({
              io: io,
              user: req.user,
              type: 'brd',
              slug: brd,
              action: 'prj-edit-own'
            });
          })['catch'](function(){
            return Promise.reject(new lderror({
              ldcv: "closed"
            }, 1012));
          }).then(function(){
            return res.render('view/taicca-flagship/prj-view.pug', {
              exports: {
                prj: ret
              }
            });
          });
        }
      })['catch'](aux.errorHandler(res));
    });
    api.post('/flagship/upload', function(req, res){
      var lc, brd;
      lc = {};
      if (!(req.user && req.user.key)) {
        return;
      }
      brd = 'flagship-2';
      return io.query("select id from perm_gcs where owner = $1", [req.user.key]).then(function(r){
        r == null && (r = {});
        if (lc.perm = (r.rows || (r.rows = []))[0]) {
          return lc.id = lc.perm.id;
        } else {
          return lc.id = suuid();
        }
      }).then(function(){
        return gcs.bucket(secret.gcs.bucket).file(lc.id).getSignedUrl({
          action: 'write',
          version: 'v4',
          expires: Date.now() + 2 * 60 * 1000
        });
      }).then(function(it){
        lc.url = it[0];
        if (!lc.perm) {
          return io.query("insert into perm_gcs (id, owner, brd, grp) values ($1, $2, $3, $4)", [lc.id, req.user.key, brd || null, null]);
        }
      }).then(function(){
        return res.send({
          signedUrl: lc.url,
          id: lc.id
        });
      })['catch'](aux.errorHandler(res));
    });
    app.get('/flagship/upload/:id', aux.signed, function(req, res){
      var lc, id;
      lc = {};
      id = req.params.id;
      return io.query("select brd,grp,owner from perm_gcs where id = $1", [id]).then(function(r){
        var ret;
        r == null && (r = {});
        if (!(lc.ret = ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (ret.owner === req.user.key) {
          return true;
        }
        return cache.perm.check({
          io: io,
          type: 'brd',
          slug: ret.brd,
          user: req.user,
          action: ['judge', 'owner']
        });
      })['catch'](function(){
        return io.query("select owner from perm_judge where brd = $1 and owner = $2", [lc.ret.brd, req.user.key]).then(function(r){
          r == null && (r = {});
          if (!(r.rows || (r.rows = [])).length) {
            return Promise.reject(403);
          }
        });
      }).then(function(){
        return gcs.bucket(secret.gcs.bucket).file(id).getSignedUrl({
          action: 'read',
          version: 'v4',
          expires: Date.now() + 60000
        });
      }).then(function(it){
        return res.status(302).redirect(it[0]);
      })['catch'](aux.errorHandler(res));
    });
    api.post('/flagship/prj/', grecaptcha, function(req, res){
      var lc, ref$, name, description, detail, key, submit, brd;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      lc = {};
      ref$ = req.body, name = ref$.name, description = ref$.description, detail = ref$.detail, key = ref$.key, submit = ref$.submit;
      detail = {
        custom: detail
      };
      brd = 'flagship-2';
      lc.state = submit ? "active" : "pending";
      return io.query("select * from prj\nwhere deleted is not true and brd = $1 and owner = $2", [brd, req.user.key]).then(function(r){
        r == null && (r = {});
        lc.prj = (r.rows || (r.rows = []))[0];
        if (lc.prj && lc.prj.state === 'active') {
          return aux.reject(403);
        }
        return cache.stage.check({
          io: io,
          type: 'brd',
          slug: brd,
          name: !lc.prj ? 'prj-new' : 'prj-edit'
        })['catch'](function(){
          return cache.perm.check({
            io: io,
            user: req.user,
            type: 'brd',
            slug: brd,
            action: 'prj-edit-own'
          });
        });
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
      }).then(function(){
        if (lc.prj) {
          return io.query("update prj set (name,description,detail,grp,state) = ($2,$3,$4,$5,$6)\nwhere key = $1", [lc.prj.key, name, description, JSON.stringify(detail), lc.grp.key, lc.state]).then(function(){
            return res.send({
              state: lc.state
            });
          });
        } else {
          return io.query("select count(key) as count from prj where\ndeleted is not true and brd = $1", [brd]).then(function(r){
            r == null && (r = {});
            lc.system = {
              idx: +(((r.rows || (r.rows = []))[0] || {}).count || 0) + 1
            };
            lc.slug = suuid();
            return io.query("insert into prj (name,description,brd,grp,slug,detail,owner,state,system)\nvalues ($1,$2,$3,$4,$5,$6,$7,$8,$9) returning key", [name, description, brd, lc.grp.key, lc.slug, JSON.stringify(detail), req.user.key, lc.state, JSON.stringify(lc.system)]);
          }).then(function(r){
            var ref$;
            r == null && (r = {});
            return res.send((ref$ = (r.rows || (r.rows = []))[0] || {}, ref$.slug = lc.slug, ref$.system = lc.system, ref$.state = lc.state, ref$));
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
      exec: function(cb){
        var lc, _, this$ = this;
        lc = {
          trial: 0
        };
        _ = function(){
          return this$.get().then(function(obj){
            return lc.obj = obj;
          }).then(function(){
            return cb(lc.obj.page);
          }).then(function(it){
            return lc.ret = it;
          })['catch'](function(){
            if ((lc.trial++) > 5) {
              return Promise.reject(new lderror(0));
            }
            return this$.respawn(lc.obj).then(function(){
              return _();
            });
          }).then(function(){
            return this$.free(lc.obj);
          }).then(function(){
            return lc.ret;
          });
        };
        return _();
      },
      print: function(payload){
        payload == null && (payload = {});
        return this.exec(function(page){
          var p;
          p = payload.html
            ? page.setContent(payload.html, {
              waitUntil: "networkidle0"
            })
            : payload.url
              ? page.goto(payload.url)
              : Promise.reject(new ldError(1015));
          return p.then(function(){
            return page.pdf({
              format: 'A4'
            });
          });
        });
      },
      get: function(){
        var this$ = this;
        return new Promise(function(res, rej){
          var i$, to$, i;
          for (i$ = 0, to$ = this$.pages.length; i$ < to$; ++i$) {
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
      respawn: function(obj){
        var this$ = this;
        return Promise.resolve().then(function(){
          if (!obj.page.isClosed()) {
            return page.close();
          }
        })['catch'](function(){}).then(function(){
          return Printer.browser.newPage();
        }).then(function(page){
          return obj.page = page;
        });
      },
      init: function(){
        var that, this$ = this;
        return ((that = Printer.browser)
          ? Promise.resolve(that)
          : puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
          })).then(function(browser){
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
      count: 15
    });
    return printer.init();
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
