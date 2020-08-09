require! <[fs fs-extra crypto express-rate-limit lderror]>
require! <[../../aux ../../util/throttle ../../util/mail ../../util/action]>
(engine,io) <- (->module.exports = it)  _


engine.router.api.post \/me/mail/verify, throttle.count.action.mail, (req, res) ->
  obj = {}
  if !(req.user and req.user.key and req.user.username) => return aux.r400 res, "not login."
  io.query "select key from users where key = $1 and deleted is not true", [req.user.key]
    .then (r={}) ->
      if !(r.[]rows.length) => return aux.reject 404
      action.verify-email {req, user: req.user, io}
    .then -> res.send!
    .catch aux.error-handler res, true

engine.app.get \/me/mail/verify/:token, throttle.count.ip-md, (req, res) ->
  lc = {}
  token = req.params.token
  if !token => return aux.r400 res, "", true
  io.query "select owner,time from mailverifytoken where token = $1", [token]
    .then (r={})->
      if !r.[]rows.length => return aux.reject 403, ""
      lc.obj = obj = r.rows.0
      io.query "delete from mailverifytoken where owner = $1", [obj.owner]
    .then ->
      if new Date!getTime! - new Date(lc.obj.time).getTime! > 1000 * 600 =>
        return Promise.reject(new lderror(1013))
      lc.verified = verified = {date: Date.now!}
      io.query "update users set verified = $2 where key = $1", [lc.obj.owner, JSON.stringify(verified)]
      if req.user and req.user.key == lc.obj.owner =>
        req.user.verified = verified
        new Promise (res, rej) -> req.logIn(req.user, -> res!); return null
    .then ->
      io.query "select * from users where key = $1", [lc.obj.owner]
        .then (r={}) ->
          if !(u = r.[]rows.0) => return
          u.verified = lc.verified
          io.query """
          update sessions set detail = jsonb_set(detail, '{passport,user}', ($1)::jsonb)
          where (detail->'passport'->'user'->>'key')::int = $2
          """, [JSON.stringify(u), lc.obj.owner]
    .then ->
      res.redirect \/dash/auth/mail/verify/done/
      return null
    .catch (e) ->
      if (e instanceof lderror) and e.id == 1013 =>
        res.redirect \/dash/auth/mail/verify/expire/
        return null
      else aux.error-handler(res, true) e
