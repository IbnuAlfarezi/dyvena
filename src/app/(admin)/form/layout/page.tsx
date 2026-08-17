import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import LayoutForm from './components/LayoutForm'

export const metadata: Metadata = { title: `Forms Layout` }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Layouts" subtitle="Forms" />

      <Row>
        <Col lg={12}>
          <LayoutForm />
        </Col>
      </Row>
    </>
  )
}

export default Page
