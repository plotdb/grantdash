require! <[express crypto fs]>

(engine, io) <-(-> module.exports = it) _

sample = [{
  "案件編號": "測試"
  "申請者": "測試"
  "計畫名稱": "測試"
  "年度": "測試"
  "承辦人": "測試"
  "承辦人電話": "測試"
  "承辦人email": "測試"
  "補助金額": "測試"
  "案件狀態": "測試"
  "計畫聯聯人": "測試"
  "團體負責人": "測試"
  "統一編號": "測試"
}]

encode = ({json, key, iv}) ->
  data = JSON.stringify(json)
  cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
  code = Buffer.concat([cipher.update(data), cipher.final!]).toString(\base64)
  return code

decode = ({code, key, iv}) ->
  decipher = crypto.createDecipheriv("aes-256-cbc", key, iv)
  ret = Buffer.concat([decipher.update(Buffer.from(code, \base64)), decipher.final!]).toString!
  return JSON.parse(ret)

engine.router.ext.get \/moc-portal, (req, res) ->
  [id, all] = [req.query.id, req.query.all]
  if !(moc = engine.config.moc) => return res.send!
  key = "#id#{moc.token}"
  try
    ret = encode json: sample, key: key, iv: moc.iv
    res.send ret
  catch e
    res.send!

