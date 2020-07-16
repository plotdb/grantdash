require! <[puppeteer]>

id = +process.argv.2

console.log "initializing... ( #{id} )"
lc = {}
puppeteer.launch!
  .then ->
    console.log "new page ... "
    lc.browser = it
    lc.browser.newPage!
  .then ->
    console.log "go to page ... "
    lc.page = it
    lc.page.goto "https://dev.gda.sh/dash/load.html?#{id}"
    lc.page.on \console, -> console.log it.text!
  .then -> console.log "running..."

