'use client'

// Language of the whole site (ka / en / ar). It comes from the address (/geo, /en, /ara);
// switching updates the address instantly (no reload) and sets <html lang dir> (Arabic = right-to-left).
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, translations } from './translations'
import { langToSlug, slugToLang } from './routes'

const STORAGE_KEY = 'sitefy-lang'
const LanguageContext = createContext(null)

function remember(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {}
  // the cookie lets sitefy.ge (no language) open the language picked last time
  document.cookie = `${STORAGE_KEY}=${code}; path=/; max-age=31536000; samesite=lax`
}

export function LanguageProvider({ children, initialLang = 'ka' }) {
  const [lang, setLangState] = useState(initialLang)

  // address changed from outside (back / forward buttons)
  useEffect(() => setLangState(initialLang), [initialLang])
  useEffect(() => {
    const onPop = () => {
      const code = slugToLang(window.location.pathname.split('/')[1])
      if (code) setLangState(code)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    html.dataset.lang = lang
    remember(lang)
  }, [lang, dir])

  const setLang = useCallback((code) => {
    if (!translations[code]) return
    setLangState(code)
    const { search, hash } = window.location
    window.history.pushState(null, '', `/${langToSlug(code)}${search}${hash}`)
  }, [])

  const value = useMemo(() => ({ lang, dir, setLang, t: translations[lang] }), [lang, dir, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
