import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import BankAccount from './components/BankAccount'
import BankCard from './components/BankCard'

export const metadata: Metadata = { title: 'Banks & cards' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Banks & cards" subtitle="Finance" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <BankAccount />

              <BankCard />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Page
