module.exports = (entity, from, to, lang) => {
  // If there is only one claim, generate-template will have simplified it to a single object
  const movedClaims = forceArray(entity.claims[from])

  return {
    id: entity.id,
    claims: {
      [from]: movedClaims.map(removeClaim),
      [to]: movedClaims.map(buildMonolingualTextClaim(lang)),
    }
  }
}

const forceArray = obj => obj instanceof Array ? obj : [ obj ]

const removeClaim = function (claim) {
  return {
    id: claim.id,
    remove: true
  }
}

const buildMonolingualTextClaim = lang => claim => {
  delete claim.id
  claim.value = {
    text: claim.value,
    language: lang
  }
  return claim
}
