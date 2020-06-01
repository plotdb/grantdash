// Generated by LiveScript 1.3.1
var slice$ = [].slice;
ldc.register('auth', ['ldsite', 'ldcvmgr', 'loader', 'util', 'error', 'recaptcha'], function(arg$){
  var ldsite, ldcvmgr, loader, util, error, recaptcha, global, ref$, lc, el, consent, initAuthpanel, get, auth, action;
  ldsite = arg$.ldsite, ldcvmgr = arg$.ldcvmgr, loader = arg$.loader, util = arg$.util, error = arg$.error, recaptcha = arg$.recaptcha;
  global = function(){
    if (lc.global) {
      return JSON.parse(JSON.stringify(lc.global));
    } else {
      return null;
    }
  };
  ref$ = [{}, {}], lc = ref$[0], el = ref$[1];
  consent = {
    dom: ld$.find(document, '[ld-scope=cookie-consent]', 0),
    val: util.cookie('legal'),
    clear: function(){
      if (this.dom) {
        ld$.remove(this.dom);
        return this.dom = null;
      }
    },
    check: function(){
      var this$ = this;
      return auth.get().then(function(arg$){
        var user;
        user = arg$.user;
        if ((user.config || (user.config = {})).legal && this$.dom) {
          return this$.clear();
        }
        if (!(this$.val = util.cookie('legal'))) {
          return;
        }
        if ((user.config || (user.config = {})).legal || !user.key) {
          return;
        }
        return ld$.fetch(auth.api + "/me/legal", {
          method: 'POST'
        }).then(function(){
          return (user.config || (user.config = {})).legal = this$.val;
        })['catch'](function(){});
      });
    },
    init: function(){
      var this$ = this;
      if (!this.val && this.dom) {
        this.dom.classList.remove('d-none');
      } else {
        return;
      }
      return ld$.find(this.dom, '[ld=ok]', 0).addEventListener('click', function(){
        util.cookie('legal', new Date().getTime(), new Date(Date.now() + 86400000 * 365 * 100).toGMTString());
        this$.clear();
        return this$.check();
      });
    }
  };
  consent.init();
  initAuthpanel = function(dom){
    var authpanel, that, acts, form, ldld, submit;
    authpanel = lc.authpanel = (that = dom)
      ? that
      : ld$.find(document, '.authpanel', 0);
    if (!lc.authpanel || lc.inited) {
      return;
    }
    lc.inited = true;
    acts = ld$.find(authpanel, '[data-action]');
    authpanel.addEventListener('click', function(e){
      var n, act;
      if (!e || !(n = e.target) || !e.target.getAttribute) {
        return;
      }
      act = e.target.getAttribute('data-action');
      return auth['switch'](act);
    });
    lc.form = form = new ldForm({
      names: function(){
        return ['email', 'passwd', 'displayname'];
      },
      afterCheck: function(s, f){
        if (s.email !== 1 && !/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(f.email.value)) {
          s.email = 2;
        }
        if (s.passwd !== 1) {
          if (auth.act === 'signup' && (f.passwd.value + "").length < 8) {
            s.passwd = 2;
          } else {
            s.passwd = !f.passwd.value ? 1 : 0;
          }
        }
        if (auth.act === 'login') {
          return s.displayname = 0;
        } else {
          return s.displayname = !f.displayname.value
            ? 1
            : !!f.displayname.value ? 0 : 2;
        }
      },
      root: authpanel
    });
    el.submit = ld$.find(authpanel, '[data-action=submit]', 0);
    ldld = new ldLoader({
      root: el.submit
    });
    form.on('readystatechange', function(it){
      return el.submit.classList.toggle('disabled', !it);
    });
    form.field('passwd').addEventListener('keyup', function(e){
      if (e.keyCode === 13) {
        return form.check({
          now: true
        }).then(function(){
          return submit();
        });
      }
    });
    el.submit.addEventListener('click', function(){
      return submit();
    });
    return submit = function(){
      if (!form.ready()) {
        return;
      }
      ldld.on();
      return recaptcha.get('signin').then(function(recaptcha){
        var val, body, ref$, ref1$;
        val = form.values();
        body = (ref$ = (ref1$ = {}, ref1$.email = val.email, ref1$.passwd = val.passwd, ref1$.displayname = val.displayname, ref1$), ref$.config = {
          newsletter: val.newsletter
        }, ref$);
        body.passwd = body.passwd.replace(/\t*$/, '');
        body.recaptcha = recaptcha;
        return ld$.fetch(auth.act === 'login'
          ? auth.api + "/u/login"
          : auth.api + "/u/signup", {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }, {
          type: 'text'
        });
      }).then(function(){
        return auth.fetch();
      }).then(function(){
        return auth.get();
      }).then(function(g){
        action.info('default');
        if (g.user) {
          lda.auth.hide('ok');
        }
        form.reset();
        ldld.off();
        return auth.fire("auth.signin");
      })['catch'](function(){
        action.info('failed');
        form.fields.passwd.value = null;
        form.check({
          n: 'passwd',
          now: true
        });
        return ldld.off();
      });
    };
  };
  get = proxise(function(){
    if (lc.global) {
      return Promise.resolve(lc.global);
    }
  });
  auth = {
    api: (ldsite ? ldsite.api : 'd').replace(/\/$/, ''),
    init: function(opt){
      var root;
      opt == null && (opt = {});
      if (!opt.root) {
        return;
      }
      root = typeof opt.root === 'string'
        ? document.querySelector(opt.root)
        : opt.root;
      return initAuthpanel(root);
    },
    evtHandler: {},
    on: function(n, cb){
      var ref$;
      return ((ref$ = this.evtHandler)[n] || (ref$[n] = [])).push(cb);
    },
    fire: function(n){
      var v, i$, ref$, len$, cb, results$ = [];
      v = slice$.call(arguments, 1);
      for (i$ = 0, len$ = (ref$ = this.evtHandler[n] || []).length; i$ < len$; ++i$) {
        cb = ref$[i$];
        results$.push(cb.apply(this, v));
      }
      return results$;
    },
    manuallyInit: function(opt){
      var root;
      opt == null && (opt = {});
      if (!opt.root) {
        return;
      }
      root = typeof opt.root === 'string'
        ? document.querySelector(opt.root)
        : opt.root;
      return initAuthpanel(root);
    },
    'switch': function(act){
      var p, this$ = this;
      if (!(act === 'signup' || act === 'login')) {
        return;
      }
      p = !lc.authpanel
        ? ldcvmgr.getdom('authpanel')
        : Promise.resolve(lc.authpanel);
      return p.then(function(authpanel){
        var n, x$;
        initAuthpanel(authpanel);
        n = authpanel.classList.contains('authpanel')
          ? authpanel
          : ld$.find(authpanel, '.authpanel', 0);
        x$ = n.classList;
        x$.remove('signup', 'login');
        x$.add(this$.act = act);
        return lc.form.check({
          now: true
        });
      });
    },
    social: function(name){
      var des, div, this$ = this;
      des = window.open('', 'social-login', 'height=640,width=560');
      div = ld$.create({
        name: 'div'
      });
      document.body.appendChild(div);
      return this.get().then(function(arg$){
        var csrfToken, login;
        csrfToken = arg$.csrfToken;
        div.innerHTML = "<form target=\"social-login\" action=\"/u/auth/" + name + "/\" method=\"post\">\n  <input type=\"hidden\" name=\"_csrf\" value=\"" + csrfToken + "\"/>\n</form>";
        window.socialLogin = login = proxise(function(){
          return ld$.find(div, 'form', 0).submit();
        });
        return login();
      }).then(function(){
        return this$.fetch();
      }).then(function(arg$){
        var user;
        user = arg$.user;
        if (!(user && user.key)) {
          return Promise.reject(new ldError(1000));
        }
      }).then(function(){
        if (!ldcvmgr.isOn('authpanel')) {
          return window.location.reload();
        }
        lda.auth.hide();
        return auth.fire("auth.signin");
      })['finally'](function(){
        return ld$.remove(div);
      })['catch'](error({
        ignore: [999, 1000]
      }));
    },
    fb: function(){
      return this.social('facebook');
    },
    google: function(){
      return this.social('google');
    },
    logout: function(){
      loader.on();
      return ld$.fetch(auth.api + "/u/logout", {
        method: 'post'
      }, {}).then(function(){
        return auth.fetch({
          renew: true
        });
      }).then(function(){
        return ldcvmgr.toggle('logout');
      }).then(function(){
        return loader.off();
      })['catch'](function(){
        return ldcvmgr.toggle('error');
      });
    },
    ensure: function(opt){
      opt == null && (opt = {});
      return this.get((opt.authed = true, opt));
    },
    get: function(opt){
      opt == null && (opt = {
        authed: false
      });
      return get().then(function(g){
        var p;
        if (opt.authed) {
          p = !(g && (g.user || (g.user = {})).key)
            ? lda.auth.show(opt.tab, opt.info)
            : Promise.resolve(g);
          return p.then(function(g){
            if (!(g && (g.user || (g.user = {})).key)) {
              return Promise.reject(new ldError(1000));
            }
            lda.auth.hide();
            return g;
          });
        } else {
          return g;
        }
      });
    },
    userinfo: function(user){
      var promise, that;
      promise = (that = user)
        ? Promise.resolve(that)
        : this.get().then(function(arg$){
          var user;
          user = arg$.user;
          return user;
        });
      return promise.then(function(user){
        var plan, ref$;
        user == null && (user = {});
        plan = user.plan || {};
        return ref$ = import$({}, user), ref$.plan = plan, ref$.authed = user.key > 0, ref$.isPro = !!/pro/.exec(plan.slug || ''), ref$.isBlocked = !!(user.config || (user.config = {})).blocked, ref$;
      });
    },
    fetch: function(opt){
      var isOn, hintFail, ret, promise, this$ = this;
      opt == null && (opt = {
        renew: true
      });
      isOn = false;
      loader.onLater(1000).then(function(){
        return isOn = true;
      });
      hintFail = debounce(10000, function(){
        loader.off();
        return ldcvmgr.get('connection-timeout').then(function(){
          loader.on();
          return debounce(10000);
        }).then(function(){
          return auth.fetch();
        });
      })();
      ret = !opt.renew && /global=/.exec(document.cookie) ? document.cookie.split(';').map(function(it){
        return /^global=(.+)/.exec(it.trim());
      }).filter(function(it){
        return it;
      })[0] : null;
      promise = ret
        ? Promise.resolve(JSON.parse(decodeURIComponent(ret[1])))
        : ld$.fetch(auth.api + "/global", {}, {
          type: 'json'
        });
      return promise.then(function(it){
        var ref$, ret, e;
        hintFail.cancel();
        loader.cancel();
        if (isOn) {
          loader.off();
        }
        ((ref$ = ld$.fetch).headers || (ref$.headers = {}))['X-CSRF-Token'] = it.csrfToken;
        lc.global = it;
        lc.global.location = typeof ipFromTaiwan != 'undefined' && ipFromTaiwan !== null ? ipFromTaiwan(it.ip) ? 'tw' : 'other' : undefined;
        ret = global();
        get.resolve(ret);
        try {
          ldc.fire('auth.change', ret);
          consent.check();
          /* ga code { */
          if (typeof gtag != 'undefined' && gtag !== null) {
            if (!gtag.userid && ret.user && ret.user.key) {
              gtag('set', {
                'user_id': gtag.userid = ret.user.key
              });
              gtag.inited = false;
            }
            if (!gtag.inited) {
              gtag('config', gtag.code, {
                anonymize_ip: true
              });
              gtag.inited = true;
            }
          }
          /* } ga code */
        } catch (e$) {
          e = e$;
          ldcvmgr.toggle("error");
          console.log(e);
        }
        return ret;
      })['catch'](function(it){
        hintFail.cancel();
        loader.cancel();
        ldcvmgr.toggle("server-down");
        console.log(it);
        new Promise(function(res, rej){});
        return loader.off();
      });
    }
  };
  auth.fetch({
    renew: false
  });
  action = {
    fb: function(){
      return auth.social('facebook');
    },
    google: function(){
      return auth.social('google');
    },
    logout: function(){
      return auth.logout();
    },
    isOn: function(){
      return ldcvmgr.isOn('authpanel');
    },
    show: function(n, info){
      n == null && (n = 'signup');
      info == null && (info = 'default');
      return Promise.resolve(ldcvmgr.isOn('authpanel')).then(function(it){
        if (!it) {
          return auth['switch'](n);
        }
      }).then(function(){
        if (info) {
          return action.info(info);
        }
      }).then(function(){
        return ldcvmgr.get('authpanel');
      }).then(function(it){
        if (it) {
          return auth.fetch();
        }
      });
    },
    hide: function(obj){
      obj == null && (obj = null);
      return ldcvmgr.set('authpanel', obj);
    },
    info: function(name){
      var infos, hash;
      name == null && (name = 'default');
      infos = ld$.find(lc.authpanel, '*[data-info]');
      hash = {};
      infos.map(function(it){
        return hash[it.getAttribute('data-info')] = it;
      });
      infos.map(function(it){
        return it.classList.add('d-none');
      });
      if (!hash[name]) {
        name = 'default';
      }
      return hash[name].classList.remove('d-none');
    }
  };
  ldc.action(action);
  return auth;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
// Generated by LiveScript 1.3.1
(function(){
  return ldc.register('error', ['ldcvmgr'], function(arg$){
    var ldcvmgr, httpCode, ldCode, ret;
    ldcvmgr = arg$.ldcvmgr;
    httpCode = {
      413: function(){
        return ldcvmgr.toggle('error-413');
      },
      404: function(){
        return ldcvmgr.toggle('error-404');
      },
      403: function(){
        return ldcvmgr.toggle('error-403');
      },
      400: function(){
        return ldcvmgr.toggle('error-400');
      }
    };
    ldCode = {
      1004: function(){
        return ldcvmgr.toggle('assets-quota-exceeded');
      },
      1005: function(){
        return ldcvmgr.toggle('csrftoken-mismatch');
      }
    };
    ret = function(opt){
      opt == null && (opt = {});
      return function(e){
        var code;
        if (e && e.json && e.json.name === 'ldError') {
          code = e.json.id || e.json.code;
        }
        code = e ? +(code || e.id || e.code) : null;
        if (code && !isNaN(code)) {
          if (in$(code, opt.ignore || [999])) {
            return;
          }
          if (opt.custom && opt.custom[code]) {
            return opt.custom[code](e);
          }
          if (ldCode[code]) {
            return ldCode[code](e);
          }
          if (httpCode[code]) {
            return httpCode[code](e);
          }
        }
        ldcvmgr.toggle('error');
        return console.log(e);
      };
    };
    ret.isOn = function(){
      return ldcvmgr.isOn('error');
    };
    return ret;
  });
})();
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
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
        var this$ = this;
        if (this.covers[n]) {
          return Promise.resolve();
        }
        if (this.workers[n]) {
          return this.prepareProxy(n);
        }
        this.loader.on(1000);
        return this.workers[n] = fetch(cover + "/" + n + ".html").then(function(v){
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
          root = div.querySelector('.ldcv');
          this$.covers[n] = new ldCover({
            root: root,
            lock: root.getAttribute('data-lock') === 'true'
          });
          ldcvmgr.prepareProxy.resolve();
          delete this$.workers[n];
          return debounce(1);
        })['finally'](function(){
          return this$.loader.cancel();
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
// Generated by LiveScript 1.3.1
(function(){
  return ldc.register('loader', [], function(){
    var ldld, ref$, th, ph;
    ldld = new ldLoader({
      className: 'ldld full',
      autoZ: true,
      atomic: false
    });
    ref$ = [null, {}], th = ref$[0], ph = ref$[1];
    return {
      on: function(){
        return ldld.on();
      },
      off: function(){
        return ldld.off();
      },
      onLater: function(ms){
        var this$ = this;
        ms == null && (ms = 500);
        return new Promise(function(res, rej){
          this$.cancel();
          ph.res = res;
          ph.rej = rej;
          return th = setTimeout(function(){
            ldld.on();
            ph.res(true);
            return ph.res = null;
          }, ms);
        });
      },
      cancel: function(){
        clearTimeout(th);
        if (ph.res) {
          ph.res(false);
        }
        return ph.res = null;
      }
    };
  });
})();
// Generated by LiveScript 1.3.1
(function(){
  return ldc.register('navtop', ['ldsite', 'auth'], function(arg$){
    var ldsite, auth, avatarUrl, lc, navCheck, navbar, view, dotst, tstTgt;
    ldsite = arg$.ldsite, auth = arg$.auth;
    avatarUrl = ldsite.avatarUrl || function(it){
      return "/s/avatar/" + it + ".png";
    };
    lc = {
      signed: false,
      pro: false,
      user: {}
    };
    navCheck = function(g){
      lc.signed = !!(g.user || (g.user = {})).key;
      lc.pro = (g.user || (g.user = {})).plan;
      lc.user = g.user || (g.user = {});
      return view.render();
    };
    navbar = document.querySelector('#nav-top nav');
    if (!navbar) {
      return;
    }
    view = new ldView({
      root: ld$.find(navbar, '[ld-scope]', 0),
      action: {
        click: {
          signup: function(){
            return lda.auth.show('signup');
          },
          login: function(){
            return lda.auth.show('login');
          },
          logout: function(){
            return lda.auth.logout();
          }
        }
      },
      handler: {
        displayname: function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = lc.user.displayname || 'You';
        },
        login: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', lc.signed);
        },
        signup: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', lc.signed);
        },
        "upgrade-now": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', lc.pro);
        },
        profile: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !lc.signed);
        },
        avatar: function(arg$){
          var node;
          node = arg$.node;
          if (lc.signed) {
            return node.style.backgroundImage = "url(" + avatarUrl(lc.user.key) + ")";
          }
        },
        plan: function(arg$){
          var node;
          node = arg$.node;
          node.innerText = lc.pro ? 'PRO' : 'FREE';
          node.classList.toggle('badge-primary', lc.pro);
          return node.classList.toggle('badge-secondary', !lc.pro);
        }
      }
    });
    ldc.on('auth.change', navCheck);
    auth.get().then(navCheck);
    dotst = (navbar.getAttribute('data-transition') || "").split(';').map(function(it){
      return it.split(' ').filter(function(it){
        return it;
      });
    });
    tstTgt = ld$.find(document, navbar.getAttribute('data-transition-target'), 0);
    if (!(dotst.length && tstTgt)) {
      return;
    }
    return new IntersectionObserver(function(it){
      var n;
      if (!(n = it[0])) {
        return;
      }
      dotst[0].map(function(c){
        return navbar.classList.toggle(c, n.isIntersecting);
      });
      return dotst[1].map(function(c){
        return navbar.classList.toggle(c, !n.isIntersecting);
      });
    }, {
      threshold: 0.1
    }).observe(tstTgt);
  });
})();
// Generated by LiveScript 1.3.1
(function(){
  return ldc.register('notify', [], function(){
    return new ldNotify({
      root: '.ldNotify',
      classIn: ['ld-fall-ttb-in']
    });
  });
})();
// Generated by LiveScript 1.3.1
(function(){
  return ldc.register("recaptcha", [], function(){
    var lc;
    lc = {
      ready: false,
      queue: []
    };
    if (!(typeof grecaptcha != 'undefined' && grecaptcha !== null)) {
      return {
        get: function(){
          return Promise.resolve('');
        }
      };
    }
    grecaptcha.ready(function(){
      lc.ready = true;
      lc.queue.map(function(it){
        return it.res();
      });
      return lc.queue = [];
    });
    return {
      get: function(action){
        var p;
        action == null && (action = 'generic');
        p = new Promise(function(res, rej){
          if (!lc.ready) {
            return lc.queue.push({
              res: res,
              rej: rej
            });
          } else {
            return res();
          }
        });
        return p.then(function(){
          return grecaptcha.execute('6LdGndkUAAAAANa4WAMz-aJiih01CvNuMBQP0bzF', {
            action: action
          });
        }).then(function(token){
          return token;
        });
      }
    };
  });
})();
// Generated by LiveScript 1.3.1
(function(){
  return ldc.register('util', [], function(){
    var local;
    local = {};
    return {
      cookie: function(k, v, expire){
        var hash;
        if (v) {
          return document.cookie = (k + "=" + v) + (expire ? ";expires=" + expire : "");
        }
        hash = {};
        (document.cookie || '').split(';').map(function(it){
          return it.split('=').map(function(it){
            return it.trim();
          });
        }).map(function(it){
          return hash[decodeURIComponent(it[0])] = decodeURIComponent(it[1]);
        });
        return hash[k];
      },
      parseQuerystring: function(key){
        var hash;
        if (!(hash = local.querystring)) {
          local.querystring = hash = {};
          (window.location.search || "").replace(/^\?/, '').split('&').map(function(it){
            return decodeURIComponent(it).split('=');
          }).map(function(it){
            return hash[it[0]] = it[1];
          });
        }
        return key ? hash[key] : hash;
      }
    };
  });
})();
