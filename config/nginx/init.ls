require! <[fs fs-extra path]>

getwd = ->
  pwd = process.cwd!
  offset = []
  while true
    p = [pwd] ++ offset
    np = path.join.apply path, p
    if np == "/" => break
    if fs.exists-sync path.join(np, 'secret.ls') => break
    offset.push '..'
  if np == "/" =>
    console.log "not in working directory."
    process.exit -1
  return np


root = getwd!
config = do
 "server-root": root
 "domain-name": process.argv.2
 "web-root": path.join(root, "static")
 "user-root": path.join(root, "user")
 "web-path": "static"
 "user-path": "users"

console.log "usage: lsc build <domain-name>"
if !config["domain-name"] => console.log "run without main domain ( single site mode )... "
else console.log "configure a centralized site #{config['domain-name']} ..."

template = do
  main: fs.read-file-sync("templates/server.config").toString!
  down: fs.read-file-sync("templates/down.config").toString!

outdir = path.join \servers
console.log "output to #outdir ..."

fs-extra.ensure-dir outdir
  .then ->

    for n,c of template =>
      for k,v of config =>
        c = c.replace new RegExp("\\${#k}","gm"), v
      c = c.split "# ${if-domain-name}"
      c = if config["domain-name"] => c.0 + (c.1 or '') else c.0
      fs.write-file-sync path.join(outdir, "#n.config"), c

console.log "done."
