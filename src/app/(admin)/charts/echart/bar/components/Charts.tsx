'use client'
import dynamic from 'next/dynamic'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
const BasicBarChart = dynamic(() => import('./BarChart').then((m) => m.BasicBarChart), { ssr: false })
const GradientBarChart = dynamic(() => import('./BarChart').then((m) => m.GradientBarChart), { ssr: false })
const HoriBarChart = dynamic(() => import('./BarChart').then((m) => m.HoriBarChart), { ssr: false })
const HorizontalStackedBar = dynamic(() => import('./BarChart').then((m) => m.HorizontalStackedBar), { ssr: false })
const MixdedBarChart = dynamic(() => import('./BarChart').then((m) => m.MixdedBarChart), { ssr: false })
const NegativeChart = dynamic(() => import('./BarChart').then((m) => m.NegativeChart), { ssr: false })
const ProgressBar = dynamic(() => import('./BarChart').then((m) => m.ProgressBar), { ssr: false })
const RaceBarChart = dynamic(() => import('./BarChart').then((m) => m.RaceBarChart), { ssr: false })
const SeriesBarChart = dynamic(() => import('./BarChart').then((m) => m.SeriesBarChart), { ssr: false })
const StackedBarChart = dynamic(() => import('./BarChart').then((m) => m.StackedBarChart), { ssr: false })
const TimelineBarChart = dynamic(() => import('./BarChart').then((m) => m.TimelineBarChart), { ssr: false })
const TwobarChart = dynamic(() => import('./BarChart').then((m) => m.TwobarChart), { ssr: false })

const Charts = () => {
  return (
    <Row>
      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Basic Bar Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <BasicBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Two Bar Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <TwobarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Progress Bar Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <ProgressBar />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Horizontal Bar Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <HoriBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Negative Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <NegativeChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Bar Chart with Series
            </CardTitle>
          </CardHeader>
          <CardBody>
            <SeriesBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Stacked Bar
            </CardTitle>
          </CardHeader>
          <CardBody>
            <StackedBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Horizontal Stacked Bar
            </CardTitle>
          </CardHeader>
          <CardBody>
            <HorizontalStackedBar />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Bar Race Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <RaceBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Bar Gradient Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <GradientBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={6}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Mixded Bar Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <MixdedBarChart />
          </CardBody>
        </Card>
      </Col>

      <Col xl={12}>
        <Card>
          <CardHeader>
            <CardTitle as={'h4'} className="mb-0">
              Timeline Bar Chart
            </CardTitle>
          </CardHeader>
          <CardBody>
            <TimelineBarChart />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Charts
