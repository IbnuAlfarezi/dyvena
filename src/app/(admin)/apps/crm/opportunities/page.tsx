import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import OpportunitiesTable from './components/opportunitiesTable'

export const metadata: Metadata = { title: 'CRM Opportunities' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Opportunities" subtitle="CRM" />

      <Row>
        <Col xs={12}>
          <OpportunitiesTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
