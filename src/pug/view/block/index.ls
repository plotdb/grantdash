<-(->it.apply {}) _

lc = {}
i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \en
  .then -> i18next.changeLanguage \zh-TW
  .then -> block.i18n.use i18next
  .then ->
    lc.manager = mgr = new block.manager registry: ({name,version,path,type}) ->
      return if type == \block =>
        "/dash/assets/felib/#name/#version/#{path or 'index.html'}"
      else "/dash/assets/felib/#name/#version/#{path or ('index.min.js')}"
    mgr.get {name: "@taicca/vr", version: 'dev'}
      .then (bc) ->
        bc.create!
          .then (bi) -> bi.attach {root: document.body}
      .then -> console.log \ok

