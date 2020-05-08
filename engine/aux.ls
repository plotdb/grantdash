require! <[fs os moment moment-timezone lderror]>

base = do
  eschtml: (->
    map = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;'}
    (str) -> str.replace(/&<>'"]/g, (-> map[it]))
  )!

  ip: (req) -> req.headers['X-Real-IP'] or req.headers['x-real-ip'] or req.connection.remoteAddress
  log: (req, msg, head = "") ->
    date = moment(new Date!).tz("Asia/Taipei").format("MM-DD HH:mm")
    console.log "[#date|#head#{if head and req => ' ' else ''}#{if req => req.user.key else ''}] #msg"
  pad: (str="", len=2,char=' ') ->
    [str,char] = ["#str","#char"]
    "#char" * (len - str.length) + "#str"
  error: (code=403,msg="") -> new Error(msg) <<< {code}
  reject: (code=403,msg="") ->
    Promise.reject new Error(if typeof(msg) == typeof({}) => JSON.stringify(msg) else msg) <<< {code}

  now-tag: ->
    d = new Date!
    return "#{d.getYear!}".substring(1,3) +
    "/#{base.pad(d.getMonth! + 1,2,\0)}" +
    "/#{base.pad(d.getDate!,2,\0)}" +
    " #{base.pad(d.getHours!,2,\0)}" +
    ":#{base.pad(d.getMinutes!,2,\0)}" +
    ":#{base.pad(d.getSeconds!,2,\0)}"
  #TODO use error-handler in every promise.catch
  error-handler: (res,as-page=false) -> (e={}) ->
    if e instanceof lderror =>
      res.status(e.code or 403) .send e.toString({stack: false})
    else if typeof(e.code) == \number =>
      if as-page and base["r#{e.code}"] => base["r#{e.code}"] res, e.message, as-page
      else res.status e.code .send e.message
    else
      console.error "[#{base.now-tag!}] #{e.stack or e}"
      if as-page => base.r403 res, "sorry.", as-page
      else res.status 403 .send!
    return null

  r500: (res, error) ->
    console.log "[ERROR] #error"
    res.status(500).json({detail:error})
  r200: (res) -> res.send!

  res: ({res, code, msg, as-page} = {code: 404}) ->
    if as-page => res.status(code).send!
    else res.status(code)send msg
    return null

  r404: (res, msg = "", as-page = false) -> return @res {res, msg, as-page, code: 404}
  r403: (res, msg = "", as-page = false) -> return @res {res, msg, as-page, code: 403}
  r413: (res, msg = "", as-page = false) -> return @res {res, msg, as-page, code: 400}
  r402: (res, msg = "", as-page = false) -> return @res {res, msg, as-page, code: 400}
  r400: (res, msg = "", as-page = false) -> return @res {res, msg, as-page, code: 400}
  type:
    json: (req, res, next) ->
      res.set('Content-Type', 'application/json')
      next!

  numid: (as-page, cb) -> (req, res) ->
    if !/^\d+$/.exec(req.params.id) => return base.r400 res, "incorrect key type", as-page
    cb req, res

  numids: (as-page, names=[], cb) -> (req, res) ->
    if names.filter(-> !/^\d+$/.exec(req.params[it])).length => return base.r400 res, "incorrect key type", as-page
    cb req, res

  signed: (req, res, next) ->
    if !(req.user and req.user.key) => next(new lderror(1000)) else next!

  authorized: (cb) -> (req, res) ->
    if !(req.user and req.user.staff == 1) =>
      return res.status(404).render('err/404.pug', {url: req.originalUrl})
    cb req, res

  needlogin: (cb) -> (req, res) ->
    if !(req.user and req.user.key > 0) => return res.status(403).redirect "/auth/?nexturl=#{req.originalUrl}"
    cb req, res

  merge-config: (a,b) ->
    for k,v of b =>
      if a[k] and typeof(a[k]) == typeof({}) => base.merge-config(a[k], b[k])
      else => a[k] = b[k]
    a

  throttling: do
    key: (req) -> "#{req.ip}:#{req.originalUrl.replace(/\?.*$/,'')}"

  read-json: (path) -> new Promise (res, rej) ->
    (e, c) <- fs.read-file path, _
    if e => return res null
    try
      return res JSON.parse(c)
    catch e
      return res null

  read-mod-meta: (type, id) -> Promise.resolve!then ->
    if /^m-(.+)$/.exec(id) => id := that.1
    if !(id and /^[0-9a-zA-Z-]{1,255}$/.exec(id)) => return null
    if !(type and /^[0-9a-zA-Z-]{1,255}$/.exec(type)) => return null
    base.read-json "./static/mod/#type/#id/meta.json"

  get-ip: (default-ifname = "en0") ->
    ret = []
    ifaces = os.networkInterfaces!
    Object.keys ifaces .forEach (ifname) ->
      if default-ifname and ifname != default-ifname => return
      ifaces[ifname].forEach (iface) ->
        if \IPv4 == iface.family and iface.internal == false => ret.push iface.address
    ret

module.exports = base
