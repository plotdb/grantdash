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
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {;var locals_for_with = (locals || {});(function (Array, JSON, Math, blockLoader, cssLoader, decache, escape, parentName, prefix, scriptLoader) {;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fversion.pug";
var version = "796e3d3";
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












;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fcommon.pug";






















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
pug_mixins["config-switch-lg"] = pug_interp = function(opt){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attrs(pug_merge([{"class": "config-switch d-flex mb-2 pt-2 align-items-center"},attributes]), true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.name) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = opt.desc) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-2\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"switch switch-lg\""+" ld=\"switch\""+pug_attr("data-name", opt.key, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fmixins\u002Fconfig.pug";



















;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
var ctrl = {
  cover: {authpanel: false},
  navtop: {placeholder: false, shown: true},
  foot: {shown: true}
}
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
var vars = {root: ""}
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Chtml\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/tail.datetime/0.4.13/css/tail.datetime-harx-light.min.css");
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/tagify/3.9.1/tagify.css");
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/bootstrap/4.3.1/css/bootstrap.min.css");
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/ldui/ldui.min.css");
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["css"]("/dash/assets/lib/ldui/ext/folder.min.css");
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["css"]("/dash/css/index.css");
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["css"]("/dash/assets/lib/handsontable/handsontable.min.css");
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldc/ldc.min.js");
pug_html = pug_html + "\u003C\u002Fhead\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cbody" + (" class=\"bg-secondary\""+pug_attr("data-spy", (ctrl.scrollspy?"scroll":false), true, true)+pug_attr("data-target", (ctrl.scrollspy?ctrl.scrollspy:false), true, true)) + "\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
if(!ctrl.navtop) { ctrl.navtop = {placeholder: true, shown: true}; }
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
if(!ctrl.navtop.className) { ctrl.navtop.className = "navbar-dark text-white" };
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
if (ctrl.navtop.shown) {
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"z-fixed\" id=\"nav-top\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cnav" + (pug_attr("class", pug_classes(["navbar","navbar-expand-lg","fixed-top","w-1200","rwd","mx-auto",ctrl.navtop.className], [false,false,false,false,false,false,true]), false, true)+pug_attr("data-transition", ctrl.navtop.transition, true, true)+pug_attr("data-transition-target", ctrl.navtop.transitionTarget, true, true)) + "\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"navbar-brand\" href=\"\u002F\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "Grant Dash\u003C\u002Fa\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cbutton class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#nav-top-content\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cspan class=\"navbar-toggler-icon\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cul class=\"navbar-nav ml-auto\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item d-none\" ld=\"signup\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "註冊\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item d-none\" ld=\"login\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "登入\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item dropdown\" ld=\"profile\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link dropdown-toggle d-flex align-items-center\" href=\"#\" data-toggle=\"dropdown\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"avatar mr-2\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cspan ld=\"displayname\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu dropdown-menu-right shadow-sm\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" href=\"\u002Fdash\u002Fme\u002F\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "個人頁面\u003C\u002Fa\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" href=\"\u002Fdash\u002Fme\u002Fsettings\u002F\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "帳號設定\u003C\u002Fa\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" href=\"#\" onclick=\"lda.general.admin()\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "主控台\u003C\u002Fa\u003E";
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-divider\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" ld=\"logout\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "登出\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
},
attributes: {"class": "collapse navbar-collapse","id": "nav-top-content"}
}, "nav-top");
pug_html = pug_html + "\u003C\u002Fnav\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
if (ctrl.navtop.placeholder) {
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fmodules\u002Fnavtop.pug";
pug_html = pug_html + "\u003Cdiv id=\"nav-top-placeholder\"\u003E\u003C\u002Fdiv\u003E";
}
}
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldNotify\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
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
pug_html = pug_html + "\u003Ca href=\"\u002Fauth\u002Freset\u002F\" style=\"color:#0ff\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
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
pug_html = pug_html + "\u003Ca href=\"\u002Ftos\u002F\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "用戶條款\u003C\u002Fa\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + " 與 ";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fmodules\u002Fwidget\u002Fauthpanel.pug";
pug_html = pug_html + "\u003Ca href=\"\u002Fprivacy\u002F\" target=\"_blank\"\u003E";
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
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-640 mx-auto\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["authpanel"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 33;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
if (ctrl.foot.shown) {
}
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/tail.datetime/0.4.13/js/tail.datetime-full.min.js");
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldCaret/1.0.0/ldcaret.min.js");
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/tagify/3.9.1/tagify.min.js");
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/moment.js/2.25.3/moment.min.js");
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/moment-timezone.js/0.5.31/moment-timezone.min.js");
;pug_debug_line = 41;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/bootstrap.native/2.0.27/bootstrap-native-v4.min.js");
;pug_debug_line = 42;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldui/ldui.min.js");
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldui/ext/folder.min.js");
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/js/site.js");
;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ldsite/0.0.2/ldsite.min.js");
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/sharedb-wrapper/client.bundle.min.js");
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/ctrlz/ctrlz.bundle.min.js");
;pug_debug_line = 48;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/assets/lib/suuid/suuid.bundle.min.js");
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_mixins["script"]("/dash/js/util/misc.js");
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldcv ldcvmgr\" data-name=\"create-brd-now\" data-lock=\"true\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"base w-640 rwd\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner card\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body text-center\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Ch1\u003E";
;pug_debug_line = 53;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "您尚無可用的活動\u003C\u002Fh1\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "想要使用 Grant Dash 嗎？現在就來建立活動吧！\u003C\u002Fp\u003E";
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 56;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cdiv class=\"m-auto text-left text-muted\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 57;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "您想要使用的功能需要先建立好活動才能開始使用。因此，若您想要使用這個功能，您可以先 ";
;pug_debug_line = 57;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Ca href=\"#\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "點擊我\u003C\u002Fa\u003E";
;pug_debug_line = 57;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + " 來進入活動建立流程，我們會一步步帶您完成活動的建立。\u003C\u002Fp\u003E";
;pug_debug_line = 58;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 59;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "\u003Ca class=\"btn btn-primary btn-block btn-lg mr-2\" href=\"\u002F\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
pug_html = pug_html + "回首頁\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
;pug_debug_line = 62;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fadmin\u002Fbase.pug";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv style=\"height:2.75em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-1200 h-100 rwd mx-auto d-flex shadow-lg rounded my-4 position-relative\" style=\"overflow:hidden\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100 bg-white vertical-center bg-cover\" pd=\"init-loader\" style=\"z-index:99999;background:radial-gradient(#fff,#eee,#ddd)\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center w-100\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-4\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cimg class=\"ldlz\" data-src=\"\u002Fdash\u002Fassets\u002Fimg\u002Fc\u002Flogo\u002Fgrantdash-benchnine.svg\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cimg class=\"ldlz\" data-src=\"\u002Fdash\u002Fassets\u002Fimg\u002Fc\u002Floader\u002Fspinner-gold.svg\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"sticky z-fixed bg-dark d-flex flex-column no-select\" style=\"top:0;transition:height .25s ease-in-out\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder border-bottom border-secondary text-sm no-dart\" ld=\"folder org-menu nav\" data-nav=\"main\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item folder-toggle d-flex align-items-center py-3 pr-3 pl-0\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-1\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-light rounded\" style=\"width:1.35em;height:1.35em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 text-truncate text-capitalize\" ld=\"org-name\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "...\u003C\u002Fdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-1\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"org-config\" data-nav=\"main\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "組織設定\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"org-page-info\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "頁面設定\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-2\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"clickable\" ld=\"brd-bar\" style=\"box-shadow:0 2px 3px rgba(0,0,0,1)\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center p-3 w-100\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 d-none\" ld=\"brd\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm\" ld=\"brd-progress\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ci class=\"i-radio mr-1\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-2\" ld=\"brd-progress-text\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "...\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-capitalize\" ld=\"brd-name\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 text-truncate\" ld=\"brd empty\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "請選擇活動 ...\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-2\" ld=\"brd-list-toggle\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ci class=\"i-dart-down\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"border-top border-secondary border-bottom\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder\" ld=\"folder brd-list\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item folder-toggle d-none\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-3 py-3\" ld=\"brds empty\"\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "目前尚沒有任何活動可供您做選擇。\u003C\u002Fdiv\u003E";
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4 px-2 text-center\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ca class=\"btn btn-primary\" href=\"\u002Fdash\u002Fnew\u002Fbrd\u002F\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "立刻建立活動\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-3 py-3\" ld=\"brds\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"pb-2 text-sm d-flex\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cb class=\"flex-grow-1\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "活動列表\u003C\u002Fb\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ca class=\"text-underline text-white\" href=\"\u002Fdash\u002Fnew\u002Fbrd\u002F\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "建立新活動\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ca class=\"py-2 d-block clickable text-no-deco text-white\" href=\"#\" ld-each=\"brd-entry\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-truncate\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted text-sm\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"pt-2\" pd=\"brd-menu\" ld=\"nav\" data-nav=\"main\"\u003E";
;pug_debug_line = 65;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"brd-config\"\u003E";
;pug_debug_line = 65;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "活動設定\u003C\u002Fdiv\u003E";
;pug_debug_line = 66;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder\" ld=\"folder\"\u003E";
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-toggle folder-item\"\u003E";
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "活動頁面\u003C\u002Fdiv\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ca class=\"folder-item d-flex\" ld=\"brd-page\" data-name=\"landing\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "入口網頁\u003C\u002Fdiv\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ci class=\"i-link\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 73;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ca class=\"folder-item d-flex\" ld=\"brd-page\" data-name=\"list\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "提案列表\u003C\u002Fdiv\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ci class=\"i-link\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ca class=\"folder-item d-flex\" ld=\"brd-page\" data-name=\"new-prj\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "建新提案\u003C\u002Fdiv\u003E";
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 80;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Ci class=\"i-link\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder show\" ld=\"folder\"\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-toggle folder-item\"\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "頁面客製\u003C\u002Fdiv\u003E";
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"brd-post-list\"\u003E";
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "貼文管理\u003C\u002Fdiv\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"brd-page-info\"\u003E";
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "頁面設定\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"border-bottom border-secondary my-2\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 94;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder\" ld-each=\"grp-entry\"\u003E";
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-toggle folder-item text-truncate\" ld=\"name\"\u003E";
;pug_debug_line = 95;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "分組\u003C\u002Fdiv\u003E";
;pug_debug_line = 96;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"grp-config\"\u003E";
;pug_debug_line = 97;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "設定\u003C\u002Fdiv\u003E";
;pug_debug_line = 98;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"grp-list\"\u003E";
;pug_debug_line = 98;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "專案列表\u003C\u002Fdiv\u003E";
;pug_debug_line = 100;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"nav-tab\" data-name=\"grp-form\"\u003E";
;pug_debug_line = 100;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "提案表\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\" ld=\"grp-add\"\u003E";
;pug_debug_line = 101;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "新增分組 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 102;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-4\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "admin-menu bg-dark text-white text-left","style": "background:linear-gradient(0deg,#141a20,#343a40)"}
}, "admin-menu");
;pug_debug_line = 104;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 d-flex flex-column bg-white\"\u003E";
;pug_debug_line = 106;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none w-100 h-100 bg-white\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"brd-post-list\" style=\"overflow-:scroll\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ciframe class=\"border-0 w-100 h-100 position-absolute d-none z-float bg-white\" ld=\"editor\" style=\"top:0;left:0\" src=\"about:blank\"\u003E\u003C\u002Fiframe\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"rwd typeset heading-contast mx-auto\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-4\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "文章管理\u003C\u002Fh3\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "文章列表讓您可以建立簡易的網頁，做為公告、簡章或任何可供使用者線上瀏覽的內容。每一則貼文都會有一個對應網址，在文章發布之後才會公開發表。不同於其他設定，文章列表不會自動更新，但您可點擊「更新列表」來取得最新列表。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary mr-2\" ld=\"new-post\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "建立文章\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary ld-ext-right\" ld=\"sync-list\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "更新列表 ";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spinner ld-spin\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Chr class=\"mt-4 mb-0\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ldld full\" ld=\"loading\" style=\"background:rgba(255,255,255,.6)\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4 text-center text-muted d-none\" ld=\"empty\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "尚無任何貼文。";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ca class=\"mx-2\" ld=\"new-post\" href=\"#\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "建立一則\u003C\u002Fa\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "吧!\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4 border-bottom d-none\" ld-each=\"post\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ca ld=\"title\"\u003E\u003C\u002Fa\u003E\u003C\u002Fh5\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ca ld=\"edit\" href=\"#\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "編輯\u003C\u002Fa\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-2\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "|\u003C\u002Fspan\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ca ld=\"view\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "瀏覽\u003C\u002Fa\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-2\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "|\u003C\u002Fspan\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Ca class=\"text-danger\" ld=\"delete\" href=\"#\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "刪除\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"user-icon\" ld=\"avatar\" style=\"font-size:2.5em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv ld=\"owner\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpost-list.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\" ld=\"date\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "admin-post-list");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 110;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 bg-white\" style=\"overflow-y:scroll\"\u003E";
;pug_debug_line = 112;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-relative\" style=\"min-height:calc(100% - 4em)\"\u003E";
;pug_debug_line = 113;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 position-absolute vertical-center\" ld=\"nav-panel default\" data-nav=\"main\" data-name=\"welcome\" style=\"top:0:left;right:0;bottom:0;top:0\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cdiv class=\"mx-auto p-4\" style=\"margin-top:5em\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "這裡是 Grant Dash 活動主控台\u003C\u002Fh3\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "主控台提供您設定活動、組織與提案分組的功能。您可以在這裡製作您的分組提案表，在權限表中設定各分組的評審名單等等。\u003C\u002Fp\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "您在這裡所做的任何設定都會即時儲存到系統之中，但直到您點擊了「發布變更」按鈕之前，都不會影響系統的運作。\u003C\u002Fp\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cbr\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav\" data-nav=\"main\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary mr-4\" ld=\"org-info nav-tab\" data-name=\"org-config\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "前往組織設定\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary\" ld=\"brd-info nav-tab\" data-name=\"brd-config\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fwelcome.pug";
pug_html = pug_html + "前往活動設定\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "admin-welcome");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 118;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"org-config\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar navbar-expand-lg navbar-light border shadow-sm rounded sticky z-fixed bg-white\" style=\"top:1em\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse navbar-collapse\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-pills mr-auto\" ld=\"nav\" data-nav=\"org-config\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link active\" ld=\"nav-tab default\" data-name=\"info\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"perm-panel\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "權限\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel default\" data-nav=\"org-config\" data-name=\"info\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cp class=\"text-sm text-muted\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "您可以在這裡為設定整個組織的通用資訊，例如名稱、簡介、主視覺、活動時間等等。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Chr class=\"my-4\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "組織名稱\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-primary\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"name\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "組織必須要有名字\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "組織代碼\u003C\u002Fspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted text-sm\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "用於網址的短代碼\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-primary\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-control\""+" name=\"slug\" placeholder=\"僅接受英文字母、數字或連字符號\""+pug_attr("readonly", true, true, true)) + "\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "已經有其它組織使用這個代碼了，請換一個\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "組織摘要\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" name=\"description\" rows=\"4\" placeholder=\"20個字以上\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "請寫得稍微充實一點。\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "組織頭像圖\u003C\u002Fdiv\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\" style=\"max-width:200px\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-secondary rounded overflow-hidden\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-semi-dark bg bg-cover bg-portrait\" ld=\"bg\" data-name=\"thumb\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 bg-semi-dark vertical-center\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-light btn-upload ld-ext-right\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "上傳";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput ld=\"file\" data-name=\"thumb\" type=\"file\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"thumb\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "組織橫幅主圖\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 bg-secondary rounded overflow-hidden\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-semi-dark bg bg-cover bg-portrait\" ld=\"bg\" data-name=\"banner\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 bg-semi-dark vertical-center\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-light btn-upload ld-ext-right\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "上傳";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput ld=\"file\" data-name=\"banner\" type=\"file\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"banner\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4 pt-4\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "org-info");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Forg\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"org-config\" data-name=\"perm-panel\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定讓您指派特定用戶來協助您管理維護您的組織、活動與用戶提案。我們已經預建了數種不同的角色，您可以依需求指派用戶到這些角色之中。\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4\" ld=\"roles\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" ld=\"role-all\" data-type=\"all\" data-name=\"\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "清單\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"role\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" ld=\"new-role\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\" ld=\"role-view\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"role-name\" placeholder=\"請在這裡自訂角色的名稱\" value=\"\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "不能用這個名稱\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色描述\u003C\u002Flabel\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"alert px-2 mb-4 border\" style=\"padding-top:.375em;padding-bottom:.375em\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted\" ld=\"role-desc-all\" data-name=\"\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此列表列出所有出現在權限設定中的用戶，以及他們所擔任角色。\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"roles-desc\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld-each=\"role-desc\" contenteditable=\"true\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色的簡單描述 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-3 px-3\" ld=\"newuser\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block clickable text-primary\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增使用者權限 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card shadow-sm mx-2 mb-3 d-none\" ld=\"newuser\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border-secondary border-right-0\" style=\"border-radius:.25em 0 0 .25em\" ld=\"input\" placeholder=\"搜尋使用者 ... \"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"picked\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100\" style=\"top:0;left:0;padding:1px\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center p-2 bg-light form-control border-0 h-100 w-100\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-dark rounded mr-1\" ld=\"picked-avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\" ld=\"picked-name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close text-danger clickable\" ld=\"clear\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none ld ld-fade-in\" ld=\"loading\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute m-auto ld ld-spin ld-spinner\" style=\"top:0;bottom:0;right:.5em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"z-float px-3 rounded border shadow-sm d-none ld ld-float-ttb-in bg-white xp15 position-absolute w-100\" ld=\"users\" style=\"border-radius: 0 0 .5em .5em\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center clickable my-2\" ld-each=\"user\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-light rounded mr-1\" ld=\"avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-relative flex-grow-1"}
}, "user-search");
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-appned\" ld=\"newuser-role list-view\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary dropdown-toggle rounded-0\" ld=\"newuser-role-picked\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-item\" ld-each=\"newuser-role-option\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"newuser-add\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "增加\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mr-2 clickable\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-1 mx-1\" ld=\"role-view\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"newtoken-add\" href=\"#\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以連結方式加入權限 ...\u003C\u002Fa\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-2\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "或\u003C\u002Fspan\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"batch-add\" href=\"#\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以 EMAIL 批次加入\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0\" ld=\"list-view\"\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.75em\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\" ld=\"role\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0 d-none\" ld=\"role-view\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.25em\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-4 px-2\"\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此名單的權限\u003C\u002Fh5\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"admin-config\"\u003E";
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "管理員", desc: "擁有管理此活動的所有權限", key: "owner"});
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "評審", desc: "擁有評審的身份，可以使用評分表", key: "judge"});
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立提案", desc: "在任何階段都可以建立新的提案", key: "prj-new"});
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改自己的提案", desc: "在任何階段都可以修改自己的提案", key: "prj-edit-own"});
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立留言", desc: "在任何階段都可以新增留言", key: "comment-new"});
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改任何留言", desc: "可修改任何人的留言", key: "comment-edit"});
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger\" ld=\"role-view delete-role\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "刪除角色\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "perm-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 121;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"brd-config\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar navbar-expand-lg navbar-light border shadow-sm rounded sticky z-fixed bg-white\" style=\"top:1em\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse navbar-collapse\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-pills mr-auto\" ld=\"nav\" data-nav=\"brd-config\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link active\" ld=\"nav-tab default\" data-name=\"info\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"stage\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "階段\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"perm\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "權限\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"default nav-panel\" data-nav=\"brd-config\" data-name=\"info\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "您可以在這裡為設定整個活動的通用資訊，例如名稱、簡介、主視覺、活動時間等等。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Chr class=\"my-4\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "活動名稱\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-primary\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"name\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "活動必須要有名字\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "活動代碼\u003C\u002Fspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted text-sm\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "用於網址的短代碼\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner text-primary\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-control\""+" name=\"slug\" placeholder=\"僅接受英文字母、數字或連字符號\""+pug_attr("readonly", true, true, true)) + "\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "已經有其它活動使用這個代碼了，請換一個\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "活動摘要\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" name=\"description\" rows=\"4\" placeholder=\"20個字以上\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "請寫得稍微充實一點。\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "開始時間\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"tail-datetime\" type=\"text\" name=\"starttime\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "結束時間\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"tail-datetime\" type=\"text\" name=\"endtime\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "活動頭像圖\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\" style=\"max-width:200px\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-secondary rounded overflow-hidden\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-semi-dark bg bg-cover bg-portrait\" ld=\"bg\" data-name=\"thumb\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 bg-semi-dark vertical-center\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-light btn-upload ld-ext-right\"\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "上傳";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput ld=\"file\" data-name=\"thumb\" type=\"file\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"thumb\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-3 text-right\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "活動橫幅主圖\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 bg-secondary rounded overflow-hidden\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-semi-dark bg bg-cover bg-portrait\" ld=\"bg\" data-name=\"banner\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 bg-semi-dark vertical-center\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-light btn-upload ld-ext-right\"\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "上傳";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput ld=\"file\" data-name=\"banner\" type=\"file\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput type=\"hidden\" name=\"banner\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "brd-info");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"brd-config\" data-name=\"stage\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "階段設定\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "活動設定讓您針對不同時間設定不同的活動狀態。例如，您可以設定在活動發表的 60 天後才開放提案，同時設定 90 天後進入評審階段。\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\" ld=\"stages\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cul" + (" class=\"nav nav-tabs mb-4\""+pug_attr("hostable", true, true, true)) + "\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"stage\" draggable=\"true\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "預設\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4 flex-grow-1\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" data-type=\"new-stage\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"alert alert-light border\" ld=\"default-view\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "在提案期間一般用戶可自由建立提案並修改提案。提案審查員會視情況檢視提案，並提醒提案者在提案期結束前做提案內容的調整與補充。\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none mb-4\" ld=\"custom-view\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 position-relative\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "階段名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"stage-name\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "不能用這個名稱\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv ld=\"custom-view\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row mt-2 mb-3 pb-1\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "起始時段\u003C\u002Flabel\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"time\" type=\"text\" data-name=\"start\" value=\"2020-05-01\" placeholder=\"YYYY-MM-DD hh:mm:ss\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "結束時段\u003C\u002Flabel\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"time\" type=\"text\" data-name=\"end\" value=\"2020-05-31\" placeholder=\"YYYY-MM-DD hh:mm:ss\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"admin-config\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "活動公開", desc: "一般人都可以看到這個活動", key: "public"});
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "編輯提案", desc: "提案者可以修改自己的提案", key: "prj-edit"});
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "提案列表", desc: "開放瀏覽提案列表", key: "prj-list-view"});
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "編輯評論", desc: "留言者可以修改自己的留言", key: "comment-edit"});
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "刪除評論", desc: "留言者可以刪除自己的留言", key: "comment-delete"});
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "資格審查", desc: "評審用戶可以進行線上決審作業", key: "judge-criteria"});
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "建立提案", desc: "註冊用戶可以自由提案", key: "prj-new"});
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "瀏覽提案", desc: "提案公開可見", key: "prj-view"});
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "建立評論", desc: "註冊用戶可以針對不同提案進行評論", key: "comment-new"});
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "瀏覽評論", desc: "開放瀏覽留言", key: "comment-view"});
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "初選作業", desc: "評審用戶可以進行線上決審作業", key: "judge-primary"});
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_mixins["config-switch-lg"]({name: "決選作業", desc: "評審用戶可以進行線上決審作業", key: "judge-final"});
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex mt-4\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger\" ld=\"delete-stage custom-view\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fstage.pug";
pug_html = pug_html + "刪除\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "brd-stage");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fbrd\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"brd-config\" data-name=\"perm\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定讓您指派特定用戶來協助您管理維護您的組織、活動與用戶提案。我們已經預建了數種不同的角色，您可以依需求指派用戶到這些角色之中。\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4\" ld=\"roles\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" ld=\"role-all\" data-type=\"all\" data-name=\"\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "清單\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"role\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" ld=\"new-role\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\" ld=\"role-view\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"role-name\" placeholder=\"請在這裡自訂角色的名稱\" value=\"\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "不能用這個名稱\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色描述\u003C\u002Flabel\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"alert px-2 mb-4 border\" style=\"padding-top:.375em;padding-bottom:.375em\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted\" ld=\"role-desc-all\" data-name=\"\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此列表列出所有出現在權限設定中的用戶，以及他們所擔任角色。\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"roles-desc\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld-each=\"role-desc\" contenteditable=\"true\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色的簡單描述 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-3 px-3\" ld=\"newuser\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block clickable text-primary\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增使用者權限 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card shadow-sm mx-2 mb-3 d-none\" ld=\"newuser\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border-secondary border-right-0\" style=\"border-radius:.25em 0 0 .25em\" ld=\"input\" placeholder=\"搜尋使用者 ... \"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"picked\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100\" style=\"top:0;left:0;padding:1px\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center p-2 bg-light form-control border-0 h-100 w-100\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-dark rounded mr-1\" ld=\"picked-avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\" ld=\"picked-name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close text-danger clickable\" ld=\"clear\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none ld ld-fade-in\" ld=\"loading\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute m-auto ld ld-spin ld-spinner\" style=\"top:0;bottom:0;right:.5em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"z-float px-3 rounded border shadow-sm d-none ld ld-float-ttb-in bg-white xp15 position-absolute w-100\" ld=\"users\" style=\"border-radius: 0 0 .5em .5em\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center clickable my-2\" ld-each=\"user\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-light rounded mr-1\" ld=\"avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-relative flex-grow-1"}
}, "user-search");
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-appned\" ld=\"newuser-role list-view\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary dropdown-toggle rounded-0\" ld=\"newuser-role-picked\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-item\" ld-each=\"newuser-role-option\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"newuser-add\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "增加\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mr-2 clickable\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-1 mx-1\" ld=\"role-view\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"newtoken-add\" href=\"#\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以連結方式加入權限 ...\u003C\u002Fa\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-2\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "或\u003C\u002Fspan\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"batch-add\" href=\"#\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以 EMAIL 批次加入\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0\" ld=\"list-view\"\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.75em\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\" ld=\"role\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0 d-none\" ld=\"role-view\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.25em\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-4 px-2\"\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此名單的權限\u003C\u002Fh5\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"admin-config\"\u003E";
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "管理員", desc: "擁有管理此活動的所有權限", key: "owner"});
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "評審", desc: "擁有評審的身份，可以使用評分表", key: "judge"});
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立提案", desc: "在任何階段都可以建立新的提案", key: "prj-new"});
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改自己的提案", desc: "在任何階段都可以修改自己的提案", key: "prj-edit-own"});
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立留言", desc: "在任何階段都可以新增留言", key: "comment-new"});
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改任何留言", desc: "可修改任何人的留言", key: "comment-edit"});
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger\" ld=\"role-view delete-role\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "刪除角色\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "perm-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 124;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"org-page-info\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "客製頁面\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "您可以在這裡為設定整個活動的頁面。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters mb-4\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-4 h-100 pr-3 rounded\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用預設頁面\u003C\u002Fh5\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-2\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "我們將提供一些便捷的選項供您選擇首頁設置的方式。\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn d-block btn-outline-secondary\" ld=\"nav-tab opt\" data-nav=\"page-info\" data-name=\"default\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用這個選項\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-3 h-100 rounded\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用 Git Repo\u003C\u002Fh5\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-2\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "由您提供網站原始碼，我們則透過 Git Clone 的方式為您執行網站部署。\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn d-block btn-outline-secondary\" ld=\"nav-tab opt\" data-nav=\"page-info\" data-name=\"git\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用這個選項\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 h-100 pl-3 rounded\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用線上編輯器\u003C\u002Fh5\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-2\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "讓您可以直接透過我們提供的線上編輯器編寫網頁內容與樣式。\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn d-block btn-light disabled\" data-name=\"editor\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "尚未開放\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr class=\"my-2\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\" ld=\"nav-panel\" data-nav=\"page-info\" data-name=\"default\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用預設頁面\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "您的頁面將由 Grant Dash 自動生成。我們會使用組織或活動的基本資訊 ( 名稱、簡介、縮圖等 ) 產生基本的入口頁面，並提供適當的提案列表供訪客瀏覽。\u003C\u002Fp\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group flex-grow-1\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "連結網址\u003C\u002Flabel\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"custom-landing-url\" placeholder=\"例如, https:\u002F\u002Fsome.site\u002Fpost\u002Flwieurhs128Djkf\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "客製樣式表網址\u003C\u002Flabel\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"custom-css-url\" placeholder=\"例如, https:\u002F\u002Fsome.site\u002Findex.css\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\" ld=\"nav-panel\" data-nav=\"page-info\" data-name=\"git\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-7\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用 Git Repo\u003C\u002Fh4\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "我們需要以下的資訊來設定 Git Repo 。此方式僅提供靜態網頁的部署，並不會執行任何額外的程式碼。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-5\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "部署網站\u003C\u002Flabel\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark d-block flex-nowrap\" ld=\"deploy\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ci class=\"i-upload text-lg\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "請求網站更新\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "Git URL\u003C\u002Flabel\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"git-url\" placeholder=\"例如, https:\u002F\u002Fgithub.com\u002Fsomeone\u002Fsomerepo\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "Git Branch\u003C\u002Flabel\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"git-branch\" placeholder=\"例如, gh-pages\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "Secret\u003C\u002Flabel\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"git-secret\" placeholder=\"隨機的字串即可\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"git-secret-gen\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "隨機生成\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "客製樣式表網址\u003C\u002Flabel\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"custom-css-url\" placeholder=\"例如, https:\u002F\u002Fsome.site\u002Findex.css\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "page-info");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 127;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"brd-page-info\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "客製頁面\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "您可以在這裡為設定整個活動的頁面。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters mb-4\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-4 h-100 pr-3 rounded\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用預設頁面\u003C\u002Fh5\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-2\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "我們將提供一些便捷的選項供您選擇首頁設置的方式。\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn d-block btn-outline-secondary\" ld=\"nav-tab opt\" data-nav=\"page-info\" data-name=\"default\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用這個選項\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-3 h-100 rounded\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用 Git Repo\u003C\u002Fh5\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-2\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "由您提供網站原始碼，我們則透過 Git Clone 的方式為您執行網站部署。\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn d-block btn-outline-secondary\" ld=\"nav-tab opt\" data-nav=\"page-info\" data-name=\"git\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用這個選項\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 h-100 pl-3 rounded\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用線上編輯器\u003C\u002Fh5\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-2\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "讓您可以直接透過我們提供的線上編輯器編寫網頁內容與樣式。\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn d-block btn-light disabled\" data-name=\"editor\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "尚未開放\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr class=\"my-2\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\" ld=\"nav-panel\" data-nav=\"page-info\" data-name=\"default\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用預設頁面\u003C\u002Fh4\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "您的頁面將由 Grant Dash 自動生成。我們會使用組織或活動的基本資訊 ( 名稱、簡介、縮圖等 ) 產生基本的入口頁面，並提供適當的提案列表供訪客瀏覽。\u003C\u002Fp\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group flex-grow-1\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "連結網址\u003C\u002Flabel\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"custom-landing-url\" placeholder=\"例如, https:\u002F\u002Fsome.site\u002Fpost\u002Flwieurhs128Djkf\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "客製樣式表網址\u003C\u002Flabel\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"custom-css-url\" placeholder=\"例如, https:\u002F\u002Fsome.site\u002Findex.css\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-4\" ld=\"nav-panel\" data-nav=\"page-info\" data-name=\"git\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-7\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "使用 Git Repo\u003C\u002Fh4\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "我們需要以下的資訊來設定 Git Repo 。此方式僅提供靜態網頁的部署，並不會執行任何額外的程式碼。\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-5\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "部署網站\u003C\u002Flabel\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-dark d-block flex-nowrap\" ld=\"deploy\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Ci class=\"i-upload text-lg\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "請求網站更新\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "Git URL\u003C\u002Flabel\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"git-url\" placeholder=\"例如, https:\u002F\u002Fgithub.com\u002Fsomeone\u002Fsomerepo\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "Git Branch\u003C\u002Flabel\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"git-branch\" placeholder=\"例如, gh-pages\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "Secret\u003C\u002Flabel\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control rounded border\" ld=\"git-secret\" placeholder=\"隨機的字串即可\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"git-secret-gen\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "隨機生成\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "客製樣式表網址\u003C\u002Flabel\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fpage.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"custom-css-url\" placeholder=\"例如, https:\u002F\u002Fsome.site\u002Findex.css\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "page-info");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 130;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"org-navbar\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "導覽列客製化\u003C\u002Fh3\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "您可以在這裡調配您所需的導覽列元件。導覽列元件將出現在您的公開頁面頂端，提供您的用戶瀏覽時的線索與快捷地切換頁面的功能。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld=\"item\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner d-flex align-items-center\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars mr-4\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"name flex-grow-1 mr-2\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"name\" name=\"name\" placeholder=\"選單文字\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"url flex-grow-1\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"url\" name=\"url\" placeholder=\"URL\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-radio ml-4\" ld=\"toggle-fold\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-clone ml-4\" ld=\"clone\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-close ml-4 mr-4\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld=\"folder\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder show\" draggable=\"true\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld-each=\"list\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "d-none"}
}, "folder-sample");
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-root\" ld=\"folder-root\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld-each=\"list\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "navbar-editor");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 133;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"brd-navbar\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ch3\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "導覽列客製化\u003C\u002Fh3\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "您可以在這裡調配您所需的導覽列元件。導覽列元件將出現在您的公開頁面頂端，提供您的用戶瀏覽時的線索與快捷地切換頁面的功能。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld=\"item\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"inner d-flex align-items-center\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars mr-4\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"name flex-grow-1 mr-2\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"name\" name=\"name\" placeholder=\"選單文字\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"url flex-grow-1\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"url\" name=\"url\" placeholder=\"URL\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-radio ml-4\" ld=\"toggle-fold\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-clone ml-4\" ld=\"clone\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Ci class=\"i-close ml-4 mr-4\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld=\"folder\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder show\" draggable=\"true\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-item\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-menu\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld-each=\"list\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "d-none"}
}, "folder-sample");
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv class=\"folder-root\" ld=\"folder-root\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fnavbar.pug";
pug_html = pug_html + "\u003Cdiv ld-each=\"list\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "navbar-editor");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 136;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"grp-config\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar navbar-expand-lg navbar-light border shadow-sm rounded sticky z-fixed bg-white\" style=\"top:1em\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse navbar-collapse\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-pills mr-auto\" ld=\"nav\" data-nav=\"grp-config\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link active\" ld=\"nav-tab default\" data-name=\"info\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"perm\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "權限\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"criteria\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "審查資格\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"grade\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "評選標準\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel default\" data-nav=\"grp-config\" data-name=\"info\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "專案分組您可以在這裡為這個專案分組設定基本資訊，例如名稱、簡介、主視覺、活動時間等等。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Chr class=\"my-4\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-center mb-4\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-2\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "分組名稱\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-0 ld-ext-right\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" name=\"name\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback position-absolute\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "分組必須要有名字\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"row align-items-start mb-4\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-2\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "分組摘要\u003C\u002Fb\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cp class=\"text-sm text-muted\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "簡單介紹這個分組(選填)\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" name=\"description\" rows=\"4\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Chr class=\"my-4\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-danger\" ld=\"delete-group\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "刪除分組\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-primary\" ld=\"clone-group\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Finfo.pug";
pug_html = pug_html + "複製分組\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "grp-info-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"grp-config\" data-name=\"perm\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定讓您指派特定用戶來協助您管理維護您的組織、活動與用戶提案。我們已經預建了數種不同的角色，您可以依需求指派用戶到這些角色之中。\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4\" ld=\"roles\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" ld=\"role-all\" data-type=\"all\" data-name=\"\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "清單\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"role\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" ld=\"new-role\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\" ld=\"role-view\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"role-name\" placeholder=\"請在這裡自訂角色的名稱\" value=\"\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "不能用這個名稱\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色描述\u003C\u002Flabel\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"alert px-2 mb-4 border\" style=\"padding-top:.375em;padding-bottom:.375em\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted\" ld=\"role-desc-all\" data-name=\"\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此列表列出所有出現在權限設定中的用戶，以及他們所擔任角色。\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"roles-desc\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld-each=\"role-desc\" contenteditable=\"true\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色的簡單描述 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-3 px-3\" ld=\"newuser\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block clickable text-primary\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增使用者權限 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card shadow-sm mx-2 mb-3 d-none\" ld=\"newuser\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border-secondary border-right-0\" style=\"border-radius:.25em 0 0 .25em\" ld=\"input\" placeholder=\"搜尋使用者 ... \"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"picked\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100\" style=\"top:0;left:0;padding:1px\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center p-2 bg-light form-control border-0 h-100 w-100\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-dark rounded mr-1\" ld=\"picked-avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\" ld=\"picked-name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close text-danger clickable\" ld=\"clear\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none ld ld-fade-in\" ld=\"loading\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute m-auto ld ld-spin ld-spinner\" style=\"top:0;bottom:0;right:.5em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"z-float px-3 rounded border shadow-sm d-none ld ld-float-ttb-in bg-white xp15 position-absolute w-100\" ld=\"users\" style=\"border-radius: 0 0 .5em .5em\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center clickable my-2\" ld-each=\"user\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-light rounded mr-1\" ld=\"avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-relative flex-grow-1"}
}, "user-search");
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-appned\" ld=\"newuser-role list-view\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary dropdown-toggle rounded-0\" ld=\"newuser-role-picked\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-item\" ld-each=\"newuser-role-option\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"newuser-add\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "增加\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mr-2 clickable\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-1 mx-1\" ld=\"role-view\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"newtoken-add\" href=\"#\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以連結方式加入權限 ...\u003C\u002Fa\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-2\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "或\u003C\u002Fspan\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"batch-add\" href=\"#\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以 EMAIL 批次加入\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0\" ld=\"list-view\"\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.75em\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\" ld=\"role\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0 d-none\" ld=\"role-view\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.25em\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-4 px-2\"\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此名單的權限\u003C\u002Fh5\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"admin-config\"\u003E";
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "管理員", desc: "擁有管理此活動的所有權限", key: "owner"});
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "評審", desc: "擁有評審的身份，可以使用評分表", key: "judge"});
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立提案", desc: "在任何階段都可以建立新的提案", key: "prj-new"});
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改自己的提案", desc: "在任何階段都可以修改自己的提案", key: "prj-edit-own"});
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立留言", desc: "在任何階段都可以新增留言", key: "comment-new"});
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改任何留言", desc: "可修改任何人的留言", key: "comment-edit"});
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger\" ld=\"role-view delete-role\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "刪除角色\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "perm-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"grp-config\" data-name=\"criteria\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "資格審核\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "編輯提案所需具備的資格清單與細節。此列表將運用在評選時的資格審核表中。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"entry\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" ld=\"new-entry\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-4\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "項目名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"entry-data\" data-name=\"name\" placeholder=\"項目名稱\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-4\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "詳細說明\u003C\u002Flabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" ld=\"entry-data\" data-name=\"description\" placeholder=\"詳細說明 ...\" rows=\"5\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger mr-2\" ld=\"delete-entry\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "刪除\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100 vertical-center rounded bg-white\" style=\"top:0;left:0\" ld=\"empty\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-4\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "您尚未建立任何項目. 要先建立一個嗎？\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary\" ld=\"new-entry\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fcriteria.pug";
pug_html = pug_html + "建立項目\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-relative"}
}, "criteria-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fconfig.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"grp-config\" data-name=\"grade\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "評分標準\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "編輯評審的評分標準。此評分標準將會自動套用到評審表以建立對應的欄位。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"entry\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cspan ld=\"entry-text\" data-name=\"name\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "( ";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cspan ld=\"entry-text\" data-name=\"percent\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "% )\u003C\u002Fspan\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" ld=\"new-entry\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-4\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "項目名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"entry-data\" data-name=\"name\" placeholder=\"條件名稱, 2 ~ 5 個字\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-4\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "配分比例\u003C\u002Flabel\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"entry-data\" data-name=\"percent\" placeholder=\"0 ~ 100\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-2\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-4\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "詳細說明\u003C\u002Flabel\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" ld=\"entry-data\" data-name=\"description\" placeholder=\"詳細說明 ...\" rows=\"5\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger mr-2\" ld=\"delete-entry\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "刪除\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100 vertical-center rounded bg-white\" style=\"top:0;left:0\" ld=\"empty\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-4\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "您尚未建立任何項目. 要先建立一個嗎？\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary\" ld=\"new-entry\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fgrade.pug";
pug_html = pug_html + "建立項目\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-relative"}
}, "grade-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 139;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"grp-form\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "提案表\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "您可以使用這個提案表編輯器來客製化用戶提案時所要用到的表單頁面。\u003C\u002Fp\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"form-sample\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"] = pug_interp = function(opt){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 3;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"form-block card shadow-sm\""+" ld=\"block\""+pug_attr("data-name", opt.name, true, true)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ch4 class=\"mb-2 single-line w-100\" ld=\"title\" editable=\"title\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "提問的標題\u003C\u002Fh4\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted mb-2 single-line w-100\" ld=\"desc\" editable=\"desc\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "提問的簡短描述 ...\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 9;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn-group-vertical\" ld=\"edit-only\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-light\" ld=\"move-up\" style=\"padding:0 .25em\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-chevron-up\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 11;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-light\" ld=\"move-down\" style=\"padding:0 .25em\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-chevron-down\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 12;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 13;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
block && block();
;pug_debug_line = 14;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"alert alert-danger mt-2 mb-0 ld ld-float-btt-in p-2 shadow-sm\" ld=\"invalid\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv ld=\"edit-only\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["criteria"]();
;pug_debug_line = 17;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["footer"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 18;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["footer"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body border-top\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-2\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-danger mr-2\" ld=\"delete\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "刪除 ";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 22;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-secondary\" ld=\"clone\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "複製 ";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-clone\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 23;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 24;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center ml-4\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "公開\u003C\u002Fdiv\u003E";
;pug_debug_line = 26;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch on\" ld=\"switch\" data-name=\"public\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 27;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center ml-4\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "必填\u003C\u002Fdiv\u003E";
;pug_debug_line = 29;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch\" ld=\"switch\" data-name=\"required\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center ml-4\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "顯示描述\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch\" ld=\"switch\" data-name=\"show-desc\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 34;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropup\" ld=\"purpose-menu edit-only\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-light dropdown-toggle\" data-toggle=\"dropdown\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "用途\u003C\u002Fdiv\u003E";
;pug_debug_line = 37;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu dropdown-menu-right\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-item d-flex\" ld-each=\"purpose\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-check text-success\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 42;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["criteria"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body border-top\" ld=\"has-criteria\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-2 d-flex criteria flex-column\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex mb-2 w-100 align-items-center\" ld-each=\"criteria\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch switch-lg\" ld=\"enabled\" style=\"width:3em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown mr-2\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-light dropdown-toggle\" ld=\"type\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 48;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" ld-each=\"types\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 50;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown mr-2\"\u003E";
;pug_debug_line = 51;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-light dropdown-toggle\" ld=\"op\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 52;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ca class=\"dropdown-item\" ld-each=\"ops\"\u003E\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2 flex-grow-1\" ld=\"input1\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" placeholder=\"值 1\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2 flex-grow-1\" ld=\"input2\"\u003E";
;pug_debug_line = 55;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" placeholder=\"值 2\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 56;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv style=\"flex:3 0 auto\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"input-invalid\" placeholder=\"不通過時的錯誤訊息\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 59;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 60;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 position-relative\"\u003E";
;pug_debug_line = 61;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 z-base mb-2\" ld=\"budget-root\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-light w-100 py-4 text-center text-muted d-none\" ld=\"not is-view\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "預算表僅在提案人填表時出現\u003C\u002Fdiv\u003E";
;pug_debug_line = 63;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"is-view\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between align-items-center\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary btn-sm\" ld=\"new-row\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "新增列\u003C\u002Fdiv\u003E";
;pug_debug_line = 65;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-2 text-sm text-muted\"\u003E";
;pug_debug_line = 66;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "總金額\u003C\u002Fspan\u003E";
;pug_debug_line = 67;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"font-weight-bold\" ld=\"value\" data-name=\"total\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 68;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 68;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "元\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 69;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 70;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-2 text-sm text-muted\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "補助金額\u003C\u002Fspan\u003E";
;pug_debug_line = 71;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"font-weight-bold\" ld=\"value\" data-name=\"subsidy\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 72;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "元\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 73;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-2 text-sm text-muted\"\u003E";
;pug_debug_line = 74;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "補助比例\u003C\u002Fspan\u003E";
;pug_debug_line = 75;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"font-weight-bold\" ld=\"value\" data-name=\"percent\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 76;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "%\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-budget"});
;pug_debug_line = 78;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 79;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"pt-4 px-4\"\u003E";
;pug_debug_line = 80;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"timeline-list\""+pug_attr("hostable", true, true, true)) + "\u003E";
;pug_debug_line = 81;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"item\" draggable=\"true\" ld-each=\"list\"\u003E";
;pug_debug_line = 81;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 82;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars mr-2 text-muted\" ld=\"drag\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 83;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 mr-2 fields\"\u003E";
;pug_debug_line = 84;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded mb-2\" ld=\"input\" data-name=\"title\" placeholder=\"查核階段項目名稱 ...\"\u003E";
;pug_debug_line = 85;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded mb-2\" ld=\"date input\" data-name=\"date\" placeholder=\"查核階段時間 ...\"\u003E";
;pug_debug_line = 86;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"4\" ld=\"input\" data-name=\"desc\" placeholder=\"關於這個查核項目的描述 ...\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 87;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-close mr-2 clickable text-danger\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 88;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-dark\" ld=\"list-add\"\u003E";
;pug_debug_line = 88;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "增加項目 ";
;pug_debug_line = 88;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 88;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-checkpoint"});
;pug_debug_line = 90;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 91;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-4 py-3 border rounded\" editable=\"option\" edit-type=\"block\"\u003E";
;pug_debug_line = 92;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-2\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 93;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center clickable my-2\" draggable=\"true\" ld-each=\"list\"\u003E";
;pug_debug_line = 94;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars mr-2 text-muted\" ld=\"drag\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 95;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"mr-2\" ld=\"state\" type=\"radio\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 96;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 mr-2\" ld=\"data\" editable=\"title\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 97;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\" ld=\"other\"\u003E";
;pug_debug_line = 97;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"other-value\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 98;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-close mr-2 clickable text-danger\" ld=\"delete\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 99;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch ml-2\" ld=\"other-enabled\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-dark\" ld=\"edit-only list-add\"\u003E";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "增加項目 ";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 100;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-radio"});
;pug_debug_line = 102;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 103;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-4 py-3 border rounded\"\u003E";
;pug_debug_line = 104;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mb-2\"\u003E";
;pug_debug_line = 105;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 105;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center clickable my-2\" draggable=\"true\" ld-each=\"list\"\u003E";
;pug_debug_line = 106;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars mr-2 text-muted\" ld=\"drag\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 107;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"mr-2\" ld=\"state\" type=\"checkbox\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 108;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 mr-2\" ld=\"data\" editable=\"title\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 109;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\" ld=\"other\"\u003E";
;pug_debug_line = 109;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"other-value\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 110;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-close mr-2 clickable text-danger\" ld=\"delete\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 111;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch ml-2\" ld=\"other-enabled\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 112;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-dark\" ld=\"edit-only list-add\"\u003E";
;pug_debug_line = 112;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "增加項目 ";
;pug_debug_line = 112;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-plus\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 112;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-checkbox"});
;pug_debug_line = 114;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 115;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 bg-light\"\u003E";
;pug_debug_line = 115;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 115;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary btn-upload my-4\"\u003E";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "上傳檔案 ...\u003C\u002Fspan\u003E";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput" + (" type=\"file\" ld=\"input-file\""+pug_attr("multiple", true, true, true)) + "\u003E";
;pug_debug_line = 116;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 117;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 118;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"progress my-2 position-relative d-none progress-bar-striped progress-bar-animated\" ld=\"loading\"\u003E";
;pug_debug_line = 119;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"progress-bar progress-bar-striped progress-bar-animated\" ld=\"bar\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 120;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center position-absolute w-100 text-white\" ld=\"bar-label\" style=\"line-height:1.3em;text-shadow:0 0 .2em rgba(0,0,0,.5)\"\u003E";
;pug_debug_line = 121;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "0%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-1 px-2 my-2 bg-white shadow-sm rounded text-left d-none\" ld-each=\"file\"\u003E";
;pug_debug_line = 122;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 123;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"name flex-grow-1\" ld=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 124;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"size rounded px-2 text-sm ml-2 text-muted bg-light\" ld=\"type\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 125;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"size rounded px-2 text-sm ml-2 text-muted bg-light\" ld=\"size\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 126;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-close text-danger ml-2 clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-file"});
;pug_debug_line = 128;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 129;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 bg-light\"\u003E";
;pug_debug_line = 129;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 129;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-primary btn-upload my-4\"\u003E";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "上傳縮圖 ...\u003C\u002Fspan\u003E";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput type=\"file\" ld=\"input-file\"\u003E";
;pug_debug_line = 130;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 131;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 132;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"progress my-2 position-relative d-none progress-bar-striped progress-bar-animated\" ld=\"loading\"\u003E";
;pug_debug_line = 133;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"progress-bar progress-bar-striped progress-bar-animated\" ld=\"bar\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 134;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center position-absolute w-100 text-white\" ld=\"bar-label\" style=\"line-height:1.3em;text-shadow:0 0 .2em rgba(0,0,0,.5)\"\u003E";
;pug_debug_line = 135;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "0%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 136;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-1 px-2 my-2 bg-white shadow-sm rounded text-left d-none\" ld-each=\"file\"\u003E";
;pug_debug_line = 136;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 137;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"name flex-grow-1\" ld=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 138;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"size rounded px-2 text-sm ml-2 text-muted bg-light\" ld=\"type\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 139;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"size rounded px-2 text-sm ml-2 text-muted bg-light\" ld=\"size\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 140;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ci class=\"i-close text-danger ml-2 clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-thumbnail"});
;pug_debug_line = 144;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 145;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-relative\"\u003E";
;pug_debug_line = 146;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"5\" ld=\"input-field edit-panel\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 147;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 bg-light rounded p-3 text-break\" ld=\"preview-panel\" style=\"min-height:200px\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 148;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center mt-2\"\u003E";
;pug_debug_line = 149;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center text-sm text-muted mr-4\"\u003E";
;pug_debug_line = 150;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"mr-1\" type=\"checkbox\" ld=\"use-markdown\"\u003E";
;pug_debug_line = 151;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 151;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "啟用 Markdown 語法 ( ";
;pug_debug_line = 151;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fmarkdown.tw\u002F\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 151;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "語法說明\u003C\u002Fa\u003E";
;pug_debug_line = 151;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + " )\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 152;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"if-markdown\"\u003E";
;pug_debug_line = 152;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center text-sm text-muted mr-4\"\u003E";
;pug_debug_line = 153;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"mr-1\" type=\"checkbox\" ld=\"toggle-preview\"\u003E";
;pug_debug_line = 154;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 154;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "預覽\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-long-answer"});
;pug_debug_line = 156;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 157;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"input-field\" placeholder=\"請在這裡輸入 ...\"\u003E";
}
}, {name: "form-short-answer"});
;pug_debug_line = 159;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 160;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"input-field\" placeholder=\"以逗號等標點符號分隔標籤 ...\"\u003E";
}
}, {name: "form-tag"});
;pug_debug_line = 162;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 163;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center mb-4\"\u003E";
;pug_debug_line = 164;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"input-field start\" placeholder=\"請輸入開始時間 ...\"\u003E";
;pug_debug_line = 165;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-4\" ld=\"is-range\"\u003E";
;pug_debug_line = 165;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "至\u003C\u002Fspan\u003E";
;pug_debug_line = 166;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"input-field end is-range\" placeholder=\"請輸入結束時間 ...\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 167;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1 text-nowrap d-flex align-items-center\" ld=\"edit-only\"\u003E";
;pug_debug_line = 168;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 168;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "讓使用者以區間形式 ( 起始至結束 ) 設定時間\u003C\u002Fdiv\u003E";
;pug_debug_line = 169;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 169;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"switch ml-2\" ld=\"range-enabled\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-datetime"});
;pug_debug_line = 171;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 172;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 position-relative\"\u003E";
;pug_debug_line = 173;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 z-base mb-2\" ld=\"table-root\" style=\"overflow-x:hidden;overflow-y:visible;min-height:200px\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-table"});
;pug_debug_line = 175;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_mixins["form-block"].call({
block: function(){
;pug_debug_line = 176;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-relative\" ld=\"is-view text\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 177;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-2\" ld=\"not is-view\"\u003E";
;pug_debug_line = 178;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-relative\"\u003E";
;pug_debug_line = 179;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"5\" ld=\"input-field edit-panel\"\u003E\u003C\u002Ftextarea\u003E";
;pug_debug_line = 180;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 bg-light rounded p-3 text-break\" ld=\"preview-panel\" style=\"min-height:200px\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 181;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center mt-2\"\u003E";
;pug_debug_line = 182;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center text-sm text-muted mr-4\"\u003E";
;pug_debug_line = 183;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"mr-1\" type=\"checkbox\" ld=\"use-markdown\"\u003E";
;pug_debug_line = 184;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 184;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "啟用 Markdown 語法 ( ";
;pug_debug_line = 184;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Ca href=\"https:\u002F\u002Fmarkdown.tw\u002F\" target=\"_blank\" rel=\"noopener noreferrer\"\u003E";
;pug_debug_line = 184;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "語法說明\u003C\u002Fa\u003E";
;pug_debug_line = 184;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + " )\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 185;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"if-markdown\"\u003E";
;pug_debug_line = 185;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center text-sm text-muted mr-4\"\u003E";
;pug_debug_line = 186;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cinput class=\"mr-1\" type=\"checkbox\" ld=\"toggle-preview\"\u003E";
;pug_debug_line = 187;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 187;pug_debug_filename = "\u002FUsers\u002Ftkirby\u002Fworkspace\u002Fzbryikt\u002Fgrantdash\u002Fserver\u002Fsrc\u002Fpug\u002Fform\u002Fsubblock.pug";
pug_html = pug_html + "預覽\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, {name: "form-text"});
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"flex-grow-1\""+" ld=\"form-list\""+pug_attr("hostable", true, true, true)) + "\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv ld-each=\"block\" draggable=\"true\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_mixins["nbr"](5);
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4\" ld=\"blocksrc\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"sticky\" style=\"top:18px\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group shadow-sm mb-4\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable text-nowrap\" ld=\"block\" draggable=\"true\" data-name=\"form-short-answer\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 短答\u003C\u002Fdiv\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-long-answer\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 申論\u003C\u002Fdiv\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-radio\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 單選\u003C\u002Fdiv\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-checkbox\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 多選\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-file\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 傳檔\u003C\u002Fdiv\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-thumbnail\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 縮圖\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-tag\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 標籤\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-budget\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 預算\u003C\u002Fdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-checkpoint\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 查核\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Cdiv class=\"list-group-item clickable\" ld=\"block\" draggable=\"true\" data-name=\"form-datetime\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + "\u003Ci class=\"i-doc\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fform.pug";
pug_html = pug_html + " 時間\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "d-flex"}
}, "grp-form");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 142;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"grp-judge\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_mixins["css"]("/dash/assets/lib/ldbar/loading-bar.css");
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_mixins["script"]("/dash/assets/lib/ldbar/loading-bar.js");
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar navbar-expand-lg navbar-light mb-4 border shadow-sm rounded sticky z-fixed bg-white\" style=\"top:15px\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse navbar-collapse\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-pills mr-auto\" ld=\"nav\" data-nav=\"grp-judge\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link active\" ld=\"nav-tab default\" data-name=\"basic\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "資格審查 ";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "( 100% )\u003C\u002Fspan\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" ld=\"nav-tab\" data-name=\"config\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "初選 ";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "( 20% )\u003C\u002Fspan\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" ld=\"nav-tab\" data-name=\"perm\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "決選 ";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "( 0% )\u003C\u002Fspan\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-4\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ch5 class=\"mt-0 mb-2\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "評選進度\u003C\u002Fh5\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted text-sm mb-0\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "整體評選進度。點選各項目連結查看個人審查表或是審查總表。\u003C\u002Fp\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-4\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Chr\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-5\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 px-4\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cstyle type=\"text\u002Fcss\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "svg path { stroke-width: 9 }";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "svg path.mainline { stroke: #09f }";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + ".ldBar-label {";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "  font-size: 1.5em;";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "  text-align: center";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "}";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + ".ldBar-label:after {";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "  font-size: .5em;";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "}";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + ".ldBar-label:before {";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "  font-size: .6em;";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "  content: \"整體進度\";";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "  display: block";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "}";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003C\u002Fstyle\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"ldBar w-100 h-100 label-center\" data-value=\"75\" data-preset=\"circle\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-center mt-4\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ca href=\"#\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "總表 ";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ci class=\"i-link\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-7\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"vertical-center\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex flex-column\"\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
// iterate ["評審一", "評審二", "評審三"]
;(function(){
  var $$obj = ["評審一", "評審二", "評審三"];
  if ('number' == typeof $$obj.length) {
      for (var pug_index11 = 0, $$l = $$obj.length; pug_index11 < $$l; pug_index11++) {
        var i = $$obj[pug_index11];
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center mb-3\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ca class=\"mx-2\" href=\"#\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
var p1 = Math.round(Math.random() * 40)
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
var p2 = Math.round(Math.random() * 30)
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
var p3 = Math.round(Math.random() * 20)
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"progress my-1 flex-grow-1\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"progress-bar bg-success progress-bar-striped progress-bar-animated\""+pug_attr("style", pug_style(`width:${p1}%`), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"progress-bar bg-warning progress-bar-striped progress-bar-animated\""+pug_attr("style", pug_style(`width:${p2}%`), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"progress-bar bg-danger progress-bar-striped progress-bar-animated\""+pug_attr("style", pug_style(`width:${p3}%`), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-2 text-muted text-sm\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = p1 + p2 + p3) ? "" : pug_interp));
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index11 in $$obj) {
      $$l++;
      var i = $$obj[pug_index11];
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center mb-3\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Ca class=\"mx-2\" href=\"#\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = i) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
var p1 = Math.round(Math.random() * 40)
;pug_debug_line = 51;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
var p2 = Math.round(Math.random() * 30)
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
var p3 = Math.round(Math.random() * 20)
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"progress my-1 flex-grow-1\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"progress-bar bg-success progress-bar-striped progress-bar-animated\""+pug_attr("style", pug_style(`width:${p1}%`), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"progress-bar bg-warning progress-bar-striped progress-bar-animated\""+pug_attr("style", pug_style(`width:${p2}%`), true, true)) + "\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"progress-bar bg-danger progress-bar-striped progress-bar-animated\""+pug_attr("style", pug_style(`width:${p3}%`), true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-2 text-muted text-sm\"\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = p1 + p2 + p3) ? "" : pug_interp));
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "%\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-center align-items-center mt-4\"\u003E";
;pug_debug_line = 59;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-success d-inline-block mr-1 rounded\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-3\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "推薦\u003C\u002Fspan\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-warning d-inline-block mr-1 rounded\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cspan class=\"mr-3\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "面議\u003C\u002Fspan\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-danger d-inline-block mr-1 rounded\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "汰除\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 65;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Cdiv class=\"my-4 py-2\"\u003E";
;pug_debug_line = 65;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fjudge.pug";
pug_html = pug_html + "\u003Chr\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch4\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定\u003C\u002Fh4\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted mb-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "權限設定讓您指派特定用戶來協助您管理維護您的組織、活動與用戶提案。我們已經預建了數種不同的角色，您可以依需求指派用戶到這些角色之中。\u003C\u002Fdiv\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-tabs mb-4\" ld=\"roles\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\" ld=\"role-all\" data-type=\"all\" data-name=\"\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "清單\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\" ld-each=\"role\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link\"\u003E\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item flex-grow-1\"\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item text-right\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"nav-link text-muted border-0\" ld=\"new-role\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增 +\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\" ld=\"role-view\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色名稱\u003C\u002Flabel\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border rounded\" ld=\"role-name\" placeholder=\"請在這裡自訂角色的名稱\" value=\"\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"invalid-feedback\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "不能用這個名稱\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group mb-2\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色描述\u003C\u002Flabel\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"alert px-2 mb-4 border\" style=\"padding-top:.375em;padding-bottom:.375em\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted\" ld=\"role-desc-all\" data-name=\"\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此列表列出所有出現在權限設定中的用戶，以及他們所擔任角色。\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"roles-desc\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld-each=\"role-desc\" contenteditable=\"true\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "角色的簡單描述 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-3 px-3\" ld=\"newuser\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-inline-block clickable text-primary\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "新增使用者權限 ...\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card shadow-sm mx-2 mb-3 d-none\" ld=\"newuser\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"card-body p-2\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control border-secondary border-right-0\" style=\"border-radius:.25em 0 0 .25em\" ld=\"input\" placeholder=\"搜尋使用者 ... \"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"picked\"\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute w-100 h-100\" style=\"top:0;left:0;padding:1px\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center p-2 bg-light form-control border-0 h-100 w-100\"\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-dark rounded mr-1\" ld=\"picked-avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\" ld=\"picked-name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 43;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close text-danger clickable\" ld=\"clear\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none ld ld-fade-in\" ld=\"loading\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"position-absolute m-auto ld ld-spin ld-spinner\" style=\"top:0;bottom:0;right:.5em\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 46;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"z-float px-3 rounded border shadow-sm d-none ld ld-float-ttb-in bg-white xp15 position-absolute w-100\" ld=\"users\" style=\"border-radius: 0 0 .5em .5em\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center clickable my-2\" ld-each=\"user\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-light rounded mr-1\" ld=\"avatar\" style=\"width:1em;height:1em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 50;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv ld=\"name\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "position-relative flex-grow-1"}
}, "user-search");
;pug_debug_line = 52;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-appned\" ld=\"newuser-role list-view\"\u003E";
;pug_debug_line = 53;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown\"\u003E";
;pug_debug_line = 54;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary dropdown-toggle rounded-0\" ld=\"newuser-role-picked\" data-toggle=\"dropdown\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 55;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-menu\"\u003E";
;pug_debug_line = 56;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"dropdown-item\" ld-each=\"newuser-role-option\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 57;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"newuser-add\"\u003E";
;pug_debug_line = 58;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "增加\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"ml-4 mr-2 clickable\" ld=\"newuser-toggle\"\u003E";
;pug_debug_line = 60;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 61;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-1 mx-1\" ld=\"role-view\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"newtoken-add\" href=\"#\"\u003E";
;pug_debug_line = 62;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以連結方式加入權限 ...\u003C\u002Fa\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"mx-2\"\u003E";
;pug_debug_line = 63;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "或\u003C\u002Fspan\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ca class=\"text-sm\" ld=\"batch-add\" href=\"#\"\u003E";
;pug_debug_line = 64;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "以 EMAIL 批次加入\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 67;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0\" ld=\"list-view\"\u003E";
;pug_debug_line = 68;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 69;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.75em\"\u003E";
;pug_debug_line = 70;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-sm text-muted\" ld=\"role\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 71;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 74;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-0 d-none\" ld=\"role-view\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"row no-gutters\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md-6\" ld-each=\"user\"\u003E";
;pug_debug_line = 76;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"border rounded d-flex p-2 m-2 align-items-center shadow-sm\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" style=\"width:2.25em\"\u003E";
;pug_debug_line = 77;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-1by1 bg-dark rounded bg-cover bg-portrait\" ld=\"avatar\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cb ld=\"name\"\u003E\u003C\u002Fb\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cspan class=\"text-sm ml-2\" ld=\"key\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 78;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"pr-2\"\u003E";
;pug_debug_line = 79;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ci class=\"i-close clickable\" ld=\"delete\"\u003E\u003C\u002Fi\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 81;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"mt-4 px-2\"\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Ch5\u003E";
;pug_debug_line = 82;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "此名單的權限\u003C\u002Fh5\u003E";
;pug_debug_line = 83;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"admin-config\"\u003E";
;pug_debug_line = 84;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "管理員", desc: "擁有管理此活動的所有權限", key: "owner"});
;pug_debug_line = 85;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "評審", desc: "擁有評審的身份，可以使用評分表", key: "judge"});
;pug_debug_line = 86;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立提案", desc: "在任何階段都可以建立新的提案", key: "prj-new"});
;pug_debug_line = 87;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改自己的提案", desc: "在任何階段都可以修改自己的提案", key: "prj-edit-own"});
;pug_debug_line = 88;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "建立留言", desc: "在任何階段都可以新增留言", key: "comment-new"});
;pug_debug_line = 89;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_mixins["config-switch-lg"]({name: "修改任何留言", desc: "可修改任何人的留言", key: "comment-edit"});
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 91;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Chr\u003E";
;pug_debug_line = 92;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex justify-content-between\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger\" ld=\"role-view delete-role\"\u003E";
;pug_debug_line = 93;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fperm.pug";
pug_html = pug_html + "刪除角色\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "perm-panel");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 145;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"grp-list\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"border-bottom shadow-sm bg-white mb-4 sticky z-float\" style=\"top:0\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cinput class=\"form-control\" ld=\"search-input\" placeholder=\"提案名稱或團隊名稱 ...\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"input-group-append\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-secondary\" ld=\"search\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "搜尋\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-4\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex mb-2\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 19;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "專案列表\u003C\u002Fb\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-text\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "匯出：\u003C\u002Fdiv\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn-group\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-secondary disabled\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Ci class=\"i-mail\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-secondary disabled\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Ci class=\"i-bars\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex border-bottom border-top p-2\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-1\" style=\"width:48px\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "編號\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "專案名稱 \u002F 單位\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv ld=\"prjs\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4 text-center text-muted\" ld=\"empty\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "目前尚沒有任何提案。\u003C\u002Fdiv\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex border-bottom align-items-center p-2\" ld-each=\"prj\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-1\" ld=\"index\" style=\"width:48px\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 35;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"flex-grow-1\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"clickable text-underline\" ld=\"name\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted text-sm\" ld=\"ownername\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-1 rounded-circle bg-cover bg-portrait bg-dark mr-2\" ld=\"avatar\" style=\"width:2em;height:2em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-1\" ld=\"username\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"px-1 text-center\" style=\"width:100px\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-outline-danger ld-ext-right\" ld=\"delete\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "刪除 ";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003Cdiv class=\"ld ld-spin ld-spinner\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Flist.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "prj-list");
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 148;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-none\" ld=\"nav-panel\" data-nav=\"main\" data-name=\"grp-detail\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_mixins["scope"].call({
block: function(){
;pug_debug_line = 2;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"py-2 mb-4 text-center\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Ch3 ld=\"name\"\u003E\u003C\u002Fh3\u003E";
;pug_debug_line = 5;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted\" ld=\"ownername\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 10;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"navbar navbar-expand-lg navbar-light border shadow-sm rounded sticky z-fixed bg-white\" style=\"top:15px\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse navbar-collapse\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cul class=\"nav nav-pills mr-auto\" ld=\"nav\" data-nav=\"grp-detail\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link active\" ld=\"nav-tab default\" data-name=\"prj-info\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "基本資訊\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"prj-track\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "專案追蹤\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"prj-budget\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "經費表\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-name=\"prj-view\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "提案內容\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E";
;pug_debug_line = 17;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cul class=\"navbar-nav ml-auto\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cli class=\"nav-item\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"nav-link\" ld=\"nav-tab\" data-nav=\"main\" data-name=\"grp-list\"\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "專案列表 ";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Ci class=\"i-chevron-right\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 18;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 20;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-0\"\u003E";
;pug_debug_line = 21;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel default\" data-nav=\"grp-detail\" data-name=\"prj-info\"\u003E";
;pug_debug_line = 22;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"p-4\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"row mb-4\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 25;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "提案人資訊\u003C\u002Flabel\u003E";
;pug_debug_line = 26;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E";
;pug_debug_line = 27;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"rounded-circle bg-cover bg-portrait bg-dark mr-2\" ld=\"avatar\" style=\"width:2em;height:2em\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 28;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Ca class=\"mr-2\" ld=\"username\"\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "( \u003C\u002Fdiv\u003E";
;pug_debug_line = 30;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\" ld=\"email\"\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"mr-2\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + ") \u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"col-md\"\u003E";
;pug_debug_line = 32;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Clabel\u003E";
;pug_debug_line = 33;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "提案代碼\u003C\u002Flabel\u003E";
;pug_debug_line = 34;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cinput" + (" class=\"form-control\""+" ld=\"id\""+pug_attr("readonly", true, true, true)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 36;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"form-group\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Clabel class=\"mb-0\"\u003E";
;pug_debug_line = 37;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "備註\u003C\u002Flabel\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"text-muted text-sm mb-2\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "任何其它關於案件 \u002F 提案人 \u002F 團隊的資訊，可以記載在這裡。\u003C\u002Fdiv\u003E";
;pug_debug_line = 39;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Ctextarea class=\"form-control\" rows=\"10\"\u003E\u003C\u002Ftextarea\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 41;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"grp-detail\" data-name=\"prj-track\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 mt-4\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 bg-light\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 vertical-center\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 42;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "尚未啟用\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 44;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"grp-detail\" data-name=\"prj-view\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 mt-4\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 bg-light\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 vertical-center\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "尚未啟用\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 47;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv ld=\"nav-panel\" data-nav=\"grp-detail\" data-name=\"prj-budget\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 mt-4\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"aspect-ratio ratio-2by1 bg-light\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 h-100 vertical-center\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "\u003Cdiv class=\"w-100 text-center\"\u003E";
;pug_debug_line = 48;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Fgrp\u002Fdetail.pug";
pug_html = pug_html + "尚未啟用\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
}, "prj-detail");
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 151;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"bg-info text-white m-2 rounded shadow-sm d-none py-2 px-4\" pd=\"modified-warning\" style=\"position:sticky;bottom:.5em\"\u003E";
;pug_debug_line = 153;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center justify-content-end\"\u003E";
;pug_debug_line = 154;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 154;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "您已更動了一些設定，這些設定只要點擊右方的發布鈕後，就會生效。\u003C\u002Fspan\u003E";
;pug_debug_line = 155;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "\u003Cdiv class=\"btn btn-sm btn-outline-light ml-4\" pd=\"publish-modification\"\u003E";
;pug_debug_line = 155;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_html = pug_html + "發布變更\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
},
attributes: {"class": "d-flex flex-column h-100 position-relative z-float"}
}, "admin");
;pug_debug_line = 158;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/assets/lib/handsontable/handsontable.min.js");
;pug_debug_line = 159;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/assets/lib/dompurify/2.0.11/purify.min.js");
;pug_debug_line = 160;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/assets/lib/marked/0.8.0/marked.min.js");
;pug_debug_line = 161;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/util/sdb-adapter.js");
;pug_debug_line = 162;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/util/hub.js");
;pug_debug_line = 163;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/util/user.js");
;pug_debug_line = 164;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/util/input.js");
;pug_debug_line = 165;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/reblock/form-reblock.js");
;pug_debug_line = 166;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/main.js");
;pug_debug_line = 167;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/menu.js");
;pug_debug_line = 168;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/panel.js");
;pug_debug_line = 169;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/info.js");
;pug_debug_line = 170;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/stage.js");
;pug_debug_line = 171;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/perm.js");
;pug_debug_line = 172;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/navbar.js");
;pug_debug_line = 173;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/entry.js");
;pug_debug_line = 174;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/list.js");
;pug_debug_line = 175;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/welcome.js");
;pug_debug_line = 176;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/page.js");
;pug_debug_line = 177;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/prj.js");
;pug_debug_line = 178;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/admin/post-list.js");
;pug_debug_line = 181;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/form/index.js");
;pug_debug_line = 182;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/form/block.js");
;pug_debug_line = 183;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/form/criteria.js");
;pug_debug_line = 184;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/form/validator.js");
;pug_debug_line = 187;pug_debug_filename = "src\u002Fpug\u002Fadmin\u002Findex.pug";
pug_mixins["script"]("/dash/js/prj/view-simple.js");
pug_html = pug_html + "\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"Array" in locals_for_with?locals_for_with.Array:typeof Array!=="undefined"?Array:undefined,"JSON" in locals_for_with?locals_for_with.JSON:typeof JSON!=="undefined"?JSON:undefined,"Math" in locals_for_with?locals_for_with.Math:typeof Math!=="undefined"?Math:undefined,"blockLoader" in locals_for_with?locals_for_with.blockLoader:typeof blockLoader!=="undefined"?blockLoader:undefined,"cssLoader" in locals_for_with?locals_for_with.cssLoader:typeof cssLoader!=="undefined"?cssLoader:undefined,"decache" in locals_for_with?locals_for_with.decache:typeof decache!=="undefined"?decache:undefined,"escape" in locals_for_with?locals_for_with.escape:typeof escape!=="undefined"?escape:undefined,"parentName" in locals_for_with?locals_for_with.parentName:typeof parentName!=="undefined"?parentName:undefined,"prefix" in locals_for_with?locals_for_with.prefix:typeof prefix!=="undefined"?prefix:undefined,"scriptLoader" in locals_for_with?locals_for_with.scriptLoader:typeof scriptLoader!=="undefined"?scriptLoader:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line);};return pug_html;}; module.exports = template; })() 