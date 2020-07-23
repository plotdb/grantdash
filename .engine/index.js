// Generated by LiveScript 1.3.0
(function(){
  var startTime, fs, fsExtra, path, crypto, LiveScript, chokidar, moment, express, bodyParser, expressSession, connectMultiparty, csurf, expressRateLimit, passport, passportLocal, passportFacebook, passportGoogleOauth20, nodemailer, sharedbWrapper, lderror, postgresql, api, ext, view, cache, aux, throttle, grecaptcha, watch, secret, mod, uglifyJs, lsc, colors, modBuilder, customBuilder, backend;
  startTime = Date.now();
  fs = require('fs');
  fsExtra = require('fs-extra');
  path = require('path');
  crypto = require('crypto');
  LiveScript = require('LiveScript');
  chokidar = require('chokidar');
  moment = require('moment');
  express = require('express');
  bodyParser = require('body-parser');
  expressSession = require('express-session');
  connectMultiparty = require('connect-multiparty');
  csurf = require('csurf');
  expressRateLimit = require('express-rate-limit');
  passport = require('passport');
  passportLocal = require('passport-local');
  passportFacebook = require('passport-facebook');
  passportGoogleOauth20 = require('passport-google-oauth20');
  nodemailer = require('nodemailer');
  sharedbWrapper = require('sharedb-wrapper');
  lderror = require('lderror');
  postgresql = require('./io/postgresql');
  api = require('./api');
  ext = require('./ext');
  view = require('./util/view');
  cache = require('./api/cache');
  aux = require('./aux');
  throttle = require('./util/throttle');
  grecaptcha = require('./util/grecaptcha');
  watch = require('./watch');
  secret = require('../secret');
  mod = require('./watch/build/mod');
  uglifyJs = require('uglify-js');
  lsc = require('LiveScript');
  colors = require('colors/safe');
  modBuilder = require("./watch/build/mod");
  customBuilder = require("./watch/custom/");
  backend = {
    updateUser: function(req){
      return req.logIn(req.user, function(){});
    },
    init: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        var config, pgsql, authio, ref$, csp, cors, enable, ip, app, getUser, sessionStore, session, access, server, sdb, connect, wss, router, x$, y$, multi, initedTime;
        config = secret;
        pgsql = new postgresql(config);
        authio = pgsql.authio;
        ref$ = [config.csp || [], config.cors, config.enable || {}], csp = ref$[0], cors = ref$[1], enable = ref$[2];
        if (enable.weinre) {
          ip = aux.getIp()[0] || "127.0.0.1";
          csp.map(function(list){
            if (['connect-src', 'script-src'].indexOf(list[0]) < 0) {
              return;
            }
            list.push("http://" + ip + ":8080");
            if (config.domain) {
              return list.push("https://" + config.domain);
            }
          });
        }
        app = express();
        console.log(("[Server] Express Initialized in " + app.get('env') + " Mode").green);
        app.disable('x-powered-by');
        app.set('trust proxy', '127.0.0.1');
        if (config.cors) {
          cors = config.cors;
          app.use(function(req, res, next){
            if (cors.route && req.originalUrl.startsWith(cors.route)) {
              res.header("Access-Control-Allow-Origin", cors.domain);
              res.header("Access-Control-Allow-Headers", cors.headers || "Origin, X-Requested-With, Content-Type, Accept");
              res.header("Access-Control-Allow-Methods", cors.methods || "PUT");
            }
            return next();
          });
        }
        csp = csp.map(function(it){
          return it.join(" ");
        }).join("; ");
        app.use(function(req, res, next){
          res.setHeader('Content-Security-Policy', csp);
          res.setHeader('X-Content-Security-Policy', csp);
          return next();
        });
        app.use(bodyParser.json({
          limit: config.limit,
          verify: function(req, res, buf, encoding){
            if (req.headers["x-hub-signature"]) {
              return req.rawBody = buf.toString();
            }
          }
        }));
        app.use(bodyParser.urlencoded({
          extended: true,
          limit: config.limit
        }));
        if (app.get('env') !== 'development') {
          app.enable('view cache');
        }
        app.engine('pug', view);
        app.set('view engine', 'pug');
        app.set('views', path.join(__dirname, '../src/pug/'));
        app.locals.viewdir = path.join(__dirname, '../.view/');
        app.locals.basedir = app.get('views');
        getUser = function(u, p, usep, detail, doCreate, done){
          doCreate == null && (doCreate = false);
          return authio.user.get(u, p, usep, detail, doCreate).then(function(it){
            done(null, it);
            return null;
          })['catch'](function(){
            var msg;
            msg = usep ? "incorrect email or password" : "did you login with social account?";
            done(null, false, {
              message: msg
            });
            return null;
          });
        };
        passport.use(new passportLocal.Strategy({
          usernameField: 'email',
          passwordField: 'passwd'
        }, function(u, p, done){
          return getUser(u, p, true, null, false, done);
        }));
        passport.use(new passportGoogleOauth20.Strategy({
          clientID: config.google.clientID,
          clientSecret: config.google.clientSecret,
          callbackURL: "/dash/api/u/auth/google/callback",
          passReqToCallback: true,
          userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
          profileFields: ['id', 'displayName', 'link', 'emails']
        }, function(request, accessToken, refreshToken, profile, done){
          if (!profile.emails) {
            done(null, false, {
              message: "We can't get email address from your Google account. Please try signing up with email."
            });
            return null;
          }
          return getUser(profile.emails[0].value, null, false, profile, true, done);
        }));
        passport.use(new passportFacebook.Strategy({
          clientID: config.facebook.clientID,
          clientSecret: config.facebook.clientSecret,
          callbackURL: "/dash/api/u/auth/facebook/callback",
          profileFields: ['id', 'displayName', 'link', 'emails']
        }, function(accessToken, refreshToken, profile, done){
          if (!profile.emails) {
            done(null, false, {
              message: "We can't get email address from your Facebook account. Please try signing up with email."
            });
            return null;
          }
          return getUser(profile.emails[0].value, null, false, profile, true, done);
        }));
        sessionStore = function(){
          return import$(this, authio.session);
        };
        sessionStore.prototype = expressSession.Store.prototype;
        app.use(session = expressSession({
          secret: config.session.secret,
          resave: true,
          saveUninitialized: true,
          store: new sessionStore(),
          proxy: true,
          cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 86400000 * 30 * 12
          }
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        if ((config.sharedb || (config.sharedb = {})).enabled) {
          access = function(arg$){
            var user, id, data, type;
            user = arg$.user, id = arg$.id, data = arg$.data, type = arg$.type;
            return cache.perm.sharedb({
              io: pgsql,
              user: user,
              id: id,
              data: data,
              type: type,
              action: 'owner'
            });
          };
          this$.sharedb = (ref$ = sharedbWrapper({
            app: app,
            io: config.ioPg,
            session: session,
            access: access,
            milestoneDb: {
              interval: 200,
              enabled: true
            }
          }), server = ref$.server, sdb = ref$.sdb, connect = ref$.connect, wss = ref$.wss, ref$);
          wss.on('connection', function(ws, req){
            var p;
            p = session != null
              ? new Promise(function(res, rej){
                return session(req, {}, function(){
                  return res();
                });
              })
              : Promise.resolve();
            return p.then(function(){
              var session, user;
              session = req.session;
              user = req.session.passport && req.session.passport.user;
              return ws.on('close', function(){});
            });
          });
        }
        passport.serializeUser(function(u, done){
          authio.user.serialize(u).then(function(v){
            done(null, v);
            return null;
          });
          return null;
        });
        passport.deserializeUser(function(v, done){
          authio.user.deserialize(v).then(function(u){
            done(null, u) || {};
            return null;
          });
          return null;
        });
        this$.router = router = {
          user: express.Router(),
          api: express.Router(),
          ext: express.Router()
        };
        app.use('/ext', throttle.count.route.ext, router.ext);
        ext(this$, pgsql);
        app.use(function(req, res, next){
          return cache.route.check({
            io: pgsql,
            req: req,
            res: res
          }).then(function(ret){
            req.scope = ret;
            return next();
          })['catch'](aux.errorHandler(res));
        });
        backend.csrfProtection = csurf();
        app.use(backend.csrfProtection);
        router.api.use('/u', throttle.count.route.user, router.user);
        x$ = router.user;
        x$.post('/signup', throttle.count.action.signup, grecaptcha, function(req, res){
          var ref$, email, displayname, passwd, config;
          ref$ = {
            email: (ref$ = req.body).email,
            displayname: ref$.displayname,
            passwd: ref$.passwd,
            config: ref$.config
          }, email = ref$.email, displayname = ref$.displayname, passwd = ref$.passwd, config = ref$.config;
          if (!email || !displayname || passwd.length < 8) {
            return aux.r400(res);
          }
          return authio.user.create(email, passwd, true, {
            displayname: displayname
          }, config || {}).then(function(user){
            req.logIn(user, function(){
              res.redirect('/dash/api/u/200');
              return null;
            });
            return null;
          })['catch'](function(){
            res.redirect('/dash/api/u/403');
            return null;
          });
        });
        x$.post('/login', throttle.count.action.login, grecaptcha, passport.authenticate('local', {
          successRedirect: '/dash/api/u/200',
          failureRedirect: '/dash/api/u/403'
        }));
        app.get('/api/global', backend.csrfProtection, function(req, res){
          var payload, ref$;
          res.setHeader('content-type', 'application/json');
          payload = JSON.stringify(import$({
            global: true,
            csrfToken: req.csrfToken(),
            production: config.isProduction,
            ip: aux.ip(req),
            user: req.user
              ? {
                key: (ref$ = req.user).key,
                plan: ref$.plan,
                config: ref$.config,
                displayname: ref$.displayname,
                verified: ref$.verified,
                username: ref$.username
              }
              : {},
            recaptcha: {
              sitekey: (ref$ = secret.grecaptcha || (secret.grecaptcha = {})).sitekey,
              enabled: ref$.enabled
            }
          }, {
            scope: req.scope || {}
          }));
          res.cookie('global', payload, {
            path: '/',
            secure: true
          });
          return res.send(payload);
        });
        app.use('/api', throttle.count.route.api, throttle.speed.route.api, router.api);
        app.get("/api/health", function(req, res){
          return res.json({});
        });
        y$ = router.user;
        y$.get('/null', function(req, res){
          return res.json({});
        });
        y$.get('/200', function(req, res){
          return res.json(req.user);
        });
        y$.get('/403', function(req, res){
          return res.status(403).send();
        });
        y$.get('/login', function(req, res){
          return res.redirect('/dash/auth/');
        });
        y$.post('/logout', function(req, res){
          req.logout();
          return res.redirect('/');
        });
        y$.post('/auth/google', passport.authenticate('google', {
          scope: ['email']
        }));
        y$.get('/auth/google/callback', passport.authenticate('google', {
          successRedirect: '/dash/auth/done/',
          failureRedirect: '/dash/auth/failed/social.html'
        }));
        y$.post('/auth/facebook', passport.authenticate('facebook', {
          scope: ['email']
        }));
        y$.get('/auth/facebook/callback', passport.authenticate('facebook', {
          successRedirect: '/dash/auth/done/',
          failureRedirect: '/dash/auth/failed/social.html'
        }));
        multi = {
          parser: connectMultiparty({
            limit: config.limit
          }),
          clean: function(req, res, next){
            var k, ref$, v, results$ = [];
            for (k in ref$ = req.files) {
              v = ref$[k];
              if (fs.existsSync(v.path)) {
                results$.push(fs.unlink(v.path));
              }
            }
            return results$;
          },
          cleaner: function(cb){
            var this$ = this;
            return function(req, res, next){
              if (cb) {
                cb(req, res, next);
              }
              return this$.clean(req, res, next);
            };
          }
        };
        this$.config = config;
        this$.app = app;
        this$.express = express;
        this$.multi = multi;
        this$.pgsql = pgsql;
        api(this$, pgsql);
        app.use('/', express['static'](path.join(__dirname, '../static')));
        app.use(function(req, res, next){
          return aux.r404(res, "", true);
        });
        if (!config.debug) {
          this$.app.use(function(err, req, res, next){
            if (!err) {
              return next();
            }
            if (err.code === 'EBADCSRFTOKEN') {
              res.status(403);
              if (/^\/api\//.exec(req.originalUrl)) {
                return res.send({
                  id: 1005,
                  name: 'ldError'
                });
              } else {
                return res.redirect("/auth/?nexturl=" + req.originalUrl);
              }
            } else {
              if (err.name === 'ldError') {
                if (err.id === 1000) {
                  return res.render("err/custom.pug", {
                    err: err
                  });
                }
                return res.status(500).send(err);
              } else if (err instanceof URIError && (err.stack + "").startsWith('URIError: Failed to decode param')) {
                return res.status(400).send();
              } else if (err.message.startsWith('TokenError')) {
                console.error(colors.red.underline("[" + moment().format('YY/MM/DD HH:mm:ss') + "]"), colors.yellow(err.message), "[", color.yellow(req.originalUrl.substring(0, 15)), "]");
              } else if (err.message.startsWith('Failed to lookup view')) {
                console.error(colors.red.underline("[" + moment().format('YY/MM/DD HH:mm:ss') + "]"), colors.yellow(err.message));
              } else {
                console.error(colors.red.underline("[" + moment().format('YY/MM/DD HH:mm:ss') + "]"), colors.yellow(err.toString()), "[", colors.yellow(err.path || ''), "][", colors.yellow(req.originalUrl), "]");
                console.error(colors.grey(err.stack));
              }
              return res.status(500).send();
            }
          });
        }
        if (config.build && config.watch) {
          watch.init(config.build);
          watch.on('build', function(it){
            return modBuilder.build(it);
          });
          watch.on('unlink', function(it){
            return modBuilder.unlink(it);
          });
          watch.on('build', function(it){
            return customBuilder.build(it);
          });
          watch.on('unlink', function(it){
            return customBuilder.unlink(it);
          });
        }
        if (config.sharedb.enabled) {
          server.listen(config.port, function(){
            return console.log(("[SERVER] listening on port " + server.address().port).cyan);
          });
        } else {
          server = app.listen(config.port, function(){
            return console.log(("[SERVER] listening on port " + server.address().port).cyan);
          });
        }
        initedTime = Date.now();
        console.log(("[SERVER] Initialization: " + (initedTime - startTime) / 1000 + "s elapsed.").yellow);
        return res();
      });
    }
  };
  module.exports = backend;
  backend.init();
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
