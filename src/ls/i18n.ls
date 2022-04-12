<-(->it!) _
if !(i18next?) => return

win = window
doc = document

cookie = (k,v,expire) ->
  if v => return document.cookie = "#k=#v;path=/" + (if expire => ";expires=#expire" else "")
  hash = {}
  (document.cookie or '')
    .split(\;)
    .map -> it.split(\=).map(->it.trim!)
    .map -> hash[decodeURIComponent(it.0)] = decodeURIComponent(it.1)
  return hash[k]


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
        if (v = n.getAttribute(tag)) and v != \t => return n.textContent = func v
        for i from 0 til n.childNodes.length => _ n.childNodes[i]
    wk = new WeakMap!
    Array.from(node.querySelectorAll "[#tag]").map (n) ~> _ n
    return node

  transform: (root) -> @_transform root, \t, (~> @i18n it)
  i18n: -> i18next.t(it)

i18next.init supportedLng: <[en zh-TW]>, fallbackLng: \en, fallbackNS: '', defaultNS: ''
  .then -> i18next.use i18nextBrowserLanguageDetector
  .then ->
    lng = cookie(\use-language) or navigator.language or navigator.userLanguage
    console.log "use language: ", lng
    i18next.changeLanguage lng
    for k,v of i18n-data.en => i18n-data{}["zh-TW"][k] = k
    for k,v of i18n-data => i18next.add-resource-bundle k, '', v, true, true
    engine.transform document.body

    view = new ldView do
      global: true
      root: document.body
      action: click: "set-lng": ({node}) ->
        lng = node.getAttribute \data-name
        cookie \use-language, lng
        window.location.reload!