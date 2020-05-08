require! <[fs ../build/pug path]>

cwd = path.resolve process.cwd!

module.exports = do
  build: (list) ->
    if list.filter(-> !!/src\/pug\/spinner\/index.pug$/.exec(it)).length =>
      t1 = Date.now!
      src = "src/pug/spinner/index.pug"
      des = "static/spinner/index.html"
      mods = fs.readdir-sync 'static/mod/spinner/'
        .filter -> fs.exists-sync "static/mod/spinner/#it/meta.json"
        .map -> JSON.parse(fs.read-file-sync "static/mod/spinner/#it/meta.json" .toString!)
        .filter -> !it.debug
      fn = pug.compile(src, {})
      ret = fn {mods}
      fs.write-file-sync des, ret
      console.log "[BUILD] #src --> #des ( #{Date.now! - t1}ms )"
  unlink: ->
