import Home from '@/components/Home/Home'
import { pageMetadata } from '@/i18n/routes'

export const metadata = pageMetadata('ar')

export default function Page() {
  return <Home lang="ar" />
}
