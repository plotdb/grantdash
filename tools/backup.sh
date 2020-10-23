#!/usr/bin/env bash
while [ 1 ]; do

  tag=$(date +%Y-%m-%d-%H)
  pg_dump grantdash > db-$tag-dump.sql
  gsutil cp db-$tag-dump.sql gs://dash-taicca-tw-backup/$tag/postgresql/
  sleep 100
  rm db-$tag-dump.sql
  sleep 86300

done
