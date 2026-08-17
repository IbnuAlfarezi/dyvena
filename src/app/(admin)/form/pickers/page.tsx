import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ColorPicker from './components/ColorPicker'
import DataPicker from './components/DataPicker'
import Flatpickr from './components/Pickers'

export const metadata: Metadata = { title: 'Form Picker' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pickers" subtitle="Forms" />

      <Row>
        <Col lg={12}>
          <Flatpickr />

          <DataPicker />

          <ColorPicker />
        </Col>
      </Row>
    </>
  )
}

export default Page
