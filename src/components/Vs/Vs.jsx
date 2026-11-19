'use client'

// "Ordinary vs Sitefy": the same hotel shown as an ordinary site (left) and a
// Sitefy site (right). Drag the line (or use the slider) to compare them.
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '@/i18n/LanguageContext'
import useInView from '@/hooks/useInView'
import SitefyMark from '@/components/SitefyMark/SitefyMark'
import './Vs.css'

// Georgian letters -> Mtavruli (capital) letters, for the "ordinary" site's look
const toMtavruli = (s) => String(s).replace(/[ა-ჺჽ-ჿ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 3008))

const DEMO_STEPS = [28, 48, 14, 28] // the line moves by itself once, so people see it can be dragged

export default function Vs({ id = 'difference' }) {
  const { lang, dir, t } = useLang()
  const c = t.compare
  const [sectionRef, seen] = useInView(0.2)
  const screenRef = useRef(null)
  const [pos, setPos] = useState(28) // line position, %
  const [touched, setTouched] = useState(false)
  const dragging = useRef(false)
  const windowRef = useRef(null)
  const tiltFrame = useRef(0)
  const [asleep, setAsleep] = useState(false)

  // looping animations rest while the section is off-screen
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setAsleep(!e.isIntersecting), { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [sectionRef])

  // vs-final: the line position is written straight onto the screen element (no re-render per frame)
  const posRef = useRef(28)
  const demoFrame = useRef(0)
  const applyPos = useCallback((p) => {
    const el = screenRef.current
    if (!el) return
    posRef.current = p
    el.style.setProperty('--pos', `${p}%`)
    el.style.setProperty('--px', `${(el.clientWidth * p) / 100}px`)
  }, [])
  useLayoutEffect(() => applyPos(pos), [pos, applyPos])
  useEffect(() => {
    const el = screenRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => applyPos(posRef.current))
    ro.observe(el)
    return () => ro.disconnect()
  }, [applyPos])

  // demo move, until the visitor touches it: one smooth glide 28 -> 48 -> 14 -> 28
  useEffect(() => {
    if (!seen || touched || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const SEG = 1150 // ms per move
    const REST = 250 // ms pause between moves
    const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
    let start = 0
    const total = (DEMO_STEPS.length - 1) * (SEG + REST)
    const tick = (now) => {
      if (!start) start = now + 900 // wait until the entrance has settled
      const t = now - start
      if (t < 0) return (demoFrame.current = requestAnimationFrame(tick))
      if (t >= total) return setPos(DEMO_STEPS[DEMO_STEPS.length - 1])
      const i = Math.floor(t / (SEG + REST))
      const k = Math.min(1, (t - i * (SEG + REST)) / SEG)
      const a = DEMO_STEPS[i], b = DEMO_STEPS[i + 1]
      applyPos(a + (b - a) * ease(k))
      demoFrame.current = requestAnimationFrame(tick)
    }
    demoFrame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(demoFrame.current)
  }, [seen, touched, applyPos])

  const moveTo = useCallback((clientX) => {
    const box = screenRef.current.getBoundingClientRect()
    setPos(Math.max(2, Math.min(98, ((clientX - box.left) / box.width) * 100)))
  }, [])

  const onDown = (e) => {
    dragging.current = true
    setTouched(true)
    screenRef.current.setPointerCapture?.(e.pointerId)
    moveTo(e.clientX)
  }
  const onMove = (e) => {
    const box = screenRef.current.getBoundingClientRect()
    screenRef.current.style.setProperty('--mx', `${((e.clientX - box.left) / box.width) * 100}%`)
    screenRef.current.style.setProperty('--my', `${((e.clientY - box.top) / box.height) * 100}%`)
    if (dragging.current) moveTo(e.clientX)
  }
  const onUp = () => (dragging.current = false)

  // the window tilts a little after the mouse (set straight on the element, no re-render)
  const setTilt = (x, y) => {
    cancelAnimationFrame(tiltFrame.current)
    tiltFrame.current = requestAnimationFrame(() => {
      windowRef.current?.style.setProperty('--tx', `${x}px`)
      windowRef.current?.style.setProperty('--ty', `${y}px`)
    })
  }
  const onStageMove = (e) => {
    if (e.pointerType !== 'mouse' || dragging.current) return
    const box = e.currentTarget.getBoundingClientRect()
    setTilt(((e.clientX - box.left) / box.width - 0.5) * 10, ((e.clientY - box.top) / box.height - 0.5) * 6)
  }

  return (
    <section id={id} ref={sectionRef} className={`vs ${seen ? 'vs-seen' : ''} ${asleep ? 'vs-asleep' : ''}`} data-lang={lang} dir={dir}>
      <div className="vs-silk" aria-hidden="true" />

      <div className="vs-head">
        <h2 className="vs-title">
          <span>{c.vsLeft}</span>
          <em>{c.vs}</em>
          <span className="vs-brand-word">Sitefy</span>
        </h2>
        <p className="vs-sub">{c.sub}</p>
      </div>

      <div className="vs-wrap">
        <div className="vs-stage" onPointerMove={onStageMove} onPointerLeave={() => setTilt(0, 0)}>
          <div ref={windowRef} className={`vs-window ${touched ? 'vs-touched' : ''}`} dir="ltr">
            {/* browser bar */}
            <div className="vs-bar">
              <span className={`vs-side ${pos > 50 ? 'vs-side-on' : ''}`}>{c.vsLeft}</span>
              <span className="vs-address">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="11" width="12" height="9" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 11V8a3 3 0 0 1 6 0v3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                aurelia.ge
              </span>
              <span className={`vs-side vs-side-r ${pos <= 50 ? 'vs-side-on' : ''}`}>
                <SitefyMark gradient={false} title="" />
                Sitefy
              </span>
            </div>

            <div
              ref={screenRef}
              className="vs-screen"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            >
              <RichSite c={c} dir={dir} />
              <PlainSite c={c} dir={dir} />

              <div className="vs-line" aria-hidden="true">
                <span className="vs-knob">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M9.5 7 5 12l4.5 5M14.5 7 19 12l-4.5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* keyboard / screen-reader control */}
              <input
                className="vs-range"
                type="range"
                min="2"
                max="98"
                value={Math.round(pos)}
                onChange={(e) => {
                  setTouched(true)
                  setPos(Number(e.target.value))
                }}
                aria-label={c.hint}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="vs-hint">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M8 8 4 12l4 4M16 8l4 4-4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {c.hint}
      </p>
    </section>
  )
}

