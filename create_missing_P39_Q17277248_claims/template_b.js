const { getEntities, simplify } = require('wikidata-sdk')
const fetch = require('node-fetch')

module.exports = async id => {
  const entity = await getEntity(id)
  if (claimWithQualifierAlreadyExists(entity, 'P39', 'Q17277248', 'P2937', 'Q31013959')) return

  return {
    id,
    claims: {
      P39: {
        value: 'Q17277248',
        qualifiers: {
          P2937: 'Q31013959'
        },
        references: {
          P143: 'Q1975217',
          P4656: 'https://hy.wikipedia.org/wiki/Կատեգորիա:ՀՀ_ԱԺ_6-րդ_գումարման_պատգամավորներ'
        }
      }
    }
  }
}

const getEntity = async id => {
  const url = getEntities(id)
  const { entities } = await fetch(url).then(res => res.json())
  return entities[id]
}

const claimWithQualifierAlreadyExists = (entity, property, value, qualifierProperty, qualifierValue) => {
  const propertyClaims = entity.claims[property]
  if (!propertyClaims) return false

  // See wikidata-sdk documentation:
  // https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_claims.md#keep-qualifiers
  const simplifiedPropertyClaimsValues = simplify.propertyClaims(propertyClaims, { keepQualifiers: true })

  const claimsWithMatchingMainsnak = simplifiedPropertyClaimsValues.filter(claim => claim.value === value)

  return claimsWithMatchingMainsnak.some(claim => {
    const qualifiers = claim.qualifiers[qualifierProperty]
    return qualifiers && qualifiers.includes(qualifierValue)
  })
}
