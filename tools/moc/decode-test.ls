require! <[request crypto]>
secret = require "../../secret"

elapsed = new Date!getTime!
(e,r,b) <- request {
  url: "https://v1.gda.sh/dash/ext/moc-portal?id=#elapsed"
  method: \GET
  rejectUnauthorized: false
  requestCert: true
  agent: false
}, _

decode = (code) ->
  token = secret.moc.token
  iv = secret.moc.iv
  key = elapsed + token
  decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
  ret = Buffer.concat([
    decipher.update(Buffer.from(code, "base64")),
    decipher.final()
  ]).toString!
  console.log JSON.parse(ret)

decode b
