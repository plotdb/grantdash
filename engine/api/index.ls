require! <[fs path]>
require! <[./user ./board ./org ./comment ./auth/reset ./auth/verify]>
module.exports = (engine, io) ->
  user engine, io
  reset engine, io
  verify engine, io
  board engine, io
  org engine, io
  comment engine, io
