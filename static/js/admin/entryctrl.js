// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('entryctrl', [], function(){
    var prepare;
    prepare = function(ctrlOpt){
      var lc, view, adopter, updateDataDebounced, updateData;
      lc = {
        active: null,
        obj: {
          entries: []
        }
      };
      view = new ldView({
        root: ctrlOpt.root,
        action: {
          input: {
            "entry-data": function(arg$){
              var node, evt, name;
              node = arg$.node, evt = arg$.evt;
              name = node.getAttribute('data-name');
              if (lc.active) {
                lc.active[name] = node.value;
              }
              view.render();
              return updateData();
            }
          },
          click: {
            "delete-entry": function(arg$){
              var node, evt, idx;
              node = arg$.node, evt = arg$.evt;
              if (!~(idx = lc.obj.entries.indexOf(lc.active))) {
                return;
              }
              lc.obj.entries.splice(idx, 1);
              lc.active = lc.obj.entries[idx] || lc.obj.entries[idx - 1];
              view.render();
              return updateData();
            },
            "new-entry": function(arg$){
              var node, evt, newData;
              node = arg$.node, evt = arg$.evt;
              lc.obj.entries.push(newData = {
                name: "新項目",
                description: "未準備詳細描述的項目"
              });
              lc.active = newData;
              view.render();
              return updateData();
            },
            'switch': function(arg$){
              var node, name, ref$;
              node = arg$.node;
              node.classList.toggle('on');
              name = node.getAttribute('data-name');
              if (lc.active) {
                ((ref$ = lc.active).config || (ref$.config = {}))[name] = node.classList.contains('on');
              }
              return updateData();
            }
          }
        },
        handler: {
          'switch': function(arg$){
            var node, name, ref$;
            node = arg$.node;
            name = node.getAttribute('data-name');
            return node.classList.toggle('on', lc.active ? !!((ref$ = lc.active).config || (ref$.config = {}))[name] : false);
          },
          "entry-data": function(arg$){
            var node, name;
            node = arg$.node;
            name = node.getAttribute('data-name');
            return node.value = (lc.active || {})[name] || '';
          },
          "empty": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', lc.obj.entries.length);
          },
          entry: {
            list: function(){
              return lc.obj.entries;
            },
            action: {
              click: function(arg$){
                var node, data, evt;
                node = arg$.node, data = arg$.data, evt = arg$.evt;
                lc.active = data;
                return view.render();
              }
            },
            handler: function(arg$){
              var node, data, n, ret;
              node = arg$.node, data = arg$.data;
              n = ld$.find(node, '.nav-link', 0);
              n.classList.toggle('active', data === lc.active);
              ret = ld$.find(n, '[ld=entry-text]').map(function(it){
                return it.innerText = data[it.getAttribute('data-name')] || '';
              });
              if (ret.length === 0) {
                return n.innerText = data.name;
              }
            }
          }
        }
      });
      adopter = new Adopter({
        path: ctrlOpt.path
      });
      adopter.on('change', function(arg$){
        var ops, source, idx;
        ops = arg$.ops, source = arg$.source;
        if (source) {
          return;
        }
        if (lc.obj) {
          idx = lc.obj.entries.indexOf(lc.active);
        }
        lc.obj = adopter.data
          ? JSON.parse(JSON.stringify(adopter.data))
          : {};
        if (!lc.obj.entries) {
          lc.obj.entries = [];
        }
        lc.active = lc.obj.entries[!~idx ? 0 : idx] || {};
        return view.render();
      });
      updateDataDebounced = debounce(500, function(){
        return updateData();
      });
      updateData = function(deb){
        if (deb) {
          return updateDataDebounced();
        } else {
          return adopter.update(function(){
            return JSON.parse(JSON.stringify(lc.obj));
          });
        }
      };
      return adopter;
    };
    return {
      prepare: prepare
    };
  });
})();