import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Tasks from './components/Tasks'

export const metadata: Metadata = { title: 'Tasks' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tasks" subtitle="Apps" />
      <Row>
        <Col xs={12}>
          <Tasks />
        </Col>
      </Row>
    </>
  )
}

export default Page
