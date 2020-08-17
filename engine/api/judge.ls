require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit suuid mime-types]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
(engine,io) <- (->module.exports = it)  _

{deploy, slugs, save-snapshot} = common

api = engine.router.api
app = engine.app

permission-check = ({req, res, brd, grp}) ->
  Promise.resolve!
    .then ->
      if !(req.user and req.user.key) => return aux.reject 403
      if !(brd and grp) => return aux.reject 400
      cache.stage.check {io, type: \brd, slug: brd}
    .then (c = {}) ->
      cfg = c.config
      if !(cfg["judge-criteria"] or cfg["judge-primary"] or cfg["judge-final"]) =>
        return Promise.reject new lderror(1016)
      cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[judge owner]>}
        .catch ->
          io.query """
          select owner from perm_judge where brd = $1 and grp = $2 and owner = $3
          """, [brd, grp, req.user.key]
            .then (r={}) ->
              if !(r.[]rows.length) => return Promise.reject 403

# judge doc use username to keep track of result. we use this to get user displayname
api.put \/usermap/, (req, res) ->
  if !((keys = req.body.userkeys) and Array.isArray(keys)) => return aux.r400 res
  io.query "select key,displayname from users where key = ANY($1::int[])", [keys]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res


api.post \/brd/:brd/grp/:grp/judge/:type/publish, (req, res) ->
  type = {"criteria": "criteria", "primary": "shortlist", "winner": "final"}[req.params.type]
  {brd,grp} = req.params{brd,grp}
  if !type => return aux.r403 res
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[owner]>}
    .then ->
      io.query "select key,system from prj where brd = $1 and grp = $2", [brd, grp]
    .then (r={}) ->
      list = r.[]rows
      list.map -> it.{}system.{}badge[type] = (it.key in req.body.prjs)
      io.query """
      with data as ( select unnest($1::int[]) as key, unnest($2::jsonb[]) as system )
      update prj set system = data.system from data where prj.key = data.key
      """, [list.map(->it.key), list.map(->it.system)]
    .then (r={}) -> res.send!
    .catch aux.error-handler res

api.get \/brd/:brd/grp/:grp/judge/:type/result, (req, res) ->
  {brd,grp,type} = req.params{brd,grp,type}
  permission-check {req, res, brd, grp}
    .then ->
      io.query "select data from snapshots where doc_id = $1", ["brd/#{brd}/grp/#{grp}/judge/#{type}/"]
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      res.send {data: ret}
    .catch aux.error-handler res

api.get \/brd/:brd/grp/:grp/judge/criteria/:scope, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {brd,grp,scope} = req.params{brd,grp,scope}
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[owner]>}
    .then -> io.query "select detail from brd where slug = $1", [brd]
    .then (r={}) ->
      lc.brd = r.[]rows.0
      grps = lc.brd.{}detail.[]group
      if !(lc.grp = lc.brd.{}detail.[]group.filter(-> it.key == grp).0) => return aux.reject 404
      lc.criteria = lc.grp.{}criteria
    .then -> io.query "select data from snapshots where doc_id = $1", ["brd/#{brd}/grp/#{grp}/judge/criteria/"]
    .then (r={}) ->
      if !(lc.data = data = (r.rows[].0 or {}).data) => return res.send {}
      io.query "select key,displayname from users where key = ANY($1::int[])", [[k for k of data.{}user]]
        .then (r={}) ->
          lc.users = r.[]rows
          io.query """
          select p.key, p.slug from prj as p
          where
            p.detail is not null and
            p.brd = $1 and
            p.grp = $2 and
            p.deleted is not true
          """, [brd, grp]
        .then (r={}) ->
          prjs = r.[]rows
          res.send {data: lc.data, users: lc.users, prjs, criteria: lc.criteria}
    .catch aux.error-handler res

api.get \/brd/:brd/grp/:grp/judge/:type/:scope, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {brd,grp,type,scope} = req.params{brd,grp,type,scope}
  if !(type in <[primary final]>) => return aux.r400 res
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[owner]>}
    .then ->
      io.query "select detail from brd where slug = $1", [brd]
    .then (r={}) ->
      lc.brd = r.[]rows.0
      grps = lc.brd.{}detail.[]group
      if !(lc.grp = lc.brd.{}detail.[]group.filter(-> it.key == grp).0) => return aux.reject 404
      lc.judges = lc.grp.{}judgePerm.[]list
    .then -> io.query "select data from snapshots where doc_id = $1", ["brd/#{brd}/grp/#{grp}/judge/#{type}/"]
    .then (r={}) ->
      if !(lc.data = data = (r.rows[].0 or {}).data) => return res.send {}
      io.query """
      select p.owner as key, p.id, u.displayname
      from perm_judge as p
      left join users as u on u.key = p.owner
      where p.id = ANY($1::text[]) and p.brd = $2 and p.grp = $3
      """, [lc.judges.map(-> it.id), brd, grp]
        .then (r={}) ->
          hash = {}
          lc.judges.map -> hash[it.id] = it
          lc.users = r.[]rows
          lc.users.map -> it.name = (hash[it.id] or {}).name
        .then ->
          # TODO must pass criteria judge
          io.query """
          select p.key, p.slug from prj as p
          where
            p.detail is not null and
            p.brd = $1 and
            p.grp = $2 and
            p.deleted is not true
          """, [brd, grp]
        .then (r={}) ->
          prjs = r.[]rows
          res.send {data: lc.data, users: lc.users, prjs}
    .catch aux.error-handler res

api.get \/brd/:brd/grp/:grp/judge-list, (req, res) ->
  {brd, grp} = req.params{brd, grp}
  permission-check {req, res, brd, grp}
    .then ->
      io.query """
      select p.key, p.name, p.slug, p.detail->'info' as info, p.system, u.displayname as ownername from prj as p
      left join users as u on u.key = p.owner
      where
        p.detail is not null and
        p.brd = $1 and
        p.grp = $2 and
        p.deleted is not true and
        p.state = 'active'
      """, [brd, grp]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res
