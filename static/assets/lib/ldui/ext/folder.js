// Generated by LiveScript 1.3.1
(function(){
  ldui.Folder = function(opt){
    var root, toggler, menu;
    root = opt.root;
    this.root = root = typeof root === 'string'
      ? document.querySelector(root)
      : root ? root : null;
    toggler = ld$.find(root, '.folder-toggle', 0);
    menu = ld$.find(root, '.folder-menu', 0);
    toggler.addEventListener('click', function(){
      var ison, dbox;
      ison = root.classList.contains('show');
      if (!ison) {
        root.classList.toggle('show');
      }
      dbox = menu.getBoundingClientRect();
      menu.style.height = (ison ? dbox.height : 0) + "px";
      setTimeout(function(){
        return menu.style.height = (ison
          ? 0
          : dbox.height) + "px";
      }, 0);
      if (ison) {
        setTimeout(function(){
          root.classList.toggle('show');
          return menu.style.height = "";
        }, 250);
      }
      if (!ison) {
        return setTimeout(function(){
          return menu.style.height = "";
        }, 250);
      }
    });
    return this;
  };
  return ld$.find(document, '.folder').map(function(it){
    return ldui.Folder({
      root: it
    });
  });
})();