import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Detail from './components/Detail'

export const metadata: Metadata = { title: 'Add Staff' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Staff" subtitle="HRM" />
      <Row>
        <Col xs={12}>
          <Detail />
        </Col>
      </Row>
    </>
  )
}

export default Page
