# DNS 設定

 * 使用 A Record 指向主機 DNS
 * 使用 CNAME Record 指向 grantdash.io
 * Mail 相關設定 ( MX Server, SPF, DKIM, DMARC 設定 )
   - MX 設定指向 mailgun.org ( TBD )
   - DKIM: `smtp._domainkey.mg` : 加上 key ( mailgun 提供的Key ) ( TBD )
   - DMARC: `_dmarc.mg`, ....? ( TBD )
   - SPF: v=spf1 include:mailgun.org ~all ( TBD )

