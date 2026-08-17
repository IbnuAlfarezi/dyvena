import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Example from './components/SelectTable'

export const metadata: Metadata = { title: 'Checkbox Select Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Checkbox Select" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Example />
        </Col>
      </Row>
    </>
  )
}

export default Page
