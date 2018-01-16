const breq = require('bluereq')

module.exports = channelId => {
  return breq.get(`https://www.youtube.com/channel/${channelId}`)
  .get('body')
  .then(parseChannelLinks)
}

const parseChannelLinks = html => {
  const linksHtml = html.match(/<a href="(.*)".*about-channel-link.*>/g)
  if (!linksHtml) return

  return linksHtml
  .map(extractHref)
  .filter(href => href != null)
  .reduce(indexHrefByProperty, {})
}

const extractHref = linkHtml => {
  const match = linkHtml.match(/href="([^"]+)"/)
  if (match != null) return match[1]
}

const indexHrefByProperty = (index, href) => {
  // Unfortunately, links titles aren't stable, so we can only rely on the domains themselves
  if (href.match('facebook.com')) index.P2013 = parseId(href)
  else if (href.match('twitter.com')) index.P2002 = parseId(href)
  else if (href.match('pinterest.com')) index.P3836 = parseId(href)
  else if (href.match('plus.google.com')) index.P2847 = parseId(href.replace(/\/posts\/?$/, ''))
  else if (href.match('instagram.com')) index.P2003 = parseId(href)
  else if (href.match('tumblr.com')) index.P3943 = parseTumblrId(href)
  return index
}


const parseId = href => {
  return href
  // Remove any query parameter
  .split('?')[0]
  // Remove trailing slash
  .replace(/\/$/, '')
  // Take the id only
  .split('/').slice(-1)[0]
}

const parseTumblrId = href => {
  return href
  .replace(/https?:\/\//, '')
  .replace(/\.tumblr\.com.*/, '')
}
