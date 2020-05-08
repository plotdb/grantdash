require! <[fs colors js-yaml]>
require! <[nodemailer nodemailer-mailgun-transport]>
require! <[./md ../../aux ../../../secret]>

mailgun = nodemailer.createTransport(nodemailer-mailgun-transport(secret.mailgun))

# sample-payload = do
#   from: '"Your DisplayName" <your@email.address>'
#   to: "someone@some.where"
#   subject: "Your Title"
#   text: """  .... ( your text ) .... """
#   html: """  .... ( your html ) .... """

mail-queue = do
  list: []
  add: (obj) ->
    @list.push obj
    @handler!
  handle: null
  handler: ->
    if @handle => return
    console.log "[MAIL-QUEUE] new job incoming, handling...".cyan
    @handle = setInterval (~>
      console.log "[MAIL-QUEUE] #{@list.length} jobs remain...".cyan
      obj = @list.splice(0, 1).0
      if !obj =>
        console.log "[MAIL-QUEUE] all job done, take a rest.".green
        clearInterval @handle
        @handle = null
        return
      module.exports.send-directly obj.payload
        .then obj.res
        .catch obj.rej
    ), 5000

module.exports = do
  # queued send
  send: (payload, opt = {}) ->
    if opt.now => return module.exports.send-directly payload
    new Promise (res, rej) -> mail-queue.add {payload, res, rej}

  # directly send
  send-directly: (payload) -> new Promise (res, rej) ->
    console.log "[MAILGUN] sending [from:#{payload.from}] [to:#{payload.to}] [subject:#{payload.subject}]".cyan
    (e,i) <- mailgun.sendMail payload, _
    if !e => return res!
    console.log "[MAILGUN] SendMail failed: ".red, e
    return rej(aux.error 500, "failed to send mail. try later?")

  # content -> text / html
  send-from-md: (payload, map = {}, opt={}) -> new Promise (res, rej) ->
    content = (payload.content or '')
    for k,v of map => content = content.replace new RegExp("\#{#k}", "g"), v
    payload.text = md.to-text(content)
    payload.html = md.to-html(content)
    delete payload.content
    module.exports.send(payload,opt).then -> res!

  by-template: (name, email, map = {}, config = {}) -> new Promise (res, rej) ->
    path = if config.path => that else '.'
    (e, content) <- fs.read-file "#path/config/mail/#name.yaml", _
    if e =>
      console.log "[MAIL] send mail failed: ", e
      return rej(aux.error 500, "failed to send mail. try later?")
    try
      payload = js-yaml.safe-load content
    catch e
      console.log "[MAIL] send mail failed: ", e
      return rej(aux.error 500, "failed to send mail. try later?")
    option = from: payload.from, to: email, subject: payload.subject, content: payload.content
    if config.bcc => option.bcc = config.bcc
    module.exports.send-from-md(option, map,{now: config.now})
      .then -> res!
      .catch (e) -> rej e
