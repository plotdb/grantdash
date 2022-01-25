ldc.register <[viewLocals auth ldNotify error notify]>, ({viewLocals, auth, error, notify}) ->
  vlc = viewLocals
  lc = {}
  payload = file: vlc.prj.{}detail.{}custom.{}file


  submit = ->
    auth.recaptcha.get!
      .then (recaptcha) ->
        json = do
          recaptcha: recaptcha
          file: payload.file
          slug: slug
        ld$.fetch \/dash/api/future-content/prj, {method: \POST}, {json}
      .then ->
        alert \updated
      .catch -> alert "failed to upload"

  get-signed-url = (opt={}) ->
    ld$.fetch "/dash/api/gcs/upload", {method: \POST}, {json: opt, type: \json}

  upload-file = ({file, info-node, field}) ->
    if !((field == \video and file.type == "video/mp4") or file.type == 'application/pdf') =>
      return Promise.reject new ldError(1020)
    opt =
      filename: file.name
      size: file.size
      owner: vlc.prj.owner or lc.global.user.key
      brd: \future-content
      field: field

    get-signed-url opt
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
            return {filename: file.name, size: file.size, id: id, modifiedtime: file.lastModified}


  raw = viewLocals.prj.{}detail.{}custom.{}raw
  slug = viewLocals.prj.slug
  ldld = new ldLoader className: 'ldld full'
  auth.get!then (g) ->
    lc.global = g
    view = new ldView do
      root: '[ld-scope=prj-detail]'
      action:
        change: 
          "file-upload": ({node, evt}) ->
            name = node.getAttribute(\data-name)
            btn = ld$.parent node, '.btn'
            if btn => btn.classList.toggle \running, true
            info-node = view.getAll("file-uploaded")
              .filter(-> it.classList.contains \no-print)
              .filter(-> it.getAttribute(\data-name) == name)
              .0
            # TODO use lastModifiedDatd,name,size to identify auto reupload after history.go -1
            p = if !(node.files and node.files.length) => Promise.resolve!then -> payload.file[name] = null
            else upload-file {file: node.files.0, info-node, field: name} .then -> payload.file[name] = it
            p
              .finally ->
                if btn => btn.classList.toggle \running, false
                node.value = null
                view.render \file-uploaded
              .then ->
                # TODO
                #save-locally!
                #is-ready.get!
                payload.file[name] = it
                submit!
              .then -> alert \ok

              .catch (e) ->
                if ldError.id(e) == 1020 => alert "不支援此種檔案類型，請用 " + (if name == \video => "MP4" else "PDF")
                else alert "上傳失敗。請晚點再試一次"


        click:
          submit: submit

          "update-note": ->
            if !(lc.global.user.key in [1,4]) => return
            json = {slug: slug, note: raw["註"]}
            ldld.on!
            auth.recaptcha.get!
              .then (recaptcha) ->
                json.recaptcha = recaptcha
              .then -> ld$.fetch "/dash/api/future-content/prj", {method: "POST"}, {json}
              .finally -> ldld.off!
              .then -> notify.send \success, "已更新"
              .catch -> error! it
        input:
          note: ({node}) ->
            raw["註"] = node.value or ''
      handler:
        "note-widget": ({node}) -> node.classList.toggle \d-none, !(lc.global.user.key in [1,4])
        "update-note": ({node}) -> node.classList.remove \d-none
        note: ({node}) ->
          node.value = raw["註"] or ''
          node.setAttribute \disabled, false
          node.disabled = false

        "file-uploaded": ({node}) ->
          name = node.getAttribute(\data-name)
          node.removeAttribute \href
          node.classList.remove \text-danger
          if !((data = payload.file[name]) and payload.file[name].id) =>
            node.classList.add \text-danger
            return node.innerText = "尚未上傳檔案"
          if node.classList.contains \no-print =>
            date = if data.modifiedtime =>
              "/ 檔案修改時間: " + moment(data.modifiedtime).tz("Asia/Taipei").format("YYYY-MM-DD hh:mm:ss")
            else ""
            node.innerText = "#{data.filename} / size: #{Math.round(data.size / 1024)}KB #date ( 點擊開啟 )"
          else
            node.innerText = "已上傳"
          node.setAttribute \href, "/dash/flagship/upload/#{data.id}"
