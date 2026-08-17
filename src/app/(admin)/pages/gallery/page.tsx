import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Card, Col, Row } from 'react-bootstrap'
import Gallery from './components/Gallery'

export const metadata: Metadata = { title: 'Gallery' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Gallery" subtitle="Miscellaneous" />

      <Row>
        <Col xs={12}>
          <Card>
            <Gallery />
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Page
