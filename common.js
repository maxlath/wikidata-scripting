module.exports = {
  addScriptHeader: () => {
    console.log('#!/usr/bin/env sh')
    console.log('set -eu')
  },

  buildCommand: (cmd, statementId, property, value) => {
    console.log(`echo '${statementId}' ${property} ${value}`)
    console.log(`wd ${cmd} '${statementId}' ${property} ${value} | jd success`)
  },

  // From the SPARQL results format
  fixStatementId: statementId => {
    var [ qid, ...rest ] = statementId.split(/-/)
    rest = rest.join('-')
    return `${qid}$${rest}`
  },

  addDone: () => {
    console.log('echo done')
  }
}
