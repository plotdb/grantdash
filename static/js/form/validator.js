// Generated by LiveScript 1.3.0
(function(){
  return ldc.register('prjFormValidation', ['prjFormCriteria'], function(arg$){
    var prjFormCriteria, validator;
    prjFormCriteria = arg$.prjFormCriteria;
    validator = {
      number: {
        type: function(v, i, j){
          return !(isNaN(v) || (i != null && isNaN(i)) || (j != null && isNaN(j)));
        },
        convert: function(v, i, j){
          return [+v, +(i || 0), +(j || 0)];
        },
        gte: function(v, i){
          return v >= i;
        },
        lte: function(v, i){
          return v <= i;
        },
        ge: function(v, i){
          return v > i;
        },
        le: function(v, i){
          return v < i;
        },
        eq: function(v, i){
          return v === i;
        },
        ne: function(v, i){
          return v !== i;
        },
        between: function(v, i, j){
          return v >= i && v <= j;
        }
      },
      string: {
        type: function(v, i){
          return v != null && i != null;
        },
        convert: function(v, i){
          return [v + "", i + ""];
        },
        include: function(v, i){
          return ~v.indexOf(i);
        },
        exclude: function(v, i){
          return !~v.indexOf(i);
        },
        email: function(v, i){
          return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.[a-z]{2,}|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.exec(v);
        },
        url: function(v, i){
          return /^\s*http(s):\/\/[a-zA-Z0-9-]+/.exec(v);
        }
      },
      count: {
        type: function(v, i, j){
          return v != null && i != null && j != null;
        },
        convert: function(v, i, j){
          var len;
          len = Array.isArray(v)
            ? v.length
            : v != null ? v.length || (v + "").length : 0;
          return [len, +(i || 0), +(j || 0)];
        },
        gte: function(v, i){
          return v >= i;
        },
        lte: function(v, i){
          return v <= i;
        },
        eq: function(v, i){
          return v === i;
        },
        between: function(v, i, j){
          return v >= i && v <= j;
        }
      },
      regex: {
        match: function(v, i){
          return new RegExp(i).exec(v);
        },
        "not-match": function(v, i){
          return !new RegExp(i).exec(v);
        }
      },
      smaller: {
        type: function(v, i, j){
          return !(isNaN(v) || (i != null && isNaN(i)) || (j != null && isNaN(j)));
        },
        convert: function(v, i, j){
          return [+v, +(i || 0), +(j || 0)];
        },
        le: function(v, i){
          return v < i;
        }
      }
    };
    return {
      validate: function(block){
        var v, i$, ref$, len$, c, type, vtr, ref1$, i, j;
        v = (block.value || (block.value = {})).content || (block.value || (block.value = {})).list;
        if (!v) {
          return {};
        }
        for (i$ = 0, len$ = (ref$ = block.criteria || []).length; i$ < len$; ++i$) {
          c = ref$[i$];
          type = prjFormCriteria.schema.types[c.type];
          if (!(c.type && type)) {
            continue;
          }
          vtr = validator[type.ops];
          if (!vtr[c.op]) {
            continue;
          }
          ref1$ = vtr.convert(v, c.input1, c.input2), v = ref1$[0], i = ref1$[1], j = ref1$[2];
          if (!(vtr.type(v, i, j) && vtr[c.op](v, i, j))) {
            return {
              result: false,
              criteria: c
            };
          }
        }
        return {
          result: true
        };
      }
    };
  });
})();