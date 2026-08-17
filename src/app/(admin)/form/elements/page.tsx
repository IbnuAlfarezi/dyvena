import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ChecksRadiosSwitches from './components/ChecksRadiosSwitches'
import FloatingLabels from './components/FloatingLabels'
import InputGroups from './components/InputGroups'
import InputSizes from './components/InputSizes'
import InputTextFieldType from './components/InputTextFieldType'
import InputType from './components/InputType'

export const metadata: Metadata = { title: 'Form Elements' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Basic Elements" subtitle="Forms" />

      <Row>
        <Col xl={12}>
          <InputTextFieldType />

          <InputType />

          <InputGroups />

          <FloatingLabels />

          <InputSizes />

          <ChecksRadiosSwitches />
        </Col>
      </Row>
    </>
  )
}

export default Page
