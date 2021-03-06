// Generated by LiveScript 1.3.0
(function(){
  var aux, expressRateLimit, expressSlowDown, key, count, speed;
  aux = require('../aux');
  expressRateLimit = require('express-rate-limit');
  expressSlowDown = require('express-slow-down');
  key = {
    generic: function(req){
      return aux.ip + ":" + req.baseUrl + ((req.route && req.route.path) || req.path || '/');
    },
    user: function(req){
      return (req.user ? req.user.key : 0) + ":" + req.baseUrl + ((req.route && req.route.path) || req.path || '/');
    }
  };
  count = {
    user: expressRateLimit({
      windowMs: 5 * 60 * 1000,
      max: 50,
      keyGenerator: key.user
    }),
    ip: expressRateLimit({
      windowMs: 5 * 60 * 1000,
      max: 50,
      keyGenerator: key.generic
    }),
    userMd: expressRateLimit({
      windowMs: 10 * 60 * 1000,
      max: 25,
      keyGenerator: key.user
    }),
    ipMd: expressRateLimit({
      windowMs: 10 * 60 * 1000,
      max: 25,
      keyGenerator: key.generic
    }),
    route: {
      ext: expressRateLimit({
        windowMs: 1 * 60 * 1000,
        max: 30,
        keyGenerator: key.generic
      }),
      user: expressRateLimit({
        windowMs: 1 * 60 * 1000,
        max: 60,
        keyGenerator: key.generic
      }),
      api: expressRateLimit({
        windowMs: 1 * 60 * 1000,
        max: 120,
        keyGenerator: key.generic
      })
    },
    action: {
      signup: expressRateLimit({
        windowMs: 120 * 60 * 1000,
        max: 10,
        keyGenerator: key.generic
      }),
      login: expressRateLimit({
        windowMs: 1 * 60 * 1000,
        max: 30,
        keyGenerator: key.generic
      }),
      mail: expressRateLimit({
        windowMs: 120 * 60 * 1000,
        max: 10,
        keyGenerator: key.generic
      })
    }
  };
  speed = {
    user: expressSlowDown({
      windowMs: 5 * 60 * 1000,
      max: 10,
      keyGenerator: key.user
    }),
    ip: expressSlowDown({
      windowMs: 5 * 60 * 1000,
      delayAfter: 10,
      delayMs: 500,
      keyGenerator: key.generic
    }),
    route: {
      api: expressSlowDown({
        windowMs: 10 * 60 * 1000,
        delayAfter: 240,
        delayMs: 10,
        keyGenerator: key.generic
      })
    }
  };
  module.exports = {
    key: key,
    count: count,
    speed: speed
  };
}).call(this);
