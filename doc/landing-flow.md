grantdash.io -> 品牌主頁, 引導建立 brd
  - brd 建立頁 - 可將登入推遲至此 - 主控台 ( 未含組織 )
custom.domain -> 用戶主頁 
  - 未有組織 -> 引導建立組織 ( no nginx.conf ) ( 需登入 )
  - 已有組織 -> 對應頁面     ( nginx.conf ) 
             -> 未有頁面 : under construction. ( index page 404 ) -> 引導建立頁面
  ! 也就是要有網址 mapping 機制, 除非我們建獨立 website.
  - 可能方案:
    - 可以設定所有非 grantdash 網址都必須走 express 
    v 或者直接在 nginx 建立新設定 ( 樣板設定 ), 協助做 routing
      - 感覺更可行. 動態切換 nginx status?

主控台
 - 可以從下列路徑進入:
   - /o/<slug>/admin - 使用特定組織. 顯示 org 設定頁籤
   - /b/<slug>/admin - 使用特定活動. 顯示 brd 設定頁籤. 若有組織, 自動帶入其名. 否則預選 <無組織>
   - /admin          - 視情況 :
    - 若用戶僅有一組織 - 若有活動, 顯示最新活動頁籤, 否則顯示組織頁籤
    - 若用戶有多個組織 - 跳出選擇頁.
