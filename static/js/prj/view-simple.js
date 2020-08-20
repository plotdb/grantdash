// Generated by LiveScript 1.3.0
ldc.register('prjViewSimple', [], function(){
  var Ctrl;
  Ctrl = function(opt){
    var root, getAnswer, this$ = this;
    this.root = root = typeof opt.root === 'string'
      ? document.querySelector(opt.root)
      : opt.root;
    this.form = opt.form;
    this.answer = opt.answer;
    this.prj = opt.prj;
    this.brd = opt.brd;
    this.org = opt.org;
    getAnswer = function(block){
      return this$.answer[block.key] || block.value;
    };
    this.view = new ldView({
      root: root,
      handler: {
        item: {
          list: function(){
            return this$.form.list;
          },
          init: function(arg$){
            var node, local, data;
            node = arg$.node, local = arg$.local, data = arg$.data;
            return local.view = new ldView({
              context: data,
              root: node,
              handler: {
                title: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  return node.innerText = context.title;
                },
                desc: function(arg$){
                  var node, context;
                  node = arg$.node, context = arg$.context;
                  node.classList.toggle('d-none', !context.config["show-desc"]);
                  return node.innerText = context.desc;
                },
                content: function(arg$){
                  var node, context, ans, ret;
                  node = arg$.node, context = arg$.context;
                  ans = getAnswer(context);
                  ret = Ctrl.render({
                    block: context,
                    answer: ans,
                    prj: this$.prj,
                    org: this$.org
                  });
                  node.classList.toggle('empty', !ret);
                  return node.innerHTML = DOMPurify.sanitize(ret, {
                    ADD_ATTR: ['target']
                  });
                }
              }
            });
          },
          handler: function(arg$){
            var local, data;
            local = arg$.local, data = arg$.data;
            local.view.setContext(data);
            return local.view.render();
          }
        }
      }
    });
    return this;
  };
  Ctrl.prototype = import$(Object.create(Object.prototype), {
    update: function(arg$){
      var form, answer, prj;
      form = arg$.form, answer = arg$.answer, prj = arg$.prj;
      this.form = form;
      this.answer = answer;
      this.prj = prj;
      return this.render();
    },
    render: function(){
      return this.view.render();
    }
  });
  Ctrl.render = function(arg$){
    var block, answer, prj, brd, org, result, start, end, ref$, ret, list, sheet, total, subsidy, percent, data;
    block = arg$.block, answer = arg$.answer, prj = arg$.prj, brd = arg$.brd, org = arg$.org;
    result = {};
    if (!(block && answer)) {
      return;
    }
    if (answer.content) {
      result = answer.useMarkdown
        ? DOMPurify.sanitize(marked(answer.content || ''))
        : htmlentities(answer.content || '');
    } else if (answer.start) {
      start = moment(answer.start).format("YYYY-MM-DD hh:mm:ss");
      end = moment(answer.end).format("YYYY-MM-DD hh:mm:ss");
      result = (block.config || (block.config = {})).rangeEnabled ? start + " - " + end : start;
    } else if (answer.list) {
      if ((ref$ = block.name) === 'form-file' || ref$ === 'form-thumbnail') {
        ret = (answer.list || []).map(function(f){
          return "<li><a href=\"/dash/org/" + org + "/prj/" + prj + "/upload/" + f.fn + "?id=" + Math.random().toString(36).substring(2) + "\"\ntarget=\"_blank\" rel=\"noopener noreferrer\">\n" + htmlentities(f.name) + "\n</a></li>";
        }).join('');
        result = DOMPurify.sanitize(ret, {
          ADD_ATTR: ['target']
        });
      } else if (block.name === 'form-checkpoint') {
        ret = (answer.list || []).map(function(d){
          return "<div class=\"item\"><div class=\"fields mb-4\">\n<div class=\"d-flex align-items-end mb-2\">\n  <h4 class=\"mb-0 mr-2\">" + htmlentities(d.title) + "</h4>\n  <p class=\"text-muted text-sm mb-0\">" + htmlentities(d.date) + "</p>\n</div>\n<p>" + htmlentities(d.desc) + "</p>\n</div></div>";
        }).join('');
        result = "<div class=\"form-block mt-4 p-2\"><div class=\"timeline-list\">" + DOMPurify.sanitize(ret) + "</div></div>";
      } else {
        list = answer.list.concat(answer.otherValue && answer.other
          ? [answer.otherValue]
          : []);
        result = DOMPurify.sanitize(list.join("<br>"));
      }
    } else if (block.name === 'form-budget') {
      sheet = JSON.parse(JSON.stringify(answer.sheet));
      sheet.map(function(it){
        return it.push(+it[2] + +it[3]);
      });
      total = sheet.reduce(function(a, b){
        return a + +b[4];
      }, 0);
      subsidy = sheet.reduce(function(a, b){
        return a + +b[3];
      }, 0);
      percent = (Math.round(1000 * subsidy / (total || 1)) / 10 + "").replace("(.d)d*", "$1");
      sheet = sheet.map(function(it){
        var ret;
        if (!it.filter(function(it){
          return it;
        }).length) {
          return;
        }
        ret = it.map(function(it){
          return "<td>" + (it || ' ') + "</td>";
        }).join('');
        return "<tr>" + ret + "</tr>";
      }).filter(function(it){
        return it;
      }).join('');
      data = "<table class='mb-2 form-budget-table'><tr>\n<th rowspan=\"2\">分類</th>\n<th rowspan=\"2\">項目</th>\n<th colspan=\"3\">預估</th>\n</tr>\n<tr><th>自籌</th><th>補助</th><th>總計</th></tr>\n" + sheet + "\n</table>\n<div class=\"d-flex justify-content-between\">\n<div><span class=\"text-muted text-sm\">總金額</span>\n     <span class=\"font-weight-bold\">" + total + "</span>\n     <span class=\"text-muted text-sm\">元</span></div>\n<div><span class=\"text-muted text-sm\">補助金額</span>\n     <span class=\"font-weight-bold\">" + subsidy + "</span>\n     <span class=\"text-muted text-sm\">元</span></div>\n<div><span class=\"text-muted text-sm\">補助比例</span>\n     <span class=\"font-weight-bold\">" + percent + "</span>\n     <span class=\"text-muted text-sm\">%</span></div>\n</div>";
      result = DOMPurify.sanitize(data);
    } else {
      result = '';
    }
    return result;
  };
  return Ctrl;
});
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}