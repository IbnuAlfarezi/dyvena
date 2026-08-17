import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Invoices from './components/Invoices'

export const metadata: Metadata = { title: 'Invoices' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Invoice" subtitle="Invoices" />

      <Row>
        <Col xs={12}>
          <Invoices />
        </Col>
      </Row>
    </>
  )
}

export default Page
