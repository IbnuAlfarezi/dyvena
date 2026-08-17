import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import FixHeader from './components/FixHeader'

export const metadata: Metadata = { title: 'Fixed Header Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Fixed Header" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <FixHeader />
        </Col>
      </Row>
    </>
  )
}

export default Page
