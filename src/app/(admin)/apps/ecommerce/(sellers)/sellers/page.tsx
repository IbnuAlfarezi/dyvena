import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import SellerTable from './components/SellerTable'

export const metadata: Metadata = { title: 'Sellers' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Sellers" subtitle="Ecommerce" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <SellerTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
