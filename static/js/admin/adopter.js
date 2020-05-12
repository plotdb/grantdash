// Generated by LiveScript 1.3.0
var slice$ = [].slice;
(function(){
  var Adopter;
  window.Adopter = Adopter = function(opt){
    opt == null && (opt = {});
    this.doc = null;
    this.sdb = null;
    this.data = null;
    this.evtHandler = JSON.parse(JSON.stringify({}));
    this.path = opt.path || [];
    return this;
  };
  return Adopter.prototype = import$(Object.create(Object.prototype), {
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
    install: function(it){
      var o, i$, ref$, len$, n;
      this.sdb = it.sdb;
      this.doc = it.doc;
      o = this.doc.data;
      for (i$ = 0, len$ = (ref$ = this.path).length; i$ < len$; ++i$) {
        n = ref$[i$];
        o = o[n];
      }
      return this.watch({
        data: o
      });
    },
    update: function(ops){
      var cur, this$ = this;
      if (typeof ops === 'function') {
        cur = ops(JSON.parse(JSON.stringify(this.data || {})));
        ops = !this.data
          ? [{
            p: [],
            oi: {}
          }]
          : [];
        ops = ops.concat(this.sdb.json.diff(this.data || {}, cur));
        return this.update(ops);
      } else if (Array.isArray(ops) && ops.length) {
        ops.map(function(it){
          return it.p = this$.path.concat(it.p);
        });
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
          o = o[n];
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
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}