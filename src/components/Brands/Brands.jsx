'use client'

// "Brands that trust us": one line of client names. On a computer the line is
// scaled to fit the screen width; on a phone it scrolls endlessly (the list is doubled).
import { Fragment, useEffect, useRef } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import SitefyMark from '@/components/SitefyMark/SitefyMark'
import './Brands.css'

const BRANDS = [
  'Gothem',
  'Unyte Network',
  'Utopia VIP Travel',
  'itsglovera',
  'Motion Concept',
  'Litox',
  'Valore',
  'Global CBS',
  'Greenhall Capital',
  'MediKids',
]

export default function Brands({ brands = BRANDS, id = 'brands' }) {
  const { lang, dir, t } = useLang()
  const scrollerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    const line = lineRef.current
    if (!scroller || !line) return
    const fit = () => {
      line.style.setProperty('--fit', '1')
      if (window.matchMedia('(max-width: 640px)').matches) return
      const k = scroller.clientWidth / line.scrollWidth
      line.style.setProperty('--fit', String(Math.min(1, k * 0.98)))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(scroller)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [brands])

  const all = [...brands, ...brands]

  return (
    <section id={id} className="brands" data-lang={lang} dir={dir} aria-label={t.brands.title}>
      <p className="brands-label">{t.brands.title}</p>
      <div className="brands-scroller" dir="ltr" ref={scrollerRef}>
        <ul className="brands-line" ref={lineRef}>
          {all.map((name, i) => {
            const copy = i >= brands.length
            return (
              <Fragment key={`${name}-${i}`}>
                {i > 0 && (
                  <li
                    className={`brands-sep ${i === brands.length ? 'brands-loop-sep' : ''} ${i > brands.length ? 'brands-copy' : ''}`}
                    aria-hidden="true"
                  >
                    <SitefyMark gradient={false} title="" />
                  </li>
                )}
                <li className={`brands-name ${copy ? 'brands-copy' : ''}`} aria-hidden={copy || undefined}>
                  {name}
                </li>
              </Fragment>
            )
          })}
          <li className="brands-sep brands-loop-sep" aria-hidden="true">
            <SitefyMark gradient={false} title="" />
          </li>
        </ul>
      </div>
    </section>
  )
}
