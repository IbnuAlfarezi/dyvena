import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import AjaxTable from './components/AjaxTable'

export const metadata: Metadata = { title: 'Ajax DataTables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Ajax" subtitle="DataTables" />

      <Row className="justify-content-center">
        <Col xs={12}>
          <AjaxTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
