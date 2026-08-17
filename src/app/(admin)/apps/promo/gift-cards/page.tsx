import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import CardTable from './components/CardTable'

export const metadata: Metadata = { title: 'Gift Cards' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gift Cards" subtitle="Promo" />
      <Row>
        <Col xs={12}>
          <CardTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
