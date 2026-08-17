import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import CustomerTable from './components/CustomerTable'

export const metadata: Metadata = { title: 'CRM Customers' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Customers" subtitle="CRM" />
      <Row>
        <Col xs={12}>
          <CustomerTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
