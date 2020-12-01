window.admin-extension = do
  download-projects: ({prjs}) ->
    head = <[編號 產業別 申請單位 計畫名稱 聯絡人 聯絡人職稱 登記地址 聯絡地址 =""聯絡專線"" =""聯絡人手機"" 聯絡EMAIL 總經費 申請經費 申請經費佔比 107-109年文化部相關計畫補助情形 106-108年旗艦計畫補助情形 審查意見]>
    data = prjs.map (it) ->
      form = it.detail.custom.form
      list = it.detail.custom.list
      budget = it.detail.custom.budget

      gid = {"文化內容開發組": "01", "內容產業領航行動組": "02"}[form.group]
      idx = +it.{}system.idx
      id = if idx => "109-#{gid}-#{('0' * (3 - "#idx".length) + idx)}" else '-'
      category = if form.group == "文化內容開發組" => form["group1-category"]
      else form["group2-category"]
      # adding tab before vaule prevent it from being interpreted as number.
      # adding "=""...""" might also work but at least not work for us.
      data = [
        id
        (category or []).join('\r\n')
        form["teamname"]
        form["name"]
        form["contact-name"]
        form["contact-title"]
        form["business-addr"]
        form["contact-addr"]
        (\\t + form["contact-phone"])
        (\\t + form["contact-mobile"])
        form["contact-email"]
        (budget.total or 0),
        (budget.subsidy or 0),
        "#{Math.floor(budget.percent.subsidy * 10000) / 100}%"
        ((if form["has-sub"] != \1 => [{}] else list["past-sub"]) or [])
          .filter -> it.value
          .map ->
            v = it.value
            "#{v.year}年 / #{v.name} / #{v.sponsor} / #{v.amount}"
          .join('\r\n')
      ]
      data
        .map -> "#{it or ''}".replace '"', "'"
        .map -> "\"#it\""
        .join('\t')
    result = head.map(->"\"#it\"").join('\t') + '\n' + data.join('\n')

    # according to https://stackoverflow.com/questions/155097
    # convert utf-8 csv to utf-16le with BOM (0xff 0xfe )
    # even with this, quoted newline only works
    # if csv is opened by double clicking instead of text import wizard.
    ba = new Uint8Array(2 + result.length * 2)
    for i from 0 til result.length
      ba[i * 2 + 2] = result.charCodeAt i
      ba[i * 2 + 1 + 2] = result.charCodeAt(i) .>>. 8
    ba[0] = 0xff
    ba[1] = 0xfe

    blob = new Blob([ba], {type: "text/csv"})
    name = "projects.csv"
    return {blob, name}
