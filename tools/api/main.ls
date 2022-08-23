require! <[fs crypto bcrypt ../../engine/io/postgresql yargs @plotdb/colors]>
secret = require "../../secret"
cfg = secret.io-pg
io = new postgresql({io-pg: cfg})

/*
  案件編號    - 內碼?
  申請者      - 單位名稱
  計畫名稱    - 計畫名稱
  年度        - (需填)
  承辦人      - (需填)
  承辦人電話  - (需填)
  承辦人email - (需填)
  項目        - 不明
  補助金額    - (需填)
  案件狀態    - (需填)
  計畫聯聯人  - 聯絡人
  團體負責人  - 負責人
  統一編號    - 統編
*/

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
    "申請者": form{}['提案單位'].v
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

list = ["flagship-2", "flagship-1", "future-content", "future-content-111", "icg-111", "fcm-111", "icg-110"]
result = []

io.query """
select * from brd where slug = ANY($1)
""", [list]
  .then (r = {}) ->
    ps = r.[]rows.map (brd) ->
      io.query """
      select key,brd,detail,system from prj where
        (system->'badge'->'winner')::bool = true
        and brd = $1
      """, [brd.slug]
        .then (r={}) ->
          prjs = r.[]rows
          prjs.map (prj) ->
            ret = parser {brd, prj}
            map = ret <<<
              "年度": brd.detail.info.year or 'n/a'
              "承辦人": brd.detail.info.pic or 'n/a'
              "承辦人電話": brd.detail.info.phone or 'n/a'
              "承辦人email": brd.detail.info.email or 'n/a'
              "補助金額": prj.system.{}budget.subsidy or 'n/a'
            result.push map
    Promise.all ps
  .then -> fs.write-file-sync "output.json", JSON.stringify(result)
  .then -> process.exit!
  .catch -> console.log it
