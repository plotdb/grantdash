(->
  ldc.register \change-password, <[auth notify]>, ({auth, notify}) ->
    local = {}
    console.log (ClipboardJS?)
    auth.get {authed: true}
      .then (g) ->
        local = g
        form = new ldForm do
          root: '.form[data-name=passwd]'
          submit: '.btn[ld=update-password]'
          after-check: (s) ->
            [p1,p2] = [@fields.newpasswd1.value, @fields.newpasswd2.value]
            if s.newpasswd1 != 1 and p1.length < 6 => s <<< newpasswd1: 2, newpasswd2: 1
            if p1 != p2 and (s.newpasswd2 != 1 or p2 and s.newpasswd1 == 0) => s.newpasswd2 = 2
            passwd = ld$.find(@root, '[data-node]', 0)
            if s.newpasswd1 != 1 =>
              len = Math.round(p1.length)
              text = if len < 8 => \不妙 else if len < 10 => \還好 else \不錯
              width = 100 * ( len <? 12 ) / 12
              color = if len < 8 => \danger else if len < 10 => \warning else \success
              ld$.find(passwd, 'label', 0).textContent = "長度: #text"
              bar = ld$.find(passwd, '.progress-bar', 0)
              bar.style.width = "#{width}%"
              cls = bar.getAttribute \class
              cls = cls.replace(/bg-\S+/, '').trim! + " bg-#color"
              bar.setAttribute \class, cls
        btn = ld$.find(document, '.form[data-name=passwd] .btn[ld=update-password]', 0)
        ldld = new ldLoader root: btn
        btn.addEventListener \click, ->
          if btn.classList.contains(\disabled) => return
          ldld.on!
          val = form.values!
          ld$.fetch \/dash/api/me/passwd/, {
            method: \put
            body: JSON.stringify({o: val.oldpasswd, n: val.newpasswd1})
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
          }, {}
            .finally ->
              ldld.off!
            .then ->
              notify.send \success, "Password updated."
              form.reset!
            .catch ->
              notify.send \danger, "Update password failed."

  ldc.register <[auth ldcvmgr change-password notify]>,
  ({auth, ldcvmgr, change-password, notify}) ->
    local = {}
    auth.get {authed: true}
      .catch -> ldcvmgr.toggle("auth-required")
      .then (g) ->
        local.g = g
        auth.userinfo g.user
      .then ->
        local.user = it
        form = new ldForm do
          root: '.form[data-name=basic]'
          submit: '.btn[ld=updateBasicData]'
          after-check: (s) ->
            s.description = 0
            s.title = 0
            s.tags = 0
            if @fields.displayname.value => s.displayname = 0
        new Tagify form.fields.tags, do
          originalInputValueFormat: (vals) -> vals.map(-> it.value).join \,

        view = new ldView root: document.body, handler: do
          updateBasicData: ({node}) ->
            ldld = new ldLoader root: node
            node.addEventListener \click, ->
              ldld.on!
              val = form.values!
              ld$.fetch(
                "/dash/api/user/#{local.g.{}user.key}"
                {method: \PUT}
                {json: val{description,displayname,title,tags}, type: \text}
              )
                .catch -> ldcvmgr.toggle \error; console.log it
                .then -> auth.fetch {renew: true}
                .then -> debounce 500
                .then -> notify.send \success, \updated.
                .then -> debounce 500
                .then -> ldld.off!
          mailVerify: ({node}) ->
            ldld = new ldLoader root: node
            if local.user.verified =>
              node.innerText = "Verified in #{moment(local.user.verified.date).format("YYYY/MM/DD")}"
            else
              node.addEventListener \click, ->
                ldld.on!
                if node.classList.contains \disabled => return
                ld$.fetch \/dash/api/me/mail/verify, {method: \POST}
                  .catch -> ldcvmgr.toggle \error
                  .then -> debounce 1000
                  .then -> ldld.off!
                  .then -> ldcvmgr.toggle \verification-mail-sent

          sendResetLink: ({node}) ->
            node.addEventListener \click, ->
              if node.classList.contains \disabled => return
              ld$.fetch(\/dash/api/me/passwd/reset, {
                method: \POST
                body: JSON.stringify({email: local.g.user.username})
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
              }, {})
                .then ->
                  node.innerHTML = 'Link Sent.<i class="i-check"></i>'
                  node.classList.add \disabled

          copyUid: ({node}) ->
            c = new ClipboardJS(node)
            c.on \success, ->
              node.classList.add \tip-on
              debounce 2000 .then -> node.classList.remove \tip-on

)!
