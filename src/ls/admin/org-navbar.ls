(->
  ldc.register \brd-navbar, <[]>, ->
    ld$.find \.host .map ->
      sortable = new Sortable it, do
        group: 'name'
        sort: true
        onUpdate: -> console.log it
    adopter = new Adopter path: <[page navbar]>
    data = [
      {html: "", text: "活動辦法", href: '...'}
      {html: "", text: "歷屆活動", href: '...', menu: [
        {html: "", text: "2018 春季", href: '...'}
        {html: "", text: "2018 秋季", href: '...'}
      ]}
    ]
    host = ld$.find '.host', 0
    div = document.createElement \div
    div.innerHTML = """
    <div class="item d-flex align-items-center">
      <i class="i-bars mr-4"></i>
      <div class="name flex-grow-1"> 嗨你好 </div>
    </div>
    """
    host.insertBefore div, host.childNodes.0
    adopter.on \change, ->
    return adopter
  ldc.app \brd-navbar

)!
