// Generated by LiveScript 1.3.0
ldc.register('prjFormBlock', ['ldcvmgr', 'error', 'prjFormCriteria'], function(arg$){
  var ldcvmgr, error, prjFormCriteria, schema, settext, module, moduleFile, moduleList, moduleTextarea, purposeType, purposeMatch, Ctrl;
  ldcvmgr = arg$.ldcvmgr, error = arg$.error, prjFormCriteria = arg$.prjFormCriteria;
  schema = prjFormCriteria.schema;
  settext = function(n, v){
    if (n.innerText !== v) {
      return n.innerText = v;
    }
  };
  module = {};
  moduleFile = {
    moduleInit: function(){
      var view, this$ = this;
      if (!this.viewing) {
        return;
      }
      return this.view.module = view = new ldView({
        context: {},
        root: this.root,
        init: {
          "input-file": function(arg$){
            var node, local, context, ldf;
            node = arg$.node, local = arg$.local, context = arg$.context;
            if (this$.block.name === 'form-thumbnail') {
              node.setAttribute('accept', 'image/*');
            }
            context.loading = false;
            local.ldf = ldf = new ldFile({
              root: node
            });
            return ldf.on('load', function(files){
              var fd, i$, to$, i;
              if (this$.block.name === 'form-thubmnail') {
                files = files.filter(function(it){
                  return /^image\//.exec(it.type) && /\.(gif|png|jpg|jpeg)$/.exec(it.name);
                });
              }
              node.value = '';
              if (!files.length) {
                return;
              }
              fd = new FormData();
              if (this$.block.name === 'form-thumbnail') {
                fd.append("thumb[]", files[0].file);
                fd.append("files", JSON.stringify([{
                  name: "thumb",
                  type: "thumb"
                }]));
              } else {
                for (i$ = 0, to$ = files.length; i$ < to$; ++i$) {
                  i = i$;
                  fd.append("file[]", files[i].file);
                }
                fd.append("files", JSON.stringify([{
                  name: "file",
                  type: "form"
                }]));
              }
              fd.append('prj', this$.prj.slug);
              context.loading = true;
              this$.view.module.render();
              return ld$.xhr("/dash/api/upload", {
                method: 'POST',
                body: fd
              }, {
                type: 'json',
                progress: function(arg$){
                  var percent;
                  percent = arg$.percent;
                  context.percent = percent;
                  return this$.view.module.render();
                }
              }).then(function(ret){
                var retFiles, ref$;
                if (!ret[0]) {
                  return;
                }
                retFiles = ret[0].files || [];
                ((ref$ = this$.block).value || (ref$.value = {})).list = files.map(function(d, i){
                  var ref$, ref1$;
                  return ref1$ = {
                    key: i,
                    path: retFiles[i]
                  }, ref1$.name = (ref$ = d.file).name, ref1$.size = ref$.size, ref1$.type = ref$.type, ref1$;
                });
                return this$.update();
              })['finally'](function(){
                return debounce(1000).then(function(){
                  context.loading = false;
                  return this$.view.module.render();
                });
              })['catch'](error());
            });
          }
        },
        handler: {
          loading: function(arg$){
            var context, node;
            context = arg$.context, node = arg$.node;
            return node.classList.toggle('d-none', !context.loading);
          },
          bar: function(arg$){
            var context, node;
            context = arg$.context, node = arg$.node;
            return node.style.width = (context.percent || 0) * 100 + "%";
          },
          "bar-label": function(arg$){
            var context, node;
            context = arg$.context, node = arg$.node;
            return node.innerText = (context.percent || 0) * 100 + "%";
          },
          file: {
            list: function(){
              var ref$, ref1$;
              return (ref$ = (ref1$ = this$.block).value || (ref1$.value = {})).list || (ref$.list = []);
            },
            init: function(arg$){
              var node, data, local;
              node = arg$.node, data = arg$.data, local = arg$.local;
              node.classList.toggle('d-none', false);
              return local.view = new ldView({
                context: data,
                root: node,
                handler: {
                  name: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return node.innerText = context.name;
                  },
                  type: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return node.innerText = context.type;
                  },
                  size: function(arg$){
                    var node, context, mb;
                    node = arg$.node, context = arg$.context;
                    mb = Math.round(10 * data.size / 1048576) / 10;
                    return node.innerText = mb + "MB";
                  }
                }
              });
            },
            handler: function(arg$){
              var node, data, local;
              node = arg$.node, data = arg$.data, local = arg$.local;
              return local.view.render();
            }
          }
        }
      });
    }
  };
  import$(module, {
    "form-file": moduleFile,
    "form-thumbnail": moduleFile
  });
  moduleList = {
    moduleInit: function(){
      var ref$, view, this$ = this;
      if (this.block.name === 'form-checkpoint' && this.viewing) {
        if (!((ref$ = this.block).value || (ref$.value = {})).list) {
          ((ref$ = this.block).value || (ref$.value = {})).list = (ref$ = this.block).data || (ref$.data = []);
        } else {
          this.block.data = this.block.value.list;
        }
        ld$.find(this.root, '.timeline-list', 0).addEventListener('input', function(){
          var ref$;
          ((ref$ = this$.block).value || (ref$.value = {})).list = this$.block.data;
          return this$.update();
        });
      }
      return this.view.module = view = new ldView({
        root: this.root,
        action: {
          click: {
            "list-add": function(){
              var ref$;
              ((ref$ = this$.block).data || (ref$.data = [])).push({
                title: "新項目",
                desc: "關於這個項目的描述 ... ",
                key: suuid()
              });
              this$.update();
              return this$.render();
            }
          }
        },
        handler: {
          list: {
            key: function(it){
              return it.key;
            },
            list: function(){
              var ret, ref$;
              ret = this$.block.data || [];
              if (((ref$ = this$.block).config || (ref$.config = {})).otherEnabled || !this$.viewing) {
                ret = ret.concat([{
                  other: true,
                  key: 'other'
                }]);
              }
              return ret;
            },
            init: function(arg$){
              var node, data, editable;
              node = arg$.node, data = arg$.data;
              editable = node.hasAttribute('data-user-editable');
              if (!editable && this$.viewing) {
                node.removeAttribute('draggable');
              }
              if (data.other && this$.block.name === 'form-checkpoint') {
                return node.classList.add('d-none');
              }
            },
            action: {
              click: !this.viewing
                ? function(){}
                : function(arg$){
                  var node, data, evt, isRadio, val, ref$, ison, list;
                  node = arg$.node, data = arg$.data, evt = arg$.evt;
                  if (this$.block.name === 'form-checkpoint') {
                    return;
                  }
                  if (evt.target.nodeName === 'INPUT') {
                    return;
                  }
                  isRadio = this$.block.name === 'form-radio';
                  val = (ref$ = this$.block).value || (ref$.value = {});
                  if (data.other) {
                    ison = isRadio
                      ? true
                      : !val.other;
                    val.other = ison;
                    if (ison && isRadio) {
                      val.list = [];
                    }
                  } else {
                    list = val.list || [];
                    ison = isRadio
                      ? true
                      : !in$(data.title, list);
                    if (isRadio) {
                      list = [];
                    }
                    if (ison) {
                      list.push(data.title);
                      if (isRadio) {
                        val.other = false;
                      }
                    } else {
                      list.splice(list.indexOf(data.title), 1);
                    }
                    val.list = list;
                  }
                  view.render();
                  return this$.update();
                }
            },
            handler: function(arg$){
              var node, data, editable;
              node = arg$.node, data = arg$.data;
              editable = node.hasAttribute('data-user-editable');
              if (node.view) {
                return node.view.render();
              }
              return node.view = new ldView({
                root: node,
                init: {
                  data: function(arg$){
                    var node;
                    node = arg$.node;
                    node.setAttribute('data-name', node.getAttribute('editable'));
                    if (!editable && this$.viewing) {
                      return node.removeAttribute('editable');
                    }
                  }
                },
                action: {
                  input: {
                    "other-value": function(arg$){
                      var node, ref$;
                      node = arg$.node;
                      return ((ref$ = this$.block).value || (ref$.value = {})).otherValue = node.value;
                    },
                    data: function(arg$){
                      var node;
                      node = arg$.node;
                      return data[node.getAttribute('data-name')] = node.innerText;
                    }
                  },
                  click: {
                    "other-enabled": function(arg$){
                      var node, evt, ref$;
                      node = arg$.node, evt = arg$.evt;
                      ((ref$ = this$.block).config || (ref$.config = {})).otherEnabled = !((ref$ = this$.block).config || (ref$.config = {})).otherEnabled;
                      node.classList.toggle('on');
                      return this$.render();
                    },
                    'delete': function(arg$){
                      var node, evt;
                      node = arg$.node, evt = arg$.evt;
                      this$.block.data.splice(this$.block.data.indexOf(data), 1);
                      this$.update();
                      this$.render();
                      return evt.stopPropagation();
                    }
                  }
                },
                handler: {
                  drag: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.classList.toggle('invisible', !!((this$.viewing && !editable) || data.other));
                  },
                  state: function(arg$){
                    var node, val, ref$, ison;
                    node = arg$.node;
                    val = (ref$ = this$.block).value || (ref$.value = {});
                    ison = (data.other && val.other) || (!data.other && in$(data.title, val.list || (val.list = [])));
                    return node.classList.toggle('active', ison);
                  },
                  "other-value": function(arg$){
                    var node, ref$;
                    node = arg$.node;
                    node.value = ((ref$ = this$.block).value || (ref$.value = {})).otherValue || '';
                    if (((ref$ = this$.block).config || (ref$.config = {})).otherEnabled) {
                      return node.removeAttribute('readonly');
                    } else {
                      return node.setAttribute('readonly', '');
                    }
                  },
                  'delete': function(arg$){
                    var node;
                    node = arg$.node;
                    return node.classList.toggle('d-none', !!((this$.viewing && !editable) || data.other));
                  },
                  "other-enabled": function(arg$){
                    var node;
                    node = arg$.node;
                    return node.classList.toggle('d-none', this$.viewing || !data.other);
                  },
                  other: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.classList.toggle('d-none', !data.other);
                  },
                  data: function(arg$){
                    var node;
                    node = arg$.node;
                    if (data.other) {
                      node.removeAttribute('editable');
                      node.classList.toggle('flex-grow-1', false);
                    }
                    return settext(node, (data.other
                      ? '其它'
                      : data[node.getAttribute('data-name')]) || '');
                  }
                }
              });
            }
          }
        }
      });
    }
  };
  import$(module, {
    "form-radio": moduleList,
    "form-checkbox": moduleList,
    "form-checkpoint": moduleList
  });
  moduleTextarea = {
    moduleInit: function(){
      var view, this$ = this;
      return this.view.module = view = new ldView({
        root: this.root,
        action: {
          input: {
            "use-markdown": function(arg$){
              var node, ref$;
              node = arg$.node;
              ((ref$ = this$.block).value || (ref$.value = {})).useMarkdown = node.checked;
              this$.update();
              return view.render();
            },
            "input-field": function(arg$){
              var node, ref$;
              node = arg$.node;
              ((ref$ = this$.block).value || (ref$.value = {})).content = node.value;
              return this$.update();
            },
            "toggle-preview": function(arg$){
              var node;
              node = arg$.node;
              this$.preview = !!node.checked;
              return view.render();
            }
          }
        },
        handler: {
          "input-field": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.value = ((ref$ = this$.block).value || (ref$.value = {})).content || '';
          },
          "preview-panel": function(arg$){
            var node, ref$;
            node = arg$.node;
            node.classList.toggle('d-none', !this$.preview);
            if (this$.preview) {
              return node.innerHTML = DOMPurify.sanitize(marked(((ref$ = this$.block).value || (ref$.value = {})).content || ''));
            }
          },
          "edit-panel": function(arg$){
            var node;
            node = arg$.node;
            return node.classList.toggle('d-none', !!this$.preview);
          },
          "if-markdown": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.classList.toggle('d-none', !((ref$ = this$.block).value || (ref$.value = {})).useMarkdown);
          }
        }
      });
    }
  };
  import$(module, {
    "form-long-answer": moduleTextarea,
    "form-short-answer": moduleTextarea
  });
  module["form-tag"] = {
    moduleInit: function(){
      var view, this$ = this;
      console.log(1);
      return this.view.module = view = new ldView({
        root: this.root,
        action: {
          change: {
            "input-field": function(arg$){
              var node, local, ref$;
              node = arg$.node, local = arg$.local;
              ((ref$ = this$.block).value || (ref$.value = {})).list = local.tagify.value.map(function(it){
                return it.value;
              });
              return this$.update();
            }
          }
        },
        init: {
          "input-field": function(arg$){
            var node, local, ref$;
            node = arg$.node, local = arg$.local;
            local.tagify = new Tagify(node);
            return local.tagify.addTags(((ref$ = this$.block).value || (ref$.value = {})).list || []);
          }
        }
      });
    }
  };
  purposeType = {
    title: ['form-short-answer'],
    description: ['form-short-answer', 'form-long-answer'],
    thumb: ['form-thumbnail'],
    category: ['form-radio'],
    tag: ['form-tag']
  };
  purposeMatch = function(name, blockName){
    return in$(blockName, purposeType[name]);
  };
  Ctrl = function(opt){
    var root, this$ = this;
    this.opt = opt;
    this.viewing = opt.viewMode;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.hub = opt.hub;
    this.prj = opt.prj;
    this.view = this.root.view = {};
    this.block = opt.data;
    this.form = opt.form || {};
    this.view.block = new ldView({
      root: root,
      action: {
        input: {
          title: function(arg$){
            var node, evt;
            node = arg$.node, evt = arg$.evt;
            this$.block.title = node.innerText;
            return this$.update();
          },
          desc: function(arg$){
            var node, evt;
            node = arg$.node, evt = arg$.evt;
            this$.block.desc = node.innerText;
            return this$.update();
          }
        },
        click: {
          'switch': function(arg$){
            var node, evt, ref$;
            node = arg$.node, evt = arg$.evt;
            node.classList.toggle('on');
            ((ref$ = this$.block).config || (ref$.config = {}))[node.getAttribute('data-name')] = node.classList.contains('on');
            return this$.update();
          },
          'delete': function(arg$){
            var node, evt;
            node = arg$.node, evt = arg$.evt;
            return this$['delete']();
          },
          clone: function(arg$){
            var node, evt;
            node = arg$.node, evt = arg$.evt;
            return this$.clone();
          },
          "move-up": function(){
            return this$.move(-1);
          },
          "move-down": function(){
            return this$.move(1);
          },
          purpose: function(arg$){
            var node, n, ref$, v, k;
            node = arg$.node;
            n = node.getAttribute('data-name');
            if (!purposeMatch(n, this$.block.name)) {
              return;
            }
            ((ref$ = this$.form).purpose || (ref$.purpose = {}))[n] = v = ((ref$ = this$.form).purpose || (ref$.purpose = {}))[n] === this$.block.key
              ? null
              : this$.block.key;
            if (v) {
              for (k in this$.form.purpose) {
                if (k !== n && this$.form.purpose[k] === v) {
                  this$.form.purpose[k] = null;
                }
              }
            }
            this$.update();
            return this$.view.block.render();
          }
        }
      },
      init: {
        "purpose-menu": function(arg$){
          var node;
          node = arg$.node;
          return new Dropdown(node);
        }
      },
      handler: {
        "purpose-menu": function(arg$){
          var node, map, n, k, v, btn;
          node = arg$.node;
          map = {
            title: "標題",
            description: "簡介",
            thumb: "縮圖",
            category: "分類",
            tag: "標籤"
          };
          n = (function(){
            var ref$, ref1$, results$ = [];
            for (k in ref$ = (ref1$ = this.form).purpose || (ref1$.purpose = {})) {
              v = ref$[k];
              results$.push({
                k: k,
                v: v
              });
            }
            return results$;
          }.call(this$)).filter(function(it){
            return it.v === this$.block.key;
          }).map(function(it){
            return map[it.k];
          }).join(' / ');
          btn = ld$.find(node, '.btn', 0);
          return btn.innerText = !n
            ? '用途'
            : n + "";
        },
        purpose: function(arg$){
          var node, n, ref$;
          node = arg$.node;
          n = node.getAttribute('data-name');
          node.classList.toggle('disabled', !purposeMatch(n, this$.block.name));
          return ld$.find(node, 'i', 0).classList.toggle('d-none', ((ref$ = this$.form).purpose || (ref$.purpose = {}))[n] !== this$.block.key);
        },
        invalid: function(arg$){
          var node, isValid, ref$;
          node = arg$.node;
          isValid = !(((ref$ = this$.block).valid || (ref$.valid = {})).result != null) || this$.block.valid.result;
          if (!isValid) {
            settext(node, this$.block.valid.criteria.invalid || "這個欄位格式不符");
          }
          return node.classList.toggle('d-none', isValid);
        },
        block: function(arg$){
          var node, isValid, ref$;
          node = arg$.node;
          isValid = !(((ref$ = this$.block).valid || (ref$.valid = {})).result != null) || this$.block.valid.result;
          return node.classList.toggle('invalid', !isValid);
        },
        title: function(arg$){
          var node;
          node = arg$.node;
          settext(node, this$.block.title || '');
          if (this$.viewing) {
            return node.removeAttribute('editable');
          }
        },
        desc: function(arg$){
          var node;
          node = arg$.node;
          settext(node, this$.block.desc || '');
          if (this$.viewing) {
            return node.removeAttribute('editable');
          }
        },
        'switch': function(arg$){
          var node, ref$;
          node = arg$.node;
          return node.classList.toggle('on', !!((ref$ = this$.block).config || (ref$.config = {}))[node.getAttribute('data-name')]);
        },
        "edit-only": function(arg$){
          var node;
          node = arg$.node;
          if (this$.viewing) {
            return node.remove();
          }
        },
        "list-input": function(arg$){
          var node;
          node = arg$.node;
          return node.setAttribute('name', "input-" + this$.block.key);
        }
      }
    });
    if (!this.viewing) {
      this.view.criteria = new ldView({
        root: this.root,
        action: {
          click: {
            add: function(){
              var ref$;
              ((ref$ = this$.block).criteria || (ref$.criteria = [])).push({
                type: 'number'
              });
              return this$.view.criteria.render();
            }
          }
        },
        handler: {
          "has-criteria": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.classList.toggle('d-none', !((ref$ = this$.block).criteria || (ref$.criteria = [])).length);
          },
          criteria: {
            list: function(){
              var ref$;
              return (ref$ = this$.block).criteria || (ref$.criteria = []);
            },
            action: {
              click: function(arg$){
                var node, data, evt, local, n;
                node = arg$.node, data = arg$.data, evt = arg$.evt, local = arg$.local;
                if (!(n = ld$.parent(evt.target, '.dropdown-item', node))) {
                  return;
                }
                if (n.type) {
                  data.type = n.type;
                }
                if (n.op) {
                  data.op = n.op;
                }
                this$.update();
                return local.view.render();
              }
            },
            init: function(arg$){
              var node, data, local, getType, getOp;
              node = arg$.node, data = arg$.data, local = arg$.local;
              getType = function(){
                return data.type || schema.support[this$.block.name][0] || 'number';
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
              return local.view = new ldView({
                context: data,
                root: node,
                action: {
                  click: {
                    enabled: function(arg$){
                      var node, context;
                      node = arg$.node, context = arg$.context;
                      node.classList.toggle('on');
                      context.enabled = node.classList.contains('on');
                      this$.update();
                      return local.view.render();
                    }
                  },
                  input: {
                    input1: function(arg$){
                      var node, context;
                      node = arg$.node, context = arg$.context;
                      context.input1 = ld$.find(node, 'input', 0).value;
                      return this$.update();
                    },
                    input2: function(arg$){
                      var node, context;
                      node = arg$.node, context = arg$.context;
                      context.input2 = ld$.find(node, 'input', 0).value;
                      return this$.update();
                    },
                    "input-invalid": function(arg$){
                      var node, context;
                      node = arg$.node, context = arg$.context;
                      context.invalid = node.value;
                      return this$.update();
                    }
                  }
                },
                handler: {
                  enabled: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    return node.classList.toggle('on', !!context.enabled);
                  },
                  input1: function(arg$){
                    var node, context, input;
                    node = arg$.node, context = arg$.context;
                    input = ld$.find(node, 'input', 0);
                    input.value = context.input1 || '';
                    if (context.enabled) {
                      return input.removeAttribute('disabled');
                    } else {
                      return input.setAttribute('disabled', '');
                    }
                  },
                  input2: function(arg$){
                    var node, context, input;
                    node = arg$.node, context = arg$.context;
                    node.classList.toggle('d-none', (getOp().field || 1) < 2);
                    input = ld$.find(node, 'input', 0);
                    input.value = context.input2 || '';
                    if (context.enabled) {
                      return input.removeAttribute('disabled');
                    } else {
                      return input.setAttribute('disabled', '');
                    }
                  },
                  "input-invalid": function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    if (context.enabled) {
                      node.removeAttribute('disabled');
                    } else {
                      node.setAttribute('disabled', '');
                    }
                    return node.value = context.invalid || '';
                  },
                  type: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    node.classList.toggle('disabled', !context.enabled);
                    return settext(node, schema.types[getType()].name);
                  },
                  op: function(arg$){
                    var node, context;
                    node = arg$.node, context = arg$.context;
                    node.classList.toggle('disabled', !context.enabled);
                    return node.innerHTML = getOp().name;
                  },
                  "types": {
                    list: function(){
                      return schema.support[this$.block.name];
                    },
                    handler: function(arg$){
                      var node, data;
                      node = arg$.node, data = arg$.data;
                      settext(node, schema.types[data].name);
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
              var node, data, local;
              node = arg$.node, data = arg$.data, local = arg$.local;
              local.view.setContext(data);
              return local.view.render();
            }
          }
        }
      });
    }
    if (module[this.block.name]) {
      this.moduleInit = module[this.block.name].moduleInit;
      this.moduleInit();
    }
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    setData: function(it){
      return this.block = it;
    },
    render: function(){
      this.view.block.render();
      if (this.view.module) {
        this.view.module.render();
      }
      if (this.view.criteria) {
        return this.view.criteria.render();
      }
    },
    update: function(){
      return this.hub.update(this.block);
    },
    'delete': function(){
      return this.hub['delete'](this.block);
    },
    clone: function(){
      return this.hub.clone(this.block);
    },
    move: function(dir){
      return this.hub.move(this.block, dir);
    },
    schema: schema
  });
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}
function in$(x, xs){
  var i = -1, l = xs.length >>> 0;
  while (++i < l) if (x === xs[i]) return true;
  return false;
}