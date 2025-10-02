import { notFound } from 'next/navigation'
import BrandingOGClient from './BrandingOGClient'

export default function BrandingOGPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound()
  }
  return <BrandingOGClient />
}


