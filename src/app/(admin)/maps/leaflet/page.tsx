import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import LeaFletMap from './components/LeaFletMap'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Leaflet Maps' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Leaflet" subtitle="Maps" />
      <Row>
        <LeaFletMap />
      </Row>
    </>
  )
}

export default Page
