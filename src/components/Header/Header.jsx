'use client'

// Top bar: Sitefy logo · "accepting new projects" · language switch · call button.
// It stays on top while scrolling; after the first few pixels it turns into a glass bar.
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import { SITE } from '@/config/site'
import SitefyMark from '@/components/SitefyMark/SitefyMark'
import LanguageSwitcher from './LanguageSwitcher'
import './Header.css'

export default function Header() {
  const { lang, dir, t } = useLang()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const check = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`} data-lang={lang} dir={dir}>
      <div className="header-start">
        <a className="header-brand" href="#" aria-label="Sitefy" dir="ltr">
          <SitefyMark gradient={false} title="" />
          <span>SITEFY</span>
        </a>
        <span className="header-status">
          <i className="header-live" aria-hidden="true" />
          {t.status}
        </span>
      </div>

      <div className="header-actions">
        <LanguageSwitcher />
        <a className="header-call" href={`tel:${SITE.phone}`} aria-label={t.call}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M5.2 3.5h3l1.6 4.1-2 1.3a11 11 0 0 0 5.3 5.3l1.3-2 4.1 1.6v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.2 5.7a2 2 0 0 1 2-2.2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </header>
  )
}
