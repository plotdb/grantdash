// Generated by LiveScript 1.3.0
window.adminExtension = {
  downloadProjects: function(arg$){
    var prjs, head, data, result, ba, i$, to$, i, blob, name;
    prjs = arg$.prjs;
    head = ['編號', '產業別', '申請單位', '計畫名稱', '聯絡人', '聯絡人職稱', '聯絡專線', '聯絡人手機', '聯絡EMAIL', '總經費', '申請經費', '申請經費佔比', '107-109年文化部相關計畫補助情形', '106-108年旗艦計畫補助情形', '審查意見'];
    data = prjs.map(function(it){
      var form, list, budget, gid, idx, id, category, data;
      console.log(it);
      form = it.detail.custom.form;
      list = it.detail.custom.list;
      budget = it.detail.custom.budget;
      gid = {
        "文化內容開發組": "01",
        "內容產業領航行動組": "02"
      }[form.group];
      idx = +(it.system || (it.system = {})).idx;
      id = idx ? "109-" + gid + "-" + (repeatString$('0', 3 - (idx + "").length) + idx) : '-';
      category = form.group === "文化內容開發組"
        ? form["group1-category"]
        : form["group2-category"];
      data = [
        id, (category || []).join('\r\n'), form["teamname"], form["name"], form["contact-name"], form["contact-title"], form["contact-phone"], form["contact-mobile"], form["contact-email"], budget.total || 0, budget.subsidy || 0, Math.floor(budget.percent.subsidy * 10000) / 100 + "%", (form["has-sub"] !== '1'
          ? [{}]
          : list["past-sub"]).filter(function(it){
          return it.value;
        }).map(function(it){
          var v;
          v = it.value;
          return v.year + "年 / " + v.name + " / " + v.sponsor + " / " + v.amount;
        }).join('\r\n')
      ];
      return data.map(function(it){
        return ((it || '') + "").replace('"', "'");
      }).map(function(it){
        return "\"" + it + "\"";
      }).join('\t');
    });
    result = head.map(function(it){
      return "\"" + it + "\"";
    }).join('\t') + '\n' + data.join('\n');
    ba = new Uint8Array(2 + result.length * 2);
    for (i$ = 0, to$ = result.length; i$ < to$; ++i$) {
      i = i$;
      ba[i * 2 + 2] = result.charCodeAt(i);
      ba[i * 2 + 1 + 2] = result.charCodeAt(i) >> 8;
    }
    ba[0] = 0xff;
    ba[1] = 0xfe;
    blob = new Blob([ba], {
      type: "text/csv"
    });
    name = "projects.csv";
    return {
      blob: blob,
      name: name
    };
  }
};
function repeatString$(str, n){
  for (var r = ''; n > 0; (n >>= 1) && (str += str)) if (n & 1) r += str;
  return r;
}