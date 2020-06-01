// Generated by LiveScript 1.3.0
(function(){
  var fs, os, moment, momentTimezone, lderror, base;
  fs = require('fs');
  os = require('os');
  moment = require('moment');
  momentTimezone = require('moment-timezone');
  lderror = require('lderror');
  base = {
    eschtml: function(){
      var map;
      map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&#34;',
        "'": '&#39;'
      };
      return function(str){
        return str.replace(/&<>'"]/g, function(it){
          return map[it];
        });
      };
    }(),
    ip: function(req){
      return req.headers['X-Real-IP'] || req.headers['x-real-ip'] || req.connection.remoteAddress;
    },
    log: function(req, msg, head){
      var date;
      head == null && (head = "");
      date = moment(new Date()).tz("Asia/Taipei").format("MM-DD HH:mm");
      return console.log("[" + date + "|" + head + (head && req ? ' ' : '') + (req ? req.user.key : '') + "] " + msg);
    },
    pad: function(str, len, char){
      var ref$;
      str == null && (str = "");
      len == null && (len = 2);
      char == null && (char = ' ');
      ref$ = [str + "", char + ""], str = ref$[0], char = ref$[1];
      return repeatString$(char + "", len - str.length) + (str + "");
    },
    error: function(code, msg){
      var ref$;
      code == null && (code = 403);
      msg == null && (msg = "");
      return ref$ = new Error(msg), ref$.code = code, ref$;
    },
    reject: function(code, msg){
      var ref$;
      code == null && (code = 403);
      msg == null && (msg = "");
      return Promise.reject((ref$ = new Error(typeof msg === typeof {} ? JSON.stringify(msg) : msg), ref$.code = code, ref$));
    },
    nowTag: function(){
      var d;
      d = new Date();
      return (d.getYear() + "").substring(1, 3) + ("/" + base.pad(d.getMonth() + 1, 2, '0')) + ("/" + base.pad(d.getDate(), 2, '0')) + (" " + base.pad(d.getHours(), 2, '0')) + (":" + base.pad(d.getMinutes(), 2, '0')) + (":" + base.pad(d.getSeconds(), 2, '0'));
    },
    errorHandler: function(res, asPage){
      asPage == null && (asPage = false);
      return function(e){
        e == null && (e = {});
        if (e instanceof lderror) {
          res.status(e.code || 403).send(e.toString({
            stack: false
          }));
        } else if (typeof e.code === 'number') {
          if (asPage && base["r" + e.code]) {
            base["r" + e.code](res, e.message, asPage);
          } else {
            res.status(e.code).send(e.message);
          }
        } else {
          console.error("[" + base.nowTag() + "] " + (e.stack || e));
          if (asPage) {
            base.r403(res, "sorry.", asPage);
          } else {
            res.status(403).send();
          }
        }
        return null;
      };
    },
    r500: function(res, error){
      console.log("[ERROR] " + error);
      return res.status(500).json({
        detail: error
      });
    },
    r200: function(res){
      return res.send();
    },
    res: function(arg$){
      var ref$, res, code, msg, asPage;
      ref$ = arg$ != null
        ? arg$
        : {
          code: 404
        }, res = ref$.res, code = ref$.code, msg = ref$.msg, asPage = ref$.asPage;
      if (asPage) {
        res.status(code).send();
      } else {
        res.status(code).send(msg);
      }
      return null;
    },
    r404: function(res, msg, asPage){
      msg == null && (msg = "");
      asPage == null && (asPage = false);
      return this.res({
        res: res,
        msg: msg,
        asPage: asPage,
        code: 404
      });
    },
    r403: function(res, msg, asPage){
      msg == null && (msg = "");
      asPage == null && (asPage = false);
      return this.res({
        res: res,
        msg: msg,
        asPage: asPage,
        code: 403
      });
    },
    r413: function(res, msg, asPage){
      msg == null && (msg = "");
      asPage == null && (asPage = false);
      return this.res({
        res: res,
        msg: msg,
        asPage: asPage,
        code: 400
      });
    },
    r402: function(res, msg, asPage){
      msg == null && (msg = "");
      asPage == null && (asPage = false);
      return this.res({
        res: res,
        msg: msg,
        asPage: asPage,
        code: 400
      });
    },
    r400: function(res, msg, asPage){
      msg == null && (msg = "");
      asPage == null && (asPage = false);
      return this.res({
        res: res,
        msg: msg,
        asPage: asPage,
        code: 400
      });
    },
    type: {
      json: function(req, res, next){
        res.set('Content-Type', 'application/json');
        return next();
      }
    },
    numid: function(asPage, cb){
      return function(req, res){
        if (!/^\d+$/.exec(req.params.id)) {
          return base.r400(res, "incorrect key type", asPage);
        }
        return cb(req, res);
      };
    },
    numids: function(asPage, names, cb){
      names == null && (names = []);
      return function(req, res){
        if (names.filter(function(it){
          return !/^\d+$/.exec(req.params[it]);
        }).length) {
          return base.r400(res, "incorrect key type", asPage);
        }
        return cb(req, res);
      };
    },
    signed: function(req, res, next){
      if (!(req.user && req.user.key)) {
        return next(new lderror(1000));
      } else {
        return next();
      }
    },
    authorized: function(cb){
      return function(req, res){
        if (!(req.user && req.user.staff === 1)) {
          return res.status(404).render('err/404.pug', {
            url: req.originalUrl
          });
        }
        return cb(req, res);
      };
    },
    needlogin: function(cb){
      return function(req, res){
        if (!(req.user && req.user.key > 0)) {
          return res.status(403).redirect("/dash/auth/?nexturl=/dash" + req.originalUrl);
        }
        return cb(req, res);
      };
    },
    mergeConfig: function(a, b){
      var k, v;
      for (k in b) {
        v = b[k];
        if (a[k] && typeof a[k] === typeof {}) {
          base.mergeConfig(a[k], b[k]);
        } else {
          a[k] = b[k];
        }
      }
      return a;
    },
    throttling: {
      key: function(req){
        return req.ip + ":" + req.originalUrl.replace(/\?.*$/, '');
      }
    },
    readJson: function(path){
      return new Promise(function(res, rej){
        return fs.readFile(path, function(e, c){
          if (e) {
            return res(null);
          }
          try {
            return res(JSON.parse(c));
          } catch (e$) {
            e = e$;
            return res(null);
          }
        });
      });
    },
    readModMeta: function(type, id){
      return Promise.resolve().then(function(){
        var that;
        if (that = /^m-(.+)$/.exec(id)) {
          id = that[1];
        }
        if (!(id && /^[0-9a-zA-Z-]{1,255}$/.exec(id))) {
          return null;
        }
        if (!(type && /^[0-9a-zA-Z-]{1,255}$/.exec(type))) {
          return null;
        }
        return base.readJson("./static/mod/" + type + "/" + id + "/meta.json");
      });
    },
    getIp: function(defaultIfname){
      var ret, ifaces;
      defaultIfname == null && (defaultIfname = "en0");
      ret = [];
      ifaces = os.networkInterfaces();
      Object.keys(ifaces).forEach(function(ifname){
        if (defaultIfname && ifname !== defaultIfname) {
          return;
        }
        return ifaces[ifname].forEach(function(iface){
          if ('IPv4' === iface.family && iface.internal === false) {
            return ret.push(iface.address);
          }
        });
      });
      return ret;
    }
  };
  module.exports = base;
  function repeatString$(str, n){
    for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
    return r;
  }
}).call(this);
