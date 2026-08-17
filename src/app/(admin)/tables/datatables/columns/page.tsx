import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Example from './components/ColumnTable'

export const metadata: Metadata = { title: 'Show & Hide Columns Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Show & Hide Columns" subtitle="Datatables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Example />
        </Col>
      </Row>
    </>
  )
}

export default Page
