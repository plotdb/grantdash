// Generated by LiveScript 1.3.0
ldc.register('adminPage', ['error', 'sdbAdapter', 'ldcvmgr'], function(arg$){
  var sdbAdapter, error, ldcvmgr, Ctrl;
  sdbAdapter = arg$.sdbAdapter, error = arg$.error, ldcvmgr = arg$.ldcvmgr;
  Ctrl = function(opt){
    var type, root, this$ = this;
    this.type = type = ~['org', 'brd'].indexOf(opt.type) ? opt.type : null;
    if (!type) {
      throw new ldError(1015, "admin-page: type is not defined.");
    }
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.toc = opt.toc;
    this.data = {};
    this.update = debounce(function(){
      return this$._update();
    });
    this.view = new ldView({
      root: root,
      action: {
        click: {
          deploy: function(){
            var payload;
            payload = {
              slug: this$.toc[this$.type].slug,
              type: this$.type
            };
            return ld$.fetch('/dash/api/deploy', {
              method: 'POST'
            }, {
              json: payload,
              type: 'json'
            }).then(function(){
              return ldcvmgr.toggle('deploying');
            })['catch'](function(){
              return ldcvmgr.toggle("deploy-failed");
            });
          },
          opt: function(arg$){
            var node, name;
            node = arg$.node;
            name = node.getAttribute('data-name');
            this$.data.opt = name;
            this$.update().now();
            return this$.view.render();
          },
          "git-secret-gen": function(){
            var ref$;
            ((ref$ = this$.data).git || (ref$.git = {})).secret = this$.view.get('git-secret').value = suuid();
            return this$.update();
          }
        },
        input: {
          "git-url": function(arg$){
            var node, ref$;
            node = arg$.node;
            ((ref$ = this$.data).git || (ref$.git = {})).url = node.value || '';
            return this$.update();
          },
          "custom-css-url": function(arg$){
            var node, ref$;
            node = arg$.node;
            ((ref$ = this$.data).generic || (ref$.generic = {})).cssUrl = node.value || '';
            return this$.update();
          },
          "git-branch": function(arg$){
            var node, ref$;
            node = arg$.node;
            ((ref$ = this$.data).git || (ref$.git = {})).branch = node.value || '';
            return this$.update();
          },
          "git-secret": function(arg$){
            var node, ref$;
            node = arg$.node;
            ((ref$ = this$.data).git || (ref$.git = {})).secret = node.value || '';
            return this$.update();
          }
        }
      },
      handler: {
        "nav-panel": function(arg$){
          var node, name;
          node = arg$.node;
          name = node.getAttribute('data-name');
          return node.classList.toggle('d-none', !((this$.data.opt || 'default') === name));
        },
        "git-url": function(arg$){
          var node, ref$;
          node = arg$.node;
          return node.value = ((ref$ = this$.data).git || (ref$.git = {})).url || '';
        },
        "custom-css-url": function(arg$){
          var node, ref$;
          node = arg$.node;
          return node.value = ((ref$ = this$.data).generic || (ref$.generic = {})).cssUrl || '';
        },
        "git-branch": function(arg$){
          var node, ref$;
          node = arg$.node;
          return node.value = ((ref$ = this$.data).git || (ref$.git = {})).branch || '';
        },
        "git-secret": function(arg$){
          var node, ref$;
          node = arg$.node;
          return node.value = ((ref$ = this$.data).git || (ref$.git = {})).secret || '';
        },
        "opt": function(arg$){
          var node, name, hit;
          node = arg$.node;
          name = node.getAttribute('data-name');
          hit = (this$.data.opt || 'default') === name;
          node.classList.toggle('btn-outline-secondary', !hit);
          node.classList.toggle('btn-primary', hit);
          return node.innerHTML = hit ? "目前選項<i class='i-check'></i>" : "使用這個選項";
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    _update: function(){
      var this$ = this;
      return this.opsOut(function(){
        return this$.data;
      });
    },
    render: function(){
      return this.view.render();
    },
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.data = JSON.parse(JSON.stringify(data || {}));
      return this.render();
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}