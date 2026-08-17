'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import { Icon as IconifyIcon } from '@iconify/react'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { financeStatData } from './data'

const Stat = () => {
  return (
    <>
      <Row>
        {financeStatData.map((item, idx) => {
          const options = item.chartOptions()
          return (
            <Col xl={3} md={6} key={idx}>
              <Card>
                <CardBody>
                  <IconifyIcon icon={item.icon} className={`fs-36 ${item.className}`} />
                  <h3 className="fw-bold mt-3 mb-1">
                    <CountUp end={item.value} start={0} duration={1} prefix="$" suffix="k" decimals={2} decimal="." />
                  </h3>
                  <p className="text-muted">{item.title}</p>
                  <span className={`badge fs-12 ${item.change > 6 ? 'badge-soft-success' : 'badge-soft-danger'}`}>
                    {item.change > 6 ? <IconifyIcon icon="tabler:arrow-badge-up" /> : <IconifyIcon icon="tabler:arrow-badge-down" />}
                    {item.change}%
                  </span>
                  <ApexChart className="mt-3" getOptions={() => options} series={options.series} type="area" height={53} />
                </CardBody>
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}

export default Stat
