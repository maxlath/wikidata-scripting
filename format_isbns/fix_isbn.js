import { cleanup, commonParse, dehyphenate } from './utils.js'

export function fixIsbn13 ({ statement, value }) {
  if (dehyphenate(cleanup(value)).length === 10) return
  const parsed = commonParse(value)
  if (!parsed) return
  if (value !== parsed.isbn13h) {
    // Include old value for debug
    return { guid: statement, newValue: parsed.isbn13h, oldValue: value }
  }
}

export function fixIsbn10 ({ statement, value }) {
  if (dehyphenate(cleanup(value)).length === 13) return
  const parsed = commonParse(value)
  if (!parsed) return
  if (value !== parsed.isbn10h) {
    // Include old value for debug
    return { guid: statement, newValue: parsed.isbn10h, oldValue: value }
  }
}

export function moveFromIsbn13ToIsbn10 ({ statement, value }) {
  if (dehyphenate(cleanup(value)).length !== 10) return
  const parsed = commonParse(value)
  if (!parsed?.isbn10h) return
  const id = statement.split('$')[0]
  // Include old value for debug
  return { guid: statement, id, property: 'P957', oldValue: value, newValue: parsed.isbn10h }
}

export function moveFromIsbn10ToIsbn13 ({ statement, value }) {
  if (dehyphenate(cleanup(value)).length === 13) {
    const parsed = commonParse(value)
    if (!parsed?.isbn13h) return
    const id = statement.split('$')[0]
    // Include old value for debug
    return { guid: statement, id, property: 'P212', oldValue: value, newValue: parsed.isbn13h }
  }
}
