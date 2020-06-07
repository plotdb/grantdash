// Generated by LiveScript 1.3.0
var slice$ = [].slice;
ldc.register('discussEdit', ['auth', 'error'], function(arg$){
  /*
   params
     root: editor html root element
  */
  var auth, error, Ctrl;
  auth = arg$.auth, error = arg$.error;
  Ctrl = function(opt){
    var root, view, this$ = this;
    this.opt = opt;
    this.markedOptions = opt.marked || {};
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.data = import$({
      content: {},
      url: window.location.pathname,
      reply: null
    }, opt.data);
    this.preview = false;
    this.useMarkdown = false;
    this.ready = false;
    this.ldld = null;
    this.evtHandler = {};
    this.view = view = new ldView({
      initRender: false,
      root: root,
      action: {
        input: {
          "use-markdown": function(arg$){
            var node, ref$;
            node = arg$.node;
            ((ref$ = this$.data.content).config || (ref$.config = {})).useMarkdown = this$.useMarkdown = node.checked;
            return view.render();
          },
          "toggle-preview": function(arg$){
            var node;
            node = arg$.node;
            this$.preview = !!node.checked;
            return view.render();
          },
          input: function(arg$){
            var node;
            node = arg$.node;
            this$.data.content.body = node.value;
            return view.render('post');
          },
          title: function(arg$){
            var node;
            node = arg$.node;
            this$.data.title = node.value;
            return view.render('post');
          }
        },
        click: {
          post: function(arg$){
            var node, payload, ref$;
            node = arg$.node;
            if (node.classList.contains('running')) {
              return;
            }
            if (node.classList.contains('disabled')) {
              return;
            }
            if (!this$.isReady()) {
              return;
            }
            payload = {
              url: (ref$ = this$.data).url,
              reply: ref$.reply,
              content: ref$.content,
              slug: ref$.slug,
              key: ref$.key,
              title: ref$.title
            };
            this$.ldld.on();
            return debounce(1000).then(function(){
              return ld$.fetch('/dash/api/discuss', {
                method: payload.key ? 'PUT' : 'POST'
              }, {
                type: 'json',
                json: payload
              });
            })['finally'](function(){
              return this$.ldld.off();
            }).then(function(ret){
              var ref$;
              this$.fire('new-comment', (ref$ = import$({
                owner: this$.global.user.key,
                displayname: this$.global.user.displayname
              }, payload), ref$.key = ret.key, ref$.slug = ret.slug, ref$));
              view.get('input').value = '';
              view.get('panel').innerHTML = '';
              this$.preview = false;
              return view.render();
            })['catch'](error());
          }
        }
      },
      init: {
        post: function(arg$){
          var node;
          node = arg$.node;
          return this$.ldld = new ldLoader({
            root: node
          });
        }
      },
      handler: {
        avatar: function(arg$){
          var node;
          node = arg$.node;
          return node.style.backgroundImage = "url(/dash/s/avatar/" + this$.global.user.key + ".png)";
        },
        preview: function(arg$){
          var node, revert, state, ref$;
          node = arg$.node;
          revert = in$("off", node.getAttribute('ld').split(" "));
          state = !(ref$ = !(this$.preview && this$.useMarkdown)) !== !revert && (ref$ || revert);
          return node.classList.toggle('d-none', state);
        },
        panel: function(arg$){
          var node;
          node = arg$.node;
          if (this$.preview) {
            return node.innerHTML = marked(this$.data.content.body || '', this$.markedOptions);
          }
        },
        post: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('disabled', !this$.isReady());
        },
        "edit-panel": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !!this$.preview);
        },
        "if-markdown": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', !this$.useMarkdown);
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    init: function(){
      var this$ = this;
      return auth.get().then(function(g){
        this$.global = g;
        return this$.view.render();
      });
    },
    edit: function(cfg){
      cfg == null && (cfg = {});
      import$(this.data, cfg);
      return this.view.render();
    },
    isReady: function(){
      var title;
      title = this.view.get('title');
      return this.ready = !!(this.data.content.body || "").trim().length && (!title || (this.data.title || "").trim().length);
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
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}