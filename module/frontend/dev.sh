#!/usr/bin/env bash

modules="@grantdash/prj.base @taiccadash/future-content @taiccadash/icg-111 @taiccadash/future-content-111 @makeform/base @makeform/input @makeform/textarea @makeform/choice @makeform/radio @makeform/table @makeform/upload @makeform/countdown @makeform/checkbox @makeform/date @makeform/bilingual @makeform/agreement @makeform/common"
base=~/workspace/zbryikt/grantdash/sites/block/static/block/

param= 
for module in $modules
do
  param="${param};$module:${base}$module/main"
done
param=${param:1}

npx fedep -l $param -s false

