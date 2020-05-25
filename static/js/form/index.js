// Generated by LiveScript 1.3.0
ldc.register('prjForm', ['ldcvmgr', 'prjFormCriteria', 'prjFormBlock', 'prjFormValidation', 'sdbAdapter'], function(arg$){
  var ldcvmgr, prjFormCriteria, prjFormBlock, prjFormValidation, sdbAdapter, Ctrl;
  ldcvmgr = arg$.ldcvmgr, prjFormCriteria = arg$.prjFormCriteria, prjFormBlock = arg$.prjFormBlock, prjFormValidation = arg$.prjFormValidation, sdbAdapter = arg$.sdbAdapter;
  Ctrl = function(opt){
    var root, viewMode, obj, lc, hub, bmgr, blocksView, reb, progress, viewer, renderAnswer, viewAnswer, viewAnswerDiff, this$ = this;
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
      list: [],
      value: {}
    };
    if (this.viewMode && opt.form) {
      this.obj.list = opt.form;
    }
    lc = {
      view: false
    };
    this.hub = hub = {
      updateDeb: debounce(200, function(b){
        return hub.update();
      }),
      update: function(block){
        if (viewMode && block) {
          obj.value[block.key] = block.value;
          this$.opsOut(function(){
            return obj.value;
          });
          return this$.validate(block);
        } else {
          return this$.opsOut(function(){
            return {
              list: this$.obj.list
            };
          });
        }
      },
      renderDeb: debounce(200, function(){
        return hub.render();
      }),
      render: function(){
        blocksView.render();
        if (viewer) {
          return viewer.render();
        }
      },
      'delete': function(it){
        obj.list.splice(obj.list.indexOf(it), 1);
        this.update();
        return this.render();
      },
      clone: function(it){
        var newData;
        newData = JSON.parse(JSON.stringify(it));
        newData.key = Math.random().toString(36).substring(2);
        obj.list.splice(obj.list.indexOf(it), 0, newData);
        this.update();
        return this.render();
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
    this.validateAll = debounce(function(){
      obj.list.map(function(it){
        return it.valid = prjFormValidation.validate(it);
      });
      blocksView.render();
      if (viewer) {
        return viewer.render();
      }
    });
    this.validate = debounce(function(block){
      block.valid = prjFormValidation.validate(block);
      blocksView.render();
      if (viewer) {
        return viewer.render();
      }
    });
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
          },
          handler: function(arg$){
            var node, data, promise;
            node = arg$.node, data = arg$.data;
            promise = !node.block
              ? bmgr.get(data.name).then(function(n){
                n = n.childNodes[0];
                n.parentNode.removeChild(n);
                node.innerHTML = "";
                node.appendChild(n);
                return node.block = new prjFormBlock({
                  root: node,
                  data: data,
                  viewMode: viewMode,
                  hub: hub
                });
              })
              : Promise.resolve();
            return promise.then(function(){
              if (node.block) {
                node.block.setData(data);
                return node.block.render();
              }
            });
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
          var node, name, schema, newData, type, op, k, ref$, idx;
          node = arg$.node, name = arg$.name;
          schema = prjFormCriteria.schema;
          newData = {
            key: Math.random().toString(36).substring(2),
            name: name,
            title: "問題的標題",
            desc: "一些關於這個問題的簡單描述、說明或介紹",
            config: {
              required: true
            },
            criteria: [{
              enabled: true,
              type: 'number',
              op: 'between'
            }]
          };
          type = schema.support[name][0];
          if (type) {
            op = (function(){
              var results$ = [];
              for (k in schema.ops[schema.types[type].ops] || {}) {
                results$.push(k);
              }
              return results$;
            }())[0];
          } else {
            op = '';
          }
          ref$ = newData.criteria[0];
          ref$.type = type;
          ref$.op = op;
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
          var src, des, ib, n, ia, ref$;
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
              hub.updateDeb();
              hub.render();
              return;
            }
            n._data.data = Array.from(src.parentNode.childNodes).filter(function(it){
              return it.nodeType === 1;
            }).map(function(it){
              return it._data;
            }).filter(function(it){
              return it && !it.other;
            });
            if (n._data.name === 'form-checkpoint') {
              ((ref$ = n._data).value || (ref$.value = {})).list = n._data.data;
            }
            if (n.view.module) {
              n.view.module.render();
            }
            return hub.update();
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
          input: {
            history: function(){
              return ldcvmgr.toggle('prj-diff');
            }
          },
          click: {
            viewing: function(){
              lc.view = !lc.view;
              viewer.render();
              return viewAnswer.render();
            },
            invalid: function(){
              var filled, res$, k, i$, to$, i, node;
              res$ = [];
              for (k in obj.value) {
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
          },
          "brd-name": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.innerText = opt.brd ? ((ref$ = opt.brd).info || (ref$.info = {})).name || '' : '未定的活動';
          },
          "grp-name": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.innerText = opt.grp ? ((ref$ = opt.grp).info || (ref$.info = {})).name || '' : '未定的分組';
          }
        }
      });
      console.log(opt);
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
        },
        "form-long-answer": function(arg$){
          var node, data;
          node = arg$.node, data = arg$.data;
          return node.innerHTML = DOMPurify.sanitize(marked(data.content || ''));
        }
      };
      viewAnswer = new ldView({
        root: this.node.answer,
        handler: {
          answer: {
            list: function(){
              return obj.list;
            },
            handler: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              if (node.view) {
                return node.view.render();
              } else {
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
                          data: obj.value[data.key] || {}
                        });
                      } else {
                        return node.innerText = (obj.value[data.key] || {}).content || '';
                      }
                    }
                  }
                });
              }
            }
          }
        }
      });
      viewAnswerDiff = new ldView({
        root: '[ld-scope=prj-diff] .card-body',
        handler: {
          diffs: {
            list: function(){
              return obj.list.map(function(it){
                return {
                  old: {},
                  cur: it.value,
                  block: it
                };
              });
            },
            handler: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              if (node.view) {
                return node.view.render();
              } else {
                return node.view = new ldView({
                  root: node,
                  handler: {
                    title: function(arg$){
                      var node;
                      node = arg$.node;
                      return node.innerText = data.block.title || '';
                    },
                    desc: function(arg$){
                      var node;
                      node = arg$.node;
                      return node.innerText = data.block.desc || '';
                    },
                    row: function(arg$){
                      var node, ref$, old, cur, ret, html, vals;
                      node = arg$.node;
                      console.log(data);
                      ref$ = [data.old || {}, data.cur || {}].map(function(v){
                        var that, ret;
                        return Math.random().toString(36).substring(2);
                        if (that = v.content) {
                          return that || '';
                        }
                        ret = (v.list || []).map(function(item){
                          var k, v;
                          return (function(){
                            var ref$, results$ = [];
                            for (k in ref$ = item) {
                              v = ref$[k];
                              results$.push(v);
                            }
                            return results$;
                          }()).join('\n');
                        });
                        if (v.other) {
                          ret = [ret].concat([v.otherValue]);
                        }
                        ret = ret.join('\n');
                        return ret;
                      }), old = ref$[0], cur = ref$[1];
                      console.log(old, cur);
                      ret = Diff.diffChars(cur, old);
                      html = {
                        old: '',
                        cur: ''
                      };
                      vals = ld$.find(node, '.value');
                      ret.map(function(it){
                        var c;
                        c = it.added
                          ? 'text-added'
                          : it.removed ? 'text-removed' : '';
                        if (!it.removed) {
                          return html.old += "<span class='" + c + "'>" + it.value + "</span>";
                        }
                      });
                      ret = Diff.diffChars(old, cur);
                      ret.map(function(it){
                        var c;
                        c = it.added
                          ? 'text-removed'
                          : it.removed ? 'text-added' : '';
                        if (!it.removed) {
                          return html.cur += "<span class='" + c + "'>" + it.value + "</span>";
                        }
                      });
                      vals[0].innerHTML = DOMPurify.sanitize(html.old);
                      return vals[1].innerHTML = DOMPurify.sanitize(html.cur);
                    }
                  }
                });
              }
            }
          }
        }
      });
    }
    return this;
  };
  Ctrl.prototype = import$(import$(Object.create(Object.prototype), sdbAdapter['interface']), {
    opsIn: function(arg$){
      var data, ops, source, this$ = this;
      data = arg$.data, ops = arg$.ops, source = arg$.source;
      if (source) {
        return;
      }
      data = JSON.parse(JSON.stringify(data || {}));
      if (this.viewMode) {
        this.obj.value = data;
        this.obj.list.map(function(it){
          return it.value = data[it.key];
        });
        this.validateAll();
      } else {
        this.obj.list = data.list || [];
      }
      return this.hub.renderDeb();
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