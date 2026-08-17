import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import Emails from './components/Emails'

export const metadata: Metadata = { title: 'Inbox (77)' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Email" subtitle="Apps" />
      <div className="outlook-box gap-1 email-app ">
        <Emails />
      </div>
    </>
  )
}

export default Page
