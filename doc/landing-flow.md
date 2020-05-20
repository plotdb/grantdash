grantdash.io -> 品牌主頁, 引導建立 brd
  - brd 建立頁 - 可將登入推遲至此 - 主控台 ( 未含組織 )
custom.domain -> 用戶主頁 
  - 未有組織 -> 引導建立組織 ( no nginx.conf ) ( 需登入 )
  - 已有組織 -> 對應頁面     ( nginx.conf ) 
             -> 未有頁面 : under construction. ( index page 404 ) -> 引導建立頁面
  ! 也就是要有網址 mapping 機制, 除非我們建獨立 website.
  - 可能方案:
    - 可以設定所有非 grantdash 網址都必須走 express 
    - 或者直接在 nginx 建立新設定 ( 樣板設定 ), 協助做 routing
      - 感覺更可行. 動態切換 nginx status?
