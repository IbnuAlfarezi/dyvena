import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ApiKeyTable from './components/ApiKeyTable'

export const metadata: Metadata = { title: 'Api Keys' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="API Keys" subtitle="Apps" />
      <Row>
        <Col xs={12}>
          <ApiKeyTable />
        </Col>
      </Row>
    </>
  )
}

export default Page
