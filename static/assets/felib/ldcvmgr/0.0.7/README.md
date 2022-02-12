# ldcvmgr

ldcover manager.


## Installation

    npm install --save ldcvmgr


## Usage

include required js file, and create a ldcvmgr instance:

    ldcvmgr = new ldcvmgr({ ... });
    ldcvmgr.get("some-cover-name").then( ... );


constructor options:

 - `path`: where to find cache-missed ldcover html files. default `/modules/cover`
   - more information in the section below.
 - `loader`: ldLoader compatible object for loading indicator when ldcvmgr is fetching remote ldcover html files.
   - default to a fullscreen ldLoader spinner, with class `ldld full`.
 - `autoInit`: default false. `init` called automatically when set to true
 - `manager`: block manager for loading `@/plotdb/block` style ldcover


## API

 - `get(name, param)`: popup a ldcover `name`, and expect return value from it.
   - when `name` is a string, look up a ldcover named `name` in local cache or in "#{@path}/#name"
   - when `name` is an object, load it by `@plotdb/block` manager.
     - interface of the loaded block should be a `ldcover` object.
   - when `param` is provided, it will be sent to `on` event as params.
 - `set(name, param)`: resolve popped ldcover `name` with `param`
 - `on(name, callback({...}))`: listen to `name` event. Following events are available:
   - `on`: fired when some ldcover is toggled on. callback params:
     - node: ldcover dom root.
     - params: additional parameters provided when `get` is called.
     - name: toggled ldcover name
   - `off`: fired when some ldcover is toggled off. similar params with `on`.
 - `lock(name)`: popup a ldcover `name`, and user can't dismiss it.
 - `purge(name)`: clear cache for ldcover `name`.
 - `toggle(name,value,param)`: toggle ldcover `name` with state based on the value (true or false)
   - optional `param` passed to `on` event, just like `get`.
 - `getcover(name)`: return `ldcover` instance of ldcover `name`.
 - `getdom(name)`: return DOM root of ldcover `name`.
 - `is-on(name)`: return true if ldcover `name` is on.


## Customizing Path

The `path` option in constructor options should be either

 - a string, representing the relative root of all ldcover html
 - a function accepting a string

you can set `path` as function to make a more customizable behavior of ldcvmgr. For example, you can define name as:

    locale@variant@name

and invoke `ldcvmgr.get` like this:

    zh-tw@depart-1024@logout


this is an abstract name and there is nothing to do with server file structure, however you can convert it with `path` function into something like this:

    /ldcv/zh-tw/depart-1024/logout.html

furthermore, you can also config your reverse proxy to lookup files ( nginx config for example ):

    location /ldcv/(?<lc>.+)/(?<dep>.+)/(?<name>.+) {
      try_files /intl/$lc/ldcv/$dep/$name.html /intl/$lc/ldcv/generic/$name.html /ldcv/generic/$name.html =404;
    }


## Toggling without scripting

By `auto-init` and adding `data-ldcvmgr-toggle` attributes, you can toggle ldcover automatically when the node with required attribute clicked. Content of the attribute will be used to look up ldcover, which can be either:

 - a string, doesn't contain `:` - will be treated as a plain ldcover name.
 - a string, contains `:` - will be treated as an id of a block, and converted back to a block definition object.


## LICENSE

MIT
