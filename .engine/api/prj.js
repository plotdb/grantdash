// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, path, crypto, readChunk, sharp, expressFormidable, uploadr, lderror, suuid, aux;
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
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, app;
    api = engine.router.api;
    app = engine.app;
    app.get('/prj/:slug', function(req, res){
      var lc, slug;
      lc = {};
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return io.query("select p.*,u.displayname as ownerName\nfrom prj as p, users as u\nwhere slug = $1 and p.owner = u.key", [slug]).then(function(r){
        var prj;
        r == null && (r = {});
        if (!(lc.prj = prj = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        return io.query("select name,slug,org,detail from brd where brd.slug = $1", [lc.prj.brd]);
      }).then(function(r){
        var brd, grp, ref$, ref1$, ref2$, view;
        r == null && (r = {});
        if (!(lc.brd = brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(400);
        }
        lc.grp = grp = (((ref$ = brd.detail || (brd.detail = {})).group || (ref$.group = {})) || []).filter(function(it){
          return it.key === lc.prj.grp;
        })[0];
        lc.pageInfo = (ref$ = (ref1$ = (ref2$ = brd.detail || (brd.detail = {})).page || (ref2$.page = {})).info || (ref1$.info = {})).generic || (ref$.generic = {});
        if (!lc.grp) {
          return aux.reject(400);
        }
        lc.grp = grp = {
          form: grp.form,
          info: grp.info
        };
        delete brd.detail;
        view = (req.query || (req.query = {})).simple != null ? 'prj/view-standalone.pug' : 'prj/view.pug';
        return res.render(view, (ref$ = {
          prj: lc.prj,
          grp: lc.grp,
          brd: lc.brd,
          pageInfo: lc.pageInfo
        }, ref$.exports = {
          prj: lc.prj,
          brd: lc.brd,
          grp: lc.grp
        }, ref$));
      })['catch'](aux.errorHandler(res));
    });
    api.get("/prj/:slug/", aux.signed, function(req, res){
      var slug;
      if (!(slug = req.params.slug)) {
        return aux.r400(res);
      }
      return io.query("select p.*, u.displayname as ownername\nfrom prj as p, users as u\nwhere p.slug = $1 and u.key = p.owner", [slug]).then(function(r){
        r == null && (r = {});
        return res.send((r.rows || (r.rows = []))[0] || {});
      })['catch'](aux.errorHandler(res));
    });
    /*
    api.put \/prj/:slug/file/:key, aux.signed, express-formidable({multiples:true}), (req, res) ->
      lc = {}
      if !(slug = req.params.slug) => return aux.r400 res
      if !((key = req.params.key) and /^([0-9a-zA-Z+_-]+)$/.exec(key)) => return aux.r404 res
      io.query """select slug from prj where slug = $1""", [slug]
        .then (r={}) ->
          if !(lc.prj = r.[]rows.0) => return aux.reject 404
          lc.root = "users/prj/#{lc.prj.slug}"
        .then ->
          lc.files = req.files["file[]"]
          lc.files = if Array.isArray(lc.files) => lc.files else [lc.files]
          if lc.files.length > 100 or lc.files.length < 1 => return aux.reject 400
          lc.files = lc.files
            .map -> {path: it.path, type: it.type.split(\/).1}
            .filter -> /([a-zA-Z0-9]+$)/.exec(it.type)
          fs-extra.ensure-dir lc.root
        .then ->
          Promise.all(
            lc.files.map (file, idx) ->
              fs-extra.copy file.path, path.join(lc.root, "draft.#{key}.#{idx}.#{file.type}")
          )
        .then -> res.send {}
        .catch aux.error-handler res
    */
    return api.post('/prj/', aux.signed, expressFormidable(), function(req, res){
      var lc, ref$, name, description, brd, grp, thumb, slug;
      lc = {};
      ref$ = req.fields, name = ref$.name, description = ref$.description, brd = ref$.brd, grp = ref$.grp;
      if (!(brd && grp)) {
        return aux.r400(res);
      }
      thumb = (req.files["thumbnail[]"] || {}).path;
      slug = suuid();
      return io.query("select org, slug, key, detail->'group' as group from brd where slug = $1", [brd]).then(function(r){
        var ref$;
        r == null && (r = {});
        if (!(lc.brd = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        if (!((ref$ = lc.brd).group || (ref$.group = [])).filter(function(it){
          return it.key === grp;
        }).length) {
          return aux.reject(404);
        }
        if (!lc.brd.org) {
          return aux.reject(404);
        }
        return io.query("insert into prj (name,description,brd,grp,slug,owner)\nvalues ($1,$2,$3,$4,$5,$6) returning key", [name, description, brd, grp, slug, req.user.key]);
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
}).call(this);
