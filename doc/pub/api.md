# Grant Dash 網址規則

要透過客製網址使用 Grant Dash, 您可以將您的網址透過 DNS 設定 CNAME 指向 grantdash.io 的方式來達成。設定完成並建立好入口頁面以後，您便可透過您的網址連上您的入口頁面。

由於不同的網站所使用的前端技術不盡相同，因此欲整合 Grant Dash 與您網頁的方式即是透過網址:

 * 使用者首先到達您的入口頁，透過入口頁取得資訊
 * 使用者在您的入口頁面點擊連結，進而連到 Grant Dash 的相關功能頁
 * 使用者可再透過回到首頁功能回到您的入口頁。


## Grant Dash 功能頁面網址列表

以下均以 custom.domain 做為自訂網址的範例

 * `/brd/<id>`          - 特定活動的入口頁. 例如: https://custom.domain/brd/my-event-1
 * `/dash/auth/`        - 登入系統的表單介面。若需要引導用戶登入網站，可將用戶重導向至此.
   - 若您需要用戶登入完成後連回特定頁面，可使用 nexturl 參數，如：
     https://custom.domain/dash/auth/?nexturl=/brd/my-event-1
 * `/brd/<id>/list`     - 特定活動的提案列表. 您可帶以下參數做提案篩選:
   - `keyword`      - 名稱
   - `tag`          - 關鍵字. 僅在提案表有設定此欄位時有效.
   - `category`     - 類別. 僅在提案表有設定此欄位時有效.
 * `/prj/<id>`          - 瀏覽特定提案. 例如: https://custom.domain/prj/alhuiERSGH8fwe-kw
 * `/prj/<id>/edit`     - 編輯特定提案. 例如: https://custom.domain/prj/alhuiERSGH8fwe-kw/edit
 * `/dash/admin`        - 主控台.


## 用戶認證

您可透過 `/dash/api/global` 取得用戶與網站基本資訊。該網址回傳一個 json 物件，基本格式如下:

    {
      "global": true,
      "production": true,
      "csrfToken": " ... ",
      "ip": "....",
      "user": { ...  }
    }

其中, 若用戶已經登入, `user` 欄位中會包含數個欄位，包括:

 * key - 用戶流水編號
 * displayname - 用戶顯示名稱
 * verified - boolean 值, 表示電子郵件信箱是否認證
 * username - 用戶帳號名, 一般為 email.

您可透過下列網址取得用戶的自設頭像:

    /dash/s/avatar/<user-key>.png

