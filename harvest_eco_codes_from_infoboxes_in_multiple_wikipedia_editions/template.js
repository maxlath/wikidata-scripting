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

  const { eco, wikipedia } = await getEco(sitelinks)

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
        references: {
          P143: wikipedia,
          P813: today,
        }
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
  const sections = await getArticleSections('en', enwiki.title)
  return {
    eco: getFirstInfoboxValue(sections, 'eco'),
    wikipedia: 'Q328'
  }
}

const getEcoFromRuwikiInfobox = async ruwiki => {
  const sections = await getArticleSections('ru', ruwiki.title)
  return {
    eco: getFirstTemplateValue(sections, 'eco'),
    wikipedia: 'Q206855'
  }
}

const getEcoFromDewikiInfobox = async dewiki => {
  const sections = await getArticleSections('de', dewiki.title)
  return {
    eco: getFirstInfoboxValue(sections, 'eco'),
    wikipedia: 'Q48183'
  }
}

const getArticleSections = async (lang, title) => {
  const url = `https://${lang}.wikipedia.org/wiki/${dewiki.title}`
  const doc = await wtfwp.fetch(url)
  return doc.json().sections
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
