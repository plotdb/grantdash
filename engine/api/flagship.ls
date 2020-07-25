require! <[fs fs-extra path crypto lderror suuid mime-types suuid]>
require! <[../aux ./cache ./common ../util/grecaptcha ../util/throttle]>
require! <[@google-cloud/storage]>

storage = new storage.Storage do
 projectId: \taicca
 keyFilename: \config/key/taicca.json

(engine,io) <- (->module.exports = it)  _

api = engine.router.api
app = engine.app

# TODO keep record of ownership
api.post \/flagship/upload, (req, res) ->
  filename = req.body.filename
  id = suuid!
  storage
   .bucket \taicca-test
   .file id
   .getSignedUrl {action: \write, version: \v4, expires: (Date.now! + 60000)}
   .then -> res.send {signed-url: it.0, id}
   .catch aux.error-handler res

# TODO ownership verify
app.get \/flagship/upload/:id, (req, res) ->
  id = req.params.id
  storage
   .bucket \taicca-test
   .file id
   .getSignedUrl {action: \read, version: \v4, expires: (Date.now! + 60000)}
   .then -> return res.status(302).redirect(it.0)
   .catch aux.error-handler res
