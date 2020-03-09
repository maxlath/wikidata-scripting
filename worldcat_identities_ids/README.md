# import WorldCat Identities ID

Addressing https://www.wikidata.org/w/index.php?title=Topic:Vfnr6v8lfqagpi7g

## Dependencies
* NodeJS >= 8
* [wikibase-cli](https://github.com/maxlath/wikibase-cli) >= 9.1.1

## How to

Imagine a csv file going something like this like this
```csv
Wikidata ID,WorldCat Identities ID,Viaf ID
Q5349185,lccn-n83008988,108197827
```

You could import this data the following way

### Create a JS entity edit template

to match the needs of the [`wb edit-entity`](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-edit-entity) command

```js
// ./import_template.js
module.exports = (id, wciId, viafId) => {
  return {
    id: id,
    claims: {
      P7859: {
        value: wciId,
        references: [ { P214: viafId } ]
      }
    }
  }
}
```

### Generate the commands arguments
```sh
cat data.csv | grep -E '^Q' | sed 's/,/ /g' | awk '{print "./import_template.js", $1, $2, $3}' > ./commands_args
```

That should generate a file with lines looking something like this:
```sh
./import_template.js Q5349185 lccn-n83008988 108197827
```

### Run the commands
```sh
wd edit-entity --batch --dry < commands_args > ./commands.logs 2> commands.errors
# Follow the logs from another terminal
tail -f ./commands*
```

This unfortunately means that you would have to keep that terminal for the whole time this process is running. If that's an issue, a solution could be to run it on a server (or some computer that isn't turned off), and make that process independant of your terminal:
* either by turning it into a daemon, with something like [aeternum](https://github.com/AvianFlu/aeternum): `aeternum -o ./commands.logs -e commands.errors -- ./commands`
* or running it in a `tmux` session
* you could probably even run it on [Toolforge Grid](https://wikitech.wikimedia.org/wiki/Help:Toolforge/Grid)
* last resort, you could ask me to run it for you, but you would need to trust me with your OAuth tokens
