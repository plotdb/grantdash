require! <[fs fs-extra pug LiveScript stylus path browserify stream require-reload ./aux]>
pug-builder = require "./pug"
reload = require-reload require

cwd = path.resolve process.cwd!
modpug = {}
modlist = {}

main = do
  map: (list = []) ->
    list
      .filter -> /^src\/mod\/(.+)\/(.+)\//.exec(it) # src/mod/type/name
      .filter -> /.(ls|styl|pug|png|jpg|gif|svg)$/.exec(it) # no swap files
      .map ->
        des = path.normalize(
          it.replace(/^src\/mod/, "static/mod/")
            .replace(/\.pug$/,".html")
            .replace(/\.ls$/,".js")
            .replace(/\.styl$/,".css")
        )
        return {src: it, des}

  meta: (src) ->
    [type,id] = (/src\/mod\/([^\/]+)\/([^\/]+)\//.exec(src) or [null,null,null])[1 to 2]
    if !(type and id) => return
    if !modlist[type] =>
      modlist[type] = fs.readdir-sync "static/mod/#type/"
        .filter -> !(/\.[^\/]+$/.exec(it)) # no file ext
        .filter -> fs.exists-sync "static/mod/#type/#it/meta.json"
        .map -> JSON.parse(fs.read-file-sync "static/mod/#type/#it/meta.json" .toString!)
        .map -> it{id, name}
      modlist[type].sort (a,b) -> return (Math.round(Math.random!) * 2) - 1

    idx = Math.floor(Math.random! * (modlist[type].length - 9))
    more-mods = modlist[type][idx to (idx + 8)]
    t1 = Date.now!
    pugfile = "src/pug/asset/#type.pug"
    metafile = "static/mod/#type/#id/meta.json"
    htmlfile = "static/#type/#id/index.html"
    if fs.exists-sync(pugfile) and (!modpug[type] or modpug[type].mtime < fs.stat-sync(pugfile).mtime) =>
      modpug[type] = do
        mtime: fs.stat-sync(pugfile).mtime
        fn: pug.compile fs.read-file-sync(pugfile).toString!, {basedir: "src/pug"}
    c1 = aux.newer(src, metafile)
    c2 = aux.newer(src, htmlfile) or aux.newer(pugfile,htmlfile)
    if c1 or c2 =>
      fs-extra.ensure-dir path.dirname(htmlfile)
      ret = reload("../../../" + src)
      payload = ret{id, type, name, desc, tags, slug, license, support}
      fs.write-file-sync metafile, JSON.stringify(payload)
      ret = modpug[type].fn {mod: payload, more-mods: more-mods}
      fs.write-file-sync htmlfile, ret
      console.log "[BUILD] #src --> #metafile ( ... ) "
      console.log "[BUILD] #src --> #htmlfile ( #{Date.now! - t1}ms )"

  build: (list) ->
    list = @map list
    list.map ({src, des}) ~>
      t1 = Date.now!
      if aux.newer(des, src) => return
      try
        code = fs.read-file-sync src .toString!
        if /^\/\/- ?(module|view) ?/.exec(code) => return
        desdir = path.dirname(des)
        fs-extra.ensure-dir-sync desdir
        type = /\.([^.]+)$/.exec(src)
        type = if type => type.1
        if type == \ls =>
          code = LiveScript.compile fs.read-file-sync(src).toString!, {bare: true}
          s = new stream.Readable!
          s.push code; s.push null
          bobj = browserify s, {basedir: cwd}
          bobj.transform \glslify
          bobj.bundle (e, b) ~>
            if e => return console.log e
            fs-extra.ensure-dir-sync path.dirname(des)
            fs.write-file-sync des, b
            console.log "[BUILD] #src --> #des ( #{Date.now! - t1}ms )"
          # rebuild meta.json and index.html
          @meta src
          return
        else if type == \styl
          ret = stylus code
            .set \filename, src
            .define 'index', (a,b) ->
              a = (a.string or a.val).split(' ')
              return new stylus.nodes.Unit(a.indexOf b.val)
            .render! (e, css) ->
          fs.write-file-sync des, ret
        else if type == \pug
          fs.write-file-sync(
            des, pug.render code, {filename: src, basedir: path.join(cwd, 'src/pug/')} <<< pug-builder.extapi
          )
        else if /png|gif|jpg|svg/.exec(type) =>
          if aux.newer(des, src) => return
          fs-extra.copy-sync src, des
          console.log "[COPY ][MOD] #src --> #des ( #{Date.now! - t1}ms )"
          return
        else return

        console.log "[BUILD][MOD] #src --> #des ( #{Date.now! - t1}ms )"
      catch
        console.log "[BUILD][MOD] #src failed: ".red
        console.log e.message.toString!red
    return

  unlink: (list) ->
    list = @map list
    for {src,des} in list => if fs.exists-sync des =>
      fs.unlink-sync des
      console.log "[BUILD][MOD] #src --> #des deleted.".yellow

module.exports = main
