import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Example from './components/BasicTable'

export const metadata: Metadata = { title: 'Basic Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Basic" subtitle="Tables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Example />
        </Col>
      </Row>
    </>
  )
}

export default Page
