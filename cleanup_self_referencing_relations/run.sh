#!/usr/bin/env bash

# Do not exit on non-zero code to recover from requests timeouts
set -u

remove_self_referencing_claims(){
  pid=$1
  label=$2
  echo "Processing $pid ($label)"
  wd sparql self_referencing_relations.mjs selfReferencingRelations $pid | wd remove-claim --batch --summary "remove self-referencing $pid claim"
}

remove_self_referencing_work_claims(){
  pid=$1
  label=$2
  echo "Processing $pid ($label)"
  wd sparql self_referencing_relations.mjs selfReferencingWorkRelations $pid | wd remove-claim --batch --summary "remove self-referencing $pid claim"
}

log_filename=$(date --iso-8601=seconds | awk -F '+' '{print $1}' | sed 's/:/-/g')
log_path=$PWD/logs/$log_filename
echo "logs: $log_path"

{
  date --iso-8601=seconds
  # remove_self_referencing_claims P31  "instance of" # Timeout
  remove_self_referencing_claims P123 "publisher"
  remove_self_referencing_claims P127 "owned by"
  remove_self_referencing_claims P135 "movement"
  remove_self_referencing_claims P136 "genre"
  remove_self_referencing_claims P144 "based on"
  remove_self_referencing_claims P179 "part of serie"
  remove_self_referencing_claims P195 "collection"
  # remove_self_referencing_claims P279  "subclass of" # Timeout
  # remove_self_referencing_claims P361 "part of" # Timeout
  remove_self_referencing_claims P437 "distribution format"
  remove_self_referencing_claims P463 "member of"
  remove_self_referencing_claims P629 "edition of"
  remove_self_referencing_claims P737 "influenced by"
  remove_self_referencing_claims P747 "has edition"
  remove_self_referencing_claims P941 "inspired by"
  # remove_self_referencing_claims P1433 "published in" # Timeout
  remove_self_referencing_claims P2675 "reply to"
  remove_self_referencing_claims P7937 "form of creative work"

  # remove_self_referencing_work_claims P31 "instance of" # Slow and empty
  remove_self_referencing_work_claims P921 "subject"
  # remove_self_referencing_work_claims P279 "subclass of" # Slow and empty
  remove_self_referencing_work_claims P361 "part of" # Slow and empty
} >> "$log_path" 2>&1
