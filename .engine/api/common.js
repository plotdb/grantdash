// Generated by LiveScript 1.3.0
(function(){
  var nodegit, lderror, path, aux, saveSnapshot, slugs, deploy;
  nodegit = require('nodegit');
  lderror = require('lderror');
  path = require('path');
  aux = require('../aux');
  saveSnapshot = function(arg$){
    var io, sharedb, doc_id, version;
    io = arg$.io, sharedb = arg$.sharedb, doc_id = arg$.doc_id, version = arg$.version;
    return new Promise(function(res, rej){
      var lc, p;
      lc = {
        id: doc_id
      };
      if (version != null) {
        p = new Promise(function(res, rej){
          return sharedb.connect.fetchSnapshot('doc', doc_id, version, function(e, b){
            if (e) {
              return rej(e);
            }
            lc.id = b.id;
            lc.v = b.v;
            lc.type = b.type;
            lc.data = b.data;
            return res();
          });
        });
      } else {
        p = io.query("select doc_id, version, doc_type, data from snapshots where doc_id = $1", [doc_id]).then(function(r){
          var ret;
          r == null && (r = {});
          if (!(ret = (r.rows || (r.rows = []))[0])) {
            return aux.reject(404);
          }
          lc.v = ret.version;
          lc.type = ret.doc_type;
          return lc.data = ret.data;
        });
      }
      return p.then(function(){
        return io.query("select doc_id,version from milestonesnapshots where version = $1", [lc.v]);
      }).then(function(r){
        r == null && (r = {});
        if ((r.rows || (r.rows = [])).length) {
          return Promise.resolve();
        }
        return io.query("insert into milestonesnapshots (collection,doc_id,doc_type,version,data) values ($1,$2,$3,$4,$5)", ["doc", lc.id, lc.type, lc.v, lc.data]);
      }).then(function(){
        return res();
      })['catch'](rej);
    });
  };
  slugs = function(arg$){
    var io, org, brd, prj, post;
    io = arg$.io, org = arg$.org, brd = arg$.brd, prj = arg$.prj, post = arg$.post;
    return new Promise(function(res, rej){
      var type, promise;
      type = prj
        ? 'prj'
        : brd
          ? 'brd'
          : org
            ? 'org'
            : post ? 'post' : null;
      if (!type) {
        return rej(new lderror(400));
      }
      promise = type === 'prj'
        ? io.query("select o.slug as org, b.slug as brd, p.slug as prj\nfrom org as o, brd as b, prj as p\nwhere p.slug = $1 and p.brd = b.slug and b.org = o.slug", [prj])
        : type === 'post'
          ? io.query("select o.slug as org, b.slug as brd, p.slug as post\nfrom org as o, brd as b, post as p\nwhere p.slug = $1 and p.brd = b.slug and b.org = o.slug", [post])
          : type === 'brd'
            ? io.query("select o.slug as org, b.slug as brd\nfrom org as o, brd as b\nwhere b.slug = $1 and b.org = o.slug", [brd])
            : type === 'org' ? io.query("select o.slug as org\nfrom org as o\nwhere o.slug = $1", [org]) : void 8;
      return promise.then(function(r){
        var ret, org, prj, brd, post, slug, root;
        r == null && (r = {});
        if (!(ret = (r.rows || (r.rows = []))[0])) {
          return aux.reject(404);
        }
        org = ret.org, prj = ret.prj, brd = ret.brd, post = ret.post;
        slug = ret[type];
        root = type === 'prj'
          ? "users/org/" + org + "/prj/" + prj
          : type === 'post'
            ? "users/org/" + org + "/post/" + post
            : type === 'brd'
              ? "users/org/" + org + "/brd/" + brd
              : type === 'org' ? "users/org/" + org : null;
        if (!root) {
          return aux.reject(400);
        }
        return res((ret.type = type, ret.root = root, ret.slug = slug, ret));
      })['catch'](function(it){
        return rej(it);
      });
    });
  };
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
  module.exports = {
    slugs: slugs,
    deploy: deploy,
    saveSnapshot: saveSnapshot
  };
}).call(this);
