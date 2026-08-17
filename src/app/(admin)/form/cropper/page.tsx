import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import FormCropper from './components/FormCropper'

export const metadata: Metadata = { title: 'Image Cropper' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Image Cropper" subtitle="Forms" />
      <Row>
        <Col xs={12}>
          <FormCropper />
        </Col>
      </Row>
    </>
  )
}

export default Page
