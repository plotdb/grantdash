// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, readChunk, sharp, expressFormidable, uploadr, lderror, nodegit, suuid, aux, permcache;
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
  aux = require('../aux');
  permcache = require('./permcache');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, app, upload, slugs, deploy;
    api = engine.router.api;
    app = engine.app;
    upload = function(arg$){
      var root, files;
      root = arg$.root, files = arg$.files;
      return new Promise(function(res, rej){
        return fsExtra.ensureDir(path.join(root, 'upload', 'draft'), function(e){
          var ps;
          if (e) {
            return rej(e);
          }
          ps = files.map(function(arg$){
            var name, type, list, f, id, ps;
            name = arg$.name, type = arg$.type, list = arg$.list;
            if (type === 'banner' || type === 'thumb') {
              f = list[0];
              return new Promise(function(res, rej){
                return sharp(f.path).toFile(path.join(root, 'upload', 'draft', type + ".png"), function(e, i){
                  return e
                    ? rej(e)
                    : res({
                      name: name,
                      type: type,
                      files: [type + ".png"]
                    });
                });
              });
            } else {
              id = suuid();
              ps = list.map(function(f, idx){
                var fn;
                fn = id + "." + idx + "." + f.type;
                return fsExtra.copy(f.path, path.join(root, 'upload', 'draft', fn)).then(function(){
                  return fn;
                });
              });
              return Promise.all(ps).then(function(files){
                return {
                  name: name,
                  type: type,
                  id: id,
                  files: files
                };
              });
            }
          });
          return Promise.all(ps).then(function(it){
            return res(it);
          })['catch'](function(it){
            return rej(it);
          });
        });
      });
    };
    slugs = function(arg$){
      var io, org, brd, prj;
      io = arg$.io, org = arg$.org, brd = arg$.brd, prj = arg$.prj;
      return new Promise(function(res, rej){
        var type, promise;
        type = prj
          ? 'prj'
          : brd
            ? 'brd'
            : org ? 'org' : null;
        if (!type) {
          return rej(new lderror(400));
        }
        promise = type === 'prj'
          ? io.query("select o.slug as org, b.slug as brd, p.slug as prj\nfrom org as o, brd as b, prj as p\nwhere p.slug = $1 and p.brd = b.slug and b.org = o.slug", [prj])
          : type === 'brd'
            ? io.query("select o.slug as org, b.slug as brd\nfrom org as o, brd as b\nwhere b.slug = $1 and b.org = o.slug", [brd])
            : type === 'org' ? io.query("select o.slug as org\nfrom org as o\nwhere o.slug = $1", [org]) : void 8;
        return promise.then(function(r){
          var ret, org, prj, brd, root;
          r == null && (r = {});
          if (!(ret = (r.rows || (r.rows = []))[0])) {
            return aux.reject(404);
          }
          org = ret.org, prj = ret.prj, brd = ret.brd;
          root = type === 'prj'
            ? "users/org/" + org + "/prj/" + prj
            : type === 'brd'
              ? "users/org/" + org + "/brd/" + brd
              : type === 'org' ? "users/org/" + org : null;
          if (!root) {
            return aux.reject(400);
          }
          return res((ret.type = type, ret.root = root, ret));
        })['catch'](function(it){
          return rej(it);
        });
      });
    };
    api.post('/upload', aux.signed, expressFormidable({
      multiples: true
    }), function(req, res){
      var lc, ref$, org, brd, prj, files, e;
      lc = {};
      ref$ = req.fields, org = ref$.org, brd = ref$.brd, prj = ref$.prj, files = ref$.files;
      try {
        files = JSON.parse(files);
      } catch (e$) {
        e = e$;
        return aux.r400(res);
      }
      if (!(files && Array.isArray(files) && files.length)) {
        return aux.r400(res);
      }
      files = files.map(function(arg$){
        var name, type, list;
        name = arg$.name, type = arg$.type;
        list = req.files[name + "[]"];
        list = Array.isArray(list)
          ? list
          : [list];
        list = list.map(function(it){
          return {
            path: it.path,
            type: it.type.split('/')[1]
          };
        }).filter(function(it){
          return /([a-zA-Z0-9]{1,6}$)/.exec(it.type);
        });
        return {
          name: name,
          type: type,
          list: list
        };
      }).filter(function(it){
        return it.list.length > 0 && it.list.length < 10;
      });
      return slugs({
        io: io,
        org: org,
        brd: brd,
        prj: prj
      }).then(function(arg$){
        var type, prj, brd, org, root;
        type = arg$.type, prj = arg$.prj, brd = arg$.brd, org = arg$.org, root = arg$.root;
        return upload({
          root: root,
          files: files
        });
      }).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    api.put('/detail/', aux.signed, function(req, res){
      var lc, ref$, slug, type, payload, info, name, description;
      lc = {};
      ref$ = req.body || {}, slug = ref$.slug, type = ref$.type, payload = ref$.payload;
      if (!(slug && type && payload)) {
        return aux.r400(res);
      }
      if (!(type === 'prj' || type === 'brd' || type === 'org')) {
        return aux.r400(res);
      }
      if (info = payload.info) {
        ref$ = [info.name || info.title, info.description], name = ref$[0], description = ref$[1];
      }
      return permcache.check({
        io: io,
        user: req.user,
        type: type,
        slug: slug,
        action: 'owner'
      }).then(function(){
        return io.query("update " + type + " set detail = $1 where slug = $2", [JSON.stringify(payload), slug]);
      }).then(function(){
        if (!name) {
          return;
        }
        if (type === 'prj') {
          return io.query("update prj set (name,description,category,tag) = ($1,$2,$3,$4)  where slug = $5", [name, description, info.category || '', JSON.stringify(info.tag || []), slug]);
        } else {
          return io.query("update " + type + " set (name,description) = ($1,$2)  where slug = $3", [name, description, slug]);
        }
      }).then(function(){
        var opt;
        permcache.invalidate({
          type: type,
          slug: slug
        });
        opt = {
          io: io
        };
        opt[type] = slug;
        return slugs(opt).then(function(ret){
          var root, type, prj, brd, org, release, draft;
          root = ret.root, type = ret.type, prj = ret.prj, brd = ret.brd, org = ret.org;
          release = path.join(root, 'upload', 'release');
          draft = path.join(root, 'upload', 'draft');
          if (!(/^users\//.exec(release) && /^users\//.exec(draft))) {
            return aux.reject(400);
          }
          return fsExtra.ensureDir(release).then(function(){
            return fsExtra.remove(release);
          }).then(function(){
            return fsExtra.ensureDir(draft);
          }).then(function(){
            return fsExtra.move(draft, release);
          });
        });
      }).then(function(){
        return res.send({});
      })['catch'](aux.errorHandler(res));
    });
    app.get('/brd/:slug/list', function(req, res){
      var lc, ref$, offset, limit, keyword, tag, category, slug, ref1$;
      lc = {};
      ref$ = {
        offset: (ref$ = req.query).offset,
        limit: ref$.limit
      }, offset = ref$.offset, limit = ref$.limit;
      ref$ = {
        keyword: (ref$ = req.query).keyword,
        category: ref$.category,
        tag: ref$.tag
      }, keyword = ref$.keyword, tag = ref$.tag, category = ref$.category;
      slug = req.params.slug;
      offset = (ref$ = isNaN(+offset)
        ? 0
        : +offset) > 0 ? ref$ : 0;
      limit = (ref$ = (ref1$ = isNaN(+limit)
        ? 24
        : +limit) < 100 ? ref1$ : 100) > 1 ? ref$ : 1;
      if (!slug) {
        return aux.r400(res);
      }
      return io.query("select b.name, b.description, b.slug, b.org, b.detail from brd as b where b.slug = $1", [slug]).then(function(r){
        var ref$, ref1$, ref2$, idx1, idx2;
        r == null && (r = {});
        if (!(lc.brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        lc.grps = lc.brd.detail.group.map(function(it){
          return {
            form: it.form,
            key: it.key
          };
        });
        lc.pageInfo = (ref$ = (ref1$ = (ref2$ = lc.brd.detail).page || (ref2$.page = {})).info || (ref1$.info = {})).generic || (ref$.generic = {});
        delete lc.brd.detail;
        idx1 = 4 + [tag].filter(function(it){
          return it;
        }).length;
        idx2 = 4 + [tag, category].filter(function(it){
          return it;
        }).length;
        return io.query(["with cte as (\nselect p.*,u.displayname as ownername\nfrom prj as p, users as u\nwhere u.key = p.owner and p.brd = $3", tag ? "and tag ? $4" : void 8, category ? "and category = $" + idx1 : void 8, keyword ? "and name ~ $" + idx2 : void 8, ") select * from (\n  table cte limit $2 offset $1\n) sub\nright join (select count(*) from cte) c(full_count) on true"].filter(function(it){
          return it;
        }).join(' '), [offset, limit, slug].concat([tag, category, keyword].filter(function(it){
          return it;
        })));
      }).then(function(r){
        r == null && (r = {});
        res.render('prj/list.pug', {
          prjs: r.rows || (r.rows = []),
          brd: lc.brd,
          grps: lc.grps,
          pageInfo: lc.pageInfo
        });
        return null;
      })['catch'](aux.errorHandler(res));
    });
    app.get('/brd/:slug', aux.signed, function(req, res){
      var lc, slug;
      lc = {};
      if (!req.user) {
        return aux.r403(res);
      }
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return io.query("select * from brd where slug = $1", [slug]).then(function(r){
        var brd;
        r == null && (r = {});
        if (!(lc.brd = brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (brd.owner !== req.user.key) {
          return aux.reject(403);
        }
        return io.query("select * from prj where brd = $1", [brd.slug]);
      }).then(function(r){
        r == null && (r = {});
        lc.projects = r.rows || (r.rows = []);
        return res.render('brd/index.pug', {
          brd: lc.brd,
          projects: lc.projects
        });
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:slug/form/', function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return io.query("select key,name,description,slug,detail from brd where slug = $1", [slug]).then(function(r){
        var ret;
        r == null && (r = {});
        if (!(ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        ret.detail = {
          group: ret.detail.group
        };
        ret.detail.group = ret.detail.group.map(function(it){
          return {
            form: it.form,
            info: it.info,
            key: it.key
          };
        });
        return res.send({
          key: ret.key,
          name: ret.name,
          description: ret.description,
          slug: ret.slug,
          detail: ret.detail
        });
      })['catch'](aux.errorHandler(res));
    });
    deploy = function(arg$){
      var url, root, branch;
      url = arg$.url, root = arg$.root, branch = arg$.branch;
      return nodegit.Repository.open(root)['catch'](function(){
        return nodegit.Repository.init(root, 0);
      }).then(function(repo){
        return repo.getRemotes().then(function(rs){
          return Promise.all(rs.map(function(r){
            if (r.url() === url) {
              return true;
            }
            return nodegit.Remote['delete'](repo, r.name())['finally'](function(){
              return false;
            });
          }));
        }).then(function(rs){
          var remote;
          if (!rs.reduce(function(a, b){
            return a || b;
          }, false)) {
            return remote = nodegit.Remote.createWithFetchspec(repo, 'origin', url, "+refs/heads/" + branch + ":refs/remotes/origin/" + branch);
          }
        }).then(function(){
          return repo.fetchAll();
        }).then(function(){
          return repo.getBranch("refs/remotes/origin/" + branch);
        }).then(function(ref){
          return repo.checkoutRef(ref, {
            checkoutStrategy: 2
          });
        })['catch'](function(e){
          return console.log("[Deploy Error]", e);
        });
      });
    };
    api.post('/deploy', aux.signed, function(req, res){
      var lc, ref$, slug, type;
      lc = {};
      ref$ = req.body || {}, slug = ref$.slug, type = ref$.type;
      if (!(slug && type && (type === 'org' || type === 'brd'))) {
        return aux.r400(res);
      }
      return permcache.check({
        io: io,
        user: req.user,
        type: type,
        slug: slug,
        action: 'owner'
      }).then(function(){
        if (type === 'org') {
          return io.query("select detail->'page'->'info' as info from org where slug = $1", [slug]);
        }
        return io.query("select b.detail->'page'->'info' as info, b.org\nfrom brd as b where b.slug = $1", [slug]);
      }).then(function(r){
        var ret, git, opt;
        r == null && (r = {});
        if (!((ret = (r.rows || (r.rows = []))[0]) && (lc.git = git = (ret.info || (ret.info = {})).git))) {
          return aux.reject(404);
        }
        if (!(git.url && git.branch)) {
          return aux.reject(404);
        }
        res.send({});
        opt = {
          io: io
        };
        opt[type] = slug;
        return slugs(opt);
      }).then(function(ret){
        var root, prj, org, brd;
        root = ret.root, prj = ret.prj, org = ret.org, brd = ret.brd;
        return deploy({
          url: lc.git.url,
          branch: lc.git.branch,
          root: path.join(root, 'static')
        })['catch'](function(it){
          return console.log("deploy failed ( " + root + " ): ", it);
        });
      })['catch'](aux.errorHandler(res));
    });
    api.post('/brd', aux.signed, expressFormidable(), function(req, res){
      var lc, ref$, name, description, slug, starttime, endtime, org, detail;
      lc = {};
      ref$ = req.fields, name = ref$.name, description = ref$.description, slug = ref$.slug, starttime = ref$.starttime, endtime = ref$.endtime, org = ref$.org;
      if (!name || !org || !/^[a-zA-Z0-9+_-]+$/.exec(slug)) {
        return aux.r400(res);
      }
      detail = {
        info: {
          name: name,
          description: description,
          starttime: starttime,
          endtime: endtime
        },
        group: []
      };
      return io.query("select key from brd where slug = $1", [slug]).then(function(r){
        r == null && (r = {});
        if (r.rows && r.rows.length) {
          return aux.reject(new lderror(1011));
        }
        return io.query("select slug from org where slug = $1", [org]);
      }).then(function(r){
        r == null && (r = {});
        if (!(r.rows || (r.rows = []))[0]) {
          return aux.reject(404);
        }
        return io.query("insert into brd (name,description,slug,starttime,endtime,org,owner,detail)\nvalues ($1,$2,$3,$4,$5,$6,$7,$8) returning key", [name, description, slug, starttime || null, endtime || null, org, req.user.key, detail]);
      }).then(function(r){
        r == null && (r = {});
        return res.send(((r.rows || (r.rows = [])) || [])[0]);
      })['catch'](aux.errorHandler(res));
    });
    app.get('/org/:slug/admin', aux.signed, function(req, res){
      return res.render('admin/index.pug', {
        org: {
          slug: req.params.key
        }
      });
    });
    app.get('/brd/:slug/admin', aux.signed, function(req, res){
      var lc, slug;
      lc = {};
      if (!(slug = req.params.slug)) {
        return aux.r404(res);
      }
      return permcache.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: slug,
        action: 'owner'
      }).then(function(){
        return io.query("select * from brd where slug = $1", [slug]);
      }).then(function(r){
        var brd;
        r == null && (r = {});
        if (!(brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        lc.brd = brd;
        return !brd.org
          ? Promise.resolve()
          : io.query("select * from org where slug = $1", [brd.org]);
      }).then(function(r){
        var org;
        r == null && (r = {});
        org = (r.rows || (r.rows = {}))[0];
        res.render('admin/index.pug', {
          org: org,
          brd: lc.brd
        });
        return null;
      })['catch'](aux.errorHandler(res));
    });
    return api.post('/slug-check/:type', function(req, res){
      var ref$, type, slug;
      ref$ = [req.params.type, req.body.slug], type = ref$[0], slug = ref$[1];
      if (!((type === 'org' || type === 'brd') && /^[A-Za-z0-9+_-]+$/.exec(slug))) {
        return aux.r404(res);
      }
      return io.query("select key from " + type + " where slug = $1", [slug]).then(function(r){
        r == null && (r = {});
        return res.send({
          result: (r.rows || []).length ? 'used' : 'free'
        });
      })['catch'](aux.errorHandler(res));
    });
  });
}).call(this);
