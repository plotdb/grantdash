(function(){ var curegex = [
[
  {
    "name": "email",
    "rule": "^[-a-z0-9~!$%^&*_=+}{\\'?]+(\\.[-a-z0-9~!$%^&*_=+}{\\'?]+)*@([a-z0-9_][-a-z0-9_]*(\\.[-a-z0-9_]+)*\\.[a-z]{2,}|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))(:[0-9]{1,5})?$",
    "flag": "i"
  },
  {
    "name": "url",
    "rule": "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)"
  },
  {
    "name": "password-len8-cn",
    "rule": "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"
  },
  {
    "name": "password-len8-cns",
    "rule": "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"
  },
  {
    "name": "password-len8-uln",
    "rule": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"
  },
  {
    "name": "password-len8-ulns",
    "rule": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  }
]
,
[
  {
    "name": "han",
    "rule": "^[\\u4e00-\\u9fa5]{0,}$",
    "desc": "中文字"
  },
  {
    "name": "id",
    "rule": "^[a-zA-Z][0-9]{9}$",
    "desc": "身份證字號"
  },
  {
    "name": "mobile",
    "rule": "^[0-9]{4}-?[0-9]{3}-?[0-9]{3}$",
    "desc": "手機號碼"
  },
  {
    "name": "vatid",
    "rule": "^[0-9]{8}$",
    "desc": "統一編號"
  },
  {
    "name": "zipcode",
    "rule": "^[0-9]{3}|[0-9]{5,6}$",
    "desc": "郵遞區號"
  }
]
];
var map, main;
map = {};
curegex.map(function(regs){
  return regs.map(function(it){
    return map[it.name] = it;
  });
});
main = {
  get: function(name, engine){
    var obj;
    if (!engine) {
      engine = this._engine || RegExp;
    }
    if (!(obj = map[name])) {
      return null;
    }
    return new engine(obj.rule, obj.flag || []);
  },
  engine: function(it){
    return this._engine = it;
  },
  raw: function(name){
    return map[name];
  }
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = main;
}
if (typeof window != 'undefined' && window !== null) {
  window.curegex = main;
}
})();
