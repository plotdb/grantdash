(->
  config = do
    debug: false
    is-production: true
    domain: \grantdash.io
    facebook:
      clientID: \1234
    google:
      clientID: \1234
  if module? => module.exports = config
)!

