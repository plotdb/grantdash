 (function() { function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (Array, JSON, blockLoader, cssLoader, decache, escape, parentName, prefix, scriptLoader) {;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fversion.pug";
var version = "bc20158";
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
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var config = $$obj[pug_index2];
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
    for (var pug_index2 in $$obj) {
      $$l++;
      var config = $$obj[pug_index2];
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
pug_mixins["scope"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 119;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var prentName = prefix.currentName;
;pug_debug_line = 120;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = name;
;pug_debug_line = 121;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
if (attributes.class && /naked-scope/.exec(attributes.class)) {
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
}
else {
;pug_debug_line = 124;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"ld-scope": pug_escape(name || '')},attributes]), true)) + "\u003E";
;pug_debug_line = 125;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 126;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = parentName;
};
;pug_debug_line = 127;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
var ctrl = {
  cover: {authpanel: false},
  navtop: {placeholder: true, shown: true},
  foot: {shown: true}
}
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
var vars = {root: ""}
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/tagify/3.9.1/tagify.css");
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/bootstrap/4.3.1/css/bootstrap.min.css");
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/ldui/ldui.min.css");
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["css"]("/dash/css/index.css");
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + ".blform {\n  border-left: 0.25em solid #eee;\n  padding: 0 0 0 1em;\n  margin-bottom: 2em;\n}\n.typeset.heading-contrast .table-tiny th,\n.typeset.heading-contrast .table-tiny td {\n  font-size: 0.9em;\n}\n.typeset.heading-contrast .table-tiny td {\n  padding: 0.75em 2px;\n}\n.typeset.heading-contrast .table-tiny td input,\n.typeset.heading-contrast .table-tiny td .form-control {\n  font-size: 0.8em;\n}\n.typeset.heading-contrast .table-tiny td input.is-valid {\n  background-image: none;\n}\n.typeset.heading-contrast .form-group {\n  margin-bottom: 1.5rem;\n}\n.typeset.heading-contrast .form-control._preview {\n  border-radius: 0;\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  background: #f2f3f4;\n  display: none;\n}\n.typeset.heading-contrast select.form-control.is-valid,\n.typeset.heading-contrast textarea.form-control.is-valid,\n.typeset.heading-contrast input.form-control.is-valid {\n  border-color: #ccc;\n  background-image: none;\n  padding-right: 0.75rem !important;\n}\n.form-check-input.is-valid ~ .form-check-label {\n  color: inherit;\n}\n.page {\n  page-break-after: always;\n  margin: 2em 2em;\n}\n.page.page-cover {\n  margin: 0;\n  height: 29.7cm;\n}\n.form-inner-box {\n  padding: 3em;\n  border-radius: 0.5em;\n  border: 1px solid #ddd;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n.no-break {\n  page-break-inside: avoid;\n}\n.only-print {\n  display: none;\n}\n@page {\n  margin: 20mm 10mm;\n}\n@media print {\n  body {\n    margin: 0 !important;\n  }\n  .page {\n    margin: 0 !important;\n  }\n  .no-print,\n  .grecaptcha-badge {\n    display: none !important;\n  }\n  .only-print {\n    display: block !important;\n  }\n  .form-inner-box {\n    border: 0;\n    box-shadow: none;\n    padding: 0;\n  }\n  .typeset.heading-contrast input.form-control,\n  .typeset.heading-contrast textarea.form-control,\n  .typeset.heading-contrast select.form-control {\n    display: none !important;\n  }\n  .typeset.heading-contrast .form-control._preview {\n    display: block;\n  }\n}\n\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Cbody" + (pug_attr("data-spy", (ctrl.scrollspy?"scroll":false), true, true)+pug_attr("data-target", (ctrl.scrollspy?ctrl.scrollspy:false), true, true)) + "\u003E";
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
      for (var pug_index11 = 0, $$l = $$obj.length; pug_index11 < $$l; pug_index11++) {
        var config = $$obj[pug_index11];
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
    for (var pug_index11 in $$obj) {
      $$l++;
      var config = $$obj[pug_index11];
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
pug_mixins["scope"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 119;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var prentName = prefix.currentName;
;pug_debug_line = 120;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = name;
;pug_debug_line = 121;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
if (attributes.class && /naked-scope/.exec(attributes.class)) {
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
}
else {
;pug_debug_line = 124;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"ld-scope": pug_escape(name || '')},attributes]), true)) + "\u003E";
;pug_debug_line = 125;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 126;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = parentName;
};
;pug_debug_line = 127;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_mixins["register-locals"] = pug_interp = function(name = "exports"){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
if (locals) {
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "ldc.register(\"viewLocals\", [], function() {";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "  return ";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + (null == (pug_interp = escjson(locals[name] || null)) ? "" : pug_interp);
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + ";";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "});\u003C\u002Fscript\u003E";
}
};
}
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";



























