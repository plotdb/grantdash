// Generated by LiveScript 1.3.0
(function(){
  var fs, path, lderror, suuid, aux;
  fs = require('fs');
  path = require('path');
  lderror = require('lderror');
  suuid = require('suuid');
  aux = require('../aux');
  (function(it){
    return module.exports = it;
  })(function(engine, io){
    var api, allThread;
    api = engine.router.api;
    allThread = function(req, res){
      var limit, ref$, offset;
      limit = isNaN(req.query.limit)
        ? 20
        : (ref$ = +req.query.limit) < 100 ? ref$ : 100;
      offset = isNaN(req.query.offset)
        ? 0
        : +req.query.offset;
      return io.query("select d.title, d.slug, d.createdtime, d.modifiedtime, json_agg(distinct c.owner) as users\nfrom discuss as d\nleft join comment as c on d.key = c.discuss\ngroup by d.key\nlimit $1 offset $2", [limit, offset]).then(function(r){
        r == null && (r = {});
        return res.send(r.rows || (r.rows = []));
      })['catch'](aux.errorHandler(res));
    };
    api.get('/discuss/', function(req, res){
      var lc, ref$, slug, url, limit, offset, promise;
      lc = {};
      ref$ = {
        slug: (ref$ = req.query).slug,
        url: ref$.url
      }, slug = ref$.slug, url = ref$.url;
      if (!(slug || url)) {
        return allThread(req, res);
      }
      limit = isNaN(req.query.limit)
        ? 20
        : (ref$ = +req.query.limit) < 100 ? ref$ : 100;
      offset = isNaN(req.query.offset)
        ? 0
        : +req.query.offset;
      promise = slug
        ? io.query("select key,title from discuss where slug = $1 limit 1", [slug])
        : io.query("select key,title from discuss where url = $1 limit 1", [url]);
      return promise.then(function(r){
        var discuss;
        r == null && (r = {});
        lc.discuss = discuss = (r.rows || (r.rows = []))[0];
        if (!discuss) {
          return res.send({});
        }
        return io.query("select c.*, u.displayname\nfrom comment as c, users as u\nwhere c.discuss = $1 and c.owner = u.key\nand c.deleted is not true\nand c.state = 'active'\norder by distance limit $2 offset $3", [discuss.key, limit, offset]);
      }).then(function(r){
        r == null && (r = {});
        return res.send({
          discuss: lc.discuss,
          comments: r.rows || (r.rows = [])
        });
      })['catch'](aux.errorHandler(res));
    });
    return api.post('/discuss/', aux.signed, function(req, res){
      var lc;
      lc = {};
      return Promise.resolve().then(function(){
        var ref$;
        lc.url = (ref$ = req.body).url;
        lc.slug = ref$.slug;
        lc.reply = ref$.reply;
        lc.content = ref$.content;
        lc.title = ref$.title;
        lc.content = {
          body: (ref$ = lc.content).body,
          config: ref$.config
        };
        if (lc.slug) {
          return io.query("select key, slug from discuss where slug = $1", [lc.slug]);
        } else if (lc.url) {
          return io.query("select key, slug from discuss where url = $1", [lc.url]);
        } else {
          return {};
        }
      }).then(function(r){
        r == null && (r = {});
        if ((r.rows || (r.rows = [])).length) {
          return Promise.resolve(r);
        }
        lc.slug = suuid();
        return io.query("insert into discuss (slug, url, title) values ($1,$2,$3) returning key", [lc.slug, lc.url, lc.title || '']);
      }).then(function(r){
        r == null && (r = {});
        lc.discuss = (r.rows || (r.rows = []))[0] || {};
        if (!lc.discuss.key) {
          return aux.reject(400);
        }
        if (!lc.discuss.slug) {
          lc.discuss.slug = lc.slug;
        }
        return lc.reply
          ? io.query("select c.* from comment as c\nwhere key = $1 and c.deleted is not true and c.state = 'active'", [lc.reply])
          : io.query("select count(c.key) as distance, d.key as discuss\nfrom comment as c, discuss as d \nwhere c.reply is null and d.key = $1 and d.key = c.discuss\ngroup by d.key", [lc.discuss.key]);
      }).then(function(r){
        var ret, distance;
        r == null && (r = {});
        ret = (r.rows || (r.rows = []))[0] || {};
        distance = isNaN(+ret.distance)
          ? 0
          : +ret.distance;
        lc.distance = distance + 1;
        lc.state = 'active';
        return io.query("insert into comment\n(owner,discuss,distance,content,state,reply) values ($1,$2,$3,$4,$5,$6)\nreturning key", [req.user.key, lc.discuss.key, lc.distance, lc.content, lc.state, lc.reply]);
      }).then(function(r){
        r == null && (r = {});
        lc.ret = (r.rows || (r.rows = []))[0] || {};
        lc.ret.slug = lc.discuss.slug;
        return io.query("update discuss set modifiedtime = now()");
      }).then(function(){
        return res.send(lc.ret);
      })['catch'](aux.errorHandler(res));
    });
  });
}).call(this);
