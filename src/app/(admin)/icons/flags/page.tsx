import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Flags from './components/Flags'

export const metadata: Metadata = { title: 'Flags' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Flags" subtitle="Icons" />
      <Row>
        <Col xs={12}>
          <Flags />
        </Col>
      </Row>
    </>
  )
}

export default Page
