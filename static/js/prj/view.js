// Generated by LiveScript 1.3.0
ldc.register('prjView', ['auth', 'error', 'stage', 'viewLocals', 'discussView', 'discussEdit'], function(arg$){
  var auth, error, stage, discussView, discussEdit, viewLocals, lc, prj, brd, grp;
  auth = arg$.auth, error = arg$.error, stage = arg$.stage, discussView = arg$.discussView, discussEdit = arg$.discussEdit, viewLocals = arg$.viewLocals;
  lc = {};
  prj = viewLocals.prj, brd = viewLocals.brd, grp = viewLocals.grp;
  return auth.get().then(function(g){
    lc.global = g;
    return stage.get({
      brd: brd.slug
    });
  }).then(function(ret){
    var answers, ref$, blocks, bhash, discuss, view;
    ret == null && (ret = {});
    lc.stage = ret.config || {};
    answers = (ref$ = prj.detail || (prj.detail = {})).answer || (ref$.answer = {});
    blocks = (ref$ = grp.form || (grp.form = {})).list || (ref$.list = []);
    bhash = {};
    blocks.map(function(it){
      return bhash[it.key] = it;
    });
    discuss = new discussView({
      root: '[ld-scope=discuss]'
    });
    discuss.init();
    view = new ldView({
      global: true,
      root: document.body,
      handler: {
        "stage-ctrl": function(arg$){
          var node, n;
          node = arg$.node;
          n = node.getAttribute('data-name');
          return node.classList.toggle('d-none', !lc.stage[n]);
        }
      }
    });
    return view = new ldView({
      root: document.body,
      init: {
        "btn-share": function(arg$){
          var node, local;
          node = arg$.node, local = arg$.local;
          local.clipboard = new ClipboardJS(node, {
            text: function(t){
              return window.location.href;
            }
          });
          return local.clipboard.on('success', function(){
            clearTimeout(local.h);
            node.classList.add('tip-on');
            return local.h = setTimeout(function(){
              return node.classList.remove('tip-on');
            }, 1000);
          });
        }
      },
      handler: {
        "btn-edit": function(arg$){
          var node;
          node = arg$.node;
          return node.classList.toggle('d-none', lc.global.user.key !== viewLocals.owner);
        },
        answer: function(arg$){
          var node, key, block, answer, ref$, ret, list;
          node = arg$.node;
          key = node.getAttribute('data-key');
          block = bhash[key];
          if (!(answer = answers[key] || {}) || !(block = bhash[key])) {
            return;
          }
          if (answer.content) {
            if (answer.useMarkdown) {
              return node.innerHTML = DOMPurify.sanitize(marked(answer.content));
            } else {
              return node.innerText = answer.content;
            }
          } else if (answer.list) {
            if ((ref$ = block.name) === 'form-file' || ref$ === 'form-thumbnail') {
              ret = (answer.list || []).map(function(f){
                return "<li><a href=\"/dash/org/" + brd.org + "/prj/" + prj.slug + "/upload/" + f.path + "\">\n" + htmlentities(f.name) + "\n</a></li>";
              }).join('');
              return node.innerHTML = DOMPurify.sanitize(ret);
            } else if (block.name === 'form-checkpoint') {
              ret = (answer.list || []).map(function(d){
                return "<p><div><b><big>" + htmlentities(d.title) + "</big></b></div>\n<div>" + htmlentities(d.desc) + "</div></p>";
              }).join('');
              return node.innerHTML = "<blockquote style='margin-left:1em'>" + DOMPurify.sanitize(ret) + "</blockquote>";
            } else {
              list = answer.list.concat(answer.otherValue && answer.other
                ? [answer.otherValue]
                : []);
              return node.innerHTML = DOMPurify.sanitize(list.join("<br>"));
            }
          }
        }
      }
    });
  })['catch'](error());
});
ldc.app('prjView');