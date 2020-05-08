start-time = Date.now!

require! <[fs fs-extra path crypto LiveScript chokidar moment]>
require! <[express body-parser express-session connect-multiparty csurf express-rate-limit]>
require! <[passport passport-local passport-facebook passport-google-oauth20]>
require! <[nodemailer]>
require! <[sharedb-wrapper]>
require! <[./io/postgresql ./api ./ext ./view]>
require! <[./aux ./watch ../secret ./watch/build/mod]>
require! 'uglify-js': uglify-js, LiveScript: lsc
config = require "../config/site/#{secret.config}"
colors = require \colors/safe
mod-builder = require "./watch/build/mod"
custom-builder = require "./watch/custom/"

backend = do
  update-user: (req) -> req.logIn req.user, ->
  init: -> new Promise (res, rej) ~>
    config := aux.merge-config config, secret
    pgsql = new postgresql config
    authio = pgsql.authio

    [csp, cors, enable] = [(config.csp or []), config.cors, config.enable or {}]

    throttling = do
      route:
        external: express-rate-limit { windowMs:   1 * 60 * 1000, max:  30, keyGenerator: aux.throttling.key }
        user: express-rate-limit     { windowMs:   1 * 60 * 1000, max:  60, keyGenerator: aux.throttling.key }
        api: express-rate-limit      { windowMs:   1 * 60 * 1000, max: 120, keyGenerator: aux.throttling.key }
      auth:
        signup: express-rate-limit   { windowMs: 120 * 60 * 1000, max:  10, keyGenerator: aux.throttling.key }
        login: express-rate-limit    { windowMs:   1 * 60 * 1000, max:  30, keyGenerator: aux.throttling.key }

    # =========== WEINRE for remote debugging
    if enable.weinre =>
      ip = aux.get-ip!0 or "127.0.0.1"
      (list) <- csp.map
      if <[connect-src script-src]>.indexOf(list.0) < 0 => return
      list.push "http://#ip:8080"
      list.push "https://#{config.domain}"

    # =========== Init Server
    app = express!
    console.log "[Server] Express Initialized in #{app.get \env} Mode".green
    app.disable \x-powered-by # Dont show server detail
    app.set 'trust proxy', '127.0.0.1' # So we can trust sth like ip from X-Forwarded-*

    # =========== CORS - Setup Cross Origin Request
    if config.cors =>
      cors = config.cors
      app.use (req, res, next) ->
        if cors.route and req.originalUrl.startsWith(cors.route) =>
          res.header("Access-Control-Allow-Origin", cors.domain)
          res.header( "Access-Control-Allow-Headers", cors.headers or "Origin, X-Requested-With, Content-Type, Accept")
          res.header("Access-Control-Allow-Methods", cors.methods or "PUT")
        next!

    # =========== CSP - Setup Content Security Policy
    csp = csp.map(-> it.join(" ")).join("; ")
    app.use (req, res, next) ->
      res.setHeader \Content-Security-Policy, csp
      res.setHeader \X-Content-Security-Policy, csp
      next!

    app.use body-parser.json limit: config.limit
    app.use body-parser.urlencoded extended: true, limit: config.limit

    # make pug cache compiled function so we don't have to compile pug file each time
    # should be enabled by default for production server.
    if app.get(\env) != \development => app.enable 'view cache'

    # also, we precompile all view pug into .view folder, which can be used by our custom pug view engine.
    app.engine 'pug', view
    app.set 'view engine', 'pug'
    app.set 'views', path.join(__dirname, '../src/pug/')
    app.locals.viewdir = path.join(__dirname, '../.view/')
    app.locals.basedir = app.get \views

    # =========== Users, Login and Sessions
    get-user = (u, p, usep, detail, doCreate = false, done) ->
      authio.user.get u, p, usep, detail, doCreate
        .then ->
          done null, it
          return null
        .catch ->
          msg = if usep => "incorrect email or password" else "did you login with social account?"
          done null, false, {message: msg}
          return null

    passport.use new passport-local.Strategy {
      usernameField: \email
      passwordField: \passwd
    },(u,p,done) ~> get-user u, p, true, null, false, done

    passport.use new passport-google-oauth20.Strategy(
      do
        clientID: config.google.clientID
        clientSecret: config.google.clientSecret
        callbackURL: "/u/auth/google/callback"
        passReqToCallback: true
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
        profileFields: ['id', 'displayName', 'link', 'emails']
      , (request, access-token, refresh-token, profile, done) ~>
        if !profile.emails =>
          done null, false, do
            message: "We can't get email address from your Google account. Please try signing up with email."
          return null
        get-user profile.emails.0.value, null, false, profile, true, done
    )

    passport.use new passport-facebook.Strategy(
      do
        clientID: config.facebook.clientID
        clientSecret: config.facebook.clientSecret
        callbackURL: "/u/auth/facebook/callback"
        profileFields: ['id', 'displayName', 'link', 'emails']
      , (access-token, refresh-token, profile, done) ~>
        if !profile.emails =>
          done null, false, do
            message: "We can't get email address from your Facebook account. Please try signing up with email."
          return null
        get-user profile.emails.0.value, null, false, profile, true, done
    )

    session-store = -> @ <<< authio.session
    session-store.prototype = express-session.Store.prototype
    app.use session = express-session do
      secret: config.session.secret
      resave: true
      saveUninitialized: true
      store: new session-store!
      proxy: true
      cookie: do
        path: \/
        httpOnly: true
        maxAge: 86400000 * 30 * 12 #  1 year
        domain: ".#{config.domain}"
    app.use passport.initialize!
    app.use passport.session!

    # =========== Sharedb
    if config.{}sharedb.enabled =>
      access = ({user, id, data, type}) -> new Promise (res, rej) ->
        # only owner or user with id = 1 can write
        if type == \receive and data and data.a == \op =>
          if id and +id.split('-').0 != user.key and user.key != 1 => return rej!
        if user => res! else rej!

      @sharedb = {server, sdb, connect, wss} = sharedb-wrapper {app, io: config.io-pg, session, access}

      wss.on \connection, (ws, req) ->
        p = if session? => new Promise((res, rej) -> session(req, {}, (-> res!))) else Promise.resolve!
        p.then ->
          session = req.session
          user = req.session.passport and req.session.passport.user
          ws.on \close, ->

    passport.serializeUser (u,done) ->
      authio.user.serialize u .then (v) ->
        done null, v
        return null
      return null
    passport.deserializeUser (v,done) ->
      authio.user.deserialize v .then (u) ->
        done null, u or {}
        return null
      return null

    # ============ Routing
    #app.use \/e, throttling.route.external, ext(@, pgsql) # External API

    # ============ CSRF
    # put it here to secure login with csrf
    # TODO will this block fb / google login? it might will.
    backend.csrfProtection = csurf!
    app.use backend.csrfProtection

    router = { user: express.Router!, api: express.Router! }
    app.use \/u, throttling.route.user, router.user

    router.user
      ..post \/signup, throttling.auth.signup, (req, res) ->
        {email,displayname,passwd,config} = req.body{email,displayname,passwd,config}
        if !email or !displayname or passwd.length < 8 => return aux.r400 res
        authio.user.create email, passwd, true, {displayname}, (config or {})
          .then (user) ->
            req.logIn user, -> res.redirect \/u/200; return null
            return null
          .catch -> res.redirect \/u/403; return null
      ..post \/login, throttling.auth.login, passport.authenticate \local, do
        successRedirect: \/u/200
        failureRedirect: \/u/403

    # =============== USER DATA, VIA AJAX
    # Note: We used to use jsonp, but it might lead to data exploit since jsonp is not protected by CORS.
    # * This must be protected by CORS Policy.
    # * This is passed via cookie too, but cookie won't be set if user doesn't get files served from express.
    #   so, for the first time user we still have to do ajax.
    #   cookie will be checked in frontend to see if ajax is needed.
    # * user could stil alter cookie's content, so it's necessary to force ajax call for important action
    #   there is no way to prevent user from altering client side content,
    #   so if we want to prevent user from editing our code, we have to go backend for the generation.
    app.get \/js/global, backend.csrfProtection, (req, res) ->
      res.setHeader \content-type, \application/json
      payload = JSON.stringify do
        global: true, csrfToken: req.csrfToken!, production: config.is-production
        ip: aux.ip req
        user: if req.user => req.user{key, plan, config, displayname, verified, username} else {}
      res.cookie 'global', payload, { path: '/', secure: true, domain: ".#{config.domain}" }
      res.send payload

    app.use \/, express.static(path.join(__dirname, '../static'))
    app.use \/d, throttling.route.api, router.api
    app.get "/d/health", (req, res) -> res.json {}

    # Must review all APIs
    router.user
      ..get \/null, (req, res) -> res.json {}
      ..get \/200, (req,res) -> res.json(req.user)
      ..get \/403, (req,res) -> res.status(403)send!
      ..get \/login, (req, res) -> res.redirect \/auth/

      ..post \/logout, (req, res) ->
        req.logout!
        res.redirect \/
      ..post \/auth/google, passport.authenticate \google, {scope: ['email']}
      ..get \/auth/google/callback, passport.authenticate \google, do
        successRedirect: \/auth/done/
        failureRedirect: \/auth/failed/social.html
      ..post \/auth/facebook, passport.authenticate \facebook, {scope: ['email']}
      ..get \/auth/facebook/callback, passport.authenticate \facebook, do
        successRedirect: \/auth/done/
        failureRedirect: \/auth/failed/social.html

    multi = do
      parser: connect-multiparty limit: config.limit
      clean: (req, res, next) ->
        for k,v of req.files => if fs.exists-sync v.path => fs.unlink v.path
      cleaner: (cb) -> (req, res, next) ~>
        if cb => cb req, res, next
        @clean req, res, next

    @ <<< {config, app, express, router, multi, pgsql}

    api @, pgsql
    app.use (req, res, next) ~> aux.r404 res, "", true

    # Try to handle this:
    # [17/05/08 01:54:30] FacebookTokenError: This authorization code has been used.  /  undefined
    if !config.debug =>
      (err, req, res, next) <- @app.use
      if !err => return next!
      if err.code == \EBADCSRFTOKEN =>
        # it might be that connect.sid ( for express sessions ) that are tainted.
        # clear both connect.sid and global can help
        # so client will force re-fetch data(global), even re-login(connect.sid).
        # but, while clearCookie here might be easier, it might also be abused by malicious source.
        # so, we added an /d/me/reauth/ route for this purpose, and dont clearCookie here.
        # note: global must align with the one if /js/global/,
        #       and connect.side must align with session's cookie setting.
        res
        #  .clearCookie \connect.sid, {path:'/', domain: \localhost} # clear old one
        #  .clearCookie \connect.sid, {path:'/', config.domain}
        #  .clearCookie \global, { path: '/', config.domain}
          .status(403)
        # for api we send a ldError object.
        # 1005 tells frontend a csrftoken-mismatch happened, so client can trigger corresponding panel
        # to resolve this issue.
        if /^\/d\//.exec(req.originalUrl) => res.send {id: 1005, name: \ldError}
        # otherwise redirect user to login.
        else res.redirect "/auth/?nexturl=#{req.originalUrl}"
      else
        # ignore some errors that we don't need to take care.
        if (err instanceof URIError) and "#{err.stack}".startsWith('URIError: Failed to decode param') =>
          return res.status 400 .send!
        else if err.message.startsWith \TokenError =>
          console.error(
            colors.red.underline("[#{moment!format 'YY/MM/DD HH:mm:ss'}]"),
            colors.yellow(err.message)
            "[", color.yellow(req.originalUrl.substring(0,15)), "]"
          )
        else if err.message.startsWith 'Failed to lookup view' =>
          console.error(
            colors.red.underline("[#{moment!format 'YY/MM/DD HH:mm:ss'}]"),
            colors.yellow(err.message)
          )
        else
          console.error(
            colors.red.underline("[#{moment!format 'YY/MM/DD HH:mm:ss'}]"),
            colors.yellow(err.toString!)
            "["
            colors.yellow(err.path or '')
            "]["
            colors.yellow(req.originalUrl)
            "]"
          )
          console.error colors.grey(err.stack)
        res.status 500 .send!
    if config.build and config.watch =>
      watch.init config.build
      watch.on \build, -> mod-builder.build it
      watch.on \unlink, -> mod-builder.unlink it
      watch.on \build, -> custom-builder.build it
      watch.on \unlink, -> custom-builder.unlink it

    if config.sharedb.enabled =>
      server.listen config.port, -> console.log "[SERVER] listening on port #{server.address!port}".cyan
    else
      server = app.listen config.port, -> console.log "[SERVER] listening on port #{server.address!port}".cyan
    inited-time = Date.now!
    console.log "[SERVER] Initialization: #{(inited-time - start-time) / 1000}s elapsed.".yellow
    res!

module.exports = backend
backend.init!
