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
    var deploy, slugs, saveSnapshot, api, app, landing, landingPage, uploadVids, upload, updatePermission, getPrjList;
    deploy = common.deploy, slugs = common.slugs, saveSnapshot = common.saveSnapshot;
    api = engine.router.api;
    app = engine.app;
    landing = {
      org: function(arg$){
        var slug, req, res, lc;
        slug = arg$.slug, req = arg$.req, res = arg$.res;
        lc = {};
        if (!slug) {
          return aux.r404(res);
        }
        return io.query("select * from org where org.slug = $1 and org.deleted is not true", [slug]).then(function(r){
          r == null && (r = {});
          if (!(lc.org = (r.rows || (r.rows = []))[0])) {
            return aux.r404(res);
          }
          return io.query("select name,description,slug,key,detail->'stage' as stage\nfrom brd where brd.org = $1 and brd.deleted is not true\norder by createdtime desc", [slug]);
        }).then(function(r){
          var brds;
          r == null && (r = {});
          brds = (r.rows || (r.rows = [])).filter(function(it){
            var stage, cfgs, ret;
            stage = (it.stage || (it.stage = {})).list || [];
            cfgs = stage.filter(function(s){
              if (s.start && Date.now() < new Date(s.start).getTime()) {
                return false;
              }
              if (s.end && Date.now() > new Date(s.end).getTime()) {
                return false;
              }
              return true;
            });
            ret = cfgs[cfgs.length - 1] || {};
            if (!ret.config) {
              ret.config = {};
            }
            return ret.config["public"];
          });
          return res.render('view/default/org.pug', {
            org: lc.org,
            brds: brds
          });
        });
      },
      brd: function(arg$){
        var slug, req, res, lc;
        slug = arg$.slug, req = arg$.req, res = arg$.res;
        lc = {};
        if (!slug) {
          return aux.r404(res);
        }
        return io.query("select * from brd where slug = $1 and deleted is not true", [slug]).then(function(r){
          r == null && (r = {});
          if (!(lc.brd = (r.rows || (r.rows = []))[0])) {
            return aux.r404(res);
          }
          return cache.stage.check({
            io: io,
            type: 'brd',
            slug: slug
          });
        }).then(function(stage){
          return res.render('view/default/brd.pug', {
            brd: lc.brd,
            stage: stage
          });
        });
      }
    };
    landingPage = function(type, slug, req, res){
      var lc, p;
      lc = {};
      p = type === 'brd'
        ? io.query("select name, description, slug, key, org, detail->'page'->'info' as pageinfo\nfrom brd where deleted is not true and slug = $1", [slug])
        : io.query("select name, description, slug, key, detail->'page'->'info' as pageinfo\nfrom org where deleted is not true and slug = $1", [slug]);
      return p.then(function(r){
        var ret, info, indexPath;
        r == null && (r = {});
        lc[type] = ret = (r.rows || (r.rows = []))[0];
        info = ret.pageinfo;
        if (info && (info.opt || 'default') === 'default' && (info.generic || (info.generic = {})).landingUrl) {
          return Promise.resolve((info.generic || (info.generic = {})).landingUrl);
        } else {
          indexPath = type === 'brd'
            ? "org/" + ret.org + "/brd/" + slug + "/static/index.html"
            : "org/" + slug + "/static/index.html";
          return fsExtra.exists(path.join("users", indexPath)).then(function(it){
            return it ? path.join("/dash/private", indexPath) : null;
          });
        }
      }).then(function(url){
        if (url) {
          if (/^https?:/.exec(url)) {
            return res.status(302).redirect(url);
          }
          res.set({
            "X-Accel-Redirect": url
          });
          return res.send();
        }
        return landing[type]({
          slug: slug,
          req: req,
          res: res
        });
      })['catch'](aux.errorHandler(res));
    };
    app.get('/', function(req, res){
      var slug, type;
      if (!(req.scope && req.scope.org)) {
        return aux.r404(res);
      }
      slug = req.scope.org || req.scope.brd;
      type = req.scope.brd ? 'brd' : 'org';
      return landingPage(type, slug, req, res);
    });
    app.get('/org/:slug', function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return landingPage('org', slug, req, res);
    });
    app.get('/brd/:slug', function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return landingPage('brd', slug, req, res);
    });
    uploadVids = {};
    app.get('/org/:org/prj/:prj/upload/:file', function(req, res){
      var ref$, org, prj, file, lc, vid, now, fvid, k, v;
      ref$ = {
        org: (ref$ = req.params).org,
        prj: ref$.prj,
        file: ref$.file
      }, org = ref$.org, prj = ref$.prj, file = ref$.file;
      lc = {};
      res.set({
        "X-Accel-Redirect": "/dash/private/org/" + org + "/prj/" + prj + "/upload/" + file
      });
      return res.send();
      vid = req.query.id;
      now = Date.now();
      fvid = vid ? prj + "-" + file + "-" + vid : null;
      if (fvid && uploadVids[fvid]) {
        if (uploadVids[fvid].time > now && !(req.user && req.user.key)) {
          res.set({
            "X-Accel-Redirect": "/dash/private/org/" + org + "/prj/" + prj + "/upload/" + file
          });
          return res.send();
        }
        uploadVids[fvid] = null;
      }
      for (k in ref$ = uploadVids) {
        v = ref$[k];
        if (v && v.time > now) {
          delete uploadVids[k];
        }
      }
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
          action: ['owner', 'judge']
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
          if (isPublic) {
            return;
          }
          if (!(req.user && req.user.key)) {
            return Promise.reject(403);
          }
          return io.query("select owner from perm_judge where brd = $1 and grp = $2 and owner = $3", [req.scope.brd, grp.key, req.user.key]).then(function(r){
            r == null && (r = {});
            if (!(r.rows || (r.rows = [])).length) {
              return Promise.reject(403);
            }
          });
        });
      }).then(function(){
        if (fvid) {
          uploadVids[fvid] = {
            time: Date.now() + 1000 * 30
          };
        }
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
        return it.size >= 104857600;
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
        if (lc.type === 'prj') {
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
              slug: prj,
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
          });
        } else {
          return cache.perm.check({
            io: io,
            user: req.user,
            type: lc.type,
            slug: lc.slug,
            action: 'owner'
          });
        }
      }).then(function(){
        return upload({
          root: lc.root,
          files: files
        });
      }).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    updatePermission = function(arg$){
      var type, perm, slug, entries;
      type = arg$.type, perm = arg$.perm, slug = arg$.slug;
      entries = [];
      (perm.roles || (perm.roles = [])).map(function(role){
        return (role.list || (role.list = [])).map(function(it){
          return entries.push({
            type: it.type,
            ref: it.key + "",
            role: role.key
          });
        });
      });
      return io.query("select key,type,ref,role from perm where objtype = $1 and objslug = $2", [type, slug]).then(function(r){
        var perms;
        r == null && (r = {});
        perms = (r.rows || (r.rows = [])).filter(function(p){
          return !entries.filter(function(e){
            return e.type === p.type && e.ref === p.ref && e.role === p.role;
          }).length;
        }).map(function(it){
          return it.key;
        });
        return io.query("delete from perm where objtype = $1 and objslug = $2 and key = ANY($3::int[])", [type, slug, perms]);
      }).then(function(){
        return io.query("insert into perm (objtype, objslug, role, type, ref)\n  select t.objtype, t.objslug, t.role, t.type, t.ref from (select\n    unnest($1::text[]) as objtype,\n    unnest($2::text[]) as objslug,\n    unnest($3::text[]) as role,\n    unnest($4::text[]) as type,\n    unnest($5::text[]) as ref\n  ) t\non conflict do nothing", [
          entries.map(function(){
            return type;
          }), entries.map(function(){
            return slug;
          }), entries.map(function(it){
            return it.role;
          }), entries.map(function(it){
            return it.type;
          }), entries.map(function(it){
            return it.ref;
          })
        ]);
      }).then(function(){});
    };
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
      ref$ = [((info.name || info.title || '') + "").substring(0, 128), ((info.description || '') + "").substring(0, 500)], name = ref$[0], description = ref$[1];
      return cache.perm.check({
        io: io,
        user: req.user,
        type: type,
        slug: slug,
        action: 'owner'
      })['catch'](function(e){
        if (type === 'prj') {
          return cache.perm.check({
            io: io,
            user: req.user,
            type: 'brd',
            slug: req.scope.brd,
            action: 'owner'
          });
        } else {
          return Promise.reject(e);
        }
      }).then(function(){
        if (type === 'prj') {
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
              action: 'prj-edit-own'
            });
          });
        } else {
          return Promise.resolve();
        }
      }).then(function(){
        return io.query("update " + type + " set detail = $1 where slug = $2 and deleted is not true", [JSON.stringify(payload), slug]);
      }).then(function(){
        var thumb, time;
        if (!name) {
          return;
        }
        if (type === 'prj') {
          thumb = (info.thumb || {}).fn;
          return io.query("update prj set (name,description,category,tag,thumb,state) = ($1,$2,$3,$4,$5,'active')\nwhere slug = $6 and deleted is not true", [name, description, info.category || '', JSON.stringify(info.tag || []), thumb, slug]);
        } else if (type === 'brd') {
          time = ['starttime', 'endtime'].map(function(it){
            var ret;
            if (!info[it] || isNaN(ret = new Date(info[it]))) {
              return null;
            } else {
              return ret.toISOString();
            }
          });
          return io.query("update " + type + " set (name,description,starttime,endtime) = ($1,$2,$3,$4)\nwhere slug = $5 and deleted is not true", [name, description, time[0], time[1], slug]);
        } else {
          return io.query("update " + type + " set (name,description) = ($1,$2) where slug = $3 and deleted is not true", [name, description, slug]);
        }
      }).then(function(){
        if (payload.perm) {
          return updatePermission({
            type: type,
            perm: payload.perm,
            slug: slug
          });
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
      })['catch'](aux.errorHandler(res));
    });
    getPrjList = function(req, res){
      return Promise.resolve().then(function(){
        var ref$, offset, limit, badge, keyword, tag, category, grp, slug, ref1$, idx1, idx2, idx3;
        ref$ = {
          offset: (ref$ = req.query).offset,
          limit: ref$.limit
        }, offset = ref$.offset, limit = ref$.limit;
        badge = (req.query.badge || '').split(',');
        ref$ = {
          keyword: (ref$ = req.query).keyword,
          category: ref$.category,
          tag: ref$.tag,
          grp: ref$.grp
        }, keyword = ref$.keyword, tag = ref$.tag, category = ref$.category, grp = ref$.grp;
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
        idx3 = 4 + [tag, category, keyword].filter(function(it){
          return it;
        }).length;
        return io.query(["with cte as (\nselect p.*,u.displayname as ownername, u.username as owneremail\nfrom prj as p, users as u\nwhere p.detail is not null and u.key = p.owner and p.brd = $3 and p.deleted is not true", grp ? "and grp = $" + idx3 : void 8, tag ? "and tag ? $4" : void 8, category ? "and category = $" + idx1 : void 8, keyword ? "and name ~ $" + idx2 : void 8, in$('shortlist', badge) ? "and (system->'badge'->>'shortlist')::bool = true" : void 8, in$('finalist', badge) ? "and (system->'badge'->>'finalist')::bool = true" : void 8, in$('winner', badge) ? "and (system->'badge'->>'winner')::bool = true" : void 8, ") select * from (\n  table cte limit $2 offset $1\n) sub\nright join (select count(*) from cte) c(full_count) on true"].filter(function(it){
          return it;
        }).join(' '), [offset, limit, slug].concat([tag, category, keyword, grp].filter(function(it){
          return it;
        })));
      }).then(function(r){
        r == null && (r = {});
        return (r.rows || (r.rows = [])).filter(function(it){
          return it.slug;
        });
      });
    };
    api.get('/brd/:slug/list', throttle.count.user, function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: slug,
        name: 'prj-list-view'
      })['catch'](function(){
        return cache.perm.check({
          io: io,
          user: req.user,
          type: 'brd',
          slug: slug,
          action: ['owner', 'judge']
        });
      }).then(function(){
        return getPrjList(req, res);
      }).then(function(it){
        return res.send(it);
      })['catch'](aux.errorHandler(res));
    });
    app.get('/brd/:slug/prj/create', function(req, res){
      var lc, slug;
      lc = {};
      slug = req.params.slug;
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: slug,
        name: 'prj-new'
      })['catch'](function(){
        return Promise.reject(new lderror({
          ldcv: "not-yet-available"
        }, 1012));
      }).then(function(){
        return io.query("select name,slug,org,detail from brd where slug = $1 and deleted is not true", [slug]);
      }).then(function(r){
        var brd, view, ref$, ref1$;
        r == null && (r = {});
        if (!(lc.brd = brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(400);
        }
        if (!(brd.detail.custom && brd.detail.custom.view)) {
          view = 'view/default/prj-create.pug';
        } else {
          view = "view/" + brd.detail.custom.view + "/prj-create.pug";
        }
        delete brd.detail;
        return res.render(view, (ref$ = (ref1$ = {
          brd: lc.brd
        }, ref1$.exports = {
          brd: lc.brd
        }, ref1$), ref$.domain = req.scope.domain, ref$));
      })['catch'](aux.errorHandler(res));
    });
    app.get('/brd/:slug/list', function(req, res){
      var lc, slug;
      lc = {};
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return cache.stage.check({
        io: io,
        type: 'brd',
        slug: slug,
        name: 'prj-list-view'
      }).then(function(){
        return getPrjList(req, res);
      }).then(function(ret){
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
    app.get('/brd/:slug', function(req, res){
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
        return res.render('pages/under-construction.pug', {
          brd: lc.brd
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
    api.post('/slug-check/:type', aux.signed, throttle.count.ip, function(req, res){
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
    api.post('/brd/:brd/grp/:grp/info', function(req, res){
      var lc, brd, grp, fields, ref$;
      lc = {};
      if (!((brd = req.params.brd) && (grp = req.params.grp))) {
        return aux.r400(res);
      }
      fields = ((ref$ = req.body).fields || (ref$.fields = [])).filter(function(it){
        return it === 'grade' || it === 'judge' || it === 'criteria' || it === 'form' || it === 'judgePerm';
      });
      return io.query("select key,name,description,slug,detail from brd where slug = $1 and deleted is not true", [brd]).then(function(r){
        var ret, g, ref$, grpinfo, i$, len$, f, jp, emails;
        r == null && (r = {});
        if (!(lc.ret = ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (!(g = ((ref$ = ret.detail).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        })[0])) {
          return aux.reject(404);
        }
        lc.grpinfo = grpinfo = {
          info: g.info,
          key: g.key
        };
        for (i$ = 0, len$ = (ref$ = fields).length; i$ < len$; ++i$) {
          f = ref$[i$];
          grpinfo[f] = g[f];
        }
        if (in$('judgePerm', fields)) {
          jp = (ref$ = grpinfo.judgePerm || (grpinfo.judgePerm = {})).list || (ref$.list = []);
          emails = jp.map(function(it){
            return it.email;
          });
          return io.query("select u.key,u.username from users as u where u.username = ANY($1::text[])", [emails]).then(function(r){
            var hash;
            r == null && (r = {});
            hash = {};
            (r.rows || (r.rows = [])).map(function(it){
              return hash[it.username] = it.key;
            });
            return jp.map(function(j){
              return j.key = hash[j.email];
            });
          });
        } else {
          return Promise.resolve();
        }
      }).then(function(){
        var ref$;
        return res.send({
          brd: {
            key: (ref$ = lc.ret).key,
            name: ref$.name,
            description: ref$.description,
            slug: ref$.slug
          },
          grp: lc.grpinfo
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
    return api.get('/brd/:brd/grp/:grp/prjs', function(req, res){
      var ref$, brd, grp;
      if (!(req.user && req.user.key)) {
        return aux.r403(res);
      }
      ref$ = {
        brd: (ref$ = req.params).brd,
        grp: ref$.grp
      }, brd = ref$.brd, grp = ref$.grp;
      return cache.perm.check({
        io: io,
        user: req.user,
        type: 'brd',
        slug: brd,
        action: ['owner']
      }).then(function(){
        return io.query("select p.*, u.username from prj as p\nleft join users as u on u.key = p.owner\nwhere\n  p.detail is not null\n  and p.deleted is not true\n  and p.brd = $1\n  and p.grp = $2", [brd, grp]);
      }).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    });
  });
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
