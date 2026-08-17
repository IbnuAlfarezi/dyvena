import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import AttributeTable from './components/AttributeTable'

export const metadata: Metadata = { title: 'Manage Attributes' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Manage Attributes" subtitle="Ecommerce" />
      <Row>
        <Col xs={12}>
          <AttributeTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
