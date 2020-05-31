# URL schema

 - 網域
   - org 可設定多個網域. 可以完全客製, 或是使用 subdomain.
     - 每個網域只能對應到一個 org 或 brd. 這應該在 org 中設定.
   - 可用的網域包括:
     - grantdash.io: 主站
     - <sub>.grantdash.io     - 特定 org 
     - userdomain             - 特定 org
   - 在特定 org 下時, 無論網址, 只能存取特定 org 中的資訊.
 - 路徑
   - dash scoping - 集中主站網址, 避免與客製頁面衝突.
     - 在 獨立網域下, 應使用 /dash/ prefix. ( 也因此所有的 js, css, ajax 都以 /dash/ 做 prefix
     - 但在 grantdash 網域下, 可省略 /dash/ 做 view 的存取. 
   - 以下網域省略 /dash/ 不寫, 但應依 dash scoping 規則處理
     - 其中公開頁面列表不需 prefix, 因為他們原本就是要供靜態頁面存取
   - 組織
     ? /org/<slug>/admin/     : 組織後台
     - /org/<slug>/           : 組織公開頁面
     - /org/<slug>/brd/create : 建立活動
     - /org/<slug>/brd/list   : 活動列表
   - 活動
     ? /brd/<slug>/admin/     : 活動後台
     - /brd/<slug>/           : 活動公開頁面
     ? /brd/<slug>/prj/create : 建立活動 ( 選擇分組? )
     - /brd/<slug>/prj/list   : 提案列表
   - 提案
     - /prj/<slug>/           : 提案頁面 ( 瀏覽 )
     - /prj/<slug>/edit       : 提案頁面 ( 編輯 )
   - 評選
     ? /brd/<slug>/judge/
   - 用戶 - 參照 servlet


## Site Files and Upload Files

用戶網站資料放在 `/users/` 資料夾中, 分以下結構
 - /org/<slug>     - 組織的專屬資料夾
   - /static/      - 網站資料.
   - 活動與提案    - 亦放在 org 下, 以避免跨組織存取造成誤會
     - /brd/<slug>
     - /prj/<slug>
 - /brd/<slug>     - 活動的專屬資料夾
   - /static/      - 網站資料
   - /upload       - 活動的上傳資料
 - /prj/<slug>     - 提案的專屬資料夾
   - /file/draft/  - 編輯中的上傳檔案
   - /file/<v>/    - 某個版本的上傳檔案
   - /file/release - 最新已發布的上傳檔案. ( 可以由 <v> 僅做個 symlink, 或完整拷貝過來 )
 - 網站資料:
   - 可透過對應的路徑對應至其為根目錄存取, 如:
     - <domain>/org/<slug> 對應到 /users/org/<slug/static/
   - 網站根目錄預設對應到 org 的 static, 但應可讓用戶於 org 中設定, 對應到不同活動. org 亦應可設定多重 domain.


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

