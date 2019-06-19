module.exports = (code, status, section) => ({
  labels: {
    en: `HTTP ${code}`,
    fr: `HTTP ${code}`,
    de: `HTTP ${code}`,
    it: `HTTP ${code}`,
    nl: `HTTP ${code}`,
    es: `HTTP ${code}`
  },
  aliases: {
    en: `${code} ${status}`
  },
  descriptions: {
    en: `HTTP status code`,
    fr: `code d'état HTTP`,
    de: `HTTP-Statuscode`,
    it: `codice di stato HTTP`,
    nl: `HTTP-statuscode`,
    es: 'código de estado HTTP'
  },
  claims: {
    P31: 'Q19862850',
    P1343: 'Q47470878',
    P973: `https://tools.ietf.org/html/rfc7231#section-${section}`,
    P1451: { text: status, language: 'en' },
    P3295: {
      value: code,
      qualifiers: {
        P3294: 'Q19862850'
      }
    },
  },
})