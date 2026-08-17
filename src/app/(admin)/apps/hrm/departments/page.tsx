import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import DepartmentTable from './components/DepartmentTable'

export const metadata: Metadata = { title: 'Departments' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Departments" subtitle="HRM" />
      <Row>
        <Col xs={12}>
          <DepartmentTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
