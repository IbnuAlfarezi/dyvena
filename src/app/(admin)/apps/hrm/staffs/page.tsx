import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import StaffTable from './components/StaffTable'

export const metadata: Metadata = { title: 'Staffs List' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Staffs" subtitle="HRM" />
      <Row>
        <Col xs={12}>
          <StaffTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
