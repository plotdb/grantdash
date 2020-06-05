require! <[express crypto path ../api/common]>

{slugs, deploy} = common

hmac-digest = (content, key) ->
  try
    v1 = Buffer.from(req.headers['x-hub-signature'])
    v2 = Buffer.from(
      "sha1=" + crypto.createHmac('sha1', key)
        .update(content)
        .digest('hex')
    )
    if crypto.timingSafeEqual(v1, v2) => return true
  catch e
    return false
  return false

module.exports = (engine, io) ->
  engine.router.ext.post \/deploy, (req, res) ->
    url = req.{}body.{}repository.html_url
    branch = (/^refs\/heads\/(.+)$/.exec(req.body.ref or '') or []).1
    res.send {}
    if !(url and branch) => return

    lc = {}
    io.query """
    select slug, detail->'page'->'info'->'git' as git
    from brd where (detail->'page'->'info'->'git'->>'url')::text ~ $1
    and (detail->'page'->'info'->'git'->>'branch')::text ~ $2
    """, [url, branch]
      .then (r={}) ->
        lc.brd = r.[]rows
        io.query """
        select slug, detail->'page'->'info'->'git' as git
        from org where (detail->'page'->'info'->'git'->>'url')::text ~ $1
        and (detail->'page'->'info'->'git'->>'branch')::text ~ $2
        """, [url, branch]
      .then (r={}) ->
        lc.org = r.[]rows
        list = (
          [] ++
          lc.brd.map(-> {io, brd: it.slug, git: it.git}) ++
          lc.org.map(-> {io, org: it.slug, git: it.git})
        )
        Promise.all(
          list.map ->
            Promise.resolve!then ->
              if hmac-digest(req.raw-body, it.secret) =>
                slugs(it) .then (ret) ->
                  {root,prj,org,brd} = ret
                  if !root => return
                  deploy {url: it.git.url, branch: it.git.branch, root: path.join(root, \static)}

        )
      .then -> # done.
      .catch -> console.log it
