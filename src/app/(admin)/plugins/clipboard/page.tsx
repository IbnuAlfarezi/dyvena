import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Clipboard from './components/Clipboard'

export const metadata: Metadata = { title: 'Clipboard' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Clipboard" subtitle="Plugins" />

      <Row className="justify-content-center">
        <Col lg={12}>
          <Clipboard />
        </Col>
      </Row>
    </>
  )
}

export default Page
