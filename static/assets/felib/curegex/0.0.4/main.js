var generic, tw;
generic = require("./curegex.js");
tw = require("./curegex.tw.js");
module.exports = (generic.tw = tw, generic);
