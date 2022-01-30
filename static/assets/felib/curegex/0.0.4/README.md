# Commonly Used REGular EXpressions

## Note

Some regular expressions here are vulnerable to `ReDOS` attack. Be sure to use them with following conditions:

 - server side: Run these expression with libraries such as `google/re2`, `node-re2`.
 - client side: avoid them, or at least impose necessary limitations on input.


## Installation

    npm install --save curegex



## Usage

include `curegex.js` or `curegex.tw.js`, then use:

    curegex.get("email").exec(mystring);
    curegex.get("email", re2).exec(mystring); /* use `re2` regex engine instead of native RegExp */

set default regular expression engine:

    curegex.engine(re2);


## Usage with NodeJS

include `curegex` and use it by scope:

    var curegex = require("curegex");
    var curegextw = require("curegex").tw;
 

## Resources

 - evil regex and rules of thumb: https://stackoverflow.com/questions/12841970/how-can-i-recognize-an-evil-regex
   - per James Davis mentioned, avoid following:
     - nesting quantifiers ( `(a+)+` )
     - quantified overlapping disjunctions ( `(a|a)+` )
     - quantified overlapping adjacencies ( `\d+\d+` )
   - visualize regular expression to spot above cases: https://regexper.com/
 - https://en.wikipedia.org/wiki/ReDoS


## License

MIT
