import PageBreadcrumb from '@/components/PageBreadcrumb'
import { type Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ChatCard from './components/ChatCard'
import TicketDetails from './components/TicketDetails'

export const metadata: Metadata = { title: 'Ticket Details' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tickets Details" subtitle="Support" />
      <Row>
        <Col xxl={8}>
          <TicketDetails />
        </Col>
        <Col xl={4}>
          <ChatCard />
        </Col>
      </Row>
    </>
  )
}

export default Page
