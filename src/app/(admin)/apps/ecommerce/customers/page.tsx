import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import CustomerTable from './components/CustomerTable'

export const metadata: Metadata = { title: 'Customers' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Customers" subtitle="Ecommerce" />

      <Row className="justify-content-center">
        <Col xxl={12}>
          <CustomerTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
