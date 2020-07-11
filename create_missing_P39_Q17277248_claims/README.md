# create missing P39 Q17277248 claims

Example of how [`wb entity-edit` dynamic templates](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#pass-data-as-a-dynamic-js-function-file-returning-an-object) could avoid re-creating existing claims.

## Dependencies
* [nodejs](https://nodejs.org) `>= v7.6`
* [wikibase-cli](https://github.com/maxlath/wikibase-cli) `>= v13.1.1`
* other dependencies installed by npm here after:
  * [`wikidata-sdk`](https://github.com/maxlath/wikibase-sdk)
  * [`node-fetch`](https://github.com/bitinn/node-fetch)

## Install
```sh
git clone https://github.com/maxlath/wikidata-scripting
cd wikidata-scripting/create_missing_P39_Q17277248_claims
npm install
```

## Run
With `./ids` being a file containing one Q id per line, example:
```
Q4115189
Q13406268
```
the following command will return an edit object for each id, unless the corresponding entity already has a P39:Q17277248 claim
```sh
cat ids | wd edit-entity template.js --batch --dry --summary 'create missing P39 Q17277248 claims'
```
(Running with --dry flag to see the generated edit without actually modifying Wikidata)

