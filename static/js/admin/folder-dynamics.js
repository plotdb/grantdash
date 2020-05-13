// Generated by LiveScript 1.3.0
var reb, root;
reb = new reblock({
  root: '#root',
  action: {
    beforeMove: function(src, des){
      var n;
      if (des.classList.contains('folder')) {
        return null;
      }
      while (des) {
        if (!des.parentNode.classList) {
          return null;
        }
        if (des.classList.contains('folder-toggle')) {
          if (src === des.parentNode) {
            return null;
          }
          if (n = ld$.find(des.parentNode, '.folder-menu', 0)) {
            n.insertBefore(des = document.createElement('div'), n.childNodes[0]);
            des.dummy = true;
            break;
          }
        }
        if (des.parentNode.classList.contains('folder-menu') || des.parentNode.classList.contains('folder-root')) {
          break;
        }
        if (des.parentNode === src.parentNode) {
          break;
        } else {
          des = des.parentNode;
        }
      }
      if (!des || src === des || ld$.parent(des, null, src)) {
        if (des.dummy) {
          des.parentNode.removeChild(des);
        }
        return null;
      }
      return des;
    },
    moving: function(src, des, dir){
      var d;
      if (dir === 0 && des.dummy) {
        d = des;
        des = des.parentNode.parentNode;
        d.parentNode.removeChild(d);
      }
      return des;
    },
    afterMove: function(src, des, dir){
      if (des.dummy) {
        return des.parentNode.removeChild(des);
      }
    }
  }
});
root = ld$.find('#root', 0);
root.addEventListener('click', function(e){
  var n, p, f, fp, fn, m, ms;
  if (!e.target.classList) {
    return;
  }
  if (!(n = ld$.parent(e.target, '.folder-item', root))) {
    return;
  }
  if (e.target.classList.contains('i-close')) {
    if (p = ld$.parent(n, '.folder', root)) {
      n = p;
    }
    reb.select(n);
    return reb['delete']();
  } else if (e.target.classList.contains('i-clone')) {
    if (p = ld$.parent(n, '.folder', root)) {
      n = p;
    }
    reb.select(n);
    reb.clone();
    if (n === p) {
      return new ldui.Folder({
        root: reb.selected[0]
      });
    }
  } else if (e.target.classList.contains('i-radio')) {
    if (n.classList.contains('folder-toggle')) {
      n.classList.remove('folder-toggle');
      n.setAttribute('draggable', true);
      f = n.parentNode;
      fp = f.parentNode;
      fn = f.nextSibling;
      m = ld$.find(f, '.folder-menu', 0);
      ms = ld$.find(f, '.folder-menu > .folder-item');
      ms.map(function(it){
        it.parentNode.removeChild(it);
        return fp.insertBefore(it, fn);
      });
      m.parentNode.removeChild(m);
      f.removeChild(n);
      fp.insertBefore(n, f);
      return fp.removeChild(f);
    } else {
      n.classList.add('folder-toggle');
      f = ld$.create({
        name: 'div',
        className: ['folder', 'show'],
        attr: {
          draggable: "true"
        }
      });
      m = ld$.create({
        name: 'div',
        className: ['folder-menu']
      });
      n.removeAttribute('draggable');
      n.parentNode.insertBefore(f, n);
      n.parentNode.removeChild(n);
      f.appendChild(n);
      f.appendChild(m);
      return new ldui.Folder({
        root: f
      });
    }
  }
});
reb.init();