// right side: the Sitefy version of the hotel site
function RichSite({ c, dir }) {
  return (
    <div className="vs-rich" dir={dir} aria-hidden="true">
      <div className="vs-photo" />
      <div className="vs-shade" />
      <div className="vs-grain" />
      <p className="vs-giant">AURELIA</p>

      <div className="vs-r-nav">
        <span className="vs-r-logo">
          <i />
          AURELIA
        </span>
        <span className="vs-r-book">{c.richBtn}</span>
      </div>

      <div className="vs-r-lead">
        <span className="vs-r-since">{c.since}</span>
        <p className="vs-r-lead-title">{c.lead}</p>
        <p className="vs-r-lead-sub">{c.leadSub}</p>
      </div>

      <span className="vs-chip vs-chip1">
        <b>
          <svg viewBox="0 0 24 24">
            <path
              d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="12" r="2.6" fill="currentColor" />
          </svg>
        </b>
        {c.sea}
      </span>
      <span className="vs-chip vs-chip2">
        <b>
          <svg viewBox="0 0 24 24">
            <path
              d="M2 16c2.5 0 2.5-1.6 5-1.6S9.5 16 12 16s2.5-1.6 5-1.6S19.5 16 22 16M2 20c2.5 0 2.5-1.6 5-1.6S9.5 20 12 20s2.5-1.6 5-1.6S19.5 20 22 20M8 13V5a2 2 0 0 1 4 0M14 13V5a2 2 0 0 1 4 0M8 8h6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </b>
        {c.pool}
      </span>

      <div className="vs-stat vs-stat1">
        <span className="vs-stat-num">
          4.9<small>★</small>
        </span>
        <span className="vs-stat-text">{c.rating}</span>
      </div>
      <div className="vs-stat vs-stat2">
        <span className="vs-stat-num">
          120<small>m²</small>
        </span>
        <span className="vs-stat-text">{c.suite}</span>
      </div>

      <div className="vs-booking">
        <span className="vs-field">
          <small>{c.checkIn}</small>
          {c.dateIn}
        </span>
        <span className="vs-field">
          <small>{c.checkOut}</small>
          {c.dateOut}
        </span>
        <span className="vs-field">
          <small>{c.guests}</small>
          {c.guestsVal}
        </span>
        <span className="vs-go">{c.search}</span>
      </div>
    </div>
  )
}

// left side: the "ordinary" version
function PlainSite({ c, dir }) {
  return (
    <div className="vs-plain" dir={dir} aria-hidden="true">
      <div className="vs-p-nav">
        <span className="vs-p-logo">Aurelia Hotel</span>
        <span className="vs-p-links">
          {c.nav.map((item) => (
            <i key={item}>{toMtavruli(item)}</i>
          ))}
        </span>
      </div>
      <div className="vs-p-body">
        <div className="vs-p-copy">
          <p className="vs-p-h">{toMtavruli(c.plainHello)}</p>
          <p className="vs-p-p">{toMtavruli(c.plainText)}</p>
          <span className="vs-p-btn">{toMtavruli(c.plainBtn)}</span>
        </div>
        <div className="vs-p-img" />
      </div>
    </div>
  )
}
