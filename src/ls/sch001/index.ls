
view = new ldView do
  global: true
  root: document.body
  handler: do
    "grantdash-propose": ({node}) -> console.log node.getAttribute(\pd)
    "grantdash-login": ({node}) -> node.setAttribute \href, '/dash/auth/'
    "grantdash-project-list-link": ({node}) -> console.log node.getAttribute(\pd)
    "grantdash-project-list": ({node}) -> console.log node.getAttribute(\pd)
    "grantdash-project-list-item": do
      list: -> [{title: "hello", description: "description"}]
      init: ({node, data, local}) ->
        local.view = new ldView do
          context: data
          root: node
          handler: do
            title: ({node, context}) -> node.innerText = context.title
            description: ({node, context}) -> node.innerText = context.description
            thumb: ({node, context}) -> node.style.backgroundImage = "url(#{context.thumb})"
      handler: ({local, data}) ->
        local.view.setContext data
        local.view.render!
console.log \ok
