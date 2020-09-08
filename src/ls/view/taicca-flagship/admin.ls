window.admin-extension = do
  download-projects: ({prjs}) ->
    head = <[編號 產業別 申請單位 計畫名稱 總經費 申請經費 申請經費佔比 107-109年文化部相關計畫補助情形 106-108年旗艦計畫補助情形 審查意見]>
    data = prjs.map (it) ->
      console.log it
      form = it.detail.custom.form
      list = it.detail.custom.list
      budget = it.detail.custom.budget

      gid = {"文化內容開發組": "01", "內容產業領航行動組": "02"}[form.group]
      idx = +it.{}system.idx
      id = if idx => "109-#{gid}-#{('0' * (3 - "#idx".length) + idx)}" else '-'
      category = if form.group == "文化內容開發組" => form["group1-category"]
      else form["group2-category"]
      data = [
        id
        category.join('\n')
        form["teamname"],
        form["name"],
        (budget.total or 0),
        (budget.subsidy or 0),
        "#{Math.floor(budget.percent.subsidy * 10000) / 100}%"
        list["past-sub"]
          .map -> "#{it.year}年 / #{it.name} / #{it.sponsor} / #{it.amount}"
          .join('\n')
      ]
      data
        .map -> "#{it or ''}".replace '"', "'"
        .map -> "\"#it\""
        .join(',')
    result = head.join(',') + '\n' + data.join '\n'
    blob = new Blob([result], {type: "text/csv"})
    name = "projects.csv"
    return {blob, name}
