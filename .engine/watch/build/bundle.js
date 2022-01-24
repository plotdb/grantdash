// Generated by LiveScript 1.3.0
(function(){
  var fs, fsExtra, LiveScript, stylus, path, colors, uglifyJs, uglifycss, aux, debounce, cwd, bundle, task, bundleFile, build, batch, main;
  fs = require('fs');
  fsExtra = require('fs-extra');
  LiveScript = require('LiveScript');
  stylus = require('stylus');
  path = require('path');
  colors = require('@plotdb/colors');
  uglifyJs = require('uglify-js');
  uglifycss = require('uglifycss');
  aux = require('./aux');
  debounce = require('debounce.js');
  cwd = path.resolve(process.cwd());
  bundle = {
    css: {},
    js: {}
  };
  task = {
    css: {},
    js: {}
  };
  bundleFile = "config/bundle.json";
  build = function(arg$){
    var name, list, type, t1, outdir, outfile, outfilemin;
    name = arg$.name, list = arg$.list, type = arg$.type;
    t1 = Date.now();
    outdir = "static/" + type + "/pack/";
    outfile = path.join(outdir, name + "." + type);
    outfilemin = path.join(outdir, name + ".min." + type);
    return Promise.resolve().then(function(){
      return new Promise(function(res, rej){
        return fsExtra.ensureDir(outdir, function(){
          return res();
        });
      });
    }).then(function(){
      return Promise.all([
        Promise.all(list.map(function(f){
          return new Promise(function(res, rej){
            return fs.readFile(f, function(e, b){
              if (e) {
                return rej(e);
              } else {
                return res({
                  name: f,
                  code: b.toString()
                });
              }
            });
          });
        })), Promise.all(list.map(function(f){
          return new Promise(function(res, rej){
            var fm;
            fm = f.replace(/\.(js|css)$/, '.min.$1');
            return fs.readFile(fm, function(e, b){
              if (e) {
                return fs.readFile(f, function(e, b){
                  if (e) {
                    return rej(e);
                  } else {
                    return res({
                      name: fm,
                      code: b.toString()
                    });
                  }
                });
              } else {
                return res({
                  name: f,
                  code: b.toString()
                });
              }
            });
          });
        }))
      ]);
    }).then(function(ret){
      var normal, minified;
      normal = ret[0].map(function(it){
        return it.code;
      }).join('');
      minified = ret[1].map(function(arg$){
        var name, code;
        name = arg$.name, code = arg$.code;
        return /\.min\./.exec(name)
          ? code
          : type === 'js'
            ? uglifyJs.minify(code).code
            : type === 'css' ? uglifycss.processString(code, {
              uglyComments: true
            }) : code;
      }).join('');
      return Promise.all([
        new Promise(function(res, rej){
          return fs.writeFile(outfile, normal, function(e, b){
            return res(b);
          });
        }), new Promise(function(res, rej){
          return fs.writeFile(outfilemin, minified, function(e, b){
            return res(b);
          });
        })
      ]);
    }).then(function(){
      return {
        type: type,
        name: name,
        elapsed: Date.now() - t1,
        size: fs.statSync(outfile).size,
        sizeMin: fs.statSync(outfilemin).size
      };
    });
  };
  batch = debounce(500, function(){
    var promises, type, name, out;
    promises = [];
    for (type in task) {
      for (name in task[type]) {
        out = "static/" + type + "/pack/" + name + "." + type;
        if (aux.newer(bundleFile, [out], true) || (task[type][name].length && !aux.newer(out, task[type][name]))) {
          promises.push(build({
            type: type,
            name: name,
            list: bundle[type][name]
          }));
        }
      }
    }
    task = {
      css: {},
      js: {}
    };
    return Promise.all(promises).then(function(list){
      var i$, len$, info, type, name, size, sizeMin, elapsed, results$ = [];
      for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
        info = list[i$];
        type = info.type, name = info.name, size = info.size, sizeMin = info.sizeMin, elapsed = info.elapsed;
        console.log("[BUILD] bundle static/" + type + "/pack/" + name + "." + type + " ( " + size + " bytes / " + elapsed + "ms )");
        results$.push(console.log("[BUILD] bundle static/" + type + "/pack/" + name + ".min." + type + " ( " + sizeMin + " bytes / " + elapsed + "ms )"));
      }
      return results$;
    });
  });
  main = {
    map: function(list){},
    build: function(list){
      var type, n, ref$, l, e, i$, len$, file;
      if (in$(bundleFile, list)) {
        try {
          bundle = JSON.parse(fs.readFileSync(bundleFile).toString());
          for (type in bundle) {
            for (n in ref$ = bundle[type]) {
              l = ref$[n];
              bundle[type][n] = l.map(fn$);
            }
          }
        } catch (e$) {
          e = e$;
          console.log(e);
          return;
        }
      }
      for (type in bundle) {
        for (n in ref$ = bundle[type]) {
          l = ref$[n];
          if (!task[type][n]) {
            task[type][n] = [];
          }
          for (i$ = 0, len$ = list.length; i$ < len$; ++i$) {
            file = list[i$];
            if (in$(file, l)) {
              task[type][n].push(file);
            }
          }
        }
      }
      return batch();
      function fn$(it){
        return path.join('static', it);
      }
    },
    unlink: function(list){}
  };
  module.exports = main;
  function in$(x, xs){
    var i = -1, l = xs.length >>> 0;
    while (++i < l) if (x === xs[i]) return true;
    return false;
  }
}).call(this);
