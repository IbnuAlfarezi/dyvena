import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import BrowserDefault from './components/BrowserDefault'
import CustomValidation from './components/CustomValidation'
import ServerSide from './components/ServerSide'
import SupportedElement from './components/SupportedElement'
import Tooltips from './components/Tooltips'

export const metadata: Metadata = { title: 'Form Validation' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Validation" subtitle="Forms" />

      <Row>
        <Col lg={12}>
          <CustomValidation />

          <Tooltips />

          <ServerSide />

          <SupportedElement />

          <BrowserDefault />
        </Col>
      </Row>
    </>
  )
}

export default Page
