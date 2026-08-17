'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Nav, NavItem, NavLink, TabContent, TabPane } from 'react-bootstrap'
import { SessionType, sessionData } from './data'

function generateRandomSeries(length: number, min = 18, max = 24): number[] {
  const data: number[] = []
  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return data
}

const SessionOverview = () => {
  const [activeTab, setActiveTab] = useState<SessionType['tabId']>('users')

  const initialData = generateRandomSeries(30)
  const [chartData, setChartData] = useState(() => ({
    visitors: initialData.map((item) => item - 4),
    views: initialData,
  }))

  const getFinancialOverviewChart = (): ApexOptions => ({
    series: [
      {
        name: 'Visitors',
        data: chartData.visitors,
      },
      {
        name: 'Page Views',
        data: chartData.views,
      },
    ],
    chart: {
      type: 'area',
      height: 328,
      toolbar: {
        show: false,
      },
      offsetX: 0,
    },
    stroke: {
      width: [2, 2],
      dashArray: [0, 5],
      curve: 'smooth',
    },
    colors: [getColor('chart-primary'), getColor('chart-gamma')],
    grid: {
      strokeDashArray: 7,
    },
    // zoom: {
    //   enabled: false,
    // },
    xaxis: {
      type: 'category',
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: 2,
      },
    },
    yaxis: {
      tickAmount: 3,
      min: 0,
      labels: {
        formatter: function (val) {
          return val + ''
        },
        offsetX: -10,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
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
    },
    fill: {
      opacity: [0.5, 0.5],
      type: ['gradient', 'gradient'],
      gradient: {
        type: 'vertical',
        //   shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.35,
        opacityTo: 0,
        stops: [0, 95],
      },
    },
  })

  const handleTabChange = (tab: SessionType['tabId']) => {
    if (tab === activeTab) return

    setActiveTab(tab)
    const data = generateRandomSeries(30)
    setChartData({
      visitors: data.map((item) => item - 4),
      views: data,
    })
  }

  return (
    <>
      <Card className="card-h-100">
        <CardHeader className="justify-content-between">
          <CardTitle as="h4">
            Sessions Overview <span className="text-muted fs-base fw-normal">(609.5k Sessions)</span>
          </CardTitle>
          <div>
            <Link href="" className="btn btn-sm btn-default">
              <Icon icon="cloud-upload" className="me-1" /> Export
            </Link>
            &nbsp;
            <Link href="" className="btn btn-sm btn-light">
              <Icon icon="download" className="me-1" /> Import
            </Link>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <Nav className="nav-tabs nav-justified nav-bordered">
            {sessionData.map((session, idx) => (
              <NavItem className="text-start" key={idx} onClick={() => handleTabChange(session.tabId)}>
                <NavLink className={clsx('py-3 gap-2 d-flex align-items-center justify-content-center', activeTab === session.tabId && 'active')}>
                  <span className="avatar-md flex-shrink-0 d-none d-xxl-block">
                    <span className="avatar-title bg-info-subtle text-info rounded-circle">
                      <Icon icon={session.icon} className="fs-xxl" />
                    </span>
                  </span>
                  <span>
                    <span className="text-muted">{session.title}</span>
                    <p className="fs-xl mb-0 text-dark fw-semibold">
                      {typeof session.value === 'number' ? <CountUp start={0} end={session.value} duration={1} suffix="k" decimals={2} /> : <span>{session.value}</span>}
                      <span className={clsx('fs-sm ms-2', session.change > 0 ? 'text-success' : 'text-danger')}>
                        {session.change > 0 ? <Icon icon="arrow-up" /> : <Icon icon="arrow-down" />}
                        {Math.abs(session.change)}%
                      </span>
                    </p>
                  </span>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent className="p-3">
            <TabPane id="users-tab" className="active show">
              <ApexChart getOptions={getFinancialOverviewChart} series={getFinancialOverviewChart().series} type="area" height={328} />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}

export default SessionOverview
