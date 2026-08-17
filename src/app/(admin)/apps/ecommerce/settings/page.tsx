import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ShopSettings from './components/ShopSettings'

export const metadata: Metadata = { title: 'Shop Settings' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Shop Settings" subtitle="Ecommerce" />
      <Row>
        <Col>
          <ShopSettings />
        </Col>
      </Row>
    </>
  )
}

export default Page
