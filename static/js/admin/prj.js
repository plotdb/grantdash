// Generated by LiveScript 1.3.0
ldc.register('adminPrjDetail', ['sdbAdapter', 'prjViewSimple'], function(arg$){
  var sdbAdapter, prjViewSimple, Ctrl;
  sdbAdapter = arg$.sdbAdapter, prjViewSimple = arg$.prjViewSimple;
  Ctrl = function(opt){
    var root, this$ = this;
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.prj = {};
    this.view = new ldView({
      root: root,
      handler: {
        name: function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = this$.prj.name || '';
        },
        ownername: function(arg$){
          var node;
          node = arg$.node;
          return node.innerText = this$.prj.ownername || '';
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    setPrj: function(it){
      this.prj = it;
      this.view.render();
      return console.log(this.prj);
    },
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}