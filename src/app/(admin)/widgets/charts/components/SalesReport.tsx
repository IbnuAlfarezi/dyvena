'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import { Card, CardBody, CardHeader, CardTitle, Col, Nav, NavItem, NavLink, Row, TabContainer } from 'react-bootstrap'
import { salesReportData } from './data'

const getSalesReportChart = (): ApexOptions => ({
  series: [
    {
      name: 'Total Revenue',
      type: 'area',
      data: [21, 21, 21, 35, 35, 35, 44, 44, 44, 54, 54, 54, 48, 48, 76, 76, 95, 95, 76, 76, 32, 32, 46, 48, 48],
    },
    {
      name: 'Orders',
      type: 'line',
      data: [40, 40, 40, 50, 50, 35, 27, 27, 27, 15, 15, 27, 27, 36, 36, 33, 33, 34, 35, 33, 50, 50, 55, 55, 55],
    },
  ],
  chart: {
    type: 'line',
    height: 348,
    toolbar: {
      show: false,
    },
    offsetX: 0,
  },
  stroke: {
    width: [3, 2],
    curve: 'smooth',
    dashArray: [0, 8],
  },
  colors: [getColor('chart-secondary'), getColor('chart-gamma')],
  grid: {
    strokeDashArray: 7,
  },
  xaxis: {
    axisBorder: {
      show: false,
    },
    labels: {
      offsetY: 2,
    },
  },
  yaxis: {
    tickAmount: 4,
    min: 0,
    max: 100,
    labels: {
      show: true,
      formatter: function (value) {
        return value + 'k'
      },
      offsetX: -10,
    },
    axisBorder: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy',
    },
    y: {
      formatter: function (val) {
        return '$' + val + 'k'
      },
    },
  },
  fill: {
    opacity: [1, 0.5],
    type: ['gradient', 'solid'],
    gradient: {
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
})

const SalesReport = () => {
  return (
    <>
      <Card className="card-h-100">
        <TabContainer defaultActiveKey="monthly">
          <CardHeader className="border-dashed card-tabs">
            <div className="flex-grow-1">
              <CardTitle as="h4">
                Sales Report <span className="text-muted fs-base fw-normal">(25822 Orders)</span>
              </CardTitle>
            </div>
            <Nav className="nav-tabs nav-justified card-header-tabs nav-bordered">
              <NavItem>
                <NavLink eventKey={'today'}>
                  <span className="d-md-none d-block">1D</span>
                  <span className="d-none d-md-block">Today</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink eventKey={'monthly'}>
                  <span className="d-md-none d-block">1M</span>
                  <span className="d-none d-md-block">Monthly</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink eventKey={'annual'}>
                  <span className="d-md-none d-block">1Y</span>
                  <span className="d-none d-md-block">Annual</span>
                </NavLink>
              </NavItem>
            </Nav>
          </CardHeader>
          <CardBody className="p-0">
            <div className="bg-light bg-opacity-25 border-bottom border-dashed">
              <Row className="text-center">
                {salesReportData.map((item, idx) => (
                  <Col sm={4} key={idx}>
                    <p className="text-muted mt-3 mb-1">{item.title}</p>
                    <h4 className="mb-3">
                      <Icon icon={item.icon} className="text-success me-1" />
                      <span>
                        <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
                      </span>
                    </h4>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="p-3 pt-1">
              <div className="dash-item-overlay d-none d-md-block" dir="ltr">
                <h5>Today&apos;s Earning: $8,975.30</h5>
                <p className="text-muted mb-0 mt-2">Property PS007 is not receiving hits. Either your site is not receiving any sessions.</p>
              </div>
              <ApexChart getOptions={getSalesReportChart} series={getSalesReportChart().series} type="line" height={348} />
            </div>
          </CardBody>
        </TabContainer>
      </Card>
    </>
  )
}

export default SalesReport
