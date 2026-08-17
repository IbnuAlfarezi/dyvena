'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap'
import { overviewData as initialOverviewData } from './data'

const getDashRevenueChart = (series: { name: string; type: string; data: number[] }[]): ApexOptions => ({
  series,
  chart: {
    type: 'line',
    height: 324,
    toolbar: { show: false },
    offsetX: 0,
  },

  stroke: {
    width: [2, 2, 0, 0],
    curve: 'smooth',
    dashArray: [0, 4, 0, 0],
  },

  colors: [
    getColor('chart-delta'), // Revenue
    getColor('chart-secondary'), // Deals Closed
    getColor('chart-alpha'), // New Leads
    getColor('chart-gamma'), // Clients
  ],

  grid: { strokeDashArray: 1 },
  //   zoom: { enabled: false },

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: { show: false },
    labels: { offsetY: 1 },
  },

  yaxis: {
    labels: {
      formatter: (val) => val + '',
      offsetX: -10,
    },
    axisBorder: { show: false },
  },

  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 4,
    },
  },

  legend: { show: false },
  dataLabels: { enabled: false },
  markers: { size: 0 },

  fill: {
    opacity: [1, 1, 1, 1],
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

const Overview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [chartKey, setChartKey] = useState(0)

  const [overviewData, setOverviewData] = useState(initialOverviewData)

  const [chartSeries, setChartSeries] = useState([
    { name: 'Revenue', type: 'area', data: [28, 30, 42, 43, 45, 58, 62, 64, 63, 68, 72, 56] },
    { name: 'Deals Closed', type: 'line', data: [20, 22, 25, 28, 26, 24, 21, 26, 30, 32, 31, 34] },
    { name: 'New Leads', type: 'bar', data: [38, 45, 52, 48, 56, 62, 58, 66, 60, 72, 70, 76] },
    { name: 'Active Clients', type: 'bar', data: [18, 20, 19, 23, 22, 25, 27, 29, 28, 31, 32, 34] },
  ])

  const refreshData = () => {
    setIsLoading(true)

    setTimeout(() => {
      // refresh chart
      setChartSeries((prev) =>
        prev.map((s) => ({
          ...s,
          data: s.data.map(() => Math.floor(Math.random() * 60) + 20),
        }))
      )

      // refresh cards
      setOverviewData((prev) =>
        prev.map((item) => ({
          ...item,
          value: Math.floor(Math.random() * 900) + 100,
          change: Math.floor(Math.random() * 10) - 5,
        }))
      )

      setChartKey((k) => k + 1)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <>
      <Card className="card-h-100">
        <CardHeader className="justify-content-between">
          <CardTitle as="h4">
            Overview <span className="text-muted fw-normal fs-base">(Current Year)</span>
          </CardTitle>
          <div className="d-flex gap-1">
            <Button variant="light" size="sm" type="button">
              All
            </Button>
            <Button variant="light" size="sm" type="button">
              1M
            </Button>
            <Button variant="light" size="sm" type="button">
              6M
            </Button>
            <Button variant="light" size="sm" type="button" active>
              1Y
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xl={4}>
              <div className="alert alert-warning d-flex align-items-center mb-3" role="alert">
                <Icon icon="database" className="fs-28 me-2" />
                <div>
                  We regret to inform you that our server is down.
                  <strong>
                    <Link href="" className="alert-link">
                      Refresh
                    </Link>
                  </strong>
                </div>
              </div>
              <Row>
                {overviewData.slice(0, 2).map((item, idx) => (
                  <Col sm={6} key={idx}>
                    <p className="text-muted mb-1">{item.title}</p>
                    <h4 className="mb-2">
                      <Icon icon={item.icon} className={`${item.className}`} />
                      &nbsp;
                      <span>
                        <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
                      </span>
                    </h4>
                    <span className={clsx('badge fs-12', item.change === 0 ? 'text-bg-light' : item.change > 0 ? 'badge-soft-success' : 'badge-soft-danger')}>
                      {item.change > 0 ? <Icon icon="chevron-up" /> : item.change < 0 ? <Icon icon="chevron-down" /> : ''}
                      &nbsp;{Math.abs(item.change)}%
                    </span>
                  </Col>
                ))}
              </Row>
              <Row>
                {overviewData.slice(2, 4).map((item, idx) => (
                  <Col sm={6} key={idx}>
                    <p className="text-muted mt-3 mb-1">{item.title}</p>
                    <h4 className="mb-2">
                      <Icon icon={item.icon} className={`${item.className}`} />
                      &nbsp;
                      <span>
                        <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} />
                      </span>
                    </h4>
                    <span className={clsx('badge fs-12', item.change === 0 ? 'text-bg-light' : item.change > 0 ? 'badge-soft-success' : 'badge-soft-danger')}>
                      {item.change > 0 ? <Icon icon="chevron-up" /> : item.change < 0 ? <Icon icon="chevron-down" /> : ''}
                      &nbsp;{Math.abs(item.change)}%
                    </span>
                  </Col>
                ))}
              </Row>
              <Button variant="primary" size="sm" className="mt-3" onClick={refreshData} disabled={isLoading}>
                <Icon icon="refresh" className="me-1" /> Refresh Data
              </Button>
            </Col>

            <Col xl={8}>
              <ApexChart key={chartKey} type="line" height={324} series={chartSeries} getOptions={() => getDashRevenueChart(chartSeries)} />
            </Col>
          </Row>
        </CardBody>
        {isLoading && (
          <div className="card-overlay d-flex align-items-center justify-content-center">
            <div className="spinner-border text-primary"></div>
          </div>
        )}
      </Card>
    </>
  )
}

export default Overview
