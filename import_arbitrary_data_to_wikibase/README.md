# import arbitrary data to Wikibase

To import any kind of data to Wikibase using wikibase-cli, you would need some way to map that data to the [`wikibase-edit` entity format](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#entity), which is a simplified version of the Wikibase entity format.

## Simple example
To import `input.json` to your local Wikibase, we wrote a `template.js` capable of mapping our custom input data schema to the [`wikibase-edit` entity format](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#entity), which allows us to import that data with:
```sh
wb create-entity ./template.js ./input.json
```

## Batch mode
To import a large batch of data sharing that same schema, you could format it as `ndjson` (newline-delimited JSON, that is one JSON object per line), and pass it to that same template:
```sh
cat input.ndjson | wb create-entity ./template.js --batch
```

Note: to generate that `input.ndjson`, you could use a tool such as [`jq`](https://stedolan.github.io/jq/). Example with the `input.json` file in this repo:
```sh
cat input.json | jq '.' -cr > input.ndjson
```

## Limits
This workflow supposes that the properties and items your data refers to already exists in your Wikibase.
