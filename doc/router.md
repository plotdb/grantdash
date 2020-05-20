# URL schema

 - 網域
   - 網域與 org 是一對一對應的. 可以完全客製, 或是使用 subdomain.
   - 可用的網域包括:
     - grantdash.io: 主站
     - <sub>.grantdash.io     - 特定 org 
     - userdomain             - 特定 org
   - 在特定 org 下時, 無論網址, 只能存取特定 org 中的資訊.
 - 路徑
   - 組織
     ? /o/<slug>/admin/     : 組織後台
     - /o/<slug>/v/<page>/  : 組織公開頁面
     - /o/<slug>/b/create   : 建立活動
     - /o/<slug>/list       : 活動列表
   - 活動
     ? /b/<slug>/admin/     : 活動後台
     - /b/<slug>/v/<page>   : 活動公開頁面
     ? /b/<slug>/p/create   : 建立活動 ( 選擇分組? )
     - /b/<slug>/list       : 提案列表
   - 提案
     - /p/<id>/             : 提案頁面
   - 評選
     ? /b/<slug>/j/
   - 用戶 - 參照 servlet

## Asset files

用戶上傳檔案放在 `/assets/uploads/` 資料夾中. 分以下結構:

 - /o/<slug>/   - 組織檔案
 - /o/<slug>/u/ - 用戶頭像
 - /b/<slug>/   - 活動檔案
 - /p/<id>/     - 提案檔案


# Draft Note

網址規格
 - 若在 subdomain 下, 則只能存取特定 subdomain 中的 id
   - bd 或 n.bd ( n 為組織簡稱 )
 - 組織: bd/o/<name> 或 n.bd
   - 後台: n.bd/admin
   - 頁面: bd/o/<name>/v/<page> 或 n.bd/v/<page>
 - 活動: bd/b/<id> 或 n.bd/b/<id>
   - 若在 subdomain 下, 則只能存取特定 subdomain 中的 id
   - 後台: bd/b/<id>/admin
   - 頁面: bd/b/<id>/v/<page>
   - 建立活動: bd/o/<name>/b/create
 - 提案
   - 列表: bd/b/<id>/list/<page> 或 n.bd/b/<id>/list/<page>
   - CRUD
     - C: bd/b/<id>/p/create
     - R: bd/p/<id>
     - U: bd/p/<id>/edit
 - 評選
   - 個人評選表 - bd/b/<id>/judge/<uid>
   - 決選表 -  bd/b/<id>/judge/all
   - 評選入口 - bd/b/<id>/judge/
   - 資格審核 - bd/b/<id>/review/
 - 會員
   - 個人資訊儀表板 - bd/me/
   - 個人設定 - bd/me/settings/
   - 會員資訊 - bd/user/<id>
 - 客製網址規格
   - bd
   - n.bd
   - <custom-domain>
   - <custom-domain>/path ( 會需要設定用戶的 webserver, 因此目前不考慮支援 )

