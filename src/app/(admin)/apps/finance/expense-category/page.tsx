import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import CategoryTable from './components/CategoryTable'

export const metadata: Metadata = { title: 'Expense Categories' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Expense Categories" subtitle="Finance" />
      <Row>
        <Col xs={12}>
          <CategoryTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
