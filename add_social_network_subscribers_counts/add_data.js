const { writeFile } = require('fs').promises
const { green } = require('chalk')
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

var index = 0

module.exports = params => {
  const { label, getAndAddData } = params
  const listPath = `./${label}_statements.json`
  const list = require(listPath)

  const fetchNext = async () => {
    const entry = list[index]
    index += 1
    if (!entry) {
      await forceSave()
      console.log('done')
    }

    if (entry.subscribers || entry.couldntRead || entry.notFound) return fetchNext()

    await getAndAddData(entry).then(save)
    await wait(500)
    return fetchNext()
  }

  const save = always => {
    const json = JSON.stringify(list, null, 2)
    const reallySave = always || oneTimeOnTen()
    if (!reallySave) return
    console.log(green('saving'))
    return writeFile(listPath, json)
  }

  const forceSave = save.bind(null, true)

  fetchNext()
  .catch(console.error)
  .finally(forceSave)

  process.on('exit', forceSave)
  process.on('SIGINT', forceSave)
}

const oneTimeOnTen = () => Math.random() < 0.1
