import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Col, Row } from 'react-bootstrap'

import { Metadata } from 'next'
import Animations from './components/Animations'

export const metadata: Metadata = { title: 'Animation' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Animation" subtitle="Plugins" />

      <Row className="justify-content-center">
        <Col xs={12}>
          <Animations />
        </Col>
      </Row>
    </>
  )
}

export default Page
