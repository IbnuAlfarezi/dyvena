import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import GoogleMap from './components/GoogleMap'

export const metadata: Metadata = { title: 'Google Maps' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Google" subtitle="Maps" />
      <Row>
        <GoogleMap />
      </Row>
    </>
  )
}

export default Page
