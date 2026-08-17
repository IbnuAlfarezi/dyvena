import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ProductViewsTable from './components/ProductViewsTable'

export const metadata: Metadata = { title: 'Product Views' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Product Views" subtitle="Ecommerce" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <ProductViewsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
