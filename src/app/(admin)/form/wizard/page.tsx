import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import BasicWizard from './components/BasicWizard'

export const metadata: Metadata = { title: 'Form Wizard' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Wizard" subtitle="Forms" />
      <Row className="justify-content-center">
        <Col xs={12}>
          <BasicWizard />
        </Col>
      </Row>
    </>
  )
}

export default Page
