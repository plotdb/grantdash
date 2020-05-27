// Generated by LiveScript 1.3.0
ldc.register(['prjForm', 'loader', 'ldcvmgr'], function(arg$){
  var prjForm, loader, ldcvmgr, Ctrl, ctrl;
  prjForm = arg$.prjForm, loader = arg$.loader, ldcvmgr = arg$.ldcvmgr;
  Ctrl = function(opt){
    this.ldcv = new ldCover({
      root: '[ld-scope=prj-diff]'
    });
    this.view = new ldView({
      global: true,
      initRender: false,
      root: '[ld-scope=prj-form]',
      handler: {
        "init-loader": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', true);
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    fetch: function(){
      var this$ = this;
      console.log("fetching board form ...");
      return ld$.fetch('/d/b/4/form', {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(it){
        return this$.brd = it;
      });
    },
    sharedb: function(){
      var sdb;
      console.log("initializing sharedb connection ...");
      this.sdb = sdb = new sharedbWrapper({
        url: {
          scheme: window.location.protocol.replace(':', ''),
          domain: window.location.host
        }
      });
      sdb.on('close', function(){
        loader.on();
        return sdb.reconnect().then(function(){}).then(function(){
          return loader.off();
        });
      });
      return this.hubs = {
        prj: new Hub({
          sdb: sdb
        })
      };
    },
    getdoc: function(){
      var this$ = this;
      console.log("get project document ...");
      return this.sdb.get({
        id: "prj-sample",
        watch: function(ops, source){
          return this$.hubs.prj.fire('change', {
            ops: ops,
            source: source
          });
        }
      }).then(function(doc){
        return this$.hubs.prj.doc = doc;
      });
    },
    initForm: function(){
      var grp, k, v;
      grp = (function(){
        var ref$, results$ = [];
        for (k in ref$ = this.brd.detail.group) {
          v = ref$[k];
          results$.push(v);
        }
        return results$;
      }.call(this))[0] || {};
      this.ctrlForm = new prjForm({
        root: '[ld-scope=prj-form]',
        viewMode: true,
        form: (grp.form || (grp.form = {})).list || [],
        grp: grp,
        brd: this.brd
      });
      this.ctrlForm.adapt({
        hub: this.hubs.prj,
        path: ['content']
      });
      return this.ctrlForm.on('submit', function(it){
        return console.log(it);
      });
    },
    render: function(){
      return this.view.render();
    }
  });
  ctrl = new Ctrl();
  return ctrl.fetch().then(function(){
    return ctrl.sharedb();
  }).then(function(){
    return ctrl.getdoc();
  }).then(function(){
    return ctrl.initForm();
  }).then(function(){
    return ctrl.render();
  }).then(function(){
    return loader.off();
  });
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}