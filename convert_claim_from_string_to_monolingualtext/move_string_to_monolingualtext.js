module.exports = (entity, from, to, lang) => {
  const movedClaims = entity.claims[from]

  return {
    id: entity.id,
    claims: {
      [from]: movedClaims.map(removeClaim),
      [to]: movedClaims.map(buildMonolingualTextClaim(lang)),
    }
  }
}

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
