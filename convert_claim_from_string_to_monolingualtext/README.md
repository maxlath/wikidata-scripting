# convert claim from string to monolingualtext

While wikibase-cli/wikibase-edit allow to [move claims between certain datatypes](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#move-claims-between-properties-of-different-datatypes), it is not possible to automatically turn a string claim into a monolingualtext property, as the monolingualtext requires additional data, namely a language. A work around is to generate the edits using a combination of:

* [`wb generate-template` (`wikibase-cli >= 15.5.0`)](https://github.com/maxlath/wikibase-cli/blob/master/docs/read_operations.md#wd-generate-template)
* [`ndjson-apply >= 1.2.0` ](https://github.com/maxlath/ndjson-apply)
* [`wd edit-entity`](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#edit-entity)

```sh
# Get entities ids somehow (could be from a SPARQL request, see https://github.com/maxlath/wikibase-cli/blob/master/docs/read_operations.md#generate-many-templates)
echo 'Q27185
Q55461964
Q4497733
Q1440653
' > ids

# Get the data for the entities to modify
cat ids | wd generate-template --props P969 --format json --no-minimize > entities_data.ndjson

# Apply the desired modification to that data
cat entities_data.ndjson | ndjson-apply ./move_string_to_monolingualtext.js P969 P6375 und > entities_edits.ndjson

# Commit those modifications
cat entities_edits.ndjson | wd edit-entity --batch --summary 'convert P969 into P6375'
```

## Result
The above example demonstrates how to do this edit on several entities at once, but I ran it only on Q27185, which generated [this edit](https://www.wikidata.org/w/index.php?title=Q27185&type=revision&diff=1303393422&oldid=1238202108)
and [this edit group](https://editgroups.toolforge.org/b/wikibase-cli/30b5afdbb94ba/)
