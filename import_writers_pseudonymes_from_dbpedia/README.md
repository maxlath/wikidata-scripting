# import writers pseudonymes from DBpedia

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
