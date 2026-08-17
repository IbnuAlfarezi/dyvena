import PageBreadcrumb from '@/components/PageBreadcrumb'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { expenseStatData, StatType } from './components/data'
import ExpensesTable from './components/ExpensesTable'

export const metadata: Metadata = { title: 'Expenses' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Expenses" subtitle="Finance" />
      <Row className="row-cols-xxl-4 row-cols-md-2 row-cols-1">
        {expenseStatData.map((item, idx) => (
          <Col key={idx}>
            <StatCard {...item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <ExpensesTable />
        </Col>
      </Row>
    </>
  )
}

export default Page

const StatCard = ({ icon, title, value, prefix, className }: StatType) => {
  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <div className="avatar fs-60 avatar-img-size flex-shrink-0">
              <span className={`avatar-title ${className} rounded-circle fs-24`}>
                <Icon icon={icon} />
              </span>
            </div>
            <div className="text-end">
              <h3 className="mb-2 fw-normal">
                <CountUp start={0} end={value} duration={3} separator="," prefix={prefix} />
              </h3>
              <p className="mb-0 text-muted">
                <span>{title}</span>
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
