#!/usr/bin/env bash
set -eu

cd /home/maxlath/code/wikidata-scripting/fix_written_works_with_form_of_work

filepath="./logs/$(date +%Y-%m-%dT%H_%M_%S)"

# This fixes were made necessary by the [{{Autofix}} on P31](https://www.wikidata.org/w/index.php?title=Property_talk:P31&action=edit)

{
  date --iso-8601=seconds
  echo "Get all litterary form works without P31"
  wd sparql litterary_form_or_genre_works_without_P31.rq > litterary_form_or_genre_works_without_P31.ids
  cat litterary_form_or_genre_works_without_P31.ids | awk '{print "{\"id\":\"" $1 "\",\"property\":\"P31\",\"value\":\"Q7725634\"}" }' > litterary_form_or_genre_works_without_P31.ops
  cat litterary_form_or_genre_works_without_P31.ops | wd add-claim --batch --reconciliation skip-on-any-value --summary 'infer P31=Q7725634 from P136 or P7937' --no-exit-on-error

  echo "Get all litterary form editions without P31"
  wd sparql litterary_form_or_genre_editions_without_P31.rq > litterary_form_or_genre_editions_without_P31.ids
  cat litterary_form_or_genre_editions_without_P31.ids | awk '{print "{\"id\":\"" $1 "\",\"property\":\"P31\",\"value\":\"Q3331189\"}" }' > litterary_form_or_genre_editions_without_P31.ops
  cat litterary_form_or_genre_editions_without_P31.ops | wd add-claim --batch --reconciliation skip-on-any-value --summary 'infer P31=Q3331189 from P136 or P7937' --no-exit-on-error
} > "$filepath" 2>&1
