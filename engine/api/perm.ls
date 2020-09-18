require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[../aux ./cache ../util/grecaptcha ../util/throttle]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

/* permission detail
api.post \/perm, aux.signed, (req, res) ->
  {brd,org} = req.body{brd,org}
  if !(brd or org) => return aux.r403 res
  type = if brd => \brd else \org
  slug = if brd => brd else org
  io.query """
  select p.role,p.type,p.ref,p.owner,u.username,u.displayname
  from perm as p, users as u
  where p.objtype = $1 and p.objslug = $2 and (
  (p.type = 'email' and u.username = p.ref)
  or (p.type = 'user' and u.key = p.ref::int)
  or (p.type = 'token' and u.key = p.owner)
  )
  """, [type, slug]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res
*/

api.post \/account, aux.signed, (req, res) ->
  if !(name = req.body.name) => return aux.r404 res
  name = "#{name}".substring(0, 32)
  io.query """
  select key,displayname from users where lower(displayname) ~ lower($1) or lower(username) ~ lower($1)
  """, [name]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res

api.get \/stage, (req, res) ->
  {brd} = req.query{brd}
  if !brd => return aux.r400 res
  cache.stage.check {io, type: \brd, slug: brd}
    .then -> res.send it
    .catch aux.error-handler res

api.post \/token, aux.signed, grecaptcha, (req, res) ->
  [token,id] = [suuid!, suuid!]
  hint = ({} <<< req.body){org, brd, role}
  if !(slug = if hint.brd => hint.brd else hint.org) => return aux.r400 res
  if !(type = if hint.brd => \brd else if hint.org => \org else null) => return aux.r400 res
  if !(role = hint.role) => return aux.r400 res
  # TODO For now, we only provide brd permission token. only owner can create token
  cache.perm.check {io, user: req.user, type, slug, action: \owner}
    .then ->
      io.query """
      insert into permtoken (objtype, objslug, role, token, id) values ($1, $2, $3, $4, $5)
      """, [type, slug, role, token, id]
    .then -> res.send {id, token}
    .catch aux.error-handler res

app.get \/token/:token, (req, res) ->
  if !(token = req.params.token) => return aux.r400 res
  res.render "auth/perm/claim.pug", {exports: {token}}

# TODO recaptcha
api.put \/token, aux.signed, (req, res) ->
  lc = {}
  if !(token = req.body.token) => return aux.r400 res
  io.query """
  select objtype, objslug, role, count, token, id, redeemspan, createdtime
  from permtoken where token = $1
  """, [token]
    .then (r={}) ->
      if !(lc.ret = ret = r.[]rows.0) => return aux.reject 404
      if Date.now! >= ((new Date(ret.createdtime).getTime!) + ret.redeemspan * 1000) =>
        return io.query "delete from permtoken where token = $1", [token]
          .then -> return Promise.reject(new lderror(1013))
      io.query """
      insert into perm (objtype, objslug, role, type, ref, owner)
      values ($1, $2, $3, $4, $5, $6)
      on conflict do nothing
      """, [ret.objtype, ret.objslug, ret.role, \token, "#{ret.id}:#{ret.count}", req.user.key]
    .then ->
      ret = lc.ret
      if ret.count > 1 =>
        io.query "update permtoken set count = $1 where token = $2", [ret.count - 1, token]
      else io.query "delete from permtoken where token = $1", [token]
    .then -> res.send {}
    .catch aux.error-handler res

api.post \/judgetoken, grecaptcha, (req, res) ->
  if !(req.user and req.user.key) => return aux.r400 res
  [token,id] = [suuid!, suuid!]
  {brd, grp, email} = req.body{brd, grp, email}
  if !(brd and grp) => return aux.r400 res
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: \owner}
    .then ->
      io.query """
      insert into permtoken_judge (brd, grp, email, token, id) values ($1, $2, $3, $4, $5)
      """, [brd, grp, email, token, id]
    .then -> res.send {id, token}
    .catch aux.error-handler res

app.get \/judgetoken/:token, (req, res) ->
  if !(token = req.params.token) => return aux.r400 res
  io.query "select email from permtoken_judge where token = $1", [token]
    .then (r={}) ->
      if (ret = r.[]rows.0) =>
        return res.render "auth/perm/judge-claim.pug", {exports: {token, email: ret.email}}
      if !(req.user and req.user.key) => return res.render "auth/perm/judge-fail.pug"
      io.query """
      select b.name,b.detail->'stage' as stage,b.detail->'group' as group, p.brd,p.grp from perm_judge as p
      left join brd as b on b.slug = p.brd
      where p.owner = $1""", [req.user.key]
        .then (r={}) ->
          ret = {}
          list = r.[]rows
            .map (p) ->
              {brd,grp} = p{brd,grp}
              if !(group = p.group.filter((g) -> g.key == p.grp).0) => return
              group-name = if p.group.length > 1 => group.{}info.name else null
              group.{}judge.{}custom.[]entries
                .filter (e) -> e.{}config.enabled
                .map (e) ->
                  ret{}["#brd/#grp"] <<< p{name, grp, brd} <<< {group-name}
                  ret["#brd/#grp"][]list.push(
                    p{name,grp,brd} <<< {type: 'custom', slug: e.slug, sheetname: e.name}
                  )

              cfgs = p.{}stage.[]list.filter (s) ->
                if s.start and Date.now! < new Date(s.start).getTime! => return false
                if s.end and Date.now! > new Date(s.end).getTime! => return false
                return true
              stage = cfgs{}[* - 1].config or {}
              <[final primary]>.map (type) ->
                if !stage["judge-#type"] => return
                ret{}["#brd/#grp"] <<< p{name, grp, brd} <<< {group-name}
                ret["#brd/#grp"][]list.push(p{name,grp,brd} <<< {type})
          if !([k for k of ret].length) => return res.render "auth/perm/judge-fail.pug"
          return res.render "auth/perm/judge-list.pug", {exports: {key: [k for k of ret], map: ret}}
    .catch aux.error-handler res

api.put \/judgetoken, aux.signed, grecaptcha, (req, res) ->
  lc = {}
  if !(token = req.body.token) => return aux.r400 res
  io.query """
  select brd, grp, email, count, token, id, redeemspan, createdtime
  from permtoken_judge where token = $1
  """, [token]
    .then (r={}) ->
      if !(lc.ret = ret = r.[]rows.0) => return aux.reject 404
      if lc.ret.email.toLowerCase! != req.user.username => return aux.reject 403
      if Date.now! >= ((new Date(ret.createdtime).getTime!) + ret.redeemspan * 1000) =>
        return io.query "delete from permtoken_judge where token = $1", [token]
          .then -> return Promise.reject(new lderror(1013))
      io.query """
      insert into perm_judge (brd, grp, type, id, owner)
      values ($1, $2, $3, $4, $5)
      on conflict do nothing
      """, [ret.brd, ret.grp, 1, "#{ret.id}:#{ret.count}", req.user.key]
    .then ->
      ret = lc.ret
      if ret.count > 1 =>
        io.query "update permtoken_judge set count = $1 where token = $2", [ret.count - 1, token]
      else io.query "delete from permtoken_judge where token = $1", [token]
    .then ->
      cache.perm.invalidate-judge {type: \brd, slug: lc.ret.brd}
      res.send {}
    .catch aux.error-handler res
