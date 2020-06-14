// Generated by LiveScript 1.3.0
ldc.register('prjFormBlock', ['ldcvmgr', 'error', 'prjFormCriteria'], function(arg$){
  var ldcvmgr, error, prjFormCriteria, schema, settext, module, moduleFile, moduleList, moduleTextarea, purpose, k, v, Ctrl;
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
              var ref$, fd, i$, to$, i;
              if (this$.block.name === 'form-thubmnail') {
                files = files.filter(function(it){
                  return /^image\//.exec(it.type) && /\.(gif|png|jpg|jpeg)$/.exec(it.name);
                });
              }
              node.value = '';
              if (!files.length) {
                return;
              }
              if (files.filter(function(it){
                return it.file && it.file.size >= 10485760;
              }).length) {
                return ldcvmgr.toggle('error-413');
              }
              if (files.length + (((ref$ = this$.block).value || (ref$.value = {})).list || []).length > 10) {
                return ldcvmgr.toggle('error-413');
              }
              fd = new FormData();
              for (i$ = 0, to$ = files.length; i$ < to$; ++i$) {
                i = i$;
                fd.append("file[]", files[i].file);
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
              }).then(function(retFiles){
                var curList, ref$, ref1$, newList;
                retFiles == null && (retFiles = []);
                if (!(retFiles && retFiles.length)) {
                  return;
                }
                curList = (ref$ = (ref1$ = this$.block).value || (ref1$.value = {})).list || (ref$.list = []);
                newList = files.map(function(d, i){
                  var retFile, ref$;
                  retFile = retFiles.filter(function(it){
                    return it.name === d.file.name;
                  })[0];
                  if (!retFile) {
                    return null;
                  }
                  return ref$ = {
                    key: suuid()
                  }, ref$.name = retFile.name, ref$.size = retFile.size, ref$.type = retFile.type, ref$.ext = retFile.ext, ref$.fn = retFile.fn, ref$;
                }).filter(function(it){
                  return it;
                }).filter(function(f){
                  return curList.filter(function(it){
                    return it.name === f.name && it.fn === f.fn;
                  }).length === 0;
                });
                if (this$.block.name === 'form-thumbnail') {
                  this$.block.value.list.splice(0);
                }
                (ref$ = this$.block.value).list = ref$.list.concat(newList);
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
                action: {
                  click: {
                    'delete': function(arg$){
                      var node, context, list, ref$, idx;
                      node = arg$.node, context = arg$.context;
                      list = (ref$ = this$.block.value).list || (ref$.list = []);
                      idx = list.indexOf(context);
                      if (~idx) {
                        list.splice(idx, 1);
                      }
                      view.render();
                      return this$.update();
                    }
                  }
                },
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
  module["form-checkpoint"] = {
    moduleInit: function(){
      var ref$, view, this$ = this;
      if (this.viewing) {
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
                title: "",
                desc: "",
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
              return this$.block.data || [];
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
                  date: function(arg$){
                    var node;
                    node = arg$.node;
                    if (this$.viewing) {
                      return tail.DateTime(node);
                    }
                  }
                },
                action: {
                  input: {
                    input: function(arg$){
                      var node, ref$;
                      node = arg$.node;
                      data[node.getAttribute('data-name')] = node.value;
                      ((ref$ = this$.block).value || (ref$.value = {})).list = this$.block.data;
                      return this$.update();
                    }
                  },
                  click: {
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
                  input: function(arg$){
                    var node;
                    node = arg$.node;
                    return node.value = data[node.getAttribute('data-name')] || '';
                  }
                }
              });
            }
          }
        }
      });
    }
  };
  moduleList = {
    moduleInit: function(){
      var view, this$ = this;
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
                return node.removeAttribute('draggable');
              }
            },
            action: {
              click: !this.viewing
                ? function(){}
                : function(arg$){
                  var node, data, evt, isRadio, val, ref$, ison, list;
                  node = arg$.node, data = arg$.data, evt = arg$.evt;
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
                  date: function(arg$){
                    var node;
                    node = arg$.node;
                    if (this$.viewing) {
                      return tail.DateTime(node);
                    }
                  },
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
                      data[node.getAttribute('data-name')] = editableInput(node);
                      return this$.update();
                    }
                  },
                  click: {
                    "other-enabled": function(arg$){
                      var node, evt, ref$;
                      node = arg$.node, evt = arg$.evt;
                      ((ref$ = this$.block).config || (ref$.config = {})).otherEnabled = !((ref$ = this$.block).config || (ref$.config = {})).otherEnabled;
                      node.classList.toggle('on', ((ref$ = this$.block).config || (ref$.config = {})).otherEnabled);
                      this$.update();
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
                    var node, ref$;
                    node = arg$.node;
                    node.classList.toggle('d-none', this$.viewing || !data.other);
                    return node.classList.toggle('on', ((ref$ = this$.block).config || (ref$.config = {})).otherEnabled);
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
    "form-checkbox": moduleList
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
  module["form-datetime"] = {
    moduleInit: function(){
      var view, this$ = this;
      return this.view.module = view = new ldView({
        root: this.root,
        action: {
          change: {
            "input-field": function(arg$){
              var node, local, names, n, ref$;
              node = arg$.node, local = arg$.local, names = arg$.names;
              n = in$('start', names) ? 'start' : 'end';
              ((ref$ = this$.block).value || (ref$.value = {}))[n] = node.value;
              return this$.update();
            }
          },
          click: {
            "range-enabled": function(arg$){
              var node, evt, ref$;
              node = arg$.node, evt = arg$.evt;
              ((ref$ = this$.block).config || (ref$.config = {})).rangeEnabled = !((ref$ = this$.block).config || (ref$.config = {})).rangeEnabled;
              node.classList.toggle('on', ((ref$ = this$.block).config || (ref$.config = {})).rangeEnabled);
              this$.update();
              return this$.render();
            }
          }
        },
        init: {
          "input-field": function(arg$){
            var node, local;
            node = arg$.node, local = arg$.local;
            if (this$.viewing) {
              return tail.DateTime(node);
            }
          }
        },
        handler: {
          "input-field": function(arg$){
            var node, names, ref$;
            node = arg$.node, names = arg$.names;
            return node.value = in$('start', names)
              ? ((ref$ = this$.block).value || (ref$.value = {})).start
              : ((ref$ = this$.block).value || (ref$.value = {})).end;
          },
          "is-range": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.classList.toggle('d-none', !((ref$ = this$.block).config || (ref$.config = {})).rangeEnabled);
          },
          "range-enabled": function(arg$){
            var node, ref$;
            node = arg$.node;
            return node.classList.toggle('on', ((ref$ = this$.block).config || (ref$.config = {})).rangeEnabled);
          }
        }
      });
    }
  };
  module["form-tag"] = {
    moduleInit: function(){
      var view, this$ = this;
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
            local.tagify = new Tagify(node, {
              delimiters: /[,.:;，。：； ]/
            });
            return local.tagify.addTags(((ref$ = this$.block).value || (ref$.value = {})).list || []);
          }
        }
      });
    }
  };
  purpose = {
    map: {
      title: {
        name: "標題",
        block: ['form-short-answer']
      },
      description: {
        name: "簡介",
        block: ['form-short-answer', 'form-long-answer']
      },
      thumb: {
        name: "縮圖",
        block: ['form-thumbnail']
      },
      tag: {
        name: "標籤",
        block: ['form-radio']
      },
      category: {
        name: "分類",
        block: ['form-tag']
      },
      teamname: {
        name: "團隊名",
        block: ['form-short-answer']
      },
      uid: {
        name: "統編",
        block: ['form-short-answer']
      }
    },
    match: function(p, b){
      return in$(b.name, p.block || []);
    }
  };
  purpose.list = (function(){
    var ref$, results$ = [];
    for (k in ref$ = purpose.map) {
      v = ref$[k];
      results$.push([k, v]);
    }
    return results$;
  }()).map(function(it){
    return import$({
      key: it[0]
    }, it[1]);
  });
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
            this$.block.title = editableInput(node);
            return this$.update();
          },
          desc: function(arg$){
            var node, evt;
            node = arg$.node, evt = arg$.evt;
            this$.block.desc = editableInput(node);
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
        purpose: {
          list: function(){
            var ret;
            ret = purpose.list.filter(function(it){
              return purpose.match(it, this$.block);
            });
            if (!ret.length) {
              ret = [{
                name: "無適合用途"
              }];
            }
            return ret;
          },
          action: {
            click: function(arg$){
              var node, data, ref$, v, k;
              node = arg$.node, data = arg$.data;
              if (!purpose.match(data, this$.block)) {
                return;
              }
              ((ref$ = this$.form).purpose || (ref$.purpose = {}))[data.key] = v = ((ref$ = this$.form).purpose || (ref$.purpose = {}))[data.key] === this$.block.key
                ? null
                : this$.block.key;
              if (v) {
                for (k in this$.form.purpose) {
                  if (k !== data.key && this$.form.purpose[k] === v) {
                    this$.form.purpose[k] = null;
                  }
                }
              }
              this$.update();
              return this$.view.block.render();
            }
          },
          handler: function(arg$){
            var node, data, ref$;
            node = arg$.node, data = arg$.data;
            ld$.find(node, '.flex-grow-1', 0).innerText = data.name;
            node.classList.toggle('disabled', !purpose.match(data, this$.block));
            return ld$.find(node, 'i', 0).classList.toggle('d-none', ((ref$ = this$.form).purpose || (ref$.purpose = {}))[data.key] !== this$.block.key);
          }
        },
        "purpose-menu": function(arg$){
          var node, n, k, v, btn;
          node = arg$.node;
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
            return purpose.map[it.k].name;
          }).join(' / ');
          return btn = ld$.find(node, '.btn', 0).innerText = !n
            ? '用途'
            : n + "";
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
          var node, ref$;
          node = arg$.node;
          settext(node, this$.block.desc || '');
          if (this$.viewing) {
            node.removeAttribute('editable');
          }
          if (this$.viewing && !((ref$ = this$.block).config || (ref$.config = {}))["show-desc"]) {
            return node.classList.add('d-none');
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