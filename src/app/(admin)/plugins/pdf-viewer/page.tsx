import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Container, Row } from 'react-bootstrap'
import PdfView from './components/PdfView'

export const metadata: Metadata = { title: 'Pdf Viewer' }

const Page = () => {
  return (
    <Container fluid>
      <PageBreadcrumb title="PDF Viewer" subtitle="Plugins" />

      <Row>
        <Col xs={12}>
          <PdfView />
        </Col>
      </Row>
    </Container>
  )
}

export default Page
