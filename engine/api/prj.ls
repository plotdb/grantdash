require! <[fs fs-extra path crypto read-chunk sharp express-formidable uploadr lderror suuid]>
require! <[./cache]>
require! <[../aux ../util/throttle ../util/grecaptcha]>
(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

get-prj = (slug) ->
  Promise.resolve!
    .then ->
      if !slug => return aux.reject 400
      io.query """
      select p.*,u.displayname as ownerName
      from prj as p, users as u
      where slug = $1 and p.owner = u.key and p.deleted is not true
      """, [slug]
    .then (r={}) ->
      if !(prj = r.[]rows.0) => return aux.reject 404
      return prj

# used by project editing. so we only provide this to owner.
api.get "/prj/:slug/", aux.signed, (req, res) ->
  cache.perm.check {io, user: req.user, type: \prj, slug: req.params.slug, action: \owner}
    .then -> cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-edit"}
    .then -> get-prj req.params.slug
    .then (prj = {}) -> res.send prj
    .catch aux.error-handler res

app.get \/prj/:slug, (req, res) ->
  lc = {}
  cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-view"}
    # TODO check judge permission
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: <[owner judge]>}
    .then -> get-prj req.params.slug
    .then (prj) ->
      lc.prj = prj
      if !(prj.detail) => return aux.reject 404
      io.query """select name,slug,org,detail from brd where slug = $1 and deleted is not true""", [lc.prj.brd]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 400
      lc.grp = grp = (brd.{}detail.{}group or []).filter(-> it.key == lc.prj.grp).0
      lc.page-info = brd.{}detail.{}page.{}info.{}generic
      if !lc.grp => return aux.reject 400
      lc.grp = grp = grp{form,info}
      delete brd.detail
      view = if (req.{}query.simple)? => \view/prj-view-simple.pug
      else \view/prj-viwe.pug
      res.render view, lc{prj, grp, brd, page-info} <<< {exports: lc{prj, brd, grp}} <<< req.scope{domain}
    .catch aux.error-handler res

api.delete \/prj/:slug, aux.signed, (req, res) ->
  if !(slug = req.params.slug) => return aux.r400 res
  cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-edit"}
    .then -> cache.perm.check {io, user: req.user, type: \prj, slug: slug, action: \owner}
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: \owner}
    .then -> io.query """update prj set deleted = true where slug = $1""", [slug]
    .then -> res.send {}
    .catch aux.error-handler res

api.post \/prj/, aux.signed, throttle.count.user-md, express-formidable!, grecaptcha, (req, res) ->
  lc = {}
  {name,description,brd,grp} = req.fields
  if !(brd and grp) => return aux.r400 res
  thumb = (req.files["thumbnail[]"] or {}).path
  slug = suuid!
  cache.stage.check {io, type: \brd, slug: brd, name: "prj-new"}
    .then -> io.query """select org, slug, key, detail->'group' as group from brd where slug = $1""", [brd]
    .then (r={}) ->
      if !(lc.brd = r.[]rows.0) => return aux.reject 404
      if !(grpinfo = lc.brd.[]group.filter(->it.key == grp).0) => return aux.reject 404
      if !(lc.brd.org) => return aux.reject 404
      #if (limit = (+grpinfo.{}info.limit or 0)) =>

      io.query """
      insert into prj (name,description,brd,grp,slug,owner)
      values ($1,$2,$3,$4,$5,$6) returning key
      """, [name, description, brd, grp, slug, req.user.key]
    .then (r = {}) ->
      lc.ret = (r.[]rows or []).0
      if !thumb => return
      new Promise (res, rej) ->
        root = "users/org/#{lc.brd.org}/prj/#slug/upload"
        (e) <- fs-extra.ensure-dir root, _
        if e => return rej(e)
        (e,i) <- sharp(thumb).toFile path.join(root, "thumb.png"), _
        if e => rej(e) else res!
    .then -> res.send (lc.ret or {}) <<< {slug}
    .catch aux.error-handler res
