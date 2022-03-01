# Customizable Views

Customizable views are pug / html files that should be able to be customized by org / brd. Following are all customizable views:

 * post-view.pug
 * prj-create.pug
 * prj-edit.pug
 * prj-list.pug
 * prj-view-simple.pug
 * prj-view.pug


## Routes and Rules

View files can be accessed via following ways:

 - nginx.config ( as static html )
   - we may consider limit its access based on brd status.
 - rendered by express


## Block View

Instead of handcrafting pug files everytime, we can also use block views which abstracts core parts with well-defined interface between frontend and backend. Block views uses `@plotdb/block` mechanism for scoping and module loading so we don't have to worry about these issues most of the time.

Currently we still need a separated view folder with some basic pug files to use it. To use it, simply extend `block/base.pug`:

    extends ../block/base.pug


block view exposes following ld-components:

 - `blockbase`
 - `blockuploader`

To load a specific block, use `blockbase.init`

    ldc.register <[blockbase]>, ({blockbase}) ->
      blockdef = {name: '<some-name>', ...}
      brd = "<brd-slug>"
      blockbase.init {blockdef, brd} .then -> ...

blockbase.init accept an argument object with following fields:

 - `blockdef`: block definition object of the block to load
 - `brd`: board slug
 - `root`: container of the block to load. default `document.body`.
 - `data`: data to pass to the block to load

Currently block registry is hardcoded in `blockbase`, which points to `/dash/assets/felib/`. we may extend this behavior in the future.

Following is a full example for project editing ( `prj-edit.pug` ):

    extends ../block/base.pug
    block script
      script: :lsc
        ldc.register <[blockbase]>, ({blockbase}) ->
          blockbase.init {blockdef: {name: "future-content"}, brd: "future-content", data: {}, root: null}


## Block View Interface

a block view block should provide an interface with following members:

 - `adapt(host)`
   - `host` is an object representing grantdash server API, including following methods:
     - `info`: object containing additional info from server, including:
       - `user`: user object ( `{key, username, displayname}` )
       - `prj`: project object ( `{slug, owner}` )
     - `upload({file, progress})`: upload a file to server.
       - `file`: blob to upload
       - `progress({percent})`: callback for monitoring upload progress. ( optional )
     - `save({name,description,data,submit})`: save project.
       - `name`, `description`: name and description of this project.
       - `data`: self-customized JSON object to representing this project.
       - `submit`: true to change project state to `active` from `pending`. default false.
     - `print({html, name})`: print given `html` and download it as a file named `name`.
     - `changeLanguage(lng)`: change current language.
 - `load(data)`: called to load data from server into view
   - `load` should only be called after `adapt` is called
   - Parameters:
     - `data`: data to load / edit. this data is stored in `detail->common` inside prj table.

 - `save(local, opt)`: called to save data to server. should use `host.save(..)` to save data.
   - block host doesn't have default UI thus usually won't trigger save externally by host. view has to provide save buttons for user and trigger save manually.
   - options:
     - `local`: true if caller want to save data locally ( in browser )
     - `opt`: an optionally object used to overwrite payload ( {name,description,data,submit} ).

 - `ldcvmgr`: a ldcvmgr-like interface providing following methods:
   - `get(name, opt)`: get a cover with the given name.
     - return null if no such cover found, otherwise return Promise.
   - `toggle(name, value, opt)`: toggle on a cover with the given name.
     - return null if no such cover found, otherwise return a Promise.


### Block Views Dialogs

Basically, a blockview-based block controls dialogs manually. However for simplicity, block view itself provides and uses dialogs with following names:

 - `submitting`: triggered when form data is being submitted
 - `submitted`: triggered after submission is done.
 - `saving`: triggered when form data is being saved.
 - `saved`: triggered after saving is done.

these names will be passed to the `ldcvmgr` interface a blockview-based block provided and is possible to be overwritten - otherwise a default cover will be used and shown.
