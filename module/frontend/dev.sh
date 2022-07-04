#!/usr/bin/env bash

modules="@taiccadash/icg-110 @taiccadash/fcm-111 @makeform/checklist @makeform/datetime @makeform/section @grantdash/qualification @taiccadash/qual @grantdash/prj.base @taiccadash/base @taiccadash/future-content @taiccadash/icg-111 @taiccadash/future-content-111 @makeform/base @makeform/input @makeform/textarea @makeform/choice @makeform/radio @makeform/table @makeform/upload @makeform/countdown @makeform/checkbox @makeform/date @makeform/bilingual @makeform/agreement @makeform/common"
if [ -d ~/workspace/zbryikt/grantdash/sites/block/static/block/ ]; then
  base=~/workspace/zbryikt/grantdash/sites/block/static/block/
else
  base=~/workspace/grantdash/sites/block/static/block/
fi

param= 
for module in $modules
do
  param="${param};$module:${base}$module/main"
done
param=${param:1}

npx fedep -l $param -s false
