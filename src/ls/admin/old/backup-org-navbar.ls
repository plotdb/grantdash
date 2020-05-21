(->
  ldc.register \brd-navbar, <[]>, ->
    return
    /*ld$.find \.host .map ->
      sortable = new Sortable it, do
        group: 'name'
        sort: true
        onUpdate: -> console.log it
    */
    adopter = new Adopter path: <[page navbar]>
    data = [
      {html: "", text: "活動辦法", href: '...'}
      {html: "", text: "歷屆活動", href: '...', menu: [
        {html: "", text: "2018 春季", href: '...'}
        {html: "", text: "2018 秋季", href: '...'}
      ]}
    ]
    /*
    host = ld$.find '.host', 0
    div = document.createElement \div
    div.innerHTML = """
    <div class="item d-flex align-items-center">
      <i class="i-bars mr-4"></i>
      <div class="name flex-grow-1"> 嗨你好 </div>
    </div>
    """
    */

    build = (r) ->
      div = document.createElement \div
      div.classList.add \host
      sortable = new Sortable div, { group: 'name', sort: true }

      r.map (it) -> 
        d = document.createElement \div
        if it.menu =>
          w = document.createElement \div
          w.classList.add \wrap
          w.appendChild d
          n = build it.menu
          w.appendChild n
        d.innerHTML = """
        <div class="item d-flex align-items-center">
          <i class="i-bars mr-4"></i>
          <div class="name flex-grow-1"> #{it.text} </div>
        </div>
        """
        div.appendChild(w or d)
      return div
    root = ld$.find \.root, 0
    ret = build data
    root.innerHTML = ""
    root.appendChild ret

    adopter.on \change, ->
    return adopter
  ldc.app \brd-navbar

)!
