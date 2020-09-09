// Generated by LiveScript 1.3.0
ldc.register('judgeBase', ['notify', 'error', 'loader', 'auth', 'ldcvmgr', 'sdbAdapter'], function(arg$){
  var notify, error, loader, auth, ldcvmgr, sdbAdapter, Ctrl;
  notify = arg$.notify, error = arg$.error, loader = arg$.loader, auth = arg$.auth, ldcvmgr = arg$.ldcvmgr, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var ret, ref$, brd, grp, slug, lv, round, type, root;
    this.loader = loader;
    this.brd = opt.brd;
    this.grp = opt.grp;
    this.user = opt.user;
    ret = /brd\/([^/]+)\/grp\/([^/]+)\/judge\/custom\/([^/]+)\/([^/]+)(?:\/round\/([^/]+))?$/.exec(window.location.href);
    console.log(ret);
    if (ret) {
      ref$ = ret.slice(1), brd = ref$[0], grp = ref$[1], slug = ref$[2], lv = ref$[3], round = ref$[4];
      type = 'custom';
    } else {
      ret = /brd\/([^/]+)\/grp\/([^/]+)\/judge\/([^/]+)\/([^/]+)(?:\/round\/([^/]+))?$/.exec(window.location.href);
      if (!ret) {
        throw new ldError(1015);
      }
      ref$ = ret.slice(1), brd = ref$[0], grp = ref$[1], type = ref$[2], lv = ref$[3], round = ref$[4];
    }
    if (!((type === 'custom' || type === 'criteria' || type === 'primary' || type === 'final') && (lv === 'user' || lv === 'all'))) {
      throw new ldError(1015);
    }
    this.brd = brd;
    this.grp = grp;
    this.type = type;
    this.lv = lv;
    this.round = round;
    this.slug = slug;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.prjs = [];
    this.prjkeymap = {};
    this.data = {};
    this.view = {};
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    init: function(){},
    render: function(){},
    initView: function(){
      var this$ = this;
      return this.view.base = new ldView({
        initRender: false,
        root: this.root,
        text: {
          reviewer: function(arg$){
            var node;
            node = arg$.node;
            if (this$.user) {
              return this$.user.displayname;
            }
          },
          "grp-name": function(arg$){
            var node;
            node = arg$.node;
            return this$.brdinfo.name + " / " + this$.grpinfo.info.name;
          }
        }
      });
    },
    update: function(opt){
      var this$ = this;
      opt == null && (opt = {});
      if (!this._update) {
        this._update = debounce(function(opt){
          if (opt.ops) {
            return this$.opsOut(opt.ops);
          } else {
            return this$.opsOut(function(){
              return this$.data;
            });
          }
        });
      }
      if (!opt.debounced) {
        return this._update(opt).now();
      } else {
        return this._update.delay(opt.debounced)(opt);
      }
    },
    fetchPrjs: function(){
      var this$ = this;
      console.log("fetch prjs ... ");
      return ld$.fetch("/dash/api/brd/" + this.brd + "/grp/" + this.grp + "/judge-list", {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(it){
        var j, ref$, key$, ref1$, filterName;
        this$.prjs = it;
        j = ((ref$ = (ref1$ = this$.grpinfo).judge || (ref1$.judge = {}))[key$ = this$.type] || (ref$[key$] = {})) || {};
        filterName = [];
        if (j["filter-criteria"]) {
          filterName.push('criteria');
        }
        if (j["filter-primary"]) {
          filterName.push('shortlist');
        }
        if (filterName.length) {
          this$.prjs = (this$.prjs || []).filter(function(p){
            return filterName.reduce(function(a, b){
              var ref$;
              return a && ((ref$ = p.system || (p.system = {})).badge || (ref$.badge = {}))[b];
            }, true);
          });
        }
        this$.prjs.map(function(it){
          this$.prjkeymap[it.key] = it;
          if (it.name.length > 25) {
            return it.name = it.name.substring(0, 25) + "...";
          }
        });
        return this$.prjs.sort(function(a, b){
          return a.key - b.key;
        });
      });
    },
    fetchInfo: function(){
      var this$ = this;
      console.log("fetch info ... ");
      return ld$.fetch("/dash/api/brd/" + this.brd + "/grp/" + this.grp + "/info", {
        method: 'POST'
      }, {
        json: {
          fields: ['criteria', 'grade', 'judge', 'form', 'judgePerm']
        },
        type: 'json'
      }).then(function(ret){
        this$.brdinfo = ret.brd;
        this$.grpinfo = ret.grp;
        if (!ret.grp.criteria) {
          return ldcvmgr.get('judge-criteria-missing');
        } else {
          return this$.criteria = ret.grp.criteria.entries;
        }
      });
    },
    sharedb: function(){
      var sdb, this$ = this;
      console.log("prepare sharedb ...");
      this.sdb = sdb = new sharedbWrapper({
        url: {
          scheme: window.location.protocol.replace(':', ''),
          domain: window.location.host
        },
        path: '/dash/ws'
      });
      this.hub = new Hub({
        sdb: sdb
      });
      sdb.on('error', function(){
        return ldcvmgr.toggle('not-sync');
      });
      sdb.on('close', function(){
        ldcvmgr.toggle('offline-retry', true);
        return sdb.reconnect().then(function(){
          return this$.reconnect();
        }).then(function(){
          return console.log("reinitialized.");
        }).then(function(){
          return ldcvmgr.toggle('offline-retry', false);
        });
      });
      return sdb.ready();
    },
    getdoc: function(){
      var id, this$ = this;
      console.log("get judge document ... ");
      this.hub.doc = null;
      id = "brd/" + this.brd + "/grp/" + this.grp + "/judge/" + this.type + "/";
      if (this.slug) {
        id = id + "/slug/" + this.slug;
      }
      if (this.round) {
        id = id + "/round/" + this.round;
      }
      return this.sdb.get({
        id: id,
        watch: function(ops, source){
          return this$.hub.fire('change', {
            ops: ops,
            source: source
          });
        },
        create: function(){
          return {};
        }
      }).then(function(doc){
        this$.hub.doc = doc;
        return this$.adapt({
          hub: this$.hub,
          path: this$.user
            ? ['user', this$.user.key]
            : []
        });
      });
    },
    opsIn: function(){},
    auth: function(){
      var this$ = this;
      console.log("get user auth info ...");
      return auth.get().then(function(g){
        return this$.global = g;
      });
    },
    getDisplayname: function(list){
      var payload, this$ = this;
      if (this.usermap && !list.filter(function(it){
        return !this$.usermap[it];
      }).length) {
        return Promise.resolve();
      }
      payload = {
        userkeys: list
      };
      return ld$.fetch("/dash/api/usermap/", {
        method: 'PUT'
      }, {
        json: payload,
        type: 'json'
      }).then(function(ret){
        ret == null && (ret = []);
        this$.usermap = {};
        return ret.map(function(it){
          return this$.usermap[it.key] = it;
        });
      })['catch'](error());
    },
    sort: function(name, value, hint){
      var n, dir, namemap, verbose, this$ = this;
      hint == null && (hint = true);
      if (hint) {
        loader.on();
      }
      if (name === 'criteria') {
        n = name + "-" + value.key;
      } else {
        n = name + "" + (value != null ? '-' + value : '');
      }
      if (!this.sort.inversed) {
        this.sort.inversed = {};
      }
      dir = this.sort.inversed[n]
        ? 1
        : -1;
      namemap = {
        name: "名稱",
        state: "狀態",
        comment: "評論長度",
        comments: "評論長度",
        shortlist: "入選標記",
        budget: "預算",
        total: "總分",
        rank: "排名",
        "criteria-result": "審查結果",
        "judge-rank": "評審排名",
        "judge-score": "評審分數",
        rate: "比例"
      };
      verbose = {
        name: namemap[name] || value,
        dir: dir > 0 ? "順向" : "逆向"
      };
      if (name === 'count') {
        verbose.name = {
          "accept": "通過",
          "pending": "待審",
          "reject": "不符"
        }[value] + "的數量";
      } else if (name === 'primary' || name === 'primary-all') {
        value = +value;
        verbose.name = {
          0: "推薦",
          1: "待審",
          2: "汰除"
        }[+value] + " 的結果";
      } else if (name === 'criteria') {
        verbose.name = value.name;
      } else if (name === 'grade') {
        verbose.name = value.name;
      }
      if (hint) {
        notify.send('success', "重新將表格依 " + verbose.name + " 做 " + verbose.dir + " 排序");
      }
      return debounce(100).then(function(){
        var statemap, v;
        this$.sort.inversed[n] = !this$.sort.inversed[n];
        statemap = [2, 0, 1];
        if (name === 'state') {
          this$.prjs.sort(function(a, b){
            return dir * (statemap[a.state] - statemap[b.state]);
          });
        } else if (name === 'name') {
          this$.prjs.sort(function(a, b){
            return dir * (a.name > b.name
              ? 1
              : a.name < b.name ? -1 : 0);
          });
        } else if (name === 'budget') {
          this$.prjs.sort(function(a, b){
            return dir * (a.info.budget - b.info.budget);
          });
        } else if (name === 'comments') {
          this$.prjs.sort(function(a, b){
            return dir * JSON.stringify(a.comments || {}).length - JSON.stringify(b.comments || {}).length;
          });
        } else if (name === 'comment') {
          this$.prjs.sort(function(a, b){
            var ref$, key$;
            return dir * ((((ref$ = this$.data.prj)[key$ = a.key] || (ref$[key$] = {})).comment || '').length - (((ref$ = this$.data.prj)[key$ = b.key] || (ref$[key$] = {})).comment || '').length);
          });
        } else if (name === 'criteria-result') {
          this$.prjs.sort(function(a, b){
            return dir * ((b.criteria[0] - b.criteria[2]) - (a.criteria[0] - a.criteria[2]));
          });
        } else if (name === 'criteria') {
          this$.prjs.sort(function(a, b){
            var ref$, ref1$, key$;
            a = ((ref$ = (ref1$ = this$.data.prj)[key$ = a.key] || (ref1$[key$] = {})).value || (ref$.value = {}))[value.key];
            b = ((ref$ = (ref1$ = this$.data.prj)[key$ = b.key] || (ref1$[key$] = {})).value || (ref$.value = {}))[value.key];
            a = a != null ? a : 1;
            b = b != null ? b : 1;
            return dir * (statemap[a] - statemap[b]);
          });
        } else if (name === 'grade') {
          this$.prjs.sort(function(a, b){
            var ref$, ref1$, key$;
            a = ((ref$ = (ref1$ = this$.data.prj)[key$ = a.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[value.key];
            b = ((ref$ = (ref1$ = this$.data.prj)[key$ = b.key] || (ref1$[key$] = {})).v || (ref$.v = {}))[value.key];
            a = a != null ? a : 0;
            b = b != null ? b : 0;
            return dir * (b - a);
          });
        } else if (name === 'rate') {
          this$.prjs.sort(function(a, b){
            return dir * (b.rate - a.rate);
          });
        } else if (name === 'primary-all') {
          v = {
            "0": "accept",
            "1": "pending",
            "2": "reject"
          }[value];
          this$.prjs.sort(function(a, b){
            return dir * (a.count[v] || 0) - (b.count[v] || 0);
          });
        } else if (name === 'primary') {
          this$.prjs.sort(function(a, b){
            var ref$, key$;
            a = ((ref$ = this$.data.prj)[key$ = a.key] || (ref$[key$] = {})).v === value ? 1 : 0;
            b = ((ref$ = this$.data.prj)[key$ = b.key] || (ref$[key$] = {})).v === value ? 1 : 0;
            return dir * (a - b);
          });
        } else if (name === 'count') {
          this$.prjs.sort(function(a, b){
            var ref$;
            return dir * (((ref$ = a.count)[value] || (ref$[value] = [])).length - ((ref$ = b.count)[value] || (ref$[value] = [])).length);
          });
        } else if (name === 'shortlist') {
          this$.prjs.sort(function(a, b){
            var ref$, key$;
            a = ((ref$ = this$.data.prj)[key$ = a.key] || (ref$[key$] = {})).picked ? 1 : 0;
            b = ((ref$ = this$.data.prj)[key$ = b.key] || (ref$[key$] = {})).picked ? 1 : 0;
            return dir * (a - b);
          });
        } else if (name === 'total') {
          this$.prjs.sort(function(a, b){
            return dir * (a.total - b.total);
          });
        } else if (name === 'rank') {
          this$.prjs.sort(function(a, b){
            return dir * (a.rank - b.rank);
          });
        } else if (name === 'judge-score') {
          this$.prjs.sort(function(a, b){
            return dir * (((value.score || (value.score = {}))[b.key] || 0) - ((value.score || (value.score = {}))[a.key] || 0));
          });
        } else if (name === 'judge-rank') {
          this$.prjs.sort(function(a, b){
            return dir * (((value.rank || (value.rank = {}))[b.key] || 0) - ((value.rank || (value.rank = {}))[a.key] || 0));
          });
        }
        if (hint) {
          loader.off();
        }
        return this$.render();
      });
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}