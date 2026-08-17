import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import RenderingTable from './components/RenderingTable'

export const metadata: Metadata = { title: 'Data Rendering Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Data Rendering" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <RenderingTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
