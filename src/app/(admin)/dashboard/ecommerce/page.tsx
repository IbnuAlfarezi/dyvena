import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import DashboardOverview from './components/DashboardOverview'
import RecentActivity from './components/RecentActivity'
import RecentOrder from './components/RecentOrder'
import RevenueByLocation from './components/RevenueByLocation'
import SalesReport from './components/SalesReport'
import StorePerformance from './components/StorePerformance'
import TopSellingProduct from './components/TopSellingProduct'

export const metadata: Metadata = { title: 'eCommerce Dashboard' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="eCommerce" subtitle="Dashboard" />

      <Row>
        <Col xxl={5}>
          <DashboardOverview />
        </Col>
        <Col xxl={7}>
          <StorePerformance />
        </Col>
      </Row>

      <Row>
        <Col xxl={6}>
          <SalesReport />
        </Col>
        <Col xxl={6}>
          <TopSellingProduct />
        </Col>
      </Row>

      <Row>
        <Col xxl={5}>
          <RecentOrder />
        </Col>
        <Col xxl={7}>
          <Row>
            <Col lg={6}>
              <RevenueByLocation />
            </Col>
            <Col lg={6}>
              <RecentActivity />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Page
