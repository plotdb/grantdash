// Generated by LiveScript 1.3.0
ldc.register(['prjForm', 'loader', 'ldcvmgr', 'error'], function(arg$){
  var prjForm, loader, ldcvmgr, error, Ctrl, ref$, path, slug, ctrl;
  prjForm = arg$.prjForm, loader = arg$.loader, ldcvmgr = arg$.ldcvmgr, error = arg$.error;
  Ctrl = function(opt){
    this.ldcv = new ldCover({
      root: '[ld-scope=prj-diff]'
    });
    this.view = new ldView({
      global: true,
      initRender: false,
      root: '[ld-scope=prj-form-use]',
      handler: {
        "init-loader": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', true);
        }
      }
    });
    this.slug = opt.prj;
    this.prj = {};
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    fetch: function(){
      var this$ = this;
      console.log("fetching project information ...");
      console.log("fetching board form ...");
      return ld$.fetch("/d/p/" + this.slug, {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(it){
        this$.prj = it;
        return ld$.fetch("/d/b/" + this$.prj.brdslug + "/form", {
          method: 'GET'
        }, {
          type: 'json'
        });
      }).then(function(it){
        this$.brd = it;
        return this$.grp = this$.brd.detail.group[0] || {};
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
        id: "prj-" + this.slug,
        watch: function(ops, source){
          return this$.hubs.prj.fire('change', {
            ops: ops,
            source: source
          });
        },
        create: function(){
          var ret, form, ref$, key$;
          ret = {};
          form = (ref$ = this$.grp).form || (ref$.form = {});
          (ret[key$ = (form.purpose || (form.purpose = {})).title || 'title'] || (ret[key$] = {})).content = this$.prj.name;
          (ret[key$ = form.purpose.description || 'description'] || (ret[key$] = {})).content = this$.prj.description;
          return ret;
        }
      }).then(function(doc){
        return this$.hubs.prj.doc = doc;
      });
    },
    initForm: function(){
      var ref$;
      this.ctrlForm = new prjForm({
        root: '[ld-scope=prj-form-use]',
        viewMode: true,
        form: (ref$ = this.grp).form || (ref$.form = {}),
        grp: this.grp,
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
  ref$ = /^\/p\/([^/]+)\/edit/.exec(window.location.pathname) || [], path = ref$[0], slug = ref$[1];
  ctrl = new Ctrl({
    prj: slug
  });
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
  })['catch'](error());
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}