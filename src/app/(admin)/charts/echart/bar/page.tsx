import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Charts from './components/Charts'

export const metadata: Metadata = { title: 'EChart Bar Chart' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Bar Echart" subtitle="Charts" />
      <Charts />
    </>
  )
}

export default Page
