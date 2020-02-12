# import WorldCat Identities ID

Addressing https://www.wikidata.org/w/index.php?title=Topic:Vfnr6v8lfqagpi7g

## Dependencies
* NodeJS >= 8
* [wikibase-cli](https://github.com/maxlath/wikibase-cli) >= 8

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
// ./template.js
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

### Generate the commands that will need to be run
```sh
# Stop the commands if one fail, see https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html#The-Set-Builtin
# and discussion https://github.com/maxlath/wikibase-cli/issues/62#issuecomment-579249500
echo 'set -e' > ./commands

# Generate the commands from the data
cat data.csv | grep -E '^Q' | sed 's/,/ /g' | awk '{print "wd entity-edit ./template.js", $1, $2, $3}' >> ./commands
```

That should generate something like
```sh
set -e
wd entity-edit ./template.js Q5349185 lccn-n83008988 108197827
```

### Run the commands
You could run those commands in the present terminal
```sh
# Make the file an executable
chmod +x ./commands
# Run
./commands > ./commands.logs 2> commands.errors
# Follow the logs
tail -f ./commands*
```

This unfortunately means that you would have to keep that terminal for the whole time this process is running. If that's an issue, a solution could be to run it on a server (or some computer that isn't turned off), and make that process independant of your terminal:
* either by turning it into a daemon, with something like `aeternum`: `aeternum -o ./commands.logs -e commands.errors -- ./commands`
* or running it in a `tmux` session
* you could probably even run it on [Toolforge Grid](https://wikitech.wikimedia.org/wiki/Help:Toolforge/Grid)
* last resort, you could ask me to run it for you, but you would need to trust me with your OAuth tokens
