'use client'

// SITEFY · partners · © year
import { useEffect, useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import SitefyMark from '@/components/SitefyMark/SitefyMark'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  // the year is read in the browser (Next.js must not freeze "now" at build time)
  const [year, setYear] = useState(null)
  useEffect(() => setYear(new Date().getFullYear()), [])

  return (
    <footer className="footer">
      <span className="footer-brand">
        <SitefyMark gradient={false} title="" />
        SITEFY
      </span>
      <span className="footer-partners">
        <span>{t.footer.member}</span>
        <i aria-hidden="true" />
        <span>{t.footer.partner}</span>
      </span>
      <span className="footer-rights">
        © {year ? `${year} · ` : ''}
        {t.footer.rights}
      </span>
    </footer>
  )
}
