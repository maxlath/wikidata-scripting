import { parse } from 'isbn3'
import uniq from 'lodash.uniq'

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
  if (dehyphenate(cleanup(value)).length !== 13) return
  const parsed = commonParse(value)
  if (!parsed?.isbn13h) return
  const id = statement.split('$')[0]
  // Include old value for debug
  return { guid: statement, id, property: 'P212', oldValue: value, newValue: parsed.isbn13h }
}

function commonParse (value) {
  value = cleanup(value)
  const values = value.split(/\s*[^\dX]\s*/)
  if (values.length > 1) {
    if (uniq(values).length === 1) value = cleanup(values[0])
    else return
  }
  return parse(value)
}

function cleanup (value) {
  return value = value
    .replace(/ISBN-1(0|3)/, '')
    .replaceAll('-', '')
    .replace(/^[^\d]+/, '')
    .replace('x', 'X')
    .replace(/[^\dX]+$/, '')
    .trim()
}

function dehyphenate (str) {
  return str.replaceAll('-', '')
}
