require! <[nodegit lderror path ../aux]>

save-snapshot = ({io, sharedb, doc_id, version}) -> new Promise (res, rej) ->
  (e,b) <- sharedb.connect.fetchSnapshot \doc, doc_id, version, _
  if e => return rej e
  {id,v,type,data} = b
  io.query "select doc_id,version from milestonesnapshots where version = $1", [v]
    .then (r={}) ->
      if r.[]rows.length => return Promise.resolve!
      io.query """
      insert into milestonesnapshots (collection,doc_id,doc_type,version,data) values ($1,$2,$3,$4,$5)
      """, ["doc", id, type, v, data]
    .then -> res!
    .catch rej

slugs = ({io, org, brd, prj, post}) -> new Promise (res, rej) ->
  type = if prj => \prj else if brd => \brd else if org => \org else if post => \post else null
  if !type => return rej(new lderror 400)
  # TODO use left join to speed up
  promise = if type == \prj =>
    io.query """
    select o.slug as org, b.slug as brd, p.slug as prj
    from org as o, brd as b, prj as p
    where p.slug = $1 and p.brd = b.slug and b.org = o.slug
    """, [prj]
  else if type == \post =>
    io.query """
    select o.slug as org, b.slug as brd, p.slug as post
    from org as o, brd as b, post as p
    where p.slug = $1 and p.brd = b.slug and b.org = o.slug
    """, [post]
  else if type == \brd =>
    io.query """
    select o.slug as org, b.slug as brd
    from org as o, brd as b
    where b.slug = $1 and b.org = o.slug
    """, [brd]
  else if type == \org =>
    io.query """
    select o.slug as org
    from org as o
    where o.slug = $1
    """, [org]
  promise
    .then (r={}) ->
      if !(ret = r.[]rows.0) => return aux.reject 404
      {org,prj,brd,post} = ret
      root = if type == \prj => "users/org/#{org}/prj/#{prj}"
      else if type == \post => "users/org/#{org}/post/#{post}"
      else if type == \brd => "users/org/#{org}/brd/#{brd}"
      else if type == \org => "users/org/#{org}"
      else null
      if !root => return aux.reject 400
      res(ret <<< {type,root})
    .catch -> rej it

deploy = ({url, root, branch}) ->
  # open repo at certain location
  nodegit.Repository.open root
    # repo not found. create one ....
    .catch ->
      nodegit.Repository.init root, 0
    .then (repo) ->
      repo.getRemotes!
        .then (rs) ->
          Promise.all( rs.map (r) ->
            if r.url! == url => return true
            nodegit.Remote.delete repo, r.name! .finally -> return false
          )
        .then (rs) ->
          # url isn't found in current remotes
          if !rs.reduce(((a,b) -> a or b), false) =>
            # single-branch workaround - https://github.com/nodegit/nodegit/issues/1669
            remote = nodegit.Remote.createWithFetchspec(
              repo, \origin, url, "+refs/heads/#branch:refs/remotes/origin/#branch"
            )
        # now we got repo. fetch any new data ..
        .then -> repo.fetchAll!
        # checkout branch
        .then -> repo.getBranch "refs/remotes/origin/#{branch}"
        .then (ref) -> repo.checkoutRef ref, {checkoutStrategy: 2} # force checkout
        .catch (e) -> console.log "[Deploy Error]", e

module.exports = {slugs, deploy, save-snapshot}
