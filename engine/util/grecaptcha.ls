require! <[request ../aux ../../secret lderror]>

module.exports = (req, res, next) ->
  if !(secret.grecaptcha and secret.grecaptcha.enabled) => return next!
  recaptcha = if req.body and req.body.recaptcha => req.body.recaptcha else if req.fields => req.fields.recaptcha
  (e,r,b) <- request {
    url: \https://www.google.com/recaptcha/api/siteverify
    method: \POST
    form: do
      secret: secret.grecaptcha.secret
      response: recaptcha
      remoteip: aux.ip(req)
  }, _
  if e => return next(new lderror(1010))
  try
    data = JSON.parse(b)
  catch e
    return next(new lderror(1010))
  if data.success == false => return next(new lderror(1009))
  if !data.score or data.score < 0.5 => return next(new lderror(1009))
  req.recaptcha = data
  next!
