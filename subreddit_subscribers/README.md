# Import subreddits subscribers counts

## How To
Assumes that you already have [wikidata-cli](https://github.com/maxlath/wikidata-cli) `>= v5.3.0`

##### 1 - find all the items with a subreddit
```sh
wd sparql ./subreddit_claims.rq > subreddit_claims.json
```

##### 2 - add those subreddits data
```sh
./add_reddit_data
```

##### 3 - prepare wikidata-cli commmands
```sh
./generate_cmds > ./run
```

##### 4 - run the wikidata-cli commmands
Doing this step separately allows to check that the generated commands look correct
```sh
# make the script executable
chmod +x ./run
./run
```
