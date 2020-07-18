require! <[fs path]>
require! <[./admin ./user ./prj ./brd ./org ./judge ./perm ./discuss ./post ./form ./auth/reset ./auth/verify]>
module.exports = (engine, io) ->
  user engine, io
  reset engine, io
  verify engine, io
  brd engine, io
  org engine, io
  judge engine, io
  discuss engine, io
  admin engine, io
  prj engine, io
  post engine, io
  perm engine, io
  form engine, io
