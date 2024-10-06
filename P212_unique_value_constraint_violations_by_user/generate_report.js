import debounce from 'lodash.debounce'
import ISBN from 'isbn3'
import { readFileSync } from 'fs'

const idsByIsbn = JSON.parse(readFileSync('./ids_by_isbn.json').toString())

const isbnById = {}
for (const [ isbn, ids ] of Object.entries(idsByIsbn)) {
  for (const id of ids) {
    isbnById[id] = isbn
  }
}

const data = {}

export default function (revs) {
  const { title, revisions } = revs
  const currentIsbnsState = getState(revisions[0])
  const P212revs = []
  let previousIsbnsState = '[]'
  for (const rev of revisions.reverse()) {
    const newIsbnsState = getState(rev)
    if (newIsbnsState === currentIsbnsState && previousIsbnsState !== newIsbnsState) {
      P212revs.push(rev)
    }
    // console.log('contribs_counter.js', 26, { currentIsbnsState, previousIsbnsState, newIsbnsState, user: rev.user })
    previousIsbnsState = newIsbnsState
  }
  const users = P212revs.map(rev => rev.user)
  for (const user of uniq(users)) {
    data[user] ??= []
    data[user].push({ id: title, isbn: isbnById[title] })
  }
  lazyOutput()
}

function getState (rev) {
  const state = JSON.parse(rev.slots.main["*"])
  const claims = []
  if (state.claims?.P212) claims.push(...state.claims.P212)
  if (state.claims?.P957) claims.push(...state.claims.P957)
  const isbnState = claims.map(claim => {
    const isbn = claim?.mainsnak?.datavalue?.value
    // console.log('line', 43, 'getState ~ ', { isbn })
    if (isbn) return ISBN.parse(isbn)?.isbn13h
  })
  // console.log('line', 47, 'getState ~ ', { isbnState })
  const relevantisbnState = uniq(isbnState).filter(isbn => idsByIsbn[isbn] != null)
  // console.log('line', 47, 'getState ~ ', { relevantisbnState })
  return JSON.stringify(relevantisbnState)
}

function uniq (array) {
  return Array.from(new Set(array))
}

function output () {
  for (const [ user, ids ] of Object.entries(data).sort((a, b) => a[0] > b[0] ? 1 : -1)) {
    const filteredIds = ids.filter(({ id: idA, isbn: isbnA }) => {
      return ids.some(({ id: idB, isbn: isbnB }) => {
        return isbnA === isbnB && idA !== idB
      })
    })
    if (filteredIds.length > 0) {
      const groupedByIsbn = {}
      for (const { id, isbn } of filteredIds) {
        groupedByIsbn[isbn] ??= []
        groupedByIsbn[isbn].push(id)
      }
      const sortedGroupedByIsbnEntries = Object.entries(groupedByIsbn).sort((a, b) => a[0] > b[0] ? 1 : -1)
      const lines = sortedGroupedByIsbnEntries
        .map(([ isbn, ids ]) => `* ${isbn}: ${ids.map(id => `{Q|${id}}`).join(' ')}`)
        .join('\n')
      console.log(`=== {{Ping|${user}}} ===
${lines}
`)
    }
  }
}

const lazyOutput = debounce(output, 500)
