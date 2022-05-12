(ctx) <- ldc.register \judgeblockbase, <[notify judgeBase error loader auth ldcvmgr sdbAdapter]>, _
{notify, judge-base, error, loader, auth, ldcvmgr, sdbAdapter} = ctx
init: ({blockdef}) ->
  (global) <- auth.get!then _

  u1 = global.user or {}

  # TODO let these be adjustable.
  #blockdef = name: '@taiccadash/qual', version: 'main'
  #root = undefined
  binfo = {}
  blockopt = {}

  Ctrl = (opt) ->
    @ <<< (obj = new judge-base opt)
    @evthdr = {}
    @info = {}
    @common-form = true

    @

  Ctrl.prototype = {} <<< judge-base.prototype <<< do
    on: (n, cb) -> @evthdr.[][n].push cb
    fire: (n, ...v) -> for cb in (@evthdr[n] or []) => cb.apply @, v
    ops-in: ({data,ops,source}) ->
      if source => return
      if !@_data-inited =>
        @data = JSON.parse(JSON.stringify(data))
        @data.{}prj
        @_data-inited = true
      if ops and ops.length =>
        ops = JSON.parse(JSON.stringify(ops))
        if @adapter.path.length => ops.map ~> it.p = it.p.slice(@adapter.path.length)
        sharedb.types.defaultType.apply @data, ops
      @fire \change, {data, ops, source}
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
            a = +(a.{}system.idx or 0) or a.key
            b = +(b.{}system.idx or 0) or b.key
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
        .then ~>
           @info =
             user: @user
             brd: @brdinfo
             prjs: @prjs
        .then ~> @prepare!
        .catch (e) ->
          if ldError.id(e) == 1012 or e.message == \forbidden => ldcvmgr.toggle \access-denied
          else error! e
    publish: (json) ->
      ld$.fetch "/dash/api/brd/#{@brdinfo.slug}/system/badge", {method: \POST}, {json}

    prepare: ->
      lc = {}
      blockopt.brd = @brdinfo.slug
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
                  console.log itf
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
