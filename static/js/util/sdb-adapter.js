// Generated by LiveScript 1.3.0
var slice$ = [].slice;
ldc.register('sdbAdapter', [], function(){
  var Adapter;
  Adapter = function(opt){
    opt == null && (opt = {});
    this.doc = null;
    this.sdb = null;
    this.data = null;
    this.evtHandler = JSON.parse(JSON.stringify({}));
    this.path = opt.path || [];
    return this;
  };
  Adapter.prototype = import$(Object.create(Object.prototype), {
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
    init: function(hub, type){
      var obj, o, this$ = this;
      obj = type === 'array'
        ? []
        : {};
      this.hub = hub;
      this.sdb = hub.sdb;
      this.doc = hub.doc || {
        data: obj
      };
      o = this.getData() || obj;
      this.watch({
        data: o
      });
      return this.hub.on('change', function(it){
        return this$.watch(it);
      });
    },
    getData: function(){
      var o, i$, ref$, len$, n;
      if (!(o = this.doc.data)) {
        return null;
      }
      for (i$ = 0, len$ = (ref$ = this.path).length; i$ < len$; ++i$) {
        n = ref$[i$];
        if (!(o = o[n])) {
          return null;
        }
      }
      return o;
    },
    setDoc: function(doc){
      var o, i$, ref$, len$, n;
      this.doc = doc || {
        data: {}
      };
      o = this.doc.data;
      for (i$ = 0, len$ = (ref$ = this.path || []).length; i$ < len$; ++i$) {
        n = ref$[i$];
        o = o[n] || {};
      }
      return this.watch({
        data: o
      });
    },
    set: function(arg$){
      var path, o, i$, ref$, len$, n;
      path = arg$.path;
      this.path = path;
      o = this.doc.data;
      for (i$ = 0, len$ = (ref$ = this.path).length; i$ < len$; ++i$) {
        n = ref$[i$];
        o = o[n] || {};
      }
      return this.watch({
        data: o
      });
    },
    update: function(ops){
      var cur, o, p, opsAddon, i$, ref$, len$, n, ref1$, this$ = this;
      if (!this.sdb || !this.doc.submitOp) {
        return;
      }
      if (typeof ops === 'function') {
        cur = ops(JSON.parse(JSON.stringify(this.data || {})));
        ops = this.sdb.json.diff(this.data || {}, cur);
        return this.update(ops);
      } else if (Array.isArray(ops) && ops.length) {
        ops.map(function(it){
          return it.p = this$.path.concat(it.p);
        });
        o = this.doc.data;
        p = [];
        opsAddon = [];
        for (i$ = 0, len$ = (ref$ = this.path).length; i$ < len$; ++i$) {
          n = ref$[i$];
          p.push(n);
          if (!o[n]) {
            opsAddon.push({
              p: JSON.parse(JSON.stringify(p)),
              oi: n === (ref1$ = this.path)[ref1$.length - 1] && Array.isArray(this.data)
                ? []
                : {}
            });
          }
          o = o[n] || {};
        }
        ops = opsAddon.concat(ops);
        return this.doc.submitOp(ops);
      }
    },
    watch: function(arg$){
      var ops, data, source, o, i$, ref$, len$, n;
      ops = arg$.ops, data = arg$.data, source = arg$.source;
      if (data) {
        this.data = data;
      } else {
        o = this.doc.data;
        for (i$ = 0, len$ = (ref$ = this.path).length; i$ < len$; ++i$) {
          n = ref$[i$];
          o = o[n] || {};
        }
        this.data = o;
      }
      return this.fire('change', {
        ops: ops,
        data: data,
        source: source
      });
    }
  });
  Adapter['interface'] = {
    adapted: function(){
      return !!this.adapter;
    },
    adapt: function(arg$){
      var hub, path, type, adapter, this$ = this;
      hub = arg$.hub, path = arg$.path, type = arg$.type;
      this.adapter = adapter = new Adapter({
        path: path
      });
      adapter.on('change', function(arg$){
        var ops, source;
        ops = arg$.ops, source = arg$.source;
        return this$.opsIn({
          data: adapter.data,
          ops: ops,
          source: source
        });
      });
      adapter.init(hub, type);
      return adapter;
    },
    setDoc: function(doc){
      if (this.adapter) {
        return this.adapter.setDoc(doc);
      }
    },
    setPath: function(p){
      return this.adapter.set({
        path: p
      });
    },
    opsOut: function(f){
      if (this.adapter) {
        return this.adapter.update(f);
      }
    },
    opsIn: null
  };
  return Adapter;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}