# Create missing HTTP Status Codes items on Wikidata

> :warning: best practices have evolved since this project was initially written, especially, it would now be recommended to use the [batch mode](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode) instead of many individual `wd` commands. See [this example](https://github.com/maxlath/wikidata-scripting/tree/master/convert_claim_from_string_to_monolingualtext) for a more up-to-date workflow

## Dependency
Uses [wikibase-cli](https://github.com/maxlath/wikibase-cli) `>= v8`

## How-to
Uses the [`wb create-entity` templating feature](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wd-create-entity) to create several items from the `./http_status_code.js` template
```sh
# Assumes that your configration already set instance=https://www.wikidata.org
wb create-entity ./http_status_code.js 100 'Continue' '6.2.1'
```

See `./run.sh` for full list of commands

## Results
Running `./run` created the following items:
* [HTTP 505 (Q64728505)](https://wikidata.org/wiki/Q64728505)
* [HTTP 504 (Q64728503)](https://wikidata.org/wiki/Q64728503)
* [HTTP 502 (Q64728501)](https://wikidata.org/wiki/Q64728501)
* [HTTP 501 (Q64728500)](https://wikidata.org/wiki/Q64728500)
* [HTTP 500 (Q64728498)](https://wikidata.org/wiki/Q64728498)
* [HTTP 426 (Q64728497)](https://wikidata.org/wiki/Q64728497)
* [HTTP 417 (Q64728496)](https://wikidata.org/wiki/Q64728496)
* [HTTP 415 (Q64728494)](https://wikidata.org/wiki/Q64728494)
* [HTTP 414 (Q64728493)](https://wikidata.org/wiki/Q64728493)
* [HTTP 413 (Q64728492)](https://wikidata.org/wiki/Q64728492)
* [HTTP 411 (Q64728490)](https://wikidata.org/wiki/Q64728490)
* [HTTP 409 (Q64728489)](https://wikidata.org/wiki/Q64728489)
* [HTTP 408 (Q64728488)](https://wikidata.org/wiki/Q64728488)
* [HTTP 406 (Q64728486)](https://wikidata.org/wiki/Q64728486)
* [HTTP 405 (Q64728485)](https://wikidata.org/wiki/Q64728485)
* [HTTP 402 (Q64728484)](https://wikidata.org/wiki/Q64728484)
* [HTTP 400 (Q64728482)](https://wikidata.org/wiki/Q64728482)
* [HTTP 300 (Q64728481)](https://wikidata.org/wiki/Q64728481)
* [HTTP 205 (Q64728479)](https://wikidata.org/wiki/Q64728479)
* [HTTP 204 (Q64728477)](https://wikidata.org/wiki/Q64728477)
* [HTTP 203 (Q64728476)](https://wikidata.org/wiki/Q64728476)
* [HTTP 202 (Q64728474)](https://wikidata.org/wiki/Q64728474)
* [HTTP 201 (Q64728471)](https://wikidata.org/wiki/Q64728471)
* [HTTP 200 (Q64728450)](https://wikidata.org/wiki/Q64728450)
* [HTTP 101 (Q64728425)](https://wikidata.org/wiki/Q64728425)
