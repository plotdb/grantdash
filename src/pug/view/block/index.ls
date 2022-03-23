ldc.register "blockbase",
<[blockuploader viewLocals auth ldNotify error notify ldcvmgr]>,
({blockuploader, viewLocals, auth, error, notify, ldcvmgr}) ->
  init: ({blockdef, brd, root, data}) ->
    blockopt = data
    ldld = new ldloader className: 'ldld full z-fixed'
    (global) <- auth.ensure!then _
    (global) <- auth.get!then _
    binfo = {}
    prj = (viewLocals or {}).prj or {}
    if /create/.exec(window.location.pathname) and prj.key =>
      ldcvmgr.get \existed
      debounce 1000 .then ->
        window.location.href = "/dash/prj/#{prj.slug}/edit"
    user = (global.user or {})
    owner = prj.owner or user.key or 0
    uploadr = new blockuploader {brd, owner}

    host = (itf) ->
      _ldcvmgr =
        get: (n,o) ->
          if itf.ldcvmgr and (ret = itf.ldcvmgr.get(n,o)) => return ret
          else return ldcvmgr.get n, o
        toggle: (n,v,o) ->
          if itf.ldcvmgr and (ret = itf.ldcvmgr.toggle(n,v,o)) => return ret
          else return ldcvmgr.toggle n, v, o

      change-language: (lng) ->
        i18next.changeLanguage lng
        binfo.instance.transform \i18n
      info: {prj: prj{slug,state}, user: user{key, username, displayname}}
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
        _ldcvmgr.toggle (if submit => \submitting else \saving), true
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
          .then (ret) ->
            console.log "saved return value: ", ret
            _ldcvmgr.get if submit => \submitted else \saved
              .then -> if !prj.slug and ret.slug => window.location.href = "/dash/prj/#{ret.slug}/edit"
            return ret
          .finally -> _ldcvmgr.toggle (if submit => \submitting else \saving), false
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
            "/dash/assets/felib/#name/#{version or 'main'}/#{path or 'index.html'}?dec=#{global.version or ''}"
          else "/dash/assets/felib/#name/#{version or 'main'}/#{path or ('index.min.js')}?dec=#{global.version or ''}"
        mgr.get blockdef
          .then (bc) -> bc.create!
          .then (bi) ~>
            bi.attach {root: root or document.body, data: blockopt or {}}
              .then ~> bi.interface!
              .then (itf) ~>
                binfo <<< {interface: itf, instance: bi}
                itf.adapt host(itf)
                itf.load custom-data
          .then -> console.log "block #{name} loaded."

