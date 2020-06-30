const wtfwp = require('wtf_wikipedia')
const { getSitelinkData, getEntitiesFromSitelinks } = require('wikidata-sdk')
const fetch = require('node-fetch')

module.exports = async url => {
  const id = await getWikidataId(url)
  const doc = await wtfwp.fetch(url)
  const { sections } = doc.json()
  const namn = getFirstInfoboxValue(sections, 'namn')
  const bild = getFirstInfoboxValue(sections, 'bild')

  console.log({ id, namn, bild })

  // Return empty if we didn't find the expected data
  // to prevent a junk edit
  if (!namn || !bild) return

  return {
    id,
    labels: {
      sv: namn
    },
    claims: {
      P18: bild
    }
  }
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

const getWikidataId = async articleUrl => {
  const { key, title } = getSitelinkData(articleUrl)
  const url = getEntitiesFromSitelinks({ sites: key, titles: title, props: 'info'  })
  const { entities } = await fetch(url).then(res => res.json())
  const id = Object.keys(entities)[0]
  return id
}
