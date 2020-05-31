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
     ? /dash/org/<slug>/admin/     : 組織後台
     - /dash/org/<slug>/v/<page>/  : 組織公開頁面
     - /dash/org/<slug>/b/create   : 建立活動
     - /dash/org/<slug>/list       : 活動列表
   - 活動
     ? /dash/brd/<slug>/admin/     : 活動後台
     - /dash/brd/<slug>/v/<page>   : 活動公開頁面
     ? /dash/brd/<slug>/p/create   : 建立活動 ( 選擇分組? )
     - /dash/brd/<slug>/list       : 提案列表
   - 提案
     - /dash/prj/<slug>/             : 提案頁面 ( 瀏覽 )
     - /dash/prj/<slug>/edit         : 提案頁面 ( 編輯 )
   - 評選
     ? /dash/brd/<slug>/judge/
   - 用戶 - 參照 servlet


## Site Files and Upload Files

用戶網站資料放在 `/users/` 資料夾中, 分以下結構
 - /users/o/<oid>
   - /static/ - 網站資料
 - /users/b/<bid>
 - /users/p/<pid>

用戶資料可能會跟主站資料打架. 考慮到這點, 我們必須至少保留一個路徑 `/gd/` 用以取得主站內容. `/gd/` 下的靜態內容直接對應到主站的根目錄中.

同時, 其它動態生成的頁面 ( 由 express 提供的內容 ) 則維持在原本的位置, 使用者必須避開這些資料夾:

 - /gd/ - 對應到主站的 /
 - /b/  - brd 頁面. 對應到 /users/b/<bid>
 - /d/
 - /o/
 - /p/
 - /me/
 - /auth/


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

