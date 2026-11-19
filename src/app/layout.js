import { Cormorant_Garamond, Montserrat, Noto_Kufi_Arabic } from 'next/font/google'
import { preload } from 'react-dom'
import './globals.css'

// Latin text (EN), Arabic text (AR) and the serif accent. Georgian uses FiraGO (globals.css).
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-montserrat',
})
const kufi = Noto_Kufi_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600'], variable: '--font-kufi' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

export const metadata = {
  title: 'Sitefy — შექმენი მეტი, ვიდრე უბრალოდ ვებსაიტი',
  description: 'აჩუქე მომხმარებელს დაუვიწყარი გამოცდილება.',
}

export default function RootLayout({ children }) {
  // load fonts and photos right away, so nothing "pops in" (flickers) while the page loads
  for (const f of ['Regular', 'Medium', 'SemiBold']) {
    preload(`/fonts/FiraGO-${f}.woff`, { as: 'font', type: 'font/woff', crossOrigin: 'anonymous' })
  }
  preload('/images/vs-aurelia.jpg', { as: 'image', fetchPriority: 'low' })
  return (
    <html
      lang="ka"
      className={`${montserrat.variable} ${kufi.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  )
}
