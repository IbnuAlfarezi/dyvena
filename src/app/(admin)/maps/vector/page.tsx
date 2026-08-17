import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import ExamplesCard from './components/VectorMaps'

export const metadata: Metadata = { title: 'Vector Maps' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Vector Maps" subtitle="Maps" />

      <Row>
        <ExamplesCard />
      </Row>
    </>
  )
}

export default Page
