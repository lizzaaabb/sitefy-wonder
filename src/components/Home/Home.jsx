// The landing page, top to bottom. Every section lives in src/components/<Name>/<Name>.jsx + .css
import Header from '@/components/Header/Header'
import Landing from '@/components/Landing/Landing'
import Brands from '@/components/Brands/Brands'
import Vs from '@/components/Vs/Vs'
import Experience from '@/components/Experience/Experience'
import Contact from '@/components/Contact/Contact'
import { LanguageProvider } from '@/i18n/LanguageContext'

export default function Home({ lang }) {
  return (
    <LanguageProvider initialLang={lang}>
      <main>
        <Header />
        <Landing />
        <Brands />
        <Vs />
        <Experience />
        <Contact /> {/* the Footer is inside Contact */}
      </main>
    </LanguageProvider>
  )
}
