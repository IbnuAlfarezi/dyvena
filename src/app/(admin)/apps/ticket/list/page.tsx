import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import { ticketStatData } from './components/data'
import TicketsTable from './components/TicketsTable'
import TicketsWidget from './components/TicketsWidget'

export const metadata: Metadata = { title: 'Support Tickets' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tickets" subtitle="Support" />
      <Row className="row-cols-xxl-5 row-cols-md-3 row-cols-1 g-2">
        {ticketStatData.map((item, idx) => (
          <Col key={idx}>
            <TicketsWidget stat={item} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col xs={12}>
          <TicketsTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
