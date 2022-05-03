## host interface for block view

 - `info`: object containing additional info from server, including:
   - `user`: user object ( `{key, username, displayname}` )
   - `brd`: brd information
   - `prjs`: project list
 - `data`: sharedb data
 - `update()`: update data to server
 - `on(n,cb)`: for registering event listener. supported event:
   - `change`: when remote data changes.
 - `publish()`: for updating result badge.

## block view interface for host 

 - `adapt(host)`
 - `load(data)` ( TBD )
 - `ldcvmgr(data)` ( TBD )

