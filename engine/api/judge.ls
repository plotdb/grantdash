require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror nodegit suuid mime-types]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
(engine,io) <- (->module.exports = it)  _

{deploy, slugs, save-snapshot} = common

api = engine.router.api
app = engine.app

api.get \/brd/:brd/grp/:grp/judge/criteria/all, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  lc = {}
  {brd,grp} = req.params{brd,grp}
  cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[judge owner]>}
    .then -> io.query "select data from snapshots where doc_id = $1", ["brd/#{brd}/grp/#{grp}/judge/criteria/"]
    .then (r={}) -> 
      if !(lc.data = data = (r.rows[].0 or {}).data) => return aux.reject 404
      io.query "select key,displayname from users where key = ANY($1::int[])", [[k for k of data.{}user]]
    .then (r={}) ->
      users = r.[]rows
      res.send {data: lc.data, users}
    .catch aux.error-handler res

api.get \/brd/:brd/grp/:grp/judge-list, (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  {brd, grp} = req.params{brd, grp}
  if !(brd and grp) => return aux.r400 res
  cache.stage.check {io, type: \brd, slug: brd}
    .then (c = {}) ->
      cfg = c.config
      if !(cfg["judge-criteria"] or cfg["judge-primary"] or cfg["judge-final"]) => return aux.reject 403
      cache.perm.check {io, user: req.user, type: \brd, slug: brd, action: <[judge owner]>}
    .then ->
      io.query """
      select p.key, p.name, p.slug, p.detail->'info' as info, u.displayname as ownername from prj as p
      left join users as u on u.key = p.owner
      where
        p.detail is not null and
        p.brd = $1 and
        p.grp = $2 and
        p.deleted is not true
      """, [brd, grp]
    .then (r={}) -> res.send r.[]rows
    .catch aux.error-handler res
