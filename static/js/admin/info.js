// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('adminInfo', ['loader', 'notify', 'ldcvmgr', 'auth', 'sdbAdapter'], function(arg$){
    var loader, notify, ldcvmgr, auth, sdbAdapter, Ctrl;
    loader = arg$.loader, notify = arg$.notify, ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter;
    Ctrl = function(opt){
      var type, root, slugs, slugCheck, form, view, this$ = this;
      this.opt = opt;
      this.type = type = opt.type === 'org' ? 'o' : 'b';
      this.root = root = typeof opt.root === 'string'
        ? document.querySelector(opt.root)
        : opt.root;
      slugs = {};
      slugCheck = debounce(500, function(n, v, e){
        var p;
        p = ld$.parent(form.fields[n], '.form-group');
        p.classList.add('running');
        return ld$.fetch("/d/slug-check/" + type, {
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
      this.form = form = new ldForm({
        root: root,
        submit: '[ld=submit]',
        afterCheck: function(s, f){
          var p;
          if (f.thumbnail.value) {
            if (!(p = ld$.parent(f.thumbnail, '.bg'))) {
              return;
            }
            ldFile.fromFile(f.thumbnail.files[0], 'dataurl').then(function(r){
              return p.style.backgroundImage = "url(" + r.result + ")";
            });
          }
          return s.all = ['name', 'slug', 'description'].reduce(function(a, b){
            return a && s[b] === 0;
          }, true) ? 0 : 2;
        },
        verify: function(n, v, e){
          this$.opsOut(function(d){
            d[n] = v;
            return d;
          });
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
          return !!v ? 0 : 2;
        }
      });
      view = new ldView({
        root: root,
        init: {
          "tail-datetime": function(arg$){
            var node;
            node = arg$.node;
            return tail.DateTime(node);
          }
        },
        action: {
          click: {
            submit: function(arg$){
              var node;
              node = arg$.node;
              return auth.ensure().then(function(){
                var fd;
                loader.on();
                fd = form.getfd();
                return ld$.fetch("/d/" + type + "/", {
                  method: 'POST',
                  body: fd
                }, {
                  type: 'json'
                }).then(function(r){
                  notify.send('success', '建立完成，將您導向主控台 ...');
                  return debounce(1000).then(function(){
                    return window.location.href = "/" + type + "/" + form.values().slug + "/admin";
                  });
                })['catch'](function(){
                  loader.off();
                  return ldcvmgr.toggle('error');
                });
              })['catch'](function(){});
            }
          }
        }
      });
      return this;
    };
    Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
      opsIn: function(arg$){
        var data, k, v, results$ = [];
        data = arg$.data;
        for (k in data) {
          v = data[k];
          results$.push(this.form.fields[k].value = v);
        }
        return results$;
      }
    });
    return Ctrl;
  });
})();
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