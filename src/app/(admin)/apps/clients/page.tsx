import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ClientsTable from './components/ClientsTable'

export const metadata: Metadata = { title: 'Clients' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Clients" subtitle="Apps" />

      <Row className="justify-content-center">
        <Col xs={12}>
          <ClientsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
