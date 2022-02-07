# Custom Board

Here defines a common API for boards with customized views.

## Project Editing / Rendering

Project editing / rendering is driven by `prj.ls`.

A custom board is a board with `detail.custom.view` field set to the name of view to use. brd and prj data will be passed to frontned through `viewLocals` components.

Note that for custom board, the detail we post will be stored in `viewLocals.prj.detail.custom`. Following code depicts the save / load scenario:

    custom = viewLocals.prj.detail.custom
    ...
    fetch "/custom/prj", {body: {custom, ...}}




## API Endpoints

 - `POST:/gcs/upload`: upload a file
   - only accesible when
     - `prj-edit` is on in current stage.
     - user with `owner` to target brd.
   - body params:
     - `field`: purpose / referrer for this file. such as, `plan`, `review`, `final-report`, etc
     - `brd`: brd slug for which this file is uploaded against.
     - `owner`: file owner. staff may upload files for some users so we need `owner`
   - return values:
     - `signedUrl`: url for frontend to upload the file ( to GCS )
     - `id`: id for this file. its encoded as `brd-slug/suuid`

 - `GET:/gcs/upload/:brd/:id`: get an uploaded file
   - only accesible when
     - user with `judge` / `owner` to target brd.
     - also check `perm_judge` for additional permission
   - server responds a redirect which instruct browser to a correct, expiring URL for the actual file
   - url params:
     - `brd`: slug for the brd the file requested belongs to.
     - `id`: `suuid` part of the `id` returned by `POST:/gcs/upload`.

 - `POST:/custom/prj`: save / publish project content
   - only accesible when
     - `prj-edit` / `prj-new` is on in current stage.
     - user with `prj-edit-own` / `owner` to target brd.
   - body params:
     - `name`: project name.
     - `description`: project description
     - `custom`: project detail. A json object with schema only upon the customized view
       - this will be saved as `{custom}` in the actual `detail` field inside database
       - ... to be able to recognize that this is a customized object.
     - `submit`: when true, change project status to `active` ( from `pending` )
     - `slug`: project slug. if none, create one ( create only if `prj-new` is on in current stage ).
     - `brd`: slug for target brd.
     - `recaptcha`: recaptcha object. ( handled separatedly )

 - `POST:/custom/print`: TBD


## Functional API

 - `file-url({id, req, res})`: get signed url from `id`.
   - return a Promise resolving to an URL for the file ( can be use with `res.status(302).redirect url`)
   - parameters:
     - `req`, `res`: corresponding to `request` and `response` in express router parameters.
     - `id`: file id ( in `brd-slug/suuid` format ) to look up.
   
