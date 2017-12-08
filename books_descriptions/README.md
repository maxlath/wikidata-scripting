# Add book entities descriptions

In this scripting session, we generate a task queue to translate the numerous Dutch descriptions on the pattern "boek van [author name]" in other languages.

## How To
Assumes that you already have [wikidata-cli](https://github.com/maxlath/wikidata-cli) `>= v5.3.0` and [jsondepth](https://github.com/maxlath/jsondepth) installed globally

**1 - request the data from the missing descriptions**
```sh
wd sparql get_missing_description_request.js fr > missing_fr_description.json
```

**2 - generate the command files**
```sh
./generate_add_missing_description_cmd.js fr > ./fr_task_queue
```

**3 - run the generated command file**
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
