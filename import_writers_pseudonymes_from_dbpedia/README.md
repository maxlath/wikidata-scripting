# import writers pseudonymes from DBpedia

> :warning: best practices have evolved since this project was initially written, especially, it would now be recommended to use the [batch mode](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode) instead of many individual `wd` commands. See [this example](https://github.com/maxlath/wikidata-scripting/tree/master/convert_claim_from_string_to_monolingualtext) for a more up-to-date workflow


```sh
# Find writers pseudonymes
wd sparql --sparql-endpoint http://live.dbpedia.org/sparql wikidata_writers_pseudo.rq > wikidata_writers_pseudo.json

# Clean DBpedia results
./clean_wikidata_pseudo > wikidata_writers_pseudo_cleaned.json

# Check that the deduced pseudonymes look good
./find_suspects | less

# Generate the edit script
./generate_cmds > ./run
# make it executable
chmod +x ./run
# and run
./run
```
