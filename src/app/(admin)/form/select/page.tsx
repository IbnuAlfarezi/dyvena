import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import ReactSelect from './components/ReactSelect'
import Select2 from './components/Select2'

export const metadata: Metadata = { title: `Form Select` }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Select" subtitle="Forms" />

      <Row>
        <Col xs={12}>
          <ReactSelect />
          <Select2 />
        </Col>
      </Row>
    </>
  )
}

export default Page
