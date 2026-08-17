import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import clsx from 'clsx'
import { Metadata } from 'next'
import { Card, Col, Row } from 'react-bootstrap'
import { holidayStatData, HolidayStatType } from './components/data'
import HolidayTable from './components/HolidayTable'

export const metadata: Metadata = { title: 'Holidays' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Holidays" subtitle="HRM" />
      <Row className="row-cols-2 row-cols-md-4 row-cols-xl-6 g-1 mb-1">
        {holidayStatData.map((item, idx) => (
          <Col key={idx}>
            <StatCard {...item} />
          </Col>
        ))}
      </Row>
      <HolidayTable />
    </>
  )
}

export default Page

const StatCard = ({ icon, title, value }: HolidayStatType) => {
  return (
    <>
      <Card className="p-3 mb-0">
        <div className="d-flex align-items-center gap-3">
          <div className={clsx('avatar-lg rounded-circle d-flex align-items-center justify-content-center', title === 'Active' ? 'text-success bg-success-subtle' : title === 'Inactive' ? 'text-danger bg-danger-subtle' : 'text-bg-light')}>
            <Icon icon={icon} className="fs-xxl" />
          </div>
          <div className="flex-grow-1">
            <p className={clsx('mb-1', title === 'Active' ? 'text-success' : title === 'Inactive' ? 'text-danger' : 'text-muted')}>{title}</p>
            <h4 className={clsx('mb-0', title === 'Active' ? 'text-success' : title === 'Inactive' ? 'text-danger' : '')}>{value}</h4>
          </div>
        </div>
      </Card>
    </>
  )
}
