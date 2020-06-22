require! <[suuid sharedb sharedb-postgres ../engine/io/postgresql sharedb-pg-mdb]>
secret = require '../secret'
console.log "new sharedb instance..."
io = new postgresql secret

context1 = """銀期開內和打部大金這錢樂再三方夜理特取已飛我一之什信著那雜心這工元節灣面生給洲他際皮一經有中樹預說福叫千卻程從方線低系海國心立簡力調我有將日爭片綠力們康草兒要臺面個式比火論油我坡交然天住子最一天影不看提人要你子陸種上式遊任吃金任紅那再義對然給臺病選的是在知習本了音就平臺部相房別學血西包已位善小會校頭對領孩好成們輪來是密風痛選劇了的子加性時"""
context2 = """
定是員人要製生，最有筆那轉上聞年源不之去子沒整日然有父深美，年病電構除數世保腦小不裝酒之感通西清有也就的一中財研之起離小重著進教心愛，特愛熱上後係民時於動的魚本心羅步天坡創變人兒男首爸配使濟！

和手每校終絕是越。就有爭術於手分居！成調史資當，處中他後格亞並一一記也用，驗太以就總？地利計帶一關月可息治地觀熱親想少區節前現直根生點時指。德靜地孩熱的過的們不來不花光那的果入正古種樂，少表府媽且。們國兒人保……國記念不電法子認人，為我住，我靈業：響是立照找度帶上有有命得。卻不保質主，先件在，是日老用有愛人告斷孩自。一還產為有此己；不香懷孩……快果工嚴福主當情學期這，子的使只媽少家產愛世期回狀解不東醫日；少為文小山那不我賣如神越，由念機舉民？
"""

slug = \3mw68m05ab05jv099502u5GQa
brd = \test-brd
grp = \4jUmMh07zZ05kl0Col03v-Bhu

ps = [0 to 500].map (idx) ->
  Promise.resolve!
    .then ->
      i = Math.round(Math.random! * (context1.length) - 16)
      name = context1.substring(i, i + Math.round(Math.random! * 12) + 4)
      i = Math.round(Math.random! * (context1.length) - 30)
      description = context2.substring(i, i + Math.round(Math.random! * 15) + 15)
      i = Math.round(Math.random! * (context1.length) - 10)
      team = context1.substring(i, i + Math.round(Math.random! * 8) + 2)
      i = Math.round(Math.random! * (context1.length) - 7)
      category = context1.substring(i, i + Math.round(Math.random! * 3) + 4)
      tag = [0 to Math.round((Math.random! * 3) + 1)].map -> 
        i = Math.round(Math.random! * (context1.length) - 2)
        context1.substring(i, i + Math.round(Math.random! * 2) + 2)
      tag = JSON.stringify(tag)
      budget = do
        subsidy: (Math.round(Math.random! * 1500) + 5) * 10000
        self: (Math.round(Math.random! * 1500) + 5) * 10000
      detail = info: do
        title: name
        description: description
        budget: budget
        teamname: team
        category: category
        tag: tag
      io.query """
      insert into prj (owner,slug,brd,grp,name,description,category,tag,detail) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      """, [1, suuid!, brd, grp, name, description, category, tag, detail]
    .then -> console.log "#idx done. "

Promise.all ps
  .then -> console.log \ok.
