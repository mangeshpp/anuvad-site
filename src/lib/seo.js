import { useEffect } from 'react'

const SITE_NAME = 'Anuvad Software Solutions'
const ORIGIN = 'https://www.anuvadsoftware.com'

function setMeta(selector, attr, value) {
  if (!value) return
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || []
    if (key && val) el.setAttribute(key, val)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setCanonical(path) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', `${ORIGIN}${path}`)
}

/**
 * Keeps <title>, description, Open Graph tags and the canonical URL in step
 * with the active route. Plain DOM rather than a helmet dependency — this is a
 * static marketing build, so one effect per navigation is all it needs.
 */
export function useSeo({ title, description, path = '/' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]', 'content', `${ORIGIN}${path}`)
    setCanonical(path)
  }, [title, description, path])
}
