'use client'

// Language of the whole site (ka / en / ar). Remembers the choice in the browser
// and sets <html lang dir> so Arabic turns right-to-left.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, translations } from './translations'

const STORAGE_KEY = 'sitefy-lang'
const LanguageContext = createContext(null)

// the language the visitor picked earlier (null = never picked -> Georgian)
function savedLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && translations[saved]) return saved
  } catch {}
  return null
}

export function LanguageProvider({ children, defaultLang = 'ka' }) {
  const [lang, setLangState] = useState(defaultLang)

  useEffect(() => {
    const found = savedLanguage()
    if (found && found !== lang) setLangState(found)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir || 'ltr'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    html.dataset.lang = lang
  }, [lang, dir])

  const setLang = useCallback((code) => {
    if (!translations[code]) return
    setLangState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {}
  }, [])

  const value = useMemo(() => ({ lang, dir, setLang, t: translations[lang] }), [lang, dir, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
