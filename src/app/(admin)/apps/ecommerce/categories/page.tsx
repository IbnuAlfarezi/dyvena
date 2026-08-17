import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import CategoryTable from './components/CategoryTable'

export const metadata: Metadata = { title: 'Categories' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Categories" subtitle="Ecommerce" />

      <Row>
        <Col xs={12}>
          <CategoryTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
