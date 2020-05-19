// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('prjFormCriteria', [], function(){
    var schema, render;
    schema = {
      types: {
        "number": {
          name: "數值",
          ops: "number"
        },
        "string": {
          name: "文字",
          ops: "string"
        },
        "length": {
          name: "長度",
          ops: "count"
        },
        "regex": {
          name: "正規式",
          ops: "regex"
        },
        "count": {
          name: "選項數",
          ops: "count"
        },
        "file-size": {
          name: "檔案大小",
          ops: "smaller"
        },
        "file-format": {
          name: "檔案格式",
          ops: "extension"
        },
        "file-count": {
          name: "檔案數量",
          ops: "count"
        }
      },
      ops: {
        extension: {
          "extension": {
            name: "副檔名"
          }
        },
        regex: {
          "match": {
            name: "符合"
          },
          "not-match": {
            name: "不符"
          }
        },
        count: {
          "gte": {
            name: '<div class="s mr-2">&#x2265;</div> 大於或等於'
          },
          "lte": {
            name: '<div class="s mr-2">&#x2264;</div> 小於或等於'
          },
          "eq": {
            name: '<div class="s mr-2">=</div> 等於'
          },
          "between": {
            name: '<div class="s mr-2">&#x223c;</div> 介於',
            field: 2
          }
        },
        string: {
          "include": {
            name: "包含"
          },
          "exclude": {
            name: "不包含"
          },
          "email": {
            name: "電子郵件位置"
          },
          "url": {
            name: "網址"
          }
        },
        number: {
          "gte": {
            name: '<div class="s mr-2">&#x2265;</div> 大於或等於'
          },
          "lte": {
            name: '<div class="s mr-2">&#x2264;</div> 小於或等於'
          },
          "ge": {
            name: '<div class="s mr-2">&gt;</div> 大於'
          },
          "le": {
            name: '<div class="s mr-2">&lt;</div> 小於'
          },
          "eq": {
            name: '<div class="s mr-2">=</div> 等於'
          },
          "ne": {
            name: '<div class="s mr-2">&#x2260;</div> 不等於'
          },
          "between": {
            name: '<div class="s mr-2">&#x223c;</div> 介於',
            field: 2
          }
        },
        smaller: {
          "lte": {
            name: '<div class="s mr-2">&lt;</div> 小於'
          }
        }
      },
      support: {
        'form-short-answer': ['number', 'string', 'length', 'regex'],
        'form-long-answer': ['string', 'length', 'regex'],
        'form-radio': [],
        'form-checkbox': ['count'],
        'form-file': ['file-size', 'file-formt', 'file-count'],
        'form-budget': ['count'],
        'form-checkpoint': ['count']
      }
    };
    render = function(arg$){
      var node, data, rootData, view;
      node = arg$.node, data = arg$.data;
      rootData = data;
      return (node.view || (node.view = {})).criteria = view = new ldView({
        root: node,
        action: {
          click: {
            add: function(){
              (data.criteria || (data.criteria = [])).push({
                type: 'number'
              });
              return view.render();
            }
          }
        },
        handler: {
          criteria: {
            list: function(){
              return data.criteria || (data.criteria = []);
            },
            action: {
              click: function(arg$){
                var node, data, evt, n;
                node = arg$.node, data = arg$.data, evt = arg$.evt;
                if (!(n = ld$.parent(evt.target, '.dropdown-item', node))) {
                  return;
                }
                if (n.type) {
                  data.type = n.type;
                }
                if (n.op) {
                  data.op = n.op;
                }
                return node.view.render();
              }
            },
            init: function(arg$){
              var node, data, getType, getOp;
              node = arg$.node, data = arg$.data;
              getType = function(){
                return data.type || schema.support[rootData.name][0] || 'number';
              };
              getOp = function(){
                var ops, v, k;
                ops = schema.ops[schema.types[getType()].ops];
                v = (function(){
                  var ref$, results$ = [];
                  for (k in ref$ = ops) {
                    v = ref$[k];
                    results$.push(v);
                  }
                  return results$;
                }())[0];
                return ops[data.op] || v || {
                  name: ""
                };
              };
              ld$.find(node, '.dropdown .dropdown-toggle').map(function(it){
                return new Dropdown(it);
              });
              return node.view = new ldView({
                root: node,
                action: {
                  input: {
                    input1: function(arg$){
                      var node;
                      node = arg$.node;
                      return data.input1 = ld$.find(node, 'input', 0).value;
                    },
                    input2: function(arg$){
                      var node;
                      node = arg$.node;
                      return data.input2 = ld$.find(node, 'input', 0).value;
                    },
                    invalid: function(arg$){
                      var node;
                      node = arg$.node;
                      return data.invalid = node.value;
                    }
                  }
                },
                handler: {
                  input1: function(arg$){
                    var node;
                    node = arg$.node;
                    return ld$.find(node, 'input', 0).value = data.input1 || '';
                  },
                  input2: function(arg$){
                    var node;
                    node = arg$.node;
                    node.classList.toggle('d-none', (getOp().field || 1) < 2);
                    return ld$.find(node, 'input', 0).value = data.input2 || '';
                  },
                  invalid: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.value = data.invalid || '';
                  },
                  type: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.innerText = schema.types[getType()].name;
                  },
                  op: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.innerHTML = getOp().name;
                  },
                  "types": {
                    list: function(){
                      return schema.support[rootData.name];
                    },
                    handler: function(arg$){
                      var node, data;
                      node = arg$.node, data = arg$.data;
                      node.innerText = schema.types[data].name;
                      return node.type = data;
                    }
                  },
                  "ops": {
                    list: function(){
                      var k, ref$, v, results$ = [];
                      for (k in ref$ = schema.ops[schema.types[getType()].ops]) {
                        v = ref$[k];
                        results$.push([k, v]);
                      }
                      return results$;
                    },
                    handler: function(arg$){
                      var node, data;
                      node = arg$.node, data = arg$.data;
                      node.innerHTML = data[1].name;
                      return node.op = data[0];
                    }
                  }
                }
              });
            },
            handler: function(arg$){
              var node, data;
              node = arg$.node, data = arg$.data;
              if (node.view) {
                return node.view.render();
              }
            }
          }
        }
      });
    };
    return {
      render: render,
      schema: schema
    };
  });
})();