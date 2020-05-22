// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('prjFormBlock', [], function(){
    var renderList, renderTextarea, module, lc, render, init;
    renderList = function(arg$){
      var node, data, viewMode, update, localData, updateList, view;
      node = arg$.node, data = arg$.data, viewMode = arg$.viewMode, update = arg$.update;
      localData = data;
      if (localData.name === 'form-checkpoint' && viewMode) {
        if (!(data.value || (data.value = {})).list) {
          (data.value || (data.value = {})).list = localData.data || (localData.data = []);
        } else {
          localData.data = data.value.list;
        }
        ld$.find(node, '.timeline-list', 0).addEventListener('input', function(){
          return update(data);
        });
      }
      updateList = function(){
        var ret;
        ret = ld$.find(node, '[ld=list-input]').map(function(it){
          if (it.checked) {
            return it.getAttribute('data-name');
          } else {
            return null;
          }
        }).filter(function(it){
          return it;
        });
        (localData.value || (localData.value = {})).list = ret;
        (localData.value || (localData.value = {})).other = !!ld$.find(node, '[ld=list-other-option]', 0).checked;
        return update(localData);
      };
      return (node.view || (node.view = {})).list = view = new ldView({
        root: node,
        action: {
          input: {
            "list-other": function(arg$){
              var node;
              node = arg$.node;
              (localData.value || (localData.value = {})).otherValue = node.value || '';
              return update(data);
            }
          },
          click: {
            "list-add": function(){
              (localData.data || (localData.data = [])).push({
                title: "新項目",
                desc: "關於這個項目的描述 ... "
              });
              update(data);
              return view.render();
            },
            "list-other-option": function(arg$){
              var node;
              node = arg$.node;
              (localData.value || (localData.value = {})).other = node.checked;
              return updateList();
            }
          }
        },
        handler: {
          "list-other": function(arg$){
            var node;
            node = arg$.node;
            return node.value = (localData.value || (localData.value = {})).otherValue || '';
          },
          "list-other-option": function(arg$){
            var node;
            node = arg$.node;
            return node.setAttribute('name', "radio-" + data.key);
          },
          list: {
            list: function(){
              return localData.data || (localData.data = []);
            },
            init: function(arg$){
              var node, data, editable, view;
              node = arg$.node, data = arg$.data;
              editable = node.hasAttribute('data-user-editable');
              if (!editable && viewMode) {
                node.removeAttribute('draggable');
              }
              return node.view = view = new ldView({
                root: node,
                action: {
                  input: {
                    "list-data": function(arg$){
                      var node;
                      node = arg$.node;
                      return data[node.getAttribute('data-name')] = node.innerText;
                    },
                    "list-input": function(arg$){
                      var node;
                      node = arg$.node;
                      return updateList();
                    }
                  }
                },
                init: {
                  "list-data": function(arg$){
                    var node;
                    node = arg$.node;
                    node.setAttribute('data-name', node.getAttribute('editable'));
                    if (!editable && viewMode) {
                      return node.removeAttribute('editable');
                    }
                  }
                },
                handler: {
                  "list-input": function(arg$){
                    var node;
                    node = arg$.node;
                    node.setAttribute('name', "radio-" + localData.key);
                    return node.setAttribute('data-name', data.title);
                  },
                  "list-data": function(arg$){
                    var node;
                    node = arg$.node;
                    return node.innerText = data[node.getAttribute('data-name')] || '';
                  }
                }
              });
            },
            render: function(arg$){
              var node;
              node = arg$.node;
              return node.render();
            }
          }
        }
      });
    };
    renderTextarea = function(arg$){
      var node, data, viewMode, update, lc, view;
      node = arg$.node, data = arg$.data, viewMode = arg$.viewMode, update = arg$.update;
      lc = {};
      return view = new ldView({
        root: node,
        action: {
          input: {
            "use-markdown": function(arg$){
              var node;
              node = arg$.node;
              (data.value || (data.value = {})).useMarkdown = node.checked;
              update(data);
              return view.render();
            },
            "input-field": function(arg$){
              var node;
              node = arg$.node;
              (data.value || (data.value = {})).content = node.value;
              return update(data);
            },
            "toggle-preview": function(arg$){
              var node;
              node = arg$.node;
              lc.preview = !!node.checked;
              return view.render();
            }
          }
        },
        handler: {
          "input-field": function(arg$){
            var node;
            node = arg$.node;
            return node.value = (data.value || (data.value = {})).content || '';
          },
          "preview-panel": function(arg$){
            var node;
            node = arg$.node;
            node.classList.toggle('d-none', !lc.preview);
            if (lc.preview) {
              return node.innerHTML = marked((data.value || (data.value = {})).content || '');
            }
          },
          "edit-panel": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !!lc.preview);
          },
          "if-markdown": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !(data.value || (data.value = {})).useMarkdown);
          }
        }
      });
    };
    module = {
      "form-radio": renderList,
      "form-checkbox": renderList,
      "form-checkpoint": renderList,
      "form-long-answer": renderTextarea,
      "form-short-answer": renderTextarea
    };
    lc = {};
    render = function(arg$){
      var node, data, rootData, viewMode, update;
      node = arg$.node, data = arg$.data, rootData = arg$.rootData, viewMode = arg$.viewMode, update = arg$.update;
      lc.data = data;
      lc.rootData = rootData;
      return node.view.block.render();
    };
    init = function(arg$){
      var node, data, rootData, viewMode, update;
      node = arg$.node, data = arg$.data, rootData = arg$.rootData, viewMode = arg$.viewMode, update = arg$.update;
      node.setAttribute('id', "block-" + data.key);
      lc.data = data;
      lc.rootData = rootData;
      (node.view || (node.view = {})).block = new ldView({
        root: node,
        action: {
          input: {
            title: function(arg$){
              var node, evt;
              node = arg$.node, evt = arg$.evt;
              lc.data.title = node.innerText;
              return update();
            },
            desc: function(arg$){
              var node, evt;
              node = arg$.node, evt = arg$.evt;
              lc.data.desc = node.innerText;
              return update();
            }
          },
          click: {
            'switch': function(arg$){
              var node, evt, ref$;
              node = arg$.node, evt = arg$.evt;
              node.classList.toggle('on');
              ((ref$ = lc.data).config || (ref$.config = {}))[node.getAttribute('data-name')] = node.classList.contains('on');
              return update();
            },
            'delete': function(arg$){
              var node, evt;
              node = arg$.node, evt = arg$.evt;
              lc.rootData.splice(lc.rootData.indexOf(data), 1);
              return update();
            },
            clone: function(arg$){
              var node, evt, newData;
              node = arg$.node, evt = arg$.evt;
              newData = JSON.parse(JSON.stringify(lc.data));
              newData.key = Math.random().toString(36).substring(2);
              lc.rootData.splice(lc.rootData.indexOf(lc.data), 0, newData);
              return update();
            }
          }
        },
        handler: {
          invalid: function(arg$){
            var node, isValid, ref$;
            node = arg$.node;
            isValid = !(((ref$ = lc.data).valid || (ref$.valid = {})).result != null) || lc.data.valid.result;
            if (!isValid) {
              node.innerText = lc.data.valid.criteria.invalid || "這個欄位格式不符";
            }
            return node.classList.toggle('d-none', isValid);
          },
          block: function(arg$){
            var node, isValid, ref$;
            node = arg$.node;
            isValid = !(((ref$ = lc.data).valid || (ref$.valid = {})).result != null) || lc.data.valid.result;
            return node.classList.toggle('invalid', !isValid);
          },
          title: function(arg$){
            var node;
            node = arg$.node;
            if (node.innerText !== lc.data.title) {
              node.innerText = lc.data.title;
            }
            if (viewMode) {
              return node.removeAttribute('editable');
            }
          },
          desc: function(arg$){
            var node;
            node = arg$.node;
            if (node.innerText !== lc.data.desc) {
              node.innerText = lc.data.desc;
            }
            if (viewMode) {
              return node.removeAttribute('editable');
            }
          },
          'switch': function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.classList.toggle('on', !!((ref$ = lc.data).config || (ref$.config = {}))[node.getAttribute('data-name')]);
          },
          "edit-only": function(arg$){
            var node;
            node = arg$.node;
            if (viewMode) {
              return node.remove();
            }
          },
          "list-input": function(arg$){
            var node;
            node = arg$.node;
            return node.setAttribute('name', "input-" + lc.data.key);
          }
        }
      });
      if (module[lc.data.name]) {
        return module[lc.data.name]({
          node: node,
          data: lc.data,
          viewMode: viewMode,
          update: update
        });
      }
    };
    return {
      init: init,
      render: render,
      module: module
    };
  });
})();