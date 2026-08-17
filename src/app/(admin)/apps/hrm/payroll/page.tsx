import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import PayRollTable from './components/PayRollTable'

export const metadata: Metadata = { title: 'Payroll' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Payroll" subtitle="HRM" />
      <Row>
        <Col xs={12}>
          <PayRollTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
