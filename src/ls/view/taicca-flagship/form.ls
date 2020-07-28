ldc.register \flagship-form, <[auth error viewLocals]>, ({auth, error, viewLocals}) ->
  vlc = viewLocals or {} 
  console.log vlc

  init = ({global}) ->

    ldforms = {}
    payload = do
      form: {}
      file: {plan: {}}
      list: do
        "past-sub": []
        "perform": []

    save-locally = debounce ->
      payload.form = ldform.values!
      window.localStorage.setItem "taicca-flagship-form-snapshot-#{global.user.key}", JSON.stringify(payload)
      return payload

    load-locally = ->
      Promise.resolve!
        .then ->
          if vlc.{}prj.{}detail and vlc.prj.detail.custom => data = vlc.prj.detail.custom
          else data = JSON.parse(window.localStorage.getItem("taicca-flagship-form-snapshot-#{global.user.key}"))
          if !data => return
          payload <<< data
          ldform.values payload.form
          view.render!
          ldform.check-all!

    get-signed-url = (opt={}) ->
      ld$.fetch "/dash/api/flagship/upload", {method: \POST}, {json: opt, type: \json}
    #file{name, size}
    upload-file = ({file, info-node}) ->
      if file.type != 'application/pdf' => return Promise.reject new ldError(1020)
      get-signed-url {filename: file.name, size: file.size}
        .then ({signed-url, id}) ->
          ld$.xhr(
            signed-url,
            {method: \PUT, body: file, headers: {"Content-Type": file.type}},
            {
              no-default-headers: true
              progress: ->
                if !info-node => return
                info-node.innerText = "上傳中 / #{Math.floor(it.percent * 10000)/100}%"
                info-node.removeAttribute \href
            }
          )
            .then ->
              console.log \done
              return {filename: file.name, size: file.size, id: id}

    is-ready = do
      state: false
      check: -> is-ready.get! 
      get: debounce ->
        _ = ->
          #TODO fix ldforms 
          for k,v of ldforms => if !(v.ready!) => return false
          if !(ldform.ready!) => return false
          budget-calc!
          if !payload.budget.ready => return false
          for n in <[plan]> =>
            if !(payload.file[n] and payload.file[n].id) => return false
          return true
        is-ready.state = _!
        view.render "ready-state"
        view.render "submit"
        return is-ready.state

    budget-calc = ->
      total = payload.list.[]budget.map(-> it.value.price * it.value.count).reduce(((a,b) -> a + +b),0)
      self = payload.list.[]budget.map(-> it.value.self).reduce(((a,b) -> a + +b),0)
      subsidy = total - self
      percent = do
        self: self / (total or 1)
        subsidy: (total - self) / (total or 1)
      payload.{}budget <<< {total, subsidy, self, percent}
      cur = !(payload.budget.total > 5000000 or payload.budget.percent.subsidy > 0.49 )
      old = payload.budget.ready
      payload.budget.ready = cur
      if old != cur => is-ready.check!

    view = new ldView do
      root: document.body
      action:
        change: do
          "file-upload": ({node, evt}) ->
            name = node.getAttribute(\data-name)
            info-node = view.getAll("file-uploaded").filter(-> it.getAttribute(\data-name) == name).0
            # TODO use lastModifiedDatd,name,size to identify auto reupload after history.go -1
            p = if !(node.files and node.files.length) => Promise.resolve!then -> payload.file[name] = null
            else upload-file {file: node.files.0, info-node} .then -> payload.file[name] = it
            p
              .then ->
                save-locally!
                is-ready.check!
                view.render \file-uploaded
              .catch (e) ->
                if ldError.id(e) == 1020 => alert "不支援此種檔案類型，請用 PDF 檔."
                else alert "上傳失敗。請晚點再試一次"

        click: do
          "add-column": ({node}) ->
            payload.list[][node.getAttribute(\data-name)].push {}
            view.render \column

          download: ->
            ld$.find 'select,textarea,input' .map (f) ->
              type = f.getAttribute(\type)
              node-name = f.nodeName.toLowerCase!
              if !type =>
                classes = Array.from(f.classList).filter(->!(it in <[is-valid is-invalid]>)) ++ ['_preview']
                f.setAttribute \value, f.value
                n = ld$.create name: \div, className: classes, style: f.style
                if node-name == \textarea => n.style.height = \auto
                n.innerText = f.value
                f.parentNode.insertBefore n, f
              else
                if f.checked => f.setAttribute(\checked,'') else f.removeAttribute \checked
            style = """
            <link rel="stylesheet" type="text/css" href="https://dash.taicca.tw/dash/assets/lib/bootstrap/4.3.1/css/bootstrap.min.css">
            <link rel="stylesheet" type="text/css" href="https://dash.taicca.tw/dash/assets/lib/ldui/ldui.min.css">
            <link rel="stylesheet" type="text/css" href="https://dash.taicca.tw/dash/css/index.css">
            <style type="text/css"> #{ld$.find(\style, 0).innerText} </style>
            """
            html = """
            <html>
            <head><meta charset="utf-8">#style</head>
            <body><div class="typeset heading-contrast">
            #{ld$.find(\#form, 0).innerHTML}
            </div></body>
            </html>
            """
            ld$.find document.body, '_preview' .map -> it.parentNode.removeChild it
            auth.recaptcha.get!
              .then (recaptcha) ->
                ld$.fetch(\/dash/api/flagship/download, {method: \POST}, {json: {html, recaptcha}, type: \blob})
              .then (blob) ->
                url = URL.createObjectURL blob
                a = ld$.create name: \a, attr: {href: url, download: \form.pdf}
                document.body.appendChild a
                a.click!
                document.body.removeChild a


          submit: ->
            is-ready.get!
              .then (v) ->
                if !v => return
                save-locally!
                auth.recaptcha.get!
                  .then (recaptcha) ->
                    json = do
                      key: (vlc or {}).{}prj.key
                      recaptcha: recaptcha
                      detail: payload
                      name: payload.form.name
                      description: (payload.form["abs-item"] or "").substring(0,200)
                      brd: "flagship-2"
                    ld$.fetch \/dash/api/flagship/prj, {method: \POST}, {json: json, type: \json}
                      .then -> console.log "done."

      text: do
        fill: ({node}) ->
          n = node.getAttribute(\data-name)
          if !ldform => return
          values = ldform.values!
          if values[n] => return that
          if n == \doc-year => return (new Date!).getYear! - 11
          if n == \doc-month => return (new Date!).getMonth! + 1
          if n == \doc-day => return (new Date!).getDate!
          if ret = (/^budget-(self|subsidy)(-percent)?$/.exec(n)) =>
            total = payload.list.[]budget.map(-> it.value.price * it.value.count).reduce(((a,b) -> a + +b),0)
            self = payload.list.[]budget.map(-> it.value.self).reduce(((a,b) -> a + +b),0)
            if ret.2 =>
              if ret.1 == \self => return Math.floor(10000 * self / (total or 1))/100
              else return Math.ceil(10000 * (total - self) / (total or 1))/100
            else
              if ret.1 == \self => return self
              else => return total - self
          gid = {"文化內容開發組": "01", "內容產業領航行動組": "02"}[values.group]
          if n == \docid =>
            id = vlc.slug.split('-')[* - 1]
            return "109-#{gid}-#{('0' * (3 - "#id".length) + id)}"
          return ""

      handler: do
        "budget-limit": ({node}) ->
          budget-calc!
          node.classList.toggle \d-none, payload.budget.ready
        submit: ({node}) ->
          node.classList.toggle \disabled, !is-ready.state
        "ready-state": ({node}) ->
          node.classList.toggle \d-none, is-ready.state

        "file-uploaded": ({node}) ->
          name = node.getAttribute(\data-name)
          node.removeAttribute \href
          node.classList.remove \text-danger
          if !(data = payload.file[name]) =>
            node.classList.add \text-danger
            return node.innerText = "尚未上傳檔案"
          node.innerText = "#{data.filename} / size: #{Math.round(data.size / 1024)}KB"
          node.setAttribute \href, "/dash/flagship/upload/#{data.id}"
        toggler: ({node}) ->
          if !ldform => return
          v = ldform.values!
          name = node.getAttribute(\data-name)
          node.classList.toggle \d-none, (v[name] != "1")
        column: do
          list: ({node}) -> return payload.list[][node.getAttribute(\data-name)]
          action: click: ({node,evt,data}) ->
            if !(evt.target and evt.target.classList and evt.target.classList.contains \i-close) => return
            list = payload.list[node.getAttribute(\data-name)]
            if !(~(idx = list.indexOf(data))) => return
            list.splice idx,1
            view.render \column

          init: ({node, data, local}) ->
            n = node.getAttribute(\data-name)
            get = ->
              data.{}value
              ld$.find(node, "[name]").map -> data.value[it.getAttribute(\name)] = it.value
              save-locally!
            ld$.find node, "input,textarea,select" .map (n) ->
              n.addEventListener \input, -> get!
              n.addEventListener \change, -> get!
            local.ldform = ldforms[n] = ldform = new ldForm do
              root: node
              verify: (name, value) ->
                if n == \perform =>
                  if name == \brief and value.length >= 200 => return 2
                  if name == \result and value.length >= 100 => return 2
                if n == \budget =>
                  if name == \comment => return 0
                  values = ldform.values!
                  total = +values["price"] * +values["count"]
                  subsidy = total - +values["self"]
                  ldform.fields["subsidy"].value = subsidy
                  ldform.fields["total"].value = total
                  if name == \self and subsidy < 0 => return 2
                  view.render \fill
                  view.render \budget-limit
                return if value => 0 else 2
            ldform.on \readystatechange, -> is-ready.check!

          handler: ({node, data, local}) ->
            ld$.find(node, "input,textarea,select").map (f) ->
              f.value = data.{}value[f.getAttribute(\name)] or ''
            local.ldform.check-all!

    ldform = new ldForm do
      root: ld$.find \form, 0
      afterCheck: ->
        save-locally!
        if view => view.render \toggler
        if view => view.render!
      verify: (name, value, element) ->
        v = value or ''
        if name == \group1-category => ldform.check n: \group1-category-other
        if name == \group2-category => ldform.check n: \group2-category-other
        if name == \brief and (v.length < 300 or v.length > 500) => return 2
        else if name == \uid => return (if /[a-zA-Z][0-9]{9}/.exec(v) => 0 else 2)
        else if name == \found-reason => return (if v.length > 100 => 2 else 0)
        else if name == \comment => return 0
        else if name == \consent => return (if element.checked => 0 else 2)
        else if name == \group => ldform.check [{n: \group1-category}, {n: \group2-category}]
        else if name == \has-other-sub => ldform.check [{n: \other-sub-name}, {n: \other-sub-amount}]
        else if (ret = /^group([12])-category$/.exec(name)) =>
          group-for = {"1": "文化內容開發組", "2": "內容產業領航行動組"}[ret.1]
          group-name = ldform.values!["group"]
          if ( !(v and v.length) and group-for == group-name) => return 2
          else return 0
        else if (ret = /^group([12])-category-other$/.exec(name)) =>
          group-for = {"1": "文化內容開發組", "2": "內容產業領航行動組"}[ret.1]
          group-name = ldform.values!["group"]
          enabled = ("其它" in (ldform.values![name.replace('-other','')] or [])) and group-for == group-name

          return (if enabled and !v => 2 else if enabled => 0 else 0)
        else if /^other-sub-/.exec(name) =>
          if ldform.values!["has-other-sub"] == "0" => return 0
          else if !v => return 2
        else if name in <[abs-item abs-method abs-timeline abs-outcome]> =>
          if !(v and v.length < 200) => return 2
        else if !v or (Array.isArray(v) and !v.length) => return 2
        return 0
    ldform.on \readystatechange, -> is-ready.check!

    load-locally!

  auth.ensure!
    .then -> init {global: it}
    .catch error!

ldc.app \flagship-form
