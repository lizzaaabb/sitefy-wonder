'use client'

// "Let's begin": big phone number, call + WhatsApp buttons, email and socials.
// The Footer sits at the bottom of this section so the soft glow runs under both.
import { useLang } from '@/i18n/LanguageContext'
import useInView from '@/hooks/useInView'
import { SITE } from '@/config/site'
import SitefyMark from '@/components/SitefyMark/SitefyMark'
import Footer from '@/components/Footer/Footer'
import Icon from './Icon'
import './Contact.css'

export default function Contact({ id = 'contact' }) {
  const { lang, dir, t } = useLang()
  const c = t.contact
  const [ref, seen] = useInView(0.15)

  return (
    <section id={id} ref={ref} className={`contact ${seen ? 'contact-seen' : ''}`} data-lang={lang} dir={dir}>
      <div className="contact-glow" aria-hidden="true" />

      <div className="contact-inner">
        <SitefyMark className="contact-mark" gradient={false} title="" />
        <p className="contact-eyebrow">
          <i aria-hidden="true" />
          {c.eyebrow}
          <i aria-hidden="true" />
        </p>
        <h2 className="contact-title">{c.title}</h2>
        <p className="contact-text">{c.text}</p>

        <a
          className="contact-number"
          href={`tel:${SITE.phone}`}
          dir="ltr"
          aria-label={`${c.callLabel}: ${SITE.phoneDisplay}`}
        >
          <span className="contact-ring" aria-hidden="true">
            <Icon name="phone" />
          </span>
          {SITE.phoneDisplay}
        </a>

        <div className="contact-buttons">
          <a className="contact-primary" href={`tel:${SITE.phone}`}>
            <Icon name="phone" />
            {c.call}
          </a>
          <a
            className="contact-whatsapp"
            href={`https://wa.me/${SITE.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" />
            {c.whatsapp}
          </a>
        </div>
        <p className="contact-note">{c.note}</p>

        <div className="contact-more">
          <a className="contact-mail" href={`mailto:${SITE.email}`} dir="ltr">
            <Icon name="mail" />
            {SITE.email}
          </a>
          <span className="contact-sep" aria-hidden="true" />
          <span className="contact-follow">{c.follow}</span>
          <span className="contact-socials">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon name="instagram" />
            </a>
            <a href={SITE.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Icon name="tiktok" />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Icon name="facebook" />
            </a>
          </span>
        </div>
      </div>

      <Footer />
    </section>
  )
}
