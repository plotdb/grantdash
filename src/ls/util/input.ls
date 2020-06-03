editable-input = (node) ->
  # only if we got additional nodes ...
  if node.childNodes.length > 1 =>
    # use seldom used zero width space as a placeholder
    ldCaret.setContent "\u200b" 
    v = node.innerText
    # now we know where caret was. remove it.
    idx = (v.indexOf("\u200b")) >? 0
    v = v.replace "\u200b", ""
    node.innerText = v
    n = node.childNodes.0
    if n => ldCaret.set {ns: n, ne: n, os: idx, oe: idx}
    node.focus!
  else v = node.innerText
  return v

