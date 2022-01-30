(function(){
  var lc, ldnotify;
  lc = {};
  ldnotify = function(opt){
    var this$ = this;
    opt == null && (opt = {});
    this.opt = {
      className: ['ldnotify-item'],
      classIn: ['ldnotify-in'],
      classOut: ['ldnotify-out'],
      delay: 3000
    };
    import$(this.opt, opt);
    ['className', 'classIn', 'classOut'].map(function(it){
      if (typeof this$.opt[it] === 'string') {
        return this$.opt[it] = this$.opt[it].split(' ').filter(function(it){
          return it.trim();
        });
      }
    });
    if (opt.classByType) {
      this.classByType = opt.classByType;
    }
    this.root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    if (!this.root) {
      this.root = document.body.appendChild(document.createElement('div'));
    }
    this.root.classList.add('ldnotify');
    return this;
  };
  ldnotify.prototype = import$(Object.create(Object.prototype), {
    classByType: function(it){
      return "ldnotify-" + it;
    },
    send: function(type, msg){
      var node, span, this$ = this;
      node = document.createElement('div');
      span = document.createElement('span');
      node.appendChild(span);
      node.setAttribute('class', (this.opt.className.concat(this.opt.classIn, [this.classByType(type)])).join(' '));
      span.innerText = msg;
      this.root.insertBefore(node, this.root.childNodes[0]);
      return setTimeout(function(){
        node.classList.remove.apply(node.classList, this$.opt.classIn);
        node.classList.add.apply(node.classList, this$.opt.classOut);
        return setTimeout(function(){
          if (node.parentNode) {
            return node.parentNode.removeChild(node);
          }
        }, this$.opt.delay);
      }, this.opt.delay);
    }
  });
  ldnotify.send = function(){
    var args, res$, i$, to$;
    res$ = [];
    for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
      res$.push(arguments[i$]);
    }
    args = res$;
    if (!lc.obj) {
      lc.obj = new ldnotify();
    }
    return lc.obj.send.apply(lc.obj, args);
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = ldnotify;
  } else if (typeof window != 'undefined' && window !== null) {
    window.ldnotify = ldnotify;
  }
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
