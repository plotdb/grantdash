// Generated by LiveScript 1.3.1
var slice$ = [].slice;
(function(){
  var diff, sharedbWrapper;
  diff = function(o, n, dostr){
    dostr == null && (dostr = true);
    return json0OtDiff(o, n, dostr ? diffMatchPatch : null);
  };
  sharedbWrapper = function(opt){
    opt == null && (opt = {});
    this.url = opt.url;
    this.path = opt.path || '/ws';
    this.path = this.path[0] === '/'
      ? this.path
      : "/" + this.path;
    this.evtHandler = {};
    this.reconnectInfo = {
      retry: 0,
      pending: []
    };
    this.reconnect();
    return this;
  };
  sharedbWrapper.prototype = import$(Object.create(Object.prototype), {
    json: {
      diff: function(o, n, dostr){
        dostr == null && (dostr = true);
        return diff(o, n, dostr);
      }
    },
    getSnapshot: function(arg$){
      var id, version, this$ = this;
      id = arg$.id, version = arg$.version;
      return new Promise(function(res, rej){
        return this$.connection.fetchSnapshot('doc', id, version != null ? version : null, function(e, s){
          if (e) {
            return rej(e);
          } else {
            return res(s);
          }
        });
      });
    },
    ready: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        if (this$.connected) {
          return res();
        }
        if (!this$.reconnectInfo.handler) {
          return this$.reconnect();
        }
        return this$.reconnectInfo.pending.push({
          res: res,
          rej: rej
        });
      });
    },
    get: function(arg$){
      var id, watch, create, this$ = this;
      id = arg$.id, watch = arg$.watch, create = arg$.create;
      return new Promise(function(res, rej){
        var doc;
        doc = this$.connection.get('doc', id);
        return doc.fetch(function(e){
          if (e) {
            return rej(e);
          }
          doc.subscribe(function(ops, source){
            return res(doc);
          });
          doc.on('error', function(err){
            return this$.fire('error', {
              doc: doc,
              err: err
            });
          });
          if (watch != null) {
            doc.on('op', function(ops, source){
              return watch(ops, source);
            });
          }
          if (!doc.type) {
            return doc.create((create ? create() : null) || {});
          }
        });
      });
    },
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
    disconnect: function(){
      if (!this.socket) {
        return;
      }
      this.socket.close();
      this.socket = null;
      this.connected = false;
      return this.socket = null;
    },
    reconnect: function(){
      var this$ = this;
      return new Promise(function(res, rej){
        var delay;
        if (this$.socket) {
          return res();
        }
        delay = this$.reconnectInfo.retry++;
        delay = Math.round(Math.pow(delay, 1.4) * 500);
        clearTimeout(this$.reconnectInfo.handler);
        console.log("try reconnecting (" + this$.reconnectInfo.retry + ") after " + delay + "ms ...");
        return this$.reconnectInfo.handler = setTimeout(function(){
          this$.reconnectInfo.handler = null;
          this$.socket = new WebSocket((this$.url.scheme === 'http' ? 'ws' : 'wss') + "://" + this$.url.domain + this$.path);
          this$.connection = new sharedb.Connection(this$.socket);
          this$.socket.addEventListener('close', function(){
            this$.socket = null;
            this$.connected = false;
            return this$.fire('close');
          });
          return this$.socket.addEventListener('open', function(){
            var ref$;
            this$.reconnectInfo.retry = 0;
            ((ref$ = this$.reconnectInfo).pending || (ref$.pending = [])).splice(0).map(function(it){
              return it.res();
            });
            this$.connected = true;
            return res();
          });
        }, delay);
      });
    }
  });
  if (typeof module != 'undefined' && module !== null) {
    module.exports = sharedbWrapper;
  }
  if (typeof window != 'undefined' && window !== null) {
    return window.sharedbWrapper = sharedbWrapper;
  }
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
