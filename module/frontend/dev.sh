#!/usr/bin/env bash

modules="@taiccadash/base @taiccadash/future-content @taiccadash/vr @makeform/base @makeform/input @makeform/textarea @makeform/choice @makeform/radio @makeform/table @makeform/upload @makeform/countdown"
base=~/workspace/zbryikt/grantdash/sites/block/static/block/

param= 
for module in $modules
do
  param="${param};$module:${base}$module/main"
done
param=${param:1}

npx fedep -l $param -s false