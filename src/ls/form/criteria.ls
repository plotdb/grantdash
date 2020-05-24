<- ldc.register \prjFormCriteria, [], _

schema = do
  types:
    "number": {name: "數值", ops: "number"}
    "string": {name: "文字", ops: "string"}
    "length": {name: "長度", ops: "count"}
    "regex": {name: "正規式", ops: "regex"}
    "count": {name: "選項數", ops: "count"}
    "file-size": {name: "檔案大小", ops: "smaller"}
    "file-format": {name: "檔案格式", ops: "extension"}
    "file-count": {name: "檔案數量", ops: "count"}
  ops:
    extension: do
      "ext": { name: '副檔名 <span class="text-sm">( 逗點分隔 )</span>' }
    regex: do
      "match": { name: "符合" }
      "not-match": { name: "不符" }
    count: do
      "gte": { name: '<div class="s mr-2">&#x2265;</div> 大於或等於' }
      "lte": { name: '<div class="s mr-2">&#x2264;</div> 小於或等於' }
      "eq": { name: '<div class="s mr-2">=</div> 等於' }
      "between": { name: '<div class="s mr-2">&#x223c;</div> 介於', field: 2 }
    string: do
      "include": { name: "包含" }
      "exclude": { name: "不包含" }
      "email": { name: "電子郵件位置" }
      "url": { name: "網址" }
    number: do
      "gte": { name: '<div class="s mr-2">&#x2265;</div> 大於或等於' }
      "lte": { name: '<div class="s mr-2">&#x2264;</div> 小於或等於' }
      "ge": { name: '<div class="s mr-2">&gt;</div> 大於' }
      "le": { name: '<div class="s mr-2">&lt;</div> 小於' }
      "eq": { name: '<div class="s mr-2">=</div> 等於' }
      "ne": { name: '<div class="s mr-2">&#x2260;</div> 不等於' }
      "between": { name: '<div class="s mr-2">&#x223c;</div> 介於', field: 2 }
    smaller: do
      "lte": { name: '<div class="s mr-2">&lt;</div> 小於' }
  support: 
    'form-short-answer': <[number string length regex]>
    'form-long-answer': <[string length regex]>
    'form-radio': []
    'form-checkbox': <[count]>
    'form-file': <[file-size file-format file-count]>
    'form-budget': <[count]>
    'form-checkpoint': <[count]>

return {schema}
