(ctx) <- ldc.register \judgeblockbase, <[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _
{notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter} = ctx
(global) <- auth.get!then _

u1 = global.user or {}
root = undefined

# TODO let these be adjustable.
brd = 'future-content'
blockdef = name: '@taiccadash/qual', version: 'main'
blockopt = {brd}
binfo = {}

host = ->
Ctrl = (opt) ->
  @ <<< (obj = new judge-base opt)
  @

Ctrl.prototype = {} <<< judge-base.prototype <<< do
  ops-in: ({data,ops,source}) ->
    if source => return
    @data = JSON.parse(JSON.stringify(data))
    @data.{}prj
    @render!

  render: ->
    #@get-progress!
    #@view.base.render!
    #@view.local.render!

  reconnect: ->
    @getdoc!
      #.then ~> @sort \name, null, false
      .then ~>
        @prjs.sort (a,b) ~>
          a = +a.system.idx
          b = +b.system.idx
          if b < a => 1 else if b > a => -1 else 0
        @render!
      .then ~> console.log "initied."

  init: ->
    Promise.resolve!
      .then ~> @auth!
      .then ~> @init-view!
      .then ~> @user = @global.user
      .then ~> @fetch-info!
      .then ~> @fetch-prjs!
      .then ~>
        #@prjs = @prjs.filter (p) -> p.key in prj2nd
        #@prjs.sort (a,b) -> prj2nd.indexOf(a.key) - prj2nd.indexOf(b.key)

      .then ~> @sharedb!
      .then ~> @reconnect!
      .then ~> @prepare!
      .catch (e) ->
        if ldError.id(e) == 1012 or e.message == \forbidden => ldcvmgr.toggle \access-denied
        else error! e

  prepare: ->
    lc = {}
    i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \zh-TW, fallbackNS: '', defaultNS: ''
      .then -> i18next.use i18nextBrowserLanguageDetector
      .then ->
        console.log "use language: ", navigator.language or navigator.userLanguage
        i18next.changeLanguage navigator.language or navigator.userLanguage
      .then -> block.i18n.use i18next
      .then ~>
        lc.manager = mgr = new block.manager registry: ({name,version,path,type}) ->
          return if type == \block =>
            "/dash/assets/felib/#name/#{version or 'main'}/#{path or 'index.html'}?dec=#{global.version or ''}"
          else "/dash/assets/felib/#name/#{version or 'main'}/#{path or ('index.min.js')}?dec=#{global.version or ''}"
        mgr.get blockdef
          .then (bc) -> bc.create!
          .then (bi) ~>
            bi.attach {root: @root or document.body, data: blockopt or {}}
              .then ~> bi.interface!
              .then (itf) ~>
                binfo <<< {interface: itf, instance: bi}
                itf.adapt @ #host(itf)
                itf.load!
          .then -> console.log "block #{name} loaded."

  get-progress: ->
    /*
    @progress = ret = {
      todo: 0, done: 0, accept: 0, pending: 0, review-accept: 0, reject: 0, total: (@prjs.length or 1)
    }
    @prjs.map (p) ~> if (v = @data.prj{}[p.key].v)? => ret[typemap[v]]++
    ret.done = (ret.accept + ret.pending + ret.review-accept + ret.reject) or 0
    ret.todo = ret.total - ret.done
    */

ctrl = new Ctrl root: document.body
ctrl.init!
