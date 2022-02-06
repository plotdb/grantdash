ldc.register "blockuploader", <[viewLocals auth ldNotify error notify]>, ({viewLocals, auth, error, notify}) ->
  uploader = (opt = {}) ->
    @brd = opt.brd # brd slug
    @owner = opt.owner #project owner. sometimes upload user may be staff so we still need this.
    @

  uploader.prototype = Object.create(Object.prototype) <<< do
    get-signed-url: (opt={}) ->
      ld$.fetch "/dash/api/gcs/upload", {method: \POST}, {json: opt, type: \json}

    upload: ({file, progress, field}) ->
      opt =
        filename: file.name
        size: file.size
        field: field
        owner: @owner
        brd: @brd

      @get-signed-url opt
        .then ({signed-url, id}) ~>
          ld$.xhr(
            signed-url,
            {method: \PUT, body: file, headers: {"Content-Type": file.type}},
            {
              no-default-headers: true
              progress: -> if progress => progress it
            }
          )
            .then ~>
              if progress => progress {percent: 1}
              console.log \done
              return do
                filename: file.name
                size: file.size
                modifiedtime: file.lastModified
                url: "/dash/gcs/upload/#id"
  uploader
