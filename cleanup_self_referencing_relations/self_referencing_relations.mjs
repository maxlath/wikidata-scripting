export function selfReferencingRelations (pid) {
  return `SELECT ?item_statement {
    ?item p:${pid} ?item_statement .
    ?item_statement ps:${pid} ?item .
  }
  `
}

export function selfReferencingWorkRelations (pid) {
  return `SELECT ?item_statement {
    VALUES (?work_serie_or_edition_type) {
      (wd:Q571) (wd:Q2831984) (wd:Q838795) (wd:Q149537) (wd:Q17518870) (wd:Q12106333) (wd:Q1279564) (wd:Q386724) (wd:Q49084) (wd:Q17991521) (wd:Q699) (wd:Q34620) (wd:Q128093) (wd:Q17518461) (wd:Q12765855) (wd:Q179461) (wd:Q27560760) (wd:Q23622) (wd:Q2352616) (wd:Q780605) (wd:Q5185279) (wd:Q37484) (wd:Q10901350) (wd:Q20540385) (wd:Q36279) (wd:Q234460) (wd:Q193934) (wd:Q193955) (wd:Q17994250) (wd:Q1238720) (wd:Q193495) (wd:Q83818856) (wd:Q12799318) (wd:Q10992055) (wd:Q1391417) (wd:Q35760) (wd:Q16363676) (wd:Q11826511) (wd:Q116476516) (wd:Q11825892) (wd:Q8275050) (wd:Q747381) (wd:Q13136) (wd:Q47461344) (wd:Q7725634) (wd:Q1004) (wd:Q8261) (wd:Q725377) (wd:Q25379) (wd:Q49084) (wd:Q8274) (wd:Q562214) (wd:Q3297186) (wd:Q21191134) (wd:Q17489659) (wd:Q867335) (wd:Q1700470) (wd:Q13593966) (wd:Q17710980) (wd:Q17710986) (wd:Q52269333) (wd:Q53843792) (wd:Q2005755) (wd:Q21190961) (wd:Q213369) (wd:Q2620972) (wd:Q277759) (wd:Q1667921) (wd:Q14406742) (wd:Q21198342) (wd:Q74262765) (wd:Q104213567) (wd:Q3972943) (wd:Q57933693) (wd:Q3331189)
    }
    ?item wdt:P31 ?work_serie_or_edition_type .
    ?item p:${pid} ?item_statement .
    ?item_statement ps:${pid} ?item .
  }
  `
}
