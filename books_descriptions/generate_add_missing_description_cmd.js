#!/usr/bin/env node
const fs = require('fs')

const descriptionBase = {
  en: 'book by',
  es: 'libro de',
  fr: 'livre de',
  de: 'Buch von'
}

const [ lang ] = process.argv.slice(2)

const terminate = message => {
  console.error(message)
  process.exit(1)
}

if (typeof lang !== 'string') {
  terminate(`invalid lang: ${lang}`)
}

if (!descriptionBase[lang]) {
  terminate(`unsuppored lang: ${lang}.
    Suppored langs: ${Object.keys(descriptionBase)}`)
}

const sparql = require(`./get_missing_description_request`)(lang)
const results = require(`./missing_${lang}_description.json`)

const vowels = 'aeiouyAEIOUY'
const modifier = {
  fr: desc => {
    const nameFirstLetter = desc.replace('livre de ', '')[0]
    if (vowels.includes(nameFirstLetter)) {
      desc = desc.replace(' de ', " d'")
    }
    return desc
  }
}

results.forEach(result => {
  let description = result.nl_description
    // remove everything between parenthesis
    .replace(/\(.*$/, '')
    .replace('boek van', descriptionBase[lang])
    // Espace what needs to be escape to get a valid shell command
    .replace(/"/g, '\\"')
    .replace(/`/g, '\\`')
    .trim()

  if (modifier[lang]) {
    description = modifier[lang](description)
  }

  console.log(`wd data ${result.item} | jq .descriptions.${lang} || wd set-description ${result.item} ${lang} "${description}"`)
})
