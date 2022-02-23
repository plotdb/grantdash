 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_rethrow(e,n,r,t){if(!(e instanceof Error))throw e;if(!("undefined"==typeof window&&n||t))throw e.message+=" on line "+r,e;var o,a,i,s;try{t=t||require("fs").readFileSync(n,{encoding:"utf8"}),o=3,a=t.split("\n"),i=Math.max(r-o,0),s=Math.min(a.length,r+o)}catch(t){return e.message+=" - could not read from "+n+" ("+t.message+")",void pug_rethrow(e,null,r)}o=a.slice(i,s).map(function(e,n){var t=n+i+1;return(t==r?"  > ":"    ")+t+"| "+e}).join("\n"),e.path=n;try{e.message=(n||"Pug")+":"+r+"\n"+o+"\n\n"+e.message}catch(e){}throw e}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;
    var locals_for_with = (locals || {});
    
    (function (Array, Date, JSON, b64img, blockLoader, c, cssLoader, ctrl, decache, defer, escape, escjson, form, libLoader, order, prefix, reports, scriptLoader, url, version) {
      ;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"] = pug_interp = function(key,val){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-4\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"font-weight-bold mb-1\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = key) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"quote\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
if (Array.isArray(val)) {
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cul\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
// iterate val
;(function(){
  var $$obj = val;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var v = $$obj[pug_index0];
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli class=\"pre\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = v) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var v = $$obj[pug_index0];
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli class=\"pre\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = v) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

}
else {
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
if (/資本額|新臺幣/.exec(key)) {
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp class=\"pre\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = (+val).toLocaleString()) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
else {
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp class=\"pre\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = val) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";





























;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";





























;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
if ((!blockLoader || !blockLoader["common"])) {
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fldui.pug";
if(!ctrl) var ctrl = {};
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Fchevron-down.pug";





;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Fspinner.pug";





;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var escjson = function(obj) { return 'JSON.parse(unescape("' + escape(JSON.stringify(obj)) + '"))'; };
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var eschtml = (function() { var MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&#34;', "'": '&#39;' }; var repl = function(c) { return MAP[c]; }; return function(s) { return s.replace(/[&<>'"]/g, repl); }; })();
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["nbr"] = pug_interp = function(count){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
for (var i = 0; i < count; i++)
{
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cbr\u003E";
}
};
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!scriptLoader) { scriptLoader = {url: {}, config: {}}; }
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!decache) { decache = (version? "?v=" + version : ""); }
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["script"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
scriptLoader.config = (config ? config : {});
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if (!scriptLoader.url[url]) {
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
scriptLoader.url[url] = true;
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if (/^https?:\/\/./.exec(url)) {
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + decache, true, true)+pug_attr("defer", !!scriptLoader.config.defer, true, true)+pug_attr("async", !!scriptLoader.config.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
};
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!cssLoader) { cssLoader = {url: {}}; }
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_mixins["css"] = pug_interp = function(url,config){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
cssLoader.config = (config ? config : {});
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if (!cssLoader.url[url]) {
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
cssLoader.url[url] = true;
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + decache, true, true)) + "\u003E";
}
};
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
if(!blockLoader) { blockLoader = {name: {}, config: {}}; }
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";










;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var b64img = {};
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
b64img.px1 = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAQAICRAEAOw=="
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";
var loremtext = {
  zh: "料何緊許團人受間口語日是藝一選去，得系目、再驗現表爸示片球法中轉國想我樹我，色生早都沒方上情精一廣發！能生運想毒一生人一身德接地，說張在未安人、否臺重壓車亞是我！終力邊技的大因全見起？切問去火極性現中府會行多他千時，來管表前理不開走於展長因，現多上我，工行他眼。總務離子方區面人話同下，這國當非視後得父能民觀基作影輕印度民雖主他是一，星月死較以太就而開後現：國這作有，他你地象的則，引管戰照十都是與行求證來亞電上地言裡先保。大去形上樹。計太風何不先歡的送但假河線己綠？計像因在……初人快政爭連合多考超的得麼此是間不跟代光離制不主政重造的想高據的意臺月飛可成可有時情乎為灣臺我養家小，叫轉於可！錢因其他節，物如盡男府我西上事是似個過孩而過要海？更神施一關王野久沒玩動一趣庭顧倒足要集我民雲能信爸合以物頭容戰度系士我多學一、區作一，過業手：大不結獨星科表小黨上千法值之兒聲價女去大著把己。",
  en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";







;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fcore\u002Futil.pug";













;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";















































;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_mixins["ldPaletteEditor"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldp\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"colors\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"edit\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-6\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldColorPicker no-border no-palette\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-6\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"row mb-2\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-8\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cselect class=\"form-control form-control-local-sm\" value=\"rgb\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Coption value=\"rgb\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "RGB\u003C\u002Foption\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Coption value=\"hsl\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "HSL\u003C\u002Foption\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Coption value=\"hcl\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "HCL\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-4 pl-0\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control form-control-local-sm value\" placeholder=\"Hex Value\" data-tag=\"hex\" style=\"margin:0\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var configs = [["Red", "Green", "Blue", "rgb", "active"], ["Hue", "Saturation", "Luminance", "hsl",""], ["Hue", "Chroma", "Luminance", "hcl",""]];
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
// iterate configs
;(function(){
  var $$obj = configs;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var config = $$obj[pug_index3];
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["row","config",config[4]], [false,false,true]), false, true)+pug_attr("data-tag", config[3], true, true)) + "\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-8\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[0]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[1]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[2]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-4\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var config = $$obj[pug_index3];
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["row","config",config[4]], [false,false,true]), false, true)+pug_attr("data-tag", config[3], true, true)) + "\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-8\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[0]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[1]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"label-group\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = config[2]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"ldrs ldrs-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm-4\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[0][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[1][0].toLowerCase(), true, true)) + "\u003E";
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"value form-control form-control-local-sm\""+pug_attr("data-tag", config[3] + "-" + config[2][0].toLowerCase(), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





























































































































;pug_debug_line = 93;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 97;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var anikit = {"groupName":["No Animation","Popular Animation","Repeat Animation","Transition"],"members":[[["static","static"]],[["blink","blink"],["bounce","bounce"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["breath","breath"],["fade","fade"],["flip-h","flip (horizontally)"],["float-btt-in","float-in (bottom to top)"],["slide-ltr","slide (left to right)"],["spin","spin"],["tremble","tremble"]],[["beat","beat"],["blink","blink"],["blur","blur"],["bounce","bounce"],["bounceAlt","bounceAlt"],["breath","breath"],["clock","clock"],["coin-h","coin (horizontally)"],["coin-v","coin (vertically)"],["cycle","cycle"],["cycle-alt","cycle-alt"],["damage","damage"],["dim","dim"],["fade","fade"],["flip","flip"],["flip-h","flip (horizontally)"],["flip-v","flip (vertically)"],["float","float"],["heartbeat","heartbeat"],["hit","hit"],["jelly","jelly"],["jelly-alt","jelly-alt"],["jingle","jingle"],["jump","jump"],["measure","measure"],["metronome","metronome"],["move-btt","move (bottom to top)"],["move-fade-btt","move faded (bottom to top)"],["move-fade-ltr","move faded (left to right)"],["move-fade-rtl","move faded (right to left)"],["move-fade-ttb","move faded (top to bottom)"],["move-ltr","move (left to right)"],["move-rtl","move (right to left)"],["move-ttb","move (top to bottom)"],["orbit","orbit"],["pulse","pulse"],["rubber-h","rubber (horizontally)"],["rubber-v","rubber (vertically)"],["rush-btt","rush (bottom to top)"],["rush-ltr","rush (left to right)"],["rush-rtl","rush (right to left)"],["rush-ttb","rush (top to bottom)"],["shake-h","shake (horizontally)"],["shake-v","shake (vertically)"],["shiver","shiver"],["skew","skew"],["skew-alt","skew-alt"],["slide-btt","slide (bottom to top)"],["slide-ltr","slide (left to right)"],["slide-rtl","slide (right to left)"],["slide-ttb","slide (top to bottom)"],["smash","smash"],["spin","spin"],["spin-fast","spin-fast"],["squeeze","squeeze"],["surprise","surprise"],["swim","swim"],["swing","swing"],["tick","tick"],["tick-alt","tick-alt"],["tremble","tremble"],["vortex","vortex"],["vortex-alt","vortex-alt"],["wander-h","wander (horizontally)"],["wander-v","wander (vertically)"],["wrench","wrench"]],[["blur-in","blur-in"],["blur-out","blur-out"],["bounce-alt-in","bounce-alt-in"],["bounce-alt-out","bounce-alt-out"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["fade-in","fade-in"],["fade-out","fade-out"],["fall-btt-in","fall-in (bottom to top)"],["fall-ltr-in","fall-in (left to right)"],["fall-rtl-in","fall-in (right to left)"],["fall-ttb-in","fall-in (top to bottom)"],["flip-h-in","flip-in (horizontally)"],["flip-h-out","flip-out (horizontally)"],["flip-v-in","flip-in (vertically)"],["flip-v-out","flip-out (vertically)"],["float-btt-in","float-in (bottom to top)"],["float-btt-out","float-out (bottom to top)"],["float-ltr-in","float-in (left to right)"],["float-ltr-out","float-out (left to right)"],["float-rtl-in","float-in (right to left)"],["float-rtl-out","float-out (right to left)"],["float-ttb-in","float-in (top to bottom)"],["float-ttb-out","float-out (top to bottom)"],["grow-btt-in","grow-in (bottom to top)"],["grow-btt-out","grow-out (bottom to top)"],["grow-ltr-in","grow-in (left to right)"],["grow-ltr-out","grow-out (left to right)"],["grow-rtl-in","grow-in (right to left)"],["grow-rtl-out","grow-out (right to left)"],["grow-ttb-in","grow-in (top to bottom)"],["grow-ttb-out","grow-out (top to bottom)"],["jump-alt-in","jump-alt-in"],["jump-alt-out","jump-alt-out"],["jump-in","jump-in"],["jump-out","jump-out"],["power-off","power-off"],["power-on","power-on"],["rush-btt-in","rush-in (bottom to top)"],["rush-ltr-in","rush-in (left to right)"],["rush-rtl-in","rush-in (right to left)"],["rush-ttb-in","rush-in (top to bottom)"],["slide-btt-in","slide-in (bottom to top)"],["slide-btt-out","slide-out (bottom to top)"],["slide-ltr-in","slide-in (left to right)"],["slide-ltr-out","slide-out (left to right)"],["slide-rtl-in","slide-in (right to left)"],["slide-rtl-out","slide-out (right to left)"],["slide-ttb-in","slide-in (top to bottom)"],["slide-ttb-out","slide-out (top to bottom)"],["spring-btt-in","spring-in (bottom to top)"],["spring-ltr-in","spring-in (left to right)"],["spring-rtl-in","spring-in (right to left)"],["spring-ttb-in","spring-in (top to bottom)"],["throw-btt-in","throw-in (bottom to top)"],["throw-ltr-in","throw-in (left to right)"],["throw-rtl-in","throw-in (right to left)"],["throw-ttb-in","throw-in (top to bottom)"],["vortex-alt-in","vortex-alt-in"],["vortex-alt-out","vortex-alt-out"],["vortex-in","vortex-in"],["vortex-out","vortex-out"],["zoom-in","zoom-in"],["zoom-out","zoom-out"]]],"group":{"static":[["static","static"]],"popular":[["blink","blink"],["bounce","bounce"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["breath","breath"],["fade","fade"],["flip-h","flip (horizontally)"],["float-btt-in","float-in (bottom to top)"],["slide-ltr","slide (left to right)"],["spin","spin"],["tremble","tremble"]],"repeat":[["beat","beat"],["blink","blink"],["blur","blur"],["bounce","bounce"],["bounceAlt","bounceAlt"],["breath","breath"],["clock","clock"],["coin-h","coin (horizontally)"],["coin-v","coin (vertically)"],["cycle","cycle"],["cycle-alt","cycle-alt"],["damage","damage"],["dim","dim"],["fade","fade"],["flip","flip"],["flip-h","flip (horizontally)"],["flip-v","flip (vertically)"],["float","float"],["heartbeat","heartbeat"],["hit","hit"],["jelly","jelly"],["jelly-alt","jelly-alt"],["jingle","jingle"],["jump","jump"],["measure","measure"],["metronome","metronome"],["move-btt","move (bottom to top)"],["move-fade-btt","move faded (bottom to top)"],["move-fade-ltr","move faded (left to right)"],["move-fade-rtl","move faded (right to left)"],["move-fade-ttb","move faded (top to bottom)"],["move-ltr","move (left to right)"],["move-rtl","move (right to left)"],["move-ttb","move (top to bottom)"],["orbit","orbit"],["pulse","pulse"],["rubber-h","rubber (horizontally)"],["rubber-v","rubber (vertically)"],["rush-btt","rush (bottom to top)"],["rush-ltr","rush (left to right)"],["rush-rtl","rush (right to left)"],["rush-ttb","rush (top to bottom)"],["shake-h","shake (horizontally)"],["shake-v","shake (vertically)"],["shiver","shiver"],["skew","skew"],["skew-alt","skew-alt"],["slide-btt","slide (bottom to top)"],["slide-ltr","slide (left to right)"],["slide-rtl","slide (right to left)"],["slide-ttb","slide (top to bottom)"],["smash","smash"],["spin","spin"],["spin-fast","spin-fast"],["squeeze","squeeze"],["surprise","surprise"],["swim","swim"],["swing","swing"],["tick","tick"],["tick-alt","tick-alt"],["tremble","tremble"],["vortex","vortex"],["vortex-alt","vortex-alt"],["wander-h","wander (horizontally)"],["wander-v","wander (vertically)"],["wrench","wrench"]],"transition":[["blur-in","blur-in"],["blur-out","blur-out"],["bounce-alt-in","bounce-alt-in"],["bounce-alt-out","bounce-alt-out"],["bounce-in","bounce-in"],["bounce-out","bounce-out"],["fade-in","fade-in"],["fade-out","fade-out"],["fall-btt-in","fall-in (bottom to top)"],["fall-ltr-in","fall-in (left to right)"],["fall-rtl-in","fall-in (right to left)"],["fall-ttb-in","fall-in (top to bottom)"],["flip-h-in","flip-in (horizontally)"],["flip-h-out","flip-out (horizontally)"],["flip-v-in","flip-in (vertically)"],["flip-v-out","flip-out (vertically)"],["float-btt-in","float-in (bottom to top)"],["float-btt-out","float-out (bottom to top)"],["float-ltr-in","float-in (left to right)"],["float-ltr-out","float-out (left to right)"],["float-rtl-in","float-in (right to left)"],["float-rtl-out","float-out (right to left)"],["float-ttb-in","float-in (top to bottom)"],["float-ttb-out","float-out (top to bottom)"],["grow-btt-in","grow-in (bottom to top)"],["grow-btt-out","grow-out (bottom to top)"],["grow-ltr-in","grow-in (left to right)"],["grow-ltr-out","grow-out (left to right)"],["grow-rtl-in","grow-in (right to left)"],["grow-rtl-out","grow-out (right to left)"],["grow-ttb-in","grow-in (top to bottom)"],["grow-ttb-out","grow-out (top to bottom)"],["jump-alt-in","jump-alt-in"],["jump-alt-out","jump-alt-out"],["jump-in","jump-in"],["jump-out","jump-out"],["power-off","power-off"],["power-on","power-on"],["rush-btt-in","rush-in (bottom to top)"],["rush-ltr-in","rush-in (left to right)"],["rush-rtl-in","rush-in (right to left)"],["rush-ttb-in","rush-in (top to bottom)"],["slide-btt-in","slide-in (bottom to top)"],["slide-btt-out","slide-out (bottom to top)"],["slide-ltr-in","slide-in (left to right)"],["slide-ltr-out","slide-out (left to right)"],["slide-rtl-in","slide-in (right to left)"],["slide-rtl-out","slide-out (right to left)"],["slide-ttb-in","slide-in (top to bottom)"],["slide-ttb-out","slide-out (top to bottom)"],["spring-btt-in","spring-in (bottom to top)"],["spring-ltr-in","spring-in (left to right)"],["spring-rtl-in","spring-in (right to left)"],["spring-ttb-in","spring-in (top to bottom)"],["throw-btt-in","throw-in (bottom to top)"],["throw-ltr-in","throw-in (left to right)"],["throw-rtl-in","throw-in (right to left)"],["throw-ttb-in","throw-in (top to bottom)"],["vortex-alt-in","vortex-alt-in"],["vortex-alt-out","vortex-alt-out"],["vortex-in","vortex-in"],["vortex-out","vortex-out"],["zoom-in","zoom-in"],["zoom-out","zoom-out"]]}};
;pug_debug_line = 98;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";























































































;pug_debug_line = 111;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";














































;pug_debug_line = 117;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix = function(n) { return (!n?[]:(Array.isArray(n)?n:[n])).map(function(it){ return `${prefix.currentName}$${it}`; }).join(' ');}
;pug_debug_line = 118;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





















;pug_debug_line = 127;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_mixins["register-locals"] = pug_interp = function(name = "exports", module){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
if (locals) {
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
if (module) {
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\u003Cscript type=\"module\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "ldc.register(\"viewLocals\", [], function() {";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "  return ";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + (null == (pug_interp = escjson(locals[name] || null)) ? "" : pug_interp);
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + ";";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "});\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "ldc.register(\"viewLocals\", [], function() {";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "  return ";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + (null == (pug_interp = escjson(locals[name] || null)) ? "" : pug_interp);
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + ";";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "});\u003C\u002Fscript\u003E";
}
}
};
}
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fversion.pug";
var version = "4b8340e1";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if(!libLoader) {
  libLoader = {
    js: {url: {}},
    css: {url: {}},
    root: function(r) { libLoader._r = r; },
    _r: "/assets/lib",
    _v: "",
    version: function(v) { libLoader._v = (v ? "?v=" + v : ""); }
  }
  if(version) { libLoader.version(version); }
}

;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_mixins["script"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if(!Array.isArray(os)) { os = [os]; }
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index10 = 0, $$l = $$obj.length; pug_index10 < $$l; pug_index10++) {
        var o = $$obj[pug_index10];
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if (!libLoader.js.url[url]) {
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
libLoader.js.url[url] = true;
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if (/^https?:\/\/./.exec(url)) {
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
      }
  } else {
    var $$l = 0;
    for (var pug_index10 in $$obj) {
      $$l++;
      var o = $$obj[pug_index10];
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.js"); }
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if (!libLoader.js.url[url]) {
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
libLoader.js.url[url] = true;
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
defer = (typeof(c.defer) == "undefined" ? true : !!c.defer);
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if (/^https?:\/\/./.exec(url)) {
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
else {
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_html = pug_html + "\u003Cscript" + (" type=\"text\u002Fjavascript\""+pug_attr("src", url + libLoader._v, true, true)+pug_attr("defer", defer, true, true)+pug_attr("async", !!c.async, true, true)) + "\u003E\u003C\u002Fscript\u003E";
}
}
    }
  }
}).call(this);

};
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_mixins["css"] = pug_interp = function(os,cfg){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if(!Array.isArray(os)) { os = [os]; }
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
// iterate os
;(function(){
  var $$obj = os;
  if ('number' == typeof $$obj.length) {
      for (var pug_index11 = 0, $$l = $$obj.length; pug_index11 < $$l; pug_index11++) {
        var o = $$obj[pug_index11];
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if (!libLoader.css.url[url]) {
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
libLoader.css.url[url] = true;
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index11 in $$obj) {
      $$l++;
      var o = $$obj[pug_index11];
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
c = o;
if(typeof(o) == "string") { url = o; c = cfg || {};}
else if(o.url) { url = o.url; }
else { url = libLoader._r + "/" + o.name + "/" + (o.version || 'main') + "/" + (o.path || "index.min.css"); }
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
if (!libLoader.css.url[url]) {
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
libLoader.css.url[url] = true;
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Flib.pug";
pug_html = pug_html + "\u003Clink" + (" rel=\"stylesheet\" type=\"text\u002Fcss\""+pug_attr("href", url + libLoader._v, true, true)) + "\u003E";
}
    }
  }
}).call(this);

};
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
libLoader.root("/dash/assets/felib");
libLoader.version(version);
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["css"]([
      {name: "bootstrap", path: "dist/css/bootstrap.min.css"},
      {name: "@loadingio/bootstrap.ext", path: "index.min.css"},
      {name: "@loadingio/loading.css", path: "loading.min.css"},
      {name: "ldiconfont", path: "ldif.min.css"},
      {name: "ldbutton"},
      {name: "ldcover"},
      {name: "ldloader"},
      {url: "/dash/css/modules/authpanel.min.css"},
      {url: "/sys/css/index.css"}
    ]);
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "body {\n  scroll-behavior: smooth;\n}\n@font-face {\n  font-family: 'ldi';\n  font-weight: normal;\n  font-style: normal;\n  src: url(\"\u002Fdash\u002Fassets\u002Ffelib\u002Fldiconfont\u002Fmain\u002Fldif.ttf\") format('truetype');\n}\n\u003C\u002Fstyle\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "body {\n  background: #f6f7f8;\n}\n.pre {\n  white-space: pre-line;\n}\n.quote {\n  border-left: 3px solid #eee;\n  padding-left: 0.5em;\n}\n\u003C\u002Fstyle\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "if(\u002FMSIE|Trident\u002F.exec(navigator.userAgent)) { window.location.href = \"\u002Ferr\u002Fie\u002F\" };\u003C\u002Fscript\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Cbody\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"submitting\" data-lock=\"true\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "送件中 ...\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-lg mt-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"submitted\" data-lock=\"true\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-640 rwd\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Ch2 class=\"text-center\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "您的案件已送出\u003C\u002Fh2\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "注意事項：\u003C\u002Fp\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Col class=\"pl-4\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "送件後無法繼續編輯，若您發現有任何問題需要修正，請洽承辦人員。\u003C\u002Fli\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "所送資料將交由計畫委員進行審查，若委員要求貴單位補充文件內容或資料，將另行通知。\u003C\u002Fli\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "請先製作簡報，後續將另行通知簡報上傳時間。\u003C\u002Fli\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "若貴單位通過審查，請於審查會議後下載表單PDF檔，印出紙本後用印寄回，以辦理結案作業。\u003C\u002Fli\u003E\u003C\u002Fol\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-primary btn-block\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "關閉\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"saving\" data-lock=\"true\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "暫存進度中 ...\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-lg mt-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"saved\" data-lock=\"true\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "您的編輯進度已儲存。\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "您隨時可以回到這個頁面繼續編輯。若需要回到此頁，請由網頁右上角的下拉選單中點選「個人頁面」，即可找到您建立的案件。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-primary btn-block ld-ext-right\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "關閉\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"print-timeout\" data-lock=\"true\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "連線逾時\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "主機沒有在一定的時間內產生 PDF 檔，可能是因為服務忙碌中。您可以稍候再重試一次，或者直接將此頁面列印成 PDF 檔做為您的申請書。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-block btn-outline-primary btn-block\" onclick=\"lda.ldcvmgr.toggle('flagship-print-timeout',false).then(function(){print()})\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "列印此頁面\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-block btn-primary\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fcovers.pug";
pug_html = pug_html + "稍候再試\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-3\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "結案表單\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-3\" id=\"root\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-4\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Chr\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-3\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "提案表單\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card m-3\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv ld-scope=\"prj-detail\"\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
form = locals.prj.detail.custom
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
var order = [
  [ "提案簡介", "提案組成", "(代表)提案單位", "資本額(新臺幣/元)" ],
  [
    "註",
    "計畫總經費(新臺幣/元)", "申請經費(新臺幣/元)", "自籌經費(新臺幣/元)",
    "內容產業類型", "本院輔導產業類別分類", "本案預計未來體驗之通路",
    "本計畫是否申請或已獲其他機關(單位)經費補助",
    "已獲得補助列表",
    "負責人", "成立時間", "統一編號", "員工人數",
    "登記地址", "聯絡地址", "聯絡人",
    "職稱", "專線電話", "手機", "電子郵件"
  ]
];
;pug_debug_line = 66;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
order.push(order[0].concat(order[1]));
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-4\"\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "案件編號 ";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = form.raw["案件編號"]) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fspan\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = form.raw["計畫名稱"]) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-4\"\u003E";
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "計劃資訊\u003C\u002Fh3\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 90;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
// iterate order[0]
;(function(){
  var $$obj = order[0];
  if ('number' == typeof $$obj.length) {
      for (var pug_index12 = 0, $$l = $$obj.length; pug_index12 < $$l; pug_index12++) {
        var key = $$obj[pug_index12];
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
var val = form.raw[key]
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"](key,val);
      }
  } else {
    var $$l = 0;
    for (var pug_index12 in $$obj) {
      $$l++;
      var key = $$obj[pug_index12];
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
var val = form.raw[key]
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"](key,val);
    }
  }
}).call(this);

;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
var reports = [
  ["計劃書","plan"],
  ["預算表","budget"],
  ["立案證明","registration"],
  ["相關附件","appendix"],
  ["共同提案證明文件","copropose_reg"]
];
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
// iterate reports
;(function(){
  var $$obj = reports;
  if ('number' == typeof $$obj.length) {
      for (var pug_index13 = 0, $$l = $$obj.length; pug_index13 < $$l; pug_index13++) {
        var pair = $$obj[pug_index13];
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
if (form.file && form.file[pair[1]]) {
;pug_debug_line = 104;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-4\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"font-weight-bold mb-1\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = pair[0]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", `/dash/gcs/upload/${form.file[pair[1]].id}`, true, true)+" target=\"_blank\" rel=\"noopener noreferrer\"") + "\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = form.file[pair[1]].filename) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "( ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = (form.file[pair[1]].size / (1024 * 1024)).toFixed(2)) ? "" : pug_interp));
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "MB \u002F 修改日期: ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = new Date(form.file[pair[1]].modifiedtime).toLocaleString()) ? "" : pug_interp));
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + " )\u003C\u002Fsmall\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index13 in $$obj) {
      $$l++;
      var pair = $$obj[pug_index13];
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
if (form.file && form.file[pair[1]]) {
;pug_debug_line = 104;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-4\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"font-weight-bold mb-1\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = pair[0]) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", `/dash/gcs/upload/${form.file[pair[1]].id}`, true, true)+" target=\"_blank\" rel=\"noopener noreferrer\"") + "\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = form.file[pair[1]].filename) ? "" : pug_interp)) + "\u003C\u002Fb\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "( ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = (form.file[pair[1]].size / (1024 * 1024)).toFixed(2)) ? "" : pug_interp));
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "MB \u002F 修改日期: ";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = new Date(form.file[pair[1]].modifiedtime).toLocaleString()) ? "" : pug_interp));
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + " )\u003C\u002Fsmall\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
}
    }
  }
}).call(this);

;pug_debug_line = 108;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-4 d-none\" ld=\"note-widget\"\u003E";
;pug_debug_line = 109;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"font-weight-bold mb-1\"\u003E";
;pug_debug_line = 109;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "註\u003C\u002Fdiv\u003E";
;pug_debug_line = 110;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea" + (" class=\"form-control mb-1\""+" ld=\"note\" rows=\"10\""+pug_attr("disabled", true, true, true)) + "\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 111;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary d-none\" ld=\"update-note\"\u003E";
;pug_debug_line = 111;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "更新\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
// iterate order[1]
;(function(){
  var $$obj = order[1];
  if ('number' == typeof $$obj.length) {
      for (var pug_index14 = 0, $$l = $$obj.length; pug_index14 < $$l; pug_index14++) {
        var key = $$obj[pug_index14];
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
var val = form.raw[key]
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"](key,val);
      }
  } else {
    var $$l = 0;
    for (var pug_index14 in $$obj) {
      $$l++;
      var key = $$obj[pug_index14];
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
var val = form.raw[key]
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"](key,val);
    }
  }
}).call(this);

;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
// iterate form.raw || {}
;(function(){
  var $$obj = form.raw || {};
  if ('number' == typeof $$obj.length) {
      for (var key = 0, $$l = $$obj.length; key < $$l; key++) {
        var val = $$obj[key];
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
if (!~order[2].indexOf(key) && key != "本院分類") {
;pug_debug_line = 119;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"](key,val);
}
      }
  } else {
    var $$l = 0;
    for (var key in $$obj) {
      $$l++;
      var val = $$obj[key];
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
if (!~order[2].indexOf(key) && key != "本院分類") {
;pug_debug_line = 119;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["item"](key,val);
}
    }
  }
}).call(this);

;pug_debug_line = 120;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_mixins["nbr"](3);
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/moment.js/2.25.3/moment.min.js");
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/moment-timezone.js/0.5.31/moment-timezone.min.js");
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldui/ldui.min.js");
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldc/ldc.min.js");
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldsite/0.0.2/ldsite.min.js");
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/js/util/stage.js");
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/js/ldsite.js");
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]("/dash/js/site.js");
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["script"]([
      {name: "proxise"},
      {name: "@loadingio/debounce.js"},
      {name: "@loadingio/ldquery"},
      {name: "i18next", path: "dist/umd/i18next.min.js"},
      {name: "i18next-browser-languagedetector", path: "dist/umd/i18nextBrowserLanguageDetector.min.js"},
      {name: "ldview"},
      {name: "ldcover"},
      {name: "ldfile"},
      {name: "ldloader"},
      {name: "@plotdb/semver"},
      {name: "@plotdb/rescope"},
      {name: "@plotdb/csscope"},
      {name: "@plotdb/block"} 
    ]);
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_mixins["register-locals"]("exports", true);
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u003Cscript type=\"module\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u002F\u002F Generated by LiveScript 1.3.0\nldc.register(\"blockbase\", ['blockuploader', 'viewLocals', 'auth', 'ldNotify', 'error', 'notify', 'ldcvmgr'], function(arg$){\n  var blockuploader, viewLocals, auth, error, notify, ldcvmgr;\n  blockuploader = arg$.blockuploader, viewLocals = arg$.viewLocals, auth = arg$.auth, error = arg$.error, notify = arg$.notify, ldcvmgr = arg$.ldcvmgr;\n  return {\n    init: function(arg$){\n      var blockdef, brd, root, data, blockopt, ldld;\n      blockdef = arg$.blockdef, brd = arg$.brd, root = arg$.root, data = arg$.data;\n      blockopt = data;\n      ldld = new ldloader({\n        className: 'ldld full z-fixed'\n      });\n      return auth.ensure().then(function(global){\n        return auth.get().then(function(global){\n          var binfo, prj, user, owner, uploadr, host, customData, ref$, lc, this$ = this;\n          binfo = {};\n          prj = (viewLocals || {}).prj || {};\n          user = global.user || {};\n          owner = prj.owner || user.key || 0;\n          uploadr = new blockuploader({\n            brd: brd,\n            owner: owner\n          });\n          host = {\n            changeLanguage: function(lng){\n              i18next.changeLanguage(lng);\n              return binfo.instance.transform('i18n');\n            },\n            info: {\n              prj: {\n                slug: prj.slug,\n                state: prj.state\n              },\n              user: {\n                key: user.key,\n                username: user.username,\n                displayname: user.displayname\n              }\n            },\n            upload: function(o){\n              return uploadr.upload(o)['catch'](error());\n            },\n            print: function(opt){\n              var html, name;\n              opt == null && (opt = {});\n              html = opt.html || \"\";\n              name = opt.name || \"download.pdf\";\n              ldld.on();\n              return auth.recaptcha.get().then(function(recaptcha){\n                return ld$.fetch(\"\u002Fdash\u002Fapi\u002Fcustom\u002Fprint\", {\n                  method: \"POST\"\n                }, {\n                  json: {\n                    html: html,\n                    recaptcha: recaptcha\n                  },\n                  type: 'blob',\n                  timeout: 60 * 1000\n                }).then(function(blob){\n                  return ldfile.download({\n                    blob: blob,\n                    mime: \"application\u002Fpdf\",\n                    name: name\n                  });\n                })['finally'](function(){\n                  return ldld.off();\n                });\n              });\n            },\n            save: function(arg$){\n              var name, description, data, submit;\n              name = arg$.name, description = arg$.description, data = arg$.data, submit = arg$.submit;\n              ldcvmgr.toggle(submit ? 'submitting' : 'saving', true);\n              return debounce(1000).then(function(){\n                return auth.recaptcha.get();\n              }).then(function(recaptcha){\n                var payload;\n                payload = {\n                  name: name,\n                  description: description,\n                  custom: data,\n                  submit: submit,\n                  recaptcha: recaptcha,\n                  slug: prj.slug,\n                  brd: brd\n                };\n                return ld$.fetch(\"\u002Fdash\u002Fapi\u002Fcustom\u002Fprj\", {\n                  method: \"POST\"\n                }, {\n                  json: payload,\n                  type: 'json'\n                });\n              }).then(function(it){\n                console.log(\"saved return value: \", it);\n                ldcvmgr.toggle(submit ? 'submitted' : 'saved');\n                return it;\n              })['finally'](function(){\n                return ldcvmgr.toggle(submit ? 'submitting' : 'saving', false);\n              })['catch'](function(e){\n                error()(e);\n                return Promise.reject(e);\n              });\n            }\n          };\n          customData = ((ref$ = (viewLocals || {}).prj || {}).detail || (ref$.detail = {})).custom || {};\n          lc = {};\n          return i18next.init({\n            supportedLng: ['en', 'zh-TW'],\n            fallbackLng: 'zh-TW',\n            fallbackNS: '',\n            defaultNS: ''\n          }).then(function(){\n            return i18next.use(i18nextBrowserLanguageDetector);\n          }).then(function(){\n            console.log(\"use language: \", navigator.language) || navigator.userLanguage;\n            return i18next.changeLanguage(navigator.language) || navigator.userLanguage;\n          }).then(function(){\n            return block.i18n.use(i18next);\n          }).then(function(){\n            var mgr;\n            lc.manager = mgr = new block.manager({\n              registry: function(arg$){\n                var name, version, path, type;\n                name = arg$.name, version = arg$.version, path = arg$.path, type = arg$.type;\n                return type === 'block'\n                  ? \"\u002Fdash\u002Fassets\u002Ffelib\u002F\" + name + \"\u002F\" + (version || 'main') + \"\u002F\" + (path || 'index.html') + \"?dec=\" + (global.version || '')\n                  : \"\u002Fdash\u002Fassets\u002Ffelib\u002F\" + name + \"\u002F\" + (version || 'main') + \"\u002F\" + (path || 'index.min.js') + \"?dec=\" + (global.version || '');\n              }\n            });\n            return mgr.get(blockdef).then(function(bc){\n              return bc.create();\n            }).then(function(bi){\n              return bi.attach({\n                root: root || document.body,\n                data: blockopt || {}\n              }).then(function(){\n                return bi['interface']();\n              }).then(function(itf){\n                binfo['interface'] = itf;\n                binfo.instance = bi;\n                itf.adapt(host);\n                return itf.load(customData);\n              });\n            }).then(function(){\n              return console.log(\"block \" + name + \" loaded.\");\n            });\n          });\n        });\n      });\n    }\n  };\n});";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
pug_html = pug_html + "\u002F\u002F Generated by LiveScript 1.3.0\nldc.register(\"blockuploader\", ['viewLocals', 'auth', 'ldNotify', 'error', 'notify'], function(arg$){\n  var viewLocals, auth, error, notify, uploader;\n  viewLocals = arg$.viewLocals, auth = arg$.auth, error = arg$.error, notify = arg$.notify;\n  uploader = function(opt){\n    opt == null && (opt = {});\n    this.brd = opt.brd;\n    this.owner = opt.owner;\n    return this;\n  };\n  uploader.prototype = import$(Object.create(Object.prototype), {\n    getSignedUrl: function(opt){\n      opt == null && (opt = {});\n      return ld$.fetch(\"\u002Fdash\u002Fapi\u002Fgcs\u002Fupload\", {\n        method: 'POST'\n      }, {\n        json: opt,\n        type: 'json'\n      });\n    },\n    upload: function(arg$){\n      var file, progress, field, opt, this$ = this;\n      file = arg$.file, progress = arg$.progress, field = arg$.field;\n      opt = {\n        filename: file.name,\n        size: file.size,\n        field: field,\n        owner: this.owner,\n        brd: this.brd\n      };\n      return this.getSignedUrl(opt).then(function(arg$){\n        var signedUrl, id;\n        signedUrl = arg$.signedUrl, id = arg$.id;\n        return ld$.xhr(signedUrl, {\n          method: 'PUT',\n          body: file,\n          headers: {\n            \"Content-Type\": file.type\n          }\n        }, {\n          noDefaultHeaders: true,\n          progress: function(it){\n            if (progress) {\n              return progress(it);\n            }\n          }\n        }).then(function(){\n          if (progress) {\n            progress({\n              percent: 1\n            });\n          }\n          console.log('done');\n          return {\n            filename: file.name,\n            size: file.size,\n            modifiedtime: file.lastModified,\n            url: \"\u002Fdash\u002Fgcs\u002Fupload\u002F\" + id\n          };\n        });\n      });\n    }\n  });\n  return uploader;\n});\nfunction import$(obj, src){\n  var own = {}.hasOwnProperty;\n  for (var key in src) if (own.call(src, key)) obj[key] = src[key];\n  return obj;\n}\u003C\u002Fscript\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fblock\u002Fbase.pug";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cscript type=\"module\"\u003E";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u002F\u002F Generated by LiveScript 1.3.0\nldc.register(\"viewmode\", [], function(){\n  return \"view\";\n});\u003C\u002Fscript\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cscript type=\"module\"\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u002F\u002F Generated by LiveScript 1.3.0\nldc.register(['viewLocals', 'auth', 'ldNotify', 'error', 'notify'], function(arg$){\n  var viewLocals, auth, error, notify, vlc, lc, payload, ref$, ref1$, ref2$, submit, getSignedUrl, uploadFile, raw, slug, ldld;\n  viewLocals = arg$.viewLocals, auth = arg$.auth, error = arg$.error, notify = arg$.notify;\n  vlc = viewLocals;\n  lc = {};\n  payload = {\n    file: (ref$ = (ref1$ = (ref2$ = vlc.prj).detail || (ref2$.detail = {})).custom || (ref1$.custom = {})).file || (ref$.file = {})\n  };\n  submit = function(){\n    return auth.recaptcha.get().then(function(recaptcha){\n      var json;\n      json = {\n        recaptcha: recaptcha,\n        file: payload.file,\n        slug: slug\n      };\n      return ld$.fetch('\u002Fdash\u002Fapi\u002Ffuture-content\u002Fprj', {\n        method: 'POST'\n      }, {\n        json: json\n      });\n    }).then(function(){\n      return alert('updated');\n    })['catch'](function(){\n      return alert(\"failed to upload\");\n    });\n  };\n  getSignedUrl = function(opt){\n    opt == null && (opt = {});\n    return ld$.fetch(\"\u002Fdash\u002Fapi\u002Fgcs\u002Fupload\", {\n      method: 'POST'\n    }, {\n      json: opt,\n      type: 'json'\n    });\n  };\n  uploadFile = function(arg$){\n    var file, infoNode, field, opt;\n    file = arg$.file, infoNode = arg$.infoNode, field = arg$.field;\n    if (!((field === 'video' && file.type === \"video\u002Fmp4\") || file.type === 'application\u002Fpdf')) {\n      return Promise.reject(new ldError(1020));\n    }\n    opt = {\n      filename: file.name,\n      size: file.size,\n      owner: vlc.prj.owner || lc.global.user.key,\n      brd: 'future-content',\n      field: field\n    };\n    return getSignedUrl(opt).then(function(arg$){\n      var signedUrl, id;\n      signedUrl = arg$.signedUrl, id = arg$.id;\n      return ld$.xhr(signedUrl, {\n        method: 'PUT',\n        body: file,\n        headers: {\n          \"Content-Type\": file.type\n        }\n      }, {\n        noDefaultHeaders: true,\n        progress: function(it){\n          if (!infoNode) {\n            return;\n          }\n          infoNode.innerText = \"上傳中 \u002F \" + Math.floor(it.percent * 10000) \u002F 100 + \"%\";\n          return infoNode.removeAttribute('href');\n        }\n      }).then(function(){\n        return {\n          filename: file.name,\n          size: file.size,\n          id: id,\n          modifiedtime: file.lastModified\n        };\n      });\n    });\n  };\n  raw = (ref$ = (ref1$ = (ref2$ = viewLocals.prj).detail || (ref2$.detail = {})).custom || (ref1$.custom = {})).raw || (ref$.raw = {});\n  slug = viewLocals.prj.slug;\n  ldld = new ldLoader({\n    className: 'ldld full'\n  });\n  return auth.get().then(function(g){\n    var view;\n    lc.global = g;\n    return view = new ldView({\n      root: '[ld-scope=prj-detail]',\n      action: {\n        change: {\n          \"file-upload\": function(arg$){\n            var node, evt, name, btn, infoNode, p;\n            node = arg$.node, evt = arg$.evt;\n            name = node.getAttribute('data-name');\n            btn = ld$.parent(node, '.btn');\n            if (btn) {\n              btn.classList.toggle('running', true);\n            }\n            infoNode = view.getAll(\"file-uploaded\").filter(function(it){\n              return it.classList.contains('no-print');\n            }).filter(function(it){\n              return it.getAttribute('data-name') === name;\n            })[0];\n            p = !(node.files && node.files.length)\n              ? Promise.resolve().then(function(){\n                return payload.file[name] = null;\n              })\n              : uploadFile({\n                file: node.files[0],\n                infoNode: infoNode,\n                field: name\n              }).then(function(it){\n                return payload.file[name] = it;\n              });\n            return p['finally'](function(){\n              if (btn) {\n                btn.classList.toggle('running', false);\n              }\n              node.value = null;\n              return view.render('file-uploaded');\n            }).then(function(it){\n              payload.file[name] = it;\n              return submit();\n            }).then(function(){\n              return alert('ok');\n            })['catch'](function(e){\n              if (ldError.id(e) === 1020) {\n                return alert(\"不支援此種檔案類型，請用 \" + (name === 'video' ? \"MP4\" : \"PDF\"));\n              } else {\n                return alert(\"上傳失敗。請晚點再試一次\");\n              }\n            });\n          }\n        },\n        click: {\n          submit: submit,\n          \"update-note\": function(){\n            var ref$, json;\n            if (!((ref$ = lc.global.user.key) === 1 || ref$ === 4)) {\n              return;\n            }\n            json = {\n              slug: slug,\n              note: raw[\"註\"]\n            };\n            ldld.on();\n            return auth.recaptcha.get().then(function(recaptcha){\n              return json.recaptcha = recaptcha;\n            }).then(function(){\n              return ld$.fetch(\"\u002Fdash\u002Fapi\u002Ffuture-content\u002Fprj\", {\n                method: \"POST\"\n              }, {\n                json: json\n              });\n            })['finally'](function(){\n              return ldld.off();\n            }).then(function(){\n              return notify.send('success', \"已更新\");\n            })['catch'](function(it){\n              return error()(it);\n            });\n          }\n        },\n        input: {\n          note: function(arg$){\n            var node;\n            node = arg$.node;\n            return raw[\"註\"] = node.value || '';\n          }\n        }\n      },\n      handler: {\n        \"note-widget\": function(arg$){\n          var node, ref$;\n          node = arg$.node;\n          return node.classList.toggle('d-none', !((ref$ = lc.global.user.key) === 1 || ref$ === 4));\n        },\n        \"update-note\": function(arg$){\n          var node;\n          node = arg$.node;\n          return node.classList.remove('d-none');\n        },\n        note: function(arg$){\n          var node;\n          node = arg$.node;\n          node.value = raw[\"註\"] || '';\n          node.setAttribute('disabled', false);\n          return node.disabled = false;\n        },\n        \"file-uploaded\": function(arg$){\n          var node, name, data, date;\n          node = arg$.node;\n          name = node.getAttribute('data-name');\n          node.removeAttribute('href');\n          node.classList.remove('text-danger');\n          if (!((data = payload.file[name]) && payload.file[name].id)) {\n            node.classList.add('text-danger');\n            return node.innerText = \"尚未上傳檔案\";\n          }\n          if (node.classList.contains('no-print')) {\n            date = data.modifiedtime ? \"\u002F 檔案修改時間: \" + moment(data.modifiedtime).tz(\"Asia\u002FTaipei\").format(\"YYYY-MM-DD hh:mm:ss\") : \"\";\n            node.innerText = data.filename + \" \u002F size: \" + Math.round(data.size \u002F 1024) + \"KB \" + date + \" ( 點擊開啟 )\";\n          } else {\n            node.innerText = \"已上傳\";\n          }\n          return node.setAttribute('href', \"\u002Fdash\u002Fflagship\u002Fupload\u002F\" + data.id);\n        }\n      }\n    });\n  });\n});\u003C\u002Fscript\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cscript type=\"module\"\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-future-content\u002Fprj-view.pug";
pug_html = pug_html + "\u002F\u002F Generated by LiveScript 1.3.0\nldc.register(['blockbase', 'viewLocals', 'auth', 'ldNotify', 'error', 'notify', 'viewmode'], function(arg$){\n  var blockbase, viewLocals, auth, error, notify, blockdef, brd, root, data;\n  blockbase = arg$.blockbase, viewLocals = arg$.viewLocals, auth = arg$.auth, error = arg$.error, notify = arg$.notify;\n  blockdef = {\n    name: '@taiccadash\u002Ffuture-content',\n    version: 'main'\n  };\n  brd = \"future-content\";\n  root = document.querySelector('#root');\n  data = {\n    isEmbedded: true\n  };\n  return blockbase.init({\n    blockdef: blockdef,\n    brd: brd,\n    root: root,\n    data: data\n  })['catch'](function(it){\n    console.log('failed: ', it);\n    return Promise.reject(it);\n  });\n});\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";
    }.call(this, "Array" in locals_for_with ?
        locals_for_with.Array :
        typeof Array !== 'undefined' ? Array : undefined, "Date" in locals_for_with ?
        locals_for_with.Date :
        typeof Date !== 'undefined' ? Date : undefined, "JSON" in locals_for_with ?
        locals_for_with.JSON :
        typeof JSON !== 'undefined' ? JSON : undefined, "b64img" in locals_for_with ?
        locals_for_with.b64img :
        typeof b64img !== 'undefined' ? b64img : undefined, "blockLoader" in locals_for_with ?
        locals_for_with.blockLoader :
        typeof blockLoader !== 'undefined' ? blockLoader : undefined, "c" in locals_for_with ?
        locals_for_with.c :
        typeof c !== 'undefined' ? c : undefined, "cssLoader" in locals_for_with ?
        locals_for_with.cssLoader :
        typeof cssLoader !== 'undefined' ? cssLoader : undefined, "ctrl" in locals_for_with ?
        locals_for_with.ctrl :
        typeof ctrl !== 'undefined' ? ctrl : undefined, "decache" in locals_for_with ?
        locals_for_with.decache :
        typeof decache !== 'undefined' ? decache : undefined, "defer" in locals_for_with ?
        locals_for_with.defer :
        typeof defer !== 'undefined' ? defer : undefined, "escape" in locals_for_with ?
        locals_for_with.escape :
        typeof escape !== 'undefined' ? escape : undefined, "escjson" in locals_for_with ?
        locals_for_with.escjson :
        typeof escjson !== 'undefined' ? escjson : undefined, "form" in locals_for_with ?
        locals_for_with.form :
        typeof form !== 'undefined' ? form : undefined, "libLoader" in locals_for_with ?
        locals_for_with.libLoader :
        typeof libLoader !== 'undefined' ? libLoader : undefined, "order" in locals_for_with ?
        locals_for_with.order :
        typeof order !== 'undefined' ? order : undefined, "prefix" in locals_for_with ?
        locals_for_with.prefix :
        typeof prefix !== 'undefined' ? prefix : undefined, "reports" in locals_for_with ?
        locals_for_with.reports :
        typeof reports !== 'undefined' ? reports : undefined, "scriptLoader" in locals_for_with ?
        locals_for_with.scriptLoader :
        typeof scriptLoader !== 'undefined' ? scriptLoader : undefined, "url" in locals_for_with ?
        locals_for_with.url :
        typeof url !== 'undefined' ? url : undefined, "version" in locals_for_with ?
        locals_for_with.version :
        typeof version !== 'undefined' ? version : undefined));
    ;} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 