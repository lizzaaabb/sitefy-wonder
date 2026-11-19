'use client'

// First screen: background photo, glowing logo, the title word by word, subtitle, "scroll"
import { Fragment, useEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import SitefyMark from '@/components/SitefyMark/SitefyMark'
import MoltenMetal from '@/components/MoltenMetal/MoltenMetal'
import './Landing.css'

export default function Landing({ nextSectionId = 'brands', fadeTo = '#000' }) {
  const { lang, dir, t } = useLang()

  // on the first visit the words wait for the logo; after a language switch they appear at once
  const firstLang = useRef(lang)
  const [switched, setSwitched] = useState(false)
  useEffect(() => {
    if (lang !== firstLang.current) setSwitched(true)
  }, [lang])
  const delay = switched ? 0.05 : 1.1

  return (
    <section className="landing" style={{ '--fade-to': fadeTo }} data-lang={lang} dir={dir}>
      <div className="landing-bg">
        {/* animated liquid-metal background (follows the mouse, flares on click) */}
        <MoltenMetal
          colors={['#000000', '#ffffff']}
          coreColor="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          thickness={1}
          haze={0.75}
          mouseInteraction
          flareOnClick
          lightMode={false}
          swirl={1}
          turbulence={0.2}
          brightness={1.3}
          colorMode="molten"
          rotation={0}
          offsetX={0}
          offsetY={0}
          grain={0.05}
          opacity={1}
          drift={0.3}
          intro
          mouseStrength={0.5}
          paused={false}
          dpr={1}
        />

      </div>
      <div className="landing-fade" aria-hidden="true" />

      <div className="landing-center">
        <div className="landing-logo">
          <SitefyMark className="landing-glow" gradient={false} title="" />
          <SitefyMark className="landing-mark" />
        </div>

        <h1 className="landing-title" key={`t-${lang}`}>
          {t.title.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span className="landing-word" style={{ animationDelay: `${delay + i * 0.1}s` }}>
                {word}
              </span>
              {i === t.titleBreak && <br className="landing-mbr" />}
            </Fragment>
          ))}
        </h1>

        <p className="landing-sub" key={`s-${lang}`} style={{ animationDelay: `${delay + 0.7}s` }}>
          <i aria-hidden="true" />
          {t.sub}
          <i aria-hidden="true" />
        </p>
      </div>

      <a className="landing-scroll" href={`#${nextSectionId}`}>
        <span>{t.scroll}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  )
}
