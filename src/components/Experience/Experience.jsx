'use client'

// "What your customers will feel": a glowing wave with 3 points (delight, inspiration, trust)
import { useLang } from '@/i18n/LanguageContext'
import useInView from '@/hooks/useInView'
import Galaxy from '@/components/Galaxy/Galaxy'
import './Experience.css'

// the wave (viewBox 1000 x 360) and where the 3 points sit on it
const WAVE =
  'M-20 305 C11.7 298.8 83.3 286.3 170 268 C256.7 249.7 390.0 193.3 500 195 C610.0 196.7 743.3 273.5 830 278 C916.7 282.5 988.3 231.3 1020 222'
const POINTS = [
  [170, 268],
  [500, 195],
  [830, 278],
]

export default function Experience({ id = 'experience' }) {
  const { lang, dir, t } = useLang()
  const f = t.feel
  const [ref, seen] = useInView(0.2)

  return (
    <section id={id} ref={ref} className={`experience ${seen ? 'experience-seen' : ''}`} data-lang={lang} dir={dir}>
      <div className="experience-bg" aria-hidden="true" />

      <div className="experience-head">
        <p className="experience-eyebrow">
          <i aria-hidden="true" />
          {f.eyebrow}
          <i aria-hidden="true" />
        </p>
        <h2 className="experience-title">{f.title}</h2>
      </div>

      <div className="experience-card" dir="ltr">
        {/* moving stars inside the card, behind the wave and the texts */}
        <div className="experience-particles" aria-hidden="true">
          <Galaxy
            density={1}
            glowIntensity={0.3}
            flareIntensity={1}
            starSpeed={0.5}
            mouseRepulsion={false}
            clickWarp
            starColors={[]}
            hueShift={140}
            saturation={0}
            starSize={1}
            twinkleIntensity={0.3}
            speed={1}
            rotationSpeed={0.1}
            layers={3}
            direction="forward"
            repulsionStrength={2}
            mouseInteraction
            intro
            lightMode={false}
            dpr={1}
          />
        </div>
        <span className="experience-edge" aria-hidden="true" />

        <svg className="experience-wave" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sfWave" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.25" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
              <stop offset="0.75" stopColor="#fff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sfVeil" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.09" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className="experience-veil" d={`${WAVE} L1020 360 L-20 360 Z`} fill="url(#sfVeil)" />
          <path className="experience-wave-glow" d={WAVE} />
          <path className="experience-wave-line" d={WAVE} />
        </svg>

        <ol className="experience-points">
          {f.items.map((item, i) => {
            const [x, y] = POINTS[i]
            return (
              <li
                key={item.k}
                className="experience-point"
                style={{ left: `${x / 10}%`, bottom: `${((360 - y) / 360) * 100}%`, '--d': `${0.9 + i * 0.25}s` }}
                dir={dir}
              >
                <div className="experience-copy">
                  <span className="experience-num">{item.k}</span>
                  <span className="experience-tick" aria-hidden="true" />
                  <h3 className="experience-word">{item.title}</h3>
                  <p className="experience-lead">{item.lead}</p>
                  <p className="experience-text">{item.text}</p>
                </div>
                <span className="experience-stem" aria-hidden="true" />
                <span className="experience-dot" aria-hidden="true" />
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
