module.exports = do
  domain: \root-domain

  debug: false
  is-production: false

  port: \9304 # backend port
  limit: '20mb'
  watch: true
  publicServer: true # true if this is the server that open for self-service org creation

  grecaptcha: do
    enabled: true
    sitekey: \sitekey
    secret: \sitesecret

  sharedb: enabled: true
  build:
    watcher: do
      ignores: ['\/\..*\.swp$', '^static/s', '^static/assets/img']
    assets: []
  admin: do
    email: <[admin-email]>

  facebook:
    clientSecret: \client-secret
    clientID: \client-id

  google:
    clientSecret: \client-secret
    clientID: \client-id

  session: secret: 'session-secret'

  mailgun: do
    auth:
      domain: \mailgun-domain
      api_key: \api-key

  io-pg: do
    uri: "postgres://<username>:<password>@localhost/<dbname>"
    database: \<dbname>
    user: \<username>
    password: \<password>
    host: \localhost
