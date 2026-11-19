import Home from '@/components/Home/Home'
import { pageMetadata } from '@/i18n/routes'

export const metadata = pageMetadata('ka')

export default function Page() {
  return <Home lang="ka" />
}
