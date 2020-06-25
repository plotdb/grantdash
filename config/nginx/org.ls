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

if !(process.argv and process.argv.length > 2) =>
  console.log "usage: lsc build [domain-name] [org-slug] <brd-slug>"
  process.exit -1

root = getwd!
config = do
 "domain-name": process.argv.2
 "web-root": path.join(root, "static")
 "user-root": path.join(root, "user")
 "org-slug": process.argv.3
 "brd-slug": process.argv.4

template = do
  cert:   fs.read-file-sync("templates/cert.config").toString!
  domain: fs.read-file-sync("templates/domain.config").toString!

outdir = path.join \domains, config["domain-name"]
console.log "output to #outdir ..."

fs-extra.ensure-dir outdir
  .then ->
    for n,c of template =>
      for k,v of config =>
        c = c.replace new RegExp("\\${#k}","gm"), v
        if n == \domain => n = \org
      fs.write-file-sync path.join(outdir, "#n.config"), c

