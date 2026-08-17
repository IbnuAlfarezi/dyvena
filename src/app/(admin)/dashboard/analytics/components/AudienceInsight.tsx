'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import Link from 'next/link'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { insightData } from './data'

const getTotalUsersChart = (): ApexOptions => ({
  chart: {
    height: 160,
    type: 'donut',
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 0,
  },

  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
            formatter: function (w: any) {
              return (
                w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b
                }, 0) + ''
              )
            },
          },
        },
      },
    },
  },
  series: [44, 55, 41],
  labels: ['Organic', 'Referral', 'Paid'],
  colors: [getColor('chart-primary'), getColor('chart-zeta'), getColor('chart-alpha')],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 180,
        },
      },
    },
  ],
})

const AudienceInsight = () => {
  const [activeUsers, setActiveUsers] = useState(125)
  const [activeViews, setActiveViews] = useState(125)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  function animateCounter(setter: Dispatch<SetStateAction<number>>, start: number, end: number, duration = 800) {
    const range = end - start
    const startTime = performance.now()

    function update(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      setter(Math.floor(start + range * progress))

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const ac = Math.floor(Math.random() * 150 + 150)
      const views = Math.floor(Math.random() * ac + 25)

      animateCounter(setActiveUsers, 0, ac)
      animateCounter(setActiveViews, 0, views)
    }, 2000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeUsers, activeViews])

  return (
    <>
      <Card className="card-h-100">
        <CardHeader className="justify-content-between">
          <CardTitle as="h4">Audience Insights</CardTitle>
          <Dropdown className="ms-auto">
            <DropdownToggle className="btn btn-sm btn-default btn-icon content-none">
              <Icon icon="dots-vertical" className="fs-lg" />
            </DropdownToggle>
            <DropdownMenu align="end">
              <DropdownItem>
                <Icon icon="chart-bar" className="me-2" /> View Detailed Report
              </DropdownItem>
              <DropdownItem>
                <Icon icon="download" className="me-2" /> Export Analytics
              </DropdownItem>
              <DropdownItem>
                <Icon icon="filter-2" className="me-2" /> Apply Filters
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem className="text-danger">
                <Icon icon="trash" className="me-2" /> Remove Widget
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="p-0">
          <Row className="g-0">
            <Col>
              <div className="border-bottom p-2 border-end border-dashed">
                <h3 className="mb-0 d-flex gap-2 align-items-center justify-content-center">
                  <Icon icon="users" />
                  {activeUsers}
                </h3>
              </div>
            </Col>
            <Col>
              <div className="border-bottom p-2 border-dashed">
                <h3 className="mb-0 d-flex gap-2 align-items-center justify-content-center">
                  <Icon icon="device-analytics" />
                  {activeViews}
                </h3>
              </div>
            </Col>
          </Row>
        </CardBody>
        <CardBody>
          <ApexChart getOptions={getTotalUsersChart} series={getTotalUsersChart().series} type="donut" height={160} />
          <div className="table-responsive mt-2">
            <table className="table table-sm table-nowrap table-borderless table-centered mb-0">
              <thead className="bg-light bg-opacity-50 thead-sm">
                <tr className="text-uppercase fs-xxs">
                  <th>Page</th>
                  <th>Views</th>
                  <th>B. Rate</th>
                </tr>
              </thead>
              <tbody>
                {insightData.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <Link href="" className="text-muted">
                        {item.pageLink}
                      </Link>
                    </td>
                    <td>{item.views}</td>
                    <td>{item.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-2">
            <Button size="sm" variant="secondary">
              View All <Icon icon="arrow-right" className="ms-1" />
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default AudienceInsight
