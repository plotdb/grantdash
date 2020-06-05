require! <[express crypto path ../api/common]>

{slugs, deploy} = common

hmac-digest = (sig, content, key) ->
  try
    v1 = Buffer.from(sig)
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
          list.map (d) ->
            Promise.resolve!then ->
              if hmac-digest(req.headers['x-hub-signature'], req.raw-body, d.git.secret) =>
                slugs(d) .then (ret) ->
                  {root,prj,org,brd} = ret
                  if !root => return
                  deploy {url: d.git.url, branch: d.git.branch, root: path.join(root, \static)}

        )
      .then -> # done.
      .catch -> console.log it
