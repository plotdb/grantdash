# 評選資料

評選的即時資料儲存於 `brd/<brd-slug>/grp/<grp-slug>/judge/<judge-type>` 之中，所有人的一同儲存，但在結構上做區分，等於不會有共編的情況。

其中, `judge-type` 可能的值包括:

 * criteria - 資格審查
 * primary - 初選
 * final - 決選


所有表格的基本格式均為:

```
    {user: { "<user-key": { prj: { "prj-slug": { ... } }}}}
```



## 資格審查

資格審查的資料格式如下：


```
    {user: { "<user-key": { prj: { "prj-slug": { ... 
      value: {
        "<criteria-name>": "<0, 1, or 2, corresponding to accept, pending and reject>"
        ...
      }, 
      comment: " ..( comment string ).. "
    }}}}}
```
