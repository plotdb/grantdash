// Generated by LiveScript 1.3.0
(function(){
  ldc.register('brdStage', [], function(){
    var obj, viewConfig, view, adopter, updateDataDebounced, updateData;
    obj = {
      idx: 0,
      cfg: {
        stage: [{
          name: "預設",
          config: {},
          start: "",
          end: ""
        }]
      }
    };
    /*
    obj = do
      idx: 0
      cfg: do
        periods: [
          {
            name: "預設"
            config: {}
            start: ""
            end: ""
          },
          {
            name: "提案期"
            config: {}
            start: ""
            end: ""
          }
        }
    */
    viewConfig = {
      root: '[ld-scope=stage-panel]',
      init: {},
      handler: {},
      action: {
        click: {},
        input: {}
      }
    };
    import$(viewConfig.action.input, {
      "stage-name": function(arg$){
        var node, name, invalid;
        node = arg$.node;
        name = (node.value || '').trim();
        invalid = !name || (~obj.cfg.stage.map(function(it){
          return it.name;
        }).indexOf(name) && obj.cfg.stage[obj.idx].name !== name);
        node.classList.toggle('is-invalid', invalid);
        if (invalid) {
          return;
        }
        obj.cfg.stage[obj.idx].name = node.value;
        updateData();
        return view.render();
      }
    });
    import$(viewConfig.action.click, {
      stages: function(arg$){
        var node, evt, n, type, names, i$, i, name;
        node = arg$.node, evt = arg$.evt;
        n = evt.target;
        if (!(type = n.getAttribute('data-type'))) {
          return;
        }
        names = obj.cfg.stage.map(function(it){
          return it.name;
        });
        if (type === 'new-stage') {
          for (i$ = 1; i$ < 100; ++i$) {
            i = i$;
            if (!~names.indexOf("時段" + i)) {
              break;
            }
          }
          name = "時段" + (i < 100
            ? i
            : Math.round(Math.random() * 100) + 100);
          obj.cfg.stage.push({
            name: name,
            desc: "自訂時段",
            config: {}
          });
        } else {
          name = n.getAttribute('data-name');
          obj.idx = names.indexOf(name);
        }
        updateData();
        return view.render();
      },
      "delete-stage": function(arg$){
        var node, evt;
        node = arg$.node, evt = arg$.evt;
        if (obj.cfg.stage.length <= 1) {
          return alert("最少要有一個階段");
        } else if (~obj.idx) {
          obj.cfg.stage.splice(obj.idx, 1);
          obj.idx = 0;
          updateData();
          return view.render();
        }
      }
    });
    import$(viewConfig.handler, {
      "default-view": function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('d-none', obj.idx !== 0);
      },
      "custom-view": function(arg$){
        var node;
        node = arg$.node;
        return node.classList.toggle('d-none', obj.idx === 0);
      },
      "stage-name": function(arg$){
        var node, name, invalid;
        node = arg$.node;
        node.value = obj.cfg.stage[obj.idx].name;
        name = (node.value || '').trim();
        invalid = !name || (~obj.cfg.stage.map(function(it){
          return it.name;
        }).indexOf(name) && obj.cfg.stage[obj.idx].name !== name);
        return node.classList.toggle('is-invalid', invalid);
      },
      stage: {
        list: function(){
          return obj.cfg.stage;
        },
        handle: function(arg$){
          var node, data, idx, x$, n;
          node = arg$.node, data = arg$.data, idx = arg$.idx;
          x$ = n = ld$.find(node, 'a', 0);
          x$.innerText = data.name;
          x$.classList.toggle('active', idx === obj.idx);
          x$.setAttribute('data-name', data.name);
          x$.setAttribute('data-type', 'tab');
          return x$;
        }
      }
    });
    import$(viewConfig.action.input, {
      time: function(arg$){
        var node;
        node = arg$.node;
        obj.cfg.stage[obj.idx][node.getAttribute('data-name')] = node.value;
        return updateData();
      }
    });
    import$(viewConfig.init, {
      time: function(arg$){
        var node;
        node = arg$.node;
        return tail.DateTime(node);
      }
    });
    import$(viewConfig.handler, {
      time: function(arg$){
        var node;
        node = arg$.node;
        return node.value = obj.cfg.stage[obj.idx][node.getAttribute('data-name')] || '';
      }
    });
    import$(viewConfig.action.click, {
      'switch': function(arg$){
        var node, c, ref$;
        node = arg$.node;
        node.classList.toggle('on');
        c = (ref$ = obj.cfg.stage[obj.idx]).config || (ref$.config = {});
        if (!c) {
          return;
        }
        c[node.getAttribute('data-name')] = node.classList.contains('on');
        return updateData();
      }
    });
    import$(viewConfig.handler, {
      'switch': function(arg$){
        var node, ref$;
        node = arg$.node;
        return node.classList.toggle('on', !!((ref$ = obj.cfg.stage[obj.idx]).config || (ref$.config = {}))[node.getAttribute('data-name')]);
      }
    });
    view = new ldView(viewConfig);
    adopter = new Adopter({
      path: ['stage']
    });
    adopter.on('change', function(arg$){
      var ops, source;
      ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      obj.cfg = adopter.data
        ? JSON.parse(JSON.stringify(adopter.data))
        : {};
      if (!obj.cfg.roles) {
        obj.cfg.roles = [];
      }
      return updateView();
    });
    updateDataDebounced = debounce(500, function(){
      return updateData();
    });
    updateData = function(deb){
      if (deb) {
        return updateDataDebounced();
      } else {
        return adopter.update(function(){
          return JSON.parse(JSON.stringify(obj.cfg));
        });
      }
    };
    return adopter;
  });
  return ldc.app('brdStage');
})();
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}