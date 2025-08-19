import { parse } from 'isbn3'
import uniq from 'lodash.uniq'

export function commonParse (value) {
  value = cleanup(value)
  const values = value.split(/\s*[^\dX]\s*/)
  if (values.length > 1) {
    if (uniq(values).length === 1) value = cleanup(values[0])
    else return
  }
  return parse(value)
}

export function cleanup (value) {
  return value = value
    .replace(/ISBN-1(0|3)/, '')
    .replaceAll('-', '')
    .replace(/^[^\d]+/, '')
    .replace('x', 'X')
    .replace(/[^\dX]+$/, '')
    .trim()
}

export function dehyphenate (str) {
  return str.replaceAll('-', '')
}
