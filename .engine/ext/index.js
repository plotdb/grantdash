// Generated by LiveScript 1.3.0
(function(){
  var express, crypto, path, common, slugs, deploy, hmacDigest;
  express = require('express');
  crypto = require('crypto');
  path = require('path');
  common = require('../api/common');
  slugs = common.slugs, deploy = common.deploy;
  hmacDigest = function(content, key){
    var v1, v2, e;
    try {
      v1 = Buffer.from(req.headers['x-hub-signature']);
      v2 = Buffer.from("sha1=" + crypto.createHmac('sha1', key).update(content).digest('hex'));
      if (crypto.timingSafeEqual(v1, v2)) {
        return true;
      }
    } catch (e$) {
      e = e$;
      return false;
    }
    return false;
  };
  module.exports = function(engine, io){
    return engine.router.ext.post('/deploy', function(req, res){
      var url, ref$, branch, lc;
      url = ((ref$ = req.body || (req.body = {})).repository || (ref$.repository = {})).html_url;
      branch = (/^refs\/heads\/(.+)$/.exec(req.body.ref || '') || [])[1];
      res.send({});
      if (!(url && branch)) {
        return;
      }
      lc = {};
      return io.query("select slug, detail->'page'->'info'->'git' as git\nfrom brd where (detail->'page'->'info'->'git'->>'url')::text ~ $1\nand (detail->'page'->'info'->'git'->>'branch')::text ~ $2", [url, branch]).then(function(r){
        r == null && (r = {});
        lc.brd = r.rows || (r.rows = []);
        return io.query("select slug, detail->'page'->'info'->'git' as git\nfrom org where (detail->'page'->'info'->'git'->>'url')::text ~ $1\nand (detail->'page'->'info'->'git'->>'branch')::text ~ $2", [url, branch]);
      }).then(function(r){
        var list;
        r == null && (r = {});
        lc.org = r.rows || (r.rows = []);
        list = [].concat(lc.brd.map(function(it){
          return {
            io: io,
            brd: it.slug,
            git: it.git
          };
        }), lc.org.map(function(it){
          return {
            io: io,
            org: it.slug,
            git: it.git
          };
        }));
        return Promise.all(list.map(function(){
          return Promise.resolve.then(function(it){
            if (hmacDigest(req.rawBody, it.secret)) {
              return slugs(it).then(function(ret){
                var root, prj, org, brd;
                root = ret.root, prj = ret.prj, org = ret.org, brd = ret.brd;
                if (!root) {
                  return;
                }
                return deploy({
                  url: it.git.url,
                  branch: it.git.branch,
                  root: path.join(root, 'static')
                });
              });
            }
          });
        }));
      }).then(function(){})['catch'](function(it){
        return console.log(it);
      });
    });
  };
}).call(this);
