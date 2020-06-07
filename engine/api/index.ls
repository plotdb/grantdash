require! <[fs path]>
require! <[./admin ./user ./prj ./brd ./org ./perm ./discuss ./auth/reset ./auth/verify]>
module.exports = (engine, io) ->
  user engine, io
  reset engine, io
  verify engine, io
  brd engine, io
  org engine, io
  discuss engine, io
  admin engine, io
  prj engine, io
  perm engine, io
