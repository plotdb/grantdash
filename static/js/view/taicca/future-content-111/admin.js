// Generated by LiveScript 1.3.0
window.adminExtension = {
  downloadProjects: function(arg$){
    var prjs, toc, grp, getIdx, ref$, ref1$, heads, res$, k, head, rows, blob, name;
    prjs = arg$.prjs, toc = arg$.toc, grp = arg$.grp;
    getIdx = function(o){
      if ((o.system || (o.system = {})).idx) {
        return "111-" + ("" + o.system.idx).padStart(3, "0");
      } else {
        return o.key || 'n/a';
      }
    };
    console.log('here');
    if (prjs[0] && ((ref$ = (ref1$ = prjs[0]).detail || (ref1$.detail = {})).custom || (ref$.custom = {})).open) {
      heads = {};
      prjs.map(function(p){
        var k, ref$, ref1$, ref2$, v, results$ = [];
        for (k in ref$ = (ref1$ = (ref2$ = p.detail || (p.detail = {})).custom || (ref2$.custom = {})).open || (ref1$.open = {})) {
          v = ref$[k];
          results$.push(heads[k] = 1);
        }
        return results$;
      });
      res$ = [];
      for (k in heads) {
        res$.push(k);
      }
      heads = res$;
      heads = ["編號"].concat(heads);
      head = heads.map(function(it){
        return '' + ('' + it).replace(/"/g, "'") + '';
      });
      rows = prjs.map(function(p){
        return heads.map(function(h){
          var ref$, ref1$;
          if (h === '編號') {
            return {
              v: getIdx(p)
            };
          } else {
            return ((ref$ = (ref1$ = p.detail || (p.detail = {})).custom || (ref1$.custom = {})).open || (ref$.open = {}))[h] || '';
          }
        }).map(function(v){
          return typeof v !== 'object'
            ? v
            : !v
              ? ""
              : v.v != null
                ? v.v
                : v.list != null || (v.other != null && v.other.text != null)
                  ? ((v.list || []).concat([v.other && v.other.enabled ? v.other.text || '' : ''])).filter(function(it){
                    return it != null && it !== "";
                  })
                  : JSON.stringify(v);
        }).map(function(it){
          return '' + ('' + it).replace(/"/g, "'") + '';
        });
      });
      blob = csv4xls.toBlob([head].concat(rows));
      name = toc.brd.name + "-" + grp.info.name + ".csv";
      return {
        blob: blob,
        name: name
      };
    }
    blob = new Blob([JSON.stringify(prjs)], {
      type: "application/json"
    });
    name = "projects.json";
    return res({
      blob: blob,
      name: name
    });
  }
};