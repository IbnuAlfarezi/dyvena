import PageBreadcrumb from '@/components/PageBreadcrumb'
import { type Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ProductStats from './components/ProductStats'
import ProductsListing from './components/ProductsListing'
import { statData } from './components/data'

export const metadata: Metadata = { title: 'Products' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Products" subtitle="Ecommerce" />
      <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-1 align-items-center g-1">
        {statData.map((stat, idx) => {
          return (
            <Col key={idx}>
              <ProductStats stat={stat} />
            </Col>
          )
        })}
      </Row>

      <ProductsListing />
    </>
  )
}

export default Page
