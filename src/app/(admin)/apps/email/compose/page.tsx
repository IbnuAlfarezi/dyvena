import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import NewEmail from './component/NewEmail'

export const metadata: Metadata = { title: 'New Email (Compose)' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email" subtitle="Apps" />
      <div className="outlook-box gap-1 email-app">
        <NewEmail />
      </div>
    </>
  )
}

export default Page
