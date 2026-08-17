import PageBreadcrumb from '@/components/PageBreadcrumb'
import { type Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import IssueTrackerTable from './components/IssueTrackerTable'

export const metadata: Metadata = { title: 'Issue List' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Issue List" subtitle="Apps" />
      <Row>
        <Col xs={12}>
          <IssueTrackerTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
