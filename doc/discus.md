# Discus Subsystem

基本設計

 * 依 slug ( 網址 ) 做區分.
 * 附屬在 org / brd / prj 之下.
 * 可選分類. 分類定義在 brd 或 org 中? 
 
留言物件規格

discus
 * key
 * slug - suuid   ( unique )
 * url  - any url ( unique )
 * unique(slug, url)

comment

 * key
 * discus
 * reply
 * distance - 樹狀分歧式留言串中, 回朔根留言的最短距離.
 * content
 * history - 編輯紀錄

前端元件

以物件型態提供使用. 預設值依當前網址來決定. 分成:

 * viewer - 瀏覽留言
   - 瀏覽情境下, 亦可編輯留言. 
   - 編輯留言時, 透過 editor 來協助. 因此, viewer 需代入 editor 物件.
 * editor - 編輯、建立留言.


API ( /dash/api prefixed )

 * GET   /discuss/      - 取得特定留言串
   - 依據傳入參數, 取得留言、留言串或留言串列表.
     - key: 留言
     - slug or url: 留言串
     - category ( TBD ): 留言串列表
 * POST  /discuss/      - 發表新留言

 * PUT   /discuss/      - 編輯特定留言

使用情境

用戶透過前端元件依需求取得資料:

 * 經由 url 取得留言  ( 特定網址留言, 不需查詢 slug )
   - 後端可透過分析 url 取得所屬分組
 * 經由 slug 取得留言 ( 留言串的唯一代碼, 隨機產生 )



