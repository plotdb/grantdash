// Generated by LiveScript 1.3.0
ldc.register('adminInfo', ['error', 'loader', 'notify', 'ldcvmgr', 'auth', 'sdbAdapter'], function(arg$){
  var error, loader, notify, ldcvmgr, auth, sdbAdapter, Ctrl;
  error = arg$.error, loader = arg$.loader, notify = arg$.notify, ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var type, ref$, root, slugs, slugCheck, slug, form, lc, view, this$ = this;
    this.opt = opt;
    this.type = type = opt.type || null;
    if ((ref$ = !type) === 'org' || ref$ === 'brd' || ref$ === 'grp' || ref$ === 'prh') {
      if (!type) {
        throw new ldError(1015, "admin-info: malform type.");
      }
    }
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.data = opt.data;
    this.toc = opt.toc;
    slugs = {};
    slugCheck = debounce(500, function(n, v, e){
      var p;
      p = ld$.parent(form.fields[n], '.form-group');
      p.classList.add('running');
      return ld$.fetch("/dash/api/slug-check/" + type, {
        method: 'POST'
      }, {
        json: {
          slug: v
        },
        type: 'json'
      })['finally'](function(){
        return debounce(1000).then(function(){
          return p.classList.remove('running');
        });
      }).then(function(r){
        r == null && (r = {});
        return slugs[v] = r.result === 'free' ? false : true;
      })['catch'](function(){
        return slugs[v] = true;
      }).then(function(){
        return form.check({
          n: 'slug'
        });
      });
    });
    slug = (this.data || {}).slug;
    this.form = form = new ldForm({
      root: root,
      values: slug
        ? {
          slug: slug
        }
        : {},
      submit: '[ld=submit]',
      afterCheck: function(s, f){
        var fields;
        fields = ['name', 'slug', 'description', 'brd', 'grp'].filter(function(it){
          return f[it];
        });
        ['brd', 'grp'].map(function(n){
          return s[n] = f[n] && f[n].value ? 0 : 2;
        });
        return s.all = fields.reduce(function(a, b){
          return a && s[b] === 0;
        }, true) ? 0 : 2;
      },
      verify: function(n, v, e){
        if (n === 'starttime' || n === 'endtime') {
          v = moment(v).format();
        }
        if (!in$(n, ['slug'])) {
          this$.opsOut(function(d){
            d[n] = v;
            return d;
          });
        }
        if (in$(n, ['slug'])) {
          if (!/^[a-zA-Z0-9-]+$/.exec(v)) {
            return 2;
          }
          if (slugs[v] != null) {
            return slugs[v] ? 2 : 0;
          }
          slugCheck(n, v, e);
          return 1;
        }
        if (in$(n, ['limit'])) {
          return 1;
        }
        return !!v ? 0 : 2;
      }
    });
    lc = {};
    this.view = view = new ldView({
      root: root,
      init: {
        "tail-datetime": function(arg$){
          var node;
          node = arg$.node;
          return tail.DateTime(node);
        },
        orgs: function(){
          var payload;
          payload = {
            type: 'org'
          };
          return auth.get().then(function(g){
            return ld$.fetch('/dash/api/me/list/', {
              method: 'POST'
            }, {
              json: payload,
              type: 'json'
            });
          }).then(function(it){
            lc.list = it;
            return view.render();
          })['catch'](function(it){
            return console.log(it);
          });
        }
      },
      handler: {
        "group-key": function(arg$){
          var node;
          node = arg$.node;
          return node.value = this$.data ? this$.data.key : '';
        },
        bg: function(arg$){
          var node, name, url;
          node = arg$.node;
          name = node.getAttribute('data-name');
          url = type === 'org'
            ? "url(/dash/org/" + slug + "/upload/" + this$.form.values()[name] + ")"
            : type === 'brd' ? "url(/dash/org/" + this$.toc.org.slug + "/brd/" + slug + "/upload/" + this$.form.values()[name] + ")" : 'none';
          return node.style.backgroundImage = url;
        },
        org: {
          key: function(it){
            return it.key;
          },
          list: function(){
            if (lc.list && lc.list.length) {
              return lc.list;
            } else {
              return [{
                name: "無",
                key: null
              }];
            }
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            node.innerText = data.name + (!data.slug
              ? ''
              : " ( " + data.slug + " )");
            return node.setAttribute('value', data.slug || '');
          }
        },
        "delete-group": function(arg$){
          var node, disabled;
          node = arg$.node;
          disabled = !(this$.adapter && this$.adapter.doc && this$.adapter.doc.data.group && this$.adapter.doc.data.group.length > 1);
          return node.classList.toggle('disabled', disabled);
        }
      },
      action: {
        change: {
          file: function(arg$){
            var node, name, p, btn, fd;
            node = arg$.node;
            name = node.getAttribute('data-name');
            if (!(name === 'thumb' || name === 'banner')) {
              return;
            }
            if (!(p = ld$.parent(node, '.bg'))) {
              return;
            }
            if (!(btn = ld$.parent(node, '.btn'))) {
              return;
            }
            if (!node.files.length) {
              return;
            }
            ldFile.fromFile(node.files[0], 'dataurl').then(function(r){
              return p.style.backgroundImage = "url(" + r.result + ")";
            });
            btn.classList.toggle('running', true);
            fd = new FormData();
            fd.append(type, slug);
            fd.append(name + "[]", node.files[0]);
            return auth.recaptcha.get().then(function(recaptcha){
              fd.append("recaptcha", recaptcha);
              return ld$.fetch('/dash/api/upload', {
                method: 'POST',
                body: fd
              }, {
                type: 'json'
              });
            })['finally'](function(){
              return debounce(1000).then(function(){
                return btn.classList.toggle('running', false);
              });
            }).then(function(retFiles){
              node.value = "";
              form.field(name).value = retFiles[0].fn;
              form.check({
                n: name,
                now: true
              });
              return console.log("uploaded", retFiles);
            })['catch'](function(e){
              console.log(e);
              return error()(e);
            });
          }
        },
        click: {
          "delete-brd": function(arg$){
            var node;
            node = arg$.node;
            return ldcvmgr.get("brd-deletion").then(function(v){
              if (v === 'yes') {
                return console.log("delete...");
              }
            });
          },
          "delete-group": function(arg$){
            var node, grp;
            node = arg$.node;
            if (node.classList.contains('disabled')) {
              return;
            }
            if (!(grp = this$.adapter.doc.data.group[this$.adapter.path[1]])) {
              return;
            }
            return this$.opt.deleteGroup(grp.key);
          },
          "clone-group": function(arg$){
            var node, grp;
            node = arg$.node;
            if (!(grp = this$.adapter.doc.data.group[this$.adapter.path[1]])) {
              return;
            }
            return this$.opt.cloneGroup(grp.key);
          },
          submit: function(arg$){
            var node;
            node = arg$.node;
            if (node.classList.contains('disabled')) {
              return;
            }
            return auth.ensure().then(function(){
              if (type === 'prj') {
                return auth.consent({
                  type: 'tos',
                  timing: 'prj-create',
                  force: true
                });
              }
            }).then(function(){
              return auth.recaptcha.get();
            }).then(function(recaptcha){
              var fd;
              loader.on();
              fd = form.getfd();
              fd.append('recaptcha', recaptcha);
              return ld$.fetch("/dash/api/" + type + "/", {
                method: 'POST',
                body: fd
              }, {
                type: 'json'
              }).then(function(r){
                loader.off();
                ldcvmgr.toggle('redirect');
                return debounce(1000).then(function(){
                  if (type === 'prj') {
                    return window.location.href = "/dash/prj/" + r.slug + "/edit";
                  } else {
                    return window.location.href = "/dash/" + type + "/" + form.values().slug + "/admin";
                  }
                });
              })['catch'](function(){
                loader.off();
                return ldcvmgr.toggle('error');
              });
            })['catch'](error());
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    setData: function(data){
      this.data = data;
      return this.view.render('group-key');
    },
    opsIn: function(arg$){
      var data, ops, source, k, ref$, v;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      for (k in ref$ = this.form.fields) {
        v = ref$[k];
        if (!in$(k, ['slug'])) {
          if (this.form.fields[k].getAttribute('type') === 'file') {
            continue;
          }
          this.form.fields[k].value = data[k] || '';
        }
      }
      return this.view.render();
    }
  });
  return Ctrl;
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}