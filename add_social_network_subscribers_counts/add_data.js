Promise = require('bluebird')
const fs = require('fs')
const writeFile = require('util').promisify(fs.writeFile)
const { green } = require('chalk')

var index = 0

module.exports = params => {
  const { label, getAndAddData } = params
  const listPath = `./${label}_statements.json`
  const list = require(listPath)

  const fetchNext = () => {
    const entry = list[index]
    index += 1
    if (!entry) {
      return forceSave()
      .then(() => console.log('done'))
    }

    if (entry.subscribers || entry.couldntRead || entry.notFound) return fetchNext()

    return getAndAddData(entry)
    .then(save)
    .delay(500)
    .then(fetchNext)
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
