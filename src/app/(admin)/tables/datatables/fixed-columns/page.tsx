import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Table from './components/Table'

export const metadata: Metadata = { title: 'Fixed Columns' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Fixed Columns" subtitle="Datatables" />
      <Row>
        <Col xs={12}>
          <Table />
        </Col>
      </Row>
    </>
  )
}

export default Page
