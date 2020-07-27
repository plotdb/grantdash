// Generated by LiveScript 1.3.0
ldc.register('flagship-form', ['auth', 'error', 'viewLocals'], function(arg$){
  var auth, error, viewLocals, init;
  auth = arg$.auth, error = arg$.error, viewLocals = arg$.viewLocals;
  console.log(viewLocals);
  init = function(arg$){
    var global, ldforms, payload, saveLocally, loadLocally, getSignedUrl, uploadFile, isReady, budgetCalc, view, ldform;
    global = arg$.global;
    ldforms = {};
    payload = {
      form: {},
      file: {
        plan: {}
      },
      list: {
        "past-sub": [],
        "perform": []
      }
    };
    saveLocally = debounce(function(){
      payload.form = ldform.values();
      window.localStorage.setItem("taicca-flagship-form-snapshot-" + global.user.key, JSON.stringify(payload));
      return payload;
    });
    loadLocally = function(){
      return Promise.resolve().then(function(){
        var data;
        data = JSON.parse(window.localStorage.getItem("taicca-flagship-form-snapshot-" + global.user.key));
        if (!data) {
          return;
        }
        import$(payload, data);
        ldform.values(payload.form);
        view.render();
        return ldform.checkAll();
      });
    };
    getSignedUrl = function(opt){
      opt == null && (opt = {});
      return ld$.fetch("/dash/api/flagship/upload", {
        method: 'POST'
      }, {
        json: opt,
        type: 'json'
      });
    };
    uploadFile = function(arg$){
      var file, infoNode;
      file = arg$.file, infoNode = arg$.infoNode;
      if (file.type !== 'application/pdf') {
        return Promise.reject(new ldError(1020));
      }
      return getSignedUrl({
        filename: file.name,
        size: file.size
      }).then(function(arg$){
        var signedUrl, id;
        signedUrl = arg$.signedUrl, id = arg$.id;
        return ld$.xhr(signedUrl, {
          method: 'PUT',
          body: file,
          headers: {
            "Content-Type": file.type
          }
        }, {
          noDefaultHeaders: true,
          progress: function(it){
            if (!infoNode) {
              return;
            }
            infoNode.innerText = "上傳中 / " + Math.floor(it.percent * 10000) / 100 + "%";
            return infoNode.removeAttribute('href');
          }
        }).then(function(){
          console.log('done');
          return {
            filename: file.name,
            size: file.size,
            id: id
          };
        });
      });
    };
    isReady = {
      state: false,
      check: function(){
        return isReady.get();
      },
      get: debounce(function(){
        var _;
        _ = function(){
          var k, ref$, v, i$, len$, n;
          for (k in ref$ = ldforms) {
            v = ref$[k];
            if (!v.ready()) {
              return false;
            }
          }
          if (!ldform.ready()) {
            return false;
          }
          budgetCalc();
          if (!payload.budget.ready) {
            return false;
          }
          for (i$ = 0, len$ = (ref$ = ['plan']).length; i$ < len$; ++i$) {
            n = ref$[i$];
            if (!(payload.file[n] && payload.file[n].id)) {
              return false;
            }
          }
          return true;
        };
        isReady.state = _();
        view.render("ready-state");
        view.render("submit");
        return isReady.state;
      })
    };
    budgetCalc = function(){
      var total, ref$, self, subsidy, percent, cur, old;
      total = ((ref$ = payload.list).budget || (ref$.budget = [])).map(function(it){
        return it.value.price * it.value.count;
      }).reduce(function(a, b){
        return a + +b;
      }, 0);
      self = ((ref$ = payload.list).budget || (ref$.budget = [])).map(function(it){
        return it.value.self;
      }).reduce(function(a, b){
        return a + +b;
      }, 0);
      subsidy = total - self;
      percent = {
        self: self / (total || 1),
        subsidy: (total - self) / (total || 1)
      };
      ref$ = payload.budget || (payload.budget = {});
      ref$.total = total;
      ref$.subsidy = subsidy;
      ref$.self = self;
      ref$.percent = percent;
      cur = !(payload.budget.total > 5000000 || payload.budget.percent.subsidy > 0.49);
      old = payload.budget.ready;
      payload.budget.ready = cur;
      if (old !== cur) {
        return isReady.check();
      }
    };
    view = new ldView({
      root: document.body,
      action: {
        change: {
          "file-upload": function(arg$){
            var node, evt, name, infoNode, p;
            node = arg$.node, evt = arg$.evt;
            name = node.getAttribute('data-name');
            infoNode = view.getAll("file-uploaded").filter(function(it){
              return it.getAttribute('data-name') === name;
            })[0];
            p = !(node.files && node.files.length)
              ? Promise.resolve().then(function(){
                return payload.file[name] = null;
              })
              : uploadFile({
                file: node.files[0],
                infoNode: infoNode
              }).then(function(it){
                return payload.file[name] = it;
              });
            return p.then(function(){
              saveLocally();
              isReady.check();
              return view.render('file-uploaded');
            })['catch'](function(e){
              if (ldError.id(e) === 1020) {
                return alert("不支援此種檔案類型，請用 PDF 檔.");
              } else {
                return alert("上傳失敗。請晚點再試一次");
              }
            });
          }
        },
        click: {
          "add-column": function(arg$){
            var node, ref$, key$;
            node = arg$.node;
            ((ref$ = payload.list)[key$ = node.getAttribute('data-name')] || (ref$[key$] = [])).push({});
            return view.render('column');
          },
          submit: function(){
            return isReady.get().then(function(v){
              if (!v) {
                return;
              }
              saveLocally();
              return auth.recaptcha.get().then(function(recaptcha){
                var json;
                json = {
                  recaptcha: recaptcha,
                  detail: payload,
                  name: payload.form.name,
                  description: (payload.form["abs-item"] || "").substring(0, 200),
                  brd: "flagship-2"
                };
                return ld$.fetch('/dash/api/flagship/prj', {
                  method: 'POST'
                }, {
                  json: json,
                  type: 'json'
                }).then(function(){
                  return console.log("done.");
                });
              });
            });
          }
        }
      },
      text: {
        fill: function(arg$){
          var node, n, values, that, ret, total, ref$, self, gid;
          node = arg$.node;
          n = node.getAttribute('data-name');
          if (!ldform) {
            return;
          }
          values = ldform.values();
          if (that = values[n]) {
            return that;
          }
          if (n === 'doc-year') {
            return new Date().getYear() - 11;
          }
          if (n === 'doc-month') {
            return new Date().getMonth() + 1;
          }
          if (n === 'doc-day') {
            return new Date().getDate();
          }
          if (ret = /^budget-(self|subsidy)(-percent)?$/.exec(n)) {
            total = ((ref$ = payload.list).budget || (ref$.budget = [])).map(function(it){
              return it.value.price * it.value.count;
            }).reduce(function(a, b){
              return a + +b;
            }, 0);
            self = ((ref$ = payload.list).budget || (ref$.budget = [])).map(function(it){
              return it.value.self;
            }).reduce(function(a, b){
              return a + +b;
            }, 0);
            if (ret[2]) {
              if (ret[1] === 'self') {
                return Math.floor(10000 * self / (total || 1)) / 100;
              } else {
                return Math.ceil(10000 * (total - self) / (total || 1)) / 100;
              }
            } else {
              if (ret[1] === 'self') {
                return self;
              } else {
                return total - self;
              }
            }
          }
          gid = {
            "文化內容開發組": "01",
            "內容產業領航行動組": "02"
          }[values.group];
          if (n === 'docid') {
            return "109-" + gid + "-XXX";
          }
          return "";
        }
      },
      handler: {
        "budget-limit": function(arg$){
          var node;
          node = arg$.node;
          budgetCalc();
          return node.classList.toggle('d-none', payload.budget.ready);
        },
        submit: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('disabled', !isReady.state);
        },
        "ready-state": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', isReady.state);
        },
        "file-uploaded": function(arg$){
          var node, name, data;
          node = arg$.node;
          name = node.getAttribute('data-name');
          node.removeAttribute('href');
          node.classList.remove('text-danger');
          if (!(data = payload.file[name])) {
            node.classList.add('text-danger');
            return node.innerText = "尚未上傳檔案";
          }
          node.innerText = data.filename + " / size: " + Math.round(data.size / 1024) + "KB";
          return node.setAttribute('href', "/dash/flagship/upload/" + data.id);
        },
        toggler: function(arg$){
          var node, v, name;
          node = arg$.node;
          if (!ldform) {
            return;
          }
          v = ldform.values();
          name = node.getAttribute('data-name');
          return node.classList.toggle('d-none', v[name] !== "1");
        },
        column: {
          list: function(arg$){
            var node, ref$, key$;
            node = arg$.node;
            return (ref$ = payload.list)[key$ = node.getAttribute('data-name')] || (ref$[key$] = []);
          },
          action: {
            click: function(arg$){
              var node, evt, data, list, idx;
              node = arg$.node, evt = arg$.evt, data = arg$.data;
              if (!(evt.target && evt.target.classList && evt.target.classList.contains('i-close'))) {
                return;
              }
              list = payload.list[node.getAttribute('data-name')];
              if (!~(idx = list.indexOf(data))) {
                return;
              }
              list.splice(idx, 1);
              return view.render('column');
            }
          },
          init: function(arg$){
            var node, data, local, n, get, ldform;
            node = arg$.node, data = arg$.data, local = arg$.local;
            n = node.getAttribute('data-name');
            get = function(){
              data.value || (data.value = {});
              ld$.find(node, "[name]").map(function(it){
                return data.value[it.getAttribute('name')] = it.value;
              });
              return saveLocally();
            };
            ld$.find(node, "input,textarea,select").map(function(n){
              n.addEventListener('input', function(){
                return get();
              });
              return n.addEventListener('change', function(){
                return get();
              });
            });
            local.ldform = ldforms[n] = ldform = new ldForm({
              root: node,
              verify: function(name, value){
                var values, total, subsidy;
                if (n === 'perform') {
                  if (name === 'brief' && value.length >= 200) {
                    return 2;
                  }
                  if (name === 'result' && value.length >= 100) {
                    return 2;
                  }
                }
                if (n === 'budget') {
                  if (name === 'comment') {
                    return 0;
                  }
                  values = ldform.values();
                  total = +values["price"] * +values["count"];
                  subsidy = total - +values["self"];
                  ldform.fields["subsidy"].value = subsidy;
                  ldform.fields["total"].value = total;
                  if (name === 'self' && subsidy < 0) {
                    return 2;
                  }
                  view.render('fill');
                  view.render('budget-limit');
                }
                return value ? 0 : 2;
              }
            });
            return ldform.on('readystatechange', function(){
              return isReady.check();
            });
          },
          handler: function(arg$){
            var node, data, local;
            node = arg$.node, data = arg$.data, local = arg$.local;
            ld$.find(node, "input,textarea,select").map(function(f){
              return f.value = (data.value || (data.value = {}))[f.getAttribute('name')] || '';
            });
            return local.ldform.checkAll();
          }
        }
      }
    });
    ldform = new ldForm({
      root: ld$.find('form', 0),
      afterCheck: function(){
        saveLocally();
        if (view) {
          view.render('toggler');
        }
        if (view) {
          return view.render();
        }
      },
      verify: function(name, value, element){
        var v, ret, groupFor, groupName, enabled;
        v = value || '';
        if (name === 'group1-category') {
          ldform.check({
            n: 'group1-category-other'
          });
        }
        if (name === 'group2-category') {
          ldform.check({
            n: 'group2-category-other'
          });
        }
        if (name === 'brief' && (v.length < 300 || v.length > 500)) {
          return 2;
        } else if (name === 'uid') {
          return /[a-zA-Z][0-9]{9}/.exec(v) ? 0 : 2;
        } else if (name === 'found-reason') {
          return v.length > 100 ? 2 : 0;
        } else if (name === 'comment') {
          return 0;
        } else if (name === 'consent') {
          return element.checked ? 0 : 2;
        } else if (name === 'group') {
          ldform.check([
            {
              n: 'group1-category'
            }, {
              n: 'group2-category'
            }
          ]);
        } else if (name === 'has-other-sub') {
          ldform.check([
            {
              n: 'other-sub-name'
            }, {
              n: 'other-sub-amount'
            }
          ]);
        } else if (ret = /^group([12])-category$/.exec(name)) {
          groupFor = {
            "1": "文化內容開發組",
            "2": "內容產業領航行動組"
          }[ret[1]];
          groupName = ldform.values()["group"];
          if (!(v && v.length) && groupFor === groupName) {
            return 2;
          } else {
            return 0;
          }
        } else if (ret = /^group([12])-category-other$/.exec(name)) {
          groupFor = {
            "1": "文化內容開發組",
            "2": "內容產業領航行動組"
          }[ret[1]];
          groupName = ldform.values()["group"];
          enabled = in$("其它", ldform.values()[name.replace('-other', '')] || []) && groupFor === groupName;
          return enabled && !v
            ? 2
            : enabled ? 0 : 0;
        } else if (/^other-sub-/.exec(name)) {
          if (ldform.values()["has-other-sub"] === "0") {
            return 0;
          } else if (!v) {
            return 2;
          }
        } else if (name === 'abs-item' || name === 'abs-method' || name === 'abs-timeline' || name === 'abs-outcome') {
          if (!(v && v.length < 200)) {
            return 2;
          }
        } else if (!v || (Array.isArray(v) && !v.length)) {
          return 2;
        }
        return 0;
      }
    });
    ldform.on('readystatechange', function(){
      return isReady.check();
    });
    return loadLocally();
  };
  return auth.ensure().then(function(it){
    return init({
      global: it
    });
  })['catch'](error());
});
ldc.app('flagship-form');
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}