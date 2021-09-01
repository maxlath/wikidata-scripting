# harvest ECO codes from infoboxes in multiple Wikipedia editions

Example of how [`wb entity-edit` dynamic templates](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#pass-data-as-a-dynamic-js-function-file-returning-an-object) could be used in combination with other JS modules to generate very custom data importers.

Here, we try to set [Encyclopaedia of Chess Openings (ECO) identifiers `P9838`](https://www.wikidata.org/wiki/Property:P9838) for [chess openings (Q103632)](https://www.wikidata.org/entity/Q103632)

The edits resulting from running this can be found here:
* https://editgroups.toolforge.org/b/wikibase-cli/898884cd2f4f7/
* https://editgroups.toolforge.org/b/wikibase-cli/58d007e333c26/
* https://editgroups.toolforge.org/b/wikibase-cli/558846a3b62a9/

## Dependencies
* [nodejs](https://nodejs.org) `>= v7.6`
* [wikibase-cli](https://github.com/maxlath/wikibase-cli) `>= v15.12.0`
* other dependencies installed by npm here after:
  * [`wtf_wikipedia`](https://github.com/spencermountain/wtf_wikipedia)
  * [`wikidata-sdk`](https://github.com/maxlath/wikibase-sdk)
  * [`node-fetch`](https://github.com/bitinn/node-fetch)

## Install
```sh
git clone https://github.com/maxlath/wikidata-scripting
cd wikidata-scripting/harvest_eco_codes_from_infoboxes_in_multiple_wikipedia_editions
npm install
```

## Run

1/ Get the ids of all [chess openings (Q103632)](https://www.wikidata.org/entity/Q103632)
```sh
wget https://raw.githubusercontent.com/maxlath/wikibase-cli-template-collection/master/request/all_instances.js
wd sparql ./all_instances.js Q103632 > openings.ids
```

2/ Harvest the Wikipedia articles corresponding to those Wikidata items using [a custom template](https://github.com/maxlath/wikidata-scripting/blob/master/harvest_eco_codes_from_infoboxes_in_multiple_wikipedia_editions/template.js)
```sh
# Running with --dry flag to see the generated edit without actually modifying Wikidata
cat openings.ids | wd edit-entity ./template.js --dry --batch > edits.ndjson
```

3/ After having checked that `edits.ndjson` looks good, add the found `P9838` ids to Wikidata
```sh
cat edits.ndjson | wd edit-entity --batch
```
