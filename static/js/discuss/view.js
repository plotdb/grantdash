// Generated by LiveScript 1.3.0
ldc.register('discussView', ['discussEdit'], function(arg$){
  var discussEdit, Ctrl;
  discussEdit = arg$.discussEdit;
  Ctrl = function(opt){
    var root, view, this$ = this;
    this.opt = opt;
    this.markedOptions = opt.marked || {};
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.data = import$({
      url: window.location.pathname
    }, opt.data);
    this.edit = new discussEdit({
      root: ld$.find(root, '[ld-scope=edit]', 0)
    });
    this.comments = [];
    this.edit.init();
    this.edit.on('new-comment', function(c){
      c.distance = this$.comments.length;
      c.state = 'active';
      this$.comments.push(c);
      return this$.view.render();
    });
    this.view = view = new ldView({
      initRender: false,
      root: this.root,
      handler: {
        loading: function(arg$){
          var node, names, ref$;
          node = arg$.node, names = arg$.names;
          return node.classList.toggle('d-none', !(!this$.loading !== !(ref$ = in$('off', names)) && (this$.loading || ref$)));
        },
        title: function(arg$){
          var node, title;
          node = arg$.node;
          title = this$.discuss ? this$.discuss.title : '';
          return node.innerText = title || '未命名的討論串';
        },
        comment: {
          list: function(){
            return this$.comments;
          },
          init: function(arg$){
            var node, data, idx, view;
            node = arg$.node, data = arg$.data, idx = arg$.idx;
            node.classList.add('ld', 'ld-float-ltr-in', 'xp35');
            node.style.animationDelay = idx * 0.1 + "s";
            return view = new ldView({
              root: node,
              handler: {
                avatar: function(arg$){
                  var node;
                  node = arg$.node;
                  return node.style.backgroundImage = "url(/dash/s/avatar/" + data.owner + ".png)";
                },
                author: function(arg$){
                  var node;
                  node = arg$.node;
                  return node.innerText = data.displayname;
                },
                role: function(arg$){
                  var node;
                  node = arg$.node;
                  node.classList.toggle('d-none', !data.role);
                  return ld$.find(node, 'span', 0).innerText = data.role;
                },
                date: function(arg$){
                  var node;
                  node = arg$.node;
                  return node.innerText = moment(data.createdtime).tz("Asia/Taipei").format("YYYY/MM/DD hh:mm:ss");
                },
                content: function(arg$){
                  var node, ref$;
                  node = arg$.node;
                  if (((ref$ = data.content).config || (ref$.config = {})).useMarkdown) {
                    return node.innerHTML = marked(data.content.body);
                  } else {
                    return node.innerText = data.content.body;
                  }
                }
              }
            });
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    init: function(){
      var payload, this$ = this;
      this.loading = true;
      payload = this.data.slug
        ? {
          slug: this.data.slug
        }
        : {
          url: this.data.url
        };
      return ld$.fetch('/dash/api/discuss', {
        method: 'GET'
      }, {
        params: payload,
        type: 'json'
      })['finally'](function(){
        return this$.loading = false;
      }).then(function(ret){
        this$.comments = ret.comments;
        this$.discuss = ret.discuss;
        this$.comments = ret.comments || [];
        this$.discuss = ret.discuss || {};
        return this$.view.render();
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
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}