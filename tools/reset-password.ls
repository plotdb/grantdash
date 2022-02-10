require! <[fs crypto bcrypt ../engine/io/postgresql yargs @plotdb/colors]>
secret = require "../secret"
cfg = secret.io-pg
io = new postgresql({io-pg: cfg})

passgen = ->
  src = "0123456789abcdefghijklmnopqr"
  des = "23456789ABCDEFGHJKMNPQRSTWXY"
  str = Array.from(Math.random!toString(src.length).substring(2,12)).map(-> des.charAt(src.indexOf(it))).join('')
  return str


hashing = (password, doMD5 = true, doBcrypt = true) -> new Promise (res, rej) ->
  ret = if doMD5 => crypto.createHash(\md5).update(password).digest(\hex) else password
  if doBcrypt => bcrypt.genSalt 12, (e, salt) -> bcrypt.hash ret, salt, (e, hash) -> res hash
  else res ret

argv = yargs
  .option \username, do
    alias: \u
    description: "username(email) to reset password"
    type: \string
  .option \output, do
    alias: \o
    description: "output file name for storing generated result"
    type: \string
  .option \list-file, do
    alias: \f
    description: "read username(email) from a file. one username per line."
    type: \string
  .help \help
  .alias \help, \h
  .check (argv, options) ->
    if !(argv.u or argv.f) => throw new Error("at least either username or list-file option should be given")
    if argv.f and !fs.exists-sync(argv.f) => throw new Error("given file #{argv.f} doesn't exist")
    return true
  .argv

outfile = argv.o
if argv.f => usernames = (fs.read-file-sync argv.f .toString!).split \\n
else usernames = [argv.u]

usernames = usernames.filter(->it).map(->it.trim!).filter(->it)

csv-content = []
log = ->
  csv-content.push it
  console.log it

_ = (idx = 1) ->
  if idx == 1 => log "_idx,username,password,result"
  Promise.resolve!then ->
    if !(username = usernames[idx - 1]) => return Promise.resolve!
    io.query "select key,username from users where username = $1", [username]
      .then (r={}) ->
        if !(r.rows.0) => return log "#idx,#username,,user not found"
        key = r.rows.0.key
        passwd = passgen!
        hashing passwd, true, true
          .then (phashed) ->
            io.query """update users set password = $2 where key = $1""", [key, phashed]
          .then ->
            log "#idx,#username,#passwd,ok"
      .then -> _(idx + 1)
      .catch (e = {}) ->
        log "#idx,#username,,failed:#{e.message or 'unknown reason'}'"
        _(idx + 1)

_!
  .then ->
    if outfile =>
      console.log "write result into #outfile ...".yellow
      fs.write-file-sync outfile, csv-content.join(\\n)
  .then ->
    console.log "total #{csv-content.length - 1} record(s) generated.".yellow
    console.log "finished.".green
    process.exit!
  .catch (e) -> console.log "failed with potential some fields updated. error: ", e

