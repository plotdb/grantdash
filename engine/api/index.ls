require! <[fs path]>
require! <[./admin ./user ./prj ./brd ./org ./judge ./perm ./discuss ./post ./form ./custom-brd ./auth/reset ./auth/verify]>

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
  custom-brd engine, io
  try
    require! <[./flagship]>
  catch e
    console.log e
  if flagship? => flagship engine, io
