import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import DiscountTable from './components/DiscountTable'

export const metadata: Metadata = { title: 'Discounts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Discounts" subtitle="Promo" />
      <Row>
        <Col xs={12}>
          <DiscountTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
