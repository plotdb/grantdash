// Generated by LiveScript 1.3.0
(function(){
  var aux;
  aux = {
    insert: {
      assemble: function(pairs){
        var ref$, cols, vals, k, v;
        ref$ = [[], []], cols = ref$[0], vals = ref$[1];
        for (k in pairs) {
          v = pairs[k];
          cols.push(k);
          vals.push(v);
        }
        return [
          "(" + cols.join(",") + ")", "(" + vals.map(function(d, i){
            return "$" + (i + 1);
          }).join(",") + ")", vals
        ];
      },
      format: function(type, data){
        var pairlist, k, ref$, v, value, d, subtype;
        pairlist = {};
        for (k in ref$ = type.config.base) {
          v = ref$[k];
          value = (fn$());
          pairlist[k] = value != null ? value : null;
        }
        return pairlist;
        function fn$(){
          switch (v.type.name) {
          case 'string':
            return data[k];
          case 'email':
            return data[k];
          case 'number':
            return data[k];
          case 'date':
            d = new Date(data[k]);
            if (isNaN(d.getTime())) {
              return new Date().toUTCString();
            } else {
              return d.toUTCString();
            }
            break;
          case 'boolean':
            return data[k];
          case 'key':
            return data[k];
          case 'array':
            subtype = v.type.config.type.type.name;
            if (subtype === 'string' || subtype === 'number') {
              return function(it){
                it = (typeof it === 'string'
                  ? it.split(',')
                  : it || []).filter(function(it){
                  return it;
                });
                return "{" + it.filter(function(it){
                  return it != null;
                }).join(",") + "}";
              }(data[k]);
            } else {
              return JSON.stringify(data[k]);
            }
            break;
          default:
            return JSON.stringify(data[k]);
          }
        }
      }
    }
  };
  module.exports = aux;
}).call(this);