;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_mixins["brd-local-info"] = pug_interp = function(opt){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
if (opt.starttime) {
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.starttime) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
if (opt.endtime) {
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "~ ";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.endtime) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
if (!(opt.starttime && opt.endtime)) {
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "時間未定\u003C\u002Fspan\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
if (opt.location) {
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.location) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";























;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fbrd.pug";























;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_mixins["form-card"] = pug_interp = function(opt = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
if (opt.bare) {
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"class": "mb-4"},attributes]), true)) + "\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_mixins["form-head"](opt);
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
else {
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"class": "card shadow-sm mb-4"},attributes]), true)) + "\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-2\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_mixins["form-head"](opt);
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
};
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_mixins["form-head"] = pug_interp = function(opt = {}){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex mb-2\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-0\" style=\"font-weight:500;font-size:1.25em\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.title || '問題的標題') ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted\" style=\"font-weight:200\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.description || '關於這個問題的一個簡短的描述') ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";











;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";











































;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";























;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";




































;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";
































;pug_debug_line = 58;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fform.pug";





















;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Forg.pug";

















;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Forg.pug";

















;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";

































;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";

































;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";





;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";

































;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";

































;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";


































;pug_debug_line = 75;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";



























;pug_debug_line = 84;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";



























;pug_debug_line = 94;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_mixins["prj-list-ctrl"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 95;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex w-100 justify-content-between py-2\"\u003E";
;pug_debug_line = 96;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 97;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn-group\"\u003E";
;pug_debug_line = 98;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\"\u003E";
;pug_debug_line = 98;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "許願池\u003C\u002Fdiv\u003E";
;pug_debug_line = 99;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\"\u003E";
;pug_debug_line = 99;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "得獎提案\u003C\u002Fdiv\u003E";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary active\"\u003E";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "全部提案 ";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Ci class=\"i-check\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 101;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 102;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 103;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" placeholder=\"搜尋提案...\"\u003E";
;pug_debug_line = 104;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "搜尋 ";
;pug_debug_line = 105;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003Ci class=\"i-search\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 105;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 108;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fprj.pug";































































;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fuser.pug";









;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_mixins["sort-item"] = pug_interp = function(opt){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + "\u003Cdiv class=\"sort-item d-flex align-items-center\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars mr-4\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + "\u003Cdiv class=\"name flex-grow-1\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + "\u003Ci class=\"i-link ml-4\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus ml-4\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";
pug_html = pug_html + "\u003Ci class=\"i-close ml-4\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fsort.pug";










































































;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";



















;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";



















;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
if(!ctrl.navtop) { ctrl.navtop = {placeholder: true, shown: true}; }
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
if(!ctrl.navtop.className) { ctrl.navtop.className = "navbar-light bg-semi-light" };
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
if (ctrl.navtop.shown) {
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv id=\"nav-top\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cnav" + (pug_attr("class", pug_classes(["navbar","navbar-expand-lg","fixed-top",ctrl.navtop.className], [false,false,false,true]), false, true)+pug_attr("data-transition", ctrl.navtop.transition, true, true)+pug_attr("data-transition-target", ctrl.navtop.transitionTarget, true, true)) + "\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar-brand\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca pd=\"brand-org\" href=\"\u002F\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"ml-2\" pd=\"brand-brd\" href=\"#\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cbutton class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#nav-top-content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cspan class=\"navbar-toggler-icon\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cul class=\"navbar-nav ml-auto\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item d-none\" ld=\"signup\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "註冊\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item d-none\" ld=\"login\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "登入\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item dropdown\" ld=\"profile\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link dropdown-toggle d-flex align-items-center\" href=\"#\" data-toggle=\"dropdown\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"avatar mr-2\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cspan ld=\"displayname\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu dropdown-menu-right shadow-sm\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" href=\"\u002Fdash\u002Fme\u002F\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "個人頁面\u003C\u002Fa\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" href=\"\u002Fdash\u002Fme\u002Fsettings\u002F\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "帳號設定\u003C\u002Fa\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" href=\"#\" onclick=\"lda.general.admin()\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "主控台\u003C\u002Fa\u003E";
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" ld=\"logout\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "登出\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
},
attributes: {"class": "collapse navbar-collapse","id": "nav-top-content"}
}, "nav-top");
pug_html = pug_html + "\u003C\u002Fnav\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
if (ctrl.navtop.placeholder) {
;pug_debug_line = 42;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv id=\"nav-top-placeholder\"\u003E\u003C\u002Fdiv\u003E";
}
}
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
      for (var pug_index22 = 0, $$l = $$obj.length; pug_index22 < $$l; pug_index22++) {
        var config = $$obj[pug_index22];
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
    for (var pug_index22 in $$obj) {
      $$l++;
      var config = $$obj[pug_index22];
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
pug_mixins["scope"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 119;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var prentName = prefix.currentName;
;pug_debug_line = 120;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = name;
;pug_debug_line = 121;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
if (attributes.class && /naked-scope/.exec(attributes.class)) {
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
}
else {
;pug_debug_line = 124;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"ld-scope": pug_escape(name || '')},attributes]), true)) + "\u003E";
;pug_debug_line = 125;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 126;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = parentName;
};
;pug_debug_line = 127;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_mixins["register-locals"] = pug_interp = function(name = "exports"){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
if (locals) {
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "ldc.register(\"viewLocals\", [], function() {";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "  return ";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + (null == (pug_interp = escjson(locals[name] || null)) ? "" : pug_interp);
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + ";";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "});\u003C\u002Fscript\u003E";
}
};
}
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"not-sync\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-640 rwd\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body text-center\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "糟糕，有東西出錯了！\u003C\u002Fh1\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "若您繼續編輯，資料可能會遺失\u003C\u002Fp\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-auto text-left text-muted\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "到目前為止您的編輯資料都有正確更新，但系統在執行您剛剛最後一個的編輯時出了些差錯。因此，若您繼續編輯，接下來的改動可能會因無法存檔而遺失。\u003C\u002Fp\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "會發生這個問題有可能是因為網路狀況不穩、主機崩潰或是您運氣不好踩到了程式的 Bug ，建議您確認一下網路的狀況，若問題持續未改善，請 ";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Ca href=\"#\" onclick=\"lda.ldcvmgr.toggle('contact')\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "直接聯繫我們\u003C\u002Fa\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + " 看看我們能否盡快為您排除這個問題。\u003C\u002Fp\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md mr-2\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark btn-block btn-lg mr-2\" onclick=\"window.location.reload()\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "重新載入\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md ml-2\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary btn-block btn-lg mr-2\" onclick=\"lda.ldcvmgr.toggle('contact')\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Fnot-sync.pug";
pug_html = pug_html + "聯繫我們\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
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
      for (var pug_index31 = 0, $$l = $$obj.length; pug_index31 < $$l; pug_index31++) {
        var config = $$obj[pug_index31];
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
    for (var pug_index31 in $$obj) {
      $$l++;
      var config = $$obj[pug_index31];
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
pug_mixins["scope"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 119;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
var prentName = prefix.currentName;
;pug_debug_line = 120;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = name;
;pug_debug_line = 121;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
if (attributes.class && /naked-scope/.exec(attributes.class)) {
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
}
else {
;pug_debug_line = 124;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"ld-scope": pug_escape(name || '')},attributes]), true)) + "\u003E";
;pug_debug_line = 125;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
block && block();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 126;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";
prefix.currentName = parentName;
};
;pug_debug_line = 127;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";





;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fstatic\u002Fassets\u002Flib\u002Fldui\u002Fpug\u002Fext\u002Findex.pug";












