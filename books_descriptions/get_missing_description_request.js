module.exports = lang => {
  return `SELECT ?item ?nl_description WHERE {
    ?item wdt:P31 wd:Q571 .
    ?item schema:description ?nl_description .
    FILTER(LANG(?nl_description) = "nl") .
    FILTER(STRSTARTS(?nl_description, "boek van")) .
    FILTER(NOT EXISTS {
      ?item schema:description ?lang_description .
      FILTER(LANG(?lang_description) = "${lang}")
    })
  }`
}
