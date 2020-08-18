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
api.get "/prj/:slug/", (req, res) ->
  if !(req.user and req.user.key) => return aux.r403 res
  cache.perm.check {io, user: req.user, type: \prj, slug: req.params.slug, action: \owner}
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: \owner}
    .then -> cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-edit"}
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: \prj-edit-own}
    .then -> get-prj req.params.slug
    .then (prj = {}) -> res.send prj
    .catch aux.error-handler res

app.get \/prj/:slug/edit, (req, res) ->
  lc = {}
  cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-edit"}
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: <[prj-edit-own]>}
    .catch -> return Promise.reject new lderror({ldcv: "not-yet-available"}, 1012)
    .then -> get-prj req.params.slug
    .then (prj) ->
      lc.prj = prj
      io.query """select name,slug,org,detail from brd where slug = $1 and deleted is not true""", [lc.prj.brd]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 400
      if !(brd.detail.custom and brd.detail.custom.view) => view = \view/default/prj-edit.pug
      else view = "view/#{brd.detail.custom.view}/prj-edit.pug"
      delete brd.detail
      res.render view, lc{prj, brd} <<< {exports: lc{prj, brd}} <<< req.scope{domain}
    .catch aux.error-handler res

app.get \/prj/:slug, (req, res) ->
  lc = {}

  get-prj req.params.slug
    .then (prj) ->
      lc.prj = prj
      if !(req.user and req.user.key and prj.owner == req.user.key) =>
        return cache.stage.check {io, type: \brd, slug: req.scope.brd, name: "prj-view"}
    .catch -> cache.perm.check {io, user: req.user, type: \brd, slug: req.scope.brd, action: <[owner judge]>}
    .catch ->
      if !(req.user and req.user.key) => return aux.reject 403
      io.query "select key,grp from perm_judge where brd = $1 and owner = $2", [req.scope.brd, req.user.key]
        .then (r={}) ->
          if !r.[]rows.length => return aux.reject 403
          lc.judges = r.rows
    .then ->
      if !(lc.prj.detail) => return aux.reject 404
      io.query """select name,slug,org,detail from brd where slug = $1 and deleted is not true""", [lc.prj.brd]
    .then (r={}) ->
      if !(lc.brd = brd = r.[]rows.0) => return aux.reject 400
      lc.grp = grp = (brd.{}detail.{}group or []).filter(-> it.key == lc.prj.grp).0
      if lc.judges and !lc.judges.filter(-> it.grp == lc.grp.key).length => return aux.reject 403
      lc.page-info = brd.{}detail.{}page.{}info.{}generic
      if !lc.grp => return aux.reject 400
      lc.grp = grp = grp{form,info}
      if !(brd.detail.custom and brd.detail.custom.view) =>
        view = if (req.{}query.simple)? => \view/default/prj-view-simple.pug
        else \view/default/prj-view.pug
      else
        view = if (req.{}query.simple)? => "view/#{brd.detail.custom.view}/prj-view-simple.pug"
        else "view/#{brd.detail.custom.view}/prj-view.pug"
      delete brd.detail
      res.render view, lc{prj, grp, brd, page-info} <<< {exports: lc{prj, brd, grp}, simple: (req.{}query.simple)?} <<< req.scope{domain}
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
      insert into prj (name,description,brd,grp,slug,owner,state)
      values ($1,$2,$3,$4,$5,$6,'pending') returning key
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
