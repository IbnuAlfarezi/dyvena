import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ProductStockTable from './components/ProductStockTable'

export const metadata: Metadata = { title: 'Product Stocks' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Stocks" subtitle="Ecommerce" />
      <Row>
        <Col xs={12}>
          <ProductStockTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
