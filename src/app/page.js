// The landing page, top to bottom. Every section lives in src/components/<Name>/<Name>.jsx + .css
import Header from '@/components/Header/Header'
import Landing from '@/components/Landing/Landing'
import Brands from '@/components/Brands/Brands'
import Vs from '@/components/Vs/Vs'
import Experience from '@/components/Experience/Experience'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  return (
    <main>
      <Header />
      <Landing />
      <Brands />
      <Vs />
      <Experience />
      <Contact /> {/* the Footer is inside Contact */}
    </main>
  )
}
