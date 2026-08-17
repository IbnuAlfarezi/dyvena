import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import EmailDetails from './components/EmailDetails'

export const metadata: Metadata = { title: 'Email Details' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email Details" subtitle="Apps" />
      <div className="outlook-box gap-1 email-app">
        <EmailDetails />
      </div>
    </>
  )
}

export default Page
