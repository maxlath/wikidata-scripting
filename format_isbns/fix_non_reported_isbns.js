import { audit, parse } from 'isbn3'
import { cleanup, commonParse, dehyphenate } from './utils.js'

export function fixIsbn13 ({ statement, value, date }) {
  const parsed = commonParse(value)
  if (parsed) {
    if (parsed.isbn13h === value) {
      return
    } else {
      return { guid: statement, id, property, oldValue: value, newValue: parsed.isbn13h, summary: `fix invalid ISBN-13 (P212)` }
    }
  }
  // let year
  // try {
  //   year = date ? parseInt(date.split('-')[0]) : null
  // } catch (err) {
  //   console.error(err)
  // }
  // const cleanedValue = dehyphenate(cleanup(value))
  // try {
  //   const result = audit(cleanedValue)
  //   if (result.clues.length === 1) {
  //     const clue = result.clues[0]
  //     const { candidate, message } = clue
  //     let property = 'P212'
  //     let newValue
  //     if (!year || year >= 2007) {
  //       newValue = parse(candidate).isbn13h
  //     } else {
  //       property = 'P957'
  //       newValue = parse(candidate).isbn10h
  //     }
  //     const id = statement.split('$')[0]
  //     return { guid: statement, id, property, oldValue: value, newValue, summary: `fix invalid ISBN-13 (P212): ${message}` }
  //   }
  // } catch (err) {
  //   console.error(err, '🚀 ~ file: fix_non_reported_isbns.js ~ line', 9, 'fixIsbn13 ~ ', { statement, value, cleanedValue })
  // }
}

export function fixIsbn10 ({ statement, value, date }) {
  const parsed = commonParse(value)
  if (parsed) return
  let year
  try {
    year = date ? parseInt(date.split('-')[0]) : null
  } catch (err) {
    console.error(err)
  }
  const cleanedValue = dehyphenate(cleanup(value))
  try {
    const result = audit(cleanedValue)
    if (result.clues.length === 1) {
      const clue = result.clues[0]
      const { candidate, message } = clue
      let property = 'P957'
      let newValue
      if ((!year && !message.includes('it is an ISBN-13')) || year < 2007) {
        newValue = parse(candidate).isbn10h
        if (!newValue) return
      } else {
        property = 'P212'
        newValue = parse(candidate).isbn13h
      }
      const id = statement.split('$')[0]
      return { guid: statement, id, property, oldValue: value, newValue, summary: `fix invalid ISBN-10 (P957): ${message}` }
    }
  } catch (err) {
    console.error(err, '🚀 ~ file: fix_non_reported_isbns.js ~ line', 9, 'fixIsbn13 ~ ', { statement, value, cleanedValue })
  }
}
