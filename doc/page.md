# page spec

 * 管理員必須有方式將頁面存入系統, 並在適當時機提供給訪客.
 * 存入的頁面亦應有某些方式可管理. ( 如, 版本控管? )
   - 單純存在某目錄下. 不做 sanitize?
   - 版本控管短期內大概做不到, 但可以設計先行, 再向未來相容
 * 可上傳? 可編輯? 提供 ftp? github? zip 打包上傳?
   - 提供 ftp

路徑管理:

 - <domain>/v/<page>  -> <relpath>/<page>
 - <domain>/          -> <relpath>/index.html



## 用戶檔案管理

組織頁面應儲存於 <gd-prj>/users/<org-id>/static/ 下。讓我們稱其為 <relpath> 。

 - 一般用戶
   - 檔案存取透過此網址: /assets/u/<oid> 
     - 利用 grantdash nginx 設定 /assets/u/<oid> 到 <relpath>/
     - 此狀況下, link / script 都得 prefix `/assets/u/<oid>`
 - Custom Domain 用戶
   - 獨立的專用 nginx 設定, 以減低 express 負擔.
     - 同時設定 nginx 讓 /assets/u/<oid> 與 / 都指向 <relpath>/
       ? /assets/u/<old>  供 css, js 使用.
       ? / 供 html 使用.
     o /assets/, /js/ 與 /css/ 仍設定至 grantdash static 下, 以使用 grandash 的檔案.


## 頁面
