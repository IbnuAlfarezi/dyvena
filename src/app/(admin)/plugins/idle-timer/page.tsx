import { Col, Row } from 'react-bootstrap'

import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import IdleTracker from './components/IdleTracker'

export const metadata: Metadata = { title: 'Idle Timer' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Idle Timer" subtitle="Plugins" />

      <Row className="justify-content-center">
        <Col xs={12}>
          <IdleTracker />
        </Col>
      </Row>
    </>
  )
}

export default Page
