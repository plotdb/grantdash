(->
  config = do
    debug: false
    is-production: false
    domain: \grantdash.dev
    facebook:
      clientID: \2681778115429415
    google:
      clientID: \1234
  if module? => module.exports = config
)!

