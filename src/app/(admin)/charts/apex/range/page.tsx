import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { BasicRangeArea, ComboRangeArea } from './components/RangeChart'

export const metadata: Metadata = { title: 'Range Apexcharts' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Range Apexcharts" subtitle="Charts" />
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Basic Range Area</CardTitle>
            </CardHeader>
            <CardBody>
              <div dir="ltr">
                <BasicRangeArea />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6}>
          <Card>
            <CardHeader>
              <CardTitle as={'h4'}>Range Area With Line</CardTitle>
            </CardHeader>
            <CardBody>
              <div dir="ltr">
                <ComboRangeArea />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Page
