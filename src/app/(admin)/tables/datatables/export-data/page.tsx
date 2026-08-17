import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Table from './components/Table'

export const metadata: Metadata = { title: 'Export Data Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Export Data" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Table />
        </Col>
      </Row>
    </>
  )
}

export default Page
