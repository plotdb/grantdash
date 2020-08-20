// Generated by LiveScript 1.3.0
ldc.register('adminJudgePrimary', ['ldcvmgr', 'auth', 'sdbAdapter', 'error', 'adminPanel'], function(arg$){
  var ldcvmgr, auth, sdbAdapter, error, adminPanel, Ctrl;
  ldcvmgr = arg$.ldcvmgr, auth = arg$.auth, sdbAdapter = arg$.sdbAdapter, error = arg$.error, adminPanel = arg$.adminPanel;
  Ctrl = function(opt){
    var root, this$ = this;
    opt == null && (opt = {});
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.path = opt.path;
    this.brd = opt.brd;
    this.grp = null;
    this.view = {};
    this.data = {};
    this.obj = {};
    adminPanel.on('active', function(arg$){
      var nav, name, panel;
      nav = arg$.nav, name = arg$.name, panel = arg$.panel;
      if (!(nav === 'grp-judge' && name === 'primary')) {
        return;
      }
      return this$.prepare().then(function(){
        return this$.view.render();
      })['catch'](error());
    });
    this.view = new ldView({
      root: this.root,
      action: {
        change: {
          choice: function(arg$){
            var node, n;
            node = arg$.node;
            n = node.getAttribute('data-name');
            this$.obj[n] = node.value;
            return this$.update();
          }
        },
        click: {
          'switch': function(arg$){
            var node, n;
            node = arg$.node;
            n = node.getAttribute('data-name');
            node.classList.toggle('on');
            this$.obj[n] = node.classList.contains('on');
            return this$.update();
          }
        }
      },
      handler: {
        choice: function(arg$){
          var node, n;
          node = arg$.node;
          n = node.getAttribute('data-name');
          return node.value = this$.obj[n] || '';
        },
        'switch': function(arg$){
          var node, n;
          node = arg$.node;
          n = node.getAttribute('data-name');
          return node.classList.toggle('on', !!this$.obj[n]);
        },
        "primary-user-link": function(arg$){
          var node;
          node = arg$.node;
          if (!this$.grp) {
            return;
          }
          return node.setAttribute('href', "/dash/brd/" + this$.brd.slug + "/grp/" + this$.grp.key + "/judge/primary/user");
        },
        "primary-all-link": function(arg$){
          var node;
          node = arg$.node;
          if (!this$.grp) {
            return;
          }
          return node.setAttribute('href', "/dash/brd/" + this$.brd.slug + "/grp/" + this$.grp.key + "/judge/primary/all");
        }
        /*"primary-judge": do
          list: ~> @data.[]users
          init: ({node, local, data}) ~>
            node.classList.toggle \d-none, false
            local.view = new ldView do
              root: node,
              context: data
              handler: do
                name: ({node, context}) ~>
                  node.innerText = context.name
                  #node.setAttribute \href, "/dash/brd/#{@brd.slug}/grp/#{@grp.key}/judge/primary/user/#{context.key}"
                "progress-bar": ({node, context}) ->
                  v = +node.getAttribute \data-name
                  node.style.width = "#{100 * context.count[v] / context.count.total}%"
          handler: ({local, data}) ->
            local.view.setContext data
            local.view.render!
        */
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.obj = JSON.parse(JSON.stringify(data || {}));
      return this.view.update();
    },
    update: function(){
      var this$ = this;
      return this.opsOut(function(){
        return this$.obj;
      });
    },
    prepare: function(){
      var this$ = this;
      return ld$.fetch("/dash/api/brd/" + this.brd.slug + "/grp/" + this.grp.key + "/judge/primary/all", {
        method: 'GET'
      }, {
        type: 'json'
      }).then(function(it){
        var data;
        this$.data = data = it;
        data.prjs || (data.prjs = []);
        console.log(data.users || (data.users = []));
        return (data.users || (data.users = [])).map(function(u){
          var count, obj, ref$;
          count = {
            0: 0,
            1: 0,
            2: 0,
            total: data.prjs.length || 1
          };
          obj = (ref$ = data.data.user[u.key] || {}).prj || (ref$.prj = {});
          data.prjs.map(function(p){
            var v;
            if ((v = (obj[p.key] || {}).v) != null) {
              return count[v]++;
            }
          });
          return u.count = count;
        });
      })['catch'](error());
    },
    setData: function(grp){
      var this$ = this;
      this.grp = grp;
      return this.prepare().then(function(){
        return this$.view.render();
      })['catch'](error());
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}