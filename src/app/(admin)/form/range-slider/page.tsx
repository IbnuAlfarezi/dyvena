import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import RangeSlider from './components/RangeSlider'

export const metadata: Metadata = { title: `Range Slider` }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Range Slider" subtitle="Forms" />

      <Row>
        <Col xs={12}>
          <RangeSlider />
        </Col>
      </Row>
    </>
  )
}

export default Page
