// Generated by LiveScript 1.3.0
(function(){
  ldc.register('adminGuard', ['auth', 'loader'], function(arg$){
    var auth, loader, init;
    auth = arg$.auth, loader = arg$.loader;
    loader.on();
    auth.ensure().then(function(){
      var ref$, path, type, slug, hint;
      ref$ = /^\/([ob])\/([^/]+)\/admin/.exec(window.location.pathname) || [], path = ref$[0], type = ref$[1], slug = ref$[2];
      hint = import$({}, type
        ? type === 'o'
          ? {
            org: slug
          }
          : {
            brd: slug
          }
        : {});
      return ld$.fetch('/d/toc/', {
        method: 'POST'
      }, {
        json: hint,
        type: 'json'
      })['catch'](function(){
        return lda.ldcvmgr.lock('create-brd-now');
      }).then(function(toc){
        return init(toc);
      })['catch'](function(e){
        console.log(e);
        return lda.ldcvmgr.toggle('error');
      });
    })['catch'](function(){
      return lda.ldcvmgr.toggle('auth-required');
    });
    return init = function(toc){
      var search, root, view;
      toc.org = toc.org || {};
      toc.brd = toc.brd || {};
      toc.brds = toc.brds || [];
      toc.brdsFiltered = toc.brds || [];
      search = debounce(function(val){
        toc.brdsFiltered = toc.brds.filter(function(it){
          return ~it.name.indexOf(val);
        });
        view.render();
        return view.get("brd-list").folder.fit();
      });
      console.log(toc);
      root = ld$.find('[ld-scope=admin-menu]', 0);
      view = new ldView({
        root: root,
        action: {
          click: {
            brd: function(arg$){
              var node, ret;
              node = arg$.node;
              ret = view.get("brd-list").folder.toggle();
              return node.classList.toggle('on', ret);
            }
          },
          input: {
            "brd-search": function(arg$){
              var node;
              node = arg$.node;
              return search(node.value);
            }
          }
        },
        text: {
          "org-name": function(){
            return toc.org.name;
          },
          "brd-name": function(){
            return toc.brd.name;
          },
          "brd-progress-text": function(){
            return "活動進行中";
          }
        },
        init: {
          "folder": function(arg$){
            var node;
            node = arg$.node;
            return node.folder = new ldui.Folder({
              root: node
            });
          }
        },
        handler: {
          "org-menu": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !toc.org.key);
          },
          "brd-progress": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('text-success', true);
          },
          "brd": function(arg$){
            var node, ref$, ref1$;
            node = arg$.node;
            return node.classList.toggle('d-none', !(ref$ = !toc.brd.key) !== !(ref1$ = ~node.getAttribute('ld').indexOf('empty')) && (ref$ || ref1$));
          },
          "brds": function(arg$){
            var node, ref$, ref1$;
            node = arg$.node;
            return node.classList.toggle('d-none', !(ref$ = !toc.brds.length) !== !(ref1$ = ~node.getAttribute('ld').indexOf('empty')) && (ref$ || ref1$));
          },
          "brd-entry": {
            list: function(){
              return toc.brdsFiltered;
            },
            action: {
              click: function(arg$){
                var node, data;
                node = arg$.node, data = arg$.data;
                toc.brd = data;
                return view.render();
              }
            },
            handler: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              ld$.find(node, 'span', 0).innerText = data.name;
              return ld$.find(node, '.text-sm', 0).innerText = data.description;
            }
          }
        }
      });
      return loader.off();
    };
  });
  return ldc.app('adminGuard');
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}