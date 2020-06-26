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
    var deploy, slugs, saveSnapshot, api, app, upload, getPrjList;
    deploy = common.deploy, slugs = common.slugs, saveSnapshot = common.saveSnapshot;
    api = engine.router.api;
    app = engine.app;
    app.get('/org/:org/prj/:prj/upload/:file', function(req, res){
      var ref$, org, prj, file, lc;
      ref$ = {
        org: (ref$ = req.params).org,
        prj: ref$.prj,
        file: ref$.file
      }, org = ref$.org, prj = ref$.prj, file = ref$.file;
      lc = {};
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'prj',
        slug: prj,
        action: 'owner'
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: req.scope.brd,
          action: 'owner'
        });
      })['catch'](function(){
        return io.query("select grp,detail from prj where slug = $1 and deleted is not true", [prj]).then(function(r){
          r == null && (r = {});
          if (!(lc.prj = (r.rows || (r.rows = []))[0])) {
            return aux.reject(404);
          }
          return io.query("select detail from brd where slug = $1 and deleted is not true", [req.scope.brd]);
        }).then(function(r){
          var grps, ref$, ref1$, grp, isPublic;
          r == null && (r = {});
          if (!(lc.brd = (r.rows || (r.rows = []))[0])) {
            return aux.reject(404);
          }
          grps = (ref$ = (ref1$ = lc.brd).detail || (ref1$.detail = {})).group || (ref$.group = []);
          if (!(grp = grps.filter(function(it){
            return lc.prj.grp === it.key;
          })[0])) {
            return aux.reject(404);
          }
          isPublic = ((ref$ = grp.form || (grp.form = {})).list || (ref$.list = [])).filter(function(it){
            var ref$;
            return (ref$ = it.name) === 'form-thumbnail' || ref$ === 'form-file';
          }).filter(function(it){
            var ref$;
            return ((ref$ = lc.prj.detail.answer[it.key]).list || (ref$.list = [])).filter(function(it){
              return it.fn === file;
            }).length;
          }).filter(function(it){
            return (it.config || (it.config = {}))['public'];
          }).length;
          if (!isPublic) {
            return Promise.reject(403);
          }
        });
      }).then(function(){
        res.set({
          "X-Accel-Redirect": "/dash/private/org/" + org + "/prj/" + prj + "/upload/" + file
        });
        return res.send();
      })['catch'](function(){
        return res.status(403).send({});
      });
    });
    upload = function(arg$){
      var root, files;
      root = arg$.root, files = arg$.files;
      return new Promise(function(res, rej){
        return fsExtra.ensureDir(path.join(root, 'upload'), function(e){
          var ps;
          if (e) {
            return rej(e);
          }
          ps = files.filter(function(it){
            return it.name && it.type && it.path;
          }).map(function(f){
            var ext, md5, fn;
            f == null && (f = {});
            ext = mimeTypes.extension(f.type) || mimeTypes.extension(mimeTypes.lookup(f.name)) || '';
            md5 = crypto.createHash('md5').update(fs.readFileSync(f.path)).digest('hex');
            fn = md5 + "." + ext;
            return fsExtra.copy(f.path, path.join(root, 'upload', fn)).then(function(){
              var ref$;
              return ref$ = {
                name: f.name,
                type: f.type,
                size: f.size
              }, ref$.fn = fn, ref$.ext = ext, ref$;
            });
          });
          return Promise.all(ps).then(function(it){
            return res(it);
          })['catch'](function(it){
            return rej(it);
          });
        });
      });
    };
    api.post('/upload', aux.signed, expressFormidable({
      multiples: true
    }), grecaptcha, function(req, res){
      var lc, ref$, org, brd, prj, post, files, name, list;
      lc = {};
      ref$ = req.fields, org = ref$.org, brd = ref$.brd, prj = ref$.prj, post = ref$.post, files = ref$.files;
      files = [];
      for (name in ref$ = req.files) {
        list = ref$[name];
        files = files.concat(list);
      }
      if (files.length > 10 || files.filter(function(it){
        return it.size >= 10485760;
      }).length) {
        return aux.r413(res);
      }
      return slugs({
        io: io,
        org: org,
        brd: brd,
        prj: prj,
        post: post
      }).then(function(ret){
        return import$(lc, ret);
      }).then(function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: lc.type,
          slug: lc.slug,
          action: 'owner'
        });
      }).then(function(){
        return upload({
          root: lc.root,
          files: files
        });
      }).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    api.put('/detail/', aux.signed, grecaptcha, function(req, res){
      var lc, ref$, slug, type, payload, info, name, description;
      lc = {};
      ref$ = req.body || {}, slug = ref$.slug, type = ref$.type, payload = ref$.payload;
      if (!(slug && type && payload)) {
        return aux.r400(res);
      }
      if (!(type === 'prj' || type === 'brd' || type === 'org' || type === 'post' || type === 'form')) {
        return aux.r400(res);
      }
      info = payload.info || {};
      ref$ = [info.name || info.title, info.description], name = ref$[0], description = ref$[1];
      return cache.perm.check({
        io: io,
        user: req.user,
        type: type,
        slug: slug,
        action: 'owner'
      }).then(function(){
        return io.query("update " + type + " set detail = $1 where slug = $2 and deleted is not true", [JSON.stringify(payload), slug]);
      }).then(function(){
        var thumb;
        if (!name) {
          return;
        }
        if (type === 'prj') {
          thumb = (info.thumb || {}).fn;
          return io.query("update prj set (name,description,category,tag,thumb) = ($1,$2,$3,$4,$5)\nwhere slug = $6 and deleted is not true", [name, description, info.category || '', JSON.stringify(info.tag || []), thumb, slug]);
        } else {
          return io.query("update " + type + " set (name,description) = ($1,$2) where slug = $3 and deleted is not true", [name, description, slug]);
        }
      }).then(function(){
        cache.perm.invalidate({
          type: type,
          slug: slug
        });
        return cache.stage.invalidate({
          type: type,
          slug: slug
        });
      }).then(function(){
        var doc_id;
        doc_id = type + "/" + slug;
        return saveSnapshot({
          io: io,
          sharedb: engine.sharedb,
          version: null,
          doc_id: doc_id
        });
      }).then(function(){
        return res.send({});
      })['catch'](function(it){
        console.log(it);
        return aux.errorHandler(res)(it);
      });
    });
    getPrjList = function(req, res){
      return Promise.resolve().then(function(){
        var ref$, offset, limit, keyword, tag, category, slug, ref1$, idx1, idx2;
        ref$ = {
          offset: (ref$ = req.query).offset,
          limit: ref$.limit
        }, offset = ref$.offset, limit = ref$.limit;
        ref$ = {
          keyword: (ref$ = req.query).keyword,
          category: ref$.category,
          tag: ref$.tag
        }, keyword = ref$.keyword, tag = ref$.tag, category = ref$.category;
        if (!(slug = req.params.slug)) {
          return aux.reject(400);
        }
        offset = (ref$ = isNaN(+offset)
          ? 0
          : +offset) > 0 ? ref$ : 0;
        limit = (ref$ = (ref1$ = isNaN(+limit)
          ? 500
          : +limit) < 500 ? ref1$ : 500) > 1 ? ref$ : 1;
        if (!slug) {
          return aux.reject(400);
        }
        idx1 = 4 + [tag].filter(function(it){
          return it;
        }).length;
        idx2 = 4 + [tag, category].filter(function(it){
          return it;
        }).length;
        return io.query(["with cte as (\nselect p.*,u.displayname as ownername, u.username as owneremail\nfrom prj as p, users as u\nwhere p.detail is not null and u.key = p.owner and p.brd = $3 and p.deleted is not true", tag ? "and tag ? $4" : void 8, category ? "and category = $" + idx1 : void 8, keyword ? "and name ~ $" + idx2 : void 8, ") select * from (\n  table cte limit $2 offset $1\n) sub\nright join (select count(*) from cte) c(full_count) on true"].filter(function(it){
          return it;
        }).join(' '), [offset, limit, slug].concat([tag, category, keyword].filter(function(it){
          return it;
        })));
      }).then(function(r){
        r == null && (r = {});
        return (r.rows || (r.rows = [])).filter(function(it){
          return it.slug;
        });
      });
    };
    api.get('/brd/:brd/grp/:grp/judge-list', aux.signed, function(req, res){
      var ref$, brd, grp;
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp
      }, brd = ref$.brd, grp = ref$.grp;
      if (!(brd && grp)) {
        return aux.r400(res);
      }
      return Promise.resolve().then(function(){
        return io.query("select p.name, p.slug, p.detail->'info' as info, u.displayname as ownername from prj as p\nleft join users as u on u.key = p.owner\nwhere\n  p.detail is not null and\n  p.brd = $1 and\n  p.grp = $2 and\n  p.deleted is not true", [brd, grp]);
      }).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:slug/list', function(req, res){
      return getPrjList(req, res).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    app.get('/brd/:slug/list', function(req, res){
      var lc, slug;
      lc = {};
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return getPrjList(req, res).then(function(ret){
        lc.prjs = ret;
        return io.query("select b.name, b.description, b.slug, b.org, b.detail from brd as b\nwhere b.slug = $1 and b.deleted is not true", [slug]);
      }).then(function(r){
        var ref$, ref1$, ref2$;
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
        lc.pageInfo = import$((ref$ = (ref1$ = (ref2$ = lc.brd.detail).page || (ref2$.page = {})).info || (ref1$.info = {})).generic || (ref$.generic = {}), lc.brd.detail.info);
        delete lc.brd.detail;
        res.render('view/default/prj-list.pug', lc);
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
      return io.query("select * from brd where slug = $1 and deleted is not true", [slug]).then(function(r){
        var brd;
        r == null && (r = {});
        if (!(lc.brd = brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (brd.owner !== req.user.key) {
          return aux.reject(403);
        }
        return io.query("select * from prj where brd = $1 and deleted is not true", [brd.slug]);
      }).then(function(r){
        r == null && (r = {});
        lc.projects = r.rows || (r.rows = []);
        return res.render('pages/under-construction.pug', {
          brd: lc.brd,
          projects: lc.projects
        });
      })['catch'](aux.errorHandler(res));
    });
    api.post('/brd/:brd/grp/:grp/info', function(req, res){
      var brd, grp, fields, ref$;
      if (!((brd = req.params.brd) && (grp = req.params.grp))) {
        return aux.r400(res);
      }
      fields = ((ref$ = req.body).fields || (ref$.fields = [])).filter(function(it){
        return it === 'grade' || it === 'criteria' || it === 'form';
      });
      return io.query("select key,name,description,slug,detail from brd where slug = $1 and deleted is not true", [brd]).then(function(r){
        var ret, g, ref$, grpinfo, i$, len$, f;
        r == null && (r = {});
        if (!(ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (!(g = ((ref$ = ret.detail).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        grpinfo = {
          info: g.info,
          key: g.key
        };
        for (i$ = 0, len$ = (ref$ = fields).length; i$ < len$; ++i$) {
          f = ref$[i$];
          grpinfo[f] = g[f];
        }
        return res.send({
          brd: {
            key: ret.key,
            name: ret.name,
            description: ret.description,
            slug: ret.slug
          },
          grp: grpinfo
        });
      })['catch'](aux.errorHandler(res));
    });
    api.get('/brd/:slug/form/', function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return io.query("select key,name,description,slug,detail from brd where slug = $1 and deleted is not true", [slug]).then(function(r){
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
    api.post('/deploy', aux.signed, throttle.count.userMd, grecaptcha, function(req, res){
      var lc, ref$, slug, type;
      lc = {};
      ref$ = req.body || {}, slug = ref$.slug, type = ref$.type;
      if (!(slug && type && (type === 'org' || type === 'brd'))) {
        return aux.r400(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: type,
        slug: slug,
        action: 'owner'
      }).then(function(){
        if (type === 'org') {
          return io.query("select detail->'page'->'info' as info from org\nwhere slug = $1 and deleted is not true", [slug]);
        }
        return io.query("select b.detail->'page'->'info' as info, b.org\nfrom brd as b where b.slug = $1 and b.deleted is not true", [slug]);
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
    api.post('/brd', aux.signed, throttle.count.userMd, expressFormidable(), grecaptcha, function(req, res){
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
        return io.query("select slug from org where slug = $1 and deleted is not true", [org]);
      }).then(function(r){
        r == null && (r = {});
        if (!(r.rows || (r.rows = []))[0]) {
          return aux.reject(404);
        }
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'org',
          slug: org,
          action: 'owner'
        });
      }).then(function(){
        return io.query("insert into brd (name,description,slug,starttime,endtime,org,owner,detail)\nvalues ($1,$2,$3,$4,$5,$6,$7,$8) returning key", [name, description, slug, starttime || null, endtime || null, org, req.user.key, detail]);
      }).then(function(r){
        r == null && (r = {});
        return res.send(((r.rows || (r.rows = [])) || [])[0]);
      })['catch'](aux.errorHandler(res));
    });
    app.get('/org/:slug/admin', aux.signed, function(req, res){
      var slug;
      if (!(slug = req.params.key)) {
        return aux.r400(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'org',
        slug: slug,
        action: 'owner'
      }).then(function(){
        res.render('admin/index.pug', {
          org: {
            slug: slug
          }
        });
        return null;
      })['catch'](aux.errorHandler(res));
    });
    app.get('/brd/:slug/admin', aux.signed, function(req, res){
      var lc, slug;
      lc = {};
      if (!(slug = req.params.slug)) {
        return aux.r404(res);
      }
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: slug,
        action: 'owner'
      }).then(function(){
        return io.query("select * from brd where slug = $1 and deleted is not true", [slug]);
      }).then(function(r){
        var brd;
        r == null && (r = {});
        if (!(brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        lc.brd = brd;
        return !brd.org
          ? Promise.resolve()
          : io.query("select * from org where slug = $1 and deleted is not true", [brd.org]);
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
    return api.post('/slug-check/:type', throttle.count.ip, function(req, res){
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
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
