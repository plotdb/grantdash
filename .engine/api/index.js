// Generated by LiveScript 1.3.0
(function(){
  var fs, path, admin, user, prj, brd, org, perm, discuss, reset, verify;
  fs = require('fs');
  path = require('path');
  admin = require('./admin');
  user = require('./user');
  prj = require('./prj');
  brd = require('./brd');
  org = require('./org');
  perm = require('./perm');
  discuss = require('./discuss');
  reset = require('./auth/reset');
  verify = require('./auth/verify');
  module.exports = function(engine, io){
    user(engine, io);
    reset(engine, io);
    verify(engine, io);
    brd(engine, io);
    org(engine, io);
    discuss(engine, io);
    admin(engine, io);
    prj(engine, io);
    return perm(engine, io);
  };
}).call(this);
