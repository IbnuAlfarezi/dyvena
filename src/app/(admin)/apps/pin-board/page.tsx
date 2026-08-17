import PageBreadcrumb from '@/components/PageBreadcrumb'
import { type Metadata } from 'next'
import PinboardPage from './components/PinboardPage'

export const metadata: Metadata = { title: 'Pin Board' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pin Board" subtitle="Apps" />
      <PinboardPage />
    </>
  )
}

export default Page
