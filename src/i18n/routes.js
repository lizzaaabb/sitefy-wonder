import { translations } from './translations'

// Language <-> address part: sitefy.ge/geo, /en, /ara
export const SLUGS = { ka: 'geo', en: 'en', ar: 'ara' }
export const DEFAULT_SLUG = 'geo'
export const langToSlug = (code) => SLUGS[code] || DEFAULT_SLUG
export const slugToLang = (slug) => Object.keys(SLUGS).find((code) => SLUGS[code] === slug) || null

export function pageMetadata(code) {
  const t = translations[code]
  const languages = Object.fromEntries(Object.entries(SLUGS).map(([c, s]) => [c, `/${s}`]))
  return {
    metadataBase: new URL('https://sitefy.ge'),
    title: `Sitefy — ${t.title.join(' ')}`,
    description: t.sub,
    alternates: { canonical: `/${SLUGS[code]}`, languages: { ...languages, 'x-default': '/geo' } },
  }
}
