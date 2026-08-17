import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row } from 'react-bootstrap'
import Toast from './components/Toast'

export const metadata: Metadata = { title: 'Notifications' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Notifications" subtitle="UI" />
      <Row>
        <Toast />
      </Row>
    </>
  )
}

export default Page
