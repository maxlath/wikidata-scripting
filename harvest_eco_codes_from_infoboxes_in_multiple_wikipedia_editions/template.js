const wtfwp = require('wtf_wikipedia')
const { getEntities } = require('wikidata-sdk')
const fetch = require('node-fetch')
const ecoPattern = /^[A-E]\d{2}(–[A-E]\d{2})?$/
const headers = {
  'user-agent': 'wikidata-scripting (https://github.com/maxlath/wikidata-scripting)'
}

module.exports = async id => {
  const { claims, sitelinks } = await getEntity(id)
  if (claims.P9838) {
    console.warn(`${id} already has an ECO code`)
    return
  }
  const { eco, ref } = await getEco(sitelinks)

  if (!eco) {
    console.warn(`no ECO code found for ${id}`)
    return
  }

  const formattedEco = eco
    .replace(/\s/g, '')
    .replace('&ndash;', '–')
    .replace(/[-−–]/, '–')

  if (!ecoPattern.test(formattedEco)) {
    console.error('invalid eco code', { id, eco, formattedEco, ref })
    return
  }

  return {
    id,
    claims: {
      P9838: {
        value: formattedEco,
        references: ref
      }
    }
  }
}

const getEntity = async id => {
  const { entities } = await fetch(getEntities(id), { headers }).then(res => res.json())
  return entities[id]
}

const getEco = async sitelinks => {
  if (sitelinks.enwiki) {
    const data = await getEcoFromEnwikiInfobox(sitelinks.enwiki)
    if (data) return data
  }
  if (sitelinks.ruwiki) {
    const data = await getEcoFromRuwikiInfobox(sitelinks.ruwiki)
    if (data) return data
  }
  if (sitelinks.dewiki) {
    const data = await getEcoFromDewikiInfobox(sitelinks.dewiki)
    if (data) return data
  }
  return {}
}

const getEcoFromEnwikiInfobox = async enwiki => {
  const url = `https://en.wikipedia.org/wiki/${enwiki.title}`
  const doc = await wtfwp.fetch(url)
  const { sections } = doc.json()
  const eco = getFirstInfoboxValue(sections, 'eco')
  const ref = {
    P143: 'Q328',
    P813: today
  }
  return { eco, ref }
}

const getEcoFromRuwikiInfobox = async ruwiki => {
  const url = `https://ru.wikipedia.org/wiki/${ruwiki.title}`
  const doc = await wtfwp.fetch(url)
  const { sections } = doc.json()
  const eco = getFirstTemplateValue(sections, 'eco')
  const ref = {
    P143: 'Q206855',
    P813: today
  }
  return { eco, ref }
}

const getEcoFromDewikiInfobox = async dewiki => {
  const url = `https://de.wikipedia.org/wiki/${dewiki.title}`
  const doc = await wtfwp.fetch(url)
  const { sections } = doc.json()
  const eco = getFirstInfoboxValue(sections, 'eco')
  const ref = {
    P143: 'Q48183',
    P813: today
  }
  return { eco, ref }
}

const getFirstInfoboxValue = (sections, attribute) => {
  for (const section of sections) {
    if (section.infoboxes) {
      for (const infobox of section.infoboxes) {
        if (infobox[attribute]) return infobox[attribute].text
      }
    }
  }
}

const getFirstTemplateValue = (sections, attribute) => {
  for (const section of sections) {
    if (section.templates) {
      for (const template of section.templates) {
        if (template[attribute]) return template[attribute]
      }
    }
  }
}

const today = new Date().toISOString().split('T')[0]

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
