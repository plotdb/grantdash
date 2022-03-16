// Generated by LiveScript 1.3.1
(function(){
  return ldc.register('ldcvmgr', ['ldsite'], function(arg$){
    var ldsite, cover, that, error, ldcvmgr, covers, this$ = this;
    ldsite = arg$.ldsite;
    cover = ((that = ldsite && ldsite.ldcvmgrRoot) ? that : "/modules/cover").replace(/\/$/, '');
    error = function(n, e){
      n == null && (n = '');
      e == null && (e = {});
      if (n === 'error') {
        alert("something is wrong; please reload and try again");
      } else {
        ldcvmgr.toggle('error');
      }
      return console.log(e.message || e);
    };
    ldcvmgr = {
      loader: new ldLoader({
        className: "ldld full",
        autoZ: true
      }),
      covers: covers = {},
      workers: {},
      prepareProxy: proxise(function(n){}),
      prepare: function(n){
        var p, that, this$ = this;
        if (this.covers[n]) {
          return Promise.resolve();
        }
        if (this.workers[n]) {
          return this.prepareProxy(n);
        }
        this.loader.on(1000);
        p = (that = document.querySelector(".ldcvmgr[data-name=" + n + "]"))
          ? Promise.resolve(that)
          : this.workers[n] = fetch(cover + "/" + n + ".html").then(function(v){
            if (!(v && v.ok)) {
              throw new Error("modal '" + (!n ? '<no-name>' : n) + "' load failed.");
            }
            return v.text();
          }).then(function(it){
            var div, root;
            document.body.appendChild(div = document.createElement("div"));
            div.innerHTML = it;
            ld$.find(div, 'script').map(function(it){
              var script;
              script = ld$.create({
                name: 'script',
                attr: {
                  type: 'text/javascript'
                }
              });
              script.text = it.textContent;
              return it.parentNode.replaceChild(script, it);
            });
            return root = div.querySelector('.ldcv');
          });
        return p.then(function(root){
          this$.covers[n] = new ldCover({
            root: root,
            lock: root.getAttribute('data-lock') === 'true'
          });
          ldcvmgr.prepareProxy.resolve();
          delete this$.workers[n];
          return debounce(1);
        })['finally'](function(){
          return this$.loader.cancel(false);
        })['catch'](function(it){
          throw it;
        });
      },
      purge: function(n){
        var ref$, ref1$;
        if (n != null) {
          return ref1$ = (ref$ = this.covers)[n], delete ref$[n], ref1$;
        } else {
          return this.covers = {};
        }
      },
      lock: function(n, p){
        var this$ = this;
        return this.prepare(n).then(function(){
          return this$.covers[n].lock();
        }).then(function(){
          return this$.covers[n].toggle(true);
        })['catch'](function(it){
          return error(n, it);
        });
      },
      toggle: function(n, v, p){
        var this$ = this;
        return this.prepare(n).then(function(){
          return this$.covers[n].toggle(v);
        }).then(function(){
          return ldc.fire("ldcvmgr." + n + "." + (this$.covers[n].isOn() ? 'on' : 'off'), {
            node: this$.covers[n],
            param: p
          });
        })['catch'](function(it){
          return error(n, it);
        });
      },
      getcover: function(n){
        var this$ = this;
        return this.prepare(n).then(function(){
          return this$.covers[n];
        });
      },
      getdom: function(n){
        var this$ = this;
        return this.prepare(n).then(function(){
          return this$.covers[n].root;
        });
      },
      isOn: function(n){
        return this.covers[n] && this.covers[n].isOn();
      },
      set: function(n, p){
        var this$ = this;
        return this.prepare(n).then(function(){
          return this$.covers[n].set(p);
        });
      },
      get: function(n, p){
        var this$ = this;
        return this.prepare(n).then(function(){
          return ldc.fire("ldcvmgr." + n + ".on", {
            node: this$.covers[n],
            param: p
          });
        }).then(function(){
          return this$.covers[n].get();
        })['catch'](function(it){
          return error(n, it);
        });
      }
    };
    Array.from(document.querySelectorAll('.ldcvmgr')).map(function(n){
      var id;
      if (!(id = n.getAttribute('data-name')) || covers[id]) {
        return;
      }
      return covers[id] = new ldCover({
        root: n,
        lock: n.getAttribute('data-lock') === 'true'
      });
    });
    Array.from(document.querySelectorAll('[data-ldcv-toggle]')).map(function(n){
      var id;
      if (!(id = n.getAttribute('data-ldcv-toggle'))) {
        return;
      }
      return n.addEventListener('click', function(){
        return this$.toggle(id);
      });
    });
    ldc.action({
      toggle: function(n, v, p){
        return ldcvmgr.toggle(n, v, p);
      },
      purge: function(n){
        return ldcvmgr.purge(n);
      },
      get: function(n, p){
        return ldcvmgr.get(n, p);
      },
      lock: function(n, p){
        return ldcvmgr.lock(n, p);
      }
    });
    return ldcvmgr;
  });
})();
