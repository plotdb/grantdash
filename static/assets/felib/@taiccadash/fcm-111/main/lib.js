// Generated by LiveScript 1.6.0
window.lib = function(arg$){
  var def;
  def = arg$.def;
  return {
    info: function(arg$){
      var prj, _, form, data;
      prj = arg$.prj;
      _ = function(v){
        return (v ? v.v : v) || 'n/a';
      };
      form = prj.detail.custom[def.config.alias || def.lug];
      data = {
        name: _(form["計畫名稱"]),
        description: _(form["計畫摘要"]),
        team: {
          taxid: _(form["統一編號"]),
          name: _(form["單位名稱"]),
          pic: _(form["負責人"])
        },
        contact: {
          email: _(form["聯絡人e-mail"]),
          name: _(form["聯絡人姓名"]),
          mobile: _(form["聯絡人手機"]),
          title: _(form["聯絡人職稱"]),
          addr: _(form["聯絡地址"])
        }
      };
      return data;
    }
  };
};
