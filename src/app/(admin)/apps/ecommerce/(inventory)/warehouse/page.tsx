import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import WarehouseTable from './components/WarehouseTable'

export const metadata: Metadata = { title: 'Warehouse' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Warehouse" subtitle="Ecommerce" />
      <Row>
        <Col xs={12}>
          <WarehouseTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
