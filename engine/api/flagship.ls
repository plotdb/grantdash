require! <[fs fs-extra path crypto lderror suuid mime-types suuid]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
require! <[@google-cloud/storage]>

storage = new storage.Storage do
 projectId: \taicca
 keyFilename: \config/key/taicca.json
options = do
 action: \write
 version: 'v4'
 expires: Date.now! + 1000 * 60


(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

api.post \/flagship/upload, (req, res) ->
  filename = req.body.filename
  id = suuid!
  options.expires = Date.now! + 1000 * 60
  storage
   .bucket \taicca-test
   .file id
   .getSignedUrl options
   .then -> res.send {signed-url: it.0, id}
   .catch aux.error-handler res
