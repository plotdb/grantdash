ldc.register "blockbase",
<[blockuploader viewLocals auth ldNotify error notify ldcvmgr]>,
({blockuploader, viewLocals, auth, error, notify, ldcvmgr}) ->
  init: ({blockdef, brd}) ->
    ldld = new ldloader className: 'ldld full z-fixed'
    (global) <- auth.get!then _
    prj = (viewLocals or {}).prj or {}
    user = (global.user or {})
    owner = prj.owner or user.key or 0
    uploadr = new blockuploader {brd, owner}

    host =
      info: {prj: prj{slug}, user: user{key, username, displayname}}
      upload: (o) -> uploadr.upload o .catch error!
      print: (opt = {}) ->
        html = opt.html or ""
        name = opt.name or "download.pdf"
        ldld.on!
        auth.recaptcha.get!then (recaptcha) ->
          ld$.fetch(
            "/dash/api/custom/print"
            {method: "POST"}
            {json: {html, recaptcha}, type: \blob, timeout: 60 * 1000}
          )
            .then (blob) -> ldfile.download {blob, mime: "application/pdf", name}
            .finally -> ldld.off!

      save: ({name, description, data, submit}) ->
        ldcvmgr.toggle (if submit => \submitting else \saving), true
        debounce 1000
          .then -> auth.recaptcha.get!
          .then (recaptcha) ->
            payload =
              name: name
              description: description
              custom: data
              submit: submit
              recaptcha: recaptcha
              slug: prj.slug
              brd: brd
            ld$.fetch "/dash/api/custom/prj", {method: "POST"}, {json: payload, type: \json}
          .then ->
            console.log "saved return value: ", it
            ldcvmgr.toggle if submit => \submitted else \saved
          .finally -> ldcvmgr.toggle (if submit => \submitting else \saving), false
          .catch (e) ->
            error! e
            return Promise.reject(e)

    custom-data = ((viewLocals or {}).prj or {}).{}detail.custom or {}
    lc = {}
    i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \zh-TW, fallbackNS: '', defaultNS: ''
      .then -> i18next.use i18nextBrowserLanguageDetector
      .then ->
        console.log "use language: ", navigator.language or navigator.userLanguage
        i18next.changeLanguage navigator.language or navigator.userLanguage
      .then -> block.i18n.use i18next
      .then ~>
        lc.manager = mgr = new block.manager registry: ({name,version,path,type}) ->
          return if type == \block =>
            "/dash/assets/felib/#name/#{version or 'main'}/#{path or 'index.html'}"
          else "/dash/assets/felib/#name/#{version or 'main'}/#{path or ('index.min.js')}"
        mgr.get blockdef
          .then (bc) -> bc.create!
          .then (bi) ~>
            bi.attach {root: document.body}
              .then ~> bi.interface!
              .then (itf) ~>
                itf.adapt host
                itf.load custom-data
                itf.pubsub.on \change-language, ->
                  i18next.changeLanguage it
                  bi.transform \i18n
          .then -> console.log \ok
