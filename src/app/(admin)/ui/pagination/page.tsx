import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import { AlignmentPagination, BoxedPagination, CustomColorPagination, CustomIconPagination, DefaultPagination, DisabledAndActive, RoundedPagination, SizingPagination, SoftPagination } from './components/Paginations'

export const metadata: Metadata = { title: 'Pagination' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pagination" subtitle="UI" />
      <Row>
        <Col xl={6}>
          <DefaultPagination />
          <AlignmentPagination />
          <CustomColorPagination />
          <DisabledAndActive />
          <CustomIconPagination />
        </Col>
        <Col xl={6}>
          <SizingPagination />
          <BoxedPagination />
          <RoundedPagination />
          <SoftPagination />
        </Col>
      </Row>
    </>
  )
}

export default Page
