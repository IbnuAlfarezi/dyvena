import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ProductReviews from './components/ProductReviews'

export const metadata: Metadata = { title: 'Reviews' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Reviews" subtitle="Ecommerce" />
      <Row>
        <Col xxl={12}>
          <ProductReviews />
        </Col>
      </Row>
    </>
  )
}

export default Page
