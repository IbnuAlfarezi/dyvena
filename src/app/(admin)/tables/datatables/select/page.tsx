import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import Table from './components/Table'

export const metadata: Metadata = { title: 'Select Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Select" subtitle="DataTables" />
      <Row className="justify-content-center">
        <Table />
      </Row>
    </>
  )
}

export default Page
