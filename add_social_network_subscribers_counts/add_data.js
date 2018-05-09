const breq = require('bluereq')
const fs = require('fs')
const writeFile = require('util').promisify(fs.writeFile)

var index = 0

module.exports = params => {
  const { label, getAndAddData, mainDataAttribute } = params
  const listPath = `./${label}_statements.json`
  const list = require(listPath)

  fetchNext = () => {
    const entry = list[index]
    index += 1
    if (!entry) return console.log('done')

    if (entry.subscribers || entry.couldntRead) return fetchNext()

    getAndAddData(entry)
    .then(save)
    .delay(500)
    .then(fetchNext)
    .catch(console.error)
  }

  const save = () => {
    const json = JSON.stringify(list, null, 2)
    return writeFile(listPath, json)
  }

  fetchNext()
}
