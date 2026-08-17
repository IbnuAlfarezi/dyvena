import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import JsTable from './components/JsTable'

export const metadata: Metadata = { title: 'Javascript Source Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Javascript Source" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <JsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
