# Change Logs

## v0.0.2

 - speed up building by replacing `npx` with `./node_modules/.bin/`
 - rename `httputil.js`, `httputil.min.js` to `index.js` and `index.min.js`
 - add `main` and `browser` field in `package.json`.
 - further minimize generated js file with mangling and compression
 - upgrade modules
 - patch test code to make it work with upgraded modules
 - release with compact directory structure
