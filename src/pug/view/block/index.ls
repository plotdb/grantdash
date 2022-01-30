<-(->it.apply {}) _

lc = {}
i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \zh-TW, fallbackNS: '', defaultNS: ''
  .then -> i18next.use i18nextBrowserLanguageDetector
  .then ->
    console.log "use language: ", navigator.language or navigator.userLanguage
    i18next.changeLanguage navigator.language or navigator.userLanguage
  .then -> block.i18n.use i18next
  .then ->
    lc.manager = mgr = new block.manager registry: ({name,version,path,type}) ->
      return if type == \block =>
        "/dash/assets/felib/#name/#{version or 'main'}/#{path or 'index.html'}"
      else "/dash/assets/felib/#name/#{version or 'main'}/#{path or ('index.min.js')}"
    mgr.get {name: "@taicca/vr", version: 'dev'}
      .then (bc) -> bc.create!
      .then (bi) ->
        bi.attach {root: document.body}
          .then -> bi.interface!
          .then (itf) ->
            itf.pubsub.on \change-language, ->
              i18next.changeLanguage it
              bi.transform \i18n
      .then -> console.log \ok

