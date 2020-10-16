const path = require('path')
const today = new Date().toISOString().split('T')[0]

module.exports = inputPath => {
  const input = require(path.resolve(__dirname, inputPath))
  const { name, nameFr, someId, from, wikipedia } = input

  return {
    labels: {
      en: name,
      fr: nameFr
    },
    claims: {
      P445: {
        value: someId,
        references: {
          P99999: from,
          P99991: today,
        }
      }
    },
    sitelinks: {
      enwiki: wikipedia
    }
  }
}
