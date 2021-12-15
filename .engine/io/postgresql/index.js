// Generated by LiveScript 1.3.0
(function(){
  var pg, crypto, bcrypt, colors, aux, ret;
  pg = require('pg');
  crypto = require('crypto');
  bcrypt = require('bcrypt');
  colors = require('colors');
  aux = require('./aux');
  pg.defaults.poolSize = 30;
  ret = function(config){
    var authio, this$ = this;
    this.config = config;
    this.authio = authio = {
      user: {
        serialize: function(user){
          user == null && (user = {});
          return Promise.resolve(user || {});
        },
        deserialize: function(v){
          return Promise.resolve(v || {});
        },
        hashing: function(password, doMD5, doBcrypt){
          doMD5 == null && (doMD5 = true);
          doBcrypt == null && (doBcrypt = true);
          return new Promise(function(res, rej){
            var ret;
            ret = doMD5 ? crypto.createHash('md5').update(password).digest('hex') : password;
            if (doBcrypt) {
              return bcrypt.genSalt(12, function(e, salt){
                return bcrypt.hash(ret, salt, function(e, hash){
                  return res(hash);
                });
              });
            } else {
              return res(ret);
            }
          });
        },
        compare: function(password, hash){
          password == null && (password = '');
          return new Promise(function(res, rej){
            var md5;
            md5 = crypto.createHash('md5').update(password).digest('hex');
            return bcrypt.compare(md5, hash, function(e, ret){
              if (ret) {
                return res();
              } else {
                return rej(new Error());
              }
            });
          });
        },
        get: function(username, password, usepasswd, detail, doCreate){
          var usernameLower, user;
          doCreate == null && (doCreate = false);
          usernameLower = username.toLowerCase();
          if (!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(username)) {
            return Promise.reject(new Error("not email"));
          }
          user = {};
          return this$.query("select * from users where username = $1 or username = $2", [username, usernameLower]).then(function(users){
            users == null && (users = {});
            user = users.rows.filter(function(it){
              return it.username === username;
            })[0];
            if (!user) {
              user = users.rows.filter(function(it){
                return it.username === usernameLower;
              })[0];
            }
            if (!user && !doCreate) {
              return Promise.reject(new Error("failed"));
            }
            if (!user && doCreate) {
              return this$.authio.user.create(usernameLower, password, usepasswd, detail);
            } else if (user && !(usepasswd || user.usepasswd)) {
              delete user.password;
              return user;
            }
            return this$.authio.user.compare(password, user.password);
          }).then(function(it){
            var ref$;
            if (it) {
              user = import$(user
                ? user
                : {}, it);
            }
            if (!((ref$ = user.config || (user.config = {})).consent || (ref$.consent = {})).cookie) {
              ((ref$ = user.config || (user.config = {})).consent || (ref$.consent = {})).cookie = new Date().getTime();
              return this$.query("update users set config = $2 where key = $1", [user.key, user.config]);
            }
          }).then(function(){
            delete user.password;
            return user;
          });
        },
        create: function(username, password, usepasswd, detail, config){
          var user;
          detail == null && (detail = {});
          config == null && (config = {});
          user = {};
          username = username.toLowerCase();
          if (!/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(username)) {
            return Promise.reject(new Error("not email"));
          }
          return this$.authio.user.hashing(password, usepasswd, usepasswd).then(function(pwHashed){
            var displayname;
            displayname = detail ? detail.displayname || detail.username : void 8;
            if (!displayname) {
              displayname = username.replace(/@.+$/, "");
            }
            (config.consent || (config.consent = {})).cookie = new Date().getTime();
            user.username = username;
            user.password = pwHashed;
            user.usepasswd = usepasswd;
            user.displayname = displayname;
            user.detail = detail;
            user.config = config;
            user.createdtime = new Date();
            return this$.query(["insert into users", "(username,password,usepasswd,displayname,createdtime,detail,config) values", "($1,$2,$3,$4,$5,$6,$7) returning key"].join(" "), [user.username, user.password, user.usepasswd, user.displayname, new Date().toUTCString(), user.detail, user.config]);
          }).then(function(r){
            var key;
            key = (r.rows || (r.rows = []))[0].key;
            return user.key = key, user;
          });
        }
      },
      session: {
        get: function(sid, cb){
          this$.query("select * from sessions where key=$1", [sid]).then(function(it){
            cb(null, ((it.rows || (it.rows = []))[0] || {}).detail);
            return null;
          })['catch'](function(it){
            return [console.error("session.get", it), cb(it)];
          });
          return null;
        },
        set: function(sid, session, cb){
          this$.query(["insert into sessions (key,detail) values", "($1, $2) on conflict (key) do update set detail=$2"].join(" "), [sid, session]).then(function(){
            cb();
            return null;
          })['catch'](function(it){
            return [console.error("session.set", it), cb()];
          });
          return null;
        },
        destroy: function(sid, cb){
          this$.query("delete from sessions where key = $1", [sid]).then(function(){
            cb();
            return null;
          })['catch'](function(it){
            return [console.error("session.destroy", it), cb()];
          });
          return null;
        }
      }
    };
    this.config = config;
    this.uri = this.config.ioPg.uri;
    this.pool = new pg.Pool({
      connectionString: this.uri,
      max: 30,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
    });
    this.pool.on('error', function(err, client){
      return console.error("db pool error".red);
    });
    return this;
  };
  ret.prototype = import$(Object.create(Object.prototype), {
    aux: aux,
    query: function(q, p){
      return this.pool.connect().then(function(client){
        return client.query(q, p).then(function(ret){
          client.release();
          return ret;
        });
      })['catch'](function(it){
        return Promise.reject(new lderror({
          err: it,
          id: 0,
          query: q,
          message: "database query error"
        }));
      });
    },
    oldQuery: function(a, b, c){
      var debug, ref$, client, q, params, _query, this$ = this;
      b == null && (b = null);
      c == null && (c = null);
      debug = Math.random().toString(16).substring(2);
      if (typeof a === 'string') {
        ref$ = [null, a, b], client = ref$[0], q = ref$[1], params = ref$[2];
      } else {
        ref$ = [a, b, c], client = ref$[0], q = ref$[1], params = ref$[2];
      }
      _query = function(client, q, params){
        params == null && (params = null);
        return new Promise(function(res, rej){
          return client.query(q, params, function(e, r){
            if (e) {
              return rej(e);
            }
            return res(r);
          });
        });
      };
      if (client) {
        return _query(client, q, params);
      }
      return new Promise(function(res, rej){
        return pg.connect(this$.config.ioPg.uri, function(err, client, done){
          if (err) {
            return rej(err);
          }
          return _query(client, q, params).then(function(r){
            return [done(), res(r)];
          })['catch'](function(it){
            return [done(), rej(it)];
          });
        });
      });
    }
  });
  module.exports = ret;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
