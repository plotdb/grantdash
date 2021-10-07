require! <[fs path pug]>
pug-extapi = require("../watch/build/pug").extapi
reload = require("require-reload")(require)

pug-cached = {}
log = (f, opt, t, type, cache) ->
  f = f.replace(opt.basedir, '')
  console.log "[VIEW] #{f} served in #{t}ms (#type#{if cache =>' cached' else ''})"
engine = (f, opt, cb) ->
  lc = {}
  if opt.settings.env == \development => lc.dev = true
  if opt.settings['view cache'] => lc.cache = true
  {viewdir, basedir} = opt
  pc = path.join(viewdir, f.replace(basedir, '').replace(/\.pug$/, '.js'))
  try
    t1 = Date.now!
    mtime = fs.stat-sync(pc).mtime
    ret = if !lc.cache => {js: reload(pc), mtime}
    else if pug-cached[pc] => that else pug-cached[pc] = {js: require(pc), mtime}
    # if precompiled js is newer than the one we cached - flush the cache.
    if mtime - ret.mtime > 0 => pug-cached[pc] = {js: reload(pc), mtime}
    ret = ret.js(opt)
    t2 = Date.now!
    if lc.dev => log f, opt, t2 - t1, \precompiled, lc.cache
    cb null, ret
  catch e 
    try
      t1 = Date.now!
      (e, b) <- fs.read-file f, _
      if e => throw new Error(e)
      ret = (pug.render(b, ({} <<< opt <<< {filename: f, cache: false, basedir}) <<< pug-extapi))
      t2 = Date.now!
      if lc.dev => log f, opt, t2 - t1, 'from pug', lc.cache
      cb null, ret
    catch e
      if lc.dev => console.log "[VIEW] #{f.replace(opt.basedir, '')} serve failed."
      cb e, null

module.exports = engine
