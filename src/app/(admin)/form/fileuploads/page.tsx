import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import Dropzone from './components/Dropzone'
import FilePondUploader from './components/FilePondUploader'

export const metadata: Metadata = { title: `File Uploads` }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="File Uploads" subtitle="Forms" />

      <Row>
        <Col xs={12}>
          <Dropzone />
          <FilePondUploader />
        </Col>
      </Row>
    </>
  )
}

export default Page
