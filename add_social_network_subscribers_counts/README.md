# Add social networks subscribers counts

> :warning: best practices have evolved since this project was initially written, especially, it would now be recommended to use the [batch mode](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#batch-mode) instead of many individual `wd` commands. See [this example](https://github.com/maxlath/wikidata-scripting/tree/master/convert_claim_from_string_to_monolingualtext) for a more up-to-date workflow

## How To
Assumes that you already have [wikidata-cli](https://github.com/maxlath/wikidata-cli) `>= v5.3.0`

### Reddit
```sh
# 1 - find all the items with a subreddit
wd sparql ./channels_statements.js subreddit P3984 > subreddit_statements.json
# 2 - add those subreddits data
./add_reddit_data
# 3 - prepare wikidata-cli commmands
./generate_cmds subreddit_statements.json subreddit '2018-05-06' > ./run_reddit
# 4 - run the wikidata-cli commmands (doing this step separately allows to check that the generated commands look correct).
# Make the script executable
chmod +x ./run_reddit
./run_reddit
```

### Twitter
```sh
# 1 - find all the items with a twitter account
wd sparql ./channels_statements.js twitter P2002 > twitter_statements.json
# 2 - add those twitter accounts data
./add_twitter_data
# 3 - prepare wikidata-cli commmands
./generate_cmds twitter_statements.json twitter '2018-05-10' > ./run_twitter
# 4 - run the wikidata-cli commmands (doing this step separately allows to check that the generated commands look correct).
# Make the script executable
chmod +x ./run_twitter
./run_twitter
```
