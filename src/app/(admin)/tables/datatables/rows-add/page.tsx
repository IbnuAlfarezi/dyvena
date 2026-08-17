import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import RowAdd from './components/RowAdd'

export const metadata: Metadata = { title: 'Add New Row Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Rows" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <RowAdd />
        </Col>
      </Row>
    </>
  )
}

export default Page
