# Import external ids from Youtube channel pages

In this scripting session, we use Youtube channels links to other platforms (Facebook, Twitter, Instagram, etc) to import the associated external ids into Wikidata.

> :warning: best practices have evolved since this project was initially written, especially, it would now be recommended to use the [batch mode](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode) instead of many individual `wd` commands. See [this example](https://github.com/maxlath/wikidata-scripting/tree/master/convert_claim_from_string_to_monolingualtext) for a more up-to-date workflow

## How To
Assumes that you already have [wikidata-cli](https://github.com/maxlath/wikidata-cli) `>= v5.3.0`, [jsondepth](https://github.com/maxlath/jsondepth) installed globally

##### 1 - find all the items with a known Youtube channel
```sh
wd sparql ./items_with_youtube_channel.rq > items_with_youtube_channel.json
```

##### 2 - extract external ids from Youtube channel pages and prepare wikidata-cli commmands
```sh
./generate_cmds.js > ./run
```

##### 3 - run the wikidata-cli commmands
Doing this step separately allows to check that the generated commands look correct
```sh
# make the script executable
chmod +x ./run
./run
```
