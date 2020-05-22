// Generated by LiveScript 1.3.0
ldc.register('prjForm', ['prjFormCriteria', 'prjFormBlock', 'prjFormValidation', 'sdbAdapter'], function(arg$){
  var prjFormCriteria, prjFormBlock, prjFormValidation, sdbAdapter, Ctrl;
  prjFormCriteria = arg$.prjFormCriteria, prjFormBlock = arg$.prjFormBlock, prjFormValidation = arg$.prjFormValidation, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var root, viewMode, obj, lc, hub, bmgr, fillData, validate, update, blocksView, reb, progress, viewer, renderAnswer, viewAnswer, this$ = this;
    this.opt = opt;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.node = {
      src: ld$.find(root, '[ld=blocksrc]', 0),
      list: ld$.find(root, '[ld=form-list]', 0),
      answer: ld$.find(root, '[ld=form-answer]', 0)
    };
    this.viewMode = viewMode = opt.viewMode;
    this.obj = obj = {
      list: []
    };
    lc = {
      view: false
    };
    this.hub = hub = {
      updateDeb: debounce(100, function(b){
        if (reb.isDragging()) {
          return hub.updateDeb(b);
        } else {
          return hub.update(b);
        }
      }),
      update: function(block){
        if (viewMode && block) {
          fillData[block.key] = block.value;
          this$.opsOut(function(){
            return {
              list: this$.obj.list
            };
          });
          return validate(block);
        } else {
          this$.opsOut(function(){
            return {
              list: this$.obj.list
            };
          });
          return blocksView.render();
        }
      },
      render: function(){
        blocksView.render();
        if (viewer) {
          return viewer.render();
        }
      }
    };
    bmgr = {
      get: function(name){
        return new Promise(function(res, rej){
          var n, div;
          n = ld$.find(root, "[ld=form-sample] [data-name=" + name + "]", 0);
          if (!n) {
            rej(new Error("block not found"));
          }
          div = ld$.create({
            name: "div",
            attr: {
              draggable: true
            }
          });
          div.appendChild(n.cloneNode(true));
          return res(div);
        });
      }
    };
    fillData = {};
    validate = debounce(function(block){
      block.valid = prjFormValidation.validate(block);
      blocksView.render();
      if (viewer) {
        return viewer.render();
      }
    });
    update = function(block){
      return hub.update(block);
    };
    blocksView = new ldView({
      root: this.node.list,
      handler: {
        block: {
          key: function(it){
            return it.key;
          },
          list: function(){
            return obj.list;
          },
          init: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            return bmgr.get(data.name).then(function(n){
              n = n.childNodes[0];
              n.parentNode.removeChild(n);
              node.innerHTML = "";
              node.appendChild(n);
              prjFormBlock.init({
                node: node,
                rootData: obj.list,
                data: data,
                viewMode: viewMode,
                update: update
              });
              if (!viewMode) {
                return prjFormCriteria.render({
                  node: node,
                  data: data
                });
              }
            });
          },
          handler: function(arg$){
            var node, data;
            node = arg$.node, data = arg$.data;
            if (node.view) {
              return prjFormBlock.render({
                node: node,
                data: data,
                rootData: obj.list,
                viewMode: viewMode,
                update: update
              });
            }
          }
        }
      }
    });
    if (this.node.src) {
      new ldView({
        root: this.node.src,
        action: {
          dragstart: {
            block: function(arg$){
              var node, evt;
              node = arg$.node, evt = arg$.evt;
              return evt.dataTransfer.setData('text/plain', node.getAttribute('data-name') + "");
            }
          }
        }
      });
    }
    reb = new reblock({
      name: 'form',
      root: this.node.list,
      blockManager: bmgr,
      action: {
        afterInject: function(arg$){
          var node, name, newData, idx;
          node = arg$.node, name = arg$.name;
          newData = {
            key: Math.random().toString(36).substring(2),
            name: name,
            title: "提問的標題1",
            desc: "提問的描述",
            config: {
              required: true
            },
            criteria: [{
              type: 'number',
              op: 'between',
              input1: 10,
              input2: 20,
              invalid: '應介於 10 ~ 20 之間'
            }]
          };
          node._data = newData;
          idx = Array.from(node.parentNode).indexOf(node);
          (obj.list || (obj.list = [])).splice(idx, 0, newData);
          blocksView.bindEachNode({
            name: 'block',
            container: node.parentNode,
            node: node
          });
          blocksView.render();
          return hub.update();
        },
        afterMoveNode: function(arg$){
          var src, des, ib, n, ia;
          src = arg$.src, des = arg$.des, ib = arg$.ib;
          if (src.parentNode.hasAttribute('hostable')) {
            n = src.parentNode;
            while (n && !n._data) {
              n = n.parentNode;
            }
            if (!n) {
              ia = obj.list.indexOf(src._data);
              obj.list.splice(ia, 1);
              ib = ib
                ? obj.list.indexOf(ib._data)
                : obj.list.length;
              obj.list.splice(ib, 0, src._data);
              blocksView.render();
              return;
            }
            n._data.data = Array.from(src.parentNode.childNodes).filter(function(it){
              return it.nodeType === 1;
            }).map(function(it){
              return it._data;
            }).filter(function(it){
              return it;
            });
            return n.view.list.render();
          }
        }
      }
    });
    if (viewMode) {
      progress = function(){
        var done, total, percent, remain;
        done = obj.list.filter(function(it){
          return (it.valid || (it.valid = {})).result;
        }).length;
        total = obj.list.length;
        percent = done / obj.list.length;
        remain = total - done;
        return {
          remain: remain,
          done: done,
          total: total,
          percent: percent
        };
      };
      viewer = new ldView({
        root: root,
        action: {
          click: {
            viewing: function(){
              lc.view = !lc.view;
              viewer.render();
              return viewAnswer.render();
            },
            invalid: function(){
              var filled, res$, k, i$, to$, i, node;
              res$ = [];
              for (k in fillData) {
                res$.push(k);
              }
              filled = res$;
              for (i$ = 0, to$ = obj.list.length; i$ < to$; ++i$) {
                i = i$;
                if (!in$(obj.list[i].key + "", filled)) {
                  break;
                }
              }
              node = ld$.find(this$.node.list, "#block-" + obj.list[i].key, 0);
              if (node) {
                return scrollto(node);
              }
            }
          }
        },
        handler: {
          nview: function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', lc.view);
          },
          view: function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !lc.view);
          },
          progress: function(arg$){
            var node;
            node = arg$.node;
            return node.style.width = progress().percent * 100 + "%";
          },
          invalid: function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', progress().remain === 0);
          },
          valid: function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', progress().remain > 0);
          },
          remain: function(arg$){
            var node;
            node = arg$.node;
            return node.innerText = progress().remain;
          },
          submit: function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('disabled', progress().remain > 0);
          }
        }
      });
      renderAnswer = {
        "form-checkpoint": function(arg$){
          var node, data, block, items;
          node = arg$.node, data = arg$.data, block = arg$.block;
          items = (data.list || []).map(function(it){
            return "<div class=\"item\">\n<div class=\"title\">" + it.title + "</div>\n<p>" + it.desc + "</p>\n</div>";
          }).join("");
          return node.innerHTML = "<div class=\"timeline-list\">" + items + "</div>";
        },
        "form-radio": function(arg$){
          var node, data;
          node = arg$.node, data = arg$.data;
          return node.innerText = ((data.list || []).concat(data.other
            ? [data.otherValue || '']
            : [])).join(', ');
        },
        "form-checkbox": function(arg$){
          var node, data;
          node = arg$.node, data = arg$.data;
          return node.innerText = ((data.list || []).concat(data.other
            ? [data.otherValue || '']
            : [])).join(', ');
        }
      };
      viewAnswer = new ldView({
        root: this.node.answer,
        handler: {
          answer: {
            list: function(){
              return obj.list;
            },
            init: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              return node.view = new ldView({
                root: node,
                handler: {
                  title: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.innerText = data.title || '';
                  },
                  desc: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.innerText = data.desc || '';
                  },
                  content: function(arg$){
                    var node;
                    node = arg$.node;
                    if (renderAnswer[data.name]) {
                      return renderAnswer[data.name]({
                        node: node,
                        block: data,
                        data: fillData[data.key] || {}
                      });
                    } else {
                      return node.innerText = (fillData[data.key] || {}).content || '';
                    }
                  }
                }
              });
            },
            handler: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              return node.view.render();
            }
          }
        }
      });
    }
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    opsIn: function(arg$){
      var data, ops, source;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      this.obj.list = JSON.parse(JSON.stringify(data.list || []));
      return this.hub.render();
    }
  });
  return Ctrl;
});
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}