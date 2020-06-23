// Generated by LiveScript 1.3.0
ldc.register('adminPostList', ['notify', 'auth', 'loader', 'ldcvmgr', 'error', 'adminPanel'], function(arg$){
  var notify, auth, loader, ldcvmgr, error, adminPanel, Ctrl;
  notify = arg$.notify, auth = arg$.auth, loader = arg$.loader, ldcvmgr = arg$.ldcvmgr, error = arg$.error, adminPanel = arg$.adminPanel;
  Ctrl = function(opt){
    var root, this$ = this;
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.brd = opt.brd;
    this.posts = [];
    this.view = {};
    this.ldcv = {};
    this.ldld = new ldLoader({
      root: ld$.find(root, '[ld=loading]', 0)
    });
    this.view.list = new ldView({
      initRender: false,
      root: this.root,
      action: {
        click: {
          "new-post": function(){
            return this$.toggleModal();
          },
          "sync-list": function(arg$){
            var node;
            node = arg$.node;
            node.classList.add('running');
            return this$.fetch().then(function(){
              return debounce(1000).then(function(){
                return node.classList.remove('running');
              });
            });
          }
        }
      },
      handler: {
        empty: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', this$.posts && this$.posts.length);
        },
        editor: function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', true);
        },
        post: {
          list: function(){
            return this$.posts || [];
          },
          init: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            node.classList.remove('d-none');
            return local.view = new ldView({
              root: node,
              context: data,
              action: {
                click: {
                  edit: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return this$.edit(context.slug);
                  },
                  'delete': function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return ldcvmgr.get('confirm-deletion').then(function(ret){
                      if (ret !== 'yes') {
                        return;
                      }
                      return ld$.fetch("/dash/api/post/" + context.slug, {
                        method: 'delete'
                      }).then(function(){
                        return notify.send('success', '文章已刪除');
                      }).then(function(){
                        var idx;
                        idx = this$.posts.indexOf(context);
                        if (!~idx) {
                          return;
                        }
                        this$.posts.splice(idx, 1);
                        return this$.view.list.render();
                      });
                    })['catch'](error());
                  }
                }
              },
              handler: {
                title: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.title;
                },
                owner: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.ownername;
                },
                date: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = moment(context.createdtime).format("YYYY-MM-DD hh:mm:ss");
                },
                avatar: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.style.backgroundImage = "url(/s/avatar/" + context.owner + ".png)";
                },
                view: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.setAttribute('href', "/post/" + context.slug + "/");
                }
              }
            });
          },
          handler: function(arg$){
            var local, data;
            local = arg$.local, data = arg$.data;
            local.view.setContext(data);
            return local.view.render();
          }
        }
      }
    });
    adminPanel.on('active', function(arg$){
      var nav, name, panel;
      nav = arg$.nav, name = arg$.name, panel = arg$.panel;
      if (name !== 'brd-post-list') {
        return;
      }
      this$.edit(null);
      return this$.fetch();
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    render: function(){
      return this.view.list.render();
    },
    fetch: function(){
      var this$ = this;
      this.ldld.on();
      return ld$.fetch('/dash/api/post/', {
        method: 'GET'
      }, {
        params: {
          brd: this.brd.slug
        },
        type: 'json'
      }).then(function(it){
        this$.posts = it;
        this$.render();
        return this$.ldld.off();
      });
    },
    edit: function(slug){
      var editor;
      editor = this.view.list.get('editor');
      if (slug) {
        editor.src = "/dash/post/" + slug + "/edit";
      }
      return editor.classList.toggle('d-none', !slug);
    },
    toggleModal: function(){
      var that, this$ = this;
      if (that = this.ldcv.newPost) {
        that.toggle();
      }
      return ldcvmgr.getdom("new-post").then(function(dom){
        this$.form = new ldForm({
          root: dom,
          submit: '[ld=post]'
        });
        this$.view.create = new ldView({
          root: dom,
          action: {
            click: {
              post: function(arg$){
                var node, payload;
                node = arg$.node;
                loader.on();
                payload = {
                  brd: this$.brd.slug,
                  title: this$.form.values().title
                };
                return auth.recaptcha.get().then(function(recaptcha){
                  payload.recaptcha = recaptcha;
                  return ld$.fetch("/dash/api/post/", {
                    method: 'POST'
                  }, {
                    json: payload,
                    type: 'json'
                  });
                }).then(function(ret){
                  this$.edit(ret.slug);
                  loader.off();
                  return this$.ldcv.newPost.toggle(false);
                })['catch'](error());
              }
            }
          }
        });
        return ldcvmgr.getcover('new-post');
      }).then(function(it){
        return this$.ldcv.newPost = it;
      }).then(function(){
        return this$.ldcv.newPost.toggle();
      });
    }
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}