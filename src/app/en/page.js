import Home from '@/components/Home/Home'
import { pageMetadata } from '@/i18n/routes'

export const metadata = pageMetadata('en')

export default function Page() {
  return <Home lang="en" />
}
