#!/usr/bin/env bash

set -euo pipefail

wd sparql ./P212_unique_value_constraint_violations.rq > P212_unique_value_constraint_violations.json
cat P212_unique_value_constraint_violations.json | jq 'map({ key: .value, value: (.items | split(",")) }) | from_entries' > ids_by_isbn.json

cat P212_unique_value_constraint_violations.json | jq '.[] | (.items | split(","))[]' -cr | sort | uniq | wd revisions --props content,user,ids --limit max > ./all_revs.ndjson

cat all_revs.ndjson | ndjson-apply ./generate_report.js > report
