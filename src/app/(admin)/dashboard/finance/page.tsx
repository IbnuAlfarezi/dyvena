import flower from '@/assets/images/flower-style.svg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import FinancialOverview from './components/FinancialOverview'
import QuickTransfer from './components/QuickTransfer'
import RecentTransaction from './components/RecentTransaction'
import Stat from './components/Stat'
import TargetAndGoal from './components/TargetAndGoal'
import TotalBalance from './components/TotalBalance'

export const metadata: Metadata = { title: 'Finance Dashboard' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Finance" subtitle="Dashboard" />

      <div className="alert alert-primary alert-dismissible d-flex align-items-center" role="alert">
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        <Icon icon="lifebuoy" className="fs-24 me-1" />
        <div>
          <strong> Dear {META_DATA.username} - </strong> We kindly encourage you to review your recent transactions and financial commitments to ensure that your account is in good standing.
        </div>
        <Link href="" className="text-reset text-decoration-underline ms-auto link-offset-2">
          <b>Action Now</b>
        </Link>
      </div>

      <Row>
        <Col xxl={4}>
          <TotalBalance />
        </Col>
        <Col xxl={8}>
          <Stat />
        </Col>
      </Row>

      <Row>
        <Col xl={8}>
          <FinancialOverview />
        </Col>
        <Col>
          <Card className="bg-secondary bg-gradient">
            <CardBody
              style={{
                backgroundImage: `url("${flower.src}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
              }}
            >
              <h4 className="text-white">Investment Growth</h4>
              <p className="text-white text-opacity-75">Track performance and see where your money is heading.</p>
              <Button size="sm" variant="info" className="rounded-pill bg-gradient">
                View Portfolio
              </Button>
            </CardBody>
          </Card>
          <QuickTransfer />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <RecentTransaction />
        </Col>
      </Row>

      <TargetAndGoal />
    </>
  )
}

export default Page
