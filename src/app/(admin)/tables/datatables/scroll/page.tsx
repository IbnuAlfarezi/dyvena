import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import Table from './components/Table'

export const metadata: Metadata = { title: 'Scroll Datatables' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Scroll" subtitle="DataTables" />

      <Row className="justify-content-center">
        <Table />
      </Row>
    </>
  )
}

export default Page
