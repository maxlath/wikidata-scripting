#!/usr/bin/env bash
set -eu

cd /home/maxlath/code/wikidata-scripting/isbns-format

{
  date --iso-8601=seconds

  echo "Get all_isbns_13.ndjson"
  wd sparql all_isbns_13.rq | jq '.[]' -cr > all_isbns_13.ndjson
  echo "Get all_isbns_10.ndjson"
  wd sparql all_isbns_10.rq | jq '.[]' -cr > all_isbns_10.ndjson

  echo "Build move_claim_batch.moveFromIsbn13ToIsbn10.ndjson"
  cat all_isbns_13.ndjson | ndjson-apply ./fix_isbn.js moveFromIsbn13ToIsbn10 > move_claim_batch.moveFromIsbn13ToIsbn10.ndjson
  echo "Build move_claim_batch.moveFromIsbn10ToIsbn13.ndjson"
  cat all_isbns_10.ndjson | ndjson-apply ./fix_isbn.js moveFromIsbn10ToIsbn13 > move_claim_batch.moveFromIsbn10ToIsbn13.ndjson
  echo "Build update_claim_batch.fixIsbn13.ndjson"
  cat all_isbns_13.ndjson | ndjson-apply ./fix_isbn.js fixIsbn13 > update_claim_batch.fixIsbn13.ndjson
  echo "Build update_claim_batch.fixIsbn10.ndjson"
  cat all_isbns_10.ndjson | ndjson-apply ./fix_isbn.js fixIsbn10 > update_claim_batch.fixIsbn10.ndjson

  echo "Send move_claim_batch.moveFromIsbn13ToIsbn10.ndjson batch edits"
  cat move_claim_batch.moveFromIsbn13ToIsbn10.ndjson | wd mc -b --no-exit-on-error --summary 'move ISBN-10 from P212 to P957'
  echo "Send move_claim_batch.moveFromIsbn10ToIsbn13.ndjson batch edits"
  cat move_claim_batch.moveFromIsbn10ToIsbn13.ndjson | wd mc -b --no-exit-on-error --summary 'move ISBN-13 from P957 to P212'
  echo "Send update_claim_batch.fixIsbn13.ndjson batch edits"
  cat update_claim_batch.fixIsbn13.ndjson | wd uc -b --no-exit-on-error --summary 'fix ISBN-13 format'
  echo "Send update_claim_batch.fixIsbn10.ndjson batch edits"
  cat update_claim_batch.fixIsbn10.ndjson | wd uc -b --no-exit-on-error --summary 'fix ISBN-10 format'
} >> "./logs/$(date -I)" 2>&1
