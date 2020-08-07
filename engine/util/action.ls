require! <[crypto lderror ./mail]>

verify-email = ({req, io, user}) ->
  obj = {}
  Promise.resolve!
    .then ->
      time = new Date!
      obj <<< {key: user.key, hex: "#{user.key}-" + (crypto.randomBytes(30).toString \hex), time: time }
      io.query "delete from mailverifytoken where owner=$1", [obj.key]
    .then -> io.query "insert into mailverifytoken (owner,token,time) values ($1,$2,$3)", [obj.key, obj.hex, obj.time]
    .then ->
      mail.by-template(
        \mail-verify
        user.username
        {token: obj.hex, domain: 'grantdash.io', orgname: 'Grant Dash'} <<< req.scope{domain, orgname}
        {now: true}
      )

module.exports = { verify-email }
