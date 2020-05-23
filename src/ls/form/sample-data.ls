sample-blocks = [
  {
    key: 1
    name: "form-short-answer", title: "提問的標題1", desc: "提問的描述"
    config: {required: true}, criteria: [{type: \number, op: \between, input1: 10, input2: 20, invalid: '應介於 10 ~ 20 之間'}]
  }
  {
    key: 2
    name: "form-long-answer", title: "提問的標題2", desc: "提問的描述"
    config: {required: true}, criteria: [{type: \length, op: \gte, input1: 10, invalid: '字數不足 ( 10 個字以上 )'}]
  }
  {
    key: 3
    name: "form-checkpoint", title: "提問的標題3", desc: "提問的描述"
    data: [{title: "第一個點", desc: "第一個點的描述"}]
    config: {required: true}, criteria: [{type: \count, op: \between, input1: 1, input2: 2, invalid: "介於 1 ~ 2 個項目"}]
  }
  {
    key: 4
    name: "form-radio", title: "提問的標題3", desc: "提問的描述"
    data: [{title: "第一個點", desc: "第一個點的描述", key: 1}]
    config: {required: true}, criteria: []
  }
  {
    key: 5
    name: "form-checkbox", title: "提問的標題3", desc: "提問的描述"
    data: [{title: "第一個點", desc: "第一個點的描述", key: 1}]
    config: {required: true}, criteria: [{type: \count, op: \eq, input1: 1}]
  }
]
