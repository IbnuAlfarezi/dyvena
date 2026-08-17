import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import PasswordMeters from './components/PasswordMeters'

export const metadata: Metadata = { title: 'Password Meter' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Password Meter" subtitle="Plugins" />
      <PasswordMeters />
    </>
  )
}

export default Page
