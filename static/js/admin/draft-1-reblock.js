// Generated by LiveScript 1.3.0
var slice$ = [].slice;
(function(){
  var animate, reblock, ghost;
  animate = {
    running: false,
    alpha: 4,
    dur: 150,
    box: {},
    init: function(arg$){
      var src, des, cb, ref$, ref1$;
      src = arg$.src, des = arg$.des, cb = arg$.cb;
      if (this.running) {
        return;
      }
      this.src = src;
      this.des = des;
      this.running = true;
      import$(this.box, {
        s1: (ref1$ = {}, ref1$.x = (ref$ = src.getBoundingClientRect()).x, ref1$.y = ref$.y, ref1$.width = ref$.width, ref1$.height = ref$.height, ref1$),
        d1: (ref1$ = {}, ref1$.x = (ref$ = des.getBoundingClientRect()).x, ref1$.y = ref$.y, ref1$.width = ref$.width, ref1$.height = ref$.height, ref1$)
      });
      if (this.box.s1.x === (ref$ = this.box.s1.y) && ref$ === (ref$ = this.box.s1.width) && ref$ === (ref$ = this.box.s1.height) && ref$ === 0) {
        this.box.s1 = this.box.d1;
      }
      cb();
      import$(this.box, {
        s2: (ref1$ = {}, ref1$.x = (ref$ = src.getBoundingClientRect()).x, ref1$.y = ref$.y, ref1$.width = ref$.width, ref1$.height = ref$.height, ref1$),
        d2: (ref1$ = {}, ref1$.x = (ref$ = des.getBoundingClientRect()).x, ref1$.y = ref$.y, ref1$.width = ref$.width, ref1$.height = ref$.height, ref1$)
      });
      return requestAnimationFrame(function(it){
        return animate.handle(it);
      });
    },
    handle: function(t){
      var ref$, a, d, s1, s2, d1, d2, p, x1, y1, x2, y2;
      if (!(this.start != null)) {
        this.start = t;
      }
      ref$ = [this.alpha, this.dur], a = ref$[0], d = ref$[1];
      ref$ = this.box, s1 = ref$.s1, s2 = ref$.s2, d1 = ref$.d1, d2 = ref$.d2;
      p = t = (t - this.start) / d;
      t = 1 - Math.pow(t, a) / (Math.pow(t, a) + Math.pow(1 - t, a));
      ref$ = [(s1.x - s2.x) * t, (s1.y - s2.y) * t], x1 = ref$[0], y1 = ref$[1];
      ref$ = [(d1.x - d2.x) * t, (d1.y - d2.y) * t], x2 = ref$[0], y2 = ref$[1];
      this.src.style.transform = "translate(" + x1 + "px," + y1 + "px)";
      this.des.style.transform = "translate(" + x2 + "px," + y2 + "px)";
      if (p < 1) {
        return requestAnimationFrame(function(it){
          return animate.handle(it);
        });
      }
      this.src.style.transform = "";
      this.des.style.transform = "";
      delete this.start;
      return this.running = false;
    }
  };
  reblock = function(opt){
    var root;
    opt == null && (opt = {});
    this.opt = opt;
    this.action = opt.action || {};
    this.reorder = {
      check: false
    };
    this.node = {
      editing: null,
      dragging: null,
      injecting: null
    };
    this.drag = {};
    this.selected = [];
    this.evtHandler = {};
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.binding = {};
    this.repeatable = {};
    this.blockmgr = opt.blockManager;
    this.init();
    return this;
  };
  reblock.prototype = import$(Object.create(Object.prototype), {
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
    },
    init: function(){
      var obj, this$ = this;
      obj = {
        host: this.root,
        force: true
      };
      if (this.opt.rootBlock) {
        import$(obj, typeof this.opt.rootBlock === 'string'
          ? {
            name: this.opt.rootBlock
          }
          : {
            data: this.opt.rootBlock
          });
      }
      this.inject(obj).then(function(arg$){
        var node, data;
        node = arg$.node, data = arg$.data;
        return this$.data = data;
      });
      document.addEventListener('click', function(e){
        var n, t;
        n = t = e.target;
        while (t && t !== root) {
          t = t.parentNode;
        }
        if (!t) {
          return;
        }
        return this$.select(n.hasAttribute && (n.hasAttribute('repeat-item') || n.hasAttribute('block')) ? n : null);
      });
      this.root.addEventListener('dragover', function(e){
        var g, n, p, t;
        if (this$.node.dragging) {
          return;
        }
        g = !this$.node.injecting
          ? this$.node.injecting = document.createElement('div')
          : this$.node.injecting;
        g.classList.add('ghost');
        n = e.target;
        while (n && (p = n.parentNode)) {
          if (p.hasAttribute && p.hasAttribute('hostable')) {
            t = p;
            break;
          }
          if (n.hasAttribute && n.hasAttribute('hostable')) {
            t = n;
            break;
          } else {
            n = p;
          }
        }
        if (!t) {
          return;
        }
        if (t === n) {
          n = null;
        }
        if (t.childNodes.length && !n) {
          return;
        }
        if (n === g) {
          return;
        }
        if (g.parentNode) {
          g.parentNode.removeChild(g);
        }
        return t.insertBefore(g, n);
      });
      document.addEventListener('dragover', function(e){
        return e.preventDefault();
      });
      document.addEventListener('drop', function(e){
        var that;
        if (this$.node.injecting) {
          if (that = this$.node.injecting.parentNode) {
            that.removeChild(this$.node.injecting);
          }
          this$.node.injecting = null;
        }
        return this$.inject({
          sibling: e.target,
          name: e.dataTransfer.getData('text/plain')
        }).then(function(){
          e.preventDefault();
          return e.stopPropagation();
        })['catch'](function(){});
      });
      this.root.addEventListener('drop', function(){
        this$.reorder.check = 0;
        return this$.node.dragging = null;
      });
      this.root.addEventListener('dragstart', function(e){
        this$.node.dragging = e.target;
        return e.dataTransfer.setDragImage(ghost, 10, 10);
      });
      this.root.addEventListener('dragover', function(e){
        var src, des, isNext, ref$, sbox, dbox, x, y, dir, amount;
        e.preventDefault();
        if (!((src = this$.node.dragging) && (des = e.target))) {
          return;
        }
        if (!this$.action.beforeMove) {
          while (des) {
            if (des.parentNode === src.parentNode) {
              break;
            } else {
              des = des.parentNode;
            }
          }
        } else {
          des = this$.action.beforeMove(src, des);
        }
        if (!des || src === des) {
          return;
        }
        isNext = des === src.nextSibling;
        ref$ = [src.getBoundingClientRect(), des.getBoundingClientRect()], sbox = ref$[0], dbox = ref$[1];
        x = sbox.x === dbox.x
          ? 0
          : e.clientX - dbox.x;
        y = sbox.y === dbox.y
          ? 0
          : e.clientY - dbox.y;
        if (!this$.reorder.check) {
          ref$ = this$.reorder;
          ref$.x = e.clientX;
          ref$.y = e.clientY;
          ref$.check = 1;
        }
        dir = (x && e.clientX - this$.reorder.x > 0) || (y && e.clientY - this$.reorder.y > 0);
        amount = Math.abs(x
          ? e.clientX - this$.reorder.x
          : e.clientY - this$.reorder.y);
        if (amount < (x
          ? dbox.width
          : dbox.height) / 5) {
          return;
        }
        if (this$.action.moving) {
          des = this$.action.moving(src, des, dir);
        }
        this$.move(src, des, dir);
        if (this$.action.afterMove) {
          this$.action.afterMove(src, des, dir);
        }
        return this$.reorder.check = 0;
      });
      this.root.addEventListener('mousedown', function(e){
        var n, results$ = [];
        n = e.target;
        while (n) {
          if (n.hasAttribute && n.hasAttribute('repeat-item')) {
            break;
          } else {
            n = n.parentNode;
          }
        }
        if (!n) {
          return;
        }
        n.setAttribute('draggable', true);
        while (n = n.parentNode) {
          if (n.setAttribute) {
            results$.push(n.setAttribute('draggable', false));
          }
        }
        return results$;
      });
      this.root.addEventListener('click', function(e){
        return this$.edit(e.target);
      });
      this.root.addEventListener('keydown', function(e){
        var editables, idx, n;
        if (e.keyCode === 9) {
          if (!(e.target.hasAttribute && e.target.hasAttribute('editable'))) {
            return;
          }
          editables = Array.from(this$.root.querySelectorAll("[editable]"));
          idx = editables.indexOf(e.target) + (e.shiftKey ? -1 : 1);
          if (idx < 0 || !(n = editables[idx])) {
            n = e.target;
          }
          this$.edit(n);
          return e.preventDefault();
        }
      });
      return this.root.addEventListener('input', function(e){
        var n, name, c, ret, node, data;
        if (!((n = e.target) && n.hasAttribute && (name = n.getAttribute('editable')))) {
          return;
        }
        c = n;
        while (c && !c.reblock) {
          c = c.parentNode;
        }
        if (!c || !(ret = this$.find(c.reblock.id))) {
          return;
        }
        node = ret.node, data = ret.data;
        this$.old = JSON.parse(JSON.stringify(this$.data));
        data[name] = n.innerText;
        return this$.submit();
      });
    },
    submit: function(){
      var ops;
      console.log(">", this.old, this.data);
      ops = json0OtDiff(this.old, this.data);
      return console.log(ops);
    },
    apply: function(ops){
      return otJson0.type.apply(this.data, ops[0]);
    },
    find: function(v){
      if (typeof v === 'string') {
        return this.binding[v];
      }
      while (v && !v.reblock) {
        v = v.parentNode;
      }
      if (!v) {
        return null;
      }
      return this.binding[v.reblock.id];
    },
    bind: function(arg$){
      var node, data;
      node = arg$.node, data = arg$.data;
      if (!data.id) {
        data.id = Math.random().toString(36).substring(2);
      }
      this.binding[data.id] = {
        node: node,
        data: data
      };
      return (node.reblock || (node.reblock = {})).id = data.id;
    },
    select: function(n, append){
      append == null && (append = false);
      this.selected.map(function(it){
        return it.removeAttribute('selected');
      });
      if (!append) {
        this.selected.splice(0, this.selected.length);
      }
      if (!n) {
        return;
      }
      if (!Array.isArray(n)) {
        n = [n];
      }
      this.selected = this.selected.concat(n);
      return n.map(function(it){
        return it.setAttribute('selected', true);
      });
    },
    edit: function(n){
      if (!(n && n.hasAttribute && n.hasAttribute('editable'))) {
        return;
      }
      if (this.node.editing) {
        this.node.editing.setAttribute('contenteditable', false);
      }
      this.node.editing = n;
      n.setAttribute('contenteditable', true);
      return n.focus();
    },
    clone: function(){
      return this.select(this.selected.map(function(n){
        var m;
        n.parentNode.insertBefore(m = n.cloneNode(true), n.nextSibling);
        return m;
      }));
    },
    'delete': function(){
      var n, ref$;
      if (!(n = (ref$ = this.selected)[ref$.length - 1])) {
        return;
      }
      n = n.nextSibling || n.previousSibling;
      this.selected.map(function(it){
        return it.parentNode.removeChild(it);
      });
      return this.select(n);
    },
    move: function(src, des, after){
      var ib;
      if (src === (ib = after ? des.nextSibling : des)) {
        return;
      }
      return animate.init({
        src: src,
        des: des,
        cb: function(){
          src.parentNode.removeChild(src);
          return des.parentNode.insertBefore(src, ib);
        }
      });
    }
    /*
    inject: ({node, name, force}) -> new Promise (res, rej) ~>
      n = node
      # force injection to node, regardless of hostable attribute
      if force => t = n
      else # can only drop on hostable elements. t = hostable target, n = element to insert before; 
        while n and (p = n.parentNode) =>
          if p.hasAttribute and p.hasAttribute(\hostable) => t = p; break
          if n.hasAttribute and n.hasAttribute(\hostable) => t = n; break else n = p
        if !t => return rej new Error("")
    
      if t == n => n = null
      # -- fetch block content
      if !name => return rej(new Error("reblock: inject block but name is not provided"))
      if !@blockmgr => return rej(new Error("reblock: inject block without providing blockManager"))
      @blockmgr.get(name)
        .then (content) ~>
          # -- insert block
          div = document.createElement("div")
          div.innerHTML = content
          ps = for i from 0 til div.childNodes.length => Promise.resolve(div.childNodes[0]).then (c) ~>
            c.parentNode.removeChild c
            t.insertBefore c, n
            if c.nodeType != 1 => return
            # TODO this is not always true if list grows horizontally.
            s = window.getComputedStyle(c)
            h = s.height
            c.style.height = "0px"
            c.style.transition = "height .15s ease-in-out"
            setTimeout (-> c.style.height = h), 0
    
            # - block data - TODO dom tree / data spec
            #c.block = {data: {}, dom: {list: [], node: c}}
            #p = t
            #while p => if p.block => break else p = p.parentNode
            #if p and p.block => p.block.dom.list.push c.block.dom
            #else @block.dom.list.push c.block.dom
            debounce 150 .then -> c.style.transition = ""; c.style.height = ""
          Promise.all ps
        .then -> res!
        .catch -> rej it
    */,
    inject: function(arg$){
      var host, sibling, name, data, dir, force, recurse, ns, retval, this$ = this;
      host = arg$.host, sibling = arg$.sibling, name = arg$.name, data = arg$.data, dir = arg$.dir, force = arg$.force, recurse = arg$.recurse;
      if (!data) {
        data = {
          type: 'block',
          name: name,
          data: {}
        };
      }
      if (!name) {
        name = data.name;
      }
      if (sibling) {
        if (!host) {
          host = ld$.parent(sibling, '[hostable]', host);
        }
        ns = ld$.parent(sibling, '[hostable] > *', host);
      }
      retval = {
        data: data
      };
      return new Promise(function(res, rej){
        if (data.type !== 'block') {
          return rej();
        }
        return (!name
          ? Promise.resolve("<div hostable=\"block\"></div>")
          : this$.blockmgr.get(name)).then(function(blockData){
          var node, s, h, x$, ret, idx, ref$, key$;
          if (typeof blockData === 'string') {
            retval.node = node = document.createElement("div");
            node.innerHTML = blockData;
            if (node.childNodes.length === 0) {
              node = node.childNodes[0];
              node.parentNode.removeChild(node);
            }
          } else if (blockData instanceof Element) {
            retval.node = node = blockData;
          } else {
            Promise.reject(new Error("unrecognized block data"));
          }
          if (host) {
            host.insertBefore(node, ns);
          }
          s = window.getComputedStyle(node);
          h = s.height;
          x$ = node.style;
          x$.height = "0px";
          x$.transition = "height .15s ease-in-out";
          setTimeout(function(){
            return node.style.height = h;
          }, 0);
          debounce(150).then(function(){
            node.style.transition = "";
            return node.style.height = "";
          });
          this$.construct({
            node: node,
            data: data
          });
          if (!recurse && (ret = this$.find(host))) {
            idx = Array.from(host.childNodes).indexOf(node);
            return ((ref$ = ret.data.data)[key$ = host.getAttribute('hostable')] || (ref$[key$] = [])).splice(idx, 0, data);
          }
        }).then(function(){
          return res(retval);
        })['catch'](function(it){
          return rej(it);
        });
      });
    }
    /*update: (ops) ->
      for each op in ops 
        find corresponding node and data by op.path
        render node, data
    */,
    construct: function(arg$){
      var node, data, recurse, this$ = this;
      node = arg$.node, data = arg$.data, recurse = arg$.recurse;
      return new Promise(function(res, rej){
        var nodes, dhash;
        nodes = ld$.find(node, '[editable],[repeatable],[hostable]');
        this$.bind({
          node: node,
          data: data
        });
        dhash = recurse
          ? data
          : data.data;
        return Promise.all(nodes.map(function(node){
          var name, d, ns, p, ds;
          if (name = node.getAttribute('editable')) {
            if (!(d = dhash[name])) {} else if (!d.type) {
              node.innerText = d;
            } else if (d.type === 'value') {
              node.innerText = d.value;
              this$.bind({
                node: node,
                data: d
              });
            } else if (d.type === 'tag') {
              this$.dom({
                data: d
              }).then(function(it){
                return node.appendChild(it);
              });
            } else if (d.type === 'html') {
              node.innerHTML = d.value;
              this$.bind({
                node: node,
                data: d
              });
            }
            return Promise.resolve();
          } else if (name = node.getAttribute('repeatable')) {
            ns = node.nextSibling;
            p = node.parentNode;
            p.removeChild(node);
            node.removeAttribute('repeatable');
            ds = dhash[name] || [];
            Promise.all(ds.map(function(d){
              var n;
              n = node.cloneNode(true);
              p.insertBefore(n, ns);
              return this$.construct({
                node: n,
                data: d,
                recurse: true
              });
            }));
            return this$.repeatable[name] = node;
          } else if (name = node.getAttribute('hostable')) {
            ds = (dhash[name] || []).filter(function(it){
              return it.type === 'block';
            });
            return Promise.all(ds.map(function(d){
              return this$.inject({
                host: node,
                data: d,
                recurse: true
              });
            }));
          }
        })).then(function(){
          return res();
        }).then(function(){
          return rej();
        });
      });
    },
    dom: function(arg$){
      var data, this$ = this;
      data = arg$.data;
      return new Promise(function(res, rej){
        var n, that;
        if (!data.type) {
          return document.createTextNode(data);
        } else if (data.type === 'tag') {
          n = ld$.create({
            name: data.name,
            attr: data.attr,
            style: data.style
          });
          this$.bind({
            node: n,
            data: data,
            id: data.id
          });
          return res((that = data.text)
            ? (n.innerText = that, n)
            : Promise.all((d.child || []).map(function(it){
              return Promise.resolve(this.dom({
                data: it
              }));
            })).then(function(it){
              return it.map(function(it){
                return n.appendChild(it);
              });
            }).then(function(){
              return n;
            }));
        } else if (data.type === 'value') {
          return document.createTextNode(data.value);
        } else {
          return null;
        }
      });
    }
  });
  reblock.ghost = ghost = new Image();
  ghost.src = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"15\" viewBox=\"0 0 20 15\">\n  <rect x=\"0\" y=\"0\" width=\"20\" height=\"15\" fill=\"rgba(0,0,0,.5)\"/>\n</svg>");
  if (typeof window != 'undefined' && window !== null) {
    window.reblock = reblock;
  }
  if (typeof module != 'undefined' && module !== null) {
    return module.exports = reblock;
  }
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}