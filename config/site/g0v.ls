(->
  config = do
    debug: false
    is-production: true
    domain: \sch001.g0v.tw
    facebook:
      clientID: \2681778115429415
    google:
      clientID: \1003996266757-ftddrj4t7kskndttjtl1lrq1qn9dpfiu.apps.googleusercontent.com

  if module? => module.exports = config
)!

