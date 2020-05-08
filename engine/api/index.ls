require! <[fs path]>
require! <[./user ./board ./auth/reset ./auth/verify]>
module.exports = (engine, io) ->
  user engine, io
  reset engine, io
  verify engine, io
  board engine, io
