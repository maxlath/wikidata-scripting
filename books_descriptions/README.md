# Add book entities descriptions

In this scripting session, we generate a task queue to translate the numerous Dutch descriptions on the pattern "boek van [author name]" in other languages.

## How To
Assumes that you already have [wikidata-cli](https://github.com/maxlath/wikidata-cli) `>= v5.3.0` and [jsondepth](https://github.com/maxlath/jsondepth) installed globally

### 1 - request the data from the missing descriptions
```sh
wd sparql get_missing_description_request.js fr > missing_fr_description.json
```
See [wikidata-cli `wd sparql` command documentation](https://github.com/maxlath/wikidata-cli/blob/master/docs/read_operations.md#wd-sparql) for explainations.

### 2 - generate the command files
```sh
./generate_add_missing_description_cmd.js fr > ./fr_task_queue
```
The generated commands look like:
```sh
wd data Q74263 | jq .descriptions.fr || wd set-description Q74263 fr "Livre de Isaac Newton"
```
Some explaination of what it does:

- `wd data Q74263`: fetch Q74263 data from the Wikidata API
- `|`: pipe the result to the next command
- `jq .descriptions.fr`: parses the returned data to get the French description
- `||`: that's the `OR` operator: in the case the previous command didn't returned anything (there is no French description), execute the next command
- `wd set-description Q74263 fr "Livre de Isaac Newton"`: set Q74263 French description to "Livre de Isaac Newton"

### 3 - run the generated command file
```sh
./fr_task_queue
```

## Run as a daemon
In the process above, you now have to keep the terminal open as long as the task queue is running. An alternative is to start the command as a daemon process. There are many ways to do that, but the simplest I know is to install [aeternum](https://github.com/AvianFlu/aeternum) and replace the **step 3** by the following command:

**3 - run the generated command file**
```sh
aeternum -o ./fr_task_queue.log -e ./fr_task_queue.err -- ./fr_task_queue
```
You can now close you terminal. You can still come back later and follow the logs like so:
```sh
tail -f ./fr_task_queue.log ./fr_task_queue.err
```
