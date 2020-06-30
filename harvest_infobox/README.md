# harvest infobox

Example of how [`wb entity-edit` dynamic templates](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#pass-data-as-a-dynamic-js-function-file-returning-an-object) could be used in combination with other JS modules to generate very custom data importers.


## Dependencies
* [nodejs](https://nodejs.org) `>= v7.6`
* [wikibase-cli](https://github.com/maxlath/wikibase-cli) `>= v11`
* other dependencies installed by npm here after:
  * [`wtf_wikipedia`](https://github.com/spencermountain/wtf_wikipedia)
  * [`wikidata-sdk`](https://github.com/maxlath/wikibase-sdk)
  * [`node-fetch`](https://github.com/bitinn/node-fetch)

## Install
```sh
git clone https://github.com/maxlath/wikidata-scripting
cd wikidata-scripting/harvest_infobox
npm install
```

## Run
Given a `svwiki` URL as input, `template.js` will use `wtf_wikipedia` to try to find a `namn` and `bild` infobox attributes, and use those to build an edit on the corresponding Wikidata item.

```sh
# Running with --dry flag to see the generated edit without actually modifying Wikidata
wd edit-entity template.js https://sv.wikipedia.org/wiki/Gulan_Avci --dry
```