;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_mixins["register-locals"] = pug_interp = function(name = "exports"){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
if (locals) {
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "ldc.register(\"viewLocals\", [], function() {";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "  return ";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + (null == (pug_interp = escjson(locals[name] || null)) ? "" : pug_interp);
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + ";";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";
pug_html = pug_html + "});\u003C\u002Fscript\u003E";
}
};
}
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"offline-retry\" data-lock=\"true\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "與主機的連線中斷了，嘗試重新連線 ...\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcover\u002Foffline-retry.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-lg mt-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldNotify\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
;pug_debug_line = 73;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["category"] = pug_interp = function(name){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex flex-wrap\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "視覺藝術";
}
}, name, "視覺藝術", false);
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "表演藝術";
}
}, name, "表演藝術", false);
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "文化資產及展演設施";
}
}, name, "文化資產及展演設施", false);
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "工藝";
}
}, name, "工藝", false);
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "電影及動畫";
}
}, name, "電影及動畫", false);
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "遊戲";
}
}, name, "遊戲", false);
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "廣播電視";
}
}, name, "廣播電視", false);
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "出版";
}
}, name, "出版", false);
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "設計";
}
}, name, "設計", false);
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "時尚";
}
}, name, "時尚", false);
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "建築";
}
}, name, "建築", false);
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "數位內容";
}
}, name, "數位內容", false);
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "流行音樂";
}
}, name, "流行音樂", false);
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"].call({
block: function(){
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "漫畫";
}
}, name, "漫畫", false);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-check mr-4 d-flex align-items-start\"\u003E";
;pug_debug_line = 90;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-check-input\""+" type=\"checkbox\""+pug_attr("name", name, true, true)+" value=\"其它\"") + "\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"form-check-label\"\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "其它\u003C\u002Flabel\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group d-inline-block ml-2 mb-0\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-control form-control-sm\""+pug_attr("name", name+"-other", true, true)) + "\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 96;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"] = pug_interp = function(opt){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block align-bottom\"\u003E";
;pug_debug_line = 98;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (pug_attrs(pug_merge([{"class": "form-control form-control-sm","style": pug_escape(pug_style(`width:${opt.len}em`)),"name": pug_escape(opt.name)},attributes]), true)) + "\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 100;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["checkbox"] = pug_interp = function(name,value,checked){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-check mr-4\"\u003E";
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-check-input\""+" type=\"checkbox\""+pug_attr("name", name, true, true)+pug_attr("value", value, true, true)+pug_attr("checked", checked, true, true)) + "\u003E";
;pug_debug_line = 103;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"form-check-label\"\u003E";
;pug_debug_line = 104;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
block && block();
pug_html = pug_html + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"] = pug_interp = function(name,value,checked){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 107;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-check\"\u003E";
;pug_debug_line = 108;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-check-input\""+" type=\"radio\""+pug_attr("name", name, true, true)+pug_attr("value", value, true, true)+pug_attr("checked", checked, true, true)) + "\u003E";
;pug_debug_line = 109;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"form-check-label\"\u003E";
;pug_debug_line = 110;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
block && block();
pug_html = pug_html + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-1024 rwd mx-auto typeset heading-contrast position-relative\"\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cform id=\"flagship-form\"\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-inner-box\"\u003E";
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"page page-cover vertical-center only-print\"\u003E";
;pug_debug_line = 114;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 115;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-lg my-4 text-right\"\u003E";
;pug_debug_line = 116;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 116;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "封面\u003C\u002Fdiv\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "編號: ";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"docid\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 117;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 119;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 120;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 120;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "109年度文化內容開發與內容產業領航行動方案\u003C\u002Fh2\u003E";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 122;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 122;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫書\u003C\u002Fh2\u003E";
;pug_debug_line = 123;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-lg my-4\"\u003E";
;pug_debug_line = 125;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 125;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫名稱： ";
;pug_debug_line = 125;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"name\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 125;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "申請組別： ";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"group\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 126;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "申請單位： ";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"teamname\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 128;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](4);
;pug_debug_line = 129;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "中華民國 ";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-year\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 年 ";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-month\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 月 ";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-day\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 日\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 132;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"page\"\u003E";
;pug_debug_line = 133;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 134;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 135;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 135;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "文化內容開發與內容產業領航行動方案申請書\u003C\u002Fh3\u003E";
;pug_debug_line = 136;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 137;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-right\"\u003E";
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "編號: ";
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"docid\"\u003E";
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "N\u002FA\u003C\u002Fspan\u003E";
;pug_debug_line = 138;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 139;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 140;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 140;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫名稱\u003C\u002Fh4\u003E";
;pug_debug_line = 141;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"name\"\u003E";
;pug_debug_line = 142;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 142;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 143;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 143;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫類別（一與二為單選）：\u003C\u002Flabel\u003E";
;pug_debug_line = 144;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 144;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "一、文化內容開發組";
}
}, "group", "文化內容開發組", true);
;pug_debug_line = 145;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mb-4\"\u003E";
;pug_debug_line = 146;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 146;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "( 可複選 )\u003C\u002Fspan\u003E";
;pug_debug_line = 147;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["category"]("group1-category");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 148;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 148;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "二、內容產業領航行動組";
}
}, "group", "內容產業領航行動組", false);
;pug_debug_line = 149;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4\"\u003E";
;pug_debug_line = 150;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 150;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "( 可複選 )\u003C\u002Fspan\u003E";
;pug_debug_line = 151;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["category"]("group2-category");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 153;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](2);
;pug_debug_line = 154;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 155;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4 class=\"mb-4\"\u003E";
;pug_debug_line = 155;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "申請人基本資料\u003C\u002Fh4\u003E";
;pug_debug_line = 156;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 157;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 158;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 159;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 159;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "申請單位\u003C\u002Flabel\u003E";
;pug_debug_line = 160;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"teamname\"\u003E";
;pug_debug_line = 161;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 161;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 163;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 164;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 165;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 165;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "統一編號\u003C\u002Flabel\u003E";
;pug_debug_line = 166;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"vatid\"\u003E";
;pug_debug_line = 167;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 167;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "格式不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 169;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 170;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 171;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 172;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 172;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "負責人\u003C\u002Flabel\u003E";
;pug_debug_line = 173;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"pic\"\u003E";
;pug_debug_line = 174;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 174;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 176;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 177;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 178;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 178;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "身分證字號\u003C\u002Flabel\u003E";
;pug_debug_line = 179;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"uid\"\u003E";
;pug_debug_line = 180;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 180;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "格式不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 182;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 183;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 185;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 186;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 186;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "成立時間\u003C\u002Flabel\u003E";
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-1\"\u003E";
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "民國 ";
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:5, name: "incorp-year"});
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 年 ";
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:5, name: "incorp-month"});
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 月\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 188;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 189;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 190;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 190;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "資本額\u003C\u002Flabel\u003E";
;pug_debug_line = 191;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-1\"\u003E";
;pug_debug_line = 191;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新臺幣 ";
;pug_debug_line = 191;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:8, name: "capital"});
;pug_debug_line = 191;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 元整\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 193;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 194;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 195;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 195;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "員工人數\u003C\u002Flabel\u003E";
;pug_debug_line = 196;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"employee-count\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 197;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 198;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 198;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "登記地址\u003C\u002Flabel\u003E";
;pug_debug_line = 199;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"business-addr\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 200;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 201;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 201;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "聯絡地址\u003C\u002Flabel\u003E";
;pug_debug_line = 202;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"contact-addr\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 204;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 206;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 206;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "聯絡人\u003C\u002Fh5\u003E";
;pug_debug_line = 207;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"blform\"\u003E";
;pug_debug_line = 208;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 209;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 210;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 211;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 211;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "姓名\u003C\u002Flabel\u003E";
;pug_debug_line = 212;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"contact-name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 213;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 214;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 215;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 215;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "職稱\u003C\u002Flabel\u003E";
;pug_debug_line = 216;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"contact-title\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 217;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 218;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 219;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 220;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 220;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "專線電話\u003C\u002Flabel\u003E";
;pug_debug_line = 221;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"contact-phone\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 222;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 223;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 224;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 224;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "手機\u003C\u002Flabel\u003E";
;pug_debug_line = 225;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"contact-mobile\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 226;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 227;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 228;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 229;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 229;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "Email\u003C\u002Flabel\u003E";
;pug_debug_line = 230;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"contact-email\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 232;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 233;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 233;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "成立緣起 (100字)\u003C\u002Flabel\u003E";
;pug_debug_line = 234;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"6\" name=\"found-reason\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 235;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 235;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "字數不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 237;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 238;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 238;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "印鑑 ( 列印後用印一份 )\u003C\u002Flabel\u003E";
;pug_debug_line = 239;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row text-muted mb-4\"\u003E";
;pug_debug_line = 240;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 240;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 text-center\" style=\"border:1px solid #eee\"\u003E";
;pug_debug_line = 240;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "公司章\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 241;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 241;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 text-center\" style=\"border:1px solid #eee\"\u003E";
;pug_debug_line = 241;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "負責人章\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 243;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 244;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 244;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "備註\u003C\u002Flabel\u003E";
;pug_debug_line = 245;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"6\" name=\"comment\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 247;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](2);
;pug_debug_line = 249;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 250;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 250;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "民國106年至109年接受補助情形\u003C\u002Fh4\u003E";
;pug_debug_line = 251;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mb-4\"\u003E";
;pug_debug_line = 252;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 252;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "無 ( 勾本項者以下免填 )";
}
}, "has-sub", "0", true);
;pug_debug_line = 253;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 253;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "有";
}
}, "has-sub", "1", false);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 254;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"d-none\""+pug_attr("ldform", true, true, true)+" ld=\"toggler\" data-name=\"has-sub\"") + "\u003E";
;pug_debug_line = 255;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctable class=\"table table-bordered\"\u003E";
;pug_debug_line = 256;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 257;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 258;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth class=\"no-print\"\u003E\u003C\u002Fth\u003E";
;pug_debug_line = 259;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 259;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "民國年度\u003C\u002Fth\u003E";
;pug_debug_line = 260;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 260;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "受補助計畫名稱(政府補助案名)\u003C\u002Fth\u003E";
;pug_debug_line = 261;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 261;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助機關\u003C\u002Fth\u003E";
;pug_debug_line = 262;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 262;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助金額\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 263;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 264;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr ld-each=\"column\" data-name=\"past-sub\"\u003E";
;pug_debug_line = 265;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"clickable text-center pt-3 no-print\"\u003E";
;pug_debug_line = 265;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 266;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 266;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cselect class=\"form-control\" name=\"year\"\u003E";
;pug_debug_line = 267;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption" + (" value=\"106\""+pug_attr("selected", true, true, true)) + "\u003E";
;pug_debug_line = 267;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "106\u003C\u002Foption\u003E";
;pug_debug_line = 268;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption value=\"107\"\u003E";
;pug_debug_line = 268;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "107\u003C\u002Foption\u003E";
;pug_debug_line = 269;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption value=\"108\"\u003E";
;pug_debug_line = 269;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "108\u003C\u002Foption\u003E";
;pug_debug_line = 270;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption value=\"109\"\u003E";
;pug_debug_line = 270;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "109\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 271;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 271;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 272;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"name\"\u003E";
;pug_debug_line = 273;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 273;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 274;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 274;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 275;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"sponsor\"\u003E";
;pug_debug_line = 276;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 276;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 277;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 277;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 278;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"amount\"\u003E";
;pug_debug_line = 279;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 279;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 280;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary no-print\" ld=\"add-column\" data-name=\"past-sub\"\u003E";
;pug_debug_line = 280;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新增一項 ";
;pug_debug_line = 280;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 280;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 282;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](1);
;pug_debug_line = 283;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 285;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 285;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "民國 106 年至 109 年實績\u003C\u002Fh4\u003E";
;pug_debug_line = 286;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mb-4\"\u003E";
;pug_debug_line = 287;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 287;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "無 ( 勾本項者以下免填 )";
}
}, "has-perform", "0", true);
;pug_debug_line = 288;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 288;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "有";
}
}, "has-perform", "1", false);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 290;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"d-none\""+pug_attr("ldform", true, true, true)+" ld=\"toggler\" data-name=\"has-perform\"") + "\u003E";
;pug_debug_line = 291;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctable class=\"table table-bordered\"\u003E";
;pug_debug_line = 292;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 293;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 294;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth class=\"no-print\"\u003E\u003C\u002Fth\u003E";
;pug_debug_line = 295;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 295;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "民國年度\u003C\u002Fth\u003E";
;pug_debug_line = 296;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 296;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫名稱\u003C\u002Fth\u003E";
;pug_debug_line = 297;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 297;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫概述及執行情形 ( 200 字以內 )\u003C\u002Fth\u003E";
;pug_debug_line = 298;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 298;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "相關效益 ( 100 字以內 )\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 299;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 300;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr ld-each=\"column\" data-name=\"perform\"\u003E";
;pug_debug_line = 301;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"clickable text-center pt-3 no-print\"\u003E";
;pug_debug_line = 301;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 302;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 302;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cselect class=\"form-control\" name=\"year\"\u003E";
;pug_debug_line = 303;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption" + (" value=\"106\""+pug_attr("selected", true, true, true)) + "\u003E";
;pug_debug_line = 303;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "106\u003C\u002Foption\u003E";
;pug_debug_line = 304;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption value=\"107\"\u003E";
;pug_debug_line = 304;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "107\u003C\u002Foption\u003E";
;pug_debug_line = 305;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption value=\"108\"\u003E";
;pug_debug_line = 305;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "108\u003C\u002Foption\u003E";
;pug_debug_line = 306;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Coption value=\"109\"\u003E";
;pug_debug_line = 306;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "109\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 307;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 307;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 308;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"name\"\u003E";
;pug_debug_line = 309;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 309;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 310;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 310;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 311;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"5\" name=\"brief\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 312;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 312;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "字數不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 313;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 313;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 314;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"5\" name=\"result\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 315;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 315;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "字數不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 316;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary no-print\" ld=\"add-column\" data-name=\"perform\"\u003E";
;pug_debug_line = 316;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新增一項 ";
;pug_debug_line = 316;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 316;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 318;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](2);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 319;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"page\"\u003E";
;pug_debug_line = 320;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 320;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫摘要\u003C\u002Fh5\u003E";
;pug_debug_line = 322;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 323;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 323;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "工作項目 ( 200 字以內 )\u003C\u002Flabel\u003E";
;pug_debug_line = 324;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"6\" name=\"abs-item\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 325;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 325;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "字數不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 327;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 328;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 328;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "執行方式 ( 200 字以內 )\u003C\u002Flabel\u003E";
;pug_debug_line = 329;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"6\" name=\"abs-method\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 330;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 330;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "字數不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 332;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 333;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 333;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "執行期程 ( 200 字以內 )\u003C\u002Flabel\u003E";
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-1\"\u003E";
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "民國 109 年 ";
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:5, name: "exe-start-month"});
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 月 ";
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:5, name: "exe-start-day"});
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 日 ~ 民國 110 年 ";
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:5, name: "exe-end-month"});
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 月 ";
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:5, name: "exe-end-day"});
;pug_debug_line = 335;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 日\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 337;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 338;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 338;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "執行效益 ( 200 字以內 )\u003C\u002Flabel\u003E";
;pug_debug_line = 339;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"6\" name=\"abs-outcome\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 340;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 340;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "字數不符\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 342;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group only-print\"\u003E";
;pug_debug_line = 343;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 343;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "上傳計畫書 PDF ( 計畫書內容含目錄、原著授權、立案證明文件、合作意向書 \u002F 合約 )\u003C\u002Flabel\u003E";
;pug_debug_line = 344;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 345;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ca ld=\"file-uploaded\" data-name=\"plan\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 347;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 348;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 349;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 349;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算概況 ";
;pug_debug_line = 349;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan class=\"text-muted text-sm\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 349;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fh4\u003E";
;pug_debug_line = 350;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"blform\"\u003E";
;pug_debug_line = 351;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-2\"\u003E";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "計畫總經費\u003C\u002Fb\u003E";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan class=\"text-muted text-sm\"\u003E";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(由預算明細表自動帶入)\u003C\u002Fspan\u003E";
;pug_debug_line = 352;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 353;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 353;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新臺幣 ";
;pug_debug_line = 353;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget\"\u003E";
;pug_debug_line = 353;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 353;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 元整 ( 含稅 )\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 354;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row mb-4\"\u003E";
;pug_debug_line = 355;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "自籌款\u003C\u002Fb\u003E";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan class=\"text-muted text-sm\"\u003E";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(由預算明細表自動帶入)\u003C\u002Fspan\u003E";
;pug_debug_line = 356;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新臺幣 ";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-self\"\u003E";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 元整 ( 含稅 ), 比例: ";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-self-percent\"\u003E";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 357;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " %\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 358;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "申請經費\u003C\u002Fb\u003E";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan class=\"text-muted text-sm\"\u003E";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(由預算明細表自動帶入)\u003C\u002Fspan\u003E";
;pug_debug_line = 359;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新臺幣 ";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-subsidy\"\u003E";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 元整 ( 含稅 ), 比例: ";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-subsidy-percent\"\u003E";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "0\u003C\u002Fspan\u003E";
;pug_debug_line = 360;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " %\u003C\u002Fdiv\u003E";
;pug_debug_line = 361;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-danger d-none\" ld=\"budget-limit\"\u003E";
;pug_debug_line = 361;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助經費不得超過五百萬，且比例不得超過 49%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 363;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 363;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "本計畫是否申請或已獲其他機關 ( 單位 ) 經費補助？\u003C\u002Flabel\u003E";
;pug_debug_line = 364;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mb-4\"\u003E";
;pug_debug_line = 365;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["radio"].call({
block: function(){
;pug_debug_line = 365;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "否";
}
}, "has-other-sub", "0", true);
;pug_debug_line = 366;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-check d-flex align-items-center\"\u003E";
;pug_debug_line = 367;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-check-input\" type=\"radio\" name=\"has-other-sub\" value=\"1\"\u003E";
;pug_debug_line = 368;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"form-check-label\"\u003E";
;pug_debug_line = 369;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 369;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "是，本計畫已獲 ";
;pug_debug_line = 369;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:10,name:"other-sub-name"});
;pug_debug_line = 369;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 補助新臺幣 ";
;pug_debug_line = 369;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["input-inline"]({len:10,name:"other-sub-amount"});
;pug_debug_line = 369;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 元整。\u003C\u002Fdiv\u003E\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 371;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break\"\u003E";
;pug_debug_line = 372;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-end mb-2\"\u003E";
;pug_debug_line = 373;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4 class=\"mb-0\"\u003E";
;pug_debug_line = 373;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算明細表\u003C\u002Fh4\u003E";
;pug_debug_line = 374;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-1\"\u003E";
;pug_debug_line = 374;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u002F\u003C\u002Fspan\u003E";
;pug_debug_line = 375;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-primary clickable\" onclick=\"lda.ldcvmgr.toggle('flagship-budget-example')\"\u003E";
;pug_debug_line = 375;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "表格範例\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 376;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctable class=\"table table-bordered table-tiny\"\u003E";
;pug_debug_line = 377;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cthead\u003E";
;pug_debug_line = 378;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 379;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E\u003C\u002Fth\u003E";
;pug_debug_line = 380;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 380;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算科目\u003C\u002Fth\u003E";
;pug_debug_line = 381;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 381;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算明細\u003C\u002Fth\u003E";
;pug_debug_line = 382;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 382;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "單價(元)\u003C\u002Fth\u003E";
;pug_debug_line = 383;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 383;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "數量\u003C\u002Fth\u003E";
;pug_debug_line = 384;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 384;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "單位\u003C\u002Fth\u003E";
;pug_debug_line = 385;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 385;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "小計(元)\u003C\u002Fth\u003E";
;pug_debug_line = 386;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth colspan=\"2\"\u003E";
;pug_debug_line = 386;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "分攤金額\u003C\u002Fth\u003E";
;pug_debug_line = 387;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 387;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "備註\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 388;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 389;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 389;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "自籌款\u003C\u002Fth\u003E";
;pug_debug_line = 390;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 390;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助款\u003C\u002Fth\u003E\u003C\u002Ftr\u003E\u003C\u002Fthead\u003E";
;pug_debug_line = 391;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctbody\u003E";
;pug_debug_line = 392;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr ld-each=\"column\" data-name=\"budget\"\u003E";
;pug_debug_line = 393;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"clickable text-center pt-3\"\u003E";
;pug_debug_line = 393;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ci class=\"i-close no-print\"\u003E\u003C\u002Fi\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 394;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 394;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 395;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"cat\" placeholder=\"如:食宿費\"\u003E";
;pug_debug_line = 396;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 396;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 397;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 397;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 398;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"detail\" placeholder=\"如:便當\"\u003E";
;pug_debug_line = 399;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 399;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 400;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 400;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 401;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"price\" placeholder=\"如:100\"\u003E";
;pug_debug_line = 402;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 402;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 403;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 403;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 404;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"count\" placeholder=\"如:50\"\u003E";
;pug_debug_line = 405;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 405;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 406;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 406;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 407;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"unit\" placeholder=\"如:個\"\u003E";
;pug_debug_line = 408;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 408;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "不可留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 409;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 409;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 410;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-control\""+" name=\"total\""+pug_attr("readonly", true, true, true)+pug_attr("disabled", true, true, true)+" tabindex=\"-1\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 411;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 411;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 412;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"self\" placeholder=\"如:3000\"\u003E";
;pug_debug_line = 413;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 413;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "數字不合\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 414;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 414;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 415;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-control\""+" name=\"subsidy\""+pug_attr("readonly", true, true, true)+pug_attr("disabled", true, true, true)+" tabindex=\"-1\"") + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E";
;pug_debug_line = 416;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 416;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group m-0\"\u003E";
;pug_debug_line = 417;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"comment\" placeholder=\"如:10人*5餐\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 418;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 419;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-center align-middle\" colspan=\"7\"\u003E";
;pug_debug_line = 419;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "小計\u003C\u002Ftd\u003E";
;pug_debug_line = 420;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-right px-2\"\u003E";
;pug_debug_line = 420;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 420;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-self\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 420;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "元\u003C\u002Ftd\u003E";
;pug_debug_line = 421;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-right px-2\"\u003E";
;pug_debug_line = 421;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 421;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-subsidy\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 421;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "元\u003C\u002Ftd\u003E";
;pug_debug_line = 422;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 423;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 424;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-center align-middle\" colspan=\"7\"\u003E";
;pug_debug_line = 424;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助比例 ";
;pug_debug_line = 424;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\"\u003E";
;pug_debug_line = 424;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "( 補助款不得逾本案計畫書總經費之49.00% )\u003C\u002Fdiv\u003E";
;pug_debug_line = 424;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Ftd\u003E";
;pug_debug_line = 425;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-right px-2 align-middle\"\u003E";
;pug_debug_line = 425;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 425;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-self-percent\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 425;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "%\u003C\u002Ftd\u003E";
;pug_debug_line = 426;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-right px-2 align-middle\"\u003E";
;pug_debug_line = 426;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 426;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget-subsidy-percent\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 426;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "%\u003C\u002Ftd\u003E";
;pug_debug_line = 427;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 428;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 429;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-center align-middle\" colspan=\"7\"\u003E";
;pug_debug_line = 429;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "總計\u003C\u002Ftd\u003E";
;pug_debug_line = 430;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"text-right px-2\" colspan=\"2\"\u003E";
;pug_debug_line = 430;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "";
;pug_debug_line = 430;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"budget\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 430;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "元\u003C\u002Ftd\u003E";
;pug_debug_line = 431;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 433;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-start\"\u003E";
;pug_debug_line = 434;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 d-flex align-items-center\"\u003E";
;pug_debug_line = 435;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary no-print\" ld=\"add-column\" data-name=\"budget\"\u003E";
;pug_debug_line = 435;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "新增一項 ";
;pug_debug_line = 435;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 435;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 436;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-danger ml-4 d-none\" ld=\"budget-limit\"\u003E";
;pug_debug_line = 436;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助經費不得超過五百萬，且比例不得超過 49%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 437;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 437;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "單位: 新台幣\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 439;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](3);
;pug_debug_line = 441;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group no-print\"\u003E";
;pug_debug_line = 442;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 442;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "上傳計畫書 PDF ( 計畫書內容含目錄、原著授權、立案證明文件、合作意向書 \u002F 合約 )\u003C\u002Flabel\u003E";
;pug_debug_line = 443;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 444;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-upload btn-primary no-print\"\u003E";
;pug_debug_line = 444;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "上傳文件 ";
;pug_debug_line = 444;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput ld=\"file-upload\" type=\"file\" data-name=\"plan\"\u003E";
;pug_debug_line = 444;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " ";
;pug_debug_line = 444;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 444;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 445;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ca class=\"ml-4 no-print\" ld=\"file-uploaded\" data-name=\"plan\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 446;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ca class=\"ml-4 only-print\" ld=\"file-uploaded\" data-name=\"plan\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 449;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"page px-4\"\u003E";
;pug_debug_line = 450;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 450;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "109年度文化內容開發與內容產業領航行動方案切結書\u003C\u002Fh3\u003E";
;pug_debug_line = 452;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 452;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "茲保證「";
;pug_debug_line = 452;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"name\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 452;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "」計畫案（以下簡稱本計畫案）及立切結書人（即申請人）符合下列事項：\u003C\u002Fp\u003E";
;pug_debug_line = 453;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 453;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "一、承諾申請補助計畫之文件、資料均無虛偽不實之情事，且符合「109年度加速文化內容開發與科技創新應用補助要點」規定。\u003C\u002Fp\u003E";
;pug_debug_line = 454;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 454;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "二、承諾相同或類似之申請案計畫書無獲本院、文化部及其所屬機關(構)、政府捐助之財團法人及財團法人國家文化藝術基金會及國家表演藝術中心補助之情形。\u003C\u002Fp\u003E";
;pug_debug_line = 455;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 455;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "三、承諾計畫案如獲補助，以申請者名義執行獲補助之計畫。\u003C\u002Fp\u003E";
;pug_debug_line = 456;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 456;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "四、本計畫如獲補助，承諾依文化內容策進院核定之計畫書所載內容執行，且需符合「109年度加速文化內容開發與科技創新應用補助要點」規定；計畫書有變更者，亦同。\u003C\u002Fp\u003E";
;pug_debug_line = 457;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 457;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "五、本計畫案如獲補助，承諾不得將獲補助金資格或計畫書轉讓予他人。\u003C\u002Fp\u003E";
;pug_debug_line = 458;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 458;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "六、本計畫案如獲補助，使用補助金額辦理採購時，補助金額占採購金額半數以上，且補助金額在新臺幣一百萬元以上者，承諾應依政府採購法相關規定辦理採購，並受文化內容策進院監督。\u003C\u002Fp\u003E";
;pug_debug_line = 459;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 459;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "七、本計畫案如獲補助，應擔保計畫書內容及依計畫書所辦理之各項工作，均無侵害他人權利或違反法律規定之情事。\u003C\u002Fp\u003E";
;pug_debug_line = 460;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 460;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "八、本計畫案如獲補助，文化內容策進院及文化部於獲補助案執行期間，得要求獲補助者提供書面資料或出席會議說明，並依本院之意見確實執行。另自簽約日起至本院核撥最後一期補助金次日止及其後一年期間內，應配合出席計畫相關宣傳活動。\u003C\u002Fp\u003E";
;pug_debug_line = 461;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 461;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "九、本計畫案如獲補助，應承諾依預算法第六十二條之一規定，不得以置入性行銷進行政策宣導。如有政策宣導，應標示為「廣告」，並揭示本院及文化部全銜。\u003C\u002Fp\u003E";
;pug_debug_line = 462;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 462;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "十、本計畫之內部團隊成員與跨國合製案將依中國民國所得稅法及相關法令規定辦理所得申報扣繳及歸戶事宜，如有不實，願負一切法律責任。\u003C\u002Fp\u003E";
;pug_debug_line = 463;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 463;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "十一、獲補助者應於簽約前配合提供本部核定之計畫書摘要，並無償授權文化部、本院及本院再授權之人，為不限目的、時間、地域及方式(包括但不限於紙本、簡報、網路傳輸)之利用。獲補助者並同意對文化部、本院及本院再授權之人不行使著作人格權。文化部及本院並得另以開放資料(Open Data)之方式對外開放。開放資料授權利用，依據行政院訂定之政府開放資料授權條款http:\u002F\u002Fdata.gov.tw\u002Flicense辦理。\u003C\u002Fp\u003E";
;pug_debug_line = 464;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 465;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 466;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 466;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "此致\u003C\u002Fp\u003E";
;pug_debug_line = 467;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 467;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "文化內容策進院\u003C\u002Fp\u003E";
;pug_debug_line = 468;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 468;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "立切結書人（即申請人）：";
;pug_debug_line = 468;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"contact-name\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 468;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 469;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 469;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "負  責  人：";
;pug_debug_line = 469;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"pic\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 469;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 470;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 470;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "身分證字號： ";
;pug_debug_line = 470;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"uid\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 470;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 471;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 472;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break text-center\"\u003E";
;pug_debug_line = 473;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 473;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "印鑑 ( 列印後用印正本 )\u003C\u002Flabel\u003E";
;pug_debug_line = 474;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row text-muted mb-4 no-gutters\"\u003E";
;pug_debug_line = 475;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 475;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-4by3 text-center text-sm\" style=\"border:1px solid #eee\"\u003E";
;pug_debug_line = 475;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "公司章";
;pug_debug_line = 475;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 475;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(列印後用印一份)\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 476;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 476;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-4by3 text-center text-sm\" style=\"border:1px solid #eee\"\u003E";
;pug_debug_line = 476;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "負責人章";
;pug_debug_line = 476;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 476;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(列印後用印一份)\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "中華民國 ";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-year\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 年 ";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-month\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 月 ";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-day\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 478;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 日\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 481;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"page px-4\"\u003E";
;pug_debug_line = 482;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"border p-4 border-dark\"\u003E";
;pug_debug_line = 484;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3 class=\"text-center\"\u003E";
;pug_debug_line = 484;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "個人資料蒐集、處理、利用同意書\u003C\u002Fh3\u003E";
;pug_debug_line = 486;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 486;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "茲授權文化內容策進院依「個人資料保護法」及其他相關法令之規定，蒐集、管理及處理本人之資料，文化內容策進院基於特定目的得儲存、建檔、轉介、運用及處理本人所提供之各項資料。特此同意如上。\u003C\u002Fp\u003E";
;pug_debug_line = 487;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 487;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "此致\u003C\u002Fp\u003E";
;pug_debug_line = 488;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 488;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "文化內容策進院\u003C\u002Fp\u003E";
;pug_debug_line = 490;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-check mb-4\"\u003E";
;pug_debug_line = 491;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cinput class=\"form-check-input\" type=\"checkbox\" name=\"consent\" value=\"consent\"\u003E";
;pug_debug_line = 492;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel class=\"form-check-label\"\u003E";
;pug_debug_line = 492;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "我已閱讀並接受「授權文化內容策進院蒐集使用個人資料說明」。";
;pug_debug_line = 492;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan class=\"text-danger ml-2\"\u003E";
;pug_debug_line = 492;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "（記得勾選）\u003C\u002Fspan\u003E";
;pug_debug_line = 492;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 493;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 494;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 494;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 494;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 495;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 495;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "立切結書人(即申請人)： ";
;pug_debug_line = 495;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"contact-name\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 495;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 496;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 496;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "負責人：";
;pug_debug_line = 496;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"pic\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 496;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 497;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 497;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "身分證字號： ";
;pug_debug_line = 497;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"uid\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 497;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "中華民國 ";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-year\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 年 ";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-month\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 月 ";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"doc-day\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 498;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + " 日\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 499;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 500;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"no-break text-center\"\u003E";
;pug_debug_line = 501;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 501;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "印鑑 ( 列印後用印正本 )\u003C\u002Flabel\u003E";
;pug_debug_line = 502;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row text-muted mb-4 no-gutters\"\u003E";
;pug_debug_line = 503;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 503;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-4by3 text-center text-sm\" style=\"border:1px solid #eee\"\u003E";
;pug_debug_line = 503;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "公司章";
;pug_debug_line = 503;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 503;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(列印後用印一份)\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 504;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 504;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-4by3 text-center text-sm\" style=\"border:1px solid #eee\"\u003E";
;pug_debug_line = 504;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "負責人章";
;pug_debug_line = 504;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 504;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "(列印後用印一份)\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 506;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv id=\"check-all\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 508;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 508;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "授權文化內容策進院蒐集使用個人資料說明\u003C\u002Fh3\u003E";
;pug_debug_line = 509;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 509;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "為遵守個人資料保護法規定，並保障當事人之權利，謹此向您說明本院將如何處理所蒐集到的個人資料：\u003C\u002Fp\u003E";
;pug_debug_line = 510;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 510;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "一、同意本院蒐集、處理及利用您個人資料，所蒐集個人資料之類別不限本院「109年度加速文化內容開發與科技創新應用補助作業要點」申請表內所列。\u003C\u002Fp\u003E";
;pug_debug_line = 511;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 511;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "二、同意本院基於行政管理及業務之相關目的所需，以所提供之個人資料確認身分，與您聯絡，並於申請期間及執行結束後得繼續處理及利用您個人資料。\u003C\u002Fp\u003E";
;pug_debug_line = 512;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 512;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "三、您得依個人資料保護法第三條之規定，就其個人資料向本院行使下列權利：\u003C\u002Fp\u003E";
;pug_debug_line = 513;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Col\u003E";
;pug_debug_line = 514;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 514;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "查詢或請求閱覽。\u003C\u002Fli\u003E";
;pug_debug_line = 515;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 515;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "請求製給複製本。\u003C\u002Fli\u003E";
;pug_debug_line = 516;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 516;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "請求補充或更正。\u003C\u002Fli\u003E";
;pug_debug_line = 517;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 517;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "請求停止蒐集、處理或利用。\u003C\u002Fli\u003E";
;pug_debug_line = 518;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 518;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "請求刪除。但如係基於行政管理及業務等相關目的所必需，或其他法令有所規範者，本院得拒絕之。\u003C\u002Fli\u003E\u003C\u002Fol\u003E";
;pug_debug_line = 519;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 519;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "四、您得自由選擇是否提供個人資料或行使個人資料保護法第三條所定之權利，但因提供資料不足或有其他冒用、盜用、不實之情形，可能不能獲得補助資格或影響您受領補助之權益。\u003C\u002Fp\u003E";
;pug_debug_line = 520;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 520;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "五、您所提供之個人資料，本院將依據「個人資料保護法」相關規定進行保密。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 522;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-fixed w-100 no-print bg-white\" style=\"bottom:0;left:0;right:0;padding:1em 0;border-top:1px solid #ccc\"\u003E";
;pug_debug_line = 523;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-1024 mx-auto rwd\"\u003E";
;pug_debug_line = 524;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-stretch\"\u003E";
;pug_debug_line = 525;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv ld=\"not submitted\"\u003E";
;pug_debug_line = 525;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-stretch\"\u003E";
;pug_debug_line = 526;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary mr-2\" ld=\"save submit\"\u003E";
;pug_debug_line = 526;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 526;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 526;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "暫存進度\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 527;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary mr-2\" ld=\"submit\"\u003E";
;pug_debug_line = 528;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 528;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "線上送件\u003C\u002Fspan\u003E";
;pug_debug_line = 529;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm\"\u003E";
;pug_debug_line = 529;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "點選後將不能再修改檔案\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 530;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"submitted\"\u003E";
;pug_debug_line = 531;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary disabled mr-2\"\u003E";
;pug_debug_line = 532;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 532;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "案件已送出\u003C\u002Fspan\u003E";
;pug_debug_line = 533;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm\"\u003E";
;pug_debug_line = 533;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "無法再進行修改\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 534;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary mr-4\" ld=\"download\"\u003E";
;pug_debug_line = 535;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 535;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld-ext-right\"\u003E";
;pug_debug_line = 535;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "線上文件 PDF 檔下載 ";
;pug_debug_line = 535;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner ldld\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 535;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 536;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 536;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 536;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-danger\" ld=\"ready-state\"\u003E";
;pug_debug_line = 536;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "您有未完成的欄位，請完成後再送出。\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 538;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["nbr"](2);
;pug_debug_line = 540;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"flagship-print-timeout\" data-lock=\"true\"\u003E";
;pug_debug_line = 540;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 540;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 540;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 540;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 541;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 542;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 542;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "連線逾時\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 543;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\"\u003E";
;pug_debug_line = 543;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 543;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "主機沒有在一定的時間內產生 PDF 檔，可能是因為服務忙碌中。您可以稍候再重試一次，或者直接將此頁面列印成 PDF 檔做為您的申請書。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 544;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 545;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 546;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-block btn-outline-primary btn-block\" onclick=\"lda.ldcvmgr.toggle('flagship-print-timeout',false).then(function(){print()})\"\u003E";
;pug_debug_line = 547;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "列印此頁面\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 548;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 549;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-block btn-primary\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 549;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "稍候再試\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 551;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"flagship-submitting\" data-lock=\"true\"\u003E";
;pug_debug_line = 551;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 551;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 551;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 551;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 552;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 553;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 553;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "送件中 ...\u003C\u002Fdiv\u003E";
;pug_debug_line = 554;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-lg mt-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 555;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"flagship-submitted\" data-lock=\"true\"\u003E";
;pug_debug_line = 555;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 555;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 555;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 555;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 556;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 557;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 557;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "您的案件已送出\u003C\u002Fh2\u003E";
;pug_debug_line = 558;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 558;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "案件編號: ";
;pug_debug_line = 558;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cspan ld=\"fill\" data-name=\"docid\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 558;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 559;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\"\u003E";
;pug_debug_line = 560;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 560;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "請下載申請書 PDF 檔，印出紙本後用印寄回，以利後續作業。\u003C\u002Fp\u003E";
;pug_debug_line = 561;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 561;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "您隨時可以回到這個頁面重新下載 PDF 檔。若需要回到此頁，請由網頁右上角的下拉選單中點選「個人頁面」，即可找到您建立的案件。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 562;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-primary btn-block ld-ext-right\" ld=\"download\"\u003E";
;pug_debug_line = 562;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "線上文件 PDF 下載  ";
;pug_debug_line = 562;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner ldld\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 562;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 564;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"flagship-saving\" data-lock=\"true\"\u003E";
;pug_debug_line = 564;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 564;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 564;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 564;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 565;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 566;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 566;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "暫存進度中 ...\u003C\u002Fdiv\u003E";
;pug_debug_line = 567;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-lg mt-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 568;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"flagship-saved\" data-lock=\"true\"\u003E";
;pug_debug_line = 568;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-480 rwd\"\u003E";
;pug_debug_line = 568;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 568;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 568;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 569;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center\"\u003E";
;pug_debug_line = 570;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch2\u003E";
;pug_debug_line = 570;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "您的編輯進度已儲存。\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 571;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\"\u003E";
;pug_debug_line = 572;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 572;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "您隨時可以回到這個頁面繼續編輯。若需要回到此頁，請由網頁右上角的下拉選單中點選「個人頁面」，即可找到您建立的案件。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 573;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-lg btn-primary btn-block ld-ext-right\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 573;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "關閉\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 574;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"flagship-budget-example\"\u003E";
;pug_debug_line = 574;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-768 rwd\"\u003E";
;pug_debug_line = 574;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 574;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 574;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-2\"\u003E";
;pug_debug_line = 575;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 575;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算表填表範例\u003C\u002Fh4\u003E";
;pug_debug_line = 576;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted text-sm\"\u003E";
;pug_debug_line = 576;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "「小計」與「補助款」會依據您所填入的單價、數量與自籌款自動計算。備註則為選填。請注意補助款總計不可超過五百萬，且比例不得超過 49% 。\u003C\u002Fp\u003E";
;pug_debug_line = 577;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctable class=\"table table-bordered text-sm my-3\"\u003E";
;pug_debug_line = 578;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 579;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 579;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算科目\u003C\u002Fth\u003E";
;pug_debug_line = 580;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 580;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "預算明細\u003C\u002Fth\u003E";
;pug_debug_line = 581;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 581;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "單價(元)\u003C\u002Fth\u003E";
;pug_debug_line = 582;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 582;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "數量\u003C\u002Fth\u003E";
;pug_debug_line = 583;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 583;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "單位\u003C\u002Fth\u003E";
;pug_debug_line = 584;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 584;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "小計(元)\u003C\u002Fth\u003E";
;pug_debug_line = 585;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth colspan=\"2\"\u003E";
;pug_debug_line = 585;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "分攤金額\u003C\u002Fth\u003E";
;pug_debug_line = 586;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth rowspan=\"2\"\u003E";
;pug_debug_line = 586;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "備註\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 587;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 588;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 588;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "自籌款\u003C\u002Fth\u003E";
;pug_debug_line = 589;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 589;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "補助款\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 590;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 591;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 591;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "食宿費\u003C\u002Ftd\u003E";
;pug_debug_line = 592;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 592;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "便當\u003C\u002Ftd\u003E";
;pug_debug_line = 593;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 593;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "100\u003C\u002Ftd\u003E";
;pug_debug_line = 594;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 594;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "50\u003C\u002Ftd\u003E";
;pug_debug_line = 595;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 595;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "個\u003C\u002Ftd\u003E";
;pug_debug_line = 596;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"bg-light\"\u003E";
;pug_debug_line = 596;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "5000\u003C\u002Ftd\u003E";
;pug_debug_line = 597;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 597;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "3000\u003C\u002Ftd\u003E";
;pug_debug_line = 598;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"bg-light\"\u003E";
;pug_debug_line = 598;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "2000\u003C\u002Ftd\u003E";
;pug_debug_line = 599;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 599;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "10人*5餐\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 600;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 601;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 601;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "食宿費\u003C\u002Ftd\u003E";
;pug_debug_line = 602;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 602;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "雙人房\u003C\u002Ftd\u003E";
;pug_debug_line = 603;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 603;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "3000\u003C\u002Ftd\u003E";
;pug_debug_line = 604;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 604;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "25\u003C\u002Ftd\u003E";
;pug_debug_line = 605;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 605;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "房晚\u003C\u002Ftd\u003E";
;pug_debug_line = 606;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"bg-light\"\u003E";
;pug_debug_line = 606;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "75000\u003C\u002Ftd\u003E";
;pug_debug_line = 607;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 607;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "50000\u003C\u002Ftd\u003E";
;pug_debug_line = 608;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd class=\"bg-light\"\u003E";
;pug_debug_line = 608;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "25000\u003C\u002Ftd\u003E";
;pug_debug_line = 609;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 609;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "5房*5晚\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftable\u003E";
;pug_debug_line = 610;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-right\"\u003E";
;pug_debug_line = 611;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary\" data-ldcv-set=\"\"\u003E";
;pug_debug_line = 611;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_html = pug_html + "關閉\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
if (ctrl.cover.authpanel) {
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_mixins["authpanel"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card p-0 border-0 authpanel signup\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-0\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"closebtn\" data-ldcv-set=\"\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center p-4 info position-absolute h-100 w-50 text-light\" style=\"background: #455667 center center no-repeat;background-size:cover;\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100 bg-semi-dark\" style=\"top:0;left:0\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-left position-relative z-float text-shadow\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" data-info=\"failed\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ch2 class=\"mb-4 font-weight-bold\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "登入失敗。\u003C\u002Fh2\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "您之前可能用的是別組帳號或密碼，或者使用不同的登入方式。您可以試著：\u003C\u002Fp\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "換一組帳號、密碼或登入方式\u003C\u002Fli\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "確認您的 email 或密碼沒有打錯\u003C\u002Fli\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fdash\u002Fauth\u002Freset\u002F\" style=\"color:#0ff\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "重設密碼\u003C\u002Fa\u003E";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003C\u002Fli\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca href=\"#\" onclick=\"lda.ldcvmgr.toggle('contact');\" style=\"color:#0ff\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "與我們聯絡\u003C\u002Fa\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" data-info=\"token\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ch2 class=\"mb-4 font-weight-bold\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "歡迎您！\u003C\u002Fh2\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "您受邀成為我們的一員。不過，在繼續之前您需要先登入系統。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv data-info=\"default\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
if (block) {
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
block && block();
}
else {
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ch3 class=\"mb-2 font-weight-bold\" style=\"line-height:1em\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "登入系統\u003C\u002Fh3\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "電子郵件\u003C\u002Fb\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "即為您的帳號。若您代表您的團隊註冊，建議您使用一個";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "團隊可共用\u003C\u002Fb\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "的電子郵件。\u003C\u002Fp\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "登入之後即可進行提案、系統管理或評選工作。\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute text-sm\" style=\"bottom:20px;right:20px\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "Powered by Grant Dash\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"form bg-white w-50 h-100 d-flex flex-column\" style=\"margin-left:50%\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs pt-2 bg-light\" onclick=\"this.parentNode.classList.toggle('login');this.parentNode.classList.toggle('signup')\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item ml-2\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" data-action=\"signup\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "註冊\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" data-action=\"login\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "登入  \u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-3 pb-4 pt-3 text-left d-flex flex-column h-100\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "電子郵件\u003C\u002Flabel\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control form-control-sm\" name=\"email\" placeholder=\"電子郵件即您的帳號名稱\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "無效的電子郵件\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\" data-show=\"signup\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "顯示名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control form-control-sm\" name=\"displayname\" placeholder=\"例如：王小明\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "不能留白\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "密碼\u003C\u002Flabel\u003E";
;pug_debug_line = 48;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control form-control-sm\" name=\"passwd\" placeholder=\"密碼，至少八個字元\" type=\"password\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "不合格的密碼\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 50;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center form-text text-muted small\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "登入即表示您同意我們的 ";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fdash\u002Ftos\u002F\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "用戶條款\u003C\u002Fa\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + " 與 ";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fdash\u002Fprivacy\u002F\" target=\"_blank\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "隱私權政策\u003C\u002Fa\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 53;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-success btn-block disabled ld-ext-right\" data-action=\"submit\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cspan data-show=\"login\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "登入\u003C\u002Fspan\u003E";
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cspan data-show=\"signup\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "註冊\u003C\u002Fspan\u003E";
;pug_debug_line = 56;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ldld bare em-1\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between mt-1\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"small\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"small\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fdash\u002Fauth\u002Freset\u002F\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "忘記密碼？»\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 63;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 64;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"sep sep-text my-4\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "或者用下列登入\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 65;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary btn-block btn-sm\" onclick=\"lda.auth.fb()\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ci class=\"i-fb\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + " Facebook\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-sm\"\u003E";
;pug_debug_line = 67;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark btn-block btn-sm\" onclick=\"lda.auth.google()\"\u003E";
;pug_debug_line = 67;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "";
;pug_debug_line = 67;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ci class=\"i-google\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 67;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + " Google\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-640 mx-auto\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["authpanel"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
if (ctrl.foot.shown) {
}
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/moment.js/2.25.3/moment.min.js");
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldCaret/1.0.0/ldcaret.min.js");
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/moment-timezone.js/0.5.31/moment-timezone.min.js");
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/clipboard.js/2.0.4/clipboard.min.js");
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/tagify/3.9.1/tagify.min.js");
;pug_debug_line = 42;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/dompurify/2.0.11/purify.min.js");
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/marked/0.8.0/marked.min.js");
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/bootstrap.native/2.0.27/bootstrap-native-v4.min.js");
;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldui/ldui.min.js");
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldc/ldc.min.js");
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldsite/0.0.2/ldsite.min.js");
;pug_debug_line = 48;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/js/util/stage.js");
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
;pug_debug_line = 615;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["register-locals"]();
;pug_debug_line = 616;pug_debug_filename = "src\u002Fpug\u002Fview\u002Ftaicca-flagship\u002Fprj-view.pug";
pug_mixins["script"]("/dash/js/view/taicca-flagship/form.js");
;pug_debug_line = 50;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/js/ldsite.js");
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fbase.pug";
pug_mixins["script"]("/dash/js/site.js");
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"Array" in locals_for_with?locals_for_with.Array:typeof Array!=="undefined"?Array:undefined,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"blockLoader" in locals_for_with?locals_for_with.blockLoader:typeof blockLoader!=="undefined"?blockLoader:undefined,"cssLoader" in locals_for_with?locals_for_with.cssLoader:typeof cssLoader!=="undefined"?cssLoader:undefined,"decache" in locals_for_with?locals_for_with.decache:typeof decache!=="undefined"?decache:undefined,"escape" in locals_for_with?locals_for_with.escape:typeof escape!=="undefined"?escape:undefined,"parentName" in locals_for_with?locals_for_with.parentName:typeof parentName!=="undefined"?parentName:undefined,"prefix" in locals_for_with?locals_for_with.prefix:typeof prefix!=="undefined"?prefix:undefined,"scriptLoader" in locals_for_with?locals_for_with.scriptLoader:typeof scriptLoader!=="undefined"?scriptLoader:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 