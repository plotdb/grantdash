require! <[../aux express-rate-limit express-slow-down]>

key = do
  generic: (req) ->
    "#{aux.ip}:#{req.baseUrl}#{(req.route and req.route.path) or req.path or '/'}"
  user: (req) ->
    "#{(if req.user => req.user.key else 0)}:#{req.baseUrl}#{(req.route and req.route.path) or req.path or '/'}"

# user / ip throttling are for post / put / delete methods.

count = do
  user: express-rate-limit       { windowMs:   5 * 60 * 1000, max:  50, keyGenerator: key.user    }
  ip: express-rate-limit         { windowMs:   5 * 60 * 1000, max:  50, keyGenerator: key.generic }
  route: do
    ext: express-rate-limit      { windowMs:   1 * 60 * 1000, max:  30, keyGenerator: key.generic}
    user: express-rate-limit     { windowMs:   1 * 60 * 1000, max:  60, keyGenerator: key.generic }
    api: express-rate-limit      { windowMs:   1 * 60 * 1000, max: 120, keyGenerator: key.generic }
  action: do
    signup: express-rate-limit   { windowMs: 120 * 60 * 1000, max:  10, keyGenerator: key.generic }
    login: express-rate-limit    { windowMs:   1 * 60 * 1000, max:  30, keyGenerator: key.generic }
    mail: express-rate-limit     { windowMs: 120 * 60 * 1000, max:  10, keyGenerator: key.generic }

speed = do
  user: express-slow-down     { windowMs: 5 * 60 * 1000, max: 10, keyGenerator: key.user }
  ip: express-slow-down       { windowMs: 5 * 60 * 1000, delayAfter: 10, delayMs: 500, keyGenerator: key.generic }
  route: do
    api: express-slow-down    { windowMs: 10 * 60 * 1000, delayAfter: 240, delayMs: 10, keyGenerator: key.generic }

module.exports = {key, count, speed}
