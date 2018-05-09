module.exports = (label, property) => {
  return `
  SELECT ?${label} ?statement_id WHERE {
    ?item p:${property} ?statement .
    ?statement ps:${property} ?${label} .
    FILTER NOT EXISTS {
      ?statement pq:P3744 ?subscribers_count .
    }
    BIND(REPLACE(STR(?statement), "http://www.wikidata.org/entity/statement/", "") AS ?statement_id)
  }
  `
}
