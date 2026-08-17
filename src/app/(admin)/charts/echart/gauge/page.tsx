import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Gauges from './components/Gauges'

export const metadata: Metadata = { title: 'EChart Gauge Chart' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gauge Echart" subtitle="Charts" />
      <Gauges />
    </>
  )
}

export default Page
