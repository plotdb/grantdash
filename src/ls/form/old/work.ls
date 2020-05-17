(->
  window
    ..ot-json0 = require("ot-json0")
    ..json0-ot-diff = require("json0-ot-diff")
    ..diff-match-patch = require("diff-match-patch")


  data = do
    type: \block
    name: \form-root
    data: do
      blocks: [

        {
          type: \block
          name: \form-radio
          data: do
            title: {type: "text", value: "你需要多少錢?"}
            description: {type: "text", value: "請寫出你到底需要多少錢"}
            option: [
              { type: \block, name: "int:option", data: name: {type: "text", value: "選項1"} }
              { type: \block, name: "int:option", data: name: {type: "text", value: "選項2"} }
              { type: \block, name: "int:option", data: name: {type: "text", value: "選項3"} }
            ]
        }

        {
          type: \block
          name: \form-short-answer
          config: do
            required: true
            show-description: true
            validation: [{ type: 'obj', value: { type: 'number', condition: 'between', value: '30', value2: '50' }}]
          data: do
            title: {type: "text", value: "你需要多少錢?"}
            description: {type: "text", value: "請寫出你到底需要多少錢"}
        }

        {
          type: \block
          name: \form-short-answer
          config: 
            required: true
            show-description: true
            validation: [{ type: 'obj', value: { type: 'number', condition: 'between', value: '30', value2: '50' }}]
          data: do
            title: {type: "text", value: "你需要多少時間?"}
            description: {type: "text", value: "請寫出你到底需要多少時間"}
        }
      ]
  root = ld$.find \#root, 0
  bmgr = do
    get: (name) ->
      sample = ld$.find("[data-name=#name]",0)
      Promise.resolve(sample.outerHTML)
 
  #data = ot-json0.type.apply data, ops.0
  #console.log data
  reb = new reblock root: root, root-block: data, block-manager: bmgr
  reb.ready!then ->
    reb.inject {host: ld$.find('[rbid] [editable="blocks"]',0), name: "form-short-answer"}
    #reb.inject {host: ld$.find('[rbid] [editable="blocks"]',0), name: "form-radio"}
  #reb.apply ops

)!
