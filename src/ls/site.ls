(->
  ldc.register \general, <[auth navtop error ldcvmgr util]>, ({auth, navtop, error, ldcvmgr, util}) ->
    console.log "site general ldc"
    p = if i18next? =>
      i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \en, fallbackNS: '', defaultNS: ''
        .then -> i18next.use i18nextBrowserLanguageDetector
        .then ->
          lng = util.cookie(\use-language) or navigator.language or navigator.userLanguage
          console.log "use language: ", lng
          i18next.changeLanguage lng
          res = {en: {}, "zh-TW": {}}
          for k,v of res.en => res["zh-TW"][k] = k
          for k,v of res => i18next.add-resource-bundle k, '', v, true, true
          if i18n-data? =>
            for k,v of i18n-data.en => i18n-data["zh-TW"][k] = k
            for k,v of i18n-data => i18next.add-resource-bundle k, '', v, true, true
          if i18n-engine? => i18n-engine.transform document.body
    else Promise.resolve!
    p
      .then -> auth.get!
      .then (g) ->

        if Sentry? =>
          Sentry.init do
            dsn: 'https://06428ddbefb64673a2001998db111f42@o446556.ingest.sentry.io/5425251',
            integrations: [
              new Sentry.Integrations.BrowserTracing!
            ],
            tracesSampleRate: 1.0
          if g.user => Sentry.setUser id: (g.user.key or 0)
        view = new ldView do
          global: true
          root: document.body
          action: click: "set-lng": ({node}) ->
            lng = node.getAttribute \data-name
            util.cookie \use-language, lng
            window.location.reload!
          handler:
            "brand-org": ({node}) ->
              node.innerText = (g.scope.orgname or '')
              if g.scope.brd => node.setAttribute \href, "/brd/#{g.scope.brd}"
              node.setAttribute \href, "/org/#{g.scope.org}"
            "brand-brd": ({node}) ->
              node.classList.toggle \d-none, !g.scope.brdname
              node.innerText = "/ " + (g.scope.brdname or '')
              node.setAttribute \href, "/brd/#{g.scope.brd}"
            "authed": ({node}) ->
              node.classList.toggle \d-none, !(g.user or {}).key
            "not-authed": ({node}) ->
              node.classList.toggle \d-none, !!(g.user or {}).key
            "t": ({node}) -> node.innerText = i18next.t(node.innerText)
        auth.on \auth.signin, ->
          auth.get!then (global) ->
            g <<< global
            view.render <[authed not-authed]>

    if moment? => moment.tz.add(["Asia/Taipei|CST JST CDT|-80 -90 -90|01020202020202020202020202020202020202020|-1iw80 joM0 1yo0 Tz0 1ip0 1jX0 1cN0 11b0 1oN0 11b0 1oN0 11b0 1oN0 11b0 10N0 1BX0 10p0 1pz0 10p0 1pz0 10p0 1db0 1dd0 1db0 1cN0 1db0 1cN0 1db0 1cN0 1db0 1BB0 ML0 1Bd0 ML0 uq10 1db0 1cN0 1db0 97B0 AL0|74e5"])
    ldc.action do
      profile: ->
        auth.ensure!
          .then -> window.location.href = "/dash/me/"
          .catch -> if ldError.id(it) == 1000 => return else Promise.reject it
          .catch error!

      admin: ->
        lc = {}
        auth.ensure!
          .then -> ld$.fetch '/dash/api/admin/', {method: \GET}, {type: \json}
          .then (ret) ->
            [brds,orgs] = [ret.[]brds, ret.[]orgs]
            if brds.length == 1 => window.location.href = "/dash/brd/#{brds.0.slug}/admin"
            lc.list = [] ++ brds.map(-> it <<< {type: \brd}) ++ orgs.map(-> it <<< {type: \org})
            if lc.list.length == 1 => window.location.href = "/dash/#{lc.list.0.type}/#{lc.list.0.slug}/admin"
            if !lc.list.length => return ldcvmgr.toggle("no-admin")
            ldcvmgr.getdom('choose-admin-panel')
              .then (dom) ->
                view = new ldView do
                  root: dom
                  handler: do
                    item:
                      list: -> lc.list
                      handler: ({node, data}) ->
                        node.setAttribute \href, "/dash/#{data.type}/#{data.slug}/admin"
                        node.innerHTML = """
                        #{if data.type == \brd => '活動' else '組織'} / #{data.name}
                        """
                ldcvmgr.toggle \choose-admin-panel
          .catch -> if ldError.id(it) == 1000 => return else Promise.reject it
          .catch error!
  ldc.app \general
)!
