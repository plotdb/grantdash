<-(->it!) _
if !(i18next?) => return

win = window
doc = document

window.i18n-engine = engine =
  _transform: (node, tag, func) ->
    regex = new RegExp("^#{tag}-(.+)$")
    _ = (n) ~>
      if n.nodeType == win.Element.TEXT_NODE =>
        n.parentNode.setAttribute tag, n.textContent
        n.parentNode.replaceChild doc.createTextNode(func(n.textContent)), n
      else
        for i from 0 til n.attributes.length =>
          {name,value} = n.attributes[i]
          if !(ret = regex.exec(name)) => continue
          n.setAttribute ret.1, func(value or '')
        if (v = n.getAttribute(tag)) => return n.textContent = func v
        for i from 0 til n.childNodes.length => _ n.childNodes[i]
    wk = new WeakMap!
    #Array.from(node.querySelectorAll ":scope [scope] [#tag]").map (n) -> wk.set n, 1
    Array.from(node.querySelectorAll "[#tag]")
    #  .filter (n) -> !(wk.get n)
      .map (n) ~> _ n
    return node

  transform: (n) ->
    if !(n in <[i18n path]>) => return
    @_transform document.body, \t, (~> @i18n it)
  i18n: -> i18next.t(it)

i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \en, fallbackNS: '', defaultNS: ''
  .then -> i18next.use i18nextBrowserLanguageDetector
  .then ->
    lng = navigator.language or navigator.userLanguage
    console.log "use language: ", lng
    i18next.changeLanguage lng
    for k,v of i18n-data.en => i18n-data{}["zh-TW"][k] = k
    for k,v of i18n-data => i18next.add-resource-bundle k, '', v, true, true
    engine.transform \i18n
