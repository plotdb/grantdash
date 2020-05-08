require! <[fs fs-extra crypto express-rate-limit lderror]>
require! <[../../aux ../util/mail]>
(engine,io) <- (->module.exports = it)  _

throttling = do
  send: express-rate-limit {windowMs: 30 * 60 * 1000 max: 10, keyGenerator: aux.throttling.key }

engine.router.api.post \/me/mail/verify, throttling.send, (req, res) ->
  obj = {}
  if !(req.user and req.user.key and req.user.username) => return aux.r400 res, "not login."
  io.query "select key from users where key = $1", [req.user.key]
    .then (r={}) ->
      if r.[]rows.length == 0 => return aux.reject 404
      time = new Date!
      obj <<< {key: r.rows.0.key, hex: "#{r.rows.0.key}-" + (crypto.randomBytes(30).toString \hex), time: time }
      io.query "delete from mailverifytoken where owner=$1", [obj.key]
    .then -> io.query "insert into mailverifytoken (owner,token,time) values ($1,$2,$3)", [obj.key, obj.hex, obj.time]
    .then -> mail.by-template \mail-verify, req.user.username, {token: obj.hex}, {now: true}
    .then -> res.send!
    .catch aux.error-handler res, true

engine.app.get \/me/mail/verify/:token, (req, res) ->
  local = {}
  token = req.params.token
  if !token => return aux.r400 res, "", true
  io.query "select owner,time from mailverifytoken where token = $1", [token]
    .then (r={})->
      if !r.[]rows.length => return aux.reject 403, ""
      local.obj = obj = r.rows.0
      io.query "delete from mailverifytoken where owner = $1", [obj.owner]
    .then ->
      if new Date!getTime! - new Date(local.obj.time).getTime! > 1000 * 600 =>
        return Promise.reject(new lderror(1013))
      verified = {date: Date.now!}
      io.query "update users set verified = $2 where key = $1", [local.obj.owner, JSON.stringify(verified)]
      if req.user =>
        req.user.verified = verified
        return new Promise (res, rej) -> req.logIn(req.user, -> res!); return null
      else return null
    .then ->
      res.redirect \/auth/mail/verify/done/
      return null
    .catch (e) ->
      if (e instanceof lderror) and e.id == 1013 =>
        res.redirect \/auth/mail/verify/expire/
        return null
      else aux.error-handler(res, true) e
