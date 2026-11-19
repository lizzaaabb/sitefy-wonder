'use client'

// ქარ / EN / عربي pill — the white pill slides under the chosen language
import { useLang } from '@/i18n/LanguageContext'
import { LANGUAGES } from '@/i18n/translations'

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLang()
  const index = Math.max(
    0,
    LANGUAGES.findIndex((l) => l.code === lang),
  )

  return (
    <div className="header-langs" role="group" aria-label={t.language} dir="ltr">
      <span className="header-lang-pill" style={{ transform: `translateX(${index * 100}%)` }} aria-hidden="true" />
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          className={`header-lang-btn ${l.code === lang ? 'header-lang-on' : ''}`}
          aria-pressed={l.code === lang}
          onClick={() => setLang(l.code)}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
