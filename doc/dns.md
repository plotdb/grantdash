## DNS 設定

當用戶希望使用自己的網域來設定 grantdash 時，我們便需要用戶更新他們的 DNS Zone File。設定的主要目的為

 * Domain 指向主機
 * 發信用 - SPF, DKIM ( optionally DMARC, MX 欄位 )

以下我們假設設定的基本前提為：
 * 用戶希望以 `sub.domain` 做為入口頁
 * 以使用 `mailgun` 做前提。
 * mailgun 所設定的 mail server domain 為 `mg.sub.domain`.
 * 在無子網域的情況下, `sub` 可省略.


## DNS 需要加的設定如下

 * Hosting
   - Type: `A`
   - Name: `sub`
   - Value: `<主機 IP>`

 * Send Mail - SPF ( 允許 mailgun.org 做為 `mg.sub.domain` 網域的發信來源 )
   - Type: `TXT`
   - Name: `mg.sub`
   - Value: `v=spf1 include:mailgun.org ~all`

 * Send Mail - DKIM ( 來自 mg.sub.domain 網域的信件應透過此公鑰驗證, 避免偽造 )
   - Type: `TXT`
   - Name: `pic._domainkey.mg.sub`
   - Value: `k=rsa; p=<完整的rsa public key>`
     - `Name` 與 `value` 的內容來自郵件服務提供商, 此處僅做為範例參考


## 選填的其它設定

僅有在確認我們可以正確設定透過 domain 收信的機制時, 才使用以下的設定：

 * DMARC
   - `v=DMARC1; p=none; rua=mailto:dmarc@dash.taicca.tw`

 * Mailing - 此項目需設定兩組, 包含不同的 value 值 ( 如下所述 )
   - Type: `MX`
   - Priority: `10`
   - Name: `mg.sub`
   - Value:
     - `mxa.mailgun.org`
     - `mxb.mailgun.org`


## 其它資訊

系統中預設的 email 發信者為 "orgname <noreply@sub.domain>", `orgname` 依組織名稱的設定而定。

