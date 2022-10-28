require! <[express crypto fs fs-extra]>

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
  "計畫聯絡人": "測試"
  "團體負責人": "測試"
  "統一編號": "測試"
}]

_parser =
  "flagship-1": ({prj,brd}) ->
    form = prj.detail.custom.raw
    "案件編號": prj.key
    "申請者": form['申請單位']
    "計畫聯絡人": form['聯絡人']
    "團體負責人": form['負責人']
    "統一編號": 'n/a'
    "計畫名稱": form['計畫名稱']
    "案件狀態": 'n/a'
  "flagship-2": ({prj,brd}) ->
    form = prj.detail.custom.form
    "案件編號": prj.key
    "申請者": form.teamname
    "計畫聯絡人": form["contact-name"]
    "團體負責人": form.pic
    "統一編號": form.vatid
    "計畫名稱": form.name
    "案件狀態": 'n/a'
  "future-content": ({prj,brd}) ->
    form = prj.detail.custom.raw
    "案件編號": prj.key
    "申請者": form['(代表)提案單位']
    "計畫聯絡人": form['聯絡人']
    "團體負責人": form['負責人']
    "統一編號": form['統一編號']
    "計畫名稱": form['計畫名稱']
    "案件狀態": 'n/a'
  "future-content-111": ({prj,brd}) ->
    form = prj.detail.custom.open
    "案件編號": prj.key
    "申請者": form{}['提案單位'].v
    "計畫聯絡人": form{}['聯絡人姓名'].v
    "團體負責人": form{}['負責人'].v
    "統一編號": form{}['統一編號'].v
    "計畫名稱": form{}['計畫名稱'].v
    "案件狀態": 'n/a'
  "fcm-111": ({prj,brd}) ->
    form = prj.detail.custom.open
    "案件編號": prj.key
    "申請者": form{}['單位名稱'].v
    "計畫聯絡人": form{}['聯絡人姓名'].v
    "團體負責人": form{}['負責人'].v
    "統一編號": form{}['統一編號'].v
    "計畫名稱": form{}['計畫名稱'].v
    "案件狀態": 'n/a'
  "icg-111": ({prj,brd}) ->
    form = prj.detail.custom.basic
    "案件編號": prj.key
    "申請者": form{}['applicant-zh'].v
    "計畫聯絡人": form{}['聯絡人姓名'].v
    "團體負責人": form{}['pic'].v
    "統一編號": form{}['taxid'].v
    "計畫名稱": form{}['name-zh'].v
    "案件狀態": 'n/a'

parser = ({prj,brd}) ->
  if !_parser[brd.slug] =>
    console.log "parser for `#{brd.slug}` not implemented."
    return {}
  _parser[brd.slug]({prj,brd})

fetch = ({id, all}) ->
  try
    date = new Date!
    name = (
      "_moc/" +
      "#{(date.getYear! + 1900)}".padStart(4, '0') + "-" +
      "#{(date.getMonth! + 1)}".padStart(2, '0') + "-" +
      "#{date.getDate!}".padStart(2, '0') + ".json"
    )
    fs-extra.ensure-dir-sync \_moc
    jsons = fs.readdir-sync \_moc
      .map -> "_moc/#it"
      .filter -> /\.json$/.exec(it)
    jsons.sort (a, b) -> if a > b => -1 else if a < b => 1 else 0
    d1-name = jsons.0
    d2-name = jsons.1
    d1-json = if d1-name => JSON.parse(fs.read-file-sync d1-name .toString!) else []
    d2-json = if d2-name => JSON.parse(fs.read-file-sync d2-name .toString!) else []
  catch e
    return Promise.reject e

  Promise.resolve!
    .then ->
      if d1-name == name => return [d1-json, d2-json]
      list = ["flagship-2", "flagship-1", "future-content", "future-content-111", "icg-111", "fcm-111", "icg-110"]
      result = []
      io.query """ select * from brd where deleted is not true""", []
        .then (r = {}) ->
          ps = r.[]rows.map (brd) ->
            meta = brd.detail.export or {}
            meta.{}cfg
            meta.{}prj
            if !meta.cfg.enabled => return Promise.resolve!
            io.query """
            select key,brd,detail,system from prj where
              (system->'badge'->>'winner')::bool = true
              and brd = $1
            """, [brd.slug]
              .then (r={}) ->
                prjs = r.[]rows
                prjs.map (prj) ->
                  ret = parser {brd, prj}
                  map = ret <<<
                    "年度": meta.cfg.year or 'n/a'
                    "承辦人": meta.cfg.pic or 'n/a'
                    "承辦人電話": meta.cfg.phone or 'n/a'
                    "承辦人email": meta.cfg.email or 'n/a'
                    "核定金額": meta.prj{}[prj.key].amount or 'n/a'
                    "案件狀態": meta.prj{}[prj.key].state or 'n/a'
                  result.push map
          Promise.all ps
        .then -> 
          fs.write-file-sync name, JSON.stringify(result)
          return [result, d1-json]
    .then (ret) ->
      d2 = {}
      if !all => (ret.1 or []).map -> d2[it["案件編號"]]= it
      payload = []
      for prj in (ret.0 or []) =>
        key = prj["案件編號"]
        if !d2[key] or JSON.stringify(prj) != JSON.stringify(d2[key]) =>
          payload.push prj
      return payload
    .catch -> console.log it

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
  fetch {id, all}
    .then (payload) ->
      ret = encode json: payload, key: key, iv: moc.iv
      res.send ret
    .catch ->
      res.status 500 .send!
      console.log "[MOC ERROR]", it
